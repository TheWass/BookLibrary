import React from "react";
import { StyleSheet, InputAccessoryView, Button as RNButton } from "react-native"
import { connect } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';
import { Container, Content, Form, Item, Input, Radio, Text, Label, Header, Body, Button, Icon, Left, Right, Title, ListItem, View } from 'native-base';
import { addBook, removeBook, updateBook } from "@/redux/books/actions";
import { ReduxStore } from "@/redux/store";
import { Book } from "@/providers/database/models/Book";
import SqlBook from '@/providers/database/models/Book';
import * as OpenLibraryApi from '@/providers/OpenLibrary/api';
import { isValidIsbn } from "@/helpers/book";

type RouteProps = {
    Entry: Book;
}

type Props = {
    navigation: StackNavigationProp<RouteProps, 'Entry'>;
    route: RouteProp<RouteProps, 'Entry'>;
}

const EntryForm = ({ navigation, route }: Props) => {
    const [rowId] = React.useState(route.params?.rowId);
    const [author, setAuthor] = React.useState(route.params?.author ?? '');
    const [title, setTitle] = React.useState(route.params?.title ?? '');
    const [pageCt, setPageCt] = React.useState(route.params?.pageCt?.toString() ?? '');
    const [isbn, setIsbn] = React.useState(route.params?.isbn ?? '');
    const [duplicate] = React.useState(route.params?.duplicate);
    const [isbnError, setIsbnError] = React.useState(false);
    const [readIt, setIsEnabled] = React.useState(true);
    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanned, setScanned] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ data }: { type: string, data: string }) => {
        setScanned(true);
        setErrorMsg('');
        try {
            const book = await OpenLibraryApi.getBookData(data);
            setIsbn(book.isbn ?? '');
            setAuthor(book.author ?? '');
            setTitle(book.title ?? '');
            setPageCt(book.pageCt?.toString() ?? '');
        } catch (ex) {
            if (typeof ex == 'string'){
                setErrorMsg(ex);
            }
            console.error(ex);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const save = async () => {
        const book: Book = {
            rowId,
            isbn,
            author,
            title,
            readIt,
            pageCt: +pageCt,
            duplicate
        }
        if (title && author) {
            await SqlBook.saveBook(book);
            const action = rowId ? updateBook(rowId, book) : addBook(book);
            ReduxStore.getStore().dispatch(action);
        }
        navigation.goBack();
    };

    const remove = async () => {
        if (rowId) {
            await SqlBook.deleteBook(rowId);
            ReduxStore.getStore().dispatch(removeBook(rowId));
        }
        navigation.goBack();
    }

    const message = () => {
        if (errorMsg) {
            return (<Text style={styles.scanError}>{errorMsg}</Text>);
        }
        if (!title && !author) {
            return (<Text style={styles.scanProcess}>Looking up book...</Text>);
        }
        return(<></>);
    };

    const scanner = () => {
        if (scanned) {
            return (<View style={styles.barcodeMask}>{message()}</View>)
        } else {
            return (<BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />);
        }
    };

    const validateIsbn = (value: string) => {
        if (value.length == 0 || isValidIsbn(value)) {
            setIsbnError(false);
        } else {
            setIsbnError(true);
        }
        //TODO: Set duplicate here.
        setIsbn(value);
    };

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon ios='chevron-back' android='arrow-back' />
                    </Button>
                </Left>
                <Body><Title>Book</Title></Body>
                <Right>
                    <Button transparent onPress={save}>
                        <Text>Done</Text>
                    </Button>
                </Right>
            </Header>
            <Content>
                <View style={{ height: 100, width:'100%' }}>{scanner()}</View>
                <Form>
                    <Item fixedLabel>
                        <Label>Title</Label>
                        <Input value={title} autoCapitalize='words' onChangeText={setTitle} />
                    </Item>
                    <Item fixedLabel>
                        <Label>Author</Label>
                        <Input value={author} autoCapitalize='words' onChangeText={setAuthor} />
                    </Item>
                    <Item fixedLabel error={isbnError}>
                        <Label>ISBN</Label>
                        <Input value={isbn} onChangeText={validateIsbn} keyboardType='numeric' inputAccessoryViewID='enterX' />
                        <InputAccessoryView nativeID='enterX'>
                            <View>
                                <RNButton title='X' onPress={() => setIsbn(isbn + 'X')} />
                            </View>
                        </InputAccessoryView>
                        { isbnError ? <Icon name='close-circle' style={{color:'red'}}  /> : null}
                    </Item>
                    <ListItem onPress={() => setIsEnabled(previousState => !previousState)}>
                        <Left>
                            <Text>Read it?</Text>
                        </Left>
                        <Body>
                            <Radio selected={readIt} onPress={() => setIsEnabled(previousState => !previousState)} />
                        </Body>
                    </ListItem>
                    <Item fixedLabel>
                        <Label>Page Count</Label>
                        <Input value={pageCt} onChangeText={setPageCt} keyboardType='numeric' />
                    </Item>
                </Form>
                <Button onPress={remove}><Text>Remove</Text></Button>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    barcodeMask: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkgray'
    },
    scanError: {
        color: 'darkred'
    },
    scanProcess: {
        color: 'black'
    }
});

export default connect()(EntryForm);
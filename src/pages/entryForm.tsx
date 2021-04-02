import React from "react";
import { StyleSheet } from "react-native"
import { connect } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';
import { Container, Content, Form, Item, Input, Radio, Text, Label, Header, Body, Button, Icon, Left, Right, Title, ListItem, View } from 'native-base';
import { addBook } from "@/redux/books/actions";
import { ReduxStore } from "@/redux/store";
import { Book } from "@/providers/database/models/Book";
import { saveBook } from '@/providers/database/models/Book';
import * as OpenLibraryApi from '@/providers/OpenLibrary/api';

type RouteProps = {
    Entry: Book;
}

type Props = {
    navigation: StackNavigationProp<RouteProps, 'Entry'>;
    route: RouteProp<RouteProps, 'Entry'>;
}

const EntryForm = ({ navigation, route }: Props) => {
    const [author, onChangeAuthor] = React.useState(route.params?.author || '');
    const [title, onChangeTitle] = React.useState(route.params?.title || '');
    const [readIt, setIsEnabled] = React.useState(true);
    const [pgCount, onChangePgCount] = React.useState(route.params?.pgCount.toString());
    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ data }: { type: string, data: string }) => {
        setScanned(true);
        const book = await OpenLibraryApi.getBookData(data);
        navigation.goBack();
        navigation.navigate('Entry', {...book});
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const isbn = route.params?.isbn || '';


    const save = async () => {
        // TODO:  Put this code into a service.
        const book: Book = {
            isbn: isbn,
            author,
            title,
            readIt,
            pgCount: +pgCount
        }
        await saveBook(book);
        ReduxStore.getStore().dispatch(addBook(book));
        navigation.goBack();
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
                <View style={{ height: 200, width:'100%' }}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
                <Form>
                    <Item fixedLabel>
                        <Label>Title</Label>
                        <Input value={title} onChangeText={onChangeTitle} />
                    </Item>
                    <Item fixedLabel>
                        <Label>Author</Label>
                        <Input value={author} onChangeText={onChangeAuthor} />
                    </Item>
                    <ListItem onPress={() => setIsEnabled(previousState => !previousState)}>
                        <Left>
                            <Text>Read it?</Text>
                        </Left>
                        <Right>
                            <Radio selected={readIt} />
                        </Right>
                    </ListItem>
                    <Item fixedLabel>
                        <Label>Page Count</Label>
                        <Input value={pgCount} onChangeText={onChangePgCount} keyboardType="numeric" />
                    </Item>
                </Form>
            </Content>
        </Container>
    );
}

export default connect()(EntryForm);
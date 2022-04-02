import React from "react";
import { Button, InputAccessoryView, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from "react-native"
import { connect } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addBook, removeBook, updateBook } from "@/redux/books/actions";
import { ReduxStore } from "@/redux/store";
import { Book } from "@/providers/database/models/Book";
import SqlBook from '@/providers/database/models/Book';
import * as OpenLibraryApi from '@/providers/OpenLibrary/api';
import { isValidIsbn } from "@/helpers/book";
import { Platform } from "expo-modules-core";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type EntryFormProps = {
    Entry: Book;
}

type RouteProps = {
    navigation: StackNavigationProp<EntryFormProps, 'Entry'>;
    route: RouteProp<EntryFormProps, 'Entry'>;
}

const EntryForm = ({ navigation, route }: RouteProps) => {
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

    return (<SafeAreaView>
        <View style={styles.header}>
            <View style={styles.headerItem}>
                <FontAwesome.Button name={ Platform.OS == 'ios' ? 'chevron-left' : 'arrow-left' } onPress={() => navigation.goBack()} />
            </View>
            <View style={styles.headerItem}>
                <Text>Book</Text>
            </View>
            <View style={styles.headerItem}>
                <Button title='Done' onPress={save}></Button>
            </View>
        </View>
        <View>
            <View style={{ height: 100, width:'100%' }}>{scanner()}</View>
            <View>
                <Text>Title</Text>
                <TextInput value={title} onChangeText={setTitle} autoCapitalize='words' />
            </View>
            <View>
                <Text>Author</Text>
                <TextInput value={author} onChangeText={setAuthor} autoCapitalize='words' />
            </View>
            <View>
                <Text>ISBN</Text>
                <TextInput value={isbn} onChangeText={validateIsbn} keyboardType='numeric' inputAccessoryViewID='enterX' />
                <InputAccessoryView nativeID='enterX'>
                    <View>
                        <Button title='X' onPress={() => setIsbn(isbn + 'X')} />
                    </View>
                </InputAccessoryView>
                { isbnError ? <FontAwesome name='times-circle' style={{color:'red'}}  /> : null}
            </View>
            <View>
                <Text>Read it?</Text>
                <Switch value={readIt} onValueChange={() => setIsEnabled(previousState => !previousState)} />
            </View>
            <View>
                <Text>Page Count</Text>
                <TextInput value={pageCt} onChangeText={setPageCt} keyboardType='numeric' />
            </View>
        </View>
        <View>
            <Button title='Remove' onPress={remove} />
        </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerItem: {
        alignItems: "center",
    },
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
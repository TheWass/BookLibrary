import React from "react";
import { Button, InputAccessoryView, StyleSheet, Text, TextInput, View } from "react-native"
import Checkbox from 'expo-checkbox';
import { connect } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StackScreenProps } from '@react-navigation/stack';
import { addBook, removeBook, updateBook } from "@/redux/books/actions";
import { ReduxStore } from "@/redux/store";
import { Book } from "@/providers/database/models/Book";
import { isValidIsbn } from "@/helpers/book";
import { PageParamList } from "@/Main";
import SqlBook from '@/providers/database/models/Book';
import * as OpenLibraryApi from '@/providers/OpenLibrary/api';

type Props = StackScreenProps<PageParamList, 'EntryForm'>

const EntryForm = ({ navigation, route }: Props) => {
    const [rowId] = React.useState(route.params?.rowId);
    const [author, setAuthor] = React.useState(route.params?.author ?? '');
    const [title, setTitle] = React.useState(route.params?.title ?? '');
    const [pageCt, setPageCt] = React.useState(route.params?.pageCt?.toString() ?? '');
    const [isbn, setIsbn] = React.useState(route.params?.isbn ?? '');
    const [duplicate] = React.useState(route.params?.duplicate);
    const [isbnError, setIsbnError] = React.useState(false);
    const [readIt, setReadIt] = React.useState(true);
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
        <View>
            <View style={{ height: 100, width:'100%' }}>{scanner()}</View>
            <View>
                <Text>Title</Text>
                <TextInput value={title} autoCapitalize='words' onChangeText={setTitle} />
            </View>
            <View>
                <Text>Author</Text>
                <TextInput value={author} autoCapitalize='words' onChangeText={setAuthor} />
            </View>
            <View>
                <Text>ISBN</Text>
                <TextInput value={isbn} onChangeText={validateIsbn} keyboardType='numeric' inputAccessoryViewID='enterX' />
                <InputAccessoryView nativeID='enterX'>
                    <View>
                        <Button title='X' onPress={() => setIsbn(isbn + 'X')} />
                    </View>
                </InputAccessoryView>
                { isbnError ? <Text>Invalid ISBN</Text> : null }
            </View>
            <View>
                <Text>Read it?</Text>
                <Checkbox value={readIt} onValueChange={setReadIt} />
            </View>
            <View>
                <Text>Page Ct</Text>
                <TextInput value={pageCt} onChangeText={setPageCt} keyboardType='numeric' />
            </View>
            <Button title='Save' onPress={save} />
            <Button title='Remove' onPress={remove} />
        </View>
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
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Book } from '@/providers/database/models/Book';

interface BookItemParams {
    book: Book;
}

const BookItem = ({ book }: BookItemParams): JSX.Element => {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('EntryForm', book);
    }
    return (
        <TouchableOpacity style={book.duplicate ? styles.itemDup : styles.item } onPress={onPress}>
            <Text style={styles.label}>{book.title}</Text><Text> {book.author}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white'
    },
    itemDup: {
        backgroundColor: 'lightgray'
    },
    label: {
        fontWeight: "bold"
    }
})

export default BookItem;

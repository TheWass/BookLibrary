import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Book } from '../models/book';
import BookItem from './bookitem';

interface BookListParams {
    books: Array<Book>;
}


const BookList = ({books}: BookListParams) => {
    const renderItem = ({item}: {item: Book}) => (
        <BookItem author={item.author} title={item.title} />
    );
    return (
        <FlatList 
            data={books}
            renderItem={ renderItem }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BookList;

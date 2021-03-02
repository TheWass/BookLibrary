import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface BookItemParams {
    author: string;
    title: string;
}

const BookItem = ({ author, title }: BookItemParams) => {
    return (
        <Text>{title} : {author}</Text>
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

export default BookItem;

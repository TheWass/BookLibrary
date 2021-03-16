import React from 'react';
import { Text } from 'native-base';

interface BookItemParams {
    author: string;
    title: string;
}

const BookItem = ({ author, title }: BookItemParams): JSX.Element => {
    return (
        <Text>{title} : {author}</Text>
    );
}

export default BookItem;

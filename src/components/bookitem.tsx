import React from 'react';
import { ListItem, Text } from 'native-base';
import { Book } from '@/providers/database/models/Book';

interface BookItemParams {
    book: Book;
}

const BookItem = ({ book }: BookItemParams): JSX.Element => {
    return (
        <ListItem noIndent={true} style={{ backgroundColor: book.duplicate ? 'lightgray' : 'white' }}>
            <Text style={{fontWeight: "bold"}}>{book.title}</Text><Text> {book.author}</Text>
        </ListItem>
    );
}

export default BookItem;

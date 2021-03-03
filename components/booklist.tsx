import React from 'react';
import { List, ListItem } from 'native-base';
import { Book } from '../models/book';
import BookItem from './bookitem';

interface BookListParams {
    books: Array<Book>;
}


const BookList = ({books}: BookListParams) => {
    const listItems = books.map((item) => (
        <ListItem key={item.id}>
            <BookItem author={item.author} title={item.title} />
        </ListItem>
    ));
    return (
        <List>
            {listItems}
        </List>
    );
}

export default BookList;

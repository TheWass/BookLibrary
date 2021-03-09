import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'native-base';
import { Book } from '@/models/db';
import BookItem from './bookitem';
import { RootState } from '@/redux/store';
import { getBooks } from '@/redux/books/selectors';

interface BookListParams {
    books: Array<Book>;
}

const BookList = ({books}: BookListParams) => {
    const listItems = books.map((item: Book, index) => (
        <ListItem key={index}>
            <BookItem author={item.author} title={item.title} />
        </ListItem>
    ));
    return (
        <List>
            {listItems}
        </List>
    );
}
const mapStateToProps = (state: RootState): { books: Array<Book> } => {
    const books = getBooks(state);
    return { books };
};

export default connect(
    mapStateToProps
)(BookList);

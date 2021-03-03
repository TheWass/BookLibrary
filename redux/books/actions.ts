import { Book } from '../../models/book';
import { BooksAction, ADD_BOOK, REMOVE_BOOK } from './types';

export const addBook = (book: Book): BooksAction  => ({
    type: ADD_BOOK,
    payload: { book }
});

export const removeBook = (bookId: number): BooksAction  => ({
    type: REMOVE_BOOK,
    payload: { bookId }
});

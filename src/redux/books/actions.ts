import { Book } from '@/providers/database/models/Book';
import { BooksAction, ADD_BOOK, REMOVE_BOOK, SET_BOOKS } from './types';

export const addBook = (book: Book): BooksAction => ({
    type: ADD_BOOK,
    payload: { book }
});

export const removeBook = (isbn: string): BooksAction => ({
    type: REMOVE_BOOK,
    payload: { isbn }
});

export const setBooks = (books: Array<Book>): BooksAction => ({
    type: SET_BOOKS,
    payload: { books }
});

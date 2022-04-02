import { Book } from '@/providers/database/models/Book';
import { BooksAction, ADD_BOOK, UPDATE_BOOK, REMOVE_BOOK, SET_BOOKS, SET_FILTER } from './types';

export const addBook = (book: Book): BooksAction => ({
    type: ADD_BOOK,
    payload: { book }
});

export const updateBook = (rowId: number, book: Book): BooksAction => ({
    type: UPDATE_BOOK,
    payload: { rowId, book }
});

export const removeBook = (rowId: number): BooksAction => ({
    type: REMOVE_BOOK,
    payload: { rowId }
});

export const setBooks = (books: Array<Book>): BooksAction => ({
    type: SET_BOOKS,
    payload: { books }
});

export const setFilter = (filter: string): BooksAction => ({
    type: SET_FILTER,
    payload: { filter }
});

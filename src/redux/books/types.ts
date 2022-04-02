import { Action } from 'redux';
import { Book } from '@/providers/database/models/Book';

export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const SET_BOOKS = 'SET_BOOKS';
export const SET_FILTER = 'SET_FILTER';

export interface BooksState {
    books: Array<Book>;
    filter: string;
}

interface AddBookAction extends Action {
    type: typeof ADD_BOOK;
    payload: {
        book: Book;
    };
}

interface UpdateBookAction extends Action {
    type: typeof UPDATE_BOOK;
    payload: {
        rowId: number;
        book: Book;
    };
}
interface RemoveBookAction extends Action {
    type: typeof REMOVE_BOOK;
    payload: {
        rowId: number;
    };
}
interface SetBooksAction extends Action {
    type: typeof SET_BOOKS;
    payload: {
        books: Array<Book>;
    };
}
interface SetFilterAction extends Action {
    type: typeof SET_FILTER;
    payload: {
        filter: string;
    };
}

export type BooksAction = AddBookAction | UpdateBookAction | RemoveBookAction | SetBooksAction | SetFilterAction;
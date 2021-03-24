import { Action } from 'redux';
import { Book } from '@/providers/database/models/Book';

export const ADD_BOOK = 'ADD_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const SET_BOOKS = 'SET_BOOKS';

export interface BooksState {
    books: Array<Book>;
}

interface AddBookAction extends Action {
    type: typeof ADD_BOOK;
    payload: {
        book: Book;
    };
}
interface RemoveBookAction extends Action {
    type: typeof REMOVE_BOOK;
    payload: {
        isbn: string;
    };
}
interface SetBooksAction extends Action {
    type: typeof SET_BOOKS;
    payload: {
        books: Array<Book>;
    };
}

export type BooksAction = AddBookAction | RemoveBookAction | SetBooksAction;
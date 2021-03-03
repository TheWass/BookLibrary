import { Action } from 'redux';
import { Book } from '../../models/book';

export const ADD_BOOK = 'ADD_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';

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
        bookId: number;
    };
}

export type BooksAction = AddBookAction | RemoveBookAction;
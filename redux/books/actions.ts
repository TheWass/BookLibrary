import { Book } from '@/models/db';
import { BooksAction, ADD_BOOK, REMOVE_BOOK } from './types';

export const addBook = (book: Book): BooksAction  => ({
    type: ADD_BOOK,
    payload: { book }
});

export const removeBook = (isbn: string): BooksAction  => ({
    type: REMOVE_BOOK,
    payload: { isbn }
});

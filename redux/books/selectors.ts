import { Book } from '../../models/book';
import { RootState } from '../store';

export const getBooks = (store: RootState): Array<Book> => store.books.books;
export const getBook = (store: RootState, bookId: number): Book | undefined => {
    return store.books.books.find(book => book.id == bookId);
};
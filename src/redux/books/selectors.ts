import { Book } from '@/providers/database/models/Book';
import { RootState } from '../store';

export const getBooks = (store: RootState): Array<Book> => store.books.books;
export const getBook = (store: RootState, isbn: string): Book | undefined => {
    return store.books.books.find(book => book.isbn == isbn);
};
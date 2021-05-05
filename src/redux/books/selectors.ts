import { Book } from '@/providers/database/models/Book';
import { RootState } from '../store';

export const getBooks = (store: RootState): Array<Book> => store.books.books;
export const getBook = (store: RootState, isbn: string): Book | undefined => store.books.books.find(book => book.isbn == isbn);
export const getBookCount = (store: RootState): number => store.books.books.length;
export const getPageCount = (store: RootState): number => store.books.books.reduce((acc: number, cur: Book) => acc += cur.pageCt ?? 0, 0);
export const getReadCount = (store: RootState): number => store.books.books.reduce((acc: number, cur: Book) => acc += cur.readIt ? 1 : 0, 0);

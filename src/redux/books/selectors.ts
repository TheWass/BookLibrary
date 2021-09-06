import { Book } from '@/providers/database/models/Book';
import { getSortOrder } from '../settings/selectors';
import { RootState } from '../store';

export const getBooks = (store: RootState): Array<Book> => store.books.books;
export const getBook = (store: RootState, isbn: string): Book | undefined => store.books.books.find(book => book.isbn == isbn);
export const getBookCount = (store: RootState): number => store.books.books.length;
export const getPageCount = (store: RootState): number => store.books.books.reduce((acc: number, cur: Book) => acc += cur.pageCt ?? 0, 0);
export const getReadCount = (store: RootState): number => store.books.books.reduce((acc: number, cur: Book) => acc += cur.readIt ? 1 : 0, 0);
export const getSortedBooks = (store: RootState): Array<{ label: string, books: Array<Book> }> => {
    const grouping = getSortOrder(store);
    if (grouping) {
        const groupedBooks = store.books.books.groupBy([grouping]) as Array<Group<Book>>;
        return groupedBooks.map((group: Group<Book>) => ({
            label: group.key[grouping] as string,
            books: group.items as Array<Book>
        }));
    } else {
        return [{
            label: 'All',
            books: store.books.books
        }];
    }
}

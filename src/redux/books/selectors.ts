import { Book } from '@/providers/database/models/Book';
import { getSortOrder } from '../settings/selectors';
import { RootState } from '../store';

export const getFilter = (store: RootState) => store.books.filter;
export const getBook = (store: RootState, isbn: string): Book | undefined => store.books.books.find(book => book.isbn == isbn);
export const getBookCount = (store: RootState): number => store.books.books.length;
export const getPageCount = (store: RootState): number => store.books.books.reduce((acc: number, cur: Book) => acc += cur.pageCt ?? 0, 0);
export const getReadCount = (store: RootState): number => store.books.books.reduce((acc: number, cur: Book) => acc += cur.readIt ? 1 : 0, 0);
export const getBooks = (store: RootState): Array<Book> => {
    if (!!store.books.filter) return store.books.books.filter(book => book.title?.includes(store.books.filter));
    return store.books.books;
}
export const getSortedBooks = (store: RootState): Array<{ label: string, books: Array<Book> }> => {
    const grouping = getSortOrder(store);
    if (grouping) {
        const groupedBooks = getBooks(store).groupBy([grouping]) as Array<Group<Book>>;
        return groupedBooks.map((group: Group<Book>) => ({
            label: group.key[grouping] as string,
            books: group.items.sort((a, b) => (a[grouping] as string).localeCompare(b[grouping] as string)) as Array<Book>
        })).sort((a, b) => a.label.localeCompare(b.label));
    }
    return [{
        label: 'All',
        books: getBooks(store)
    }];
}

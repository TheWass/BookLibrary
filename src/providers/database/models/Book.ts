import { SQLResultSet } from 'expo-sqlite';
import * as sqlite from '../sqlite';

export interface Book extends Record<string, unknown> {
    rowId?: number;
    isbn?: string;
    author?: string;
    title?: string;
    readIt?: boolean;
    pageCt?: number;
    duplicate?: boolean;
}

const sqlBook = {
    createTable(): Promise<SQLResultSet> {
        const sql = 'CREATE TABLE IF NOT EXISTS Book (isbn TEXT, author TEXT, title TEXT, readCt INT, pageCt INT);';
        return sqlite.executeSql(sql);
    },

    saveBook(book: Book): Promise<SQLResultSet> {
        let sql = 'INSERT INTO Book (isbn, author, title, readCt, pageCt) VALUES (?, ?, ?, ?, ?)';
        const params = [
            book.isbn ?? '',
            book.author ?? '',
            book.title ?? '',
            (book.readIt ? 1 : 0),
            book.pageCt ?? '']
        if (book.rowId) {
            sql = 'UPDATE Book SET isbn = ?, author = ?, title = ?, readCt = ?, pageCt = ? WHERE ROWID = ?';
            params.push(book.rowId);
        }
        return sqlite.executeSql(sql, params);
    },
    
    deleteBook(rowId: number): Promise<SQLResultSet> {
        const sql = 'DELETE FROM Book WHERE ROWID = ?;';
        const params = [rowId];
        return sqlite.executeSql(sql, params);
    },
    
    async getBooks(): Promise<Array<Book>> {
        const sql = 'SELECT rowid, isbn, author, title, readCt, pageCt FROM Book;';
        const res = await sqlite.executeSql(sql);
        const books = res.rows._array.map((row): Book => ({
            rowId: row.rowid,
            isbn: row.isbn,
            author: row.author,
            title: row.title,
            readIt: row.readCt > 0,
            pageCt: row.pageCt,
        }));
        const sortedBooks = books.sort((a, b) => (a.isbn || '').localeCompare(b.isbn || ''));
        const dupeMarkedBooks = sortedBooks.map((book, i, self): Book => ({
            ...book,
            duplicate: !!book.isbn && ((i < self.length - 1 && self[i+1].isbn == book.isbn) || (i > 0 && self[i-1].isbn == book.isbn))
        }));
        return dupeMarkedBooks.sort((a, b) => (a.rowId || 0) - (b.rowId || 0));
    }
}

export default sqlBook;
import { SQLResultSet } from 'expo-sqlite';
import * as sqlite from '../sqlite';

export interface Book {
    isbn?: string;
    author?: string;
    title?: string;
    readIt?: boolean;
    pageCt?: number;
}

export const createTable = (): Promise<SQLResultSet> => {
    const sql = 'CREATE TABLE IF NOT EXISTS Book (isbn TEXT, author TEXT, title TEXT, readCt INT, pageCt INT);';
    return sqlite.executeSql(sql);
}

export const saveBook = (book: Book): Promise<SQLResultSet> => {
    //TODO:  Check if the ISBN is already in...
    const sql = 'INSERT INTO Book (isbn, author, title, readCt, pageCt) VALUES (?, ?, ?, ?, ?)';
    return sqlite.executeSql(sql, [
        book.isbn ?? '',
        book.author ?? '',
        book.title ?? '',
        (book.readIt ? 1 : 0), 
        book.pageCt ?? '']);
}

export const getBooks = (): Promise<Array<Book>> => {
    const sql = 'SELECT isbn, author, title, readCt, pageCt FROM Book;';
    return sqlite.executeSql(sql).then((res) => res.rows._array.map(row => ({
        isbn: row.isbn,
        author: row.author,
        title: row.title,
        readIt: row.readCt > 0,
        pageCt: row.pageCt,
    })));
}
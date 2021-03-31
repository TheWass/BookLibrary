import { SQLResultSet } from 'expo-sqlite';
import * as sqlite from '../sqlite';

export interface Book {
    isbn: string;
    author: string;
    title: string;
    readIt?: boolean;
    pgCount: number;
}

export const createTable = (): Promise<SQLResultSet> => {
    const sql = 'CREATE TABLE IF NOT EXISTS Book (isbn TEXT, author TEXT, title TEXT, readCt INT, pgCount INT);';
    return sqlite.executeSql(sql);
}

export const saveBook = (book: Book): Promise<SQLResultSet> => {
    //TODO:  Check if the ISBN is already in...
    const sql = 'INSERT INTO Book (isbn, author, title, readCt, pgCount) VALUES (?, ?, ?, ?)';
    return sqlite.executeSql(sql, [book.isbn, book.author, book.title, (book.readIt ? 1 : 0), book.pgCount]);
}

export const getBooks = (): Promise<Array<Book>> => {
    const sql = 'SELECT author, title FROM Book;';
    return sqlite.executeSql(sql).then((res) => res.rows._array);
}
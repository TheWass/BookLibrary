import { SQLResultSet } from 'expo-sqlite';
import * as sqlite from '../sqlite';

export interface Book {
    isbn: string;
    author: string;
    title: string;
    readIt?: boolean;
}

export const createTable = (): Promise<SQLResultSet> => {
    const sql = 'CREATE TABLE IF NOT EXISTS Book (isbn TEXT, author TEXT, title TEXT, readCt INT);';
    return sqlite.executeSql(sql);
}

export const saveBook = (book: Book): Promise<SQLResultSet> => {
    //TODO:  Check if the ISBN is already in...
    const sql = 'INSERT INTO Book (isbn, author, title, readCt) VALUES (?, ?, ?, ?)';
    return sqlite.executeSql(sql, [book.isbn, book.author, book.title, (book.readIt ? 1 : 0)]);
}

export const getBooks = (): Promise<Array<Book>> => {
    const sql = 'SELECT author, title FROM Book;';
    return sqlite.executeSql(sql).then((res) => res.rows._array);
}
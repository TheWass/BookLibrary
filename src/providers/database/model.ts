import * as ApiCall from './models/ApiCall';
import Book from './models/Book';

export const createTables = async (): Promise<void> => {
    await ApiCall.createTable();
    await Book.createTable();
}

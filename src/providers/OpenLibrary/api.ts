import { Book } from "@/models/db"
import * as sqlite from '@/providers/sqlite';
import { BookEntry } from "./model";

const getData = async <T>(endpoint: string, id?: string): Promise<T> => {
    let url = 'https://openlibrary.org/' + endpoint;
    if (id) {
        url += '/' + id;
    }
    url += '.json';
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json: T = await res.json();
    sqlite.executeSql('INSERT INTO ApiCall VALUES (service = ?, req = ?, res = ?)', ['OpenLibrary', url, JSON.stringify(json)]);
    return json;
};

export const getBookData = async(isbn: string): Promise<Book> => {
    const book = await getData<BookEntry>('isbn', isbn);
    //TODO: Need to cross reference the author as well.
    const authorUri: string = book.authors[0].key
    const author = await getData<any>(authorUri);

    return {
        isbn: isbn,
        author: author.name,
        title: book.title
    };
}
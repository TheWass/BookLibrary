import { Book } from "@/providers/database/models/Book";
import { saveApiCall } from "@/providers/database/models/ApiCall";
import { OLBook, OLAuthor } from "./model";

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
    if (res.ok) {
        const json: T = await res.json();
        await saveApiCall({
            service: 'OpenLibrary',
            request: url,
            response: JSON.stringify(json)
        })
        return json;
    } else if (res.status == 404) {
        throw url + ' does not exist.';
    } else {
        const error = await res.text();
        throw error;
    }
};

export const getBookData = async(isbn: string): Promise<Book> => {
    const book: Book = { isbn };
    const bookRes = await getData<OLBook>('isbn', isbn);
    book.title = bookRes?.title ?? '';
    book.pageCt = bookRes?.number_of_pages ?? '';
    if (bookRes.authors) {
        const authorUri: string = bookRes.authors[0].key
        const authorRes = await getData<OLAuthor>(authorUri);
        book.author = authorRes?.name;
    } else if (bookRes.by_statement) {
        book.author = bookRes.by_statement;
    }
    return book;
}
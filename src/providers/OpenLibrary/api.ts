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
    const json: T = await res.json();
    await saveApiCall({
        service: 'OpenLibrary',
        request: url,
        response: JSON.stringify(json)
    })
    return json;
};

export const getBookData = async(isbn: string): Promise<Book> => {
    const book = await getData<OLBook>('isbn', isbn);
    const authorUri: string = book.authors[0].key
    const author = await getData<OLAuthor>(authorUri);

    return {
        isbn: isbn,
        author: author.name,
        title: book.title,
        pgCount: book.number_of_pages
    };
}
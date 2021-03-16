export interface Book {
    isbn: string;
    author: string;
    title: string;
    readIt?: boolean;
}
export interface ApiCall {
    service: string;
    request: string;
    response: string;
}

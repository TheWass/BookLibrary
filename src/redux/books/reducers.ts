import { BooksState, BooksAction, ADD_BOOK, REMOVE_BOOK, SET_BOOKS } from './types';

const initialState: BooksState = {
    books: []
};

export function booksReducer(
    state = initialState,
    action: BooksAction
): BooksState {
    switch (action.type) {
        case ADD_BOOK: {
            return {
                ...state,
                books: state.books.concat(action.payload.book)
            };
        }
        case REMOVE_BOOK: {
            return {
                ...state,
                books: state.books.filter((book) => book.isbn !== action.payload.isbn)
            };
        }
        case SET_BOOKS: {
            return {
                ...state,
                books: action.payload.books.map((book) => ({...book}))
            };
        }
        default:
            return state;
    }
}

import { BooksState, BooksAction, ADD_BOOK, REMOVE_BOOK, SET_BOOKS, UPDATE_BOOK } from './types';

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
        case UPDATE_BOOK: {
            return {
                ...state,
                books: state.books.map((book) => book.rowId == action.payload.rowId ? action.payload.book : book)
            };
        }
        case REMOVE_BOOK: {
            return {
                ...state,
                books: state.books.filter((book) => book.rowId !== action.payload.rowId)
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

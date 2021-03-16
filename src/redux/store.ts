import { createStore, combineReducers, Store } from 'redux';
import { booksReducer } from './books/reducers';
import { BooksState } from './books/types';

const reducers = combineReducers({
    books: booksReducer
});

export interface RootState {
    books: BooksState;
}

export class ReduxStore {
    private static instance: ReduxStore;
    private store: Store;
    private constructor() {
        this.store = createStore(reducers);
    }
    static getStore(): Store {
        if (!ReduxStore.instance) {
            ReduxStore.instance = new ReduxStore();
        }
        return ReduxStore.instance.store;
    }
}

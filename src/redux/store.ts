import { createStore, combineReducers, Store } from 'redux';
import { booksReducer } from './books/reducers';
import { entryReducer } from './entry/reducers';
import { BooksState } from './books/types';
import { EntryState } from './entry/types';

const reducers = combineReducers({
    books: booksReducer,
    entry: entryReducer
});

export interface RootState {
    books: BooksState;
    entry: EntryState;
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

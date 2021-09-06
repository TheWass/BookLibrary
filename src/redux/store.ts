import { createStore, combineReducers, Store } from 'redux';
import { booksReducer } from './books/reducers';
import { entryReducer } from './entry/reducers';
import { settingsReducer } from './settings/reducers';
import { BooksState } from './books/types';
import { EntryState } from './entry/types';
import { SettingsState } from './settings/types';

const reducers = combineReducers({
    books: booksReducer,
    entry: entryReducer,
    settings: settingsReducer,
});

export interface RootState {
    books: BooksState;
    entry: EntryState;
    settings: SettingsState;
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

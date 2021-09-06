import { Action } from 'redux';

export const SET_SORT = 'SET_SORT';

export interface SettingsState {
    sortOrder: string;
}

interface SetSortAction extends Action {
    type: typeof SET_SORT;
    payload: {
        sortOrder: string;
    };
}

export type EntryAction = SetSortAction;
import { SettingsState, EntryAction, SET_SORT } from './types';

const initialState: SettingsState = {
    sortOrder: '',
};

export function settingsReducer(
    state = initialState,
    action: EntryAction
): SettingsState {
    switch (action.type) {
        case SET_SORT: {
            return { ...state, sortOrder: action.payload.sortOrder };
        }
        default:
            return state;
    }
}

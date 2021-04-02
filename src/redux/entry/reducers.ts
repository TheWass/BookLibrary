import { EntryState, EntryAction, SET_AUTHOR, SET_TITLE, SET_READIT, SET_PGCOUNT, SET_HASPERM, SET_SCANNED } from './types';

const initialState: EntryState = {
    author: '',
    title: '',
    readIt: true,
    pgCount: 0,
    hasPermission: false,
    scanned: false
};

export function entryReducer(
    state = initialState,
    action: EntryAction
): EntryState {
    switch (action.type) {
        case SET_AUTHOR: {
            return { ...state, author: action.payload.author };
        }
        case SET_TITLE: {
            return { ...state, title: action.payload.title };
        }
        case SET_READIT: {
            return { ...state, readIt: action.payload.readIt };
        }
        case SET_PGCOUNT: {
            return { ...state, pgCount: action.payload.pgCount };
        }
        case SET_HASPERM: {
            return { ...state, hasPermission: action.payload.hasPermission };
        }
        case SET_SCANNED: {
            return { ...state, scanned: action.payload.scanned };
        }
        default:
            return state;
    }
}

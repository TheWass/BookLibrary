import { EntryAction, SET_AUTHOR, SET_HASPERM, SET_PGCOUNT, SET_READIT, SET_SCANNED, SET_TITLE } from './types';

export const setAuthor = (author: string): EntryAction => ({
    type: SET_AUTHOR,
    payload: { author }
});
export const setTitle = (title: string): EntryAction => ({
    type: SET_TITLE,
    payload: { title }
});
export const setReadIt = (readIt: boolean): EntryAction => ({
    type: SET_READIT,
    payload: { readIt }
});
export const setPgCount = (pgCount: number): EntryAction => ({
    type: SET_PGCOUNT,
    payload: { pgCount }
});
export const setHasPermission = (hasPermission: boolean): EntryAction => ({
    type: SET_HASPERM,
    payload: { hasPermission }
});
export const setScanned = (scanned: boolean): EntryAction => ({
    type: SET_SCANNED,
    payload: { scanned }
});

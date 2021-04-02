import { Action } from 'redux';

export const SET_AUTHOR = 'SET_AUTHOR';
export const SET_TITLE = 'SET_TITLE';
export const SET_READIT = 'SET_READIT';
export const SET_PGCOUNT = 'SET_PGCOUNT';
export const SET_HASPERM = 'SET_HASPERM';
export const SET_SCANNED = 'SET_SCANNED';

export interface EntryState {
    author: string;
    title: string;
    readIt: boolean;
    pgCount: number;
    hasPermission: boolean;
    scanned: boolean;
}

interface SetAuthorAction extends Action {
    type: typeof SET_AUTHOR;
    payload: {
        author: string;
    };
}
interface SetTitleAction extends Action {
    type: typeof SET_TITLE;
    payload: {
        title: string;
    };
}
interface SetReadItAction extends Action {
    type: typeof SET_READIT;
    payload: {
        readIt: boolean;
    };
}
interface SetPgCountAction extends Action {
    type: typeof SET_PGCOUNT;
    payload: {
        pgCount: number;
    };
}
interface SetHasPermissionAction extends Action {
    type: typeof SET_HASPERM;
    payload: {
        hasPermission: boolean;
    };
}
interface SetScannedAction extends Action {
    type: typeof SET_SCANNED;
    payload: {
        scanned: boolean;
    };
}

export type EntryAction = SetAuthorAction |
    SetTitleAction |
    SetReadItAction |
    SetPgCountAction |
    SetHasPermissionAction |
    SetScannedAction;
import { RootState } from '../store';

export const getAuthor = (store: RootState): string => store.entry.author;
export const getTitle = (store: RootState): string => store.entry.title;
export const getReadIt = (store: RootState): boolean => store.entry.readIt;
export const getPgCount = (store: RootState): number => store.entry.pgCount;
export const getHasPermssion = (store: RootState): boolean => store.entry.hasPermission;
export const getScanned = (store: RootState): boolean => store.entry.scanned;

import { EntryAction, SET_SORT } from './types';

export const setSortOrder = (sortOrder: string): EntryAction => ({
    type: SET_SORT,
    payload: { sortOrder }
});

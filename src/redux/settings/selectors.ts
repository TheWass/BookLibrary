import { RootState } from '../store';

export const getSortOrder = (store: RootState): string => store.settings.sortOrder;

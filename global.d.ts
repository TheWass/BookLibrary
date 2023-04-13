/* eslint-disable @typescript-eslint/no-empty-interface */
import { PageParamList } from './src/Main';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends PageParamList {}
    }
}
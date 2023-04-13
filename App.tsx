import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'

import Main from '@/Main';
import SqlBook from '@/providers/database/models/Book';
import { purgeApiCalls } from '@/providers/database/models/ApiCall';
import { createTables } from '@/providers/database/model';
import { setBooks } from '@/redux/books/actions';
import { ReduxStore } from '@/redux/store';
import '@/helpers/array';


SplashScreen.preventAutoHideAsync();
const App = (): JSX.Element => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        asyncInit();
    }, []);

    async function asyncInit(): Promise<void> {
        await Font.loadAsync({
            ...Ionicons.font,
        });
        // parse this out in a separate context.
        await createTables();
        await purgeApiCalls();
        const books = await SqlBook.getBooks();
        ReduxStore.getStore().dispatch(setBooks(books));
        setIsLoading(false);
    }

    React.useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);
    return (<Main />);
}

export default App;

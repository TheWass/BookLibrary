import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { purgeApiCalls } from '@/providers/database/models/ApiCall';
import { createTables } from '@/providers/database/model';
import Main from '@/Main';
import { setBooks } from '@/redux/books/actions';
import { ReduxStore } from '@/redux/store';
import SqlBook from '@/providers/database/models/Book';
import '@/helpers/array';

const App = (): JSX.Element => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timeout = setTimeout(async () => {
            await Font.loadAsync({
                ...Ionicons.font,
                ...FontAwesome.font
            });
            // TODO: Parse this out into a service...
            await createTables();
            await purgeApiCalls();
            const books = await SqlBook.getBooks();
            ReduxStore.getStore().dispatch(setBooks(books));
            setIsLoading(false);
        }, 1000)
  
        return () => clearTimeout(timeout);
    }, [])
  
    if (isLoading) {
        return <AppLoading />
    }
    return (<Main />);
    }
export default App;

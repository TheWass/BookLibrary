import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ReduxStore } from '@/redux/store';
import BooksPage from '@/pages/books';
import EntryFormPage from '@/pages/entryForm';
import SettingsPage from '@/pages/settings';
import { Book } from '@/providers/database/models/Book';

export type PageParamList = {
    Books: undefined;
    Settings: undefined;
    EntryForm: Book;
}

enableScreens()
const Stack = createStackNavigator<PageParamList>();

const Main = (): JSX.Element => {
    return (<Provider store={ ReduxStore.getStore() }>
        <NavigationContainer>
        <StatusBar style="auto" />
            <Stack.Navigator>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="Books" component={BooksPage} />
                    <Stack.Screen name="Settings" component={SettingsPage} />
                    <Stack.Screen name="EntryForm" component={EntryFormPage} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>);
}

export default Main;

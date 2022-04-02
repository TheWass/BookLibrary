import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ReduxStore } from '@/redux/store';
import BooksPage, { BookProps } from '@/pages/books';
import EntryFormPage, { EntryFormProps } from '@/pages/entryForm';
import SettingsPage, { SettingsProps } from '@/pages/settings';
import { NavigationContainer } from '@react-navigation/native';

enableScreens()

export type RootStackParamList = {
    Books: BookProps,
    Settings: SettingsProps,
    Entry: EntryFormProps
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Main(): JSX.Element {
    return (
        <Provider store={ ReduxStore.getStore() }>
            <StatusBar style="auto" />
            <NavigationContainer>
                <RootStack.Navigator initialRouteName="Books">
                    <RootStack.Group>
                        <RootStack.Screen 
                            name="Books"
                            component={BooksPage}
                        />
                        <RootStack.Screen 
                            name="Settings"
                            component={SettingsPage}
                        />
                        <RootStack.Screen 
                            name="Entry"
                            component={EntryFormPage}
                        />
                    </RootStack.Group>
                    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                    </RootStack.Group>
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

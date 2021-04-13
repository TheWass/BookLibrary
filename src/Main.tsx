import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { ReduxStore } from '@/redux/store';
import BooksPage from '@/pages/books';
import EntryFormPage from '@/pages/entryForm';
import SettingsPage from '@/pages/settings';

enableScreens()
const MainStack = createStackNavigator();
const RootStack = createNativeStackNavigator();

function MainStackScreen() {
    return (<MainStack.Navigator>
        <MainStack.Screen 
            name="Books"
            component={BooksPage}
            options={{ headerShown: false }}
        />
        <MainStack.Screen 
            name="Settings"
            component={SettingsPage}
            options={{ headerShown: false }}
        />
        <MainStack.Screen 
            name="Entry"
            component={EntryFormPage}
            options={{ headerShown: false }}
        />
    </MainStack.Navigator>);
  }


export default function Main(): JSX.Element {
    return (<Root>
        <Provider store={ ReduxStore.getStore() }>
            <StatusBar style="auto" />
            <NavigationContainer>
                <RootStack.Navigator mode="modal" screenOptions={{ stackPresentation: 'formSheet' }}>
                    <RootStack.Screen
                        name="Main"
                        component={MainStackScreen}
                        options={{ headerShown: false }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    </Root>);
}

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
import AddButton from '@/components/addButton';
import BarcodeScanner from '@/pages/barcodeScanner';

enableScreens()
const MainStack = createStackNavigator();
const RootStack = createNativeStackNavigator();

function MainStackScreen() {
    return (<MainStack.Navigator>
        <RootStack.Screen 
            name="Books"
            component={BooksPage}
            options={{
                headerRight: function headerRight() { return <AddButton />; }
            }}
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
                    <RootStack.Screen name="Scan ISBN" component={BarcodeScanner} />
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    </Root>);
}

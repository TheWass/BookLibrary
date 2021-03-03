import 'react-native-gesture-handler';
import React from 'react';
import { connect, Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { ReduxStore } from './redux/store';
import BooksPage from './pages/books';
import AddButton from './components/addButton';

const Stack = createStackNavigator();

interface ReactState {
    isReady: boolean;
}

class App extends React.Component<{}, ReactState>  {
    constructor(props: {}) {
        super(props);
        this.state = {
            isReady: false,
        };
    }
  
    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });
    }
  
    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
    
        return (<Root>
            <Provider store={ ReduxStore.getStore() }>
                <StatusBar style="auto" />
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen 
                            name="Books"
                            component={BooksPage}
                            options={{
                                headerRight: AddButton
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        </Root>);
    }
}
export default connect(
    null,
    null
)(App);

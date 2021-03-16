import React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons'
import Main from './src/Main';

const App = (): JSX.Element => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timeout = setTimeout(async () => {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                ...Ionicons.font,
            });
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

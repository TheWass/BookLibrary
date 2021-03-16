import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onPress = (navigation: any) => {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ["Cancel", "Scan ISBN", "Manual Entry"],
            cancelButtonIndex: 0,
        },
        (buttonIndex) => {
            switch(buttonIndex) {
                case 0: //Cancel
                    break;
                case 1: //Scan
                    navigation.navigate('Scan ISBN')
                    break;
                case 2: //Enter

                    break;
            }
        }
    );
}

const AddButton = () => {
    const navigation = useNavigation();
    return (
        <Button transparent onPress={() => onPress(navigation)}>
            <Icon name='add' />
        </Button>
    );
}

export default connect()(AddButton);

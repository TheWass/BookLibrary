import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';

const SettingsButton = () => {
    const navigation = useNavigation();
    return (
        <Button transparent onPress={() => navigation.navigate('Settings')}>
            <Icon name='settings' />
        </Button>
    );
}

export default connect()(SettingsButton);
import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';

const AddButton = () => {
    return (
        <Button transparent>
            <Icon name='add' />
        </Button>
    );
}

export default connect()(AddButton);

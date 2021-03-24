import React from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Text } from 'native-base';
import * as sqlite from '@/providers/database/sqlite';

const SettingsPage = () => {
    return (
        <Container>
            <Content>
                <Text>Settings:</Text>
                <Button onPress={() => sqlite.exportDb()}><Text>Export Database</Text></Button>
                <Button onPress={() => sqlite.wipeDb()}><Text>Purge Database</Text></Button>
            </Content>
        </Container>
    );
}

export default connect()(SettingsPage);
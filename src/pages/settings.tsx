import React from "react";
import { useNavigation } from '@react-navigation/native'
import { connect } from "react-redux";
import { Container, Content, Header, Text, Button, Left, Body, Right, Icon, Title } from 'native-base';
import * as sqlite from '@/providers/database/sqlite';

const SettingsPage = () => {
    const navigation = useNavigation();
    return (
        <Container>
            <Header>
                <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon ios='chevron-back' android='arrow-back' />
                </Button>
                </Left>
                <Body><Title>Settings</Title></Body>
                <Right></Right>
            </Header>
            <Content>
                <Text>Settings:</Text>
                <Button onPress={() => sqlite.exportDb()}><Text>Export Database</Text></Button>
                <Button onPress={() => sqlite.wipeDb()}><Text>Purge Database</Text></Button>
            </Content>
        </Container>
    );
}

export default connect()(SettingsPage);
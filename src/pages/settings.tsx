import React from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Header, Text, Button, Left, Body, Right, Icon, Title, List, ListItem } from 'native-base';
import * as sqlite from '@/providers/database/sqlite';

const SettingsPage = () => {
    const navigation = useNavigation();
    const purgeDb = () => {
        Alert.alert(
            "Delete Database",
            "Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: 'destructive', onPress: purgeCallback }
            ]
        );
    }
    const purgeCallback = () => {
        sqlite.wipeDb().finally(() => {
            Alert.alert(
                "Delete Database",
                "Completed.",
                [
                    { text: "Ok", style: "default" }
                ]
            );
        });
    }

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
                <List>
                    <ListItem onPress={() => sqlite.exportDb()}>
                        <Left><Text>Export Database</Text></Left>
                        <Right><Icon ios='chevron-forward' android='arrow-forward' /></Right>
                    </ListItem>
                    <ListItem onPress={purgeDb}>
                        <Left><Text style={{ color: 'red' }}>Purge Database</Text></Left>
                        <Right><Icon ios='chevron-forward' android='arrow-forward' /></Right>
                    </ListItem>
                </List>
            </Content>
        </Container>
    );
}

export default connect()(SettingsPage);
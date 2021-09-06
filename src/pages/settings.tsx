import React from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { RootState } from "@/redux/store";
import { getBookCount, getPageCount, getReadCount } from "@/redux/books/selectors";
import { Container, Content, Header, Text, Button, Left, Body, Right, Icon, Title, List, ListItem, Separator } from 'native-base';
import * as sqlite from '@/providers/database/sqlite';

interface SettingsParams { 
    bookCt: number;
    pageCt: number;
    readCt: number;
}

const SettingsPage = ({ bookCt, pageCt, readCt }: SettingsParams) => {
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
                    <Separator bordered>
                        <Text>Statistics</Text>
                    </Separator>
                    <ListItem>
                        <Left><Text>Book Count</Text></Left>
                        <Body><Text>{bookCt}</Text></Body>
                    </ListItem>
                    <ListItem>
                        <Left><Text>Read Count</Text></Left>
                        <Body><Text>{readCt}</Text></Body>
                    </ListItem>
                    <ListItem>
                        <Left><Text>Page Count</Text></Left>
                        <Body><Text>{pageCt}</Text></Body>
                    </ListItem>
                    <Separator bordered>
                        <Text>Settings</Text>
                    </Separator>
                    <ListItem>
                        <Left><Text>Sort Order</Text></Left>
                        <Body>
                            
                        </Body>
                    </ListItem>
                    <Separator bordered>
                        <Text>Maintenance</Text>
                    </Separator>
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

const mapStateToProps = (state: RootState): SettingsParams => {
    const bookCt = getBookCount(state);
    const pageCt = getPageCount(state);
    const readCt = getReadCount(state);
    return { bookCt, pageCt, readCt };
};

export default connect(
    mapStateToProps
)(SettingsPage);
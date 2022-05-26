import React from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { RootState } from "@/redux/store";
import { getBookCount, getPageCount, getReadCount } from "@/redux/books/selectors";
import { setSortOrder } from "@/redux/settings/actions";
import { Container, Content, Header, Text, Button, Left, Body, Right, Icon, Title, List, ListItem, Separator } from 'native-base';
import * as sqlite from '@/providers/database/sqlite';
import { getSortOrder } from "@/redux/settings/selectors";

interface SettingsParams { 
    bookCt: number;
    pageCt: number;
    readCt: number;
    sortOrder: string;
    setSortOrder: typeof setSortOrder;
}

const SettingsPage = ({ bookCt, pageCt, readCt, sortOrder, setSortOrder }: SettingsParams) => {
    const navigation = useNavigation();

    //#endregion

    //#region Maintenance Functions
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
    //#endregion

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
                            <SelectPicker selectedValue={sortOrder} onValueChange={(itemValue) => setSortOrder(itemValue)}>
                                <SelectPicker.Item label="Insert Order" value="" />
                                <SelectPicker.Item label="Author" value="author" />
                                <SelectPicker.Item label="Title" value="title" />
                            </SelectPicker>
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

const mapStateToProps = (state: RootState): { bookCt: number, pageCt: number, readCt: number, sortOrder: string } => {
    const bookCt = getBookCount(state);
    const pageCt = getPageCount(state);
    const readCt = getReadCount(state);
    const sortOrder = getSortOrder(state);
    return { bookCt, pageCt, readCt, sortOrder };
};

export default connect(
    mapStateToProps,
    { setSortOrder }
)(SettingsPage);
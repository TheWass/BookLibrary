import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import { RootState } from "@/redux/store";
import { getBookCount, getPageCount, getReadCount } from "@/redux/books/selectors";
import { setSortOrder } from "@/redux/settings/actions";
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
    return (<View>
        <View>
            <Text>Statistics</Text>
            <View>
                <Text>Book Count</Text>
                <Text>{bookCt}</Text>
            </View>
            <View>
                <Text>Read Count</Text>
                <Text>{readCt}</Text>
            </View>
            <View>
                <Text>Page Count</Text>
                <Text>{pageCt}</Text>
            </View>
        </View>
        <View>
            <Text>Settings</Text>
            <View>
                <Text>SortOrder</Text>
                <Picker selectedValue={sortOrder} onValueChange={(itemValue) => setSortOrder(itemValue)}>
                    <Picker.Item label="Insert Order" value="" />
                    <Picker.Item label="Author" value="author" />
                    <Picker.Item label="Title" value="title" />
                </Picker>
            </View>
        </View>
        <View>
            <Text>Maintenance</Text>
            <View>
                <Button title='Export DB' onPress={sqlite.exportDb} />
            </View>
            <View>
                <Button title='Purge DB' onPress={purgeDb} />
            </View>
        </View>
    </View>);
}

const styles = StyleSheet.create({

});

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
import React from "react";
import { Alert, Button, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View, } from "react-native";
import { connect } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootState } from "@/redux/store";
import { getBookCount, getPageCount, getReadCount } from "@/redux/books/selectors";
import { setSortOrder } from "@/redux/settings/actions";
import { EntryAction } from "@/redux/settings/types";
import * as sqlite from '@/providers/database/sqlite';
import { getSortOrder } from "@/redux/settings/selectors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RootStackParamList } from "@/Main";
import { useNavigation } from "@react-navigation/native";

export type SettingsProps = { 
    bookCt: number;
    pageCt: number;
    readCt: number;
    sortOrder: string;
    setSortOrder: (sortOrder: string) => EntryAction;
}

const SettingsPage = ({ bookCt, pageCt, readCt, sortOrder, setSortOrder }: SettingsProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

    return (<SafeAreaView>
        <View style={styles.header}>
            <View style={styles.headerItem}>
                <FontAwesome.Button name={ Platform.OS == 'ios' ? 'chevron-left' : 'arrow-left' } onPress={navigation.goBack} />
            </View>
            <View style={styles.headerItem}>
                <Text>Settings</Text>
            </View>
            <View style={styles.headerItem}></View>
        </View>
        <ScrollView>
            <View style={styles.listContainer}>
                <View style={styles.listHeader}>
                    <Text>Statistics</Text>
                </View>
                <View style={styles.listItem}>
                    <Text>Book Count</Text>
                    <Text>{bookCt}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text>Read Count</Text>
                    <Text>{readCt}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text>Page Count</Text>
                    <Text>{pageCt}</Text>
                </View>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.listHeader}>
                    <Text>Settings</Text>
                </View>
                <View style={styles.listItem}>
                    <Text>Sort Order</Text>
                    <Picker selectedValue={sortOrder} onValueChange={setSortOrder}>
                        <Picker.Item label="Insert Order" value="" />
                        <Picker.Item label="Author" value="author" />
                        <Picker.Item label="Title" value="title" />
                    </Picker>
                </View>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.listHeader}>
                    <Text>Maintenance</Text>
                </View>
                <View style={styles.listItem}>
                    <Button title="Export Database" onPress={sqlite.exportDb} />
                </View>
                <View style={styles.listItem}>
                    <Button title="Purge Database" onPress={purgeDb} />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerItem: {
        alignItems: "center",
    },
    listContainer: {

    },
    listHeader: {

    },
    listItem: {

    }
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
import React from "react";
import { connect } from "react-redux";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BookList from '@/components/booklist';
import { RootStackParamList } from "@/Main";

export type BookProps = {
}

const BooksPage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (<SafeAreaView>
        <View style={styles.header}>
            <View style={styles.headerItem}>
                <FontAwesome.Button name="gear" onPress={() => navigation.navigate('Settings')} />
            </View>
            <View style={styles.headerItem}>
                <Text>Book Library</Text>
            </View>
            <View style={styles.headerItem}>
                <FontAwesome.Button name="plus" onPress={() => navigation.navigate('Entry')} />
            </View>
        </View>
        <View style={{flex: 1}}>
            <BookList />
        </View>
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
    }
});

export default connect()(BooksPage);

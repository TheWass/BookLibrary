import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import BookList from '@/components/booklist';
import { PageParamList } from "@/Main";
import { StackScreenProps } from "@react-navigation/stack";
import { Book } from '@/providers/database/models/Book';


type Props = StackScreenProps<PageParamList, 'Books'>

const BooksPage = ({ navigation }: Props) => {
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<View style={ styles.headerButtons }>
                <Ionicons name='add' size={32} style={ styles.headerButton } onPress={() => navigation.push('EntryForm', {} as Book)} />
            </View>),
            headerLeft: () => (<View style={ styles.headerButtons }>
                <Ionicons name='settings' size={32} style={ styles.headerButton } onPress={() => navigation.push('Settings')} />
            </View>)
        });
    })
    return (
        <View style={ styles.content }>
            <BookList />
        </View>
    );
}
BooksPage.propTypes = {
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    headerButtons: {
        marginHorizontal: 10,
    },
    headerButton: {
        color: '#007AFF',
    },
    content: {
        flex: 1,
        margin: 10,
    }
})

export default connect()(BooksPage);

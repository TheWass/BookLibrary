import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { View } from "react-native";
import { connect } from "react-redux";

import BookList from '@/components/booklist';
import { PageParamList } from "@/Main";
import { StackScreenProps } from "@react-navigation/stack";
import { Book } from '@/providers/database/models/Book';


type Props = StackScreenProps<PageParamList, 'Books'>

const BooksPage = ({ navigation }: Props) => {
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<Ionicons name='add' size={32} onPress={() => navigation.push('EntryForm', {} as Book)} />),
            headerLeft: () => (<Ionicons name='settings' size={32} onPress={() => navigation.push('Settings')} />)
        });
    })
    return (
        <View style={{flex: 1}}>
            <BookList />
        </View>
    );
}
BooksPage.propTypes = {
    navigation: PropTypes.object
}

export default connect()(BooksPage);

import React from 'react';
import { SectionList, SectionListData, StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Text } from 'native-base';
import { Book } from '@/providers/database/models/Book';
import BookItem from './bookitem';
import { ReduxStore, RootState } from '@/redux/store';
import { getFilter, getSortedBooks } from '@/redux/books/selectors';
import { setFilter } from '@/redux/books/actions';

interface BookListParams {
    books: Array<{label: string, books: Array<Book>}>;
    filter: string;
}

const BookList = ({ books, filter }: BookListParams) => {
    let sectionData = books.map(group => ({
        title: group.label,
        data: group.books,
    }));

    const renderItem = ({ item }: { item: Book }) => (<BookItem book={ item ?? {}} />);

    const renderSectionHeader = ({ section }: { section: SectionListData<Book>}) => (
        <ListItem itemDivider>
            <Text style={{fontWeight: 'bold'}}>{section.title}</Text>
        </ListItem>
    );

    const onSearchChange = (search: string) => {
        const store = ReduxStore.getStore();
        store.dispatch(setFilter(search));
        sectionData = getSortedBooks(store.getState()).map(group => ({
            title: group.label,
            data: group.books,
        }));
    }

    return (
        <View>
            <View style={styles.searchView}>
                <TextInput value={filter} onChangeText={onSearchChange} />
            </View>
            <SectionList
                sections={sectionData}
                keyExtractor={(item, index) => ((item.rowId || 0) + index).toString()}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchView: {
        marginVertical: 10,
        marginHorizontal: 20
    },
});

const mapStateToProps = (state: RootState): BookListParams => {
    const books = getSortedBooks(state);
    const filter = getFilter(state);
    return { books, filter };
};
export default connect(
    mapStateToProps,
    { setFilter }
)(BookList);

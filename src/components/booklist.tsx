import React from 'react';
import { SectionList, SectionListData } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Text } from 'native-base';
import { Book } from '@/providers/database/models/Book';
import BookItem from './bookitem';
import { RootState } from '@/redux/store';
import { getSortedBooks } from '@/redux/books/selectors';

interface BookListParams {
    books: Array<{label: string, books: Array<Book>}>;
}

const BookList = ({books}: BookListParams) => {
    const sectionData = books.map(group => ({
        title: group.label,
        data: group.books,
    }));

    const renderItem = ({ item }: { item: Book }) => (<BookItem book={ item ?? {}} />);

    const renderSectionHeader = ({ section }: { section: SectionListData<Book>}) => (
        <ListItem itemDivider>
            <Text style={{fontWeight: 'bold'}}>{section.title}</Text>
        </ListItem>
    );

    return (
        <SectionList
            sections={sectionData}
            keyExtractor={(item, index) => ((item.rowId || 0) + index).toString()}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
        />
    );
}
const mapStateToProps = (state: RootState): BookListParams => {
    const books = getSortedBooks(state);
    return { books };
};

export default connect(
    mapStateToProps
)(BookList);

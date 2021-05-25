import React from 'react';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem, Text, View } from 'native-base';
import { Book } from '@/providers/database/models/Book';
import BookItem from './bookitem';
import { RootState } from '@/redux/store';
import { getBooks } from '@/redux/books/selectors';
import { TouchableOpacity } from 'react-native';

interface BookListParams {
    books: Array<Book>;
}

const BookList = ({books}: BookListParams) => {
    const sectionData = [{
        title: 'Section',
        data: books.map((book, key) =>({
            ...book,
            key
        }))
    }]

    const renderItem = ({ item }: { item: Book }) => (
        <ListItem noIndent={true} style={{ backgroundColor: 'white' }}>
            <BookItem author={item.author ?? ''} title={item.title ?? ''} />
        </ListItem>
    );

    const renderHiddenItem = ({ item }: { item: Book }) => (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity
                onPress={() => console.log('Left ' + item.title)}
            >
                <Text>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => console.log('Right ' + item.title)}
            >
                <Text>Right</Text>
            </TouchableOpacity>
        </View>
    );

    const renderSectionHeader = ({ section }: any) => (
        <ListItem itemDivider>
            <Text style={{fontWeight: 'bold'}}>{section.title}</Text>
        </ListItem>
    );

    const onRowDidOpen = (rowKey: string) => {
        console.log('This row opened', rowKey);
    };

    return (
        <SwipeListView
            useSectionList
            sections={sectionData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            renderSectionHeader={renderSectionHeader}
            leftOpenValue={75}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
        />
    );
}
const mapStateToProps = (state: RootState): BookListParams => {
    const books = getBooks(state);
    return { books };
};

export default connect(
    mapStateToProps
)(BookList);

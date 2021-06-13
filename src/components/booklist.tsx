import React from 'react';
import { Dimensions, SectionListData, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem, Text, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Book } from '@/providers/database/models/Book';
import BookItem from './bookitem';
import { RootState } from '@/redux/store';
import { getBooks } from '@/redux/books/selectors';

interface BookListParams {
    books: Array<Book>;
}

const BookList = ({books}: BookListParams) => {
    const navigation = useNavigation();
    const sectionData = [{
        title: 'Section',
        data: books.map((book, key) =>({
            ...book,
            key
        }))
    }]

    const renderItem = ({ item }: { item: Book }) => (<BookItem book={ item ?? {}} />);

    const renderHiddenItem = ({ item }: { item: Book }) => (
        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0ad4e' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Entry', item)}>
                <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }} >
                    <Text>Edit</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderSectionHeader = ({ section }: { section: SectionListData<Book>}) => (
        <ListItem itemDivider>
            <Text style={{fontWeight: 'bold'}}>{section.title}</Text>
        </ListItem>
    );

    const onSwipeLeft = ( data: { isActivated: boolean, value: number, key: string } ) => {
        const book = sectionData[0].data[+data.key]
        navigation.navigate('Entry', book)
    };

    return (
        <SwipeListView
            useSectionList
            disableRightSwipe
            sections={sectionData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            renderSectionHeader={renderSectionHeader}
            rightOpenValue={-Dimensions.get('window').width}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={1000}
            rightActivationValue={-Dimensions.get('window').width}
            onRightActionStatusChange={onSwipeLeft}
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

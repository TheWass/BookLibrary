import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Text } from 'native-base';
import { Book } from '@/providers/database/models/Book';

interface BookItemParams {
    book: Book;
}

const BookItem = ({ book }: BookItemParams): JSX.Element => {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Entry', book);
    }
    return (
        <ListItem noIndent={true} style={{ backgroundColor: book.duplicate ? 'lightgray' : 'white' }} onPress={onPress}>
            <Text style={{fontWeight: "bold"}}>{book.title}</Text><Text> {book.author}</Text>
        </ListItem>
    );
}

export default BookItem;

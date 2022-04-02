import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Book } from '@/providers/database/models/Book';
import { RootStackParamList } from '@/Main';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface BookItemParams {
    book: Book;
}

const BookItem = ({ book }: BookItemParams): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const onPress = () => {
        navigation.navigate('Entry', book);
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ backgroundColor: book.duplicate ? 'lightgray' : 'white' }}>
                <Text style={{fontWeight: "bold"}}>{book.title}</Text><Text> {book.author}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default BookItem;

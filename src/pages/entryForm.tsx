import React, { useState } from "react";
import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';
import { Container, Content, Form, Item, Input, Radio, Text, Header, Body, Button, Icon, Left, Right, Title, ListItem } from 'native-base';
import { addBook } from "@/redux/books/actions";
import { ReduxStore } from "@/redux/store";
import { Book } from "@/providers/database/models/Book";
import { saveBook } from '@/providers/database/models/Book';

type RouteProps = {
    Entry: {
        author: string;
        title: string;
        isbn: string;
    };
}

type Props = {
    navigation: StackNavigationProp<RouteProps, 'Entry'>;
    route: RouteProp<RouteProps, 'Entry'>;
}

const EntryForm = ({ navigation, route }: Props) => {
    const nav = navigation;
    const [author, onChangeAuthor] = React.useState(route.params.author || '');
    const [title, onChangeTitle] = React.useState(route.params.title || '');
    const [readIt, setIsEnabled] = useState(true);
    const isbn = route.params.isbn || '';

    const save = async () => {
        
        // TODO:  Put this code into a service.
        const book: Book = {
            isbn: isbn,
            author,
            title,
            readIt
        }
        await saveBook(book);
        ReduxStore.getStore().dispatch(addBook(book));
        nav.goBack();
    };

    return (
        <Container>
            <Header>
                <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon ios='chevron-back' android='arrow-back' />
                </Button>
                </Left>
                <Body><Title>Book</Title></Body>
                <Right>
                    <Button transparent onPress={save}>
                        <Text>Done</Text>
                    </Button>
                </Right>
            </Header>
            <Content>
                <Form>
                    <Item><Input placeholder='Title' value={title} onChangeText={onChangeTitle} /></Item>
                    <Item><Input placeholder='Author' value={author} onChangeText={onChangeAuthor}  /></Item>
                    <ListItem onPress={() => setIsEnabled(previousState => !previousState)}>
                        <Left>
                            <Text>Read it?</Text>
                        </Left>
                        <Right>
                            <Radio selected={readIt} />
                        </Right>
                    </ListItem>
                </Form>
            </Content>
        </Container>
    );
}

export default connect()(EntryForm);
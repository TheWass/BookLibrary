import React from "react";
import { useNavigation } from '@react-navigation/native'
import { connect } from "react-redux";
import { Body, Button, Container, Header, Icon, Left, Right, Title, View } from 'native-base';
import BookList from '@/components/booklist';

const BooksPage = () => {
    const navigation = useNavigation();
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate('Settings')}>
                        <Icon name='settings' />
                    </Button>
                </Left>
                <Body><Title>Book Library</Title></Body>
                <Right>
                    <Button transparent onPress={() => navigation.navigate('Entry')}>
                        <Icon name='add' />
                    </Button>
                </Right>
            </Header>
            <View style={{flex: 1}}>
                <BookList />
            </View>
        </Container>
    );
}

export default connect()(BooksPage);

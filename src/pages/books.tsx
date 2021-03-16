import React from "react";
import { connect } from "react-redux";
import { Container, Content } from 'native-base';
import BookList from '@/components/booklist';

const BooksPage = () => {
    return (
        <Container>
            <Content>
                <BookList />
            </Content>
        </Container>
    );
}

export default connect()(BooksPage);

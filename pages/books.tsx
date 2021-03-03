import React from "react";
import { Container, Content } from 'native-base';
import BookList from '../components/booklist';
import { Book } from '../models/book';


const books: Array<Book> = [
    { id:1, author:"Author1", title:"Title1" },
    { id:2, author:"Author2", title:"Title2" },
    { id:3, author:"Author3", title:"Title3" },
    { id:4, author:"Author4", title:"Title4" },
    { id:5, author:"Author5", title:"Title5" }
]

const BooksPage = () => {
    return (
        <Container>
            <Content>
                <BookList books={books} />
            </Content>
        </Container>
    );
}

export default BooksPage;
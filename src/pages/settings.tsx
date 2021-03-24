import React from "react";
import { connect } from "react-redux";
import { Container, Content } from 'native-base';

const SettingsPage = () => {
    return (
        <Container>
            <Content>
                Settings:
                Export database
                Purge database
                
            </Content>
        </Container>
    );
}

export default connect()(SettingsPage);
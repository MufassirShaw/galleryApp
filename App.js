import React, { Fragment } from 'react';
import {
  Header,
  Body,
  Container,
  Content,
  Right,
  Left,
  Icon,
  Button
} from 'native-base';
import Navigator from './src/Components/Navigator';;
const App = () => {
  return (
    <Container>
      <Header
        androidStatusBarColor="#04293F"
        style={{ backgroundColor: "#04293F", elevation: 5 }}
      >
        <Left>
          <Button transparent>
            <Icon color="#fff" name="arrow-back" />
          </Button>
        </Left>
        <Body />
        <Right>
          <Button transparent>
            <Icon color="#fff" type="FontAwesome" size={70} name="sign-out" />
          </Button>
        </Right>
      </Header>
      <Navigator />
    </Container>
  );
};

export default App;

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native';
import BackgroundImage2 from "./BackgroundImage2";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label
} from "native-base";

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emailInput: '',
            passInput: ''
        };
    };
    checkLogin = () => {
    //if(השם משתמש והסיסמא נמצאים בדאטה בייס)
        this.props.navigation.navigate("home", {
            myEmail: this.state.emailInput,
            //else()
        //{
          //console.warn(offer drugs)  
        //}
        });
    }
    render() {
        return (
            <Container>
                <BackgroundImage2 />
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label style={{color:"white"}}>Email</Label>
                            <Input style={{color:"white"}} />
                        </Item>
                        <Item fixedLabel last>
                            <Label style={{ color: "white" }}>Password</Label>
                            <Input style={{ color: "white" }} />
                        </Item>
                    </Form>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.checkLogin}
                    >
                        <Text> Login </Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    };
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = {
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
};
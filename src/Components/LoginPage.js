import React, { Component } from 'react';
import { Text, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
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
import axios from 'axios';

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emailInput: '',
            passInput: '',
            test: 'test1',
        };
    };
    emailChange = (e) => {
        this.setState({ emailInput: e });
    };
    passChange = (e) => {
        this.setState({ passInput: e });
    };
    checkLogin = async () => {
        try {
            const res = await axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/LoginVerify', {
                email: this.state.emailInput,
                pass: this.state.passInput
            })
            let json = JSON.parse(res.data.d)
            if (json !== null) {
                await AsyncStorage.setItem("User", JSON.stringify(json));
                this.props.navigation.navigate("home");
            }
            else {

            }
        } catch (error) {

        }
    }
    render() {
        return (
            <Container>
                <BackgroundImage2 />
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label style={{ color: "white" }}>אימייל</Label>
                            <Input style={{ color: "white" }} onChangeText={this.emailChange} />
                        </Item>
                        <Item fixedLabel last>
                            <Label style={{ color: "white" }}>סיסמא</Label>
                            <Input style={{ color: "white" }} onChangeText={this.passChange} />
                        </Item>
                    </Form>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.checkLogin}
                    >
                        <Text> התחברות </Text>
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
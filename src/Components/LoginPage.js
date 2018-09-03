import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, AsyncStorage, Modal } from 'react-native';
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
            emailInput: null,
            passInput: null,
            test: 'test1',
            modalVisible: false,
            errMsg: ''
        };
    };
    emailChange = (e) => {
        this.setState({ emailInput: e });
    };
    passChange = (e) => {
        this.setState({ passInput: e });
    };
    checkLogin = async () => {
        if (this.state.emailInput == null) {
            this.setState({ errMsg: 'אנא הכנס אימייל', modalVisible: true });
            this.timeOut2 = setTimeout(() => {

                this.setState({ modalVisible: false })

            }, 1500);
        }
        else if (this.state.passInput == null) {
            this.setState({ errMsg: 'אנא הכנס סיסמא', modalVisible: true });
            this.timeOut2 = setTimeout(() => {

                this.setState({ modalVisible: false })

            }, 1500);
        }
        else {
            try {
                const res = await axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/LoginVerify', {
                    email: this.state.emailInput,
                    pass: this.state.passInput
                })
                let json = JSON.parse(res.data.d)
                if (json !== null) {
                    await AsyncStorage.setItem("User", JSON.stringify(json));
                    this.props.navigation.navigate("home"); //JSON parse like in 3 rows up to use the JSON

                }
                else {
                    this.setState({ errMsg: 'פרטים לא נכונים', modalVisible: true });
                    this.timeOut2 = setTimeout(() => {

                        this.setState({ modalVisible: false })

                    }, 1500);
                }
            } catch (error) {

            }
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
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => null}
                        style={styles.modalStyle}
                    >
                        <View style={{ top: (HEIGHT / 2) - 75, backgroundColor: "rgba(238,206,206,0.6)", height: 100 }} >
                            <Text style={{ fontSize: 25, color: "white", textAlign: 'center', marginTop: 25 }}>
                                {this.state.errMsg}
                            </Text>
                        </View>
                    </Modal>
                </View>
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
    modalStyle: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    }
};
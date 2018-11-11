import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, AsyncStorage, Modal, StatusBar, TextInput, Image } from 'react-native';
import axios from 'axios';

var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';

export default class LoginPage extends Component {
    componentDidMount() {
        StatusBar.setHidden(true);
    }
    constructor(props) {
        super(props)

        this.state = {
            emailInput: null,
            passInput: null,
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
                if (json !== 0) {

                    let userStr = JSON.stringify(json);
                    AsyncStorage.setItem('user', userStr).then(() => { this.props.navigation.navigate("home"); });
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

    emailFocus = () => {
        this.setState({ emailInput: '' })
    }
    passFocus = () => {
        this.setState({ passInput: '' })
    }

    render() {
        return (
            <View style={styles.container}>
             <Image style={{ width: WIDTH, height: HEIGHT, position: 'absolute'  }} source={{ uri: siteImages + 'background.jpg' }}/>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: siteImages + 'emailIcon.png' }} />
                    <TextInput style={styles.inputs}
                        placeholder="אימייל"
                        value={this.state.emailInput}
                        onFocus={this.emailFocus}
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={this.emailChange} />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: siteImages + 'passIcon.png' }} />
                    <TextInput style={styles.inputs}
                        placeholder="סיסמא"
                        value={this.state.passInput}
                        onFocus={this.passFocus}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={this.passChange} />
                </View>
                <TouchableOpacity
                    style={[styles.ExistingUserButton, { justifyContent: 'center', alignItems: 'center', left: 100, top: 400 }]}
                    onPress={this.checkLogin}>
                    <Text> התחבר </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.newUserButton, { justifyContent: 'center', alignItems: 'center', left: 100, top: 450 }]}
                    onPress={() => { this.props.navigation.navigate("Welcome") }}
                >
                    <Text> חזור </Text>
                </TouchableOpacity>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => null}
                        style={styles.modalStyle}
                    >
                        <View style={{ top: 70, backgroundColor: "rgba(93,108,111,0.6)", height: 100 }} >
                            <Text style={{ fontSize: 25, color: "white", textAlign: 'center', marginTop: 35 }}>
                                {this.state.errMsg}
                            </Text>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    };
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = {
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop: 25
    },
    modalStyle: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        textAlign: 'right'
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    newUserButton: {
        position: "absolute",
        top: HEIGHT - 65,
        width: WIDTH - 200,
        height: 40,
        backgroundColor: "#FAFAD2",
        borderRadius: 70
    },
    ExistingUserButton: {
        position: "absolute",
        top: HEIGHT - 115,
        width: WIDTH - 200,
        height: 40,
        backgroundColor: "#FAFAD2",
        borderRadius: 70
    }
};
import React, { Component } from 'react';
import { View, Text, Modal, Dimensions, Image } from 'react-native';
import { Container, Content, Form, Item, Picker, Label, Input, Button } from 'native-base';
import axios from 'axios';

const agePick = ["גיל", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
const listAge = agePick.map((ageP, i) =>
    <Picker.Item label={ageP} value={ageP} key={i} />
);

var siteImages = 'http://ruppinmobile.tempdomain.co.il/site07/Images/';

export default class NewUserRegister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: undefined,
            email: undefined,
            pass: undefined,
            age: undefined,
            height: undefined,
            weight: undefined,
            sex: undefined,
            level: undefined,
            modalVisible: false,
            errMsg: '',
        };
    };
    nameChange = (e) => {
        this.setState({ name: e })
    }
    emailChange = (e) => {
        this.setState({ email: e })
    }
    passChange = (e) => {
        this.setState({ pass: e })
    }
    ageChange = (e) => {
        this.setState({ age: e })
    }
    heightChange = (e) => {
        this.setState({ height: e })
    }
    weightChange = (e) => {
        this.setState({ weight: e })
    }
    sexChange = (e) => {
        this.setState({ sex: e });
    }
    levelChange = (e) => {
        this.setState({ level: e });
    }
    registerClicked = async () => {
        try {
            const res = await axios.post('http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/InsertUser', {
                name: this.state.name,
                email: this.state.email,
                pass: this.state.pass,
                weight: this.state.weight,
                height: this.state.height,
                age: this.state.age,
                level: this.state.level,
                sex: this.state.sex,
            })
            if (res.data.d !== null) {
                this.props.navigation.navigate("Login");
            }
            else {
                this.setState({ errMsg: 'משתמש קיים', modalVisible: true })
                this.timeOut = setTimeout(() => {

                    this.setState({ modalVisible: false })

                }, 1500);
            }
        } catch (error) {
            this.setState({ errMsg: 'ישנם נתונים ריקים', modalVisible: true })
            this.timeOut = setTimeout(() => {

                this.setState({ modalVisible: false })

            }, 1500);
        }

    }
    render() {
        return (
            <Container style={{ backgroundColor: '#d4d4d4' }}>
                <Image source={{ uri: siteImages + 'SignUpPage.png' }} style={{ position: 'absolute', width: WIDTH, height: 75, top: 10 }} />
                <Content style={{ marginTop: 110 }}>
                    <Form style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Item floatingLabel style={{ width: 200, marginLeft: 20 }}>
                                <Label style={styles.labelStyle}>שם</Label>
                                <Input onChangeText={this.nameChange} returnKeyType="next" />
                            </Item>
                            <View style={{ width: 120, }}>
                                <Item picker>
                                    <Picker
                                        prompt="הגיל שלי"
                                        style={{ marginTop: 30, color: 'rgba(0,0,0,0.7)' }}
                                        selectedValue={this.state.age}
                                        onValueChange={this.ageChange}
                                    >
                                        {listAge}
                                    </Picker>
                                </Item>
                            </View>
                        </View>
                        <Item floatingLabel style={{ marginLeft: 20, marginRight: 20 }}>
                            <Label style={styles.labelStyle}>אימייל</Label>
                            <Input onChangeText={this.emailChange} keyboardType="email-address" returnKeyType="next" />
                        </Item>
                        <Item floatingLabel style={{ marginLeft: 20, marginRight: 20 }}>
                            <Label style={styles.labelStyle}>סיסמא</Label>
                            <Input onChangeText={this.passChange} returnKeyType="next" />
                        </Item>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <Item floatingLabel style={{ width: 150 }}>
                                <Label style={styles.labelStyle}>גובה בס"מ</Label>
                                <Input onChangeText={this.heightChange} returnKeyType="next" keyboardType="numeric" />
                            </Item>
                            <Item floatingLabel style={{ width: 150 }}>
                                <Label style={styles.labelStyle}>משקל בק"ג</Label>
                                <Input onChangeText={this.weightChange} returnKeyType="next" keyboardType="numeric" />
                            </Item>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Item picker>
                                <Picker
                                    prompt="מין"
                                    style={{ width: undefined, color: 'rgba(0,0,0,0.7)' }}
                                    placeholder="Select your gender"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.sex}
                                    onValueChange={this.sexChange}
                                >
                                    <Picker.Item label="בחירת מין" value="key0" />
                                    <Picker.Item label="גבר" value="0" />
                                    <Picker.Item label="אישה" value="1" />
                                </Picker>
                            </Item>
                            <View style={{ marginTop: 30 }}>
                                <Item picker>
                                    <Picker
                                        prompt="רמת אימון"
                                        style={{ width: undefined, color: 'rgba(0,0,0,0.7)' }}
                                        placeholder="Select your gender"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.level}
                                        onValueChange={this.levelChange}
                                    >
                                        <Picker.Item label="רמת אימון" value="key0" />
                                        <Picker.Item label="לא מתאמן עד מתאמן קל מאד " value="0" />
                                        <Picker.Item label="אימונים קלים - 1-3 ימים בשבוע" value="1" />
                                        <Picker.Item label="אימונים בינוניים - 3-5 ימים בשבוע" value="2" />
                                        <Picker.Item label="אימונים קשים - 6/7 ימים בשבוע" value="3" />
                                        <Picker.Item label="עבודה פיזית / שני אימונים ביום" value="4" />
                                    </Picker>
                                </Item>
                            </View>
                        </View>
                    </Form>
                </Content>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => null}
                        style={styles.modalStyle}
                    >
                        <View style={{ top: (HEIGHT / 2) - 200, backgroundColor: "rgba(93,108,111,0.6)", height: 300, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 25, color: "white" }}>
                                {this.state.errMsg}
                            </Text>
                        </View>
                    </Modal>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Button block danger onPress={this.registerClicked} style={{ width: WIDTH / 2 }}>
                        <Text style={{ color: "white" }}>הרשם</Text>
                    </Button>
                    <Button block danger onPress={() => this.props.navigation.navigate("Welcome")} style={{ width: WIDTH / 2 }}>
                        <Text style={{ color: "white" }}>חזרה</Text>
                    </Button>
                </View>
            </Container>
        )
    };

}
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = {
    modalStyle: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    labelStyle: {
        paddingRight: 10
    }
}
import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Container, Header, Content, Form, Item, Picker, Label, Input, DatePicker, Button } from 'native-base';

var d = new Date();
var n = d.getFullYear();

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

    registerClicked = () => {
        console.warn(this.state.name);
    }
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>שם</Label>
                            <Input onChangeText={this.nameChange} returnKeyType="next" />
                        </Item>
                        <Item floatingLabel>
                            <Label>אימייל</Label>
                            <Input onChangeText={this.emailChange} keyboardType="email-address" returnKeyType="next" />
                        </Item>
                        <Item floatingLabel>
                            <Label>סיסמא</Label>
                            <Input onChangeText={this.passChange} returnKeyType="next" />
                        </Item>
                        <Item floatingLabel>
                            <Label>תאריך לידה</Label>
                            <Input onChangeText={this.ageChange} returnKeyType="next" keyboardType="numeric" />
                        </Item>
                        <DatePicker
                            defaultDate={new Date(2018, 4, 4)}
                            minimumDate={new Date(2018, 1, 1)}
                            maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="תאריך לידה"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={this.setDate}
                        />

                        <Item floatingLabel>
                            <Label>גובה בס"מ</Label>
                            <Input onChangeText={this.heightChange} returnKeyType="next" keyboardType="numeric" />
                        </Item>
                        <Item floatingLabel last>
                            <Label>משקל בק"ג</Label>
                            <Input onChangeText={this.weightChange} returnKeyType="next" keyboardType="numeric" />
                        </Item>
                        <View style={{ marginTop: 45 }}>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    style={{ width: undefined }}
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
                                        mode="dropdown"
                                        style={{ width: undefined }}
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
                <Button block success onPress={this.registerClicked}>
                    <Text style={{ color: "white" }}>הרשם</Text>
                </Button>
            </Container>
        )
    };

}
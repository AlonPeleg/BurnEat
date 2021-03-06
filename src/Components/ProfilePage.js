import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, I18nManager, Modal, TextInput, Picker, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Item, Label, Input, } from 'native-base';
import axios from 'axios';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        I18nManager.forceRTL(true);
        this.state = {
            mEmail: this.props.navigation.state.params.user.Email,
            mPass: this.props.navigation.state.params.user.Password,
            mName: this.props.navigation.state.params.user.Name,
            mAge: this.props.navigation.state.params.user.Age,
            mSex: this.props.navigation.state.params.user.Sex,
            mHeight: this.props.navigation.state.params.user.Height,
            mWeight: this.props.navigation.state.params.user.Weight,
            mLevel: this.props.navigation.state.params.user.Level,
            modalVisible: false,
        };
    };
    goBack = async () => {
        this.props.navigation.navigate("home");
    }
    nameChange = (e) => {
        this.setState({ mName: e })
    }
    ageChange = (e) => {
        this.setState({ mAge: e })
    }
    sexChange = (e) => {
        this.setState({ mSex: e })
    }
    heightChange = (e) => {
        this.setState({ mHeight: e })
    }
    weightChange = (e) => {
        this.setState({ mWeight: e })
    }
    lvlChange = (e) => {
        this.setState({ mLevel: e })
    }
    updateInfo = async () => {
        const newUser = {
            Name: this.state.mName,
            Email: this.state.mEmail,
            Pass: this.state.mPass,
            Weight: this.state.mWeight,
            Height: this.state.mHeight,
            Age: this.state.mAge,
            Level: this.state.mLevel,
            Sex: this.state.mSex
        };
        axios.post("http://ruppinmobile.tempdomain.co.il/site07/webservice.asmx/Update_info", newUser);
        await AsyncStorage.setItem("user", JSON.stringify(newUser));
        this.setState({ modalVisible: false })
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#DDD' }}>
                <Header style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)' }} />
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text>פרטים אישיים:</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                    <Text>שם: {this.state.mName}</Text>
                                    <Text>גיל: {this.state.mAge}</Text>
                                    <Text>מין: {this.state.mSex ? "נקבה" : "זכר"}</Text>
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem header bordered>
                            <Text>נתונים פיזיים:</Text>
                        </CardItem>
                        <CardItem bordered>
                            <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                                <Text>גובה: {this.state.mHeight} ס"מ </Text>
                                <Text>משקל: {this.state.mWeight} ק"ג </Text>
                            </View>
                        </CardItem>
                        <CardItem header bordered>
                            <Text>רמת אימון:</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Text>
                                רמת האימון שלי: {this.state.mLevel}{"\n\n"}
                                0 : לא מתאמן עד מתאמן קל מאד {"\n"}
                                1 : אימונים קלים - 1-3 ימים בשבוע {"\n"}
                                2 : אימונים בינוניים - 3-5 ימים בשבוע {"\n"}
                                3 :  אימונים קשים - 6/7 ימים בשבוע {"\n"}
                                4 :  עבודה פיזית / שני אימונים ביום {"\n"}
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
                <View visible={this.state.btnVisible}>
                    <TouchableOpacity
                        onPress={() => { this.setState({ modalVisible: true }) }}
                        style={{ justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: "#DDD" }}
                    >
                        <Text>שינוי פרטים</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.goBack}
                        style={{ justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: "#DDD" }}
                    >
                        <Text>לך אחורה</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => null}
                    style={{ position: "absoulute", height: HEIGHT, width: WIDTH }}
                >
                    <Header style={{ backgroundColor: 'rgba(255, 0, 0, 0)' }} />
                    <Content padder style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
                        <Card>
                            <CardItem header bordered>
                                <Text>פרטים אישיים:</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>שם: </Text>
                                            <TextInput onChangeText={this.nameChange} placeholder={this.state.mName} underlineColorAndroid="transparent" style={{ width: 40 }} placeholderTextColor="black" />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>גיל: </Text>
                                            <TextInput onChangeText={this.ageChange} placeholder={this.state.mAge + ''} underlineColorAndroid="transparent" placeholderTextColor="black" keyboardType="numeric" />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>מין: </Text>
                                            <Picker
                                                selectedValue={this.state.mSex}
                                                style={{ width: 100 }}
                                                onValueChange={this.sexChange}>
                                                <Picker.Item label="זכר" value={0} />
                                                <Picker.Item label="נקבה" value={1} />
                                            </Picker>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>נתונים פיזיים:</Text>
                            </CardItem>
                            <CardItem bordered>
                                <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>גובה: </Text>
                                        <TextInput style={{ width: 50 }} onChangeText={this.heightChange} placeholder={this.state.mHeight + 'ס"מ'} underlineColorAndroid="transparent" placeholderTextColor="black" keyboardType="numeric" />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>משקל: </Text>
                                        <TextInput style={{ width: 50 }} onChangeText={this.weightChange} placeholder={this.state.mWeight + 'ק"ג'} underlineColorAndroid="transparent" placeholderTextColor="black" keyboardType="numeric" />
                                    </View>
                                </View>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>רמת אימון:</Text>
                            </CardItem>
                            <CardItem bordered>
                                <View style={{}}>
                                    <Text>רמת האימון שלי: </Text>
                                    <Picker
                                        selectedValue={this.state.mLevel}
                                        style={{ width: 300 }}
                                        onValueChange={this.lvlChange}>
                                        <Picker.Item label="לא מתאמן עד מתאמן קל מאד " value="0" />
                                        <Picker.Item label="אימונים קלים - 1-3 ימים בשבוע" value="1" />
                                        <Picker.Item label="אימונים בינוניים - 3-5 ימים בשבוע" value="2" />
                                        <Picker.Item label="אימונים קשים - 6/7 ימים בשבוע" value="3" />
                                        <Picker.Item label="עבודה פיזית / שני אימונים ביום" value="4" />
                                    </Picker>
                                </View>
                            </CardItem>
                        </Card>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity
                                onPress={() => { this.setState({ modalVisible: false }) }}>
                                <View style={{ backgroundColor: "#DDD", height: 50, width: (WIDTH / 2) - 50, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center' }}>סגירה</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.updateInfo}>
                                <View style={{ backgroundColor: "#DDD", height: 50, width: (WIDTH / 2) - 50, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center' }}>עדכן</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Modal>
            </Container>
        )
    };
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

        //JSON.parse(this.props.navigation.state.params.user).Name



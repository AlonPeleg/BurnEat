import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, I18nManager, Modal } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from 'native-base';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        I18nManager.forceRTL(true);
        this.state = {
            mName: JSON.parse(this.props.navigation.state.params.user).Name,
            mAge: JSON.parse(this.props.navigation.state.params.user).Age,
            mSex: JSON.parse(this.props.navigation.state.params.user).Sex,
            mHeight: JSON.parse(this.props.navigation.state.params.user).Height,
            mWeight: JSON.parse(this.props.navigation.state.params.user).Weight,
            mLevel: JSON.parse(this.props.navigation.state.params.user).Level,
            modalVisible: false,
        };
    };
    goBack = () => {
        this.props.navigation.navigate("home");
    }
    render() {
        return (
            <Container>
                <Header />
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
                <View>
                    <TouchableOpacity
                        onPress={() => { this.setState({ modalVisible: true }) }}
                        style={{ justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: "#DDD" }}
                    >
                        <Text>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.goBack}
                        style={{ justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: "#DDD" }}
                    >
                        <Text>Go Back</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => null}
                    style={{ position: "absoulute", height: HEIGHT, width: WIDTH }}
                >
                    <Header />
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
                                    רמת האימון שלי: {this.state.mLevel}
                                </Text>
                            </CardItem>
                        </Card>
                        <View style={{flex:1,flexDirection:'row',justifyContent: 'space-between',}}>
                            <TouchableOpacity
                                onPress={() => { this.setState({ modalVisible: false }) }}>
                                <View style={{ backgroundColor: "#DDD", height: 50,width:(WIDTH/2)-50 ,justifyContent:'center'}}>
                                    <Text style={{textAlign:'center'}}>close</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.setState({ modalVisible: false }) }}>
                                <View style={{ backgroundColor: "#DDD",  height: 50,width:(WIDTH/2)-50,justifyContent:'center' }}>
                                    <Text style={{textAlign:'center'}}>update</Text>
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



import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, I18nManager } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props)
        I18nManager.forceRTL(true);
        this.state = {

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
                                    <Text>שם: {JSON.parse(this.props.navigation.state.params.user).Name}</Text>
                                    <Text>גיל: {JSON.parse(this.props.navigation.state.params.user).Age}</Text>
                                    <Text>מין: {JSON.parse(this.props.navigation.state.params.user).Sex ? "נקבה" : "זכר"}</Text>
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem header bordered>
                            <Text>נתונים פיזיים:</Text>
                        </CardItem>
                        <CardItem bordered>
                            <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                                <Text>גובה: {JSON.parse(this.props.navigation.state.params.user).Height} ס"מ </Text>
                                <Text>משקל: {JSON.parse(this.props.navigation.state.params.user).Weight} ק"ג </Text>
                            </View>
                        </CardItem>
                        <CardItem header bordered>
                            <Text>רמת אימון:</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Text>
                                רמת האימון שלי: {JSON.parse(this.props.navigation.state.params.user).Level}{"\n\n"}
                                0 : לא מתאמן עד מתאמן קל מאד {"\n"}
                                1 : אימונים קלים - 1-3 ימים בשבוע {"\n"}
                                2 : אימונים בינוניים - 3-5 ימים בשבוע {"\n"}
                                3 :  אימונים קשים - 6/7 ימים בשבוע {"\n"}
                                4 :  עבודה פיזית / שני אימונים ביום {"\n"}
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
                <TouchableOpacity
                    onPress={this.goBack}
                    style={{ justifyContent: 'center', alignItems: 'center', height: 80, backgroundColor: "#DDD" }}
                >
                    <Text>Go Back</Text>
                </TouchableOpacity>
            </Container>
        )
    };
}

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

        //JSON.parse(this.props.navigation.state.params.user).Name



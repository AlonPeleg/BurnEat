import React from 'react';
import { Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import WelcomePage from './src/Components/WelcomPage';
import LoginPage from './src/Components/LoginPage';
import NewUserRegister from './src/Components/NewUserRegister';

const SwitchNav = createSwitchNavigator(
  {
    Welcome: WelcomePage,
    Login: LoginPage,
    NewUser: NewUserRegister,
  }
)
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <SwitchNav />
      </View>
    );
  }
}
const styles = {
  containerStyle: {
    flex: 1,
  }
}
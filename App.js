import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import WelcomePage from './src/Components/WelcomPage';
import LoginPage from './src/Components/LoginPage';
import NewUserRegister from './src/Components/NewUserRegister';
import HomePage from './src/Components/HomePage';
import StepCounter from './src/Components/StepCounter';
import FoodMain from './src/Components/FoodMain';
import OpeningPage from './src/Components/OpeningPage';
import ProfilePage from './src/Components/ProfilePage';
import StepCount from './src/Components/StepCount';
import Fitness from './src/Components/Fitness';
import MyPlate from './src/Components/MyPlate';

const StackNav = createStackNavigator(
  {
    home: HomePage,
  }
)
const SwitchNav = createSwitchNavigator(
  {
    open: OpeningPage,
    Welcome: WelcomePage,
    Login: LoginPage,
    NewUser: NewUserRegister,
    foodMainPage: FoodMain,
    profile: ProfilePage,
    HomePageEnter: StackNav,
    steps: StepCount,
    Fitness: Fitness,
    plate:MyPlate
  }
)
export default class App extends React.Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }
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
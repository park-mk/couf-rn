

import React from 'react';
import { Button,
   Text, 
   View ,
   StyleSheet,
   SafeAreaView,
   TextInput,
   Platform,
   StatusBar,
   ScrollView,
} from 'react-native';

import { createStackNavigator, 
  StackViewTransitionConfigs , 
  createBottomTabNavigator, 
  createAppContainer } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import { YellowBox } from 'react-native';

import  CategoryScreen from './screens_category/categoryscreen'
import  TOLScreen from './screens_category/TOLscreen'
import KORScreen from'./screens_category/KORScreen'
import KOR_explainScreen from'./screens_category/KOR_explain'
import AreaScreen from'./screens_area/areascreen'
import Area1Screen from'./screens_area/area1'
import Area2Screen from'./screens_area/area2'
import Area3Screen from'./screens_area/area3'
import Area4Screen from'./screens_area/area4'
import LoginScreen from'./screens_login/loginscreen'
import SignUpScreen from './screens_sign/signUpScreen'


//*****  in order to ignore the warning  *******//
  
//YellowBox.ignoreWarnings(['Setting a timer']);
//YellowBox.ignoreWarnings(['Remote debugger']);
//YellowBox.ignoreWarnings(['Failed prop']);
class HomeScreen extends React.Component {
  render() {
    return (

      <SafeAreaView style={{flex:1}}>
    
          <View style={{ flex: 1}}>
              <Text>Home!</Text>
              <Button
                  title="Go to Category"
                  onPress={() => this.props.navigation.navigate('Category')}
              />
          </View>
      </SafeAreaView>
    );
  }
}

 //*****  build bottom navigator stack mainly:  1.HOME  2. CATEGORY  3. AREA  4.LOGIN  *******//
 const HomeStack = createStackNavigator({
   
  Home: { screen: HomeScreen ,
    navigationOptions: {
      header: null,       // HEADER DELETE
    }
  },
});
  
const CategoryStack = createStackNavigator({
         Category: { screen: CategoryScreen },
         TOL:{screen:TOLScreen},
         KOR:{screen:KORScreen},
         KORex:{screen:KOR_explainScreen},
});

const AreaStack= createStackNavigator({
  Area: {screen: AreaScreen},
  Area1: { screen: Area1Screen},
  Area2: { screen: Area2Screen},
  Area3: { screen: Area3Screen},
  Area4: { screen: Area4Screen},

});


const LoginStack=createStackNavigator({
        Login1: { screen: LoginScreen },
        SignUp: { screen: SignUpScreen}
});




export default createAppContainer(createBottomTabNavigator(
  {  
       
    Home: { screen: HomeStack }, 
    Category: { screen: CategoryStack }, 
    Area:{ screen: AreaStack},
    Login1:{screen:LoginStack},
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
         let iconName;
           if (routeName === 'Home') {
             iconName = `ios-home`;
           } 
           if (routeName === 'Category') {
          iconName = `ios-list`;
           } 
           if (routeName === 'Area') {
          iconName = `ios-subway`;
           } 
           if (routeName === 'Login1') {
          iconName = `ios-subway`;
           } 
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));

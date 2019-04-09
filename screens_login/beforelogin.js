import React from 'react';
import {  Text, View ,StyleSheet, Image,ScrollView} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'
import Profile from './afterloginscreen'
import LoginScreen from './loginscreen'
import SignUpScreen from '../screens_sign/signUpScreen';




 class Loginc extends React.Component {
   

    constructor(props){
      super(props)
           

     
    }
 
    renderScreen() {
        if(firebase.auth().currentUser!=null){
            if(firebase.auth().currentUser.emailVerified==true){
              
              return  <Profile/>;
        } 
    }

        return <LoginScreen/>;
    }

  render() {

       
    return (
        <ScrollView >
            {this.renderScreen()}
        </ScrollView>
    );
  }
}
export default Loginc;


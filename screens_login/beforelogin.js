import React from 'react';
import {  Text, View ,StyleSheet, Image,ScrollView,Alert} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'
import Profile from './afterloginscreen'
import LoginScreen from './loginscreen'





 class Loginc extends React.Component {
   

    constructor(props){
      super(props)
      this.state = ({
        email: '',})

     
    }
     componentDidMount() {


      // Toggle the state every second
      setInterval(
          () => this.setState({ email: "a" }),

          1000
      );





      this.makeRemoteRequest();

  }

  makeRemoteRequest = () => {

    console.log("reload");

  };
 
    renderScreen() {
     
        if(firebase.auth().currentUser!=null){
         
       
              
              return  <Profile
             
              />;
        
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


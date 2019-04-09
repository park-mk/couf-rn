

import React from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity,BackHandler} from 'react-native';
import * as firebase from 'firebase'
import BirthdayPicker from '../components/yearmonth'
import { FormLabel, FormInput, FormValidationMessage ,CheckBox,Slider  } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import {Container, Form, Item, Button, Input} from 'native-base'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';


const wrapper = {
    padding: '5%'
};
const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        paddingLeft: wrapper.padding,
        paddingRight: wrapper.padding,
    },
    backgroundImage:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: null,
        height: null,
        opacity:0.5,
        resizeMode: 'cover',
       
    },
  
});
/*
var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'https://www.example.com/?email=immk100797@gmail.com' ,
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };*/

class SignUp2 extends  React.Component {
  
    constructor(props){
        super(props)
 
        this.state=({
            email: '',
            password: '',
            firstname:'',
            lastname:'',
            age:'',
            male:false,
            female:false,
            checked: false,
            verify:0, 
            year:0,
            month:0,
            day:0,
            vvv:'verify',
            nickname:'nic',
            lastRefresh: Date(Date.now()).toString(),
            
           

        })
        this.refreshScreen = this.refreshScreen.bind(this)
    } 
    
   static navigationOptions={
          title:'SignUpScreen',
          headerLeft:null,

   } 
    refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
  }
  
 


    verify=(email,password)=>{ 

      
   
      
            
    
       var actionCodeSettings = {
           url: 'https://www.example.com/?email=' + email,
           iOS: {
             bundleId: 'com.example.ios'
           },
           android: {
             packageName: 'com.example.android',
             installApp: true,
             minimumVersion: '12'
           },
           handleCodeInApp: true,
           // When multiple custom dynamic link domains are defined, specify which
           // one to use.
           dynamicLinkDomain: "couf.page.link"
         };

         firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
           .then(function() {
             // Verification email sent.
               this.state.vvv="verifying check email";
             alert("when the email is sent ");
             console.log("when the email is sent "+firebase.auth().currentUser.emailVerified);
           

           })
           .catch(function(error) {
               alert(error.code)
             // Error occurred. Inspect error.code. 
           });
       }
   
   /*
   if(firebase.auth().currentUser.emailVerified==true){
    alert("singup success!!")
  this.props.navigation.navigate('Profile')
  }
   else  alert ("you have not verified your email yet ")*/
   singUpUser1=(email,password)=>{ 

    firebase.auth().currentUser.reload().then(() => {});
    if(firebase.auth().currentUser.emailVerified==true){
        alert("singup success!!")
        let newPostKey = firebase.database().ref().child('userinfo').push().key;
        console.log(newPostKey);
        firebase.database().ref('userinfo/'+ newPostKey).set({
                nickname:this.state.nickname,
                  email : email,
                password: password,
               firstname: this.state.firstname,
                lastname: this.state.lastname,
                 male:this.state.male,
                year:this.state.year,
                month:this.state.month,
                day:this.state.day,
                uid:newPostKey,
                 
        });


      


      this.props.navigation.navigate('Profile')
      }
       else  alert ("you have not verified your email yet ")
    

  
       
      
   
   
   

}
    render() {
       

        const { navigation } = this.props;
        this.state.email = navigation.getParam('email', 'NO-ID');
       this.state.password = navigation.getParam('password', 'NO-ID');
       
      this.state.firstname = navigation.getParam('firstname', 'NO-ID');
        this.state.lastname= navigation.getParam('lastname', 'NO-ID');
        this.state.male= navigation.getParam('male', 'NO-ID');
        this.state.female= navigation.getParam('female', 'NO-ID');
        this.state.year= navigation.getParam('year', 'NO-ID');
       this.state.month= navigation.getParam('month', 'NO-ID');
       this.state.day= navigation.getParam('day', 'NO-ID');
       this.state.nickname= navigation.getParam('nickname', 'NO-ID');

        return ( 
             
            <Container style={styles.wrapper}>
                <Image style={styles.backgroundImage} source={require('../assets/images/soldier1.jpg')} />
                <Form> 
                     
                    <Item>
                        <Input
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                    </Item>
                   
                        <Text style={ {color:'black'} }>page2</Text>
                   
                    <Button style={ { marginTop: 15, backgroundColor:'#d8d8d8' }}
                            full
                            rounded
                            primary
                           
                           onPress={
                               
                            ()=>this.verify(this.state.email,this.state.password)}
                    >
                        <Text style={ {color:'black'} }>verify</Text>
                    </Button>
                    <Button style={ { marginTop: 15, backgroundColor:'#d8d8d8' }}
                            full
                            rounded
                            primary
                           
                           onPress={
                               
                            ()=>this.singUpUser1(this.state.email,this.state.password)}
                    >
                        <Text style={ {color:'black'} }>finish</Text>
                    </Button>
                    <Button style={ { marginTop: 15, backgroundColor:'#d8d8d8' }}
                            full
                            rounded
                            primary
                           
                           onPress={
                               
                            ()=>this.refreshScreen()}
                    >
                      <Text>Last Refresh: {this.state.lastRefresh}</Text>
                      </Button>
                    <Button style={ { marginTop: 15, backgroundColor:'#d8d8d8' }}
                            full
                            rounded
                            primary
                           
                           onPress={
                               
                            ()=>this.Out(this.state.email,this.state.password)}
                    >
                        <Text style={ {color:'black'} }>quit</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}


export default SignUp2;
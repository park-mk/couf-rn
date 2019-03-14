import React from 'react';
import {  Text, View ,TextInput} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'



 import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'
 {/*
 var config = {
  apiKey: "AIzaSyDaIX_KfCGuoNwvsZkMKZpjRTq9wket-G8",
  authDomain: "react-nativedb-4eb41.firebaseapp.com",
  databaseURL: "https://react-nativedb-4eb41.firebaseio.com",
  projectId: "react-nativedb-4eb41",
  storageBucket: "react-nativedb-4eb41.appspot.com",
  messagingSenderId: "851136914068"

};
firebase.initializeApp(config);*/}

 class LoginScreen extends React.Component {


    constructor(props){
      super(props)
           

      this.state=({
       email: '',
       password: ''

 
      })
    }
   singUpUser=(email,password)=>{
     try {
        if(this.state.password.length<6){
          alert("longer than 6 please")
          return 
        }
          else  alert("success singup")
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email.trim(),password)
     }
   
     catch(error){
      console.log(error.toString())
   }
  }
    
  loginUser=(email,password)=>{
    
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        alert("loginsuccess")
        
      })
    }
    catch(error){
      console.log(error.toString())
    }
  }
  render() {
    return (
      <Container>
        <Form>
          <Item>
            <Label>email </Label>
             <Input 
             autoCorrect={false}
             autoCapitalize="none"
             onChangeText={(email)=>this.setState({email})}
             />
            </Item>
            <Item>
            <Label>password </Label>
             <Input 
             secureTextEntry={true}
             autoCorrect={false}
             autoCapitalize="none"
             onChangeText= {(password)=>this.setState({password})}
             />
            </Item>

            <Button style={{marginTop:10}}
            full
            rounded
            sucess
            onPress={()=>this.loginUser(this.state.email,this.state.password)}
            >
            <Text>login</Text>
            </Button>

            <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={()=>this.singUpUser(this.state.email,this.state.password)}
            >
            <Text>Sign Up</Text>
            </Button>

         </Form>
       </Container>
    );
  }
}
export default LoginScreen; 


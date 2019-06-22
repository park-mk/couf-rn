import React from 'react';
import {  Text, View ,StyleSheet, Image} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer,withNavigation } from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'

const wrapper = {
    padding: '5%'
};
const styles = StyleSheet.create({
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
    wrapper:{
        display: 'flex',
        paddingLeft: wrapper.padding,
        paddingRight: wrapper.padding,
    },
    loginWrapper: {
        display:'flex',
        justifyContent:'center',
        height:'30%',
    },
    loginLogo: {
        textAlign:'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputBox: {
        borderRadius: 30,
        borderBottomWidth: 0,
    },
});


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
    const { navigation } = this.props;
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        alert("loginsuccess")
        navigation.navigate('Profile')
       
      })

     
    }
    catch(error){
      console.log(error.toString())
    }
  }



 

  render() {
    const { navigation } = this.props;
    return (
        <Container style={styles.wrapper}>
            <Image style={styles.backgroundImage} source={require('../assets/images/soldier1.jpg')} />
            <View style={styles.loginWrapper}>
                <Text style={styles.loginLogo}>LOGO</Text>
            </View>
            <Form>
                <Item>
                    <Input
                        style={styles.inputBox}
                        placeholder="E-mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(email)=>this.setState({email})}
                    />
                </Item>
                <Item>
                    <Input
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText= {(password)=>this.setState({password})}
                    />
                </Item>

                <Button style={ {marginTop: 15, backgroundColor:'#bfb393' } }
                        full
                        rounded
                        sucess
                        onPress={()=>this.loginUser(this.state.email,this.state.password)}
                       
                >
                    <Text style={ {color:'white', fontWeight:'bold'} }>Login</Text>
                </Button>
                <Button style={ { marginTop: 15, backgroundColor:'#d8d8d8' }}
                        full
                        rounded
                        primary
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    // onPress={()=>this.singUpUser(this.state.email,this.state.password)}
                >
                    <Text style={ {color:'black'} }>Sign Up</Text>
                </Button>
              

            </Form>
        </Container>
    );
  }
}
export default withNavigation(LoginScreen);


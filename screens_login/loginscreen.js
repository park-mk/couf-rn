import React from 'react';
import {  Text, View ,StyleSheet, Image,TouchableOpacity} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer,withNavigation } from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'
import * as Facebook from 'expo-facebook';

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




  async  signInWithFacebook() {
    const { navigation } = this.props;
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('1998302263810491', {
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
       // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
       const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      );
       
        const responseJSON = JSON.stringify(await response.json());
        console.log(responseJSON);
        var obj = JSON.parse(responseJSON);
        console.log(obj.name);
        console.log(obj.email);
        console.log(obj.picture.data.url);
       // const stripped = phrase.split('dog').join('')
       // console.log(JSON.stringify(response) );
       // console.log( JSON.stringify(response.email)  );
       
       

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
   var password="123456789a"
 
    firebase.auth().createUserWithEmailAndPassword(obj.email.trim(),"123456789a").then(function () {

    }).then(function () {
        let user = firebase.auth().currentUser;
        return user.updateProfile({
            displayName: obj.name,
            photoURL:obj.picture.data.url,
        });
        /*
                    }).then(function(response){
                        let code=email.substring(0,4)+"_"+displayname;

                        ??? 나중에 뭔지 물어보기
                        firebase.database().ref('userinfo/'+ code).update({
                            email:email,
                            user_like_history:"",
                            displayName:displayname,

                        }, function(){
                            alert('Success');
                        });
        */

       alert("please wait");
    }).then(function(){
        navigation.navigate('Profile');

    }).catch(function(error) {
        if(typeof error.message == 'string') alert("please wait");
        console.log(error.message);


        try{
            console.log("so try login")
            firebase.auth().signInWithEmailAndPassword(obj.email,"123456789a").then(function(user){
              alert("loginsuccess")
              navigation.navigate('Profile')
             
             
              
            })
      
           
          }
          catch(error){
            console.log(error.toString())
          }
    });
    







      





  }

  render() {
    const { navigation } = this.props;
   
    return (
       
        <View    style={ { alignItems:'center' }} >
             <Text style={ {color:'#56B8FF', fontFamily:'title-font',fontSize:40 ,marginTop:40,textAlign:'center' } }>LOGIN </Text>

                <TouchableOpacity
                             style={{
                                marginBottom:1,
                                marginTop:120,
                              
                             }}
                             onPress={()=> this.signInWithFacebook()}
                    >
 

                        <Image
                            style={{
                                width: 200,
                                height: 100,
                                
                            }}
                            source={require('../assets/facebook.png')}
                            resizeMode={'contain'}
                        />

                        
                    </TouchableOpacity>

        </View>

          
    );
  }
}
export default withNavigation(LoginScreen);


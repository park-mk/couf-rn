import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking,Dimensions,StyleSheet,ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  firebase from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import *  as Font from'expo-font'
import {Container,Content,Header,Form,Input,Item,Label} from 'native-base'
 //*****  AREA SCREEN : CONNECT TO THE 4 AREA ZONE  *******//
class AreaScreen extends React.Component {
  constructor(props) {
    super(props);
     
    this.state = {
     
      fontLoaded:true,
    };
  }



  


  


  async componentDidMount() {


    
    await Font.loadAsync({

      'Raley-balck':require('../assets/fonts/33676382891.ttf'),
     
      
    });
  
  }
  
  render() {
     if(firebase.auth().currentUser!=null){
    var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

    var usersRef = firebase.database().ref('userinfo/'+code+'/area');


     usersRef.on('value', (snapshot) => {


     m = snapshot.val()
  
      
    
      
      this.props.navigation.navigate('Area'+m);

   })  }
       
    let screenwidth=Dimensions.get('window').width;
    let screenheight=Dimensions.get('window').height; 
    return (
    
         <Container style={styles.wrapper} >
            <ScrollView>
           <ImageBackground style={styles.backgroundImage} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Fbackground1.png?alt=media&token=0c367d67-cadd-4dea-abde-31f51c54ba1d"}} />
           <View    style={ { marginTop:30}} >
            <TouchableOpacity
               onPress={()=> this.props.navigation.navigate('Area1')}>
           <Image  style={{ marginTop:2*screenheight/9,marginLeft:1*screenwidth/8,resizeMode:'cover', padding:0.5 ,width:3*screenwidth/5, height:screenheight/9, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%201.png?alt=media&token=6e60cd73-5c4c-46e1-904d-c65c4050cf07"}} />
           </TouchableOpacity>
           <TouchableOpacity
               onPress={()=> this.props.navigation.navigate('Area2')}>
          
           <Image  style={{ marginTop:2*screenheight/60,marginLeft:1*screenwidth/40, resizeMode:'cover', padding:0.5 ,width:3*screenwidth/5, height:screenheight/9, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%202.png?alt=media&token=6674c090-df82-40b9-8585-378476ec5113"}} />
           </TouchableOpacity>
           <TouchableOpacity
               onPress={()=> this.props.navigation.navigate('Area3')}>
          
           <Image  style={{  marginTop:2*screenheight/60,marginLeft:1*screenwidth/16,resizeMode:'cover', padding:0.5 ,width:3*screenwidth/5, height:screenheight/9, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%203.png?alt=media&token=9eb041e2-3747-4cf8-8bfd-7e1ea120d91c"}} />
           </TouchableOpacity>
               <TouchableOpacity
                   onPress={()=> this.props.navigation.navigate('Area4')}>
           <Image  style={{ marginTop:2*screenheight/60,marginLeft:1*screenwidth/6, resizeMode:'cover', padding:0.5 ,width:3*screenwidth/5, height:screenheight/9, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%204.png?alt=media&token=f7502cd4-96a3-4c3f-8a7e-41f978c1cc0d"}} />
           </TouchableOpacity>
        
           
        
             
                  

               </View>
               </ScrollView>
          
       </Container> 
    
    );
  }
}
export default AreaScreen;

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
     // opacity:0.5,
      resizeMode: 'cover',
  },
  wrapper:{
      display: 'flex',
      paddingLeft: wrapper.padding,
      paddingRight: wrapper.padding,
  },
});
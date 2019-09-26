import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking,Dimensions,StyleSheet,ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
       
    let screenwidth=Dimensions.get('window').width;
    let screenheight=Dimensions.get('window').height; 
    return (
    
         <Container style={styles.wrapper} >
            <ScrollView>
           <ImageBackground style={styles.backgroundImage} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%20back.png?alt=media&token=b9095cde-5fd3-4c89-be28-0ce4d0defee5"}} />
           <View    style={ { marginTop:30}} >
            <TouchableOpacity
               onPress={()=> this.props.navigation.navigate('Area1')}>
           <Image  style={{ marginTop:2*screenheight/9,marginLeft:1*screenwidth/8,resizeMode:'cover', padding:0.5 ,width:3*screenwidth/5, height:screenheight/9, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%201.png?alt=media&token=71eadde1-f1b7-4ecd-b7c6-8ab0e62ab502"}} />
           </TouchableOpacity>
           <TouchableOpacity
               onPress={()=> this.props.navigation.navigate('Area2')}>
          
           <Image  style={{ marginTop:2*screenheight/60,marginLeft:1*screenwidth/40, resizeMode:'cover', padding:0.5 ,width:3*screenwidth/5, height:screenheight/9, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%202.png?alt=media&token=364cf838-d93a-4183-bcbb-f456105f766d"}} />
           </TouchableOpacity>
           <TouchableOpacity
               onPress={()=> this.props.navigation.navigate('Area3')}>
          
           <Image  style={{  marginTop:2*screenheight/60,marginLeft:1*screenwidth/16,resizeMode:'cover', padding:0.5 ,width:3*screenwidth/5, height:screenheight/9, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%203.png?alt=media&token=1b8a44d2-4dfc-437d-8e5a-9ff0d8a36f0a"}} />
           </TouchableOpacity>
               <TouchableOpacity
                   onPress={()=> this.props.navigation.navigate('Area4')}>
           <Image  style={{ marginTop:2*screenheight/60,marginLeft:1*screenwidth/6, resizeMode:'cover', padding:0.5 ,width:3*screenwidth/5, height:screenheight/9, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%204.png?alt=media&token=9f42a327-15cd-433f-9fe7-df89cb418525"}} />
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
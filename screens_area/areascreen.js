import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking,Dimensions,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Font} from 'expo'
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
           
           <Image style={styles.backgroundImage} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%20back.png?alt=media&token=b9095cde-5fd3-4c89-be28-0ce4d0defee5"}} />
           <View    style={ { justifyContent: 'center', alignItems: 'center',marginTop:30}} >
      
           
        
         
        
             
                  

               </View>
          
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
import React from 'react';
import { Button, Text, View ,Image,TouchableOpacity,Linking,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import  firebase from "../firebase";
import *  as Font from'expo-font'
class CHOSEarea extends React.Component {

 async componentDidMount() {
    await Font.loadAsync({

     'Raley-balck':require('../assets/fonts/33676382891.ttf'),
     'Name-font':require('../assets/fonts/Nickainley-Normal_2.ttf'),
     
   });
  
 }


 choosearea =(num)=>{
    

  var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
   
  firebase.database().ref('userinfo/' + code ).update({
         
            area:num,
  }, function () {

  });
   
}
  

  render() {
    let screenwidth=Dimensions.get('window').width;
    let screenheight=Dimensions.get('window').height; 
   
     
    return ( 
      <View 
      >
           <TouchableOpacity
         onPress={()=> this.choosearea(1)}>
     <Image  style={{ resizeMode:'cover', marginLeft:120,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%201.png?alt=media&token=6e60cd73-5c4c-46e1-904d-c65c4050cf07"}} />
     </TouchableOpacity>
     <TouchableOpacity
        onPress={()=> this.choosearea(2)}>
    
     <Image  style={{  resizeMode:'cover', marginLeft:120,marginTop:20,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%202.png?alt=media&token=6674c090-df82-40b9-8585-378476ec5113"}} />
     </TouchableOpacity>
     <TouchableOpacity
         onPress={()=> this.choosearea(3)}>
    
     <Image  style={{  resizeMode:'cover',marginLeft:120, marginTop:20,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%203.png?alt=media&token=9eb041e2-3747-4cf8-8bfd-7e1ea120d91c"}} />
     </TouchableOpacity>
         <TouchableOpacity
           onPress={()=> this.choosearea(4)}>
     <Image  style={{ resizeMode:'cover', marginLeft:120,marginTop:20,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%204.png?alt=media&token=f7502cd4-96a3-4c3f-8a7e-41f978c1cc0d"}} />
     </TouchableOpacity>
        </View>
    );
  }
}
export default withNavigation(CHOSEarea);
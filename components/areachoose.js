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
     <Image  style={{ resizeMode:'cover', marginLeft:120,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%201.png?alt=media&token=71eadde1-f1b7-4ecd-b7c6-8ab0e62ab502"}} />
     </TouchableOpacity>
     <TouchableOpacity
        onPress={()=> this.choosearea(2)}>
    
     <Image  style={{  resizeMode:'cover', marginLeft:120,marginTop:20,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%202.png?alt=media&token=364cf838-d93a-4183-bcbb-f456105f766d"}} />
     </TouchableOpacity>
     <TouchableOpacity
         onPress={()=> this.choosearea(3)}>
    
     <Image  style={{  resizeMode:'cover',marginLeft:120, marginTop:20,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%203.png?alt=media&token=1b8a44d2-4dfc-437d-8e5a-9ff0d8a36f0a"}} />
     </TouchableOpacity>
         <TouchableOpacity
           onPress={()=> this.choosearea(4)}>
     <Image  style={{ resizeMode:'cover', marginLeft:120,marginTop:20,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%204.png?alt=media&token=9f42a327-15cd-433f-9fe7-df89cb418525"}} />
     </TouchableOpacity>
        </View>
    );
  }
}
export default withNavigation(CHOSEarea);
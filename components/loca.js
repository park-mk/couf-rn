import React from 'react';
import { Button, Text, View ,Image,TouchableOpacity,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import *  as Font from'expo-font'
class LOCA extends React.Component {

 async componentDidMount() {
    await Font.loadAsync({

     'Raley-balck':require('../assets/fonts/33676382891.ttf'),
     'Name-font':require('../assets/fonts/Nickainley-Normal_2.ttf'),
     
   });
  
 }





  render() {
     
     
    return (
      <View  style={{marginTop:30}}>  
        
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity
              onPress={()=>  Linking.openURL(JSON.stringify(this.props.loca).replace(/^"(.+)"$/,'$1')).catch((err) => console.error('An error occurred', err))}
               
            > 
               <View style={{flexDirection:'row'}}>
    <Text  style={{fontSize:30 , 
                         marginLeft:20,  color:'black',
           marginRight:this.props.margin,fontFamily:'title-font'}} > {this.props.name} 
       </Text>
       
            
      
          
       
              <Image
                style={{
                  width: 30, 
                  height: 30, alignContent: 'center',
                }}
                resizeMode={'contain'}
                source={require('../assets/place_lo.png')}
              />
              </View>
             </TouchableOpacity>
             
            
           
             </View>
      </View>
    );
  }
}
export default withNavigation(LOCA);
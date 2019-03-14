import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
 //*****  AREA SCREEN : CONNECT TO THE 4 AREA ZONE  *******//
class AreaScreen extends React.Component {
  render() {
    return (
      
      <ScrollView style={{height:1500, marginTop:0}}>
           
        <Text style={{fontWeight: 'bold',fontSize:30,textAlign: 'center',backgroundColor:'grey'}}>Sort by area</Text>
        <TouchableOpacity style={{ flex :1, marginTop: 0 ,}}
         onPress={() => this.props.navigation.navigate('Area1')}>
        
        <Image
          
        source={require('../assets/ar1.png')}
       style={{resizeMode:'cover'}}
         />
        </TouchableOpacity>
        <TouchableOpacity style={{flex :1, marginTop: 30 ,}}
         onPress={() => this.props.navigation.navigate('Area2')}>
        
        <Image
        
        source={require('../assets/ar2.png')}
         />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex :1, marginTop: 30 ,}}
         onPress={() => this.props.navigation.navigate('Area3')}>
        
        <Image
        
        source={require('../assets/ar3.png')}
         />
        </TouchableOpacity>
        <TouchableOpacity style={{flex :1, marginTop: 30 ,}}
         onPress={() => this.props.navigation.navigate('Area4')}>
        
        <Image
        
        source={require('../assets/ar4.png')}
         />
        </TouchableOpacity>
     </ScrollView>
     
    );
  }
}
export default AreaScreen;

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
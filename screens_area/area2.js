import React from 'react';

import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
class Area2Screen extends React.Component {
  render() {
    return (
      <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
        
      <TouchableOpacity style={{ flex :3, marginTop: 0 ,}}
       onPress={() => this.props.navigation.navigate('Area1')}>
      
      <Image  
        
      source={require('../assets/buyandsell.png')}
     style={{resizeMode:'cover'}}
       />
      </TouchableOpacity>
      <TouchableOpacity style={{ flex :3, marginTop: 0 ,}}
       onPress={() => this.props.navigation.navigate('YS')}>
      
      <Image  
        
      source={require('../assets/bus.png')}
     style={{resizeMode:'cover'}}
       />
      </TouchableOpacity>
      <TouchableOpacity style={{ flex :3, marginTop: 0 ,}}
       onPress={() => this.props.navigation.navigate('Area3')}>
      
      <Image  
        
      source={require('../assets/nearus.png')}
     style={{resizeMode:'cover'}}
       />
      </TouchableOpacity>
     
    </View>
    );
  }
}
export default Area2Screen;
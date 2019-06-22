import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Font} from 'expo'
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
      <View> 
      <ScrollView style={{height:1500, marginTop:0}}
         horizontal={true}
      
      >
           
          <View style={flex=1}>
        <TouchableOpacity style={{ width:screenwidth-10, marginTop: 0 ,}}
         onPress={() => this.props.navigation.navigate('Area1')}>
        
        <Image  
          
        source={require('../assets/ar1.png')}
       style={{resizeMode:'cover'}}
         />  


        </TouchableOpacity>

        <TouchableOpacity style={{ width:screenwidth-10, marginTop: 100 ,}}
         onPress={() => this.props.navigation.navigate('TMC')}>
        
         <Text style={{fontSize:20,textAlign:'center'}}>  TMC BUS TIME TELLER</Text>
         

        </TouchableOpacity>
        <TouchableOpacity style={{ width:screenwidth-10, marginTop: 20 ,}}
         onPress={() => this.props.navigation.navigate('H221')}>
        
         <Text style={{fontSize:20,textAlign:'center'}}>  H221 BUS TIME TELLER</Text>
         

        </TouchableOpacity>
        <TouchableOpacity style={{ width:screenwidth-10, marginTop: 20 ,}}
         onPress={() => this.props.navigation.navigate('H221')}>
        
         <Text style={{fontSize:20,textAlign:'center',}}>  HOVEY BUS TIME TELLER</Text>
         

        </TouchableOpacity>

        <TouchableOpacity style={{ width:screenwidth-10, marginTop: 20 ,}}
         onPress={() => this.props.navigation.navigate('A1WTE')}>
        
         <Text style={{fontSize:20,textAlign:'center',fontFamily:'Raley-balck'}}>  WHAT TO EAT</Text>
         

        </TouchableOpacity>

        <TouchableOpacity style={{ width:screenwidth-10, marginTop: 20 ,}}
         onPress={() => this.props.navigation.navigate('A1WTD')}>
        
         <Text style={{fontSize:20,textAlign:'center',fontFamily:'Raley-balck'}}> WHAT TO DO</Text>
         

        </TouchableOpacity>
        </View> 

          <ScrollView>
  
        <TouchableOpacity style={{flex :1,marginLeft:-20}}
        onPress={() => this.props.navigation.navigate('Area2')}>
        
        <Image
        
        source={require('../assets/ar2.png')}
         />
        </TouchableOpacity>
       



        <TouchableOpacity style={{  marginTop: 100 ,}}
         onPress={() => this.props.navigation.navigate('YS')}>
        
         <Text style={{fontSize:20,textAlign:'center'}}>  BUS TIME TELLER</Text>
         

        </TouchableOpacity>
          
        <TouchableOpacity style={{ marginTop: 20 ,}}
         onPress={() => this.props.navigation.navigate('H221')}>
        
         <Text style={{fontSize:20,textAlign:'center',fontFamily:'Raley-balck'}}>  WHAT TO EAT</Text>
         

        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 20 ,}}
         onPress={() => this.props.navigation.navigate('H221')}>
        
         <Text style={{fontSize:20,textAlign:'center',fontFamily:'Raley-balck'}}> WHAT TO DO</Text>
         

        </TouchableOpacity>

        </ScrollView>
       



        <ScrollView>
  
  <TouchableOpacity style={{flex :1,marginLeft:-20}}
  onPress={() => this.props.navigation.navigate('Area3')}>
  
  <Image
  
  source={require('../assets/ar3.png')}
   />
  </TouchableOpacity>
 



  <TouchableOpacity style={{  marginTop: 100 ,}}
   onPress={() => this.props.navigation.navigate('GREEN')}>
  
   <Text style={{fontSize:20,textAlign:'center'}}>  GREEN  BUS TIME TELLER</Text>
   

  </TouchableOpacity>

  <TouchableOpacity style={{  marginTop: 20 ,}}
   onPress={() => this.props.navigation.navigate('Red')}>
  
   <Text style={{fontSize:20,textAlign:'center'}}>  RED  BUS TIME TELLER</Text>
   

  </TouchableOpacity>

  <TouchableOpacity style={{  marginTop: 20 ,}}
   onPress={() => this.props.navigation.navigate('BLUE')}>
  
   <Text style={{fontSize:20,textAlign:'center'}}>  BLUE BUS TIME TELLER</Text>
   

  </TouchableOpacity>
    
  <TouchableOpacity style={{ marginTop: 20 ,}}
   onPress={() => this.props.navigation.navigate('H221')}>
  
   <Text style={{fontSize:20,textAlign:'center',fontFamily:'Raley-balck'}}>  WHAT TO EAT</Text>
   

  </TouchableOpacity>

  <TouchableOpacity style={{ marginTop: 20 ,}}
   onPress={() => this.props.navigation.navigate('H221')}>
  
   <Text style={{fontSize:20,textAlign:'center',fontFamily:'Raley-balck'}}> WHAT TO DO</Text>
   

  </TouchableOpacity>

  </ScrollView>
      < ScrollView>
        <TouchableOpacity style={{flex :1,}}
         onPress={() => this.props.navigation.navigate('Area4')}>
        
        <Image
        
        source={require('../assets/ar4.png')}
         />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 100 ,}}
   onPress={() => this.props.navigation.navigate('H221')}>
  
   <Text style={{fontSize:20,textAlign:'center',fontFamily:'Raley-balck'}}>  WHAT TO EAT</Text>
   

  </TouchableOpacity>

  <TouchableOpacity style={{ marginTop: 20 ,}}
   onPress={() => this.props.navigation.navigate('H221')}>
  
   <Text style={{fontSize:20,textAlign:'center',fontFamily:'Raley-balck'}}> WHAT TO DO</Text>
   

  </TouchableOpacity>

        </ScrollView>
     </ScrollView>
     </View>
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
import React from 'react';
import { Button, Text, View ,Image,TouchableOpacity,Linking,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import *  as Font from'expo-font'
class Category extends React.Component {

 async componentDidMount() {
    await Font.loadAsync({

     'Raley-balck':require('../assets/fonts/33676382891.ttf'),
     'Name-font':require('../assets/fonts/Nickainley-Normal_2.ttf'),
     
   });
  
 }



  

  render() {
    var  go;
    let dimensions = Dimensions.get("window");
    let imageheight = dimensions.height *0.24;
    let imagewidth = dimensions.width * 0.44; 
    console.log(imageheight,imagewidth);
     if(this.props.name=='Tips of life'){
       go='TOL'     
     }
     else  if (this.props.name=='Exchange'){
       go='Exchange'
       }
     else go='KORca'
     
    return ( 
      <View style={{ height:imageheight ,width:imagewidth,marginLeft:10,marginTop:20, 
       // borderWidth: 3,borderColor:'#dddddd' ,borderRadius:10,
      }}>  
    
            
      <TouchableOpacity style={{flex:4,width :null,height:null}}
              onPress={this.props.onPress}
            /* onPress={() =>{
              if(go!='Exchange')
              this.props.navigation.navigate(go)
              else 
              Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))
             }
            }*/
            
       >  
      
            
      
          
             <Image source={this.props.imageURI}
                      
                  style={{flex:4,width :null,height:null,resizeMode:'contain'}}
             /> 
             
            
           
      </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(Category);
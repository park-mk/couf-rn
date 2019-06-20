import React from 'react';
import { Button, Text, View ,Image,TouchableOpacity,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';

class Category extends React.Component {
  render() {
    var  go;
     if(this.props.name=='Tips of life'){
       go='TOL'     
     }
     else  if (this.props.name=='Exchange'){
       go='Exchange'
       }
     else go='KORca'
     
    return (
      <View style={{ height:180 ,width:150,marginLeft:20,marginTop:20, 
       borderWidth: 0.5,borderColor:'#dddddd' 
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
                      
                  style={{flex:3,width :null,height:null,resizeMode:'cover'}}
             /> 
              <Text style={{flex:1, textAlign: 'center',fontWeight: 'bold',fontStyle: 'italic',fontSize:17,marginTop:10 }}>{this.props.name}</Text>
            
           
      </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(Category);
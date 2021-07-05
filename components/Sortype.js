import React from 'react';
import { Button, Text, View ,Image,TouchableOpacity,Dimensions,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import *  as Font from'expo-font'
class Sorttype extends React.Component {
  


      


  render() {
    let dimensions=Dimensions.get("window");
    imageheight =Math.round((dimensions.width*9)/16);
    imagewidth =dimensions.width;
     if(this.props.typeof==0){
     
    return (
       <View>
         <Text>    </Text>
      </View>
     
    );}
    if(this.props.typeof==1){
     
        return (
           <View style={{marginLeft:15}} >
              
              <Text
               style={{fontFamily:'content-font',fontSize:20,marginLeft:20,marginRight:20}}
             >{this.props.text}</Text>
            
          </View>
         
        );}
        if(this.props.typeof==2){
           
          return (
             <View  >
                
                <Image
             style={{
                 width: imagewidth,
                 height: this.props.size,
                 borderBottomWidth: 3,
             }}
             source={{ uri: this.props.text }}
    
         />
              
            </View>
           
          );}
          if(this.props.typeof==3){
           
            return (
               <View  >
                  <TouchableOpacity
                onPress={()=> Linking.openURL(this.props.uri).catch((err) => console.error('An error occurred', err))}
                 
                >
                  <Image
               style={{
                   width: imagewidth,
                   height: this.props.size,
                   borderBottomWidth: 3,
               }}
               source={{ uri: this.props.text }}
      
           />
                </TouchableOpacity>
              </View>
             
            );
          }



        if(this.props.typeof==4){
         console.log("type c")
          return (
             <View style={{marginLeft:15}} >
                <TouchableOpacity
                onPress={()=> Linking.openURL(this.props.text).catch((err) => console.error('An error occurred', err))}
                 
                >
                <Text
                 style={{fontFamily:'content-font',fontSize:20,marginLeft:20,marginRight:20,color:'blue'}}
               >{this.props.text}</Text>
               </TouchableOpacity>
            </View>
           
          );}

      

     else 
     return (
        <View>
      
       </View>
      
     );
  }
}
export default withNavigation(Sorttype);
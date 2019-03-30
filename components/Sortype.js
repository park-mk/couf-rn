import React from 'react';
import { Button, Text, View ,Image,TouchableOpacity,Dimensions,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';

class Sorttype extends React.Component {
  
  render() {
    let dimensions=Dimensions.get("window");
    imageheight =Math.round((dimensions.width*9)/16);
    imagewidth =dimensions.width;
     if(this.props.typeof==0){
     
    return (
       <View>
           <Text/>
      </View>
     
    );}
    if(this.props.typeof==1){
     
        return (
           <View>
               <Text  style={{fontSize:this.props.size , lineHeight: 30,fontWeight:this.props.fontweight, fontStyle:this.props.fontstyle,marginLeft:this.props.margin, marginRight:this.props.margin}} > {this.props.text}</Text>
          </View>
         
        );}

     if(this.props.typeof==2){
       
           return (
               <View>
                    <Image
          style={{height:imageheight,width:imagewidth }}
          source={{uri:this.props.uri.toString()}}
        />
              </View>
             
            );}

            if(this.props.typeof==3){
            
                return (
                    <View>

                         <TouchableOpacity   style={{height:imageheight,width:imagewidth }}
             
             onPress={()=>  Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
       >  
      
        
             <Image  style={{height:imageheight,width:imagewidth }}
          source={{uri:this.props.uri.toString()}}
             /> 
            
            
           
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
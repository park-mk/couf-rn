import React from 'react';
import { Button, Text, View ,Image,TouchableOpacity,Dimensions,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import {Font} from 'expo'
class Sorttype extends React.Component {
  


  async componentDidMount(){
    await Font.loadAsync({

       'content-font':require('../assets/fonts/Bayon.ttf'),
       
     });
     this.setState({fontLoaded:true})
   }
      


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
           <View style={{marginLeft:15}} >
              
               <Text  style={{fontSize:this.props.size , lineHeight: 30,
               marginLeft:0, 
               marginRight:this.props.margin,fontFamily:'content-font'}} > {this.props.text}</Text>
              {console.log("12/n       ")}
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
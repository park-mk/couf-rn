import React from 'react';

import { Button, View, Text, ScrollView, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, Linking, Modal } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { Ionicons,MaterialIcons ,Entypo,Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from  '../components/Textedit'
import  firebase,{storage}  from "../firebase";
import Comment from '../components/comment'

class NEWSS extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      up: 0,
      voted: false,
      commentVisible: false,
    
    };
  }

   
    render() {
       let dimensions=Dimensions.get("window");
       let imageheight=6*dimensions.height/10
       //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth =dimensions.width;
      const { navigation } = this.props;
      const title = navigation.getParam('title', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
  
      const date = navigation.getParam('date', 'NO-ID');
      const topimage = navigation.getParam('topimage', 'NO-ID');
   
      
   
    
       var vivid =JSON.stringify(description);
       var res = vivid.substring(1, 4);
    
      return ( 

        <View>
          
        <Header
      leftComponent={  
       <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('NEWS')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  /> 
  </TouchableOpacity>
  } 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: 'NEWS', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
     
/>
        <ScrollView
  
     
        
          >   
    
      
        
           
          

        <View style={{ flex: 2 ,marginTop:0}}>
        
 <ImageBackground    source={{uri:topimage.toString()}} style={{height:imageheight,width:imagewidth }}>
        
        <View style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      
         </View> 
</ImageBackground>  
      
        <View >
       
              </View>
          <Text style={{fontFamily:'title-font' ,fontSize:30,marginLeft:10,color:'#56B8FF' }}> {JSON.stringify(title).replace(/^"(.+)"$/,'$1')}</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontFamily:'title-font' ,fontSize:20,marginLeft:imagewidth-100,alignItems:'flex-end',color:'grey' }}> {JSON.stringify(date).replace(/^"(.+)"$/,'$1')}</Text>
       
          
          
          </View>
          <View style={{ flexDirection: 'row', flex: 3,marginTop:20}} >
            
           
          <View style={{ flex: 1 ,alignItems:'center'}}>
                
         
  
             
                
              </View>
             


       
            
            </View>
          
          
            <Text style={{fontSize:20,fontFamily:'content-font' ,marginLeft:10,marginTop:20}}>{JSON.stringify(description).replace(/^"(.+)"$/,'$1')}</Text>
         
 </View>
       
      <View  style={{   marginLeft:20,marginTop:50, flexDirection:'row',marginRight:20}} >
      <Text style={{textAlign:'left', fontSize:20,color:'grey'}}>     </Text> 
    
   
       </View>
   
        </ScrollView>
        </View>
      );
    }
  }

  export default NEWSS;
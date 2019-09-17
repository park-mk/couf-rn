import React from 'react';
import { Button, View, Text ,ScrollView,Image,Dimensions,ImageBackground,StyleSheet,TouchableHighlight,TouchableOpacity,SafeAreaView,Linking} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { Ionicons,MaterialIcons ,Entypo,Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from  '../components/Textedit'
import  firebase,{storage}  from "../firebase";

class CONCERTEX extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      up: 0,
      voted: false,
    
    };
  }






 

 




   
    render() {
       let dimensions=Dimensions.get("window");
       let imageheight=140*dimensions.width/300
       //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth =dimensions.width/3;
      const { navigation } = this.props;
      const name = navigation.getParam('name', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
      const date=navigation.getParam('date', 'NO-ID');
      const location = navigation.getParam('location', 'NO-ID');
      const loca = navigation.getParam('loca', 'NO-ID');
      const topimage = navigation.getParam('topimage', 'NO-ID');
  
       
      var number_of_pagraph=0; 
    
     
     
    
       var vivid =JSON.stringify(description);
       var res = vivid.substring(1, 4);
      
     
      return ( 

        <View>
        <Header
      leftComponent={  
       <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('FESTIVAL')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  /> 
  </TouchableOpacity>
  } 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: 'TRAVEL', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
     
       />
        <ScrollView>
           
          

        <View style={{ alignItems:'center',backgroundColor:'grey'}}>
        
        <ImageBackground    source={{uri:topimage.toString()}} style={{height:imageheight*1.5,width:imagewidth*1.5 }}>
        
        </ImageBackground>  
        </View>
        <View>
        <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10,color:'#56B8FF',textAlign:'center' }}> {JSON.stringify(name).replace(/^"(.+)"$/,'$1')}</Text>

        <Text style={{fontFamily:'content-font' ,fontSize:20,marginLeft:10,color:'#56B8FF',textAlign:'center'}}> {JSON.stringify(date).replace(/^"(.+)"$/,'$1')}</Text>
        <TouchableOpacity
              onPress={()=>  Linking.openURL(JSON.stringify(loca).replace(/^"(.+)"$/,'$1')).catch((err) => console.error('An error occurred', err))}
              
            > 
               <Text style={{fontFamily:'content-font' ,fontSize:20,marginLeft:10,color:'#56B8FF',textAlign:'center',textDecorationLine:'underline'}}> {JSON.stringify(location).replace(/^"(.+)"$/,'$1')}</Text>
             </TouchableOpacity>
       
              </View>
       
        
        
          
          
         
           
       
      <View  style={{   marginTop:20,alignItems:'center'}} >
 
    
   
       </View>
        
        </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer: {
      flexDirection: 'row',
      backgroundColor: '#222',
    },
    image: {
      width: 200,
      height:100,
      height: '100%',
    },
    buttons: {
      height: 15,
      marginTop: 0,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: {
      margin: 3,
      width: 8,
      height: 8,
      borderRadius: 8 / 2,
      backgroundColor: '#ccc',
      opacity: 0.9,
    },
    buttonSelected: {
      opacity: 1,
      backgroundColor: '#fff',
    },
  });
  export default  CONCERTEX;
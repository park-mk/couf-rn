import React from 'react';

import {   FlatList,Button, View, Text, ScrollView, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, Linking, Modal } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { Ionicons,MaterialIcons ,Entypo,Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from  '../components/Textedit'
import  firebase,{storage}  from "../firebase";
import Comment from '../components/comment'
import styled from "styled-components";


const ProfileTopWrap = styled.View`
    display:flex;
    flex-direction: row;  
    padding:0 20px;
    marginTop:30px;
`;
const ProfileTopImage = styled.TouchableHighlight`
    width:35px;
    height:35px;
    border-radius:35px;
`;
const ProfileImage = styled.Image`
    width:35px;
    height:35px;
    border-radius: 17.5;
`;

const ProfileTopRight = styled.View`
    display:flex;
    flex-direction: column;  
    margin-left:20px;
`;



class ITEM extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      up: 0,
      voted: false,
      commentVisible: false,
      
    
    };
  }

  renderItem = ({ item }) => {
    let dimensions=Dimensions.get("window");
    let imageheight=5*dimensions.height/10;
    //let imageheight =Math.round((dimensions.width*9)/12);
    let imagewidth = dimensions.width;

    return (

             <View
              style={{borderWidth:2,borderColor:'#67DBFF',borderRadius:10}}
             >
           
                <Image style={{height:imageheight,width:imagewidth }} source={{ uri: item }} />
            


            </View>
      




    )



}









  
   
    render() {
       let dimensions=Dimensions.get("window");
       let imageheight=6*dimensions.height/10
      
        let imagewidth =dimensions.width;
      const { navigation } = this.props;
      const  imageUrl = navigation.getParam('imageUrl', ()=>{});
       const content= navigation.getParam('content', 'NO-ID');
  
       const displayName = navigation.getParam('displayName', 'NO-ID');
       const photoURL = navigation.getParam('photoURL', 'NO-ID');
   
      
       const location=navigation.getParam('location', 'NO-ID');
      
       const title = navigation.getParam('title', 'NO-ID');
       const price = navigation.getParam('price', 'NO-ID');
       const contact = navigation.getParam('contact', 'NO-ID');
 
    
    
      
    
      return ( 

        <View>
          
        <Header
      leftComponent={  
       <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('BUYLIST')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  /> 
  </TouchableOpacity>
  } 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: 'BUY & SELL', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#67DBFF' } }}
     
/>  

  
        <ScrollView
        
        
          >   
                  <ProfileTopWrap

                  >
                      <ProfileTopImage >
                          <ProfileImage source={{ uri: photoURL }} />
                      </ProfileTopImage>
                      <ProfileTopRight>

                          <Text style={{ fontFamily: 'title-font', fontSize: 18 }}>
                              {displayName}
                          </Text>


                      </ProfileTopRight>
                  </ProfileTopWrap>
                  <Text   style={{fontFamily:'title-font' ,fontSize:30, marginLeft:20,marginTop:10}}>
                    {title}
                </Text>
                <Text   style={{fontFamily:'content-font' ,fontSize:18, marginLeft:14,color:'green'}}>
                    {'$'+price}
                </Text> 
                <Text   style={{fontFamily:'content-font' ,fontSize:20, marginLeft:20,marginTop:10}}>
                    {location}
                </Text> 

                <Text   style={{fontFamily:'content-font' ,fontSize:18, marginLeft:20,marginTop:10,color:'grey'}}>
                    {contact}
                </Text>
                <FlatList
                        data={imageUrl}
                        horizontal={true}
                        renderItem={this.renderItem}
                        keyExtractor={item => item}
                     
                    />




                <Text   style={{fontFamily:'content-font' ,fontSize:20, marginLeft:20,marginTop:10}}>
                   {content}
                </Text>
               
              
                  
                 
                    <View style={{height:130}} >
                       
                    </View>

       



      
       
        </ScrollView>
        </View>
      );
    }
  }
  

  export default  ITEM;
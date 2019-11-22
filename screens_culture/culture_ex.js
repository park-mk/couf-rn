import React from 'react';

import { Button, View, Text, ScrollView, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, Linking, Modal } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { Ionicons,MaterialIcons ,Entypo,Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from  '../components/Textedit'
import  firebase,{storage}  from "../firebase";
import Comment from '../components/comment'
import Sorttype from '../components/Sortype'

class CUL_EX extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      up: 0,
      voted: false,
      commentVisible: false,
      article:[],
      
    
    };
  }



   renderScreen=() =>{
    const { navigation } = this.props;
    const description = navigation.getParam('description', 'NO-ID');
    var number_of_pagraph=0;
    var sentence= description;
    var sen;
    number_of_pagraph=sentence.split("/*/").length - 1;
     
    
     for(let i=0;i<number_of_pagraph;i++){
        var  info ={
            text:"fuck",
            color: "grey",
            size: 20,
            fontweight: 'bold',
            fontstyle: 'normal',
            textDecorationLine: 'normal',
            uri: "http",
            urimove:"http",
            type:0,
            margin:0,
            
     }
    var term= sentence.indexOf("/*/");
  
    if(sentence.substring(term+3,term+4)=='0'){
          
        info.text=" ";
        info.type=0;
    }
    if(sentence.substring(term+3,term+4)=='1'){
           
        info.text=sentence.substring(0,term); //+9      
        info.type=1; 
     
  
       }
    if(sentence.substring(term+3,term+4)=='2'){
       
       // 2 000 20 
       info.text=sentence.substring(0,term);
       var number = parseInt(sentence.substring(term+6,term+9) , 10 ) ;
       info.size=number;
       console.log("size is",info.size);
       info.type=2;

        }
        if(sentence.substring(term+3,term+4)=='3'){
           
          var words = sentence.substring(0,term).split('|');
           info.text=words[0];
           info.uri=words[1];
           var number = parseInt(sentence.substring(term+6,term+9) , 10 ) ;
           console.log("size is that",info.size);
           console.log("uri is",words[1],"s");
           info.size=number;
          info.type=3;
    
         }
        if(sentence.substring(term+3,term+4)=='4'){
            
            info.text=sentence.substring(0,term);
            info.type=4;

          
            }
        

            
     if(info.text!="fuck"){
      
    this.state.article.push(info);
  
    sentence=sentence.substring(term+10,sentence.length);
     
    
  }
    }



   

         
    
     

   }






   
    render() {
       let dimensions=Dimensions.get("window");
       let imageheight=6*dimensions.height/10
       //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth =dimensions.width;
      const { navigation } = this.props;
      const name = navigation.getParam('name', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
  
      const location = navigation.getParam('location', 'NO-ID');
      const topimage = navigation.getParam('topimage', 'NO-ID');
   
      
      const imagelist=navigation.getParam('imagelist', 'NO-ID');
     
      const upvote = navigation.getParam('upvote', 'NO-ID');
      var number_of_pagraph=0; 
      var sentence= imagelist.substring(1,imagelist.length);
     
      var sen;
      number_of_pagraph=sentence.split("/*/").length - 1;
      
      const images = [
      
      ];  
       for(let i=0;i<number_of_pagraph;i++){
        var term= sentence.indexOf("/*/");
        let info=sentence.substring(0,term);
        if(i!=0)
        images.push(info);
        
        sentence=sentence.substring(term+3,sentence.length);
       
        
       }
    
       var vivid =JSON.stringify(description);
       var res = vivid.substring(1, 4);
    
      return ( 

        <View>
          
        <Header
      leftComponent={  
       <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('CULTURE')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  /> 
  </TouchableOpacity>
  } 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: 'CULTURE', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#67DBFF' } }}
     
/>

    <ScrollView>

        {this.renderScreen()}
         { this.state.article.map((item, key)=>(  
              
            <View key={key}>

               < Sorttype   typeof={item.type}   size={item.size} 
                           text={item.text}    uri={item.uri}
                       
          />  
         {/*    <Text
               style={{fontFamily:'content-font',fontSize:item.size,marginLeft:20,marginRight:20}}
         >{item.text}</Text>*/}
            </View>
         )  
       
         )}
          <View
     style={{height:300}}>
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
      backgroundColor: '#67DBFF',
      borderRadius: 8 / 2,
       marginRight:3,
      width: 8,
      height: 8,
    },
  });
  export default  CUL_EX ;
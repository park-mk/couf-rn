import React from 'react';
import { Button, Text, View ,Image,Dimensions,TouchableOpacity,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer ,StyleSheet} from 'react-navigation';
import { withNavigation } from 'react-navigation';






class Texteditor extends React.Component {



    renderFooter = () => {
     
        return (
          <View
           
          >
          
           
           
    
          </View>
        );
      };

      
     

  render() { 
    let dimensions=Dimensions.get("window");
   
    var number_of_pagraph=0;
    var sentence= this.props.text.substring(1,this.props.text.length);
    var sen;
    number_of_pagraph=sentence.split("/*/").length - 1;
      var  article=[];
     for(let i=0;i<number_of_pagraph;i++){
        var  info ={
            text:"a",
            color: "grey",
            size: 20,
            fontweight: 'bold',
            fontstyle: 'normal',
            textDecorationLine: 'normal',
            uri: "http",
            imageheight :0,
            imagewidth :0,
            
     }
    var term= sentence.indexOf("/*/");
    if(sentence.substring(term+3,term+4)=='0'){
          
        info.text=" ";
    }
    if(sentence.substring(term+3,term+4)=='1'){
     
        info.text=sentence.substring(0,term); //+9
       
        var number = parseInt(sentence.substring(term+7,term+9) , 10 ) ;
        info.size=number;
         
       if (sentence.substring(term+4,term+5)=='1'){
        info.fontweight="bold";
        
       }
        if (sentence.substring(term+5,term+6)=='1'){
        info.fontstyle=  'italic';
        
    }
        if (sentence.substring(term+6,term+7)=='1')
        info.textDecorationLine= "underline";

         
       }
    if(sentence.substring(term+3,term+4)=='2'){
        info.imageheight =Math.round((dimensions.width*9)/16);
        info.imagewidth =dimensions.width;
        info.uri=sentence.substring(0,term);
       
      
        }

        else {
            imageheight =0;
            imagewidth =0;
        }
        
    article.push(info);
    sentence=sentence.substring(term+10,sentence.length);
    }

     
   
   
     
    return (
        
      <View >   
          <Text>LIST</Text>
         
          { article.map((item, key)=>(  
             <View key={key}>
         <Text  style={{fontSize:item.size ,fontWeight:item.fontweight, fontStyle:item.fontstyle}} > {item.text}</Text>
         
         <Image
          style={{height:item.imageheight,width:item.imagewidth }}
          source={{uri:item.uri.toString()}}
        />
         
            </View>
         )  
       
         )}
         
        <Text>LIST</Text>
      </View>
      
    );
  }
}

export default withNavigation(Texteditor);
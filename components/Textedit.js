import React from 'react';
import { Button, Text, View ,Image,TouchableOpacity,Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer ,StyleSheet} from 'react-navigation';
import { withNavigation } from 'react-navigation';
import Sorttype from './Sortype'







class Texteditor extends React.Component {



      
     

  render() { 
   
     console.log("11");
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
       
        var number = parseInt(sentence.substring(term+7,term+9) , 10 ) ;
        info.size=number;
         
        var number1 = parseInt(sentence.substring(term+9,term+11) , 10 ) ;
        info.margin=number1; 
        

       if (sentence.substring(term+4,term+5)=='1'){
        info.fontweight="bold";
        
       }
        if (sentence.substring(term+5,term+6)=='1'){
        info.fontstyle=  'italic';
        
    }
        if (sentence.substring(term+6,term+7)=='1')
        info.textDecorationLine= "underline";

        info.type=1;
  
       }
    if(sentence.substring(term+3,term+4)=='2'){
       
        info.uri=sentence.substring(0,term);
        info.type=2;
      
        }
        if(sentence.substring(term+3,term+4)=='3'){
            
            info.uri=sentence.substring(0,term);
            info.type=3;
          
            }
            if(sentence.substring(term+3,term+4)=='4'){
           
              info.text=sentence.substring(0,term); //+9
             
              var number = parseInt(sentence.substring(term+7,term+9) , 10 ) ;
              info.size=number;
               
              var number1 = parseInt(sentence.substring(term+9,term+11) , 10 ) ;
              info.margin=number1; 
              
      
             if (sentence.substring(term+4,term+5)=='1'){
              info.fontweight="bold";
              
             }
              if (sentence.substring(term+5,term+6)=='1'){
              info.fontstyle=  'italic';
              
          }
              if (sentence.substring(term+6,term+7)=='1')
              info.textDecorationLine= "underline";
      
              info.type=4;
        
             }

        
        
    article.push(info);
    sentence=sentence.substring(term+12,sentence.length);
    }

     
   
     
     
    return (
        
      <View >      
        
          { article.map((item, key)=>(  
             <View key={key}>
            
           < Sorttype   typeof={item.type}   size={item.size} fontweight={item.fontweight} 
                        fontstyle={item.fontstyle}     text={item.text}  
                        uri={item.uri}   margin={item.margin}
          />  
             
    {/*     <Text  style={{fontSize:item.size ,fontWeight:item.fontweight, fontStyle:item.fontstyle}} > {item.text}</Text>
             
         <Image
          style={{height:item.imageheight,width:item.imagewidth }}
          source={{uri:item.uri.toString()}}
        />
   */}
         
            </View>
         )  
       
         )}
         
      </View>
      
    );
  }
}

export default withNavigation(Texteditor);
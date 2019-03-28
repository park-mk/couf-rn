import React from 'react';
import { Button, View, Text ,ScrollView,Image,Dimensions,ImageBackground,StyleSheet,TouchableHighlight,SafeAreaView,Linking} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import ImageSlider from 'react-native-image-slider';
import { Ionicons,MaterialIcons ,Entypo,Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from  '../components/Textedit'

class Travelitem extends React.Component {
    render() {
       let dimensions=Dimensions.get("window");
       let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth =dimensions.width;
      const { navigation } = this.props;
      const name = navigation.getParam('name', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
      const time=navigation.getParam('time', 'NO-ID');
      const location = navigation.getParam('location', 'NO-ID');
      const topimage = navigation.getParam('topimage', 'NO-ID');
      const uri = navigation.getParam('uri', 'NO-ID');
      const money =navigation.getParam('money', 'NO-ID');
      const date =navigation.getParam('date', 'NO-ID');
      const imagelist=navigation.getParam('imagelist', 'NO-ID');
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
        <ScrollView>
         

        <View style={{ flex: 2}}>
        
        <ImageBackground    source={{uri:topimage.toString()}} style={{height:imageheight,width:imagewidth }}>
        <View style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      
         </View>
        </ImageBackground> 
        <View >
       
              </View>
          <Text style={{textAlign:'center', fontSize:60,marginTop:30}}> {JSON.stringify(name).replace(/^"(.+)"$/,'$1')}</Text>
         

          <View style={{marginTop: 0,width:100}}>
          
          
          </View>
          
          
          <Texteditor text={vivid}/>
 </View>
        <SafeAreaView style={styles.container}>
        <View style={styles.content1}>
          
        </View>
        <ImageSlider
          loopBothSides
          autoPlayWithInterval={3000}
          images={images}
          style={{height:imageheight,width:imagewidth }}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
             
              {images.map((image, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    underlayColor="#f00"
                    onPress={() => move(index)}
                    style={styles.button}
                  >
                    <Text style={position === index && styles.buttonSelected}>
                     
                    </Text>
                  </TouchableHighlight>
                );
              })}
            </View>
          )}
        />
       
      </SafeAreaView>
      <View  style={{   marginLeft:20, flexDirection:'row',marginRight:20}} >
      <MaterialIcons name='date-range'  size={30}  color ="grey" /> 
     <Text style={{textAlign:'left', fontSize:20,color:'grey'}}> {JSON.stringify(date).replace(/^"(.+)"$/,'$1')} </Text> 
       </View>
       <View  style={{   marginLeft:23, flexDirection:'row'}} >
      <Ionicons name='md-time'  size={30}  color ="grey" /> 
        
      <Text style={{textAlign:'left', fontSize:20,color:'grey'}}>  {JSON.stringify(time).replace(/^"(.+)"$/,'$1').replace(/,.,/g, '\n')} </Text> 
       </View>
       <View  style={{   marginLeft:20, flexDirection:'row'}} >
      < FontAwesome name='won'  size={30}  color ="grey" /> 
      <Text style={{textAlign:'left', fontSize:14,color:'grey'}}> {JSON.stringify(money).replace(/^"(.+)"$/,'$1').replace(/,.,/g, '\n')}</Text> 
       </View>
       <View  style={{   marginLeft:20, flexDirection:'row'}} >
      <Entypo name='location'  size={30}  color ="grey" />  
      <Text   
        
           onPress={()=>  Linking.openURL("http://kko.to/3YRYTLyTB").catch((err) => console.error('An error occurred', err))}
      style={{textAlign:'left', fontSize:20,color:'blue',  }}> [ {JSON.stringify(location).replace(/^"(.+)"$/,'$1')} ]</Text> 
       </View>
      
       <View  style={{   marginLeft:20, flexDirection:'row'}} >
      <Feather name='info'  size={30}  color ="grey" /> 
      <Text style={{textAlign:'left', fontSize:20,color:'grey'}}> [ {JSON.stringify(description).replace(/^"(.+)"$/,'$1')} ]</Text> 
       </View>
        </ScrollView>
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
  export default  Travelitem;
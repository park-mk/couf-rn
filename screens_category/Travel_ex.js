import React from 'react';
import { Button, View, Text ,ScrollView,Image,Dimensions,ImageBackground} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
//import {ImageSlider} from 'react-native-elastic-image-slider';
class Travelitem extends React.Component {
    render() {
       let dimensions=Dimensions.get("window");
        let imageheight =Math.round((dimensions.width*9)/16);
        let imagewidth =dimensions.width;
      const { navigation } = this.props;
      const name = navigation.getParam('name', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
      const location = navigation.getParam('location', 'NO-ID');
      const topimage = navigation.getParam('topimage', 'NO-ID');
      const uri = navigation.getParam('uri', 'NO-ID');
      let images1 = [
        {
            width: imagewidth,
            height: imageheight,
            uri: 'http://chuantu.biz/t5/152/1501134247x2890173753.jpg'
        },
        {
            width: imagewidth,
            height: imageheight,
            uri: 'http://chuantu.biz/t5/152/1501135055x3394041611.jpg'
        },
        {
            width: imagewidth,
            height: imageheight,
            uri: 'http://chuantu.biz/t5/152/1501134194x2890173753.jpg'
        }
    ];
      return (
        <ScrollView>
        <View style={{ flex: 1 }}>
        <ImageBackground    source={require('../assets/mama.png')} style={{height:imageheight,width:imagewidth }}>
        <View style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      
         </View>
        </ImageBackground>
           
          <Text style={{textAlign:'center', fontSize:60,marginTop:30}}> {JSON.stringify(name).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{textAlign:'center', fontSize:30,color:'grey',marginBottom:50}}> [ {JSON.stringify(description).replace(/^"(.+)"$/,'$1')} ]</Text> 

          <View style={{marginTop: 0,width:100}}>
         {/* <ImageSlider
                     images={images1}
                     initialPosition={0}
         />*/}
          </View>
          <Text style={{marginLeft:20,fontSize:40,marginBottom:6}}> {JSON.stringify(location).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{fontSize:20,marginLeft:10,marginRight:20,fontStyle:'italic'}}> {JSON.stringify(uri.uri1).replace(/^"(.+)"$/,'$1')}</Text>
       
        </View>
        </ScrollView>
      );
    }
  }

  export default  Travelitem;
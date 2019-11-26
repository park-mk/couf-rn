import React from 'react';
import { Button, View, Text ,Image,TouchableOpacity,ScrollView, Linking,} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
class CONTACT extends React.Component {


 
    render() {
         
   
     
      return (
        <View style={{flex:1}}>
        <Header
        leftComponent={  <TouchableOpacity 
         onPress={()=> this.props.navigation.navigate('Category')}
         >
         <Image source={require('./assets/back.png')}
                     
        style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
   /> 
   </TouchableOpacity>} 
       backgroundColor={'#fff'}
      borderBottomColor={'#fff'}
        centerComponent={{ text: 'CONTACT US', style: {fontFamily:'title-font' ,fontSize:30,marginLeft:10,color:'#67DBFF' } }}
       
         />
        <ScrollView style={{ flex: 1 }}>
        
          <Text style={{fontSize:30,marginLeft:10,fontFamily:'content-font',marginRight:20}}>PARK MINGI</Text>
      
          <Text style={{fontSize:15,marginLeft:10,marginTop:7,fontFamily:'content-font',color:'#302f2f',marginRight:20}}>Email: whezme@naver.com </Text>
          <Text style={{fontSize:15,marginLeft:10,fontFamily:'content-font',color:'#302f2f',marginRight:20}}>Paypal Email </Text>

          <Text style={{fontSize:30,marginLeft:10,fontFamily:'content-font',marginRight:20,marginTop:20}}>NAM SEUNG OH</Text>
      
          <Text style={{fontSize:15,marginLeft:10,marginTop:17,fontFamily:'content-font',color:'#302f2f',marginRight:20}}>Email: skatmddh9797@gmail.com</Text>

      
         <Text style={{fontSize:15,marginLeft:10,fontFamily:'content-font',color:'#302f2f',marginRight:20}}>instagram: @ska_tmddh</Text>

         <Text style={{fontSize:30,marginLeft:10,fontFamily:'content-font',marginRight:20,marginTop:20}}>PARK JONG HWA</Text>  
         <Text style={{fontSize:15,marginLeft:10,marginTop:10,fontFamily:'content-font',color:'#302f2f',marginRight:20}}>Email: luck6088@gmail.com</Text>

         <Text style={{fontSize:30,marginLeft:10,fontFamily:'title-font',marginRight:20,marginTop:15}}>SERVING AS KATUSA  </Text>  
         <TouchableOpacity style={{flex:1}}
          onPress={()=>  Linking.openURL("https://www.paypal.me/coufKR?locale.x=ko_KR").catch((err) => console.error('An error occurred', err))}>
         <Text style={{fontFamily:'title-font' ,fontSize:30, marginTop:40,marginLeft:10,color:'#67DBFF'}}>CLICK HERE FOR DONATION</Text>
         </TouchableOpacity>

          

          

           
      
         </ScrollView>
        </View>
      );
    }
  }

  export default  CONTACT;
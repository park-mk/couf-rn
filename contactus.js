import React from 'react';
import { Button, View, Text ,Image,TouchableOpacity,ScrollView, Linking} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
class CONTACT extends React.Component {


 
    render() {
         
   
     
      return (
        <View 
      
        style={{flex:1}}>
        <Header
        height={70}
        leftComponent={  <TouchableOpacity 
         onPress={()=> this.props.navigation.navigate('Category')}
         >
         <Image source={require('./assets/back.png')}
                     
        style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
   /> 
       </TouchableOpacity>} 
       backgroundColor={'#fff'}
      borderBottomColor={'#fff'}
        centerComponent={{ text: 'CONTACT US', style: {fontFamily:'title-font' ,fontSize:30,marginLeft:10,marginTop:17,color:'#67DBFF' } }}
       
         />
        <ScrollView
         backgroundColor={'#ffffff'}
        style={{ flex: 1 }}>
          
          <Text style={{fontSize:25,marginLeft:10,fontFamily:'content-font',marginRight:20,marginTop:80}}>CAMP KOREA TEAM </Text>
      
          <Text style={{fontSize:15,marginLeft:10,marginTop:7,fontFamily:'content-font',color:'#302f2f',marginRight:20}}>Email: whezme@naver.com </Text>
          <Text style={{fontSize:15,marginLeft:10,fontFamily:'content-font',color:'#302f2f',marginRight:20}}>Paypal Email </Text>

         

         <Text style={{fontSize:30,marginLeft:10,fontFamily:'title-font',marginRight:20,marginTop:15}}>SERVED AS KATUSA </Text>  
         <TouchableOpacity style={{flex:1}}
          onPress={()=>  Linking.openURL("https://www.paypal.me/coufKR?locale.x=ko_KR").catch((err) => console.error('An error occurred', err))}>
         <Text style={{fontFamily:'title-font' ,fontSize:30, marginTop:40,marginLeft:10,color:'#67DBFF'}}>CLICK HERE FOR DONATION</Text>
         </TouchableOpacity>
         <View
         style={{flexDirection:'row',marginTop:20,marginLeft:50}}
        >
           <Text style={{height:50,fontSize:13,marginTop:30,color:'grey',textDecorationLine:'underline'}}>Contact us through kakao :</Text>
              <TouchableOpacity
                    onPress={() => Linking.openURL("http://pf.kakao.com/_xlxfxaxgK/chat").catch((err) => console.error('An error occurred', err))}
              >
    <Image
                            style={{
                              marginTop:20,
                                borderRadius:7,
                                width: 30,
                                height: 30,
                          
                            }}
                            source={require('./assets/kakao.png')}
                            resizeMode={'contain'}
                        />
           </TouchableOpacity>
                        </View>
          

          

           
      
         </ScrollView>
        </View>
      );
    }
  }

  export default  CONTACT;
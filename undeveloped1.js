import React from 'react';
import { Button, View, Text ,Image,TouchableOpacity,ScrollView} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation-stack'; 
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
class UNDEVELOP1 extends React.Component {


 
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
        centerComponent={{ text: 'SORRY', style: {fontFamily:'title-font' ,fontSize:30,marginLeft:10,color:'#67DBFF' } }}
       
         />
        <ScrollView style={{ flex: 1 }}
          backgroundColor={'#fff'}
        >
        
          <Text style={{fontSize:30,marginLeft:10,fontFamily:'title-font',marginRight:20}}>will be available soon! </Text>

          <Text style={{fontSize:20,marginLeft:10,marginTop:30,fontFamily:'content-font',color:'grey',marginRight:20}}>With more support, we can come back with more and more useful services.</Text>
          <Text style={{fontSize:20,marginLeft:10,marginTop:30,fontFamily:'content-font',color:'grey',marginRight:20}}>your likes and suggestions are essential. If you like this app, please spread the word!</Text>
        </ScrollView>
        </View>
      );
    }
  }

  export default  UNDEVELOP1;
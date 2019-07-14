import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Dimensions} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Category from '../components/category'
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
class KORcate extends React.Component {

     
 
  render() {
    let dimensions = Dimensions.get("window");
    let imageheight = dimensions.height/5;
    let imagewidth = 2*dimensions.width/3;
    return ( 
      <View style={{flex:1}}>
      <Header
      leftComponent={  <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('Category')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
 /> 
 </TouchableOpacity>} 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: 'LEARNING KOREAN', style: {fontFamily:'title-font' ,fontSize:30,marginLeft:10,color:'#56B8FF' } }}
     
       />
  
         <ScrollView   onRefresh={this.handleRefresh} >
       { /*****  category sort  each view have 2 category  in row 
      
             <Category  imageURI={require('../assets/icon.png' )}
                           name='Basic Expression'
                           onPress={() => {
                           
                            this.props.navigation.navigate('KOR', {
                              move:'BASIC',
                           });
                         }}
                        
                     />
      
      *******/}
            <TouchableOpacity 
                 style={{alignItems:'center'}}
                 onPress={() => {
                           
                  this.props.navigation.navigate('KOR', {
                    move:'BASIC',
                 });
               }}
            >   
              <View  style={{ marginTop:50,height:imageheight,width:imagewidth,  borderColor:'#56B8FF',borderWidth:4,borderRadius:20}}>
               <Text style={{textAlign:'center',fontFamily:'title-font',fontSize:60,marginBottom:6,color:'#56B8FF'}}> BASIC Expression</Text>
               </View>

            </TouchableOpacity>
       { /*****  category sort  each view have 2 category  in row  *******/}
       <TouchableOpacity 
                 style={{alignItems:'center'}}
                 onPress={() => {
                           
                  this.props.navigation.navigate('KOR', {
                    move:'SHOPPING',
                 });
               }}
            >   
              <View  style={{ marginTop:50,height:imageheight,width:imagewidth,  borderColor:'#56B8FF',borderWidth:4,borderRadius:20}}>
               <Text style={{textAlign:'center',fontFamily:'title-font',fontSize:60,marginBottom:6,color:'#56B8FF'}}>SHOPPING/RESTAURANT</Text>
               </View>

            </TouchableOpacity>

            <TouchableOpacity 
                 style={{alignItems:'center'}}
                 onPress={() => {
                           
                  this.props.navigation.navigate('KOR', {
                    move:'DATE',
                 });
               }}
            >   
              <View  style={{ marginTop:50,height:imageheight,width:imagewidth,  borderColor:'#56B8FF',borderWidth:4,borderRadius:20}}>
               <Text style={{textAlign:'center',fontFamily:'title-font',fontSize:60,marginBottom:6,color:'#56B8FF'}}> DATE Expression</Text>
               </View>

            </TouchableOpacity>

            <TouchableOpacity 
                 style={{alignItems:'center'}}
            >   
              <View  style={{ marginTop:50,height:imageheight,width:imagewidth,  borderColor:'#56B8FF',borderWidth:4,borderRadius:20}}>
               <Text style={{textAlign:'center',fontFamily:'title-font',fontSize:60,marginBottom:6,color:'#56B8FF'}}> WANNA KNOW </Text>
               </View>

            </TouchableOpacity>

            </ScrollView >
   </View>

            
    );
  }
}
export default KORcate;
{ /*****   design part  *******/}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
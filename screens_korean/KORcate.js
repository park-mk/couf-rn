import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Dimensions} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Category from '../components/category'
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
class KORcate extends React.Component {

     
 
  render() {
    let dimensions = Dimensions.get("window");
    let imageheight = dimensions.height/4;
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
           <Text style={{fontFamily:'title-font',fontSize:35,marginTop:40,marginLeft:20}}> BASIC </Text>

            <TouchableOpacity 
                
                 onPress={() => {
                           
                  this.props.navigation.navigate('KOR', {
                    move:'BASIC',
                 });
               }}
            >   
              <View  style={{marginLeft:20,height:188,width:320, backgroundColor:'grey', borderColor:'#56B8FF',borderWidth:4,borderRadius:0}}>
               <Text style={{textAlign:'center',marginTop:imageheight/2-30,fontFamily:'title-font',fontSize:30,color:'#56B8FF'}}> BASIC Expression</Text>
               </View>

            </TouchableOpacity>
       { /*****  category sort  each view have 2 category  in row  *******/}
       <Text style={{fontFamily:'title-font',fontSize:35,marginTop:10,marginLeft:20}}> REAL LIFE</Text>

          <TouchableOpacity 
                
                 onPress={() => {
                           
                  this.props.navigation.navigate('KOR', {
                    move:'SHOPPING',
                 });
               }}
            >   


               <View  style={{marginLeft:20,height:188,width:320, backgroundColor:'grey', borderColor:'#56B8FF',borderWidth:4,borderRadius:0}}>
               <Text style={{textAlign:'center',marginTop:imageheight/2-30,fontFamily:'title-font',fontSize:30,color:'#56B8FF'}}> SHOPPING/RESTAURANT</Text>
               </View>

            </TouchableOpacity>

            <Text style={{fontFamily:'title-font',fontSize:35,marginTop:10,marginLeft:20}}> dating</Text>

            <TouchableOpacity 
                
                 onPress={() => {
                           
                  this.props.navigation.navigate('KOR', {
                    move:'DATE',
                 });
               }}
            >   
              <View  style={{marginLeft:20,height:188,width:320, backgroundColor:'grey', borderColor:'#56B8FF',borderWidth:4,borderRadius:0}}>
               <Text style={{textAlign:'center',marginTop:imageheight/2-30,fontFamily:'title-font',fontSize:30,color:'#56B8FF'}}> Date expresion</Text>
               </View>

            </TouchableOpacity>
                
            <Text style={{fontFamily:'title-font',fontSize:35,marginTop:10,marginLeft:20}}> learning</Text>
            <TouchableOpacity 
               





            >   
              <View  style={{marginLeft:20,height:188,width:320, backgroundColor:'grey', borderColor:'#56B8FF',borderWidth:4,borderRadius:0}}>
               <Text style={{fontFamily:'title-font',fontSize:25,color:'#56B8FF'}}> please leave the comments for the words or expression you wanna know ,we will upload it soon</Text>
               </View> 


            </TouchableOpacity>
            <View  style={{marginLeft:20,height:2,width:imagewidth}}>
              
               </View> 
             

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
import React from 'react';
import { Button, FlatList,Text, View ,TouchableOpacity,Image,StyleSheet,ScrollView,Linking,Dimensions,ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import  firebase,{storage}  from "../firebase";
import A1WTD from '../screens_wtd/area1_wtd';
import A1WTE from '../screens_wte/area1_wte'

const color = {
  theme: '#06C1AE',
  border: '#e0e0e0',
  background: '#f3f3f3'
}

class BUSScreen extends React.Component {

  
  constructor(props) {
    super(props);
     
    this.state = {
      loading: false,
      datasource: [],
      datasource1: [],
      pause:false,
      error: null,
      refreshing: false,
      fontLoaded:true,
    };
  }



  


  


  componentDidMount() {
   
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
   
    var usersRef = firebase.database().ref('food/soup');
 

     usersRef.on('value', (snapshot) => {
    
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource:  keys
  })
}); 
usersRef = firebase.database().ref('food/dessert');


usersRef.on('value', (snapshot) => {
    
    
  var m=snapshot.val() 
  var keys= Object.values(m);
this.setState({
 datasource1:  keys
})
}); 

    

    
  };





  _keyExtractor = (item, index) => item.key;

  render() {

    let dimensions = Dimensions.get("window");
  //  let imageheight = Math.round((dimensions.width * 9) / 12);
    let imagewidth = dimensions.width;


    return (
      <ScrollView>   
      <View>
   
          <View>

         
            
         
      
        
        <View style={{
    borderBottomColor: '#56B8FF',
    borderBottomWidth: 1,
    marginTop:3,
         }}    />
         <View  style={{flexDirection:'row'}}>
            <View style={{
            width:  imagewidth/3-5,
            height:3,
           
         }}    >
         
           </View>
           <View style={{
            width:  imagewidth/3-5,
            height:3,
           
         }}    >
         
           </View>
               <View style={{
            width:  imagewidth/3,
            height:3,
            backgroundColor: '#56B8FF',
         }}    >
         </View>
         </View>
         
<View style={{
    borderBottomColor: '#56B8FF',
    borderBottomWidth: 1,

         }}    /> 

   
      </View > 
        
       
    
        
      <View >
      <TouchableOpacity style={{flex:1,marginTop:70}}
      
      onPress={()=> this.props.navigation.navigate('H221')}>
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10,color:'#56B8FF'}}  >H221 (CASEY)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}>
      <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#7f8182'}}>TMC (CASEY)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}
        onPress={()=> this.props.navigation.navigate('Area1_2')}>
      <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#7f8182'}}>HOVEY </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{flex:1}}
      
      onPress={()=> this.props.navigation.navigate('YS')}>
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10,color:'#56B8FF'}}  >YONGSAN (AREA2)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}
       onPress={()=> this.props.navigation.navigate('GREEN')}>
      <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#56B8FF'}}>GREEN (HUMPHREY)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}
        onPress={()=> this.props.navigation.navigate('BLUE')}>
      <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#56B8FF'}}>BLUE (HUMPHREY)</Text>
      </TouchableOpacity>


      <TouchableOpacity style={{flex:1}}
      
      onPress={()=> this.props.navigation.navigate('Red')}>
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10,color:'#56B8FF'}}  >RED (HUMPHREY)</Text>
      </TouchableOpacity>
    
   </View> 
      
     


         
   

      </View>
     
      </ScrollView>   
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1  , /// PixelRatio.get(),
   // borderColor: color.border,
    backgroundColor: 'white',
  },
  icon: {
    width: 260,
    height: 160,
    borderRadius: 5,
   
   // alignContent:'center',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  price: {
    marginTop:30,
    color: color.theme,
    
  },
  h1: {
    fontSize: 40,
    fontFamily:'Raley-balck',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222222',
    
  },
  p: {
    fontSize: 15,
    //marginLeft:30,
    //textAlign: 'center',
    color: 'grey',
  },
  backgroundImage:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: null,
    height: null,
    opacity:0.5,
    resizeMode: 'cover',
},
})

export default BUSScreen;
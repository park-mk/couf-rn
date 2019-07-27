import React from 'react';
import { Button, FlatList,Text, View ,TouchableOpacity,Image,StyleSheet,ScrollView,Linking,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import  firebase,{storage}  from "../firebase";
import A1WTD from '../screens_wtd/area1_wtd';
import A1WTE from '../screens_wte/area1_wte'

const color = {
  theme: '#06C1AE',
  border: '#e0e0e0',
  background: '#f3f3f3'
}

class Area4Screen extends React.Component {

  
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
      <View>
       <Header
     leftComponent={  
      <TouchableOpacity 
      onPress={()=> this.props.navigation.navigate('Area')}
      >
      <Image source={require('../assets/back.png')}
                  
     style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
/> 
</TouchableOpacity>
} 
    backgroundColor={'#fff'}
   borderBottomColor={'#fff'}
     centerComponent={{ text: 'AREA4', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
    
      />
      <ScrollView>   
     
   
      <View>
      <View style ={{ flexDirection:"row" ,flex:3}}>
      <TouchableOpacity style={{flex:1}}
      
      >
      <Text   style={{fontFamily:'title-font' ,fontSize:23,marginTop:20,marginLeft:10,color:'#56B8FF'}}  >THINGS TO EAT</Text>
      </TouchableOpacity >
      <TouchableOpacity style={{flex:1}}
           onPress={()=> this.props.navigation.navigate('Area4_1')}
      >
      <Text style={{fontFamily:'title-font' ,fontSize:23, marginTop:20,marginLeft:15,color:'#7f8182'}}>WHAT TO DO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}
        onPress={()=> this.props.navigation.navigate('Area4_2')}
      >
      <Text style={{fontFamily:'title-font' ,fontSize:23, marginTop:20,color:'#7f8182'}}>BUS SCHEDULE</Text>
      </TouchableOpacity>
    
   </View> 
     
          <View>

         
            
         
      
        
         <View style={{
     borderBottomColor: '#56B8FF',
     borderBottomWidth: 1,
     marginTop:3,
          }}    />
             <View style={{
             width: imagewidth/3-5,
             height:3,
             backgroundColor: '#56B8FF',
          }}    >
             
         </View>
         
<View style={{
    borderBottomColor: '#56B8FF',
    borderBottomWidth: 1,

         }}    /> 

   
      </View >
      
        
 
      



         
   

      </View>
     
      </ScrollView>   
      </View>
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

export default Area4Screen;
import React from 'react';
import { Button, FlatList,Text, View ,TouchableOpacity,Image,StyleSheet,ScrollView,Linking,Dimensions,ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar,Header } from "react-native-elements";
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

          <Header
    leftComponent={  
     <TouchableOpacity 
     onPress={()=> this.props.navigation.navigate('Category')}
     >
     <Image source={require('../assets/back.png')}
                 
    style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
/> 
</TouchableOpacity>
} 
   backgroundColor={'#fff'}
  borderBottomColor={'#fff'}
    centerComponent={{ text: 'BUS', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
   
     />
            
         
      
        
      

   
      </View > 
        
       
    
        
      <View >
      <TouchableOpacity style={{flex:1,marginTop:70}}
      
      onPress={()=> this.props.navigation.navigate('H221')}>
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10,}}  >H221 (CASEY)</Text>
      </TouchableOpacity>
     

      <TouchableOpacity style={{flex:1}}
      
      onPress={()=> this.props.navigation.navigate('YS')}>
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10}}  >YONGSAN (AREA2)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}
       onPress={()=> this.props.navigation.navigate('GREEN')}>
      <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#d11f1f'}}>GREEN (HUMPHREYS)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}
        onPress={()=> this.props.navigation.navigate('BLUE')}>
      <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#21dd21'}}>BLUE (HUMPHREYS)</Text>
      </TouchableOpacity>


      <TouchableOpacity style={{flex:1}}
      
      onPress={()=> this.props.navigation.navigate('Red')}>
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10,color:'#2c4ed6'}}  >RED (HUMPHREYS)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={{flex:1}}
        onPress={ () =>  Linking.openURL("https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Bus%20schedules%2FINCHEON-HUMPHREYS_BUS_SCHEDULE_April_19_2019.png?alt=media&token=842f1f6a-58fa-4fb1-bb25-18a76f5adbbb").catch((err) => console.error('An error occurred', err))}
      >
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10}}  >ICN-HUM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{flex:1}}
        onPress={ () =>  Linking.openURL("https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Bus%20schedules%2FShuttle_Exhibit_44_Yongsan-Cp._Humphreys_2019.4.22.jpg?alt=media&token=a180096f-ecdd-4766-96ca-9197595ea557").catch((err) => console.error('An error occurred', err))}
      >
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10}}  >HUM-Yongsan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{flex:1}}
        onPress={ () =>  Linking.openURL("https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Bus%20schedules%2FIncheon_to_Yongsan_Mar_28_2019.jpg?alt=media&token=c45b386b-372f-49c9-a4c5-864da61842d3").catch((err) => console.error('An error occurred', err))}
      >
      <Text   style={{fontFamily:'title-font' ,fontSize:50,marginLeft:10}}  >ICN-Yongsan</Text>
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
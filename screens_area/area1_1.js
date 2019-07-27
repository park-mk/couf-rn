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

class Area1_1Screen extends React.Component {

  
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

  usersRef = firebase.database().ref('WTD');
    
    
usersRef.on('value', (snapshot) => {
    
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource1:  keys
  })
});




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
     leftComponent={  <TouchableOpacity 
      onPress={()=> this.props.navigation.navigate('Area')}
      >
      <Image source={require('../assets/back.png')}
                  
     style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
/> 
</TouchableOpacity>} 
    backgroundColor={'#fff'}
   borderBottomColor={'#fff'}
     centerComponent={{ text: 'AREA1', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
    
      />
   
   
      <ScrollView>   
        
      <View>
      <View style ={{ flexDirection:"row" ,flex:3}}>
      <TouchableOpacity style={{flex:1}}
      
      onPress={()=> this.props.navigation.navigate('Area1')}>
      <Text   style={{fontFamily:'title-font' ,fontSize:23,marginTop:20,marginLeft:10,color:'#7f8182'}}  >THINGS TO EAT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}>
      <Text style={{fontFamily:'title-font' ,fontSize:23, marginTop:20,marginLeft:15,color:'#56B8FF'}}>WHAT TO DO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1}}
        onPress={()=> this.props.navigation.navigate('Area1_2')}>
      <Text style={{fontFamily:'title-font' ,fontSize:23, marginTop:20,color:'#7f8182'}}>BUS SCHEDULE</Text>
      </TouchableOpacity>
    
   </View> 
     
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
        
       
      <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30}}  
                           
                           >SHORT TOUR</Text>

      <View>
   
    <FlatList 
          data={this.state.datasource}
          keyExtractor={this._keyExtractor}
          horizontal={true}
          renderItem={({ item }) => (
              
            <ListItem  
         //    linearGradientProps={{
            //  colors: ['#f45a5a', '#f45a5a'],
   // colors: ['#ea3807', '#e5bcb0'],
   // start: [1, 0],
    //end: [0.2, 0],
 // }}
 
 
               title=  {     
                 
                <View  style={{  flex:1,   alignContent:'center',marginRight:-3, borderWidth:2,borderColor:'#56B8FF'}}
                    
                >
              <ImageBackground   style={styles.icon}
                    source={{uri:item.topimage}}
             
             >
              
         
        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}>
     
      <Image
        style={ { width: 35,
          height: 30,marginTop:200}}
        source={require('../assets/likewhithe.png')}
      /> 
      <Text style={{marginLeft:3,fontSize:30,color:'white',fontFamily:'title-font'}}>{item.upvote}</Text>
     
        
      </View>
             
              </ImageBackground>
              </View>
            
                
                  
          }
          
            
            
            onPress={() => {
             
              this.props.navigation.navigate('FOODi', {
                 name : item.name,
                 description :item.description,
                 cate:item.cate,
                 topimage : item.topimage,
               
                
               
                 imagelist:item.images,
                 //tips:item.tips,
              });
            }
          
          }
              
             // avatar={{ uri: item.picture.thumbnail }}
             
            />
          )
          
        }
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />


        
       </View>

       <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30}}  
                           
                           >ACTIVITY</Text>

      <View>
   
    <FlatList 
          data={this.state.datasource1}
          keyExtractor={this._keyExtractor}
          horizontal={true}
          renderItem={({ item }) => (
              
            <ListItem  
         //    linearGradientProps={{
            //  colors: ['#f45a5a', '#f45a5a'],
   // colors: ['#ea3807', '#e5bcb0'],
   // start: [1, 0],
    //end: [0.2, 0],
 // }}
 
 
               title=  {     
                 
                <View  style={{  flex:1,   alignContent:'center',marginRight:-3, borderWidth:2,borderColor:'#56B8FF'}}
                    
                >
              <ImageBackground   style={styles.icon}
                    source={{uri:item.topimage}}
                 
             >    
               <Text style={{marginLeft:3,fontSize:30,color:'#56B8FF',fontFamily:'title-font'}}>{item.name}</Text>
              
         
        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}>
     
     {/*  <Image
        style={ { width: 35,
          height: 30,marginTop:200}}
        source={require('../assets/likewhithe.png')}
      /> 
      <Text style={{marginLeft:3,fontSize:30,color:'white',fontFamily:'title-font'}}>{item.upvote}</Text>
     
        */}
      </View>
             
              </ImageBackground>
              </View>
            
                
                  
          }
          
            
            
            onPress={() => {
             
              this.props.navigation.navigate('FOODi', {
                 name : item.name,
                 description :item.description,
                 cate:item.cate,
                 topimage : item.topimage,
               
                
               
                 imagelist:item.images,
                 //tips:item.tips,
              });
            }
          
          }
              
             // avatar={{ uri: item.picture.thumbnail }}
             
            />
          )
          
        }
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />


        
       </View>
        
        
 
      
     


         
   

      </View>
      <View
                  
                  style={{width:70,height:80,marginLeft:-15}}
             /> 
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

export default Area1_1Screen;
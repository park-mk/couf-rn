import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,StyleSheet,Image,Text,ImageBackground,TouchableOpacity,} from "react-native";
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import  firebase,{storage}  from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import  someList from '../components/anylist'
import *  as Font from'expo-font'
import { ScrollView } from "react-native-gesture-handler";
import {Container,Content} from 'native-base'
  database=firebase.database();
 
  
  
  const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
  }


class Foodlist extends React.Component {
  constructor(props) {
    super(props);
     
    this.state = {
      loading: false,
      datasource: [],
      datasource1: [],
      datasource_sea: [],
      datasource_soup: [],
      pause:false,
      error: null,
      refreshing: false,
      fontLoaded:true,
    };
  }



  


  


  componentDidMount() {
     Font.loadAsync({
      'title-font':require('../assets/fonts/BebasNeue-Regular.ttf'),
      'Raley-balck':require('../assets/fonts/BebasNeue-Regular.ttf'),
      'Name-font':require('../assets/fonts/Nickainley-Normal_2.ttf'),
      
    });
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
   
    var usersRef = firebase.database().ref('food/Meat');
 

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


usersRef = firebase.database().ref('food/Seafood');


usersRef.on('value', (snapshot) => {
    
    
  var m=snapshot.val() 
  var keys= Object.values(m);
this.setState({
 datasource_sea:  keys
})
}); 
usersRef = firebase.database().ref('food/soup');


usersRef.on('value', (snapshot) => {
    
    
  var m=snapshot.val() 
  var keys= Object.values(m);
this.setState({
 datasource_soup:  keys
})
}); 


    
    

    
  };

  handleRefresh = () => {
    
    this.setState(
      {
      
        refreshing: false
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
   
    this.setState(
      {
        loading: false
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
      this.state.loading=true;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
      
        <ActivityIndicator animating size="large" />
       

      </View>
    );
  };
  renderSeparator = () => {
   
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }; 

  _keyExtractor = (item, index) => item.key; 

   gogo=(iname,idescription,itopimage,icate)=>{
             
    this.props.navigation.navigate('FOODi', {
       name : iname,
       description :idescription,
      
       topimage : itopimage,
       cate:icate,
      
     
     //  imagelist:item.images,
       //tips:item.tips,
    });
  }

  render() {
     
    return (
      <View>
      <Header
      leftComponent={  
       <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('Home')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
        />
 </TouchableOpacity>
 } 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: 'Food', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
     
       />
    
        
      <ScrollView>   
<Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >Meat</Text>

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
          
            
            
            onPress={() => this.gogo(item.name,item.description,item.topimage,item.cate)
          
          }
        
             // avatar={{ uri: item.picture.thumbnail }}
             
            />
          )
          
        }
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
      //   ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />


        
       </View>
<Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >SEAFOOD</Text>

      <View>
   
    <FlatList 
          data={this.state.datasource_sea}
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
          
            
            
            onPress={() => this.gogo(item.name,item.description,item.topimage,item.cate)
          
          }
        
             // avatar={{ uri: item.picture.thumbnail }}
             
            />
          )
          
        }
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
       //  ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />


        
       </View>



       <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >SOUP</Text>

      <View>
   
    <FlatList 
          data={this.state.datasource_soup}
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
          
            
            
            onPress={() => this.gogo(item.name,item.description,item.topimage,item.cate)
          
          }
        
             // avatar={{ uri: item.picture.thumbnail }}
             
            />
          )
          
        }
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />


        
       </View>


       <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >DESSERT</Text>

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
      //   ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />


        
       </View>
       <View 
        style={{height:100}}
       >
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
    width: 300,
    height: 230,
    borderRadius: 5,
    resizeMode: 'cover',
   
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


export default Foodlist;





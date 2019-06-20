import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,StyleSheet,Image,Text,ImageBackground} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import  firebase,{storage}  from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import  someList from '../components/anylist'
import {Font} from 'expo'
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
      pause:false,
      error: null,
      refreshing: false,
      fontLoaded:true,
    };
  }



  


  


  componentDidMount() {
     Font.loadAsync({

      'Raley-balck':require('../assets/fonts/33676382891.ttf'),
      'Name-font':require('../assets/fonts/Nickainley-Normal_2.ttf'),
      
    });
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
   
    var usersRef = firebase.database().ref('food');
    
    
     usersRef.on('value', (snapshot) => {
    
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource:  keys
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

  render() {
     
    return (
      <View>
   
    <FlatList 
          data={this.state.datasource}
          
          renderItem={({ item }) => (
             
            <ListItem  
         //    linearGradientProps={{
            //  colors: ['#f45a5a', '#f45a5a'],
   // colors: ['#ea3807', '#e5bcb0'],
   // start: [1, 0],
    //end: [0.2, 0],
 // }}
 
 
               title=  {     
                    <View  style={{  flex:1,   alignContent:'center',marginLeft:30,marginRight:34, borderWidth:2,borderColor:'##050505',borderRadius:5}}
                    
                    >
                  <Image  style={styles.icon}
                        source={{uri:item.topimage.toString()}}
                 
                 />
                    <Text>   </Text>
                 {  this.state.fontLoaded?(
              
              <Text   style={{fontFamily:'Raley-balck' ,fontSize:35,textAlign:'center'}}  
                           
                           >{item.name}</Text>
               ) 
               :( <ActivityIndicator size="large"      />
               ) }
                  </View>
                
                  
          }
          
            
            
            onPress={() => {
             
              this.props.navigation.navigate('FOODi', {
                 name : item.name,
                 description :item.description,
                
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


export default Foodlist;





import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,Text,Fragmen,TouchableOpacity,Image} from "react-native";
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import  firebase,{storage}  from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

  database=firebase.database();
 
 



class NEWSScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      datasource: [],
      pause:false,
      error: null,
      refreshing: false
    };
  }



  




  
 

  componentDidMount() {
    
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
  {/*  const move = navigation.getParam('move', 'NO-ID');
     if(JSON.stringify(move).replace(/^"(.+)"$/,'$1')=='BASIC')
    var usersRef = firebase.database().ref('korean/basic');
     else
     var usersRef = firebase.database().ref('tips');

     if(JSON.stringify(move).replace(/^"(.+)"$/,'$1')=='SHOPPING')
    var usersRef = firebase.database().ref('korean/shopping'); 
    
    if(JSON.stringify(move).replace(/^"(.+)"$/,'$1')=='DATE')
  var usersRef = firebase.database().ref('korean/date'); */}
  var usersRef = firebase.database().ref('news');
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
    //<SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
      this.state.loading=true;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#56B8FF"
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
          backgroundColor: "#56B8FF",
          marginLeft: "14%"
        }}
      />
    );
  };


  renderItem =({item})=>{

    return(
      <TouchableOpacity
     
      onPress={() => {
        this.props.navigation.navigate('NEWSS', {
          title : item.title,
          description :item.description,
         
        
       }); 
       
     
     }
   
   }
      >
          <View style={{borderColor:'grey',borderBottomWidth:3}}>
     <View  style={{  flex:1,alignItems:'center'}} >
               <Text style={{fontSize:20,fontFamily:'content-font' ,marginLeft:10,marginTop:20}}>{item.title}</Text>
             </View  >
             <View style={{  flex:1,alignItems:'flex-end'}}>
             <Text style={{fontSize:15,fontFamily:'content-font' ,color:'grey',marginRight:20}}>{item.date}</Text>
           
            
           </View>
           </View>
           </TouchableOpacity>   




    )



}

  render() {
     
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
      centerComponent={{ text: 'NEWS', style: {fontFamily:'title-font' ,fontSize:30,marginLeft:10,color:'#67DBFF' } }}
     
       />
        <FlatList
       
          data={this.state.datasource.reverse()}
         
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        
          
          //ListHeaderComponent={this.renderHeader}
      //   ListFooterComponent={this.renderFooter}
          //onRefresh={this.handleRefresh}
         // refreshing={this.state.refreshing}
        //  onEndReached={this.handleLoadMore}
          maxToRenderPerBatch={1}
          initialNumToRender={1}  
        
       //   onEndReachedThreshold={3000000000000000000000090909090909090}
        
        />
        </View>
        

       
      
    );
  }
}

export default NEWSScreen;





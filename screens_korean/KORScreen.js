import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,Text,Fragmen,TouchableOpacity,Image} from "react-native";
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import  firebase,{storage}  from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

  database=firebase.database();
 
 



class KORScreen extends React.Component {
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



  




  
  async _play(){
    try {
      
      const { sound: soundObject, status } = await Expo.Audio.Sound.createAsync(
          
          {uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/sound%2Fk1.mp3?alt=media&token=c0c4a00f-cff9-4813-a182-2bba419dae71"},
          { shouldPlay: true }
        );
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
  
   }

  componentDidMount() {
    
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
    const move = navigation.getParam('move', 'NO-ID');
     if(JSON.stringify(move).replace(/^"(.+)"$/,'$1')=='BASIC')
    var usersRef = firebase.database().ref('korean/basic');
     else
     var usersRef = firebase.database().ref('tips');

     if(JSON.stringify(move).replace(/^"(.+)"$/,'$1')=='SHOPPING')
    var usersRef = firebase.database().ref('korean/shopping'); 
    
    if(JSON.stringify(move).replace(/^"(.+)"$/,'$1')=='DATE')
    var usersRef = firebase.database().ref('korean/date'); 
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
          borderColor: "#67DBFF"
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
          backgroundColor: "#67DBFF",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
     
    return (
      <View style={{flex:1}}>
      <Header
      leftComponent={  <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('KORca')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
 /> 
 </TouchableOpacity>} 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: 'LEARNING KOREAN', style: {fontFamily:'title-font' ,fontSize:30,marginLeft:10,color:'#67DBFF' } }}
     
       />
        <FlatList
          data={this.state.datasource}
          
          renderItem={({ item}) => (
            
            <ListItem 
           
           // onLongPress={() => this._play()}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('KORex', {
                 kor : item.kor,
                 eng :item.eng,
                 pro :item.pro,
                 description : item.description ,
                 uri:item.uri,
                
              });
            }}
           
               
             title={item.eng } 
             titleStyle={{ 
              fontFamily:'content-font'
               
             }}
              subtitle={item.pro}
              subtitleStyle={{ 
                fontFamily:'content-font'
                 
               }}
             // avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 3 }}
            />
          )
          
        }
          keyExtractor={item => item.kor}
        
          
          //ListHeaderComponent={this.renderHeader}
      //   ListFooterComponent={this.renderFooter}
          //onRefresh={this.handleRefresh}
         // refreshing={this.state.refreshing}
        //  onEndReached={this.handleLoadMore}
          maxToRenderPerBatch={1}
          initialNumToRender={1}
        
          onEndReachedThreshold={3000000000000000000000090909090909090}

        />
        </View>
        

       
      
    );
  }
}

export default KORScreen;





import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,Text,Fragmen,TouchableOpacity,Image} from "react-native";
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import  firebase,{storage}  from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

  database=firebase.database();
 
 



class CULTUREScreen extends React.Component {
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



  image=(item)=>{
      if(item.cate==1){
      return  <Image
      style={{
        width: 30, flex: 1,
        height: 30, marginRight:10
      }}
      resizeMode={'contain'}
      source={ 
          require('../assets/baseline-chat-24px.png')
      }
    />}
    if(item.cate==2){
        return  <Image
        style={{
          width: 30, flex: 1,
          height: 30, marginRight:10
        }}
        resizeMode={'contain'}
        source={ 
            require('../assets/youtu.png')
        }
      />}
  }

  renderItem =({item})=>{

    return(
      <TouchableOpacity
      onPress={() => {

     
     }
   
   }
      >
          <View style={{flexDirection:'row',borderColor:'grey',borderBottomWidth:3,height:80}}>
     <View  style={{  flex:1,alignItems:'center'}} >
               <Text style={{fontSize:20,fontFamily:'content-font' ,marginLeft:10}}>{item.title}</Text>
             </View  >
             <View>
           {this.image(item)}
           
            
           </View>
           </View>
           </TouchableOpacity>   




    )



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
  var usersRef = firebase.database().ref('culture');
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
      centerComponent={{ text: 'CULTURE', style: {fontFamily:'title-font' ,fontSize:30,marginLeft:10,color:'#56B8FF' } }}
     
       />
        <FlatList
          data={this.state.datasource}
          
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

export default CULTUREScreen;





import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,StyleSheet,Image,Text,ImageBackground,TouchableOpacity,Dimensions} from "react-native";
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

 
class FESTIVAL extends React.Component {
  constructor(props) {
    super(props);
     
    this.state = {
      loading: false,
      name:'gangnam',
      datasource: [],
      datasource1: [],
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
   
    var usersRef = firebase.database().ref('FESTIVAL');
 

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

  _renderItem = ({item}) => (
    <View  style={{  flex:1,   alignContent:'center'}}
                    
    > 
    <TouchableOpacity
         onPress={() => this.gogo(item.name,item.description,item.topimage,item.loca,item.upvote,item.disname)}
            
    >
  <ImageBackground   style={styles.icon}
        source={{uri:item.topimage}}
 
 >
  

<View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginEnd:20}}>





</View>
 
  </ImageBackground>
  </TouchableOpacity>
  </View>
 
  );


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
         
          borderColor: "#1f2124"
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
          height: 0,
          width: "86%",
          backgroundColor: "#1f2124",
          marginLeft: "14%"
        }}
      />
    );
  }; 

  _keyExtractor = (item, index) => item.key; 

   gogo=(iname,idescription,itopimage,iloca,iupvote,idisname)=>{
             
    this.props.navigation.navigate('FESTIVALEX', {
       name : iname,
       description :idescription,
       disname:idisname,
       topimage : itopimage,
        loca:iloca,
       upvote:iupvote
      
     
     //  imagelist:item.images,
       //tips:item.tips,
    });
  }

  render() {
     
    return (
        <View
        style={{ backgroundColor:'white'}}>
     
     <Header
leftComponent={  
 <TouchableOpacity 
 onPress={()=> this.props.navigation.navigate('NIGHT')}
 >
 <Image source={require('../assets/back.png')}
             
style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  />
</TouchableOpacity>
} 
backgroundColor={'#fff'}
borderBottomColor={'#fff'}
height={80}
centerComponent={{ text: 'FESTIVALS', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,marginTop:17,color:'#67DBFF' } }}

 >
     
    </Header>
   
    
         
      <ScrollView
    
     
   
      >   

    



      <View>
   
    <FlatList 
          
          data={this.state.datasource}
          keyExtractor={this._keyExtractor}
         
          renderItem={this._renderItem}
          keyExtractor={item => item.name}
       
       
          
         // ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />


        
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
    /// PixelRatio.get(),
   // borderColor: color.border,
    backgroundColor: 'white',
  },
  icon: {
    width: Dimensions.get("window").width,
   // marginTop:-1,
    height: 230,
    //borderRadius: 5,
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


export default FESTIVAL;





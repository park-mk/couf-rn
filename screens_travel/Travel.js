import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,StyleSheet,Image,Text,ImageBackground,TouchableHighlight,TouchableOpacity} from "react-native";
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import  firebase,{storage}  from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import  someList from '../components/anylist'
import { ScrollView } from "react-native-gesture-handler";

  database=firebase.database();
 
  
  
  const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
  }


class Travellist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      datasource: [],
      datasource1: [],
      datasource2: [],
      datasource3: [],
      cate:"",
      name:"",
      upvote:0,
      pause:false,
      error: null,
      refreshing: false
    };
  }



  




  
  async componentDidMount() {
    await Font.loadAsync({

      'Raley-balck': require('../assets/fonts/33676382891.ttf'),
      'title-font': require('../assets/fonts/BebasNeue-Regular.ttf'),
       'content-font':require('../assets/fonts/Bayon.ttf'),

    });
    this.setState({ fontLoaded: true })
  }

  componentDidMount() {
    
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
    const move = navigation.getParam('move', 'NO-ID');

    var usersRef = firebase.database().ref('travel/seoul1');
    
    
usersRef.on('value', (snapshot) => {
    
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource:  keys
  })
});
  
var usersRef = firebase.database().ref('travel/busan');
    
    
usersRef.on('value', (snapshot) => {
    
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource1:  keys
  })
});

var usersRef = firebase.database().ref('travel/special');
    
    
usersRef.on('value', (snapshot) => {
    
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource2:  keys
  })
});

var usersRef = firebase.database().ref('travel/JEJU1');
    
    
usersRef.on('value', (snapshot) => {
    
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource3:  keys
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
   

   renderItem =({item})=>{

         return(
           <TouchableOpacity
           onPress={() => {

            if(item.cate!="more"){
           

                  this.props.navigation.navigate('TTi', {
                    name : item.name,
                    description :item.description,
                    location: item.location,
                    topimage : item.topimage,
                    cate:item.cate,
                    upvote:this.state.upvote,//item.upvote,
                    imagelist:item.images,
                  //  imagelist:item.images,
                    //tips:item.tips,
                 }); 
                 }
         if(item.cate=="more"){
              this.props.navigation.navigate('TTlist',{

                name : item.name,
              });

              console.log("move");
         }
          
          }
        
        }
           >
          <View  style={{  flex:1,  marginLeft:10,flexDirection:'row',marginBottom:6,borderColor:'black'}} >
                  <Image  style={styles.icon}
                        source={{uri:item.topimage}}
                 
                 />
                  <View  >
              { //<Text style={styles.h1}>{item.name}</Text>  
                 // <Text style={styles.p} >{item.devision}</Text>   
                 //<Text style={styles.price} >{item.location}</Text> 
                 }
                
                  </View>
                 
                </View>
                </TouchableOpacity>   

    


         )



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
    centerComponent={{ text: 'TRAVEL', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
   
     />
      <ScrollView> 
         <View style={{flexDirection:'row'}} >
    <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >SEOUL  </Text> 
                       
              </View>             
                  
        <View style={{flexDirection:'row'}} >
        <View  style={{marginLeft:0}}>
        </View>
      <FlatList 
     
          data={this.state.datasource}
          
          renderItem={this.renderItem}
          
          horizontal={true}
          keyExtractor={item => item.name}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
         // ListHeaderComponent={this.renderHeader}
      //   ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
       
          onEndReachedThreshold={10000000} 
           
       
        />

      </View>

      <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >BUSAN</Text>    


<View style={{flexDirection:'row'}} >
        <View  style={{marginLeft:0}}>
        </View>
      <FlatList 
          data={this.state.datasource1}
          
          renderItem={this.renderItem}
          
          horizontal={true}
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
    //     ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />

      </View>                 
      <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >JEJU</Text>    


<View style={{flexDirection:'row'}} >
        <View  style={{marginLeft:0}}>
        </View>
      <FlatList 
          data={this.state.datasource3}
          
          renderItem={this.renderItem}
          
          horizontal={true}
          keyExtractor={item => item.topimage}
        
          
         // ListHeaderComponent={this.renderHeader}
    //     ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />

      </View>     



      <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >SPECIAL TOUR</Text>    


<View style={{flexDirection:'row'}} >
        <View  style={{marginLeft:0}}>
        </View>
      <FlatList 
          data={this.state.datasource2}
          
          renderItem={this.renderItem}
          
          horizontal={true}
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
   //      ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />

      </View>           
      <View style={{height:100}}>
         <Text>   </Text>
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
    width: 282,
    height: 400,
    
    marginRight:10,
    borderWidth:2,borderColor:'#56B8FF',borderRadius:5
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
    fontSize: 15,
    
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


export default Travellist;





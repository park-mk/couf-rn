import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,StyleSheet,Image,Text,ImageBackground,TouchableHighlight,TouchableOpacity} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
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
    const move = navigation.getParam('move', 'NO-ID');

    var usersRef = firebase.database().ref('travel');
    
    
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
   

   renderItem =({item})=>{

         return(
           <TouchableOpacity
           onPress={() => {
             
            this.props.navigation.navigate('TTi', {
               name : item.name,
               description :item.description,
              
               topimage : item.topimage,
               cate:item.cate,
              
             
             //  imagelist:item.images,
               //tips:item.tips,
            });
          }
        
        }
           >
          <View  style={{  flex:1,  flexDirection:'row',marginBottom:6,borderColor:'black'}} >
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
      <ScrollView> 
         <View style={{flexDirection:'row'}} >
    <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >SEOUL</Text> 
                         <Text   style={{fontFamily:'title-font' ,fontSize:20, marginLeft:20,marginTop:50,color:'#56B8FF'}}  
                           
                           >   INDOOR</Text>     
              </View>             
                  
        <View style={{flexDirection:'row'}} >
        <View  style={{marginLeft:30}}>
        </View>
      <FlatList 
          data={this.state.datasource}
          
          renderItem={this.renderItem}
          
          horizontal={true}
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40} 
           
       
        />

      </View>

      <Text   style={{fontFamily:'title-font' ,fontSize:40, marginLeft:20,marginTop:30,color:'#56B8FF'}}  
                           
                           >SPECIAL TOUR</Text>    


<View style={{flexDirection:'row'}} >
        <View  style={{marginLeft:30}}>
        </View>
      <FlatList 
          data={this.state.datasource}
          
          renderItem={this.renderItem}
          
          horizontal={true}
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
    width: 240,
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





import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,Button,StyleSheet,Image,Text} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import  firebase,{storage}  from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import  someList from '../components/anylist'

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
    var usersRef = firebase.database().ref('korean');
     else
     var usersRef = firebase.database().ref('tips');
    
usersRef.on('value', (snapshot) => {
    
    for(let i=0;i<2;i++){
        
    }
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
      
        <FlatList
          data={this.state.datasource}
          
          renderItem={({ item }) => (
              
            <ListItem  
               title=  {     
                    <View  style={{  flex:1,  flexDirection:'row'}} >
                  <Image  style={styles.icon}
                      
                  source={require('../assets/mama.png')} />
                  <View  >
                  <Text style={styles.h1}>LOTTE WORLD</Text>  
                  <Text style={styles.p} >amusement park</Text>  
                  <Text style={styles.price} >SEOUL JAMSIL</Text>  
                  
                  </View>
                  </View>
          }
            onPress={() => this._play()}
            onLongPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('KORex', {
                 kor : item.kor,
                 eng :item.eng,
                 pro :item.pro,
                 description : item.description ,
              });
            }}
              
             // avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 3 }}
            />
          )
          
        }
          keyExtractor={item => item.kor}
        
          
         // ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
        />
      
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
    width: 120,
    height: 120,
    borderRadius: 5,
    marginRight:10,
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
    fontSize: 24,
    
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
})


export default Travellist;





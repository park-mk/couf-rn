import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Button, StyleSheet, Image, Text, ImageBackground, TouchableOpacity, } from "react-native";
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import firebase, { storage } from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import someList from '../components/anylist'
import *  as Font from 'expo-font'
import { ScrollView } from "react-native-gesture-handler";
import { Container, Content } from 'native-base'
database = firebase.database();



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
      pause: false,
      error: null,
      refreshing: false,
      fontLoaded: true,
    };
  }









  componentDidMount() {
    Font.loadAsync({
      'title-font': require('../assets/fonts/BebasNeue-Regular.ttf'),
      'Raley-balck': require('../assets/fonts/BebasNeue-Regular.ttf'),
      'Name-font': require('../assets/fonts/Nickainley-Normal_2.ttf'),

    });
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {



    this.setState({ loading: true });
    const { navigation } = this.props;

    var usersRef = firebase.database().ref('food/Meat');


    usersRef.on('value', (snapshot) => {


      var m = snapshot.val()
      var keys = Object.values(m);
      console.log(keys)
      this.setState({
        datasource: keys
      })
    });
    usersRef = firebase.database().ref('food/dessert');


    usersRef.on('value', (snapshot) => {


      var m = snapshot.val()
      var keys = Object.values(m);
      this.setState({
        datasource1: keys
      })
    });


    usersRef = firebase.database().ref('food/Seafood');


    usersRef.on('value', (snapshot) => {


      var m = snapshot.val()
      var keys = Object.values(m);
      this.setState({
        datasource_sea: keys
      })
    });
    usersRef = firebase.database().ref('food/soup');


    usersRef.on('value', (snapshot) => {


      var m = snapshot.val()
      var keys = Object.values(m);
      this.setState({
        datasource_soup: keys
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
    this.state.loading = true;
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


  renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        onPress={() => this.gogo(item.name, item.description, item.topimage, item.cate, item.disname)}
      >
        <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row', marginBottom: 6, borderColor: 'black' }} >
          <ImageBackground style={styles.icon}
            source={{ uri: item.topimage }}

          >
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>

              <Image
                style={{
                  width: 35,
                  height: 30, marginTop: 170
                }}
                source={require('../assets/likewhithe.png')}
              />
              <Text style={{ marginLeft: 3, fontSize: 30, color: 'white', fontFamily: 'title-font' }}>{item.upvote}</Text>


            </View>


          </ImageBackground>
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
  _keyExtractor = (item, index) => item.key;

  gogo = (iname, idescription, itopimage, icate, idisname) => {

    this.props.navigation.navigate('FOODi', {
      name: iname,
      description: idescription,
      disname: idisname,
      topimage: itopimage,
      cate: icate,


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
              onPress={() => this.props.navigation.navigate('Menu')}
            >
              <Image source={require('../assets/back.png')}

                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
              />
            </TouchableOpacity>
          }
          backgroundColor={'#fff'}
          borderBottomColor={'#fff'}
          height={80}
          centerComponent={{ text: 'FOOD' ,style: { fontFamily: 'title-font', fontSize: 40, marginLeft: 10, marginTop: 17, color: '#67DBFF' } }}

        >

        </Header>


        <ScrollView
            style={{backgroundColor:'#ffffff'}}
        >
          <Text style={{ fontFamily: 'title-font', fontSize: 40, marginLeft: 20, marginTop: 30, color: '#67DBFF' }}

          >Meat</Text>

          <View>




            <FlatList
              data={this.state.datasource}
              keyExtractor={this._keyExtractor}
              horizontal={true}
              renderItem={this.renderItem}
              //   renderItem={({ item }) => (

              //     <ListItem  

              //        title=  {    

              //             <View  style={{  flex:1,   alignContent:'center',marginRight:-3, borderWidth:2,borderColor:'#67DBFF'}}

              //             >
              //                < ImageBackground  
              //               style={styles.icon}

              //               source={{uri:'https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/food%2F%EC%82%BC%EA%B2%B9%EC%82%B4%2Fpork%20belly.png?alt=media&token=f501f85d-555c-4a4f-92cd-c5d305fcb08e'}}

              //          />
              //           <ImageBackground  
              //               style={styles.icon}
              //               source={{uri:'https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/food%2F%EC%82%BC%EA%B2%B9%EC%82%B4%2Fpork%20belly.png?alt=media&token=f501f85d-555c-4a4f-92cd-c5d305fcb08e'}}
              //               //  source={{uri:item.topimage}}

              //          >


              //     <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}>

              //   <Image
              //     style={ { width: 35,
              //       height: 30,marginTop:170}}
              //     source={require('../assets/likewhithe.png')}
              //   /> 
              //   <Text style={{marginLeft:3,fontSize:30,color:'white',fontFamily:'title-font'}}>{item.upvote}</Text>


              //   </View>

              //           </ImageBackground>
              //           </View>


              //   }



              //     onPress={() => this.gogo(item.name,item.description,item.topimage,item.cate,item.disname)

              //   }

              //      // avatar={{ uri: item.picture.thumbnail }}

              //     />
              //   )

              // }
              keyExtractor={item => item.name}

              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={40}
            />



          </View>
          <Text style={{ fontFamily: 'title-font', fontSize: 40, marginLeft: 20, marginTop: 30, color: '#67DBFF' }}

          >SEAFOOD</Text>

          <View>

            <FlatList
              data={this.state.datasource_sea}
              keyExtractor={this._keyExtractor}
              horizontal={true}
              renderItem={this.renderItem}
              keyExtractor={item => item.name}


              // ListHeaderComponent={this.renderHeader}
              //  ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={40}
            />



          </View>



          <Text style={{ fontFamily: 'title-font', fontSize: 40, marginLeft: 20, marginTop: 30, color: '#67DBFF' }}

          >SOUP</Text>

          <View>

            <FlatList
              data={this.state.datasource_soup}
              keyExtractor={this._keyExtractor}
              horizontal={true}
              renderItem={this.renderItem}
              keyExtractor={item => item.name}


              // ListHeaderComponent={this.renderHeader}
              // ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={40}
            />



          </View>


          <Text style={{ fontFamily: 'title-font', fontSize: 40, marginLeft: 20, marginTop: 30, color: '#67DBFF' }}

          >DESSERT</Text>

          <View>

            <FlatList
              data={this.state.datasource1}
              keyExtractor={this._keyExtractor}
              horizontal={true}
              renderItem={this.renderItem}
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
            style={{ height: 150 }}
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
    borderBottomWidth: 1, /// PixelRatio.get(),
    // borderColor: color.border,
    backgroundColor: 'white',
  },
  icon: {
    width: 340,
    height: 200,
    borderRadius: 5,
    resizeMode: 'cover',

    // alignContent:'center',
  },
  imagesize: {
    width: 340,
    height: 200,
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
    marginTop: 30,
    color: color.theme,

  },
  h1: {
    fontSize: 40,
    fontFamily: 'Raley-balck',
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: null,
    height: null,
    opacity: 0.5,
    resizeMode: 'cover',
  },
})


export default Foodlist;





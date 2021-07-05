import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, FlatList,Linking } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Category from '../components/category'
import firebase, { storage } from "../firebase";
import { List, ListItem, SearchBar, Header } from "react-native-elements";
class TIP extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      datasource: [],
      datasource1: [],

    };
  }

  image = (item) => {
    let dimensions = Dimensions.get("window");
    if (item.cate == 1) {
      return <Image
        style={{
          width: 30,
          height: 30, marginTop: -30, marginLeft: dimensions.width - 50
        }}
        resizeMode={'contain'}
        source={
          require('../assets/youtu.png')
        }

      />
    }



  }

  image1 = (item) => {
    let dimensions = Dimensions.get("window");
    if (item.cate == 1) {
      return <Image
        style={{
          width: 20,
          height: 20, marginTop: -30, marginLeft: 2 * dimensions.width / 5 - 10
        }}
        resizeMode={'contain'}
        source={
          require('../assets/youtu.png')
        }

      />
    }

  }
  renderItem = ({ item }) => {
    let dimensions = Dimensions.get("window");

    return (
      <TouchableOpacity
        onPress={() => {
          if(item.cate==1){
               
            Linking.openURL(JSON.stringify(item.contents).replace(/^"(.+)"$/,'$1')).catch((err) => console.error('An error occurred', err))
  
          }
          if(item.cate==2){
          this.props.navigation.navigate('TIP_EX', {
            title: item.title,
            description: item.contents,

          

          });


        }
      
      
      
      }

        }
      >



        <View style={{ justifyContent: 'center', alignContent: 'center', height: dimensions.height / 2, width: dimensions.width - 10, backgroundColor: 'grey', borderColor: '#67DBFF', borderWidth: 2, borderRadius: 0 }}>
          <Text style={{ textAlign: 'center', fontFamily: 'title-font', fontSize: 30, color: '#67DBFF' }}> {item.title}</Text>

        </View>
        {this.image(item)}


      </TouchableOpacity>




    )



  }

  renderItem1 = ({ item }) => {
    let dimensions = Dimensions.get("window");
    let margin = (dimensions.width) / 15
    return (
      <TouchableOpacity
      onPress={() => {
        if(item.cate==1){
               
          Linking.openURL(JSON.stringify(item.contents).replace(/^"(.+)"$/,'$1')).catch((err) => console.error('An error occurred', err))

        }
        if(item.cate==2){
        this.props.navigation.navigate('TIP_EX', {
          title: item.title,
          description: item.contents,

          cate: item.cate,

        });


      }}

        }
      >



        <View style={{ marginTop: 50, marginLeft: margin, justifyContent: 'center', alignContent: 'center', height: 2 * dimensions.width / 5, width: 2 * dimensions.width / 5, backgroundColor: 'grey', borderColor: '#67DBFF', borderWidth: 2, borderRadius: 0 }}>
          <Text style={{ textAlign: 'center', fontFamily: 'title-font', fontSize: 30, color: '#67DBFF' }}> {item.title}</Text>
        </View>
        {this.image1(item)}

      </TouchableOpacity>




    )



  }

  componentDidMount() {

    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {





    var usersRef = firebase.database().ref('tips/main');


    usersRef.on('value', (snapshot) => {


      var m = snapshot.val()
      var keys = Object.values(m);

      this.setState({
        datasource: keys
      })
    });
    var usersRef1 = firebase.database().ref('tips/others');


    usersRef1.on('value', (snapshot) => {


      var m = snapshot.val()
      var keys = Object.values(m);

      this.setState({
        datasource1: keys
      })
    });

  }

  render() {
    let dimensions = Dimensions.get("window");
    let imageheight = dimensions.height / 2;
    let imagewidth = dimensions.width;
    return (
      <View style={{ flex: 1 }}>
         <Header
          leftComponent={
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Category')}
            >
              <Image source={require('../assets/back.png')}

                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
              />
            </TouchableOpacity>
          }
          backgroundColor={'#fff'}
          borderBottomColor={'#fff'}
          height={80}
          centerComponent={{ text: 'TIPS' ,style: { fontFamily: 'title-font', fontSize: 40, marginLeft: 10, marginTop: 17, color: '#67DBFF' } }}

        >

        </Header>

        <ScrollView 
          style={{backgroundColor:'#ffffff'}}
        onRefresh={this.handleRefresh} >
          { /*****  category sort  each view have 2 category  in row 
      
             <Category  imageURI={require('../assets/icon.png' )}
                           name='Basic Expression'
                           onPress={() => {
                           
                            this.props.navigation.navigate('KOR', {
                              move:'BASIC',
                           });
                         }}
                        
                     />
      
      *******/}
          <Text style={{ fontFamily: 'title-font', fontSize: 35, marginTop: 20, marginLeft: 20 }}> </Text>

          <FlatList

            data={this.state.datasource}

            renderItem={this.renderItem}

            horizontal={true}
            keyExtractor={item => item.title}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            // ListHeaderComponent={this.renderHeader}
            //   ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}

            onEndReachedThreshold={10000000}


          />

          <FlatList
            numColumns={2}
            data={this.state.datasource1}

            renderItem={this.renderItem1}

            //  horizontal={true}
            keyExtractor={item => item.title}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            // ListHeaderComponent={this.renderHeader}
            //   ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}

          //   onEndReachedThreshold={10000000} 


          />
          { /*****  category sort  each view have 2 category  in row  *******/}




          <View style={{ marginLeft: 20, height: 100, width: imagewidth }}>

          </View>


        </ScrollView >
      </View>


    );
  }
}
export default TIP;
{ /*****   design part  *******/ }

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  }, icon: {


    marginRight: 10,
    borderWidth: 2, borderColor: '#67DBFF', borderRadius: 5
  }
});

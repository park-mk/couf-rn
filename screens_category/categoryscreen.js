import React from 'react';
import { Button, Text, View, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import firebase, { storage } from "../firebase";
import Category from '../components/category'
import Categor from '../components/anylist'
class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count_tips: 0,
      count_news: 0,
      count_korean: 0,
      count_contact: 0,
      count_qa: 0,
      count_phone: 0,
      count_bus: 0,
      count_culture: 0,



    };
  }
  updateview_korean = () => {



    var d;
    var s
    var usersRef = firebase.database().ref('visit/korean/count');
    usersRef.on('value', (snapshot) => {


      m = snapshot.val()


      this.state.count_travel = m + 1;
    });
    firebase.database().ref('visit/korean').update({
      count: this.state.count_travel
    }, function () {

    });
    this.props.navigation.navigate('KORca');
  }
  updateview_bus = () => {



    var d;
    var s
    var usersRef = firebase.database().ref('visit/bus/count');
    usersRef.on('value', (snapshot) => {


      m = snapshot.val()


      this.state.count_travel = m + 1;
    });
    firebase.database().ref('visit/bus').update({
      count: this.state.count_travel
    }, function () {

    });
    this.props.navigation.navigate('BUS');
  }
  updateview_phone = () => {



    var d;
    var s
    var usersRef = firebase.database().ref('visit/phone/count');
    usersRef.on('value', (snapshot) => {


      m = snapshot.val()


      this.state.count_travel = m + 1;
    });
    firebase.database().ref('visit/phone').update({
      count: this.state.count_travel
    }, function () {

    });
    this.props.navigation.navigate('TOL');
  }
  updateview_contact = () => {



    var d;
    var s
    var usersRef = firebase.database().ref('visit/contact/count');
    usersRef.on('value', (snapshot) => {


      m = snapshot.val()


      this.state.count_travel = m + 1;
    });
    firebase.database().ref('visit/contact').update({
      count: this.state.count_travel
    }, function () {

    });
    this.props.navigation.navigate('CONTACT');
  }

  render() {
    var usersRef = firebase.database().ref('visit');
    usersRef.on('value', (snapshot) => {

      var m;
      m = snapshot.val()


      this.state.count_travel = m.travel.count;
      this.state.count_buy = m.buy.count;
      this.state.count_ent = m.ent.count;
      this.state.count_food = m.food.count;
      this.state.count_youtube = m.youtube.count;
      this.state.count_suggestion = m.suggestion.count;
    });
    return (
      <View style={{ flex: 1, marginTop: 20, marginLeft: 5 }}>
        <ScrollView onRefresh={this.handleRefresh} >
          { /*****  category sort  each view have 2 category  in row  *******/}
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fnews.png?alt=media&token=d10da786-ea88-4051-92ad-2f62d1216090" }}
              name='exchange'

              // onPress={()=>  Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
              // onPress={()=> this.props.navigation.navigate('EXCHANGE')

              //   }
              onPress={

                () => this.updateview(name)}
            />

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Flearning%20korea.png?alt=media&token=27b4bb03-956a-4af6-8026-4718f7d8eecf" }}
              name='korean'
              onPress={() => this.updateview_korean()}
            />
          </View>
          { /*****  category sort  each view have 2 category  in row  *******/
            // hope we can 
          }

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fbus%20schedule.png?alt=media&token=8f3279cd-2fa1-4d49-b603-85c9b9e6835d" }}
              name='bus'
              onPress={() => this.updateview_bus()}

            />
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fphone%20book.png?alt=media&token=4cfb18e7-66bb-451f-804b-e866220440ef" }}
              name='phone'
              onPress={() => this.updateview_phone()}
            />
          </View>
          { /*****  category sort  each view have 2 category  in row  *******/}
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Ftips.png?alt=media&token=9c969d9b-61f3-4687-9263-929db6f0918e" }}
              name='buy and sell'
              onPress={() => this.props.navigation.navigate('UNDEVELOP1')}
            />
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F71583065_384095262479898_3086850522427162624_n.png?alt=media&token=d90c1db1-b1f3-49bd-8a95-c4e5223a2f53" }}
              name='TOUR'
              onPress={() => this.props.navigation.navigate('UNDEVELOP1')}
            />
          </View>
          { /*****  category sort  each view have 2 category  in row  *******/}
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F71943018_385345952161708_3197462092261097472_n.png?alt=media&token=d297dc46-a368-414d-b4fa-842f5cb079df" }}
              name='culture'
              onPress={() => Linking.openURL("https://www.youtube.com/channel/UCS8Wlr_B7CQkN53Fim20G2Q?view_as=subscriber").catch((err) => console.error('An error occurred', err))}
            />
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F71348065_692662517904833_2631103120217735168_n.png?alt=media&token=9b1bb6f7-9af8-4241-9698-5c2b1e28675c" }}
              name='contact us'
              onPress={() => this.updateview_contact()}
            />
          </View>
          { /*****  category sort  each view have 2 category  in row  *******/}


        </ScrollView >
      </View>


    );
  }
}
export default CategoryScreen;
{ /*****   design part  *******/ }
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
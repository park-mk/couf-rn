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
  updateview_news = () => {



  
    var d; 
    var s
    var usersRef = firebase.database().ref('visit/news/count');
    usersRef.once('value', (snapshot) => {


        m = snapshot.val()

       
        this.state.count_news = m ;
    }, function (m) {
        
    }).then((m)=>{
       
        firebase.database().ref('visit/news').update({
            count: this.state.count_news +1
        }, function () {

        }); 
    })
    this.props.navigation.navigate('NEWS');
  }
  updateview_korean = () => {



  
    var d; 
    var s
    var usersRef = firebase.database().ref('visit/korean/count');
    usersRef.once('value', (snapshot) => {


        m = snapshot.val()

       
        this.state.count_korean = m ;
    }, function (m) {
        
    }).then((m)=>{
        console.log("korean",this.state.count_korean)
        firebase.database().ref('visit/korean').update({
            count: this.state.count_korean +1
        }, function () {

        }); 
    })
    this.props.navigation.navigate('KORca');
  }
  updateview_bus = () => {



    
    var d; 
    var s
    var usersRef = firebase.database().ref('visit/bus/count');
    usersRef.once('value', (snapshot) => {


        m = snapshot.val()

       
        this.state.count_bus = m ;
    }, function (m) {
        
    }).then((m)=>{
      
        firebase.database().ref('visit/bus').update({
            count: this.state.count_bus+1
        }, function () {

        }); 
    })
    this.props.navigation.navigate('BUS');
  }
  updateview_phone = () => {

    var d; 
    var s
    var usersRef = firebase.database().ref('visit/phone/count');
    usersRef.once('value', (snapshot) => {


        m = snapshot.val()

       
        this.state.count_phone = m ;
    }, function (m) {
        
    }).then((m)=>{
        console.log("korean",this.state.count_phone)
        firebase.database().ref('visit/phone').update({
            count: this.state.count_phone +1
        }, function () {

        }); 
    })
    this.props.navigation.navigate('TOL');
  }
  updateview_culture = () => {



  
    var d; 
    var s
    var usersRef = firebase.database().ref('visit/culture/count');
    usersRef.once('value', (snapshot) => {


        m = snapshot.val()

       
        this.state.count_culture = m ;
    }, function (m) {
        
    }).then((m)=>{
       
        firebase.database().ref('visit/culture').update({
            count: this.state.count_culture +1
        }, function () {

        }); 
    })
    this.props.navigation.navigate('CULTURE');
  }
  updateview_contact = () => {



  
    var d; 
    var s
    var usersRef = firebase.database().ref('visit/contact/count');
    usersRef.once('value', (snapshot) => {


        m = snapshot.val()

       
        this.state.count_contact = m ;
    }, function (m) {
        
    }).then((m)=>{
       
        firebase.database().ref('visit/contact').update({
            count: this.state.count_contact +1
        }, function () {

        }); 
    })
    this.props.navigation.navigate('CONTACT');
  }

  render() {
  
    return (
      <View style={{ flex: 1, marginTop: 20, marginLeft: 5 }}>
        <ScrollView onRefresh={this.handleRefresh} >
          { /*****  category sort  each view have 2 category  in row  *******/}
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fnews.png?alt=media&token=d10da786-ea88-4051-92ad-2f62d1216090" }}
              name='news'

              // onPress={()=>  Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
              // onPress={()=> this.props.navigation.navigate('EXCHANGE')

              //   }
              onPress={       () => this.updateview_news()}
         
            />

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Flearning%20korea%202.png?alt=media&token=b64cd108-71af-4a9c-bc3a-7b75349aefdc" }}
              name='korean'
              onPress={() => this.updateview_korean()}
            />
          </View>
          { /*****  category sort  each view have 2 category  in row  *******/
            // hope we can 
          }

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fbus%20schedule%202.png?alt=media&token=908b2ef2-ad53-4e8f-98f2-6e14c8e2dde6" }}
              name='bus'
              onPress={() => this.updateview_bus()}

            />
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fphone%20book%202.png?alt=media&token=1ed70b8a-43fa-4dc3-a312-f0daa66daeb3" }}
              name='phone'
              onPress={() => this.updateview_phone()}
            />
          </View>
          { /*****  category sort  each view have 2 category  in row  *******/}
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Ftips.png?alt=media&token=9c969d9b-61f3-4687-9263-929db6f0918e" }}
              name='buy and sell'
            
              onPress={() => this.props.navigation.navigate('TIP')}
            />
             
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fcontact%20us%202.png?alt=media&token=d268a337-e339-4c86-94ae-f7c0b34d5f00" }}
              name='TOUR'
              onPress={() => this.props.navigation.navigate('UNDEVELOP1')}
              />
               </View>
          { /*****  category sort  each view have 2 category  in row  *******/}
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fculture%202.png?alt=media&token=4f711b3c-b0c0-44a3-99b7-e5a2547dcec3" }}
              name='culture'
           
              onPress={() => this.updateview_culture()}
            />
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fabout%20us%202.png?alt=media&token=7328b825-4625-40ca-ad4f-6896c3ea496d" }}
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
alignItems: 'center',
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
  },
});
 */
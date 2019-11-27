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

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Fnews.png?alt=media&token=e7581558-f252-4ab4-949a-f4b02053b1ca" }}
              name='news'

              // onPress={()=>  Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
              // onPress={()=> this.props.navigation.navigate('EXCHANGE')

              //   }
              onPress={       () => this.updateview_news()}
         
            />

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Flearning%20korea.png?alt=media&token=e5bb5602-fb64-497c-944f-f418182b394d" }}
              name='korean'
              onPress={() => this.updateview_korean()}
            />
          </View>
          { /*****  category sort  each view have 2 category  in row  *******/
            // hope we can 
          }

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Fbus%20schedule.png?alt=media&token=5f70caaf-1beb-4833-be2d-be828ba8d475" }}
              name='bus'
              onPress={() => this.updateview_bus()}

            />
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Fphone%20book.png?alt=media&token=ac2a856d-432d-43ba-8799-e336cf8bc042" }}
              name='phone'
              onPress={() => this.updateview_phone()}
            />
          </View>
          { /*****  category sort  each view have 2 category  in row  *******/}
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Fbuy%20%26%20sell.png?alt=media&token=1245857a-f4e3-4c61-a1ca-d2ad217af7f5" }}
              name='buy and sell'
            
              onPress={() => this.props.navigation.navigate('BUYLIST')}
            />
             
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Ftips.png?alt=media&token=815782d1-a7cd-4882-9704-9159ebd6848a" }}
              name='TIPS'
              onPress={() => this.props.navigation.navigate('TIP')}
              />
               </View>
          { /*****  category sort  each view have 2 category  in row  *******/}
          <View style={{ flex: 1, flexDirection: 'row' }}>

            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Fculture.png?alt=media&token=498157f9-530a-462f-9bbb-27da31a75ddd" }}
              name='culture'
           
              onPress={() => this.updateview_culture()}
            />
            <Category imageURI={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Fabout%20us.png?alt=media&token=07dd4bb4-e98e-4bd1-82e5-d5b52be6afea" }}
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
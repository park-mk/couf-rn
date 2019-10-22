import React, { Component } from "react";
import {
    Button,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    ART,
    Dimensions,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import firebase, { storage } from "../firebase";
//import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import someList from '../components/anylist'
import *  as Font from'expo-font'




const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}


class NIGHT extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           count_fes:0,
           count_concert:0,
           count_club:0,
        };
    }


   


    updateview_f = () => {
    
          console.log("실행")
 
        var d; 
        var s
        var usersRef = firebase.database().ref('visit/ent_festival/count');
        usersRef.on('value', (snapshot) => {


            m = snapshot.val()

           
            this.state.count_fes = m + 1;
        });
        firebase.database().ref('visit/ent_festival').update({
            count: this.state.count_fes
        }, function () {

        }); 
        this.props.navigation.navigate('FESTIVAL');
    }




    updateview_c = () => {
    
        console.log("실행")

      var d; 
      var s
      var usersRef = firebase.database().ref('visit/ent_concert/count');
      usersRef.on('value', (snapshot) => {


          m = snapshot.val()

         
          this.state.count_fes = m + 1;
      });
      firebase.database().ref('visit/ent_concert').update({
          count: this.state.count_fes
      }, function () {

      }); 
      this.props.navigation.navigate('CONCERT');
  }


  updateview_cl = () => {
    
    console.log("실행")

  var d; 
  var s
  var usersRef = firebase.database().ref('visit/ent_club/count');
  usersRef.on('value', (snapshot) => {


      m = snapshot.val()

     
      this.state.count_fes = m + 1;
  });
  firebase.database().ref('visit/ent_club').update({
      count: this.state.count_fes
  }, function () {

  }); 
  this.props.navigation.navigate('CLUB');
}


 

   

    render() { 
        var usersRef = firebase.database().ref('visit');
        usersRef.on('value', (snapshot) => {
      
          var m;
           m=snapshot.val() 
          
        
             this.state.count_fes=m.ent_festival.count;
             this.state.count_concert=m.ent_concert.count;
             this.state.count_club=m.ent_club.count;
            
             }); 
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height / 3;
        let imagewidth = dimensions.width;
   


        return (
            <View >
           <Header
          leftComponent={  <TouchableOpacity 
           onPress={()=> this.props.navigation.navigate('Home')}
           >
           <Image source={require('../assets/back.png')}
                       
          style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
     /> 
     </TouchableOpacity>} 
         backgroundColor={'#fff'}
        borderBottomColor={'#fff'}
          centerComponent={{ text: 'ENTERTAINMENT', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:5,color:'#56B8FF' } }}
         
          />
           
            <ScrollView
          //    stickyHeaderIndices={[0]}
            >
                 
                <View
                 style={{
                   
                 
                
                  
               }}
                >


                       

                    <TouchableOpacity 
                        
                        onPress={()=> this.updateview_f()}
                    
                    >

                         <View
                         style={ { borderBottomWidth:1,borderColor:'white'}}>
                        <Image
                            style={{
                                
                                width: imagewidth,
                                height:imageheight,
                              
                               
            
                               
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Ffestivals.png?alt=media&token=f71d2234-c51f-42ba-b136-8c03c46d982e" }}
                        />
                      
                      
     
                     </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                         style={{
                          
                         
                            
                        }}
                        onPress={()=> this.updateview_c()}
                    >

                         <View  style={ { borderBottomWidth:1,borderColor:'white'}}>
                        <Image
                            style={{
                                
                                width: imagewidth,
                                height:imageheight,
                                borderBottomWidth:1,
                               
            
                               
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Fconcerts.png?alt=media&token=5a99e389-4bd6-4906-8b85-d610296f9e98" }}
                        />
                      
                      
     
                     </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                         style={{
                           
                         
                           
                        }}
                        onPress={()=> this.updateview_cl()}
                    >

                         <View   style={ { borderBottomWidth:1,borderColor:'white'}}>
                        <Image
                            style={{
                                
                                width: imagewidth,
                                height:imageheight,
                                borderBottomWidth:1,
                               
            
                               
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Fclubs.png?alt=media&token=d0a0a406-a028-41f5-a7fd-f92d3a8ed633" }}
                        />
                      
                      
     
                     </View>
                    </TouchableOpacity>

                  
                    <View   style={ { height:80}}>
                    </View>



                </View>
                </ScrollView>

            </View>
        );
    }
}



export default NIGHT;





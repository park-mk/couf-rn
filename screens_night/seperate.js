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
    
        
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '-' + dd + '-' + yyyy;
  
  
 
        var d; 
        var s
        var usersRef = firebase.database().ref('visit/ent_festival/'+today+'/count');
        usersRef.on('value', (snapshot) => {


            m = snapshot.val()

           
            this.state.count_fes = m + 1;
        });
        firebase.database().ref('visit/ent_festival/'+today).update({
            count: this.state.count_fes
        }, function () {

        }); 
        this.props.navigation.navigate('FESTIVAL');
    }




    updateview_c = () => {
    
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '-' + dd + '-' + yyyy;
      
      
      var d; 
      var s
      var usersRef = firebase.database().ref('visit/ent_concert/'+today+'/count');
      usersRef.on('value', (snapshot) => {


          m = snapshot.val()

         
          this.state.count_fes = m + 1;
      });
      firebase.database().ref('visit/ent_concert/'+today).update({
          count: this.state.count_fes
      }, function () {

      }); 
      this.props.navigation.navigate('UNDEVELOP2');
      //this.props.navigation.navigate('CONCERT');
  }


  updateview_cl = () => {
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '-' + dd + '-' + yyyy;
  

  var d; 
  var s
  var usersRef = firebase.database().ref('visit/ent_club/'+today+'/count');
  usersRef.on('value', (snapshot) => {


      m = snapshot.val()

     
      this.state.count_fes = m + 1;
  });
  firebase.database().ref('visit/ent_club/'+today).update({
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
leftComponent={  
 <TouchableOpacity 
 onPress={()=> this.props.navigation.navigate('Menu')}
 >
 <Image source={require('../assets/back.png')}
             
style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  />
</TouchableOpacity>
} 
backgroundColor={'#fff'}
borderBottomColor={'#fff'}
height={80}
centerComponent={{ text: 'ENTERTAINMENT', style: {fontFamily:'title-font' ,fontSize:35,marginLeft:10,marginTop:17,color:'#67DBFF' } }}

 >
     
    </Header>
           
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
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2Ffestivals.png?alt=media&token=14b080cb-044f-40e2-9181-b2fd53c24c4e" }}
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
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2Fconcerts.png?alt=media&token=02f0057a-6d00-4a77-a048-1a7b9080510a" }}
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
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2Fclubs.png?alt=media&token=a7962456-0d3a-4905-bcfe-c841e35afd3a" }}
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





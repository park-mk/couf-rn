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
    Linking,
    Alert
    
  
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase, { storage } from "../firebase";
//import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import someList from '../components/anylist'
import *  as Font from'expo-font'
import { ConfirmDialog } from 'react-native-simple-dialogs';

import expo from '../app.json'


const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}


class Home1 extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
            description1:"",
            description2:"",
            description3:"",
            description4:"",
            dialogVisible:true,
            
            image1:"",
            image2:"",
            image3:"",
            image4:"",
        };
        this.fundplease = this.fundplease.bind(this);
    }


   






    async componentDidMount() {
        await Font.loadAsync({

            'Raley-balck': require('../assets/fonts/33676382891.ttf'),
            'Name-font': require('../assets/fonts/Nickainley-Normal_2.ttf'),

        }); 
       

    }


    _dataextract  =  ( ) =>{

        var usersRef = firebase.database().ref('Home');
    
    
        usersRef.on('value', (snapshot) => {
            
            
             var m=snapshot.val() 
            
            
             this.setState({
                description1:m.p_1.description,
             description2:m.p_2.description,
             description3:m.p_3.description,
             description4:m.p_4.description,
              
             image1:m.p_1.image,
             image2:m.p_2.image,
             image3:m.p_3.image,
             image4:m.p_4.image,
              })
        }); 
          
        console.log(this.state.image1);
    }

    _keyExtractor = (item, index) => item.key;
     


 

    fundplease=()=>{
        let user = firebase.auth().currentUser;
        var show=true;
        firebase.auth().onAuthStateChanged(function(user) {
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear();
            if (user) {

              if(firebase.auth().currentUser!=null){
                  var m;
                var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
                var usersRef = firebase.database().ref('userinfo/' + code + '/user_watched');
                usersRef.on('value', (snapshot) => {
                  m = snapshot.val()
                  console.log("이거",m);
                  if(m==date+month+year){
                  console.log("아니",m,date+month+year);
                   show=false;
                  }
               
               
                 
                });
               
           

            }


            const MyStatusBar = ({backgroundColor, ...props}) => (
                <View style={[styles.statusBar, { backgroundColor }]}>
                 <StatusBar backgroundColor="yellow" barStyle="dark-content" />
                </View>
              ); 
            } else {
                console.log(Date(Date.now()).toString())
                console.log("no user")
    
             
              
            }
          });

          

              return show;
            
         
     }

     check2= ()=>{
        console.log('no again')
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear();
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        firebase.database().ref('userinfo/' + code).update({
            user_watched:date+month+year
          }, function () {
    
          });
       
       }
    
     


 
     
     render() { 
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height / 5;
        let imagewidth = dimensions.width; 

      
        const MyStatusBar = ({backgroundColor, ...props}) => (
            <View style={[styles.statusBar, { backgroundColor }]}>
             <StatusBar backgroundColor="yellow" barStyle="dark-content" />
            </View>
          ); 
         
          var m;

          var keys; 
          console.log(expo.expo.version);
          
          var usersRef = firebase.database().ref('version');
          usersRef.on('value', (snapshot) => {
            m = snapshot.val()
         
            console.log("이거",m); 
           if(m!=expo.expo.version){

             alert("New version of the app is available. For more experience and better performance, please keep the app up to date!");
           }
            
           
          });
         
  
        return (
         
     

            <View>
                <ConfirmDialog
    title="Dear users"
    message={" In order to continue our hard work, we have encountered financial difficulties considering server fees.  Those who would like to support us, please click yes to donate. Thank you!"}
    visible={this.state.dialogVisible}
    onTouchOutside={() => this.setState({dialogVisible: false})}
    positiveButton={{
        title: "YES",
        onPress: () =>  Linking.openURL("https://www.paypal.me/coufKR?locale.x=ko_KR").catch((err) => console.error('An error occurred', err))
    }}
    negativeButton={{
        title: "NO",
        onPress: () =>this.setState({dialogVisible: false})
    }}
           />
            <StatusBar backgroundColor="blue" barStyle="dark-content" />
           
    
    
            <ScrollView style={{marginTop:0}}>


                <View style={{ flex: 1 ,marginTop:0}}>


                       

                    <TouchableOpacity 
                         style={{
                           marginBottom:1,
                        }}
                        onPress={()=> this.props.navigation.navigate('TT')}
                    >

                          
                        <Image
                            style={{
                               
                                width: imagewidth,
                                height: imageheight+imageheight/3,
                               
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FTRAVEL.png?alt=media&token=4bfb56db-527a-449d-8a40-213751b0d53f" }}
                        />
           

                    </TouchableOpacity>

                    <TouchableOpacity
                             style={{
                                marginBottom:1,
                             }}
                             onPress={()=> this.props.navigation.navigate('NIGHT')}
                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                                borderBottomWidth:3,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FENTERTAINMENT.png?alt=media&token=cad30c80-491a-4404-ab34-2dd5ef069f37" }}
                        
                        />


                    </TouchableOpacity>


                    <TouchableOpacity
                             style={{
                                marginBottom:1,
                             }}
                             onPress={()=> this.props.navigation.navigate('Food')}
                    >
 

                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                                
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FFOOD.png?alt=media&token=14634ce6-4ff4-43d9-a385-4f17b61d7741" }}
                        />

                        
                    </TouchableOpacity>

                    <TouchableOpacity
                          style={{
                            marginBottom:1,
                         }}
                         onPress={()=> this.props.navigation.navigate('UNDEVELOP')}
                      //   onPress={()=> this.props.navigation.navigate('UNDEVELOP')}
                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Fbuy%40sell.png?alt=media&token=54173976-31ab-4473-af6d-f4127ffc12d6" }}
                        />


                    </TouchableOpacity>


                 



                    <TouchableOpacity
                          style={{
                            marginBottom:1,
                         }}
                         onPress={()=>  Linking.openURL("https://www.youtube.com/channel/UCS8Wlr_B7CQkN53Fim20G2Q?view_as=subscriber").catch((err) => console.error('An error occurred', err))}
                    > 
                  
                     
                  
        

                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FYOUTUBE.png?alt=media&token=30d9eca6-38af-48b8-9e3b-1e7c4269cf88" }}
                        />


                    </TouchableOpacity>



                 


                    <TouchableOpacity
                             style={{
                                marginBottom:1,
                             }}
                             onPress={()=> this.props.navigation.navigate('SuggestionScreen')}
                    >
 

                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                                
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FSUGGESTIONS.png?alt=media&token=a15872fe-c150-4b89-87f1-c786bda67aaf" }}
                        />

                        
                    </TouchableOpacity>

       



                </View>

            </ScrollView>
            </View> 
            
        );
    }
}



export default Home1;





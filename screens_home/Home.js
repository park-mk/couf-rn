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
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase, { storage } from "../firebase";
//import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import someList from '../components/anylist'
import *  as Font from'expo-font'




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

            image1:"",
            image2:"",
            image3:"",
            image4:"",
        };
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

    render() { 
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height / 5;
        let imagewidth = dimensions.width;
       
          
        console.log(this.state.image1);


       
          
        console.log(this.state.image1);


        return (
          
            <ScrollView style={{marginTop:23}}>
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
                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FSHOP.png?alt=media&token=841f58a9-4145-4b18-bf77-6a1a0ff523d2" }}
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
        );
    }
}



export default Home1;





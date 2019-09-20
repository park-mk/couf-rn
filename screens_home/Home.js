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
import { Font } from 'expo'




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
          
            <ScrollView>
                <View style={{ flex: 1 }}>


                       

                    <TouchableOpacity 
                         style={{
                           marginBottom:0,
                        }}
                        onPress={()=> this.props.navigation.navigate('TT')}
                    >

                          
                        <Image
                            style={{
                               
                                width: imagewidth,
                                height: imageheight+imageheight/3,
                                borderBottomWidth:3,
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FTRAVEL.png?alt=media&token=7a3c5f20-3f97-464c-995d-86f3c67cd5f0" }}
                        />
           

                    </TouchableOpacity>

                    <TouchableOpacity
                             style={{
                                marginBottom:3,
                             }}
                             onPress={()=> this.props.navigation.navigate('NIGHT')}
                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                                borderBottomWidth:3,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FPARTY%20_%20FESTIVAL.png?alt=media&token=4ef9806b-4049-4337-b66a-d3aa162b6c41" }}
                        />


                    </TouchableOpacity>


                    <TouchableOpacity
                             style={{
                                marginBottom:3,
                             }}
                             onPress={()=> this.props.navigation.navigate('Food')}
                    >
 

                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                                
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FFOOD.png?alt=media&token=9682d54f-1ffb-44f7-8f4e-2fcc46d27804" }}
                        />

                        
                    </TouchableOpacity>

                    <TouchableOpacity
                          style={{
                            marginBottom:3,
                         }}
                         onPress={()=> this.props.navigation.navigate('UNDEVELOP')}
                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FSHOPPING.png?alt=media&token=9c9bc149-4d2e-435e-aab0-5475759a40b5" }}
                        />


                    </TouchableOpacity>


                    <TouchableOpacity
                          style={{
                            marginBottom:3,
                         }}
                         onPress={()=> this.props.navigation.navigate('UNDEVELOP')}
                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FComponent%204.png?alt=media&token=88b0c65f-a9d3-4814-9dd9-977764a9f812" }}
                        />


                    </TouchableOpacity>



                    <TouchableOpacity
                          style={{
                            marginBottom:3,
                         }}
                         onPress={()=>  Linking.openURL("https://www.youtube.com/channel/UCS8Wlr_B7CQkN53Fim20G2Q?view_as=subscriber").catch((err) => console.error('An error occurred', err))}
                    > 
                  
                     
                  
        

                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FSubscribe%20to%20our%20youtube.png?alt=media&token=e2217731-0a8e-4069-b889-35bd2a55ac9d" }}
                        />


                    </TouchableOpacity>



                 


                    <TouchableOpacity
                             style={{
                                marginBottom:3,
                             }}
                             onPress={()=> this.props.navigation.navigate('SuggestionScreen')}
                    >
 

                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                                
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2FSUGGESTIONS.png?alt=media&token=6d761885-768e-4567-9a09-1212426beb1f" }}
                        />

                        
                    </TouchableOpacity>

       



                </View>

            </ScrollView>
        );
    }
}



export default Home1;





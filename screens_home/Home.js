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
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase, { storage } from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import someList from '../components/anylist'
import { Font } from 'expo'




const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}


class Home extends React.Component {
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
                     
                    >

                          
                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-25%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%205.34.08.png?alt=media&token=15267ac3-17ac-47e9-b878-bc094ed9a2cf" }}
                        />
           

                    </TouchableOpacity>

                    <TouchableOpacity


                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-25%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%205.34.08.png?alt=media&token=15267ac3-17ac-47e9-b878-bc094ed9a2cf" }}
                        />


                    </TouchableOpacity>


                    <TouchableOpacity


                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-25%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%205.34.08.png?alt=media&token=15267ac3-17ac-47e9-b878-bc094ed9a2cf" }}
                        />


                    </TouchableOpacity>

                    <TouchableOpacity


                    >


                        <Image
                            style={{
                                width: imagewidth,
                                height: imageheight,
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-25%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%205.34.08.png?alt=media&token=15267ac3-17ac-47e9-b878-bc094ed9a2cf" }}
                        />


                    </TouchableOpacity>





                </View>

            </ScrollView>
        );
    }
}



export default Home;





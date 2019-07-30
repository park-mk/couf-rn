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
import { Font } from 'expo'




const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}


class NIGHT extends React.Component {
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


   






 

   

    render() { 
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height / 5;
        let imagewidth = dimensions.width;
   


        return (
            <View>
            <Header
          leftComponent={  <TouchableOpacity 
           onPress={()=> this.props.navigation.navigate('Area')}
           >
           <Image source={require('../assets/back.png')}
                       
          style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
     /> 
     </TouchableOpacity>} 
         backgroundColor={'#fff'}
        borderBottomColor={'#fff'}
          centerComponent={{ text: 'F/N', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
         
           />
        
            <ScrollView>
                <View style={{ flex: 2 }}>


                       

                    <TouchableOpacity 
                         style={{
                          
                         
                            flex:1
                        }}
                        onPress={()=> this.props.navigation.navigate('FESTIVAL')}
                    >

                     <View  style={{flexDirection:'row'}}>
                        <Image
                            style={{
                                
                                width: 2*imagewidth/5,
                                height: imageheight*2,
                                borderBottomWidth:3,
                                 resizeMode:'cover',
            
                               
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-07-14%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.51.01.png?alt=media&token=5a47c649-aed4-4a05-bbbd-05c5ddcb64c9" }}
                        />
                        <View>
                         <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#56B8FF'}}>FESTIVAL </Text>
                         <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#56B8FF'}}>   AND   </Text>
                         <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#56B8FF'}}>CONCERT </Text>
                         </View>
     
                     </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                             style={{
                             
                              
                             }}
                             onPress={()=> this.props.navigation.navigate('CLUB')}
                    >
                         <View  style={{flexDirection:'row',backgroundColor:"#1f2124"}}>

                        <Image
                            style={{
                                width: 2*imagewidth/5,
                                height: imageheight*2,
                                borderBottomWidth:3,
                                resizeMode:'cover',
                              
                               
                            }}
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-07-14%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.50.40.png?alt=media&token=668c8ce9-6a35-40ce-8f18-94bf0b951590" }}
                        /> 

                          <Text style={{fontFamily:'title-font' ,fontSize:50,marginLeft:15,color:'#56B8FF'}}>NIGHT LIFE </Text>
                    </View>

                    </TouchableOpacity>


                 

                



                </View>
                </ScrollView>

            </View>
        );
    }
}



export default NIGHT;





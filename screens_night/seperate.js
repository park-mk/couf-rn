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
        let imageheight = dimensions.height / 3;
        let imagewidth = dimensions.width;
   


        return (
            <View >
         {/*   <Header
          leftComponent={  <TouchableOpacity 
           onPress={()=> this.props.navigation.navigate('Home')}
           >
           <Image source={require('../assets/back.png')}
                       
          style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
     /> 
     </TouchableOpacity>} 
         backgroundColor={'#fff'}
        borderBottomColor={'#fff'}
          centerComponent={{ text: 'F/N', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
         
          />*/}
           
            <ScrollView
              stickyHeaderIndices={[0]}
            >
                  <TouchableOpacity 
      
      onPress={()=> this.props.navigation.navigate('Home')}
      >
        <View
         style={{flexDirection:'row', backgroundColor:["black", "#ffffff00"]
       
         }}>
      <Image source={require('../assets/back.png')}
                  
     style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
/>   
<Text style={{fontFamily:'title-font' ,fontSize:40,marginLeft:60,marginTop:20,color:'#56B8FF'} }> </Text>
</View>
</TouchableOpacity>
                <View >


                       

                    <TouchableOpacity 
                         style={{
                             marginTop:-80,
                          
                         
                           
                        }}
                        onPress={()=> this.props.navigation.navigate('FESTIVAL')}
                    >

                         <View>
                        <Image
                            style={{
                                
                                width: imagewidth,
                                height:imageheight,
                                borderBottomWidth:3,
                               
            
                               
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Ffes%2Ccon%2Cclub%2Ffestivals.png?alt=media&token=2d709b73-fe29-401f-bf78-427153626838" }}
                        />
                      
                      
     
                     </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                         style={{
                          
                         
                            
                        }}
                        onPress={()=> this.props.navigation.navigate('CONCERT')}
                    >

                         <View>
                        <Image
                            style={{
                                
                                width: imagewidth,
                                height:imageheight,
                                borderBottomWidth:3,
                               
            
                               
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Ffes%2Ccon%2Cclub%2Fconcerts.png?alt=media&token=422952c8-408c-4ef9-8eb2-255019b91cd3" }}
                        />
                      
                      
     
                     </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                         style={{
                          
                         
                           
                        }}
                        onPress={()=> this.props.navigation.navigate('CLUB')}
                    >

                         <View>
                        <Image
                            style={{
                                
                                width: imagewidth,
                                height:imageheight,
                                borderBottomWidth:3,
                               
            
                               
                            }}
                            source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Ffes%2Ccon%2Cclub%2Fclubs.png?alt=media&token=79790273-1dff-4a0d-99e4-d21dc06bf3c8" }}
                        />
                      
                      
     
                     </View>
                    </TouchableOpacity>

                 

                



                </View>
                </ScrollView>

            </View>
        );
    }
}



export default NIGHT;





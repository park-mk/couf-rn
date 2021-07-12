import React from 'react';
import {  Modal,Button, FlatList, Text, View, TouchableOpacity, AsyncStorage,  StatusBar, Image, StyleSheet, ScrollView, Linking, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar, Header, CheckBox  } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import firebase, { storage } from "../firebase";
import expo from '../app.json'
const color = {
  theme: '#06C1AE',
  border: '#e0e0e0',
  background: '#f3f3f3'
}

class OTHERBUSScreen extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
   
   
    };
  }








  render() {

    let dimensions = Dimensions.get("window");
    let imageheight = dimensions.height / 5;
    let imagewidth = dimensions.width;
   
   
    return (

      <View 
         height={dimensions.height}
      style={{backgroundColor:'#ffffff'}}
     >
            <StatusBar backgroundColor="white" barStyle="dark-content" /> 
       
      <ScrollView
      style={{backgroundColor:'#ffffff'}}
      >
        <View>

          <View>




      


          </View >
         
            <View
              style={{
                alignItems: 'center',


              }}
            >
              <Text style={{/*fontFamily:'Bebas Neue Regular' ,*/fontSize: 23 , marginTop:30}}  >OTHER BUS ROUTES</Text>
              <View style={{ borderWidth: 1, marginTop: 5, borderRightWidth: imagewidth / 2 - 30, borderColor: "black" }} />
              <TouchableOpacity
                onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/2116/0911/3274/CP_Casey_-_CP_Humps_Bus_Schedule_28Dec2020.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2FCASEY_HUM.png?alt=media&token=1d48efef-5821-4e8d-96e7-4862b5fe84a4" }}

                />
              </TouchableOpacity>
              <TouchableOpacity
                   onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/8116/0911/2842/CP_Humps_-_CP_Casey_Bus_Schedule_28dec2020.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2Fhum_casey.png?alt=media&token=cdc5844d-c0ac-4cde-88e8-a857195da95a" }}

                />
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/7216/0911/4184/INCHEON_AP_TO_HUMPHREYS__CP_HUMPHREYS_TO_INCHEON_AP.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2Finc_hum.png?alt=media&token=8a74a8b0-93ef-4202-bc7b-c7d117589a1f" }}

                />
              </TouchableOpacity>
              <TouchableOpacity
               
                onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/5115/9652/2171/OSAN_TO_CAMP_HUMPHREYS_as_of_23_Jul_20.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2Fosan-%3Ehum.png?alt=media&token=fff97175-99c3-46c1-97ef-85f070565e2a" }}

                />
              </TouchableOpacity>
            </View >

            <View style={{


              alignItems: 'center',
            }}>
            
              <TouchableOpacity
               onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/1915/9652/2175/Suwon_-_Osan_-_Cp_Humphreys_as_of_23_Jul_20.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2Fsuwon-%3Eosan-%3Ehum.png?alt=media&token=214e6e8c-9484-4457-8d91-53c2f1a7da99" }}

                />
              </TouchableOpacity>
              <TouchableOpacity
                 onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/6615/9652/2152/Cp_Walker_-_Cp_Carroll_-_Cp_Humps_-_Osan_AB_as_of_23_Jul_20.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2Fwalker-carol-hum-osan.png?alt=media&token=76763299-189b-4dc5-b530-9ba8efe6cf44" }}

                />
              </TouchableOpacity>
              <TouchableOpacity
                    onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/9315/9652/2182/Camp_Humphreys_to_Area_I_II_III_IV_as_of_23_Jul_20.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2Fhum_area_123.png?alt=media&token=e4b5a704-601b-4bb4-bfeb-c2e84111ca12" }}

                />
              </TouchableOpacity>
              <TouchableOpacity
                   onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/2615/9652/2164/K-16_-_Cp_Humphreys_as_of_23_Jul_20.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2Fk16hum.png?alt=media&token=47551273-15bb-4df8-8919-b49f5576511a" }}

                />
              </TouchableOpacity>
              <TouchableOpacity
                      onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/3815/9652/2179/19th_HRC_Camp_Humphreys_On_Post_Run__Schedule_A_as_of_23_Jul_20.jpg").catch((err) => console.error('An error occurred', err))}
              >

                <Image
                  style={{

                    width: imagewidth ,
                    height: 52,
                    marginTop: 15,

                    resizeMode: 'contain'
                  }}
                  source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2F19thhrchum.png?alt=media&token=561a5d2f-b9e4-46c5-890f-4c333a9c00f4" }}

                />
              </TouchableOpacity>
            </View>
          </View>



           

          
     




          <View
                 style={{

                    width: imagewidth ,
                    height: 300,
                  

                   
                  }} >
              </View>


    

      </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1, /// PixelRatio.get(),
    // borderColor: color.border,
    backgroundColor: 'white',
  },
  icon: {
    width: 260,
    height: 160,
    borderRadius: 5,

    // alignContent:'center',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  price: {
    marginTop: 30,
    color: color.theme,

  },
  h1: {
    fontSize: 40,
    fontFamily: 'Raley-balck',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222222',

  },
  p: {
    fontSize: 15,
    //marginLeft:30,
    //textAlign: 'center',
    color: 'grey',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: null,
    height: null,
    opacity: 0.5,
    resizeMode: 'cover',
  },
})

export default OTHERBUSScreen;
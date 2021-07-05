
import React, { Component } from "react";
import {
    Button,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    AlertIOS,
    StatusBar,
    ScrollView,
   
    Dimensions,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    Alert,
    AsyncStorage,
    Modal,
   ImageBackground ,


} from 'react-native';
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import firebase, { storage } from "../firebase";
//import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import someList from '../components/anylist'
import *  as Font from 'expo-font'
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';

import expo from '../app.json'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'


const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}


//need push alarm
class Home1 extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            count_travel: 0,
            count_ent: 0,
            count_food: 0,
            count_buy: 0,
            count_youtube: 0,
            count_suggestion: 0,
            checkalarm: 0,
            alarmname: '',
            palarmname: '',
            palarmheight: 0,
            palarmwidth: 0,
            alarmed: false,
            alarmcontent: "In order to continue our hard work, we have encountered financial difficulties considering server fees.  Those who would like to support us, please click yes to donate. Thank you!",
            palarmcontent: "",
            palarmimage: "",
            tutorial: "",
            dialogVisible: false,
            dialogVisible1: false,
            dialogVisible_no: false, 
            checked: false,
            commentVisible: false,
            commentVisib: false,
            commentVisibl: false,
            image: "",
            imagechange: 0,
        };
    }


    registerForPushNotifications = async () => {
        console.log("notification")
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStauts = status;

        if (status != 'granted') {

            const { status } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            const { status2 } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status2 ? status2 : status;


        }


        if (finalStauts != 'granted') {

            return;
        }


        let token = await Notifications.getExpoPushTokenAsync();

        //  alert(token);

        token1 = token.substring(18, 40)

        if (firebase.auth().currentUser != null) {
            firebase.database().ref('usertoken/' + token1).update({
                name: firebase.auth().currentUser.displayName,
                uid: token,
            }, function () {

            });
            console.log(token, "my name");
        }

        if (firebase.auth().currentUser == null) {
            firebase.database().ref('usertoken/' + token1).update({

                uid: token,
            }, function () {

            });
            console.log(token, "no name");
        }

    }
    updateview_t = () => {


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '-' + dd + '-' + yyyy;
      
        var d;
        var s
        var usersRef = firebase.database().ref('visit/travel/'+today+'/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_travel = m;
        }, function (m) {

        }).then((m) => {
            console.log("실행", this.state.count_travel)
            firebase.database().ref('visit/travel/'+today).update({
                count: this.state.count_travel + 1
            }, function () {

            });
        })


        this.props.navigation.navigate('TT');
    }

    updateview_e = () => {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '-' + dd + '-' + yyyy;
      

        var d;
        var s
        var usersRef = firebase.database().ref('visit/ent/'+today+'/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_ent = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/ent/'+today).update({
                count: this.state.count_ent + 1
            }, function () {

            });
        })
        this.props.navigation.navigate('NIGHT')
    }

    updateview_f = () => {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '-' + dd + '-' + yyyy;
      
        var d;
        var s
        var usersRef = firebase.database().ref('visit/food/'+today+'/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_food = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/food/'+today).update({
                count: this.state.count_food + 1
            }, function () {

            });
        })
        this.props.navigation.navigate('Food')
    }

    updateview_b = () => {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '-' + dd + '-' + yyyy;
      
        var d;
        var s
        var usersRef = firebase.database().ref('visit/board/'+today+'/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_buy = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/board/'+today).update({
                count: this.state.count_buy + 1
            }, function () {

            });
        })
        this.props.navigation.navigate('BOARDLIST')

    }
    updateview_y = () => {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '-' + dd + '-' + yyyy;
      

        var d;
        var s
        var usersRef = firebase.database().ref('visit/youtube/'+today+'/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_youtube = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/youtube/'+today).update({
                count: this.state.count_youtube + 1
            }, function () {

            });
        })
        Linking.openURL("https://www.youtube.com/channel/UCS8Wlr_B7CQkN53Fim20G2Q?view_as=subscriber").catch((err) => console.error('An error occurred', err))
    }

    updateview_s = () => {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = mm + '-' + dd + '-' + yyyy;
      

        var d;
        var s
        var usersRef = firebase.database().ref('visit/suggestion/'+today+'/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()


            this.state.count_suggestion = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/suggestion/'+today).update({
                count: this.state.count_suggestion + 1
            }, function () {

            });
        })
        this.props.navigation.navigate('SuggestionScreen')

    }








    async componentDidMount() {

        this.registerForPushNotifications();
        this.check2();
        await Font.loadAsync({

            'Raley-balck': require('../assets/fonts/33676382891.ttf'),
            'Name-font': require('../assets/fonts/Nickainley-Normal_2.ttf'),

        });


    }



    _keyExtractor = (item, index) => item.key;






    render() {

        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height / 5;
        let imagewidth = dimensions.width;
        const userId = '8ba790f3-5acd-4a08-bc6a-97a36c124f29';


        const MyStatusBar = ({ backgroundColor, ...props }) => (
            <View style={[styles.statusBar, { backgroundColor }]}>
                <StatusBar backgroundColor="yellow" barStyle="dark-content" />
            </View>
        );

    


        return (



            <View>
              
             <StatusBar backgroundColor="white" barStyle="dark-content" /> 



                <ScrollView style={{ marginTop: 0 }}>


                    <View style={{ flex: 1, marginTop: 0 }}>




                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() => this.updateview_t()}
                        >


                            <Image
                                style={{

                                    width: imagewidth,
                                    height: imageheight + imageheight / 3,

                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FComponent.png?alt=media&token=db513047-d0ed-41bc-ad74-f3a2ffc49bd9" }}
                            />


                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() => this.updateview_e()}
                        >


                            <Image
                                style={{
                                    width: imagewidth,
                                    height: imageheight,

                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FComponent%205.png?alt=media&token=004700a5-2631-492f-81db-50c4ff1f376d" }}

                            />


                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() => this.updateview_f()}
                        >


                            <Image
                                style={{
                                    width: imagewidth,
                                    height: imageheight,

                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2F74589771_1273785989450128_4231382538565713920_n.png?alt=media&token=48f566e0-5eec-4187-b143-c61ae667a445" }}
                            />


                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() => this.updateview_b()}
                        //   onPress={()=> this.props.navigation.navigate('UNDEVELOP')}
                        >


                            <Image
                                style={{
                                    width: imagewidth,
                                    height: imageheight,
                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Fboard_1.png?alt=media&token=2d49385d-05e2-45f4-a838-8de937c0b570" }}
                            />


                        </TouchableOpacity>






                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() => this.updateview_y()}
                        >





                            <Image
                                style={{
                                    width: imagewidth,
                                    height: imageheight,
                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FYOUTUBE.png?alt=media&token=5cf3d21f-3e2c-495a-8299-29867da8fe72" }}
                            />


                        </TouchableOpacity>






                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() => this.updateview_s()}
                        >


                            <Image
                                style={{
                                    width: imagewidth,
                                    height: imageheight,

                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FSUGGESTIONS.png?alt=media&token=8c5473ad-9368-4599-b853-1d3d06ca53a9" }}
                            />


                        </TouchableOpacity>





                    </View>

                </ScrollView>
            </View>

        );
    }
}



export default Home1;




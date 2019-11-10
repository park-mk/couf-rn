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
    Alert,
    AsyncStorage,
    Modal,


} from 'react-native';
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import firebase, { storage } from "../firebase";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import someList from '../components/anylist'
import *  as Font from 'expo-font'
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';

import expo from '../app.json'


const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}


//need push alarm
class HOMEX extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count_travel: 0,
            count_ent: 0,
            count_food: 0,
            count_buy: 0,
            count_youtube: 0,
            count_suggestion: 0,
            alarmname: '',
            alarmed: false,
            alarmcontent: "In order to continue our hard work, we have encountered financial difficulties considering server fees.  Those who would like to support us, please click yes to donate. Thank you!",
            dialogVisible: false,
            checked: false,
            commentVisible: false,
            image: "",
            imagechange: 0,
        };
    }
    updateview_t = () => {



        var d;
        var s
        var usersRef = firebase.database().ref('visit/travel/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_travel = m;
        }, function (m) {

        }).then((m) => {
            console.log("실행", this.state.count_travel)
            firebase.database().ref('visit/travel').update({
                count: this.state.count_travel + 1
            }, function () {

            });
        })


        this.props.navigation.navigate('TT');
    }

    updateview_e = () => {



        var d;
        var s
        var usersRef = firebase.database().ref('visit/ent/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_ent = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/ent').update({
                count: this.state.count_ent + 1
            }, function () {

            });
        })
        this.props.navigation.navigate('NIGHT')
    }

    updateview_f = () => {


        var d;
        var s
        var usersRef = firebase.database().ref('visit/food/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_food = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/food').update({
                count: this.state.count_food + 1
            }, function () {

            });
        })
        this.props.navigation.navigate('Food')
    }

    updateview_b = () => {


        var d;
        var s
        var usersRef = firebase.database().ref('visit/buy/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_buy = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/buy').update({
                count: this.state.count_buy + 1
            }, function () {

            });
        })
        this.props.navigation.navigate('UNDEVELOP')

    }
    updateview_y = () => {



        var d;
        var s
        var usersRef = firebase.database().ref('visit/youtube/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_youtube = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/youtube').update({
                count: this.state.count_youtube + 1
            }, function () {

            });
        })
        Linking.openURL("https://www.youtube.com/channel/UCS8Wlr_B7CQkN53Fim20G2Q?view_as=subscriber").catch((err) => console.error('An error occurred', err))
    }

    updateview_s = () => {



        var d;
        var s
        var usersRef = firebase.database().ref('visit/suggestion/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_suggestion = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/suggestion').update({
                count: this.state.count_suggestion + 1
            }, function () {

            });
        })
        this.props.navigation.navigate('SuggestionScreen')

    }








  
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




                <ScrollView style={{ marginTop: 0 }}>


                    <View style={{ flex: 1, marginTop: 0 }}>




                     





                    </View>

                </ScrollView>
            </View>

        );
    }
}



export default HOMEX;





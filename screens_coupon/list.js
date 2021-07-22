import React from 'react';
import {
    View,
    FlatList,
    Image,
    Button,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TextInput,
    StyleSheet,
    Modal,
    AsyncStorage,
    Linking,
} from 'react-native';
import { List, ListItem, SearchBar, Header, CheckBox } from "react-native-elements";
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import firebase from "../firebase";
import call from 'react-native-phone-call';
import ImageSlider from 'react-native-image-slider';
import Icon from "../screens_suggestion/suggestionScreen";
import styled from "styled-components";
import ProgressLoader from 'rn-progress-loader';
import ImageBrowser from '../components/multiple-imagepicker/src/ImageBrowser';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import CommentForm from '../components/commentForm'





//load the firebase.database in order to simplfy
database = firebase.database();

//tip of liFE
class COUPONLIST extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
    constructor(props) {
        super(props);
        this.state = {

            loading: false,
            datasource: [],
            datasource2: [],
            banned: false,
            nickname: '',
            pause: false,
            error: null,
            refreshing: false,
            search: '',
            Search: '',
            images: '',
            board_reason: '',
            check_mine: false,
            check_camp: false,
            toggleWriteForm: false,
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [],
            comment: '',
            show: ' ',
            title: '',
            loadVisible: false,
            commentVisible: false,
            dialogVisible: false,
            dialogVisible1: false,
            rule_showed: false,
            humphrey: true,
            casey: false,
            osna: false,
            current_camp: "Humphreys",
        };
    }


    componentDidMount() {

        this.makeRemoteRequest();
    }
    sortFilterFunction = () => {
        console.log(this.state.current_camp);
        this.setState({
            datasource: []                                 // datasource of list
        })
        var usersRef = firebase.database().ref('COUPONS/' + this.state.current_camp);
        usersRef.once('value', (snapshot) => {                     //    tips database resort

            var m = snapshot.val()
            var keys = Object.values(m);
            this.setState({
                datasource: keys                                   // datasource of list
            })
        }).then((m) => {



            const newData = this.state.datasource.sort(function (a, b) {
                return a.date - b.date;
            });
            const newData2 = this.state.datasource.sort(function (a, b) {
                return a.visit - b.visit;
            });

            this.setState({ datasource: newData.reverse().slice(-4) });
            this.setState({ datasource2: newData2.reverse().slice(-4) });
        })



    }



    makeRemoteRequest = () => {
        const { navigation } = this.props;
        const from = navigation.getParam('from', 'NO-ID');

        this.sortFilterFunction();
        // var usersRef = firebase.database().ref('COUPONS/Osan');


        // usersRef.on('value', (snapshot) => {


        //     var m = snapshot.val()
        //     var keys = Object.values(m);

        //     this.setState({
        //         datasource: keys
        //     })
        // });

    }


    renderItem = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('COUPON_EX', {
                    location: item.location,
                    description: item.description,
                    from: "COUPONLIST",
                    image: item.link
                })



                }
            >
                <View style={{ flex: 1, marginRight: 20, marginLeft: 20, flexDirection: 'row', marginBottom: 6, marginTop: 6, borderColor: 'black' }} >

                    <Image
                        style={{ width: 150, height: 150, resizeMode: 'cover' }}
                        resizeMode={'contain'}
                        source={{ uri: item.link }}
                    />
                    <View  >

                    </View>

                </View>
            </TouchableOpacity>




        )



    }

    click_humphrey = () => {
        this.setState({
            humphrey: true,
            osan: false,
            casey: false,
            current_camp: "Humphreys"
        })
        // this.sortFilterFunction();
        var usersRef = firebase.database().ref('COUPONS/Humphreys');
        usersRef.once('value', (snapshot) => {                     //    tips database resort

            var m = snapshot.val()
            var keys = Object.values(m);
            this.setState({
                datasource: keys                                   // datasource of list
            })
        }).then((m) => {



            const newData = this.state.datasource.sort(function (a, b) {
                return a.date - b.date;
            });
            const newData2 = this.state.datasource.sort(function (a, b) {
                return a.visit - b.visit;
            });

            this.setState({ datasource: newData.reverse().slice(-4) });
            this.setState({ datasource2: newData2.reverse().slice(-4) });
        })

    }

    click_osan = () => {
        this.setState({
            humphrey: false,
            osan: true,
            casey: false,
            current_camp: "Osan"
        })
        // this.sortFilterFunction();
        var usersRef = firebase.database().ref('COUPONS/Osan');
        usersRef.once('value', (snapshot) => {                     //    tips database resort

            var m = snapshot.val()
            var keys = Object.values(m);
            this.setState({
                datasource: keys                                   // datasource of list
            })
        }).then((m) => {



            const newData = this.state.datasource.sort(function (a, b) {
                return a.date - b.date;
            });
            const newData2 = this.state.datasource.sort(function (a, b) {
                return a.visit - b.visit;
            });

            this.setState({ datasource: newData.reverse().slice(-4) });
            this.setState({ datasource2: newData2.reverse().slice(-4) });
        })

    }

    click_casey = () => {
        this.setState({
            humphrey: false,
            osan: false,
            casey: true,
            current_camp: "Casey"
        })
        var usersRef = firebase.database().ref('COUPONS/Casey');
        usersRef.once('value', (snapshot) => {                     //    tips database resort

            var m = snapshot.val()
            var keys = Object.values(m);
            this.setState({
                datasource: keys                                   // datasource of list
            })
        }).then((m) => {



            const newData = this.state.datasource.sort(function (a, b) {
                return a.date - b.date;
            });
            const newData2 = this.state.datasource.sort(function (a, b) {
                return a.visit - b.visit;
            });

            this.setState({ datasource: newData.reverse().slice(-4) });
            this.setState({ datasource2: newData2.reverse().slice(-4) });
        })

        // this.sortFilterFunction();
    }
    navigate_to_coupon_new = () => {
        if (this.state.humphrey) {
            this.props.navigation.navigate('COUPON', {
                name: "Humphreys",
                from: "new"

            })
        }
        if (this.state.osan) {
            this.props.navigation.navigate('COUPON', {
                name: "OSAN",
                from: "new"
            })
        }
        if (this.state.casey) {
            this.props.navigation.navigate('COUPON', {
                name: "Casey",
                from: "new"
            })
        }


    }
    navigate_to_coupon_rank = () => {
        if (this.state.humphrey) {
            this.props.navigation.navigate('COUPON', {
                name: "Humphreys",
                from: "rank"

            })
        }
        if (this.state.osan) {
            this.props.navigation.navigate('COUPON', {
                name: "OSAN",
                from: "rank"
            })
        }
        if (this.state.casey) {
            this.props.navigation.navigate('COUPON', {
                name: "Casey",
                from: "rank"
            })
        }


    }

    // start to draw whole screen
    render() {
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height;
        let imagewidth = dimensions.width;



        return (
            // flat list data= datasoucr= firebase.tips        details please look upper

            <View
                backgroundColor={'#fff'}
            >

                <ScrollView>
                    <View horizontal={true}>


                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 30, marginLeft: 13, marginTop: 80 }}>Restaurant Vouchers</Text>
                        <View
                          style={{ alignItems:'center'}}
                        >
                            <View
                                style={{ backgroundColor: 'white', height: 60, marginTop: 13, marginLeft: 15, flexDirection: 'row' }}
                            >


                                {this.state.humphrey ? (
                                    <TouchableOpacity
                                        onPress={() => this.click_humphrey()}>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, marginTop: 10 }}> Humphreys</Text>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, marginTop: -5 }}>_____________</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => this.click_humphrey()}>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, color: 'grey', marginTop: 10 }}> Humphreys</Text>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, color: 'grey', marginTop: -5 }}>_____________</Text>
                                    </TouchableOpacity>)
                                }

                                {this.state.osan ? (
                                    <TouchableOpacity
                                        onPress={() => this.click_osan()}>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, marginTop: 10 }}>     OSAN     </Text>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, marginTop: -5 }}>_____________</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => this.click_osan()}>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, color: 'grey', marginTop: 10 }}>     OSAN     </Text>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, color: 'grey', marginTop: -5 }}>_____________</Text>
                                    </TouchableOpacity>)
                                }

                                {this.state.casey ? (
                                    <TouchableOpacity
                                        onPress={() => this.click_casey()}>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, marginTop: 10 }}>     Casey    </Text>
                                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, marginTop: -5 }}>_____________</Text>

                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => this.click_casey()}>
                                        <Text style={{ fontFamily: 'Roboto Bold', color: 'grey', fontSize: 17, marginTop: 10 }}>     Casey    </Text>
                                        <Text style={{ fontFamily: 'Roboto Bold', color: 'grey', fontSize: 17, marginTop: -5 }}>_____________</Text>

                                    </TouchableOpacity>)
                                }


                            </View>




                        </View>

                    </View>
                    <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, marginTop: 10 }}>    What's   HOT   </Text>
                    <View style={{ alignItems: 'center' }}>
                        <FlatList
                            data={this.state.datasource}
                            numColumns={2}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.uid}
                            ListEmptyComponent={<Text style={{ fontFamily: 'Bayon', fontSize: 20, marginTop: 10 }}>{this.state.board_reason}</Text>}

                        />
                        <TouchableOpacity
                            onPress={() => this.navigate_to_coupon_rank()}>

                            <Image
                                style={{ marginTop: 20, width: 320, height: 50, resizeMode: 'cover' }}
                                resizeMode={'contain'}
                                source={require('../assets/see_all.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: 'Roboto Bold', fontSize: 17, marginTop: 14 }}>    What's   NEW   </Text>
                    <View style={{ alignItems: 'center' }}>
                        <FlatList
                            data={this.state.datasource2}
                            numColumns={2}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.uid}
                            ListEmptyComponent={<Text style={{ fontFamily: 'Bayon', fontSize: 20, marginTop: 10 }}>{this.state.board_reason}</Text>}

                        />
                        <TouchableOpacity
                            onPress={() => this.navigate_to_coupon_rank()}>

                            <Image
                                style={{ marginTop: 20, width: 320, height: 50, resizeMode: 'cover' }}
                                resizeMode={'contain'}
                                source={require('../assets/see_all.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* <FlatList
                        data={this.state.datasource}
                      
                        renderItem={this.renderItem}
                        keyExtractor={item => item.uid}
                        ListEmptyComponent={<Text style={{ fontFamily: 'Bayon', fontSize: 20, marginTop: 10 }}>{this.state.board_reason}</Text>}
              
                    /> */}

                    <View
                        style={{ height: 100 }}
                    >

                    </View>


                    <View
                        style={{ height: 100 }}
                    >
                    </View>
                </ScrollView>


            </View >

        );
    }
}

const WrapTextInput = styled.View`
  border:3px solid grey;
  margin-bottom: 5px;
  padding:10px;
  display:flex;
`

const Buttons = styled.View`
  display:flex;
  flex-direction: row;
`
const styles = StyleSheet.create(theme => ({
    floatingActionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        borderRadius: 10,
    }
}));


export default COUPONLIST;

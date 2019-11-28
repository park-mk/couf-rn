import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Dimensions, FlatList, Alert, } from 'react-native';
import firebase from "../firebase";
import { FormLabel, FormInput } from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, withNavigation } from 'react-navigation';
import { Container, Content, Header, Form, Input, Item, Label, Button } from 'native-base'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import CHOSEarea from '../components/areachoose'
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import ProgressLoader from 'rn-progress-loader';

const wrapper = {
    padding: '5%'
};
const styles = StyleSheet.create({
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
    wrapper: {
        display: 'flex',
        paddingLeft: wrapper.padding,
        paddingRight: wrapper.padding,
    },
    loginWrapper: {
        display: 'flex',
        justifyContent: 'center',
        height: '30%',
    },
    loginLogo: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputBox: {
        borderRadius: 30,
        borderBottomWidth: 0,
    }, icon: {
        width: 141,
        height: 200,

        marginRight: 10,
        borderWidth: 2, borderColor: '#67DBFF', borderRadius: 5
    },
});

const ProfileTopWrap = styled.View`
    display:flex;
    flex-direction: row;  
    padding:0 20px;
`;
const ProfileTopImage = styled.TouchableHighlight`
    width:75px;
    height:75px;
    border-radius:75px;
`;
const ProfileImage = styled.Image`
    width:75px;
    height:75px;
    border-radius: 37.5;
`;

const ProfileTopRight = styled.View`
    display:flex;
    flex-direction: column;  
    margin-left:20px;
`;




class Profile extends React.Component {


    constructor(props) {
        super(props)


        this.state = ({
            email: '',
            password: '',
            data: [],
            area: "MY AREA",
            currentarea: 0,
            currentarea1: 0,
            loadVisible: false,
            datasource: [],
            datasource1: [],
            datasource2: [],
            origin: '',

        })
    }
    componentWillMount() {




        this.makeRemoteRequest();

    }
    componentDidMount() {


        // Toggle the state every second
        setInterval(
            () => this.setState({ currentarea1: this.state.currentarea }),

            1000
        );





        this.makeRemoteRequest();

    }

    makeRemoteRequest = () => {

        this.renderarea();
        this.SortTravel();
        this.SortRes();
        this.SortBUY();
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        var usersRef0 = firebase.database().ref('userinfo/' + code + '/user_buysell');
        usersRef0.on('value', (snapshot) => {
            var m = snapshot.val()
            this.setState({ origin: m })
            //  console.log(this.state.origin);
        });


    };
    choosearea = () => {


        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

        firebase.database().ref('userinfo/' + code).update({

            area: null,
        }, function () {

        });


    };
    renderItem = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => {


                    if (item.cate != "more") {


                        this.props.navigation.navigate('TTi', {
                            name: item.name,
                            description: item.description,
                            location: item.location,
                            topimage: item.topimage,
                            cate: item.cate,
                            upvote: this.state.upvote,//item.upvote,
                            imagelist: item.images,
                            from: "profile",
                            //  imagelist:item.images,
                            //tips:item.tips,
                        });
                    }
                    if (item.cate == "more") {
                        this.props.navigation.navigate('TTlist', {

                            name: item.name,
                        });


                    }

                }

                }
            >
                <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row', marginBottom: 6, borderColor: 'black' }} >
                    <Image style={styles.icon}
                        source={{ uri: item.topimage }}

                    />
                    <View  >
                        { //<Text style={styles.h1}>{item.name}</Text>  
                            // <Text style={styles.p} >{item.devision}</Text>   
                            //<Text style={styles.price} >{item.location}</Text> 
                        }

                    </View>

                </View>
            </TouchableOpacity>




        )



    }
    renderItem1 = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => {


                    this.props.navigation.navigate('WTEA1', {
                        name: item.name,
                        description: item.description,
                        location: item.location,
                        loca: item.loca,
                        topimage: item.topimage,
                        imagelist: item.images,
                        disname: item.disname,
                        cate: item.cate,
                        from: "profile"
                        // cate:item.cate,
                        // upvote:item.upvote,

                        //  imagelist:item.images,
                        //tips:item.tips,
                    });



                }

                }
            >
                <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row', marginBottom: 6, borderColor: 'black' }} >
                    <Image style={{
                        height: 141, width: 141, resizeMode: 'cover',
                        marginRight: 10,
                        borderWidth: 2, borderColor: '#67DBFF', borderRadius: 5
                    }}
                        source={{ uri: item.topimage }}

                    />
                    <View  >
                        { //<Text style={styles.h1}>{item.name}</Text>  
                            // <Text style={styles.p} >{item.devision}</Text>   
                            //<Text style={styles.price} >{item.location}</Text> 
                        }

                    </View>

                </View>
            </TouchableOpacity>




        )



    }

    renderItem2 = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        'Delete Popup',
                        'Are you sure you want to delete this?',
                        [
                            {
                                text: 'Delete', onPress: () => {
                                    let ref = firebase.storage().ref();
                                    let deleteData = firebase.database().ref().child('comment/buyNsell/' + item.uid);
                                    var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
                                    var change1 = "," + item.uid;
                                    var change2 = this.state.origin.replace(change1, '')
                                    var myArray=this.state.datasource2
          
                                    for( var i = 0; i < myArray.length; i++){ 
                                        if ( myArray[i].uid === itemuid) {
                                          myArray.splice(i, 1); 
                                        }
                                     }
                                    this.setState({ datasource2: myArray })
                                    firebase.database().ref('userinfo/' + code).update({

                                        user_buysell: change2,
                                    }, function () {

                                    });


                                    Promise.all([
                                        item.images.map((item) => ref.child("buyNsell/" + item).delete()),
                                        deleteData.set(null)
                                    ]).then(function (values) {
                                      

                                        console.log(values);

                                    }).catch((error) => {
                                        console.log(error);
                                    });

                                    
                                   
                                   
                                }
                            },
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false },
                    );

                }

                }
            >
                <View style={{ flex: 1, marginLeft: 10 }} >

                    <Image style={{
                        height: 141, width: 141, resizeMode: 'cover',
                        marginRight: 10,
                        borderWidth: 2, borderColor: '#67DBFF', borderRadius: 5
                    }}
                        source={{ uri: item.imageUrl[0] }}

                    />
                    <View  >
                        { //<Text style={styles.h1}>{item.name}</Text>  
                            // <Text style={styles.p} >{item.devision}</Text>   
                            //<Text style={styles.price} >{item.location}</Text> 
                        }

                    </View>

                </View>
            </TouchableOpacity>




        )



    }

    loading() {
        /* TODO : rendering 을 계속하는 함수 나중에 따로 뺴는게 좋을듯 */
        // console.log(this.state.currentarea,"current area")
        var m;
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

        var usersRef = firebase.database().ref('userinfo/' + code + '/area');


        usersRef.on('value', (snapshot) => {


            m = snapshot.val()



            this.state.currentarea = m;

            //  this.setState({ currentarea: m});
            // console.log("here,,m",m);
        })
    }
    renderarea() {

        //  await loading();
        //console.log("this.state.currentarea",this.state.currentarea);
        if (this.state.currentarea1 === 0) {

            return;
        }
        if (this.state.currentarea1 == null) {

            return <CHOSEarea />
        }
        if (this.state.currentarea1 === 1) {


            return <Image style={{ resizeMode: 'cover', marginLeft: 18, marginTop: 10, padding: 0.5, width: 120, height: 39, borderRadius: 10 }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%201.png?alt=media&token=6e60cd73-5c4c-46e1-904d-c65c4050cf07" }} />

        }
        if (this.state.currentarea1 === 2) {

            return <Image style={{ resizeMode: 'cover', marginLeft: 18, marginTop: 10, padding: 0.5, width: 120, height: 39, borderRadius: 10 }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%202.png?alt=media&token=6674c090-df82-40b9-8585-378476ec5113" }} />

        }
        if (this.state.currentarea1 === 3)
            return <Image style={{ resizeMode: 'cover', marginLeft: 18, marginTop: 10, padding: 0.5, width: 120, height: 39, borderRadius: 10 }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%203.png?alt=media&token=9eb041e2-3747-4cf8-8bfd-7e1ea120d91c" }} />

        if (this.state.currentarea1 === 4)
            return <Image style={{ resizeMode: 'cover', marginLeft: 18, marginTop: 10, padding: 0.5, width: 120, height: 39, borderRadius: 10 }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FMore%20-%20Icons%2Farea%204.png?alt=media&token=f7502cd4-96a3-4c3f-8a7e-41f978c1cc0d" }} />




    }

    SortRes() {
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        var usersRef = firebase.database().ref('userinfo/' + code + '/user_like_history_areae');
        var lists = [];
        var final_lists = [];
        var num_of_like;
        var data_res = [];
        var str;
        usersRef.once('value', (snapshot) => {
            var m = snapshot.val()
            str = m;


            str = " " + str;

            var words = str.split(',');
            num_of_like = str.split(",").length;

            for (i = 0; i < str.split(",").length; i++) {
                var word = words[i].split(':');

                lists.push(word[0]);
                var usersRef1 = firebase.database().ref(word[1] + '/' + word[0]);
                usersRef1.once('value', (snapshot) => {


                    var m = snapshot.val()


                    if (m != null)
                        data_res.push(m);



                    this.setState({ datasource1: data_res })

                })
                //   var result= data_travel.reduce((o, m) => m.concat(o), []);

                //  this.setState({ datasource: data_travel })
            }






        });










    }
    SortTravel() {
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        var usersRef11 = firebase.database().ref('userinfo/' + code + '/user_like_history');
        var lists = [];
        var final_lists = [];
        var num_of_like;
        var data_travel = [];
        var str;
        usersRef11.once('value', (snapshot) => {
            var m = snapshot.val()
            str = m;


            str = " " + str;

            var words = str.split(',');
            num_of_like = str.split(",").length;
            for (i = 0; i < str.split(",").length; i++) {
                var word = words[i].split(':');
                //     console.log(word[0],"word0",word[1]);
                lists.push(word[0]);
                var usersRef12 = firebase.database().ref('travel/' + word[1] + '/' + word[0]);
                usersRef12.once('value', (snapshot) => {


                    var m = snapshot.val()


                    if (m != null)
                        data_travel.push(m);

                    //  console.log(data_travel,"date1");

                    this.setState({ datasource: data_travel })

                })
                //   var result= data_travel.reduce((o, m) => m.concat(o), []);

                //  this.setState({ datasource: data_travel })
            }





        });










    }
    deletebuy(){

        var beforedelte=this.state.datasource2;
        console.log("before delte",this.state.datasource2);
    }
    SortBUY() {
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        var usersRef3 = firebase.database().ref('userinfo/' + code + '/user_buysell');
        var lists = [];
        var final_lists = [];
        var num_of_like_;
        var data_res = [];
        var str;
        usersRef3.once('value', (snapshot) => {
            var m = snapshot.val();
            str = m;
            str = " " + str;



            var words = str.split(',');
            num_of_like_ = str.split(",").length;

            for (i = 0; i < str.split(",").length; i++) {
                var word = words[i];

                if (word != null) {
                    var usersRef4 = firebase.database().ref('comment/buyNsell/' + word);
                    usersRef4.once('value', (snapshot) => {


                        var m = snapshot.val()


                        if (m != null)
                            data_res.push(m);



                        this.setState({ datasource2: data_res })

                    })
                }
                //   var result= data_travel.reduce((o, m) => m.concat(o), []);

                //  this.setState({ datasource: data_travel })
            }






        });










    }

    _uploadImage = async (uri, imageName) => {
        if (!uri) return true;
        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child("user/" + firebase.auth().currentUser.uid);
        return ref.put(blob);
    };

    changeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });



        if (!result.cancelled) {
            this.setState({ loadVisible: true });
            this._uploadImage(result.uri).then((response) => {
                return firebase.storage().ref('user').child(firebase.auth().currentUser.uid).getDownloadURL();
            }).then((response) => {
                console.log('download url', response);
                return firebase.auth().currentUser.updateProfile({
                    photoURL: response
                });
            }).finally(() => {
                this.setState({ loadVisible: false });
            });
        }
    };

    render() {
        return (
            <ScrollView>
                <View style={{ marginTop: 60 }} >
                    <ProgressLoader
                        visible={this.state.loadVisible}
                        isModal={true} isHUD={true}
                        color={"#000000"}
                        barHeight={80}
                    />

                    <ProfileTopWrap>
                        <ProfileTopImage onPress={() => { this.changeImage() }}>
                            <ProfileImage source={{ uri: firebase.auth().currentUser.photoURL }} />
                        </ProfileTopImage>
                        <ProfileTopRight>
                            <Text style={{ color: '#67DBFF', fontFamily: 'title-font', fontSize: 28 }}>
                                {firebase.auth().currentUser.displayName}
                            </Text>
                            <Text style={{ color: 'black', fontFamily: 'content-font', fontSize: 18 }}>
                                {firebase.auth().currentUser.email}
                            </Text>

                        </ProfileTopRight>
                    </ProfileTopWrap>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'title-font', marginTop: 60, fontSize: 30, marginLeft: 18 }}> {this.state.area}</Text>
                        <TouchableOpacity
                            onPress={() => this.choosearea()
                            }
                        >
                            <Text style={{ fontFamily: 'title-font', color: 'grey', marginTop: 70, fontSize: 20, marginLeft: 80 }}> change..</Text>
                        </TouchableOpacity>
                    </View>
                    {this.loading()}
                    {this.renderarea()}
                    <View style={{ flexDirection: 'row', marginTop: 60, marginBottom: 10 }} >




                        <TouchableOpacity




                        >
                            <Image
                                style={{
                                    width: 30, flex: 1, marginLeft: 18,
                                    height: 30, alignContent: 'center',
                                }}
                                resizeMode={'contain'}
                                source={require('../assets/black_.png')}
                            />
                        </TouchableOpacity>




                        <Text style={{ fontFamily: 'title-font', fontSize: 26 }}> liked places </Text>

                        <TouchableOpacity


                            onPress={() =>

                                this.SortTravel()
                            }

                        >
                            <Image
                                style={{
                                    width: 30, flex: 1, marginLeft: 18,
                                    height: 30, alignContent: 'center',
                                }}
                                resizeMode={'contain'}
                                source={require('../assets/refresh.png')}
                            />
                        </TouchableOpacity>

                    </View>


                    <View style={{ marginLeft: 0 }}>
                        <FlatList

                            data={this.state.datasource}

                            renderItem={this.renderItem}

                            horizontal={true}
                            keyExtractor={item => item.name}
                            initialNumToRender={4}
                            maxToRenderPerBatch={4}
                            // ListHeaderComponent={this.renderHeader}
                            //   ListFooterComponent={this.renderFooter}
                            onRefresh={this.handleRefresh}
                            refreshing={this.state.refreshing}




                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 10 }} >




                        <TouchableOpacity




                        >
                            <Image
                                style={{
                                    width: 30, flex: 1, marginLeft: 18,
                                    height: 30, alignContent: 'center',
                                }}
                                resizeMode={'contain'}
                                source={require('../assets/black_.png')}
                            />
                        </TouchableOpacity>




                        <Text style={{ fontFamily: 'title-font', fontSize: 26 }}> liked restaurants </Text>



                        <TouchableOpacity


                            onPress={() =>

                                this.SortRes()}

                        >
                            <Image
                                style={{
                                    width: 30, flex: 1, marginLeft: 18,
                                    height: 30, alignContent: 'center',
                                }}
                                resizeMode={'contain'}
                                source={require('../assets/refresh.png')}
                            />
                        </TouchableOpacity>

                    </View>


                    <View style={{ marginLeft: 0 }}>
                        <FlatList

                            data={this.state.datasource1}

                            renderItem={this.renderItem1}

                            horizontal={true}
                            keyExtractor={item => item.name}
                            initialNumToRender={4}
                            maxToRenderPerBatch={4}
                            // ListHeaderComponent={this.renderHeader}
                            //   ListFooterComponent={this.renderFooter}
                            onRefresh={this.handleRefresh}
                            refreshing={this.state.refreshing}




                        />
                    </View>
                    <View

                        style={{ marginTop: 20, flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'title-font', fontSize: 26 }}>     MY BUY AND SELL </Text>
                        <Text style={{ fontFamily: 'title-font', fontSize: 15, marginTop: 11 }}>    click to delete</Text>
                        <TouchableOpacity


                            onPress={() =>

                                this.SortBUY()}

                        >
                            
            
                        
                        </TouchableOpacity>


                    </View>
                    <FlatList

                        data={this.state.datasource2}

                        renderItem={this.renderItem2}

                        horizontal={true}
                        keyExtractor={item => item.uid}
                        initialNumToRender={4}
                        maxToRenderPerBatch={4}
                        // ListHeaderComponent={this.renderHeader}
                        //   ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}




                    />
                </View>

            </ScrollView>

        );
    }
}
export default withNavigation(Profile);


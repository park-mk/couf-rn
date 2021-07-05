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
class BOARDLIST extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            datasource: [],
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
            rule_showed:false,
        };
    }

    // this function  refresh everytime information is changed
    componentDidMount() {
        console.log(this.state.search);
        this.getValueFunction();
        this.makeRemoteRequest();
    }
    // real refresh function
    makeRemoteRequest = () => {
        if (firebase.auth().currentUser != null) {
            var usersRef = firebase.database().ref('zpushalarm/suspension');
            usersRef.on('value', (snapshot) => {
                var m = snapshot.val()


                var lists = Object.values(m);
                console.log(lists);
                var user_uid = firebase.auth().currentUser.uid;
                console.log(lists.includes(user_uid), user_uid, "aaa");
                if (lists.includes(user_uid)) {
                    this.setState({ banned: true })
                }



            });

        }
        firebase.database().ref('comment/board').on('value', function (snapshot) {
            let returnVal = snapshot.val() || {};
            this.setState({ datasource: Object.values(returnVal).reverse() });

        }.bind(this), function (error) {
            console.error(error);
        });
        firebase.database().ref('zpushalarm').on('value', function (snapshot) {
            let returnVal = snapshot.val() || {};
            if (returnVal['board_opened'] == false) {
                this.setState({ datasource: '' });
                this.setState({ board_reason: returnVal['board_reason'] })
            }
        }.bind(this), function (error) {
            console.error(error);
        });
        if (firebase.auth().currentUser != null) {
            firebase.database().ref('userinfo/' + firebase.auth().currentUser.uid).on('value', function (snapshot) {
                let returnVal = snapshot.val(); //|| {};

                if (returnVal != null) {
                    if (returnVal["nickname"] != null) {
                        this.setState({ nickname: returnVal["nickname"] });
                    }
                    else {
                        this.setState({ nickname: "anonymous" });
                    }
                }
                else {
                    this.setState({ nickname: "anonymous" });
                }

            }.bind(this), function (error) {
                console.error(error);
            });

        }
        /*
                this.setState({ loading: true });                    //because while this function is working = loading
                var usersRef =firebase.database().ref('A1WTE');       //   bring the database tips
                usersRef.on('value', (snapshot) => {                     //    tips database resort
                    var m=snapshot.val()
                    var keys= Object.values(m);
                    this.setState({
                        datasource:  keys                                   // datasource of list
                    })
                });
        */


    };

    _getImageDownLoadUrl = (image, index) => {
        return new Promise((resolve, reject) => {
            firebase.storage().ref('buyNsell').child(image).getDownloadURL().then(url => {
                resolve(url);
            }).catch((error) => {
                reject(error);
            });
        });

    };

    setImageData = (data) => {
        return Promise.all(
            data.images.map((item, i) => this._getImageDownLoadUrl(item, i))
        ).then(function (values) {
            return values;

        }).catch((error) => {
            console.error(error);
        });

    };

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            this.setState({
                imageBrowserOpen: false,
                photos
            })
        }).catch((e) => console.log(e))
    };

    uploadMultiImage = (data) => {
        return Promise.all(
            this.state.photos.map((item, i) => this.uploadImage(item, data, i))
        ).then(function (values) {
            console.log('upload Multi Image', values);

        }).catch((error) => {
            console.log(error);
        });
    };
    showDescription = (comment) => {
        if (comment.length > 20) {
            this.setState(
                {
                    show: comment.substring(0, 30) + "......"
                });
        }
        else
            this.setState(
                {
                    show: comment
                });

        return this.state.show;
    };

    uploadImage = async (item, data, i) => {
        if (!item || !item.uri) return true;
        const response = await fetch(item.uri);
        const blob = await response.blob();

        let imageName = data.uid + '-' + i;
        data.images.push(imageName);
        return firebase.storage().ref().child("buyNsell/" + imageName).put(blob);
    };


    clearData = () => {
        this.setState({
            comment: '',
            title: '',
            photos: [],
        });
        this.toggleWriteForm();
    };

    //  up scroll to refresh
    handleRefresh = () => {
        this.setState(
            {
                refreshing: false
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };
    // if approached end also refresh
    handleLoadMore = () => {

        this.setState(
            {
                loading: false
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };


    //   header not used yet but im gonna use it as searching
    onChangeText1 = (text) => {
        this.setState({
            nickname: text,
        });

    };
    NavigateToWrite = () => {

        if (firebase.auth().currentUser != null) {
            //   this.setState({dialogVisible:true});
            this.props.navigation.navigate('WRITE_B');
        }
        if (firebase.auth().currentUser == null) {
            alert("please login")
        }

    }
    replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    regist = () => {

        console.log('regist')
        if (firebase.auth().currentUser != null) {
            var code = firebase.auth().currentUser.uid
            code = this.replaceAll(code, ".", "-");
            code = this.replaceAll(code, "#", "-");
            code = this.replaceAll(code, "$", "-");
            code = this.replaceAll(code, "[", "-");
            code = this.replaceAll(code, "]", "-");
            firebase.database().ref('userinfo/' + code).update({
                nickname: this.state.nickname,

            }, function () {
                alert("YOUR NICKNAME IS SET")

            });
        }
        else alert("please login first");
        this.onClickComment();
        console.log("end");
    };
    updateview_item = (item) => {

        this.props.navigation.navigate('ITEM_B', {
            title: item.title,
            content: item.content,
            price: item.price,
            location: item.location,
            contact: item.contact,
            user: item.user,
            uid: item.uid,
            nickname: item.nickname,
            useremail: item.useremail,
            displayName: item.displayName,
            photoURL: item.photoURL,
            timestamp: item.timestamp,
            images: item.images,
            imageUrl: item.imageUrl,
            data: item,

        });

        let count_time = 0;
        var usersRef = firebase.database().ref('comment/board/' + item.uid + '/visit');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('comment/board/' + item.uid).update({
                visit: count_time + 1
            }, function () {

            });
        })





    }

    renderItem = ({ item }) => {
        let dimensions = Dimensions.get("window");
        let imageheight = 5 * dimensions.height / 10;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth = dimensions.width;

        let comments_count = 0;
        if (typeof (item.comments) == 'object') {
            comments_count = Object.keys(item.comments).length
        }
        if (item.imageUrl == null) {
            return (
                <TouchableOpacity style={{ borderTopWidth: 1, borderColor: 'grey', borderRadius: 5 }}
                    onPress={() => {
                        this.updateview_item(item);
                    }}




                >

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'title-font', fontSize: 30, marginLeft: 10, marginTop: 10 }}>
                            TITLE:
                    </Text>
                        <Text style={{ fontFamily: 'content-font', fontSize: 20, marginTop: 10 }}>
                            {item.title}
                        </Text>
                    </View>
                    <Text style={{ fontFamily: 'content-font', fontSize: 15, marginLeft: 20 }}>
                        {item.content.substring(0, 30) + "....."}
                    </Text>
                    { item.official &&
                        <View
                            style={{ flexDirection: 'row' }}
                        >

                            <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/tick.png')} />
                            <Text style={{ fontFamily: 'content-font', color: '#67dbff', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                                {"POST BY " + item.nickname}
                            </Text>
                        </View>
                        ||
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                            {"POST BY " + item.nickname}
                        </Text>
                    }

                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>

                        <Image style={{ height: 20, width: 20 }} source={require('../assets/view.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20, marginRight: 5 }}>
                            {item.visit || 0}
                        </Text>

                        <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/comment.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20 }}>
                            {comments_count}
                        </Text>
                    </View>






                </TouchableOpacity>




            )

        }
        if (item.imageUrl.length == 1) {
            return (
                <TouchableOpacity style={{ borderTopWidth: 1, borderColor: 'grey', borderRadius: 5 }}
                    onPress={() => {
                        this.updateview_item(item);
                    }}




                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'title-font', fontSize: 30, marginLeft: 10, marginTop: 10 }}>
                            TITLE:
                    </Text>
                        <Text style={{ fontFamily: 'content-font', fontSize: 20, marginTop: 10 }}>
                            {item.title}
                        </Text>
                    </View>
                    <Text style={{ fontFamily: 'content-font', fontSize: 15, marginLeft: 20 }}>
                        {item.content.substring(0, 30) + "....."}
                    </Text>
                    { item.official &&
                        <View
                            style={{ flexDirection: 'row' }}
                        >

                            <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/tick.png')} />
                            <Text style={{ fontFamily: 'content-font', color: '#67dbff', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                                {"POST BY " + item.nickname}
                            </Text>
                        </View>
                        ||
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                            {"POST BY " + item.nickname}
                        </Text>
                    }
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>

                        <Image style={{ height: 20, width: 20 }} source={require('../assets/view.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20, marginRight: 5 }}>
                            {item.visit || 0}
                        </Text>

                        <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/comment.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20 }}>
                            {comments_count}
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginBottom: 0, borderColor: 'black' }} >
                        <View style={{ flex: 2, flexDirection: 'row' }} >
                            <Image style={{ marginRight: 5, height: imagewidth, width: imagewidth }} source={{ uri: item.imageUrl[0] }} />

                        </View>


                    </View>
                </TouchableOpacity>




            )

        }
        if (item.imageUrl.length == 2) {
            return (
                <TouchableOpacity style={{ borderTopWidth: 1, borderColor: 'grey', borderRadius: 5 }}
                    onPress={() => {
                        this.updateview_item(item);
                    }}




                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'title-font', fontSize: 30, marginLeft: 10, marginTop: 10 }}>
                            TITLE:
                    </Text>
                        <Text style={{ fontFamily: 'content-font', fontSize: 20, marginTop: 10 }}>
                            {item.title}
                        </Text>
                    </View>
                    <Text style={{ fontFamily: 'content-font', fontSize: 15, marginLeft: 20 }}>
                        {item.content.substring(0, 30) + "....."}
                    </Text>
                    { item.official &&
                        <View
                            style={{ flexDirection: 'row' }}
                        >

                            <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/tick.png')} />
                            <Text style={{ fontFamily: 'content-font', color: '#67dbff', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                                {"POST BY " + item.nickname}
                            </Text>
                        </View>
                        ||
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                            {"POST BY " + item.nickname}
                        </Text>
                    }
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>

                        <Image style={{ height: 20, width: 20 }} source={require('../assets/view.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20, marginRight: 5 }}>
                            {item.visit || 0}
                        </Text>

                        <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/comment.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20 }}>
                            {comments_count}
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginBottom: 0, borderColor: 'black' }} >
                        <View style={{ flex: 2, flexDirection: 'row' }} >
                            <Image style={{ marginRight: 5, height: imagewidth, width: imagewidth / 2 }} source={{ uri: item.imageUrl[0] }} />
                            <Image style={{ height: imagewidth, width: imagewidth / 2 }} source={{ uri: item.imageUrl[1] }} />
                        </View>


                    </View>
                </TouchableOpacity>




            )

        }
        if (item.imageUrl.length == 3) {
            return (
                <TouchableOpacity style={{ borderTopWidth: 1, borderColor: 'grey', borderRadius: 5 }}
                    onPress={() => {
                        this.updateview_item(item);
                    }}




                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'title-font', fontSize: 30, marginLeft: 10, marginTop: 10 }}>
                            TITLE:
                    </Text>
                        <Text style={{ fontFamily: 'content-font', fontSize: 20, marginTop: 10 }}>
                            {item.title}
                        </Text>
                    </View>
                    <Text style={{ fontFamily: 'content-font', fontSize: 15, marginLeft: 20 }}>
                        {item.content.substring(0, 30) + "....."}
                    </Text>
                    { item.official &&
                        <View
                            style={{ flexDirection: 'row' }}
                        >

                            <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/tick.png')} />
                            <Text style={{ fontFamily: 'content-font', color: '#67dbff', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                                {"POST BY " + item.nickname}
                            </Text>
                        </View>
                        ||
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                            {"POST BY " + item.nickname}
                        </Text>
                    }
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>

                        <Image style={{ height: 20, width: 20 }} source={require('../assets/view.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20, marginRight: 5 }}>
                            {item.visit || 0}
                        </Text>

                        <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/comment.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20 }}>
                            {comments_count}
                        </Text>
                    </View>
                    <View style={{ flex: 3, marginBottom: 0, borderColor: 'black' }} >
                        <Image style={{ height: 2 * imagewidth / 3, width: imagewidth, marginBottom: 5 }} source={{ uri: item.imageUrl[0] }} />
                        <View style={{ flex: 2, flexDirection: 'row' }} >
                            <Image style={{ marginRight: 5, height: imagewidth / 3, width: imagewidth / 2 }} source={{ uri: item.imageUrl[1] }} />
                            <Image style={{ height: imagewidth / 3, width: imagewidth / 2 }} source={{ uri: item.imageUrl[2] }} />
                        </View>


                    </View>
                </TouchableOpacity>




            )

        }
        if (item.imageUrl.length > 3) {
            return (
                <TouchableOpacity style={{ borderTopWidth: 1, borderColor: 'grey', borderRadius: 5 }}
                    onPress={() => {
                        this.updateview_item(item);
                    }}



                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'title-font', fontSize: 30, marginLeft: 10, marginTop: 10 }}>
                            TITLE:
                    </Text>
                        <Text style={{ fontFamily: 'content-font', fontSize: 20, marginTop: 10 }}>
                            {item.title}
                        </Text>
                    </View>
                    <Text style={{ fontFamily: 'content-font', fontSize: 15, marginLeft: 20 }}>
                        {item.content.substring(0, 30) + "....."}
                    </Text>
                    { item.official &&
                        <View
                            style={{ flexDirection: 'row' }}
                        >

                            <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/tick.png')} />
                            <Text style={{ fontFamily: 'content-font', color: '#67dbff', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                                {"POST BY " + item.nickname}
                            </Text>
                        </View>
                        ||
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: 5, marginLeft: 20 }}>
                            {"POST BY " + item.nickname}
                        </Text>
                    }
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>

                        <Image style={{ height: 20, width: 20 }} source={require('../assets/view.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20, marginRight: 5 }}>
                            {item.visit || 0}
                        </Text>

                        <Image style={{ height: 20, width: 20, marginLeft: 20 }} source={require('../assets/comment.png')} />
                        <Text style={{ fontFamily: 'content-font', color: 'grey', fontSize: 15, marginTop: -5, marginLeft: 20 }}>
                            {comments_count}
                        </Text>
                    </View>

                    <View style={{ flex: 1, marginBottom: 0, borderColor: 'black' }} >
                        <View style={{ flex: 3, flexDirection: 'row' }} >
                            <Image style={{ flex: 2, height: imagewidth + 10, width: 2 * imagewidth / 3, marginRight: 5 }} source={{ uri: item.imageUrl[0] }} />
                            <View style={{ flex: 1 }} >
                                <Image style={{ height: imagewidth / 3, width: imagewidth / 3, marginBottom: 5 }} source={{ uri: item.imageUrl[1] }} />
                                <Image style={{ height: imagewidth / 3, width: imagewidth / 3, marginBottom: 5 }} source={{ uri: item.imageUrl[2] }} />
                                <View style={{ position: 'relative' }}>

                                    <Image style={{ height: imagewidth / 3, width: imagewidth / 3 }} source={{ uri: item.imageUrl[3] }} />
                                    <Image

                                        style={{ opacity: 0.6, position: 'absolute', left: 'auto', top: 'auto', marginLeft: 'auto', height: imagewidth / 3, width: imagewidth / 3, backgroundColor: 'grey' }}
                                        source={require('../assets/morep.png')}
                                    />
                                </View>
                            </View>
                        </View>


                    </View>
                </TouchableOpacity>




            )

        }

    }



    searchFilterFunction_official = () => {

        if (!this.state.check_camp) {
            var usersRef = firebase.database().ref('comment/board');       //   bring the database tips
            usersRef.once('value', (snapshot) => {                     //    tips database resort

                var m = snapshot.val()
                var keys = Object.values(m);
                this.setState({
                    datasource: keys.reverse()                                // datasource of list
                })
            }).then((m) => {



                const newData = this.state.datasource.filter(item => !!item.official);

                this.setState({ datasource: newData });
            })


            this.setState({ check_camp: !this.state.check_camp, check_mine: false })
        }
        else {

            var usersRef = firebase.database().ref('comment/board');       //   bring the database tips
            usersRef.once('value', (snapshot) => {                     //    tips database resort

                var m = snapshot.val()
                var keys = Object.values(m);
                this.setState({
                    datasource: keys.reverse()                               // datasource of list
                })
            }).then((m) => {




            })


            this.setState({ check_camp: !this.state.check_camp })
        }


        //this.makeRemoteRequest();
    };


    searchFilterFunction_mine = () => {

        if (!this.state.check_mine) {
            var usersRef = firebase.database().ref('comment/board');       //   bring the database tips
            usersRef.once('value', (snapshot) => {                     //    tips database resort

                var m = snapshot.val()
                var keys = Object.values(m);
                this.setState({
                    datasource: keys                                   // datasource of list
                })
            }).then((m) => {



                const newData = this.state.datasource.filter(item => {


                    return item.user.includes(firebase.auth().currentUser.uid);
                });

                this.setState({ datasource: newData.reverse() });
            })


            this.setState({ check_mine: !this.state.check_mine, check_camp: false })
        } else {

            var usersRef = firebase.database().ref('comment/board');       //   bring the database tips
            usersRef.once('value', (snapshot) => {                     //    tips database resort

                var m = snapshot.val()
                var keys = Object.values(m);
                this.setState({
                    datasource: keys.reverse()                               // datasource of list
                })
            }).then((m) => {




            })


            this.setState({ check_mine: !this.state.check_mine })
        }


        //this.makeRemoteRequest();
    };
    // not used also but gonna use when there is more info
    renderFooter = () => {
        if (!this.state.loading) return null;
        //start to draw  footer
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
                <Text>Uploading the pictures takes a while, so please wait.</Text>

            </View>
        );
    };

    call = (number1) => {
        //handler to make a call
        const args = {
            number: number1,
            prompt: false,
        };

        call(args).catch(console.error);
    };

    // don't use also
    renderSeparator = () => {

        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderagain = () => {
        this.setState({
            search: '',
        });
        this.makeRemoteRequest();
    };

    renderImage(item, i) {
        return (
            <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: item.file }}
                key={i}
            />
        )
    }

    toggleWriteForm = () => {
        this.setState({ toggleWriteForm: !this.state.toggleWriteForm })
    };

    changeTitle = (title) => {
        this.setState({ title: title });
    };

    changeComment = (comment) => {
        this.setState({ comment: comment });
    };

    onClickComment = (value) => {

        this.setState({

            commentVisible: !this.state.commentVisible,

        });

    };
    agree = () => {
        console.log('3')
        AsyncStorage.setItem('Show_rule', "showed");
        this.setState({
            dialogVisible: false,
        })
    }
    getValueFunction = () => {
        console.log('1')
        //function to get the value from AsyncStorage
        AsyncStorage.getItem('Show_rule').then(value =>
            //AsyncStorage returns a promise so adding a callback to get the value
            this.show_Function(value)
            //Setting the value in Text 

        );
     
        return <View>

        </View>

    };
    show_Function = (value) => {
        console.log('2')
        if (value == null) {
            this.setState({
                dialogVisible1: true,
            })
        }
    };


    // start to draw whole screen
    render() {
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height;
        let imagewidth = dimensions.width;

    

        return (
            // flat list data= datasoucr= firebase.tips        details please look upper

            <View>
                 <Dialog
                    visible={this.state.dialogVisible1}
                    title="Dear User"
                    onTouchOutside={() => this.setState({
                        dialogVisible1:false,dialogVisible:true
                    })} >
                    <View>
                        <Text style={{ fontSize: 20}}> We hope this board becomes a free place that allows all of you to communicate, share experiences, review restaurants&travel destinations, ask any questions or post something fun.</Text>


                        <View
                            style={{ flexDirection: 'row' }}
                        >
                            <TouchableOpacity
                                
                                style={{
                                    marginLeft: 120, marginTop: 30
                                }}  >

                            

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.setState({
                                    dialogVisible1:false,dialogVisible:true
                                })}
                                style={{
                                    marginLeft: 60, marginTop: 30
                                }}  >

                                <Text style={{ fontSize: 20, color: '#67DBFF' }}>NEXT</Text>

                            </TouchableOpacity>


                        </View>
                    </View>

                </Dialog>
                <Dialog
                    visible={this.state.dialogVisible}

                    >
                    <View>
                        <Text style={{ fontSize: 16, color: 'grey' }}> Any post that contains one or more of the following will be deleted without notice:</Text>

                        <Text style={{ fontSize: 18 }}>
                            1. Contents with abusive language </Text>
                        <Text style={{ fontSize: 18 }}>
                            2. Contents with ungrounded malicious accusations
</Text>
                        <Text style={{ fontSize: 18 }}>
                            3. Contents that promote disruption
</Text>
                        <Text style={{ fontSize: 18 }}>
                            4. Contents that interefere with public order
</Text>
                        <Text style={{ fontSize: 18 }}>
                            5. Contents related to or facilitating illegal activities
</Text>
                        <Text style={{ fontSize: 16, color: 'grey' }}>
                            If repeated, the user will be prohibited from using this board.</Text>
                        <Text style={{ fontSize: 16, color: 'grey' }}>
                            Do you agree to follow the above rules?</Text>


                        <View
                            style={{ flexDirection: 'row' }}
                        >
                            <TouchableOpacity
                                   onPress={() => this.props.navigation.navigate('Menu')}
                                style={{
                                    marginLeft: 120, marginTop: 30
                                }}  >

                                <Text style={{ fontSize: 20, color: '#67DBFF' }}>NO</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.agree()}
                                style={{
                                    marginLeft: 60, marginTop: 30
                                }}  >

                                <Text style={{ fontSize: 20, color: '#67DBFF' }}>YES</Text>

                            </TouchableOpacity>


                        </View>
                    </View>

                </Dialog>
                <Modal
                    // nno pressed 
                    animationType="slide"
                    transparent={true}
                    visible={this.state.commentVisible}
                    backdropColor={'white'}
                    backdropOpacity={0.5}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>

                    <View
                        style={{
                            alignItems: 'center',
                            height: imageheight,
                            width: imagewidth,
                            backgroundColor: '#00000080',
                            justifyContent: 'center',

                        }}
                    >

                        <TouchableOpacity

                        >

                            <View
                                style={{
                                    marginTop: 2.6 * imageheight / 8.5,
                                    marginBottom: 3 * imageheight / 8.5,
                                    marginLeft: imagewidth / 10,
                                    marginRight: imagewidth / 10,
                                    backgroundColor: 'white',
                                    height: imageheight * 4 / 8,
                                    width: imagewidth * 8 / 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                <Text style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', fontFamily: 'content-font', fontSize: 30, marginTop: 3, color: '#67DBFF'
                                }}>
                                    SET YOUR NICKNAME
                       </Text>
                                <View style={{ flexDirection: "row" }}>

                                    <TextInput
                                        style={{ height: 40, width: 4 * imagewidth / 10, fontFamily: 'content-font', fontSize: 25, marginTop: 27 }}
                                        onChangeText={text => this.onChangeText1(text)}
                                        placeholder={" "}
                                        placeholderTextColor="#c5c5c5"
                                        value={this.state.nickname}
                                    />
                                </View>
                                <View
                                    style={{ borderColor: "#c5c5c5", borderWidth: 1, width: 30 + 4 * imagewidth / 10, height: 1 }}
                                ></View>

                                <Text style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', fontFamily: 'content-font', fontSize: 15, marginTop: 3
                                }}>
                                    Only this name will be posted on your posts and comments.
                       </Text>
                                <View
                                    style={{ flexDirection: 'row' }}>


                                    <TouchableOpacity
                                        onPress={() => this.onClickComment()}
                                    >
                                        <Image source={require('../assets/clear.png')}

                                            style={{ marginTop: 10, width: 80, height: 40, marginLeft: 0, resizeMode: 'cover' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.regist()}
                                    >
                                        <Image source={require('../assets/submit.png')}

                                            style={{ marginTop: 10, width: 80, height: 40, marginLeft: 3 * imagewidth / 10, resizeMode: 'cover' }}
                                        />
                                    </TouchableOpacity>

                                </View>


                            </View>
                        </TouchableOpacity>
                    </View>

                </Modal>
                <ProgressLoader
                    visible={this.state.loadVisible}
                    isModal={true} isHUD={true}
                    color={"#000000"}
                    barHeight={80}
                />
                <Header
                    height={80}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Menu')}
                        >
                            <Image source={require('../assets/back.png')}

                                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                    }
                    rightComponent={
                        <TouchableOpacity
                            onPress={() => this.onClickComment()}
                        >
                            <Image source={require('../assets/nickname.png')}

                                style={{ width: 33, height: 40, marginLeft: -15, marginTop: 20, resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                    }
                    backgroundColor={'#fff'}
                    borderBottomColor={'#fff'}
                    centerComponent={{ text: 'BOARD', style: { fontFamily: 'title-font', fontSize: 40, marginLeft: 10, marginTop: 17, color: '#67DBFF' } }}

                />
                <ScrollView>
                    <View horizontal={true}>
                        {/* <SearchBar


                            inputStyle={{ backgroundColor: 'white' }}
                            containerStyle={{ backgroundColor: 'white', borderBottomWidth: 0, borderTopWidth: 0 }}
                            inputContainerStyle={{ backgroundColor: 'white' }}
                            onChangeText={(text) => this.searchFilterFunction(text)}
                            style={{
                                borderBottomColor: 'transparent',

                                borderTopColor: 'transparent'
                            }}
                            autoCorrect={false}
                            value={this.state.search}
                        />
                         */}
                        <View
                            style={{ backgroundColor: 'white', height: 60, flexDirection: 'row' }}
                        >

                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                style={{ height: 40, backgroundColor: 'white' }}
                                title='Only Mine'
                                checked={this.state.check_mine}
                                onPress={() => this.searchFilterFunction_mine()

                                }
                            />
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                style={{ height: 40, backgroundColor: 'white' }}
                                title='Only Camp Korea'
                                checked={this.state.check_camp}
                                onPress={() => this.searchFilterFunction_official()}
                            />

                        </View>

                    </View>
                    <FlatList
                        data={this.state.datasource}
                        // (item =  tips ) here
                        renderItem={this.renderItem}
                        keyExtractor={item => item.uid}
                        ListEmptyComponent={<Text style={{ fontFamily: 'content-font', fontSize: 20, marginTop: 10 }}>{this.state.board_reason}</Text>}
                    //  ListHeaderComponent={this.renderHeader}
                    //  ListFooterComponent={this.renderFooter}
                    //   onRefresh={this.handleRefresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore}
                    // onEndReachedThreshold={30}
                    />

                    <View
                        style={{ height: 100 }}
                    >

                    </View>


                    <View
                        style={{ height: 100 }}
                    >
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 140, right: 20, }}>
                    <TouchableOpacity
                        onPress={() => this.NavigateToWrite()

                        }
                    >
                        <Image
                            style={{ width: 63, height: 63, resizeMode: 'cover' }}
                            resizeMode={'contain'}
                            source={require('../assets/write_.png')}
                        />
                    </TouchableOpacity>
                </View>

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


export default BOARDLIST;

import React from 'react';
import { Modal, Button, FlatList, Text, View, TouchableOpacity, AsyncStorage, StatusBar, Image, StyleSheet, ScrollView, Linking, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar, Header, CheckBox } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import firebase, { storage } from "../firebase";
import call from 'react-native-phone-call';
import expo from '../app.json'
const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
}

class BUSScreen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            datasource: [],
            datasource1: [],
            pause: false,
            error: null,
            refreshing: false,
            fontLoaded: true,
            checkalarm: 0,
            callvan:false,
            alarmname: '',
            palarmname: '',
            palarmheight: 0,
            palarmwidth: 0,
            alarmed: false,
            board_opened:true,
            alarmcontent: "In order to continue our hard work, we have encountered financial difficulties considering server fees.  Those who would like to support us, please click yes to donate. Thank you!",
            palarmcontent: "",
            palarmimage: "",
            tutorial: "",
            login_check:false,
            dialogVisible: false,
            dialogVisible1: false,
            dialogVisible_no: false,
            checked: false,
            commentVisible: false,
            commentVisib: false,
            commentVisibl: false,
            image: "",
            imagechange: 0,
            update: " ",
        };
    }










    componentDidMount() {



        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {





    };
    updateview_board = () => {


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        var count_time = 0;

        var usersRef = firebase.database().ref('visit/board/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/board/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })
     
        this.props.navigation.navigate('BOARDLIST');
      
    }

    update_bus_total_view = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;

        var count_time = 0;

        var d;

        var usersRef = firebase.database().ref('visit/bus/total/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/total/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })
    }
    updateview_taxi = (camp1,camp_select1) => {

        this.update_bus_total_view();
      
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        var count_time = 0;

        var usersRef = firebase.database().ref('visit/bus/TAXI/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/TAXI/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })

        this.props.navigation.navigate('TAXI',{camp:camp1,camp_select:camp_select1})

    }
    updateview_tmc = () => {

        this.update_bus_total_view();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        var count_time = 0;

        var usersRef = firebase.database().ref('visit/bus/TMC/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/TMC/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })

        this.props.navigation.navigate('TMC');

    }

    updateview_h221 = () => {

        this.update_bus_total_view();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        var count_time = 0;

        var usersRef = firebase.database().ref('visit/bus/H221/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/H221/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })

        this.props.navigation.navigate('H221');

    }

    updateview_hovey = () => {

        this.update_bus_total_view();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;

        var count_time = 0;
        var usersRef = firebase.database().ref('visit/bus/HOVEY/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/HOVEY/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })

        this.props.navigation.navigate('HOVEY');

    }
    updateview_RED = () => {

        this.update_bus_total_view();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        var count_time = 0;

        var usersRef = firebase.database().ref('visit/bus/RED/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/RED/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })

        this.props.navigation.navigate('Red');

    }
    updateview_BLUE = () => {

        this.update_bus_total_view();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        var count_time = 0;

        var usersRef = firebase.database().ref('visit/bus/BLUE/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/BLUE/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })

        this.props.navigation.navigate('BLUE');

    }
    updateview_GREEN = () => {

        this.update_bus_total_view();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;

        var count_time = 0;
        var usersRef = firebase.database().ref('visit/bus/GREEN/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/GREEN/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })

        this.props.navigation.navigate('GREEN');

    }
    updateview_OTHER = () => {

        this.update_bus_total_view();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        var count_time = 0;

        var usersRef = firebase.database().ref('visit/bus/OTHER/' + today + '/count');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/OTHER/' + today).update({
                count: count_time + 1
            }, function () {

            });
        })

        this.props.navigation.navigate('OTHER');

    }


    fundplease = () => {
        let user = firebase.auth().currentUser;
        var show = true;
        firebase.auth().onAuthStateChanged(function (user) {
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear();
            if (user) {

                if (firebase.auth().currentUser != null) {
                    var m;
                    var code = firebase.auth().currentUser.uid
                    code = this.replaceAll(code, ".", "-");
                    code = this.replaceAll(code, "#", "-");
                    code = this.replaceAll(code, "$", "-");
                    code = this.replaceAll(code, "[", "-");
                    code = this.replaceAll(code, "]", "-");
                    var usersRef = firebase.database().ref('userinfo/' + code + '/user_watched');
                    usersRef.on('value', (snapshot) => {
                        m = snapshot.val()
                        console.log("이거", m);
                        if (m == date + month + year) {
                            console.log("아니", m, date + month + year);
                            show = false;
                        }



                    });



                }


                const MyStatusBar = ({ backgroundColor, ...props }) => (
                    <View style={[styles.statusBar, { backgroundColor }]}>
                        <StatusBar backgroundColor="yellow" barStyle="dark-content" />
                    </View>
                );
            } else {
                console.log(Date(Date.now()).toString())
                console.log("no user")


            }
        });



        return show;


    }

    call = () => {
        //handler to make a call

        var usersRef = firebase.database().ref('zalarm/call');
        usersRef.once('value', (snapshot) => {
            m = snapshot.val()

            console.log(m);
            if (m == "yes") {
                this.setState({

                    callvan: true,
                });
              
            }
        }).then(() => { 
          
        })
    
        const args = {
          number: "01084776855",
          prompt: false,
        };
    
        call(args).catch(console.error);

      };


    check2 = () => {


        if (this.state.alarmed == false) {


            var m;
            var mm;

            var keys;
            console.log(expo.expo.version);


            var d;
            var dd;
            var usersRef = firebase.database().ref('version2');
            usersRef.once('value', (snapshot) => {
                m = snapshot.val()

                console.log("현재 버젼 firebase", m);
                if (m !== expo.expo.version) {

                    this.setState({

                        commentVisibl: true,
                    });

                    //  alert("New version of the app is available. For more experience and better performance, please keep the app up to date! 12.3!!!!!!! ");

                }
            }).then(() => {
                if (firebase.auth().currentUser != null) {
                    var code1 = firebase.auth().currentUser.uid
                    code1 = this.replaceAll(code1, ".", "-");
                    code1 = this.replaceAll(code1, "#", "-");
                    code1 = this.replaceAll(code1, "$", "-");
                    code1 = this.replaceAll(code1, "[", "-");
                    code1 = this.replaceAll(code1, "]", "-");
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();
           
                    today = mm + '-' + dd + '-' + yyyy;
                    firebase.database().ref('userinfo/' + code1).update({
                        last_access:today
                    }, function () {

                    });

                    console.log(" 유저 로그인 상태  ")
                    var usersRef3 = firebase.database().ref('zalarm');
                    usersRef3.once('value', (snapshot) => {
                        m = snapshot.val()
                        //   alert(m.content);
                        console.log("현재 서버알람 ", m.name)

                        this.state.alarmname = m.name;
                        this.setState({ alarmcontent: m.dialog_content })
                    }).then((m) => {
                        var code = firebase.auth().currentUser.uid
                        code = this.replaceAll(code, ".", "-");
                        code = this.replaceAll(code, "#", "-");
                        code = this.replaceAll(code, "$", "-");
                        code = this.replaceAll(code, "[", "-");
                        code = this.replaceAll(code, "]", "-");
                        var usersRef2 = firebase.database().ref('userinfo/' + code + '/alarm');
                        usersRef2.once('value', (snapshot) => {
                            d = snapshot.val()
                            console.log("유저의 서버 알람 ", d, this.state.alarmname);



                        }).then(() => {
                            var usersRef4 = firebase.database().ref('zpushalarm');
                            usersRef4.once('value', (snapshot) => {
                                mm = snapshot.val()
                                //   alert(m.content);
                                console.log("현재 서버  push알람 ", mm.name)

                                this.state.palarmname = mm.name;
                                this.setState({ palarmname: mm.alarm_or_not})
                                this.state.checkalarm = mm.check;
                             
                                this.setState({ palarmimage: mm.image })

                            }).then(() => {
                                if (this.state.palarmname != "nos") {
                                    var code = firebase.auth().currentUser.uid
                                    code = this.replaceAll(code, ".", "-");
                                    code = this.replaceAll(code, "#", "-");
                                    code = this.replaceAll(code, "$", "-");
                                    code = this.replaceAll(code, "[", "-");
                                    code = this.replaceAll(code, "]", "-");
                                    var usersRef5 = firebase.database().ref('userinfo/' + code + '/alarmpush');
                                    usersRef5.once('value', (snapshot) => {
                                        dd = snapshot.val()
                                        console.log("유저의 push", dd, this.state.palarmname, this.state.checkalarm);
                                    }
                                    ).then(() => {
                                        if (this.state.alarmed == false) {

                                            if (d == this.state.alarmname && dd == this.state.palarmname) {
                                                console.log("both-same");
                                                this.setState({ alarmed: true })

                                            }
                                            else if (d != this.state.alarmname && dd == this.state.palarmname) {
                                                console.log("no danation");

                                                this.setState({ alarmed: true })
                                                this.setState({ dialogVisible: true })
                                            }
                                            else if (d == this.state.alarmname && dd != this.state.palarmname) {
                                                console.log("일헤라");
                                                if (this.state.checkalarm === 0) {
                                                    console.log("danationed0");
                                                    this.setState({ alarmed: true })
                                                }
                                                if (this.state.checkalarm === 1) {
                                                    console.log("danationed1");

                                                    this.setState({ alarmed: true })
                                                    this.setState({ dialogVisible1: true })
                                                    var code = firebase.auth().currentUser.uid
                                                    code = this.replaceAll(code, ".", "-");
                                                    code = this.replaceAll(code, "#", "-");
                                                    code = this.replaceAll(code, "$", "-");
                                                    code = this.replaceAll(code, "[", "-");
                                                    code = this.replaceAll(code, "]", "-");
                                                    firebase.database().ref('userinfo/' + code).update({
                                                        alarmpush: this.state.palarmname
                                                    }, function () {

                                                    });
                                                }
                                                if (this.state.checkalarm === 2) {
                                                    console.log("danationed2");

                                                    this.setState({ alarmed: true })
                                                    this.setState({ dialogVisible1: true })

                                                }


                                            }

                                            else if (d != this.state.alarmname && dd != this.state.palarmname) {
                                                if (this.state.checkalarm === 0) {
                                                    this.setState({ alarmed: true })
                                                    this.setState({ dialogVisible: true })
                                                    console.log("danation!!0");

                                                }
                                                if (this.state.checkalarm === 1) {
                                                    console.log("danation!!1");

                                                    this.setState({ alarmed: true })
                                                    this.setState({ dialogVisible1: true })
                                                    var code = firebase.auth().currentUser.uid
                                                    code = this.replaceAll(code, ".", "-");
                                                    code = this.replaceAll(code, "#", "-");
                                                    code = this.replaceAll(code, "$", "-");
                                                    code = this.replaceAll(code, "[", "-");
                                                    code = this.replaceAll(code, "]", "-");
                                                    firebase.database().ref('userinfo/' + code).update({
                                                        alarmpush: this.state.palarmname
                                                    }, function () {

                                                    });
                                                }
                                                if (this.state.checkalarm === 2) {
                                                    console.log("danatione!!2");

                                                    this.setState({ alarmed: true })
                                                    this.setState({ dialogVisible1: true })

                                                }
                                            }
                                        }






                                    });





                                }
                                else {
                                    this.setState({ alarmed: true })
                                }


                            }

                            );

                            //start









                        })



                    });
                    //지워    
                    this.registerForPushNotifications();
                }
                if (firebase.auth().currentUser == null) {
                    // var check;
                    // var mmm;
                    // var usersRef4 = firebase.database().ref('zpushalarm');
                    // usersRef4.once('value', (snapshot) => {
                    //     mmm = snapshot.val()

                    //     console.log("현재 서버  push알람 ", mmm.name)

                    //     this.state.palarmname = mmm.name;
                    //     check = mmm.check;


                    //     this.setState({ palarmimage: mmm.image })

                    // }).then(() => {
                    //     console.log("check 1 ", check);
                    //     if (check == 0) {
                    //         this.setState({ dialogVisible: false })
                    //         this.setState({ alarmed: true })
                    //         this.setState({ dialogVisible1: false })
                    //     }
                    //     if (check == 1 || check == 2) {
                    //         console.log("check is?D????? ", check);
                    //         this.setState({ dialogVisible1: true })
                    //         this.setState({ alarmed: true })
                    //     }



                    // })



                }


            });




        }

    }
    replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    notshow = () => {
        console.log('notshow')
        if (firebase.auth().currentUser != null) {
            var code = firebase.auth().currentUser.uid
            code = this.replaceAll(code, ".", "-");
            code = this.replaceAll(code, "#", "-");
            code = this.replaceAll(code, "$", "-");
            code = this.replaceAll(code, "[", "-");
            code = this.replaceAll(code, "]", "-");
            firebase.database().ref('userinfo/' + code).update({
                alarm: this.state.alarmname,
                name: firebase.auth().currentUser.displayName
            }, function () {

            });
        }
        else alert("please login first");

        console.log("end");



    }


    go_to_update() {
        this.setState({ commentVisibl: false })
        if (Platform.OS === 'android') {
            Linking.openURL("https://play.google.com/store/apps/details?id=com.nn.coufproject").catch((err) => console.error('An error occurred', err));

        }
        else {
            Linking.openURL("https://apps.apple.com/kr/app/camp-korea/id1481025758").catch((err) => console.error('An error occurred', err));

        }


    }
   

    Show_Custom_Alert() {
        console.log("setting visible")
        this.setState({ dialogVisible: true })
        this.setState({ alarmed: true })
        this.setState({ dialogVisible1: true })
    }
    Yespressed = () => {
        console.log("yes")
        this.setState({ dialogVisible: false })


        if (firebase.auth().currentUser != null) {
            if (this.state.checked) {
                this.notshow();

            }


        }
        if (firebase.auth().currentUser == null) {
            if (this.state.checked) {
                this.setState({ dialogVisible_no: true })
            }
        }
      //  Linking.openURL("https://www.paypal.me/coufKR?locale.x=ko_KR").catch((err) => console.error('An error occurred', err));

    }
    Nopressed = () => {
        console.log("yno!!!")
        this.setState({ dialogVisible: false })

        if (firebase.auth().currentUser != null) {
            if (this.state.checked) {
                this.notshow();
           //     this.setState({ commentVisib: true })
            }

        }
        if (firebase.auth().currentUser == null) {
            if (this.state.checked) {
                this.setState({ dialogVisible_no: true })
            }


        }
        console.log("no pressed!!!")

    }
    login_need = (value) => {

        if (value == null) {
         
            this.props.navigation.navigate('Login_first');

        } else {
          
            this.check2();

        }
    }
    saveValueFunction = (value) => {
        console.log("save man man~");
        //function to save the value in AsyncStorage
        if (value == null) {
            //To check the input not empty
            AsyncStorage.setItem('show_tutoria12', "first!");
            //Setting a data to a AsyncStorage with respect to a key 
            // this.setState({ textInputData: '' })
            //Resetting the TextInput

            //alert to confirm
            console.log("hey show them ");
            this.setState({

                commentVisible: true,
                tutorial: require("../assets/images/tu1.png")

            })

        } else {
            console.log("check2 man~");
            if (firebase.auth().currentUser == null) {
               AsyncStorage.getItem('logind').then(value =>
               
                   this.login_need(value)
               
       
                );
               
               }
            else{
            this.check2();
            }
        }
    };
    imageheightca = () => {
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height;
        if (Platform.OS === 'android') {


        }
        return imageheight;
    }
    onClickComment = (value) => {

        if (this.state.imagechange == 0) {

            this.setState({
                imagechange: 1,
                tutorial: require("../assets/images/tu2.png"),
            });
        }
        else if (this.state.imagechange == 1) {

            this.setState({
                imagechange: 2,
                tutorial: require("../assets/images/tu3.png"),
            });

        }
        else if (this.state.imagechange == 2) {

            this.setState({
                imagechange: 3,
                tutorial: require("../assets/images/tu4.png"),
            });

        }
        // else if (this.state.imagechange == 3) {
        //     this.setState({
        //         imagechange: 4,
        //         tutorial: require("../assets/images/tu5.png"),
        //     });

        // }
        // else if (this.state.imagechange == 4) {
        //     this.setState({
        //         imagechange: 5,
        //         tutorial: require("../assets/images/tu6.png"),
        //     });

        // }
        else if (this.state.imagechange == 3) {

            this.setState({
                commentVisible: value || !this.state.commentVisible,
            });
        }

    };
    onClickCommentleft = (value) => {

        if (this.state.imagechange == 1) {

            this.setState({
                imagechange: 0,
                tutorial: require("../assets/images/tu1.png"),
            });
        }
        else if (this.state.imagechange == 2) {
            this.setState({
                imagechange: 1,
                tutorial: require("../assets/images/tu2.png"),
            });

        }
        else if (this.state.imagechange == 3) {
            this.setState({
                imagechange: 2,
                tutorial: require("../assets/images/tu3.png"),
            });

        }
        // else if (this.state.imagechange == 4) {
        //     this.setState({
        //         imagechange: 3,
        //         tutorial: require("../assets/images/tu4.png"),
        //     });

        // }
        // else if (this.state.imagechange == 5) {
        //     this.setState({
        //         imagechange: 4,
        //         tutorial: require("../assets/images/tu5.png"),
        //     });

        // }


    };
    onClickCommen = (value) => {


        this.setState({
            commentVisibl: value || !this.state.commentVisibl,
        });


    };
    onClickComme = (value) => {


        this.setState({
            commentVisib: false,
        });


    };

    getValueFunction = () => {
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height;
        let imagewidth = dimensions.width;
        //function to get the value from AsyncStorage
        AsyncStorage.getItem('show_tutoria12').then(value =>
            //AsyncStorage returns a promise so adding a callback to get the value
            this.saveValueFunction(value)
            //Setting the value in Text 

        );
     
        return <View>

        </View>

    };





    _keyExtractor = (item, index) => item.key;

    render() {

        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height / 5;
        let imagewidth = dimensions.width;

        { this.getValueFunction() }
        return (

            <View
              
                style={{ backgroundColor: '#ffffff' }}
            >
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <Modal
                    // nno pressed 
                    animationType="slide"
                    transparent={true}
                    visible={this.state.commentVisib}
                    backdropColor={'white'}
                    backdropOpacity={0.5}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>

                    <View
                        style={{
                            alignItems: 'center',

                            backgroundColor: '#00000080',
                            justifyContent: 'center',

                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.onClickComme()}
                        >

                            <Image
                                style={{
                                    marginTop: imageheight * 5 / 4,
                                    marginBottom: imageheight * 5 / 4,
                                    width: imagewidth / 2,
                                    height: imageheight * 5 / 2,
                                    resizeMode: 'contain'
                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2Fmore-alarm%2F73413249_526896888161576_1310299238160138240_n.png?alt=media&token=090432bd-6323-4d8b-9814-3e4b35b37eec" }}

                            />
                        </TouchableOpacity>
                    </View>

                </Modal>
                <Modal
                    //  new tutorial
                    animationType="slide"
                    transparent={false}
                    visible={this.state.commentVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <ImageBackground
                        resizeMode='contain'
                        style={{
                            width: imagewidth,
                            height: imageheight * 5,


                            borderBottomWidth: 3,

                        }}
                        source={this.state.tutorial}
                    >
                        <View>

                            <View style={{ flexDirection: "row" }}>

                                <TouchableOpacity
                                    onPress={() => this.onClickCommentleft()}
                                >
                                    <View
                                        style={{
                                            width: imagewidth / 2,
                                            height: imageheight * 5,


                                            borderBottomWidth: 3,

                                        }}
                                    >


                                    </View>


                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.onClickComment()}
                                >
                                    <View
                                        style={{
                                            width: imagewidth / 2,
                                            height: imageheight * 5,


                                            borderBottomWidth: 3,

                                        }}
                                    >


                                    </View>
                                </TouchableOpacity>





                            </View>
                        </View>
                    </ImageBackground>

                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.commentVisibl}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.go_to_update()}
                        >
                            <Image
                                style={{
                                    width: imagewidth,
                                    height: imageheight * 5,
                                    borderBottomWidth: 3,

                                    resizeMode: 'cover'
                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2Fmore-alarm%2F76765590_514660999264502_1871015718393217024_n.png?alt=media&token=b2bb3f77-8737-4456-bb8b-f255c9ce5905" }}

                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {
                    // modal the picture what i want z push alarm 
                }
                <Modal
                    // custom push alarm
                    animationType="slide"
                    transparent={true}
                    visible={this.state.dialogVisible1}
                    backdropColor={'white'}
                    backdropOpacity={0.5}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>

                    <View
                        style={{
                            alignItems: 'center',

                            backgroundColor: '#00000080',
                            justifyContent: 'center',

                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.setState({ dialogVisible1: false })}
                        >

                            <Image
                                style={{
                                    marginTop: imageheight * 5 / 4,
                                    marginBottom: imageheight * 5 / 4,
                                    width: imagewidth / 2,
                                    height: imageheight * 5 / 2,
                                    resizeMode: 'cover',
                                }}
                                source={{ uri: this.state.palarmimage }}

                            />
                        </TouchableOpacity>
                    </View>

                </Modal>
                {// dialog ask to donate or not 
                }
                <Dialog
                    visible={this.state.dialogVisible}
                   
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View>
                        <Text style={{ fontSize: 20 }}>{this.state.alarmcontent}</Text>

                        <CheckBox
                            center
                            title='NOT SHOW IT AGAIN.'
                            checked={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked })}
                        />
                        <View
                            style={{ flexDirection: 'row' }}
                        >

                            <TouchableOpacity
                                onPress={() => this.Nopressed()}
                                style={{
                                    marginLeft: 150, marginTop: 30
                                }}  >
                                <Text style={{ fontSize: 20, color: '#67DBFF' }}>YES</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                                onPress={() => this.Yespressed()}
                                style={{
                                    marginLeft: 60, marginTop: 30
                                }}  >

                                <Text style={{ fontSize: 20, color: '#67DBFF' }}>YES</Text>

                            </TouchableOpacity> */}
                        </View>
                    </View>

                </Dialog>
                <Dialog
                    visible={this.state.dialogVisible_no}
                    title="DEAR USER "
                    onTouchOutside={() => this.setState({ dialogVisible_no: false })} >
                    <View>

                        <Text style={{ fontSize: 20 }}>If you don't want it to pop up again, please log in first.</Text>



                    </View>

                </Dialog>
                <Dialog
                    visible={this.state.callvan}
                    title="DEAR USER "
                    onTouchOutside={() => this.setState({ callvan: false })} >
                    <View>

                        <Text style={{ fontSize: 20 }}>File a complaint to the AAFES if you want all call vans on base to be available for the US army officially..</Text>



                    </View>

                </Dialog>
                <ScrollView
                    style={{ backgroundColor: '#ffffff' }}
                >
                    <View>

                        <View>




                            <Image
                                style={{

                                    width: imagewidth,
                                    height: 23,
                                    marginTop: 100,
                                    marginLeft: -40,
                                    alignContent: 'flex-start',
                                    resizeMode: 'contain'
                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/MAIN_BUS%2FKakaoTalk_Image_2021-01-26-16-11-40.png?alt=media&token=8229bbb1-e16a-4fba-8d06-0b3d809dcb1b" }}

                            />

                            <TouchableOpacity
                                onPress={() => this.updateview_board()}
                            >

                                <Image
                                    style={{

                                        width: imagewidth,
                                        height: 170,
                                        marginTop: 30,
                                        marginBottom: 40,
                                        resizeMode: 'contain'
                                    }}
                                    source={require("../assets/board_2.png") }

                                />
                            </TouchableOpacity>





                        </View >
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View
                                style={{
                                    alignItems: 'center',


                                }}
                            >
                                <Text style={{/*fontFamily:'Bebas Neue Regular' ,*/fontSize: 23 }}  >HUMPHREY</Text>
                                <View style={{ borderWidth: 1, marginTop: 5, borderRightWidth: imagewidth / 2 - 30, borderColor: "black" }} />
                                <TouchableOpacity
                                    onPress={() =>   this.updateview_taxi('  HUMPHREYS',1) }
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/TAXI.png") }

                                    />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.updateview_RED()}
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/RED.png") }

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.updateview_BLUE()}
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/BLUE.png") }

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.updateview_GREEN()}
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/GREEN.png") }

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.call()}
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/call_van.png") }

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.updateview_OTHER()}
                                //  onPress={() => Linking.openURL("https://home.army.mil/humphreys/application/files/7216/0911/4184/INCHEON_AP_TO_HUMPHREYS__CP_HUMPHREYS_TO_INCHEON_AP.jpg").catch((err) => console.error('An error occurred', err))}
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/OTHERS.png") }

                                    />
                                </TouchableOpacity>
                            </View >

                            <View style={{


                                alignItems: 'center',
                            }}>
                                <Text style={{/*fontFamily:'Bebas Neue Regular' ,*/fontSize: 23 }}  >CASEY</Text>
                                <View style={{ borderWidth: 1, marginTop: 5, borderRightWidth: imagewidth / 2 - 30, borderColor: "black" }} />
                                <TouchableOpacity
                                    onPress={() =>   this.updateview_taxi('      CASEY',2) }
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/TAXI.png") }

                                    />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.updateview_tmc()}
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/TMC.png") }

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.updateview_h221()}
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/H221.png") }

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.updateview_hovey()}
                                >

                                    <Image
                                        style={{

                                            width: imagewidth / 2,
                                            height: 52,
                                            marginTop: 15,

                                            resizeMode: 'contain'
                                        }}
                                        source={require("../assets/HOVEY.png") }
                                    />
                                </TouchableOpacity>
                              
                                
                            </View>
                        </View>


                        <View style={{

                          
height: 52,

}}></View>










                     
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

export default BUSScreen;
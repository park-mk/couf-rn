import React from 'react';
import { Text, AsyncStorage, View, StyleSheet, Image, TouchableHighlight, Dimensions, FlatList, Alert,Modal } from 'react-native';
import firebase from "../firebase";
import {CheckBox, FormLabel, FormInput, Button  } from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, withNavigation } from 'react-navigation';
import { Container, Content, Header, Form, Input, Item, Label} from 'native-base'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import CHOSEarea from '../components/areachoose'
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import ProgressLoader from 'rn-progress-loader';
import BUSScreen from '../screens_bus/bus';

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
    border-width:3
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
            survey_view:false,
            instagram:false,
            facebook:false,
            recommendation:false,
            banner:false,

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
   var code = firebase.auth().currentUser.uid
        var usersRef0 = firebase.database().ref('userinfo/' + code + '/user_buysell');
        usersRef0.on('value', (snapshot) => {
            var m = snapshot.val()
            this.setState({ origin: m })
            //  console.log(this.state.origin);
        });


    };
    choosearea = () => {


   var code = firebase.auth().currentUser.uid

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
                               var code = firebase.auth().currentUser.uid
                                    var change1 = "," + item.uid;
                                    var change2 = this.state.origin.replace(change1, '')
                                    var myArray=this.state.datasource2
          
                                    for( var i = 0; i < myArray.length; i++){ 
                                        if ( myArray[i].uid === item.uid) {
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
       var code = firebase.auth().currentUser.uid
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
   var code = firebase.auth().currentUser.uid
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
   var code = firebase.auth().currentUser.uid
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
    getValueFunction = () => {
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height;
        let imagewidth = dimensions.width;
        //function to get the value from AsyncStorage
        AsyncStorage.getItem('survey_view').then(value =>
            //AsyncStorage returns a promise so adding a callback to get the value
            this.saveValueFunction(value)
            //Setting the value in Text 

        );
   

    };

    saveValueFunction = (value) => {
        //function to save the value in AsyncStorage
        if (value == null) {
            //To check the input not empty
            AsyncStorage.setItem('survey_view', "first!");
            this.setState({

                survey_view: true 

            })

        } else {


        }
    };
    update_survey = () => {

        if(this.state.banner===false&&this.state.instagram===false&&this.state.facebook===false&&this.state.recommendation===false){
            alert(" you should at least choose one");
            return ;
        }
        let total=0;
        let ad_time=0;
        var usersRef = firebase.database().ref('survey/total');
        usersRef.once('value', (snapshot) => {
    
    
          let  m = snapshot.val()
          total = m ;
        }, function (m) {
            
        }).then((m)=>{
          
            firebase.database().ref('survey').update({
                total: total +1
            }, function () {
    
            }); 
        })
        if(this.state.banner===true){
        var usersRef1 = firebase.database().ref('survey/banner');
        usersRef1.once('value', (snapshot) => {
    
    
            let  m = snapshot.val()
            ad_time = m ;
          }, function (m) {
              
          }).then((m)=>{
              firebase.database().ref('survey').update({
                  banner: ad_time +1
              }, function () {
      
              }); 
          })
        }
        if(this.state.instagram===true){
            var usersRef2 = firebase.database().ref('survey/instagram');
            usersRef2.once('value', (snapshot) => {
        
        
                let  m = snapshot.val()
                ad_time = m ;
              }, function (m) {
                  
              }).then((m)=>{
                  firebase.database().ref('survey').update({
                      instagram: ad_time +1
                  }, function () {
          
                  }); 
              })
            }
            if(this.state.facebook===true){
                var usersRef3 = firebase.database().ref('survey/facebook');
                usersRef3.once('value', (snapshot) => {
            
            
                    let  m = snapshot.val()
                    ad_time = m ;
                  }, function (m) {
                      
                  }).then((m)=>{
                      firebase.database().ref('survey').update({
                          facebook: ad_time +1
                      }, function () {
              
                      }); 
                  })
                }
                if(this.state.recommendation===true){
                    var usersRef3 = firebase.database().ref('survey/recommendation');
                    usersRef3.once('value', (snapshot) => {
                
                
                        let  m = snapshot.val()
                        ad_time = m ;
                      }, function (m) {
                          
                      }).then((m)=>{
                          firebase.database().ref('survey').update({
                            recommendation: ad_time +1
                          }, function () {
                  
                          }); 
                      })
                    }




                    this.setState({ survey_view: false });
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



        // if (!result.cancelled) {
        //     this.setState({ loadVisible: true });
        //     this._uploadImage(result.uri).then((response) => {
        //         return firebase.storage().ref('user').child(firebase.auth().currentUser.uid).getDownloadURL();
        //     }).then((response) => {
        //         console.log('download url', response);
        //         return firebase.auth().currentUser.updateProfile({
        //             photoURL: response
        //         });
        //     }).finally(() => {
        //         this.setState({ loadVisible: false });
        //     });
        // }
    };

    renderscreen(){
        
        { this.getValueFunction() }

        if(this.state.survey_view===false){
        return     <View style={{ marginTop: 60 }} >
        <ProgressLoader
            visible={this.state.loadVisible}
            isModal={true} isHUD={true}
            color={"#000000"}
            barHeight={80}
        />
       
        <ProfileTopWrap>
           {/* <ProfileTopImage onPress={() => { this.changeImage() }}>
           */}
           <ProfileTopImage > 
                <ProfileImage  source={require('../assets/people.png')} />
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

        {/* <View style={{ flexDirection: 'row' }}>
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
        */}
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
        {/* <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 10 }} > */}




            {/* <TouchableOpacity




            >
                <Image
                    style={{
                        width: 30, flex: 1, marginLeft: 18,
                        height: 30, alignContent: 'center',
                    }}
                    resizeMode={'contain'}
                    source={require('../assets/black_.png')}
                />
            </TouchableOpacity> */}




            {/* <Text style={{ fontFamily: 'title-font', fontSize: 26 }}> liked restaurants </Text>



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
            </TouchableOpacity> */}

        {/* </View> */}


        {/* <View style={{ marginLeft: 0 }}>
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
        </View> */}
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

                }
    else{

        return <Modal  
        
        >
            <ScrollView 
              style={{  backgroundColor:'#E1F6FF' }}
            >
        <View 
           style={{ borderWidth:1,borderColor:'#d3d3d3',marginLeft:20,marginRight:20,marginTop: 50 ,backgroundColor:'white',borderRadius:10 }}
           height={150}
        >
             <View 
           style={{ backgroundColor:'#67DBFF' ,borderTopLeftRadius:10,borderTopRightRadius:10}}
           height={20}
        >
        </View>
        <Text  style={{ marginTop: 10,marginLeft:5,color: 'black', fontFamily: 'content-font', fontSize: 20 }}>Thank you for signing up </Text>
        <Text  style={{marginLeft:5,marginTop:10 ,fontFamily: 'content-font', fontSize: 18 }}>We'd conduct a survey for a better user experience.(Multiple choices available)</Text>
         
       
        </View>
        <View 
           style={{ borderWidth:1,borderColor:'#d3d3d3',marginLeft:20,marginRight:20,marginTop: 15 ,backgroundColor:'white',borderRadius:10 }}
           height={320}
        >
        <Text  style={{marginTop: 15,marginBottom:15,marginLeft:10,marginRight:10,color: 'black', fontFamily: 'content-font', fontSize: 20 }}>How did you get to know our app?</Text>
             
        <CheckBox
                title='Banner ad'
                         checked={this.state.banner}
                         onPress={()=>this.setState({ banner: !this.state.banner})}
                        
        />
           <CheckBox
                title='Instagram'
                         checked={this.state.instagram}
                         onPress={()=>this.setState({ instagram: !this.state.instagram})}
        />
           <CheckBox
                title='Facebook'
                         checked={this.state.facebook}
                         onPress={()=>this.setState({ facebook: !this.state.facebook})}
        />
           <CheckBox
                title='Recommendation'
                         checked={this.state.recommendation}
                         onPress={()=>this.setState({ recommendation: !this.state.recommendation})}
        />
        </View>

       

        {/* <View 
           style={{ borderWidth:1,borderColor:'#d3d3d3',marginLeft:20,marginRight:20,marginTop: 15 ,backgroundColor:'white',borderRadius:10 }}
           height={500}
        >
        <Text  style={{marginTop:10,marginLeft:10,marginRight:10,color: 'black', fontFamily: 'content-font', fontSize: 20 }}>What functions do you think will be good for you to add?</Text>
        <CheckBox
                title='Restaurant recommendation'
                         checked={this.state.checked}
        />
        <CheckBox
                title='Online Reservation of restaurant'
                         checked={this.state.checked}
        />
           <CheckBox
                title='Online Reservation of club'
                         checked={this.state.checked}
        />
         <CheckBox
                title='Online Reservation of hotels & motels'
                         checked={this.state.checked}
        />
          <CheckBox
                title='Online Reservation of dermatology'
                         checked={this.state.checked}
        />
           <CheckBox
                title='Introductions and discount for surrounding restaurants'
                         checked={this.state.checked}
        />
        
           <CheckBox
                title='Tour guide system'
                         checked={this.state.checked}
        />
        
        </View> */}

        <View 
           style={{ borderWidth:1,borderColor:'#d3d3d3',marginLeft:20,marginRight:20,marginTop: 15 ,backgroundColor:'white',borderRadius:10 }}
           height={220}
        >
        <Text  style={{marginTop: 15,marginLeft:10,marginRight:10,color: 'black', fontFamily: 'content-font', fontSize: 15 }}>If you have more idea please leave it in "suggestion"</Text>
             
        <Text  style={{marginTop: 5,marginBottom:15,marginLeft:10,marginRight:10,color: 'black', fontFamily: 'content-font', fontSize: 20 }}>Thank you</Text>
        <Button
        title="FINISH"
        style={{marginLeft:10,marginRight:10}}
        color="#67DBFF"
        onPress={() =>this.update_survey()}
      />
        </View>
       
        </ScrollView>
        </Modal>
    }

    }

    render() {

        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height ;
        let imagewidth = dimensions.width;


        return (
            <ScrollView>
                
             {this.renderscreen()}
      
            </ScrollView>

        );
    }
}
export default withNavigation(Profile);


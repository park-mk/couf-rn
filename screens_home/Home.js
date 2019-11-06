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
//import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import someList from '../components/anylist'
import *  as Font from 'expo-font'
import { ConfirmDialog,Dialog } from 'react-native-simple-dialogs';

import expo from '../app.json'


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
            alarmname:'',
            alarmed:false,
            alarmcontent:"In order to continue our hard work, we have encountered financial difficulties considering server fees.  Those who would like to support us, please click yes to donate. Thank you!",
            dialogVisible: false,
            checked:false,
            commentVisible:false,
            image:"",
            imagechange:0,
        };
    }
    updateview_t = () => {
    
       
 
        var d; 
        var s
        var usersRef = firebase.database().ref('visit/travel/count');
        usersRef.once('value', (snapshot) => {


            m = snapshot.val()

            console.log("트레블ㅇ", m);
            this.state.count_travel = m ;
        }, function (m) {
            
        }).then((m)=>{
            console.log("실행",this.state.count_travel)
            firebase.database().ref('visit/travel').update({
                count: this.state.count_travel+1
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
            this.state.count_ent = m ;
        }, function (m) {
            
        }).then((m)=>{
           
            firebase.database().ref('visit/ent').update({
                count: this.state.count_ent+1
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
            this.state.count_food = m ;
        }, function (m) {
            
        }).then((m)=>{
           
            firebase.database().ref('visit/food').update({
                count: this.state.count_food+1
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
            this.state.count_buy = m ;
        }, function (m) {
            
        }).then((m)=>{
           
            firebase.database().ref('visit/buy').update({
                count: this.state.count_buy+1
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
            this.state.count_youtube = m ;
        }, function (m) {
            
        }).then((m)=>{
           
            firebase.database().ref('visit/youtube').update({
                count: this.state.count_youtube+1
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
            this.state.count_suggestion = m ;
        }, function (m) {
            
        }).then((m)=>{
           
            firebase.database().ref('visit/suggestion').update({
                count: this.state.count_suggestion+1
            }, function () {
    
            }); 
        })
        this.props.navigation.navigate('SuggestionScreen')
    
    }








    async componentDidMount() {
        await Font.loadAsync({

            'Raley-balck': require('../assets/fonts/33676382891.ttf'),
            'Name-font': require('../assets/fonts/Nickainley-Normal_2.ttf'),

        });


    }


    _dataextract = () => {

        var usersRef = firebase.database().ref('Home');


        usersRef.on('value', (snapshot) => {


            var m = snapshot.val()


            this.setState({
                description1: m.p_1.description,
                description2: m.p_2.description,
                description3: m.p_3.description,
                description4: m.p_4.description,

                image1: m.p_1.image,
                image2: m.p_2.image,
                image3: m.p_3.image,
                image4: m.p_4.image,
            })
        });

        console.log(this.state.image1);
    }

    _keyExtractor = (item, index) => item.key;





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
                    var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
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

    check2 = () => { 
        if(this.state.alarmed==false){

        var m;

        var keys;
        console.log(expo.expo.version);
         
       
        var d;
        var usersRef = firebase.database().ref('version');
        usersRef.once('value', (snapshot) => {
            m = snapshot.val()

            console.log("현재 버젼 firebase", m);
            if (m != expo.expo.version) {

              //  alert("New version of the app is available. For more experience and better performance, please keep the app up to date!");
              
            } }).then(()=> {
                if(firebase.auth().currentUser!=null) { 
                    console.log(" 유저 로그인 상태  ")
                    var usersRef3 = firebase.database().ref('zalarm');
                    usersRef3.once('value', (snapshot) => {
                        m = snapshot.val()
                     //   alert(m.content);
                      console.log("현재 서버알람 ",m.name)

                       this.state.alarmname=m.name;
                       this.setState({ alarmcontent: m.content})
                    }).then((m)=>{
                        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
                        var usersRef2 = firebase.database().ref('userinfo/' + code + '/alarm');
                        usersRef2.once('value', (snapshot) => {
                            d = snapshot.val()
                            console.log("이거", d ,this.state.alarmname);
                          
                            
        
                        }).then(()=>
                        {
                            if(d==this.state.alarmname){
                                console.log("same", this.state.alarmname);
                                this.setState({ alarmed: true })

                            }
                            else{ 
                             
                            console.log("past alarm")
                              
                         this.Show_Custom_Alert();
                     
                            }
                        })
                   

    
                    });
                 //지워    
               
                }
                if(firebase.auth().currentUser==null) { 

                    this.Show_Custom_Alert();

                }
                

            });

           
           
         //   this.setState({ alarmed: true })
        }
    }

       notshow = () => {
        console.log('notshow')
        if(firebase.auth().currentUser!=null) { 
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        firebase.database().ref('userinfo/' + code).update({
             alarm:this.state.alarmname
        }, function () {

        });
    } 
    else alert("please login first");
        


    }

  
    Show_Custom_Alert() {
      console.log("setting visible")
        this.setState({ dialogVisible: true })
        this.setState({ alarmed: true })
      }
     Yespressed=()=>{
         console.log("yes")
        this.setState({ dialogVisible: false })
        Linking.openURL("https://www.paypal.me/coufKR?locale.x=ko_KR").catch((err) => console.error('An error occurred', err));

         if(this.state.checked){
             this.notshow();
         }
     }
     Nopressed=()=>{
        console.log("yno")
        this.setState({ dialogVisible: false })
        if(this.state.checked){
            this.notshow();
        }
    }
    saveValueFunction = (value) => {
        //function to save the value in AsyncStorage
        if(value==null){
          //To check the input not empty
          AsyncStorage.setItem('che', "e");
          //Setting a data to a AsyncStorage with respect to a key 
         // this.setState({ textInputData: '' })
          //Resetting the TextInput
          alert('Data Saved');
          //alert to confirm
          this.setState({commentVisible:true})
          
        }else{
          let dimensions = Dimensions.get("window");
          let imageheight = dimensions.height ;
          let imagewidth = dimensions.width;
        
        
           
    
    
         
        }
      };
      onClickComment = (value) => {
           if(this.state.imagechange==0){
            this.setState({
               imagechange: 1,
              });
           }
         else  if(this.state.imagechange==1){

            this.setState({
                imagechange: 2,
               });
        }
       else if(this.state.imagechange==2){
            this.setState({
                imagechange: 3,
               });
            
        }
       else if(this.state.imagechange==3){
            this.setState({
                imagechange: 4,
               });
            
        }
     else   if(this.state.imagechange==4){
           
            this.setState({
                commentVisible: value || !this.state.commentVisible,
              });
        }
       
      }; 

      getValueFunction = () => {
        let dimensions = Dimensions.get("window");
          let imageheight = dimensions.height ;
          let imagewidth = dimensions.width;
        //function to get the value from AsyncStorage
        AsyncStorage.getItem('che').then(value =>
          //AsyncStorage returns a promise so adding a callback to get the value
          this.saveValueFunction (value) 
          //Setting the value in Text 
          
        );
        return   <View>
        
         </View>
         
      };



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

      {this.getValueFunction()}
        this.check2();
         
        return (



            <View>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.commentVisible}
                  onRequestClose={() => {
                    console.log('Modal has been closed.');
                  }}>
                <View>
                    <TouchableOpacity
                     onPress={() =>this.onClickComment()}
                    >
         <Image
             style={{
                 width: imagewidth,
                 height: imageheight*5,
                 borderBottomWidth: 3,
             }}
             source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fabout%20us.png?alt=media&token=0cdfd383-1dd5-40f2-8d19-a1fb03904478" }}
    
         />
           </TouchableOpacity>
           </View>
                </Modal> 

                <Dialog
                    visible={this.state.dialogVisible}
                    title="DEAR USER"
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View>
                        <Text style={{ fontSize: 20, color: 'grey' }}>{this.state.alarmcontent}</Text>
                     
                            <CheckBox
                                center
                                title='NOT SHOW IT AGAIN.'
                                checked={this.state.checked}
                                onPress={() => this.setState({checked: !this.state.checked})}
                            />
                                <View
                       style={{flexDirection:'row'}}
                        >

                          <TouchableOpacity
                            onPress={() =>this.Nopressed()}
                                style={{
                                    marginLeft:60,  marginTop: 30
                                }}  >
                 <Text style={{fontSize:20,color:'#56B8FF'}}>NO</Text>
                        </TouchableOpacity>  

                            <TouchableOpacity
                             onPress={() =>this.Yespressed()}
                                style={{
                                    marginLeft:60, marginTop: 30
                                }}  > 
                                  
                 <Text style={{fontSize:20,color:'#56B8FF'}}>YES</Text>
                 
                        </TouchableOpacity>
                    </View>
                    </View>
                    
                </Dialog>
                {  /* <ConfirmDialog
                    title="Dear users"
                    message={" In order to continue our hard work, we have encountered financial difficulties considering server fees.  Those who would like to support us, please click yes to donate. Thank you!"}
                    visible={ this.state.dialogVisible}
                    onTouchOutside={() => this.setState({ dialogVisible: false })}
                    positiveButton={{
                        title: "YES",
                        onPress: () => Linking.openURL("https://www.paypal.me/coufKR?locale.x=ko_KR").catch((err) => console.error('An error occurred', err))
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => this.setState({ dialogVisible: false })
                    }}
                    positiveButton={{
                        title: "fuck",
                        onPress: () => alert("Yes touched!")
                    }}
                />*/}
                <StatusBar backgroundColor="blue" barStyle="dark-content" />



                <ScrollView style={{ marginTop: 0 }}>


                    <View style={{ flex: 1, marginTop: 0 }}>




                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() =>this.updateview_t()}
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
                            onPress={() =>this.updateview_e()}
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
                            onPress={() =>this.updateview_f()}
                        >


                            <Image
                                style={{
                                    width: imagewidth,
                                    height: imageheight,

                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FComponent%205-2.png?alt=media&token=638418c7-a696-4f2f-82a6-549d548b2338" }}
                            />


                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() =>this.updateview_b()}
                        //   onPress={()=> this.props.navigation.navigate('UNDEVELOP')}
                        >


                            <Image
                                style={{
                                    width: imagewidth,
                                    height: imageheight,
                                }}
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FComponent%208.png?alt=media&token=7660c171-a0f5-4a56-b6c9-7d7e17b28a23" }}
                            />


                        </TouchableOpacity>






                        <TouchableOpacity
                            style={{
                                marginBottom: 1,
                            }}
                            onPress={() =>this.updateview_y()}
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
                            onPress={() =>this.updateview_s()}
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





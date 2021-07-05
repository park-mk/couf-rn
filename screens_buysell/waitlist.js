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
} from 'react-native';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import firebase from "../firebase";
import call from 'react-native-phone-call';
import ImageSlider from 'react-native-image-slider';
import Icon from "../screens_suggestion/suggestionScreen";
import styled from "styled-components";
import ProgressLoader from 'rn-progress-loader';
import ImageBrowser from '../components/multiple-imagepicker/src/ImageBrowser';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'





//load the firebase.database in order to simplfy
database = firebase.database();

//tip of liFE
class WAITLIST extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            datasource: [],
            datalen:0,
            pause: false,
            error: null,
            refreshing: false,
            search: '',
            Search: '',
            images: '',
            toggleWriteForm: false,
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [],
            comment: '',
            show: ' ',
            title: '',
            loadVisible: false,
            commentVisible:false,
        };
    }

    // this function  refresh everytime information is changed
    componentDidMount() {
        console.log(this.state.search);
        this.makeRemoteRequest();
    }
    // real refresh function
    makeRemoteRequest = () => {

        if(firebase.auth().currentUser!=null){
        
        firebase.database().ref('userinfo/'+firebase.auth().currentUser.uid+'/waitlist').on('value', function (snapshot) {
            let returnVal = snapshot.val() || {};
            this.setState({ datasource: Object.values(returnVal).reverse() });
          
            console.log('this ??? ',Object.values(returnVal).reverse());
         
        }.bind(this), function (error) {
            console.error(error);
        });

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
            }

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
            Search: text,
        });
      
    };
    NavigateToWrite=()=>{

        if (firebase.auth().currentUser != null) {
        this.props.navigation.navigate('WRITE')}
        if (firebase.auth().currentUser == null) {
            alert("please login")}

    }

    Delete_keyword = async  (item)=>{
        console.log(item);
      
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token.data);
        //  alert(token);
        token1 = token.data.substring(18, 40)
        console.log('buyNsellwait/' + token1 +'waitlist/'+'wait_'+item.toUpperCase());
        firebase.database().ref('buyNsellwait/' + token1 +'/waitlist/'+'wait_'+item.toUpperCase()).remove();
        firebase.database().ref('userinfo/'+firebase.auth().currentUser.uid+'/waitlist/'+'WAIT_'+item.toUpperCase()).remove();
        
    }

    regist  = async  ()=>{


        console.log("notification")
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStauts = status;

        if (status != 'granted') {

            const { status } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            const { status2 } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status2 ? status2 : status;


        }


        if (finalStauts != 'granted') {
            alert("please  make sure you've allow the access of push alarm");
           return;
        }


        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token.data);
        //  alert(token);
        token1 = token.data.substring(18, 40)
        firebase.database().ref('buyNsellwait/'+token1+'/waitlist').once('value', function (snapshot) {
          
            let returnVal = snapshot.val() || {};
   
            console.log(Object.values(returnVal).length);
         
            let length_of_wait=""+Object.values(returnVal).length;
           
            firebase.database().ref('buyNsellwait/'+token1+'/waitlist/'+'wait_'+ this.state.Search.toUpperCase()).update({
                item:this.state.Search.toUpperCase(),
              
            }, function () {
              
                    firebase.database().ref('buyNsellwait/' + token1 +'').update({
                        name: firebase.auth().currentUser.displayName,
                        uid: token.data,
                
                    }, function () {
                   
                   
                    });
                  
                    console.log(token, "my name");
            

            });
         
         
        }.bind(this), function (error) {
            console.error(error);
        }).then(()=>{

            this.setState({
                Search:"",
            });
        })
      
      

    
      this.setState({
        commentVisible :false,

    });


        return true;
    }

    keywords_avaliable_check=()=>{
      
        console.log(this.state.Search[this.state.Search.length-1]);
        if(this.state.Search.length<3){
            alert("key word is too short!");
            return true;
        }
        if(this.state.Search[0]===' '){
            alert("plz don't start keyword with  spacebar");
            return true;
        }
        if(this.state.Search[this.state.Search.length-1]===' '){
            alert("plz don't end keyword with  spacebar");
            return true;
        }
        if(this.state.Search.includes(".")||this.state.Search.includes("/")||this.state.Search.includes("#")||this.state.Search.includes("$")||this.state.Search.includes("[")||this.state.Search.includes("]")){
            alert("keyword should not contains . # $ / [ ]  ");
            return true;

        }

        return false;
    }

    regist_avaliable_check = async () => {

        
        if(this.keywords_avaliable_check()){
            return;
        }
        else if(  firebase.auth().currentUser == null){
            alert("please login to regist your keywords THANK YOU");
            return;
        }
        else{
        firebase.database().ref('userinfo/'+firebase.auth().currentUser.uid+'/waitlist').once('value', function (snapshot) {
          
            let returnVal = snapshot.val() || {};
   
            console.log(Object.values(returnVal).length);
            let length_of_wait=""+Object.values(returnVal).length;
             if(length_of_wait>4){
                 alert("You can register up to 4 keywords.\n please delete one to register another.");
                 return;
             }
            let name='wait_'+this.state.Search
            name=name.toUpperCase();
            firebase.database().ref('userinfo/'+firebase.auth().currentUser.uid+'/waitlist/'+ name).update({
                item:this.state.Search.toUpperCase(),
                
            }, function () {
             
            });
         
         
        }.bind(this), function (error) {
            console.error(error);
        }).then((m)=>{
            console.log(Object.values(m).length);
             if(Object.values(m).length>4){
                console.log("bye");
             }
             else{
            this.regist();
             }
        }).then(()=>{

           

        })


    }

    };

    renderItem = ({ item }) => {
        let dimensions = Dimensions.get("window");
        let imageheight = 5 * dimensions.height / 10;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth = dimensions.width;

        return (
            <TouchableOpacity style={{ borderTopWidth: 1, borderColor: 'grey', borderRadius: 5 }}
                onPress={() => {  this.Delete_keyword( item.item)  }}



            >
                     <View style={{ flexDirection: "row" }}>
                <Text style={{ fontFamily: 'title-font', fontSize: 50, marginLeft: 20, marginTop: 10 }}>
                    {item.item}
                </Text>
                <Text style={{ color:'grey',fontFamily: 'title-font', fontSize: 20, marginLeft: 20, marginTop: 30 }}>
                    [delete]
                </Text>
                </View>
                <View style={{ flex: 1, marginBottom: 0, borderColor: 'black' }} >
                   

                </View>
            </TouchableOpacity>




        )



    }


    searchFilterFunction = text => {
        this.setState({
            search: text,
        });
        console.log(this.state.search)


        var usersRef = firebase.database().ref('comment/buyNsell');       //   bring the database tips
        usersRef.once('value', (snapshot) => {                     //    tips database resort

            var m = snapshot.val()
            var keys = Object.values(m);
            this.setState({
                datasource: keys                                   // datasource of list
            })
        }).then((m) => {



            const newData = this.state.datasource.filter(item => {
                const itemData = `${item.title.toUpperCase()} `;

                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });

            this.setState({ datasource: newData });
        })



       





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
              
                    commentVisible: value || !this.state.commentVisible,
           
            });
        
    };


    // start to draw whole screen
    render() {
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height ;
        let imagewidth = dimensions.width;

   
        return (
            // flat list data= datasoucr= firebase.tips        details please look upper
           
            <View>
                      <Modal
                // nno pressed 
                    animationType="slide"
                    transparent={true}
                    visible={this.state.commentVisible}
                    backdropColor = {'white'}
                    backdropOpacity = {0.5}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                        
                    <View
                         style={{
                            alignItems: 'center',
                            height:imageheight,
                            width:imagewidth,
                            backgroundColor: '#00000080',
                            justifyContent: 'center',

                        }}
                    >

                     <TouchableOpacity
                                onPress={() => this.onClickComment()}
                            >

                        <View
                            style={{
                                marginTop: 2.6 * imageheight / 8.5,
                                marginBottom: 3 * imageheight / 8.5,
                                marginLeft: imagewidth / 10,
                                marginRight:imagewidth/10,
                                backgroundColor: 'white',
                                height:imageheight*1.9/8,
                                width:imagewidth*8/10,
                                alignItems: 'center',
                                justifyContent: 'center',

                                }}>
                                <Text style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', fontFamily: 'title-font', fontSize: 30, marginTop: 3, color: '#67DBFF'
                                }}>
                                    KEYWORD
                       </Text>
                                <View style={{ flexDirection: "row" }}>
                  
                                    <TextInput  
                                        style={{ height: 30, width: 4 * imagewidth / 10,fontFamily: 'title-font', fontSize:25, marginTop: 27}}
                                        onChangeText={text => this.onChangeText1(text)}
                                        placeholder={"looking for..."}
                                        placeholderTextColor = "#c5c5c5"
                                        value={this.state.Search}
                                    />
                                                      <Image source={require('../assets/search.png')}

style={{ marginTop:33,width: 20, height: 20, marginLeft: -15, resizeMode: 'cover' }}
/>
                           </View>
                           <View
                           style={{borderColor:"#c5c5c5",borderWidth:1,width:30+4 * imagewidth / 10,height:1}}
                           ></View>
                           
                       <Text style={{  alignItems: 'center',
                                justifyContent: 'center',fontFamily: 'title-font', fontSize: 15, marginTop: 3 }}>
                           WE'LL LET LET YOU KNOW WHEN A NEW SELL IS UPLOADED
                       </Text>
                       <TouchableOpacity
                            onPress={() => this.regist()}
                        >
                            <Image source={require('../assets/submit.png')}

                                style={{marginTop:10, width: 60, height: 24 ,marginLeft:5*imagewidth / 10,resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                       

                            

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
                            onPress={() => this.props.navigation.navigate('BUYLIST')}
                        >
                            <Image source={require('../assets/back.png')}

                                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                    }
                   
                    backgroundColor={'#fff'}
                    borderBottomColor={'#fff'}
                    centerComponent={{ text: 'BUY & SELL', style: { fontFamily: 'title-font', fontSize: 40, marginLeft: 10, marginTop:17,color: '#67DBFF' } }}

                />
                <ScrollView>
                    <View horizontal={true}>

                    <View style={{ flexDirection: "row" }}>
                    <Image source={require('../assets/search.png')}

style={{ width: 24, height: 24, marginLeft: 10, marginTop:27,resizeMode: 'cover' }}
/>
                    <TextInput  
                                    style={{ marginLeft:30,height: 30, width: imagewidth-140,fontFamily: 'title-font', fontSize:25, marginTop: 27}}
                                    onChangeText={text => this.onChangeText1(text)}
                                    placeholder={"waiting for..."}
                                    placeholderTextColor = "#c5c5c5"
                                    value={this.state.Search}

                     />
                             <TouchableOpacity
                            onPress={() =>  this.regist_avaliable_check()} 
                        >
                            <Image source={require('../assets/submit.png')}

                                style={{ width: 60, height: 30, marginLeft: -15, marginTop:24,resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>

                    </View>
                    </View>
                    <Text style={{ color:'grey',fontFamily: 'title-font', fontSize: 18, marginLeft: 15, marginTop: 30 }}>
                    We provide the service that you will register a keyword and we will  give an alarm when another user posts a title or content containing  the keyword.
                    </Text>
                    
                    <FlatList
                        data={this.state.datasource}
                        // (item =  tips ) here
                        renderItem={this.renderItem}
                        keyExtractor={item => item.uid}
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
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 140, right: 20, }}>
                    <TouchableOpacity
                     onPress={() => this.NavigateToWrite()
                        
                       }
                    >
                     
                    </TouchableOpacity>
                </View>
              
            </View>

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


export default WAITLIST;

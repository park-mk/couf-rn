import React from 'react';

import {
    FlatList,
    Button,
    View,
    Text,
    ScrollView,
    Image,
    Dimensions,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    Linking,
    Modal,
    Alert,
    TextInput
} from 'react-native';

import {FlatListSlider} from 'react-native-flatlist-slider';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { Ionicons,MaterialIcons ,Entypo,Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from  '../components/Textedit'
import  firebase,{storage}  from "../firebase";
import Comment_b from '../components/comment_b'
import styled from "styled-components";
import Icon from 'react-native-vector-icons/FontAwesome';


const ProfileTopWrap = styled.View`
    display:flex;
    justify-content: space-between; 
    flex-direction: row;
    padding:0 20px;
    margin-top:30px;
`;
const ProfileTop = styled.View`
    display:flex;
    flex-direction: row;
    align-items:center;
    flex:1;
`;

const ProfileImage = styled.Image`
    width:35px;
    height:35px;
    border-radius: 17.5;
    margin-right:20px;
`;



class ITEM_B extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: [],
            up: 0,
            voted: false,
            comment:'',
            nickname:'',
            commentVisible: false,
            origin:" ",
            image_style:false,
            banned:false,
            korean:false,
           
        };
    }

  

    replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
      }

      reportData= () => {
        let dataObj = this.props.navigation.getParam('data', 'NO-ID');
        Alert.alert(
            'Report',
            'objectionable or abusive content here?',
            [
                {text: 'YES', onPress: () => {
                        //this.props.navigation.navigate('BUYLIST');

                        let ref = firebase.storage().ref();
                   
                       

            
                        var code = firebase.auth().currentUser.uid;
                        code=this.replaceAll(code,".","-");
                        code=this.replaceAll(code,"#","-");
                        code=this.replaceAll(code,"$","-");
                        code=this.replaceAll(code,"[","-");
                        code=this.replaceAll(code,"]","-");
                    
                        // let deleteData = firebase.database().ref().child('comment/buyNsell/'+dataObj.uid).update({
                        //     reported: 1,
                        // }, function () {
                        //         alert("THANK YOU FOR YOUR REPORT ,\n we will handle it soon")
                        // });
                        var count_time;
                        var usersRef = firebase.database().ref('comment/board/' + dataObj.uid+ '/report');
                        usersRef.once('value', (snapshot) => {
                
                
                            let m = snapshot.val()
                
                
                            count_time = m;
                        }, function (m) {
                
                        }).then((m) => {
                
                            firebase.database().ref('comment/board/' + dataObj.uid ).update({
                                report: count_time + 1
                            }, function () {
                                alert("THANK YOU FOR YOUR REPORT ,\n we will handle it soon")
                            });
                        })
                
                   


                     

                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );

    };
    
    deleteData= () => {
        let dataObj = this.props.navigation.getParam('data', 'NO-ID');
        Alert.alert(
            'Delete Popup',
            'Are you sure you want to delete this?',
            [
                {text: 'Delete', onPress: () => {
                        //this.props.navigation.navigate('BUYLIST');

                        let ref = firebase.storage().ref();
                        let deleteData = firebase.database().ref().child('comment/board/' + dataObj.uid );
                       

                        Promise.all([
                            
                         
                            deleteData.set(null)
                        ]).then(function(values) {
                            console.log('다지웠당 ',values);

                        }.bind(this)).catch((error) => {
                            console.log(error);

                        }).finally(function(){
                            this.props.navigation.navigate('BOARDLIST');

                        }.bind(this));

                        var code = firebase.auth().currentUser.uid;
                        code=this.replaceAll(code,".","-");
                        code=this.replaceAll(code,"#","-");
                        code=this.replaceAll(code,"$","-");
                        code=this.replaceAll(code,"[","-");
                        code=this.replaceAll(code,"]","-");
                    //     var usersRef0 = firebase.database().ref('userinfo/' + code + '/user_buysell');
                    //     usersRef0.once('value', (snapshot) => {
                    //         var m = snapshot.val()
                    //         this.setState({ origin: m })
                    //         //  console.log(this.state.origin);
                    //     }).then((m)=>{
                    //         var change1 = "," + dataObj.uid;
                    //         var change2 = this.state.origin.replace(change1, '');
                    //          this.setState({ origin: change2})


                    //     }).then(()=>{
                    //     firebase.database().ref('userinfo/' + code).update({

                    //         user_buysell: this.state.origin,
                    //     }, function () {

                    //     });
                    
                    // });




                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );

    };


    renderItem = ({ item,i }) => {
        console.log("!!!!!!!!!!!",i);
        let dimensions=Dimensions.get("window");
        let imageheight=5*dimensions.height/10;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth = dimensions.width;
    
        console.log(" draw it ",item);
        
        return (
            <TouchableOpacity
            onPress={() => this.setState({image_style:!this.state.image_style})}
            >
            <View
              style={{borderWidth:0.4,borderColor:'white',}}
            //    style={{borderWidth:2,borderColor:'#67DBFF',borderRadius:10}}
            >
             

                <Image style={{height:imagewidth ,width:imagewidth}} source={{ uri:item}} />

           
            </View>

            </TouchableOpacity>



        )



    }

    renderbutton()  {
        let dimensions=Dimensions.get("window");
        let imageheight=5*dimensions.height/10;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth = dimensions.width;
        const { navigation } = this.props;
        const useremail = navigation.getParam('useremail', 'NO-ID');
        if(firebase.auth().currentUser!=null&&  useremail ==firebase.auth().currentUser.email){
        return (

          
                    <Button type="clear" title="delete" color="#67DBFF"
                            icon={<Icon name="trash" size={15} color="black"/>}
                            onPress={() => this.deleteData()}
                    />

                



        )
        

         }
        else if(firebase.auth().currentUser!=null&&  useremail !=firebase.auth().currentUser.email){
            return (
    
              
                        // <Button type="clear" title="REPORT!" color="red"
                        //          size={10}
                        //         icon={<Icon name="report" size={10} color="black"/>}
                        //         onPress={() => this.reportData()}
                        // />
    
                      <View>
                      <MaterialIcons
                        onPress={() => this.reportData()}
                      name="report-problem" size={30} color="black" />
                      </View>
                
    
    
    
            )}
         else return;



    }
    componentDidMount() {
        console.log(this.state.search);
      
        this.makeRemoteRequest();
    }
    // real refresh function
    makeRemoteRequest = () => {
        if(firebase.auth().currentUser!=null){
        firebase.database().ref('userinfo/'+firebase.auth().currentUser.uid).on('value', function (snapshot) {
            let returnVal = snapshot.val(); //|| {};
            if(returnVal!=null){
                if(returnVal["nickname"]!=null){
                this.setState({ nickname: returnVal["nickname"]});
                }
                else{
                    this.setState({ nickname:"anonymous"});
                }
                 }
                 else{
                    this.setState({ nickname:"anonymous"});
                 }
        }.bind(this), function (error) {
            console.error(error);
        });
       // banned user
       var usersRef = firebase.database().ref('zpushalarm/suspension');
       usersRef.on('value', (snapshot) => {
         var m = snapshot.val()
       
        
         var lists = Object.values(m);
            console.log(lists);
            var user_uid=firebase.auth().currentUser.uid;
           console.log( lists.includes(user_uid),user_uid,"aaa");
            if(lists.includes(user_uid)){
                this.setState({banned:true})
            }
   
    
   
       });
       firebase.database().ref('zpushalarm').on('value', function (snapshot) {
        let korean = snapshot.val(); //|| {};
        console.log(korean.korean_c);
        this.setState({korean:korean.korean_c})
    }.bind(this), function (error) {
        console.error(error);
    });

    }
    }
    // createData=()=> {
    //     let user = firebase.auth().currentUser;
    //     let post_uid = this.props.navigation.getParam('uid', 'NO-ID');
    //     let newPostKey = firebase.database().ref().child('comment/board'+post_uid+'/comments').push().key;
    //     let createData = {
    //         content: this.state.comment,
    //         user: user.uid,
    //         uid:  newPostKey,
    //         useremail:user.email,
    //         displayName:user.displayName,
    //         timestamp:Date.now(),
    //         tags:{},
    //     };

    //     createData.tags[post_uid] = true;

    //     firebase.database().ref('comment/'+'board'+'/'+post_uid+'/'+'comments/'+newPostKey).set(createData).then(function(){
    //         // this.uploadImage(this.state.image, 'test-image');
            
    //         this.clearData();
    //     }.bind(this));
    // };

    
    clearData=()=>{
      this.setState({comment:' '})
     
    }
    changecomment=(con)=>{
        this.setState({comment:con})
      }






    render() {
        let dimensions = Dimensions.get("window");
        let imageheight = 6 * dimensions.height / 10

        let imagewidth = dimensions.width;
        const { navigation } = this.props;
        const imageUrl = navigation.getParam('imageUrl', () => { });
        const imageobj = {};
      
        // const imageArray=[]
        // for (let i = 0; i < imageUrl.length; i++) {
        //     imageobj["image"] = imageUrl[i];
        //     imageArray.push( imageobj);
        // }


        const content = navigation.getParam('content', 'NO-ID');

        const displayName = navigation.getParam('displayName', 'NO-ID');
        const photoURL = navigation.getParam('photoURL', 'NO-ID');
        const nickname = navigation.getParam('nickname', 'NO-ID');

        const post_uid= navigation.getParam('uid', 'NO-ID');
        const location = navigation.getParam('location', 'NO-ID');

        const title = navigation.getParam('title', 'NO-ID');
        const price = navigation.getParam('price', 'NO-ID');
        const contact = navigation.getParam('contact', 'NO-ID');
        const useremail = navigation.getParam('useremail', 'NO-ID');





        return (

            <View>

                <Header
                    height={80}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('BOARDLIST')}
                        >
                            <Image source={require('../assets/back.png')}

                                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                    }
                 
                    backgroundColor={'#fff'}
                    borderBottomColor={'#fff'}
                    centerComponent={{ text: 'BOARD', style: { fontFamily: 'title-font', fontSize: 40, marginLeft: 10, marginTop: 17, color: '#67DBFF' } }}

                />


                <ScrollView>

       

         

                             
                         
                        <View
                        style={{alignItems:'flex-end' , marginTop:25,marginRight:20 }}
                        >
                            { this.renderbutton()}
                        </View>


                    
   
                    <Text   style={{fontFamily:'title-font' ,fontSize:30, marginLeft:20,marginTop:-20}}>
                        {title}
                    </Text>

                    <Text   style={{fontFamily:'content-font' ,fontSize:18, marginLeft:20,marginTop:10,color:'grey'}}>
                        {content}
                    </Text>
                    <Text style={{ fontFamily: 'content-font', fontSize: 15,marginLeft:20,color:'grey' }}>
                                    {"POST BY : "+nickname}
                            </Text>
                  

                    {/* <FlatListSlider
                        data={imageArray}
                        height={imagewidth}
                        onPress={item => alert(JSON.stringify(item))}
                        renderItem={this.renderItem}
                        timer={99999999}
                        keyExtractor={item => item}

                    /> */}
                    <SafeAreaView style={{flex: 1}}>
                    <FlatList
                            data={imageUrl}
                            horizontal={false}
                            renderItem={this.renderItem}
                            keyExtractor={item => item}

                        />
                    </SafeAreaView>
                  
                    <View
                     style={{height:30}}
                    ></View>
                    { this.state.banned && 
                    <View>

                        <Text> 
                        Sorry, you have been banned from posting and writing comments for a while. If it lasts more than 1~2 weeks, please contact us through contactus.
                        </Text>
                        <Comment_b
                        type={'board'}
                        tag={post_uid}
                        uid={post_uid}
                        banned={this.state.banned}
                        nickname={this.state.nickname}
                        imagewidth={imagewidth}
                    />
                    </View>
                    ||
                    <Comment_b
                        type={'board'}
                        tag={post_uid}
                        uid={post_uid}
                        korean={this.state.korean}
                        banned={this.state.banned}
                        nickname={this.state.nickname}
                        imagewidth={imagewidth}
                    />
                     }

                    <View style={{height:130}} >
              

                    </View>







                </ScrollView>
            </View>
        );
    }
}


export default  ITEM_B;
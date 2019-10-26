import React from 'react';
import {  Text, View ,StyleSheet, Image,TouchableHighlight,Dimensions} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer,  withNavigation} from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CHOSEarea from '../components/areachoose'
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import ProgressLoader from 'rn-progress-loader';

const wrapper = {
    padding: '5%'
};
const styles = StyleSheet.create({
    backgroundImage:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: null,
        height: null,
        opacity:0.5,
        resizeMode: 'cover',
    },
    wrapper:{
        display: 'flex',
        paddingLeft: wrapper.padding,
        paddingRight: wrapper.padding,
    },
    loginWrapper: {
        display:'flex',
        justifyContent:'center',
        height:'30%',
    },
    loginLogo: {
        textAlign:'center',
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


    constructor(props){
        super(props)


        this.state=({
            email: '',
            password: '',
            data:[],
            area:"MY AREA",
            currentarea:0,
            currentarea1:0,
            loadVisible:false,

        })
    }
    componentDidMount() {


        // Toggle the state every second
        setInterval(
            () => this.setState({ currentarea1:this.state.currentarea }),
            1000
        );



        this.makeRemoteRequest();

    }

    makeRemoteRequest = () => {

        this.renderScreen()


    };
    choosearea = () => {


        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

        firebase.database().ref('userinfo/' + code ).update({

            area:null,
        }, function () {

        });


    };

    loading(){
        /* TODO : rendering 을 계속하는 함수 나중에 따로 뺴는게 좋을듯 */
        // console.log(this.state.currentarea,"current area")
        var m;
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

        var usersRef = firebase.database().ref('userinfo/'+code+'/area');


        usersRef.on('value', (snapshot) => {


            m = snapshot.val()



            this.state.currentarea=m;

            //  this.setState({ currentarea: m});
            // console.log("here,,m",m);
        })
    }
    renderScreen() {

        //  await loading();
        //console.log("this.state.currentarea",this.state.currentarea);
        if(this.state.currentarea1===0){

            return ;
        }
        if(this.state.currentarea1==null){

            return <CHOSEarea/>
        }
        if(this.state.currentarea1===1){


            return  <Image  style={{ resizeMode:'cover', marginLeft:18,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%201.png?alt=media&token=71eadde1-f1b7-4ecd-b7c6-8ab0e62ab502"}} />

        }
        if(this.state.currentarea1===2) {

            return  <Image  style={{ resizeMode:'cover', marginLeft:18,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%202.png?alt=media&token=364cf838-d93a-4183-bcbb-f456105f766d"}} />

        }
        if(this.state.currentarea1===3)
            return  <Image  style={{ resizeMode:'cover', marginLeft:18,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%203.png?alt=media&token=1b8a44d2-4dfc-437d-8e5a-9ff0d8a36f0a"}} />

        if(this.state.currentarea1===4)
            return  <Image  style={{ resizeMode:'cover', marginLeft:18,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%204.png?alt=media&token=9f42a327-15cd-433f-9fe7-df89cb418525"}} />




    }

    _uploadImage = async (uri, imageName) => {
        if(!uri) return true;
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

        console.log(result);

        if (!result.cancelled) {
            this.setState({loadVisible:true});
            this._uploadImage(result.uri).then((response)=>{
                return firebase.storage().ref('user').child(firebase.auth().currentUser.uid).getDownloadURL();
            }).then((response)=>{
                console.log('download url', response);
                return firebase.auth().currentUser.updateProfile({
                    photoURL:response
                });
            }).finally(()=>{
                this.setState({loadVisible:false});
            });
        }
    };

    render() {
        return (
            <View    style={ {  marginTop:60}} >
                <ProgressLoader
                    visible={this.state.loadVisible}
                    isModal={true} isHUD={true}
                    color={"#000000"}
                    barHeight={80}
                />

                <ProfileTopWrap>
                    <ProfileTopImage onPress={()=>{this.changeImage()}}>
                        <ProfileImage source={{ uri:firebase.auth().currentUser.photoURL }} />
                    </ProfileTopImage>
                    <ProfileTopRight>
                        <Text style={ {color:'#56B8FF', fontFamily:'title-font',fontSize:28} }>
                            {firebase.auth().currentUser.displayName}
                        </Text>
                        <Text style={ {color:'black', fontFamily:'content-font',fontSize:18} }>
                            {firebase.auth().currentUser.email}
                        </Text>

                    </ProfileTopRight>
                </ProfileTopWrap>

                <View style={{flexDirection:'row'}}>
                    <Text style={ { fontFamily:'title-font',marginTop:60,fontSize:30,marginLeft:18 } }> {this.state.area}</Text>
                    <TouchableOpacity
                        onPress={()=>this.choosearea()
                        }
                    >
                        <Text style={ { fontFamily:'title-font',color:'grey',marginTop:70,fontSize:20,marginLeft:80} }> change..</Text>
                    </TouchableOpacity>
                </View>
                {  this.loading()}
                {this.renderScreen()}
                <Text style={ {color:'#56B8FF', fontFamily:'content-font',marginTop:60,fontSize:18,marginLeft:18 } }> liked places,food,etc</Text>

                <Text style={ {color:'#56B8FF', fontFamily:'content-font',fontSize:18,marginLeft:18 } }> personal area preference</Text>

                <Text style={ {color:'#56B8FF', fontFamily:'content-font',fontSize:18,marginLeft:18 } }> short cuts and more to come!</Text>

            </View>

        );
    }
}
export default  withNavigation(Profile);


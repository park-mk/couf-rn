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
    Alert
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { Ionicons,MaterialIcons ,Entypo,Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from  '../components/Textedit'
import  firebase,{storage}  from "../firebase";
import Comment from '../components/comment'
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



class ITEM extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: [],
            up: 0,
            voted: false,
            commentVisible: false,
            origin:" ",
        };
    }

    deleteData= () => {
        let dataObj = this.props.navigation.getParam('data', 'NO-ID');
        Alert.alert(
            'Delete Popup',
            'Are you sure you want to delete this?',
            [
                {text: 'Delete', onPress: () => {
                        //this.props.navigation.navigate('BUYLIST');

                        let ref = firebase.storage().ref();
                        let deleteData = firebase.database().ref().child('comment/buyNsell/'+dataObj.uid);
                       

                        Promise.all([
                            dataObj.images.map((item) => ref.child("buyNsell/"+item).delete()),
                            deleteData.set(null)
                        ]).then(function(values) {
                            console.log('다지웠당 ',values);

                        }.bind(this)).catch((error) => {
                            console.log(error);

                        }).finally(function(){
                            this.props.navigation.navigate('BUYLIST');

                        }.bind(this));

                        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
                        var usersRef0 = firebase.database().ref('userinfo/' + code + '/user_buysell');
                        usersRef0.once('value', (snapshot) => {
                            var m = snapshot.val()
                            this.setState({ origin: m })
                            //  console.log(this.state.origin);
                        }).then((m)=>{
                            var change1 = "," + dataObj.uid;
                            var change2 = this.state.origin.replace(change1, '');
                             this.setState({ origin: change2})


                        }).then(()=>{
                        firebase.database().ref('userinfo/' + code).update({

                            user_buysell: this.state.origin,
                        }, function () {

                        });
                    
                    });




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


    renderItem = ({ item }) => {
        let dimensions=Dimensions.get("window");
        let imageheight=5*dimensions.height/10;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth = dimensions.width;

        return (

            <View
                style={{borderWidth:2,borderColor:'#67DBFF',borderRadius:10}}
            >

                <Image style={{height:imageheight,width:imagewidth }} source={{ uri: item }} />



            </View>





        )



    }








    render() {
        let dimensions=Dimensions.get("window");
        let imageheight=6*dimensions.height/10

        let imagewidth =dimensions.width;
        const { navigation } = this.props;
        const  imageUrl = navigation.getParam('imageUrl', ()=>{});
        const content= navigation.getParam('content', 'NO-ID');

        const displayName = navigation.getParam('displayName', 'NO-ID');
        const photoURL = navigation.getParam('photoURL', 'NO-ID');


        const location=navigation.getParam('location', 'NO-ID');

        const title = navigation.getParam('title', 'NO-ID');
        const price = navigation.getParam('price', 'NO-ID');
        const contact = navigation.getParam('contact', 'NO-ID');
        const useremail = navigation.getParam('useremail', 'NO-ID');





        return (

            <View>

                <Header
                    leftComponent={
                        <TouchableOpacity
                            onPress={()=> this.props.navigation.navigate('BUYLIST')}
                        >
                            <Image source={require('../assets/back.png')}

                                   style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
                            />
                        </TouchableOpacity>
                    }
                    backgroundColor={'#fff'}
                    borderBottomColor={'#fff'}
                    centerComponent={{ text: 'BUY & SELL', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#67DBFF' } }}

                />


                <ScrollView>
                    <TouchableHighlight>

                        <ProfileTopWrap>
                            <ProfileTop>
                                <ProfileImage source={{ uri: photoURL }} />
                                <Text style={{ fontFamily: 'title-font', fontSize: 18 }}>
                                    {displayName}
                                </Text>
                            </ProfileTop>

                            { (useremail === firebase.auth().currentUser.email) &&
                                <Button type="clear" title="delete"
                                        icon={<Icon name="trash" size={15} color="black"/>}
                                        onPress={() => this.deleteData()}
                                />
                            }


                        </ProfileTopWrap>
                    </TouchableHighlight>
                    <Text   style={{fontFamily:'title-font' ,fontSize:30, marginLeft:20,marginTop:10}}>
                        {title}
                    </Text>
                    <Text   style={{fontFamily:'content-font' ,fontSize:18, marginLeft:14,color:'green'}}>
                        {'$'+price}
                    </Text>
                    <Text   style={{fontFamily:'content-font' ,fontSize:20, marginLeft:20,marginTop:10}}>
                        {location}
                    </Text>

                    <Text   style={{fontFamily:'content-font' ,fontSize:18, marginLeft:20,marginTop:10,color:'grey'}}>
                        {contact}
                    </Text>
                    <FlatList
                        data={imageUrl}
                        horizontal={true}
                        renderItem={this.renderItem}
                        keyExtractor={item => item}

                    />




                    <Text   style={{fontFamily:'content-font' ,fontSize:20, marginLeft:20,marginTop:10}}>
                        {content}
                    </Text>




                    <View style={{height:130}} >

                    </View>







                </ScrollView>
            </View>
        );
    }
}


export default  ITEM;
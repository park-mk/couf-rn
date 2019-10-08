import React from 'react';
import {Image, Text, TextInput, View, FlatList, CameraRoll, Modal, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
// import ImagePicker from 'react-native-image-picker';
import { ImagePicker } from 'expo';
import CommentList from '../components/commentList'
// import admin from 'firebase-admin';
// import Comment from '../components/comment'

class SuggestionScreen extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            page:0,
            listSize:10,
            suggestion:'',
            lists:[],
            modify:{},
            fetching: true,
            isFetching: false,
            toggleWriteForm : false,
        })
        this.setData();
        this.base64Data = '';
        this.onRefresh = this.onRefresh.bind(this);
/*
        admin.auth().createUser({
            email: 'user@example.com',
            emailVerified: false,
            phoneNumber: '+11234567890',
            password: 'secretPassword',
            displayName: 'John Doe',
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false
        })
            .then(function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully created new user:', userRecord.uid);
            })
            .catch(function(error) {
                console.log('Error creating new user:', error);
            });

*/
    }

    deleteData= (key) => {
        /* TODO : 지울지 말지 확인창 띄우기 */
        firebase.database().ref().child('comment/suggestion/'+key).set(null);
        this.setData();
    };

    setData = () => {
        this.getData().then(function(response){
            this.setState({
                lists:  response,
                isFetching: false,
            })
        }.bind(this));
    };

    getData = () => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('comment/suggestion').on('value', function (snapshot) {
                let returnVal =  snapshot.val() || {};
                resolve(Object.values(returnVal).reverse());
            }.bind(this),function(error){
                reject(error);
            });
        });
    };

    onRefresh() {
        this.setState({ isFetching: true });
        this.setData();
    }

    changeComment=(suggestion) => {
        this.setState({suggestion: suggestion});
    };

    createData=()=> {
        if(!this.state.suggestion) return;
        let user = firebase.auth().currentUser;
        let newPostKey = firebase.database().ref().child('comment/suggestion').push().key;
        let createData = {
            content: this.state.suggestion,
            user: user.uid,
            uid: newPostKey,
            useremail:user.email,
            displayName:user.displayName,
            timestamp:Date.now(),
            tags:{
                'suggestion':true
            },
        };

        firebase.database().ref('comment/suggestion/'+ newPostKey).set(createData).then(function(){
            // this.uploadImage(this.state.image, 'test-image');
            this.onRefresh();
            this.clearData();
        }.bind(this));
    };
    clearData = () => {
        this.setState({
            suggestion: '',
        });
        this.toggleWriteForm();
    };

    toggleWriteForm = () => {
        this.setState({toggleWriteForm : !this.state.toggleWriteForm})
    }

    render(url) {
        return (
            <Wrap style={{flex:1}} keyboardVerticalOffset={70} behavior="padding">
                <Text
                    style={{fontFamily:'title-font' ,fontSize:25,marginLeft:10, }}
                >Please leave your suggestions  or the infromation you want to know for our app</Text>
                <Lists>
                    <CommentList
                        lists={this.state.lists}
                        onRefresh={this.onRefresh}
                        fetching={this.state.isFetching}
                        deleteData={this.deleteData}
                    />
                </Lists>
                <Form>
                    { this.state.toggleWriteForm && firebase.auth().currentUser &&
                    <View>
                        <SuggestionInput
                            multiline={true}
                            onChangeText={(suggestion) => this.changeComment(suggestion)}
                            value={this.state.suggestion}
                            placeholder='Input your suggestion'
                            numberOfLines={6}
                        />
                        <Buttons style={{alignSelf: 'flex-end'}}>
                            <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                                    icon={<Icon name="close" size={15} color="grey"/>}
                                    onPress={() => this.clearData()}
                            />
                            <Button type="solid" buttonStyle={{width: 50}}
                                    icon={<Icon name="check" size={15} color="white"/>}
                                    onPress={() => {
                                        this.createData();
                                    }}
                            />
                        </Buttons>
                    </View>
                    }
                    {!this.state.toggleWriteForm && firebase.auth().currentUser &&
                    <View>
                        <Buttons style={{alignSelf: 'flex-end'}}>
                            <Button type="solid" buttonStyle={{width: 50}}
                                    icon={<Icon name="pencil" size={15} color="white"/>}
                                    onPress={() => {
                                        this.toggleWriteForm();
                                    }}
                            />
                        </Buttons>
                    </View>
                    }
                </Form>
            </Wrap>
        );
    }
}

const Wrap = styled.KeyboardAvoidingView`
  display:flex;
`
const Lists = styled.View`
  flex:1;
`
const Form = styled.View`
  padding : 10px
  margin-bottom: 10px;
`
const SuggestionInput = styled.TextInput`
  border:3px solid grey;
  margin-bottom: 5px;
  padding:10px;
`
const Buttons = styled.View`
  display:flex;
  flex-direction: row;
`

export default SuggestionScreen;
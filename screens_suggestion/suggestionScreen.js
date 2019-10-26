import React from 'react';
import {Image, Text, TextInput, View, FlatList, CameraRoll, Modal, KeyboardAvoidingView, Alert } from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
import CommentList from '../components/commentList'
// import Comment from '../components/comment'
import * as ImagePicker from 'expo-image-picker';
import ProgressLoader from 'rn-progress-loader';

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
            image: null,
            loadVisible : false,
        })
        this.setData();
        this.base64Data = '';
        this.onRefresh = this.onRefresh.bind(this);

        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

    }

    deleteData= (key) => {
        Alert.alert(
            'Delete Popup',
            'Are you sure you want to delete this?',
            [
                {text: 'Delete', onPress: () => {
                        let ref = firebase.storage().ref().child("suggestion/"+key);
                        let deleteData = firebase.database().ref().child('comment/suggestion/'+key);

                        Promise.all([ref.delete(), deleteData.set(null)]).then(function(values) {
                            console.log(values);

                        }).catch((error) => {
                            console.log(error);
                        });
                        this.setData();

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

    setData = () => {
        this.getData().then(function(response){
            this.setState({
                lists:  response,
                isFetching: false,
            });
        }.bind(this));
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    uploadImage = async (uri, imageName) => {
        if(!uri) return true;
        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child("suggestion/" + imageName);
        return ref.put(blob);
    };


    setImageData = (data) => {
        return new Promise((resolve, reject) => {
            if(!data.image) resolve(true);
            firebase.storage().ref('suggestion').child(data.image).getDownloadURL().then(url => {
                data.imageUrl = url;
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    getData = () => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('comment/suggestion').on('value', function (snapshot) {
                let returnVal =  snapshot.val() || {};
                return resolve(Object.values(returnVal).reverse());
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
            photoURL:user.photoURL,
            timestamp:Date.now(),
            image: this.state.image ? newPostKey : null,
            imageUrl : null,
            tags:{
                'suggestion':true
            },
        };

        this.setState({loadVisible:true});
        this.uploadImage(this.state.image, newPostKey).then(function(){
            return this.setImageData(createData);

        }.bind(this)).then((response)=>{
            return firebase.database().ref('comment/suggestion/'+ newPostKey).set(createData);

        }).then(function(){
            this.onRefresh();
            this.clearData();

        }.bind(this)).catch((error) => {
            console.log('error',error);
        }).finally(() => {
            this.setState({loadVisible:false});
            console.log('final');
        });
    };
    clearData = () => {
        this.setState({
            suggestion: '',
            image: null,
        });
        this.toggleWriteForm();
    };

    toggleWriteForm = () => {
        this.setState({toggleWriteForm : !this.state.toggleWriteForm})
    }

    render(url) {
        return (
            <Wrap style={{flex:1}} keyboardVerticalOffset={70} behavior="padding">
                <ProgressLoader
                    visible={this.state.loadVisible}
                    isModal={true} isHUD={true}
                    color={"#000000"}
                    barHeight={80}
                />
                <Text
                    style={{fontFamily:'title-font' ,fontSize:25,marginLeft:10, }}
                >Please leave your suggestions  or the infromation you want to know for our app</Text>
                <Lists>
                    <CommentList
                        type={'suggestion'}
                        lists={this.state.lists}
                        onRefresh={this.onRefresh}
                        fetching={this.state.isFetching}
                        deleteData={this.deleteData}
                    />
                </Lists>
                <Form>
                    { this.state.toggleWriteForm && firebase.auth().currentUser &&
                    <View>
                        <WrapTextInput>
                            {this.state.image &&
                            <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                            <TextInput
                                multiline={true}
                                onChangeText={(suggestion) => this.changeComment(suggestion)}
                                value={this.state.suggestion}
                                placeholder='Input your suggestion'
                                numberOfLines={6}
                                textAlignVertical='top'
                            />
                        </WrapTextInput>
                        <Buttons style={{alignSelf: 'flex-end'}}>
                            <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                                    icon={<Icon name="close" size={15} color="grey"/>}
                                    onPress={() => this.clearData()}
                            />
                            <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                                    icon={<Icon name="camera" size={15} color="grey"/>}
                                    onPress={() => this._pickImage()}
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

export default SuggestionScreen;
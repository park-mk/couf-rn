import React from 'react';
import {Image, Text, TextInput, View, FlatList, CameraRoll} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
// import ImagePicker from 'react-native-image-picker';
import { ImagePicker } from 'expo';
import CommentList from '../components/commentList'

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
            isNeedReLoad: false,
        })
        // this.setData();
        this.base64Data = '';
    }
    createData=(suggestion)=> {
        this.setState({suggestion:  ''});
        let userId = firebase.auth().currentUser.uid;
        let newPostKey = firebase.database().ref().child('comment/suggestion').push().key;
        firebase.database().ref('comment/suggestion/'+ newPostKey).set({
            content: suggestion,
            user: userId,
            uid: newPostKey,
            useremail:firebase.auth().currentUser.email,
            timestamp:Date.now(),
        }).then(function(){
            // this.uploadImage(this.state.image, 'test-image');
            this.setState({isNeedReLoad:  !this.state.isNeedReLoad});
            this.clearData();
        }.bind(this));
    };

    onEndReached = () => {
        firebase.database().ref('suggestion').limitToFirst(1).on('value', function(snapshot) {
            // console.log(snapshot);
        });
    };

    urlToBlob = (url) => {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve(xhr.response);
                }
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob'; // convert type
            xhr.send();
        })
    };

    uploadImage = async (uri, imageName) => {
        /*

                firebase.storage().ref().put(uri).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                });
        */

        let base64Img = `${this.base64Data}`;
        this.urlToBlob(base64Img)
            .then(blob => {
                console.log(blob);
                firebase.storage().ref().put(blob,{contentType: 'image/jpeg'});
            });
        /*
                let dataUrl = uri.toDataURL();
                let blob = this.dataURItoBlob(dataUrl);
                return firebase.storage().ref().put(blob,{contentType: 'image/jpeg'});
        */
        /*
                firebase.storage().ref().putString(uri, 'data_url').then(function(snapshot) {
                    console.log('Uploaded a data_url string!', snapshot);
                });
        */
        /*
                const formData = new FormData();
                formData.append('image',{
                    uri:uri,
                    mime:'image/jpeg',
                    name:`my-image`
                })

                const config = {
                    method: 'POST',
                    body: formData,
                };

                console.log('킁카킁카 화난다',uri);
                const response = await fetch(uri, config);
                const blob = await response.blob();
                // let ref = firebase.storage().ref().child("my-image");
                return firebase.storage().ref().put(blob,{contentType: 'image/jpeg'});
        */
    };

    clearData = () => {
        this.setState({
            suggestion: null,
            image: null,
        })
    };

    getImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });

        if (!result.cancelled) {
            console.log(Object.keys(result));
            this.base64Data =  result.base64;
            this.uploadImage(result.uri);
            this.setState({
                image: result.uri,
            });
        }
    };
    render(url) {
        return (
            <View style={{flex:1}}>
                <Form>
                    <SuggestionInput
                        {...this.props}
                        multiline = {true}
                        editable = {true}
                        onChangeText={(suggestion) => this.setState({suggestion})}
                        value={this.state.suggestion}
                        placeholder='Input your suggestion'
                    />
                    <Buttons style={{alignSelf: 'flex-end'}}>
                        <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                                icon={<Icon name="camera" size={15} color="grey"/>}
                                onPress={() => this.getImage()}
                        />
                        <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                                icon={<Icon name="close" size={15} color="grey"/>}
                                onPress={() => this.clearData()}
                        />
                        <Button type="solid" buttonStyle={{width: 50}}
                                icon={<Icon name="check" size={15} color="white"/>}
                                onPress={()=>this.createData(this.state.suggestion)}
                        />
                    </Buttons>
                    <Text>{this.state.image}</Text>
                    {this.state.image &&
                    <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                </Form>

                <CommentList type={'suggestion'}
                             reload={this.state.isNeedReLoad}
                />

            </View>
        );
    }
}

const Form = styled.View`
  padding : 10px
  margin-bottom: 10px;
`
const SuggestionInput = styled.TextInput`
  border-bottom-width: 3px;
  border-bottom-color: green;
  margin-bottom: 5px;
`
const Buttons = styled.View`
  display:flex;
  flex-direction: row;
`
const DateForm = styled.Text`
    font-size: 12;
    color: #ccc;
`
const Content = styled.Text`
    color:black;   
`



export default SuggestionScreen;
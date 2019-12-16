import React from 'react';
import {Image, Text, TextInput, View, CameraRoll} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
// import ImagePicker from 'react-native-image-picker';
import { ImagePicker } from 'expo';
import CommentList from '../components/commentList'
import CommentForm from '../components/commentForm'


class Comment extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            lists:[],
            image:'',
            comment:'',
            modify:{},
            isFetching: true,
        })
        this.onRefresh = this.onRefresh.bind(this);
        this.base64Data = '';
        this.setData();

    }

    setData = () => {
        this.getData().then(function(response){
            this.setState({
                lists:  response,
                isFetching: false,
            })
        }.bind(this));
    };

    onRefresh() {
        this.setState({ isFetching: true });
        this.setData();
    }

    getData = () => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('comment/'+this.props.type).orderByChild('tags/'+this.props.tag).equalTo(true).on('value', function (snapshot) {
                let returnVal =  snapshot.val() || {};
                resolve(Object.values(returnVal).reverse());
            }.bind(this),function(error){
                reject(error);
            });
        });
    };

    deleteData= (key) => {
        /* TODO : 지울지 말지 확인창 띄우기 */
        firebase.database().ref().child('comment/'+this.props.type+'/'+key).set(null);
        this.setData();
    };

    createData=()=> {
        let user = firebase.auth().currentUser;
        let newPostKey = firebase.database().ref().child('comment/'+this.props.type).push().key;
        let createData = {
            content: this.state.comment,
            user: user.uid,
            uid: newPostKey,
            useremail:user.email,
            displayName:user.displayName,
            timestamp:Date.now(),
            tags:{},
            thumbNail:user.photoURL,
        };

        if(this.props.tag) createData.tags[this.props.tag] = true;

        firebase.database().ref('comment/'+this.props.type+'/'+ newPostKey).set(createData).then(function(){
            // this.uploadImage(this.state.image, 'test-image');
            this.onRefresh();
            this.clearData();
        }.bind(this));
    };

    changeComment=(comment) => {
        this.setState({comment: comment});
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
            comment: '',
            image: null,
        });
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
            <View>
                { firebase.auth().currentUser &&
                <CommentForm
                    comment={this.state.comment}
                    image={this.state.image}
                    createData={this.createData}
                    clearData={this.clearData}
                    changeComment={this.changeComment}
                />
                }
                <CommentList
                    type={this.props.type}
                    lists={this.state.lists}
                    onRefresh={this.onRefresh}
                    fetching={this.state.isFetching}
                    deleteData={this.deleteData}
                />
            </View>
        );
    }
}

export default Comment;
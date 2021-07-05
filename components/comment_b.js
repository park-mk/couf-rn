import React from 'react';
import {Image, Text, TextInput, View, CameraRoll,TouchableOpacity} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
// import ImagePicker from 'react-native-image-picker';
import { ImagePicker } from 'expo';
import CommentList_b from '../components/commentList_b'
import CommentForm_b from '../components/commentForm_b'


class Comment_b extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            lists:[],
            image:'',
            comment:'',
            main_comment:'',
            modify:{},
            isFetching: true,
            with_comments:false,
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
            firebase.database().ref('comment/'+this.props.type +'/'+this.props.uid +'/comments').orderByChild('tags/'+this.props.tag).equalTo(true).on('value', function (snapshot) {
                let returnVal =  snapshot.val() || {};
                resolve(Object.values(returnVal));
            }.bind(this),function(error){
                reject(error);
            });
        });
    };

    deleteData_for_sure = (check,key) => {

          if(check){
            firebase.database().ref('comment/board/'+this.props.uid+'/comments/'+key.uid).update({
                deleted:true
            });
          }
          else{
            firebase.database().ref().child('comment/board/'+this.props.uid+'/comments/'+key.uid).set(null);
          }
    }

    
    deleteData= (key) => {
        /* TODO : 지울지 말지 확인창 띄우기 */
   
        

    //   
    var ref = firebase.database().ref('comment/board/'+this.props.uid+'/comments/'+key.uid +'/c_comments');
                ref.once('value', (snapshot) => {                     //    tips database resort

                    var m = snapshot.exists()
                    this.deleteData_for_sure(m,key);
                
                })
     
       this.setData();
    };


    
    deleteData_c= (key,key2,key3) => {
        /* TODO : 지울지 말지 확인창 띄우기 */
     
        firebase.database().ref().child('comment/board/'+this.props.uid+'/comments/'+key2.comment_uid+'/c_comments/'+key2.uid).set(null);
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
    clearData2 = () => {
        this.setState({
            main_comment: '',
           
        });
    };


    content_check=()=>{
      
        if(this.props.korean){
      
            let length= this.state.main_comment.length
        for (let i=0; i<=length-1;i++){
        if (this.state.main_comment[i].charCodeAt(0)  >= 0xAC00 && this.state.main_comment[i].charCodeAt(0)  <= 0xD7A3) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
    
        // Hangul Jamo
        if (this.state.main_comment[i].charCodeAt(0)  >= 0x1100 && this.state.main_comment[i].charCodeAt(0)  <= 0x11FF) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
    
        // Hangul Compatibility Jamo 
        if (this.state.main_comment[i].charCodeAt(0)  >= 0x3130 && this.state.main_comment[i].charCodeAt(0) <= 0x318F) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
    
        // Hangul Jamo Extended-A
        if (this.state.main_comment[i].charCodeAt(0)  >= 0xA960 && this.state.main_comment[i].charCodeAt(0)  <= 0xA97F) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
    
        // Hangul Jamo Extended-B 
        if (this.state.main_comment[i].charCodeAt(0)  >= 0xD7B0 && this.state.main_comment[i].charCodeAt(0)  <= 0xD7FF) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
        

        }

        return false;
    }
    return false;

    }



    createData2=()=> {
        if(firebase.auth().currentUser==null){
            alert("please login or wait for a second for login");
            return ;
        }
        if(this.props.banned){
            alert("Sorry, you have been banned from posting and writing comments for a while. If it lasts more than 1~2 weeks, please contact us through contactus in menu.")
            return;
        }
        if(this.content_check()){
          
            return;
        }
        if (!this.state.main_comment||this.state.main_comment==" "||this.state.main_comment=="  "||this.state.main_comment=="   ") {
            alert("comment  shouldn't be empty")
            return;
        } 
        console.log("akaakab",this.props.banned ,this.content_check());
        // 이것은 댓글 입니다 
        let user = firebase.auth().currentUser;
        let post_uid = this.props.uid;
        let newPostKey = firebase.database().ref().child('comment/board'+post_uid+'/comments').push().key;
        let createData = {
            content: this.state.main_comment,
            user: user.uid,
            uid:  newPostKey,
            nickname: this.props.nickname,
            useremail:user.email,
            displayName:user.displayName,
            timestamp:Date.now(),
            tags:{},
        };

        createData.tags[post_uid] = true;

        firebase.database().ref('comment/'+'board'+'/'+post_uid+'/'+'comments/'+newPostKey).set(createData).then(function(){
            // this.uploadImage(this.state.image, 'test-image');
            
            this.clearData2();
            this.setData();
        }.bind(this));
    };

    
 
    change_main_comment=(con)=>{
        this.setState({main_comment:con})
      }


    getImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });

        if (!result.cancelled) {
          
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
                {/* { firebase.auth().currentUser  &&true &&
                <CommentForm_b
                    comment={this.state.comment}
                    image={this.state.image}
                    createData={this.createData}
                    clearData={this.clearData}
                    changeComment={this.changeComment}
                />
                } */}
                  <View
                        style={{ marginTop:10,flexDirection: 'row' }}
                    >
                        <Image source={require('../assets/nickname.png')}

                            style={{ width: 35, height: 40, marginLeft: 15, resizeMode: 'cover' }}
                        />
                        <TextInput
                            style={{ marginLeft: 10, width: 8 * this.props.imagewidth / 10, fontFamily: 'content-font', fontSize: 15 }}
                              onChangeText={text => this.change_main_comment(text)}
                            placeholder={"WRITE A COMMENT"}
                            placeholderTextColor="#c5c5c5"
                            value={this.state.main_comment}
                            multiline={true}
                            editable = {true}
                        />
                    
                    </View>
                    <TouchableOpacity
                    style={{alignSelf:'flex-end'}}
                        onPress={()=>  this.createData2()}
                    >
                    <Image
                                style={{
                                  
                                    width: 65,
                                    height: 25,
                                    resizeMode: 'contain'
                                }}
                                source={require("../assets/send.png") }

                            />
                    </TouchableOpacity>
                <CommentList_b
                    changeComment={this.changeComment}
                    type={this.props.type}
                    uid={this.props.uid}
                    banned={this.props.banned}
                    nickname={this.props.nickname}
                    korean={this.props.korean}
                    lists={this.state.lists}
                    setData={this.setData}
                    onRefresh={this.onRefresh}
                    fetching={this.state.isFetching}
                    deleteData={this.deleteData}
                    deleteData_c={this.deleteData_c}
                />
            </View>
        );
    }
}

export default Comment_b;
import React from 'react';
import {
    Image,
    Text,
    TextInput,
    View,
    FlatList,
    CameraRoll,
    Modal,
    KeyboardAvoidingView,
    Alert,
    ScrollView
} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
import CommentList from '../components/commentList'
// import Comment from '../components/comment'
import ProgressLoader from 'rn-progress-loader';
import ImageBrowser from '../components/multiple-imagepicker/src/ImageBrowser';

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
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: []
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

    deleteData= (item) => {
        if(!(item.images)){
            Alert.alert(
                'Delete Popup',
                'Are you sure you want to delete this?',
                [
                    {text: 'Delete', onPress: () => {
                            let ref = firebase.storage().ref();
                            let deleteData = firebase.database().ref().child('comment/suggestion/'+item.uid);
    
                            Promise.all([
                             
                                deleteData.set(null)
                            ]).then(function(values) {
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
        }
        else{
        Alert.alert(
            'Delete Popup',
            'Are you sure you want to delete this?',
            [
                {text: 'Delete', onPress: () => {
                        let ref = firebase.storage().ref();
                        let deleteData = firebase.database().ref().child('comment/suggestion/'+item.uid);

                        Promise.all([
                            item.images.map((item) => ref.child("suggestion/"+item).delete()),
                            deleteData.set(null)
                        ]).then(function(values) {
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
        }
    };

    setData = () => {
        this.getData().then(function(response){
            this.setState({
                lists:  response,
                isFetching: false,
            });
        }.bind(this));
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
        ).then(function(values) {
            console.log('upload Multi Image',values);

        }).catch((error) => {
            console.log(error);
        });
    };

    uploadImage = async (item, data,i) => {
        if(!item || !item.uri) return true;
        const response = await fetch(item.uri);
        const blob = await response.blob();

        let imageName = data.uid+'-'+i;
        data.images.push(imageName);
        console.log('data 의 images 다 ㅏㄷ',data.images);
        return firebase.storage().ref().child("suggestion/" + imageName).put(blob);
    };

    renderImage(item, i) {
        return(
            <Image
                style={{height: 100, width: 100}}
                source={{uri: item.file}}
                key={i}
            />
        )
    }


    _getImageDownLoadUrl = (image, index) => {
        console.log('뭐 안들어오는데 ?', image, index);
        return new Promise((resolve, reject) => {
            firebase.storage().ref('suggestion').child(image).getDownloadURL().then(url => {
                console.log('image',image);
                console.log('받은 rul',url);
                resolve(url);
            }).catch((error) => {
                reject(error);
            });
        });

    };

    setImageData = (data) => {
        return Promise.all(
            data.images.map((item,i) => this._getImageDownLoadUrl(item, i))
        ).then(function(values) {
            return values;

        }).catch((error) => {
            console.error(error);
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
            images: [], // firebase image 이름
            imageUrl : [], //이미지 donwload url ( 보여주기용 url )
            tags:{
                'suggestion':true
            },
        };

        this.setState({loadVisible:true});
        console.log('create Data : ',createData);
        this.uploadMultiImage(createData).then(function(){
            return this.setImageData(createData);

        }.bind(this)).then((response)=>{
            console.log('받은 res는 ?', response);
            createData.imageUrl = response;
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
            photos: [],
        });
        this.toggleWriteForm();
    };

    toggleWriteForm = () => {
        this.setState({toggleWriteForm : !this.state.toggleWriteForm})
    };

    render(url) {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser max={10} callback={this.imageBrowserCallback}/>);
        }

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
                        <ScrollView>
                            {this.state.photos.map((item,i) => this.renderImage(item,i))}
                        </ScrollView>
                        <WrapTextInput>
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
                                    onPress={() => this.setState({imageBrowserOpen: true})}
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
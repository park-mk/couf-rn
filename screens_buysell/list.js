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
    TextInput
} from 'react-native';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import  firebase from "../firebase";
import call from 'react-native-phone-call';
import ImageSlider from 'react-native-image-slider';
import Icon from "../screens_suggestion/suggestionScreen";
import styled from "styled-components";
import ProgressLoader from 'rn-progress-loader';
import ImageBrowser from '../components/multiple-imagepicker/src/ImageBrowser';




//load the firebase.database in order to simplfy
database=firebase.database();

//tip of liFE
class BUYLIST extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            datasource: [],
            pause:false,
            error: null,
            refreshing: false,
            search: '',
            images:'',
            toggleWriteForm : false,
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [],
            comment:'',
            title:'',
            loadVisible:false,
        };
    }

    // this function  refresh everytime information is changed
    componentDidMount() {
        console.log(this.state.search);
        this.makeRemoteRequest();
    }
    // real refresh function
    makeRemoteRequest = () => {

        firebase.database().ref('comment/buyNsell').on('value', function (snapshot) {
            let returnVal =  snapshot.val() || {};
            this.setState({datasource: Object.values(returnVal).reverse()});
        }.bind(this),function(error){
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
            data.images.map((item,i) => this._getImageDownLoadUrl(item, i))
        ).then(function(values) {
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
        return firebase.storage().ref().child("buyNsell/" + imageName).put(blob);
    };

    createData=()=> {
        if(!this.state.comment) return;
        let user = firebase.auth().currentUser;
        let newPostKey = firebase.database().ref().child('comment/buyNsell').push().key;
        let createData = {
            title: this.state.title,
            content: this.state.comment,
            user: user.uid,
            uid: newPostKey,
            useremail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL,
            timestamp:Date.now(),
            images: [], // firebase image 이름
            imageUrl : [], //이미지 donwload url ( 보여주기용 url )
            tags:{
                'buyNsell':true
            },
        };

        this.setState({loadVisible:true});
        this.uploadMultiImage(createData).then(function(){
            return this.setImageData(createData);

        }.bind(this)).then((response)=>{
            createData.imageUrl = response;
            return firebase.database().ref('comment/buyNsell/'+ newPostKey).set(createData);

        }).then(function(){
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
    renderHeader = () => {
        return (
            <SearchBar
                // placeholder="Type Here..."
                lightTheme
                round
                //  onChangeText={(text) => this.searchFilterFunction(text)}
                onChangeText={this.updateSearch}
                autoCorrect={false}
                value={this.state.search}
            />
        );
    };


    renderItem = ({ item }) => {
        let dimensions=Dimensions.get("window");
        let imageheight=5*dimensions.height/10;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth =dimensions.width;

        return (
            <TouchableOpacity style={{borderWidth:2,borderColor:'grey',borderRadius:5}}>
                <Text   style={{fontFamily:'title-font' ,fontSize:30, marginLeft:20,marginTop:10}}>
                    {item.title}
                </Text>
                <Text   style={{fontFamily:'content-font' ,fontSize:15, marginLeft:10}}>
                    {item.displayName}
                </Text>
                <Text   style={{fontFamily:'content-font' ,fontSize:13, marginLeft:14}}>
                    {item.content}
                </Text>
                <View style={{ flex: 1, marginBottom: 0, borderColor: 'black' }} >
                    <Image style={{height:imageheight,width:imagewidth }} source={{ uri: item.imageUrl[0] }} />
                    <View  >
                        { //<Text style={styles.h1}>{item.name}</Text>
                            // <Text style={styles.p} >{item.devision}</Text>
                            //<Text style={styles.price} >{item.location}</Text>
                        }
                    </View>


                </View>
            </TouchableOpacity>




        )



    }


    searchFilterFunction = text => {
        this.setState({
            search: text,
        });
        console.log(this.state.search)


        var usersRef =firebase.database().ref('A1WTE');       //   bring the database tips
        usersRef.once('value', (snapshot) => {                     //    tips database resort

            var m=snapshot.val()
            var keys= Object.values(m);
            this.setState({
                datasource:  keys                                   // datasource of list
            })
        }).then((m)=>{



            const newData = this.state.datasource.filter(item => {
                const itemData = `${item.name.toUpperCase()} `;

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
        return(
            <Image
                style={{height: 100, width: 100}}
                source={{uri: item.file}}
                key={i}
            />
        )
    }

    toggleWriteForm = () => {
        this.setState({toggleWriteForm : !this.state.toggleWriteForm})
    };

    changeTitle=(title) => {
        this.setState({title: title});
    };

    changeComment=(comment) => {
        this.setState({comment: comment});
    };


    // start to draw whole screen
    render() {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser max={10} callback={this.imageBrowserCallback}/>);
        }

        return (
            // flat list data= datasoucr= firebase.tips        details please look upper

            <View>
                <ProgressLoader
                    visible={this.state.loadVisible}
                    isModal={true} isHUD={true}
                    color={"#000000"}
                    barHeight={80}
                />
                <Header
                    leftComponent={
                        <TouchableOpacity
                            onPress={()=> this.props.navigation.navigate('Home')}
                        >
                            <Image source={require('../assets/back.png')}

                                   style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
                            />
                        </TouchableOpacity>
                    }
                    rightComponent={
                        <TouchableOpacity
                            onPress={()=> this.props.navigation.navigate('Home')}
                        >
                            <Image source={require('../assets/baseline-chat-24px.png')}

                                   style={{width:35,height:40,marginLeft:-15,resizeMode:'cover'}}
                            />
                        </TouchableOpacity>
                    }
                    backgroundColor={'#fff'}
                    borderBottomColor={'#fff'}
                    centerComponent={{ text: 'BUY & SELL', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}

                />
                <ScrollView>
                    <View  horizontal={true}>
                        <SearchBar
                            // placeholder="Type Here..."

                            lightTheme
                            round
                            onChangeText={(text) => this.searchFilterFunction(text)}
                            // onChangeText={this.updateSearch}
                            autoCorrect={false}
                            value={this.state.search}
                        />

                    </View>
                    <FlatList
                        data={this.state.datasource}
                        // (item =  tips ) here
                        renderItem={this.renderItem}
                        keyExtractor={item => item.name}
                        //  ListHeaderComponent={this.renderHeader}
                        //  ListFooterComponent={this.renderFooter}
                        //   onRefresh={this.handleRefresh}
                        // refreshing={this.state.refreshing}
                        // onEndReached={this.handleLoadMore}
                        // onEndReachedThreshold={30}
                    />

                    <View>
                        { this.state.toggleWriteForm && firebase.auth().currentUser &&
                        <View>
                            <ScrollView>
                                {this.state.photos.map((item,i) => this.renderImage(item,i))}
                            </ScrollView>
                            <WrapTextInput>
                                <TextInput
                                    onChangeText={(title) => this.changeTitle(title)}
                                    value={this.state.title}
                                    placeholder='Title'
                                    textAlignVertical='top'
                                />
                                <TextInput
                                    multiline={true}
                                    onChangeText={(suggestion) => this.changeComment(suggestion)}
                                    value={this.state.comment}
                                    placeholder='Description'
                                    numberOfLines={6}
                                    textAlignVertical='top'
                                />
                            </WrapTextInput>
                            <Buttons style={{alignSelf: 'flex-end'}}>
                                <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                                        icon={<Icon name="close" size={15} color="grey"/>}
                                        onPress={() => this.clearData()}
                                        title="close"
                                />
                                <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                                        icon={<Icon name="camera" size={15} color="grey"/>}
                                        onPress={() => this.setState({imageBrowserOpen: true})}
                                        title="camera"
                                />
                                <Button type="solid" buttonStyle={{width: 50}}
                                        icon={<Icon name="check" size={15} color="white"/>}
                                        onPress={() => {
                                            this.createData();
                                        }}
                                        title="submit"
                                />
                            </Buttons>
                        </View>
                        }
                        {!this.state.toggleWriteForm && firebase.auth().currentUser &&
                        <View>
                            <Buttons style={{alignSelf: 'flex-end'}}>
                                <Button type="solid" buttonStyle={{width: 50}}
                                        title="write"
                                        icon={<Icon name="pencil" size={15} color="white"/>}
                                        onPress={() => {
                                            this.toggleWriteForm();
                                        }}
                                />
                            </Buttons>
                        </View>
                        }
                    </View>

                    <Button
                        title="Refresh"
                        type="outline"
                        onPress={  ()=> this.renderagain()}
                    />
                    <View
                        style={{height:100}}
                    >
                    </View>
                </ScrollView>
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


export default BUYLIST;

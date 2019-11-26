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
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import firebase from "../firebase";
import call from 'react-native-phone-call';
import ImageSlider from 'react-native-image-slider';
import Icon from "../screens_suggestion/suggestionScreen";
import styled from "styled-components";
import ProgressLoader from 'rn-progress-loader';
import ImageBrowser from '../components/multiple-imagepicker/src/ImageBrowser';




//load the firebase.database in order to simplfy
database = firebase.database();

//tip of liFE
class BUYLIST extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            datasource: [],
            pause: false,
            error: null,
            refreshing: false,
            search: '',
            images: '',
            toggleWriteForm: false,
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [],
            comment: '',
            show: ' ',
            title: '',
            loadVisible: false,
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
            let returnVal = snapshot.val() || {};
            this.setState({ datasource: Object.values(returnVal).reverse() });
        }.bind(this), function (error) {
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
            data.images.map((item, i) => this._getImageDownLoadUrl(item, i))
        ).then(function (values) {
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
        ).then(function (values) {
            console.log('upload Multi Image', values);

        }).catch((error) => {
            console.log(error);
        });
    };
    showDescription = (comment) => {
        if (comment.length > 20) {
            this.setState(
                {
                    show: comment.substring(0, 30) + "......"
                });
        }
        else
            this.setState(
                {
                    show: comment
                });

        return this.state.show;
    };

    uploadImage = async (item, data, i) => {
        if (!item || !item.uri) return true;
        const response = await fetch(item.uri);
        const blob = await response.blob();

        let imageName = data.uid + '-' + i;
        data.images.push(imageName);
        return firebase.storage().ref().child("buyNsell/" + imageName).put(blob);
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
                placeholder="Type Here..."
                backgroundColor="white"

                //  onChangeText={(text) => this.searchFilterFunction(text)}
                onChangeText={this.updateSearch}
                autoCorrect={false}
                value={this.state.search}
            />
        );
    };


    renderItem = ({ item }) => {
        let dimensions = Dimensions.get("window");
        let imageheight = 5 * dimensions.height / 10;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth = dimensions.width;

        return (
            <TouchableOpacity style={{ borderTopWidth: 1, borderColor: 'grey', borderRadius: 5 }}
                onPress={() => {
                    this.props.navigation.navigate('ITEM', {
                        title: item.title,
                        content: item.content,
                        price: item.price,
                        location: item.location,
                        contact: item.contact,
                        user: item.user,
                        uid: item.uid,
                        useremail: item.useremail,
                        displayName: item.displayName,
                        photoURL: item.photoURL,
                        timestamp: item.timestamp,
                        images: item.images,
                        imageUrl: item.imageUrl,

                    });



                }

                }



            >
                <Text style={{ fontFamily: 'title-font', fontSize: 30, marginLeft: 20, marginTop: 10 }}>
                    {item.title}
                </Text>
                <Text style={{ fontFamily: 'content-font', fontSize: 15, marginLeft: 20 }}>
                    {item.location}
                </Text>
                <Text style={{ fontFamily: 'content-font', fontSize: 15, marginLeft: 20 }}>
                    {item.content.substring(0, 30) + "....."}
                </Text>
                <Text style={{ fontFamily: 'content-font', fontSize: 20, marginLeft: 14, color: 'green' }}>
                    {'$' + item.price}
                </Text>
                <View style={{ flex: 1, marginBottom: 0, borderColor: 'black' }} >
                    <Image style={{ height: imageheight, width: imagewidth }} source={{ uri: item.imageUrl[0] }} />
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


        var usersRef = firebase.database().ref('comment/buyNsell');       //   bring the database tips
        usersRef.once('value', (snapshot) => {                     //    tips database resort

            var m = snapshot.val()
            var keys = Object.values(m);
            this.setState({
                datasource: keys                                   // datasource of list
            })
        }).then((m) => {



            const newData = this.state.datasource.filter(item => {
                const itemData = `${item.title.toUpperCase()} `;

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
        return (
            <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: item.file }}
                key={i}
            />
        )
    }

    toggleWriteForm = () => {
        this.setState({ toggleWriteForm: !this.state.toggleWriteForm })
    };

    changeTitle = (title) => {
        this.setState({ title: title });
    };

    changeComment = (comment) => {
        this.setState({ comment: comment });
    };


    // start to draw whole screen
    render() {
        if (this.state.imageBrowserOpen) {
            return (<ImageBrowser max={10} callback={this.imageBrowserCallback} />);
        } else if (this.state.cameraBrowserOpen) {
            return (<CameraBrowser max={10} callback={this.imageBrowserCallback} />);
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
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Image source={require('../assets/back.png')}

                                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                    }
                    rightComponent={
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('WRITE')}
                        >
                            <Image source={require('../assets/write.png')}

                                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                    }
                    backgroundColor={'#fff'}
                    borderBottomColor={'#fff'}
                    centerComponent={{ text: 'BUY & SELL', style: { fontFamily: 'title-font', fontSize: 40, marginLeft: 10, color: '#67DBFF' } }}

                />
                <ScrollView>
                    <View horizontal={true}>
                        <SearchBar


                            inputStyle={{ backgroundColor: 'white' }}
                            containerStyle={{ backgroundColor: 'white', borderBottomWidth: 0, borderTopWidth: 0 }}
                            inputContainerStyle={{ backgroundColor: 'white' }}
                            onChangeText={(text) => this.searchFilterFunction(text)}
                            style={{
                                borderBottomColor: 'transparent',

                                borderTopColor: 'transparent'
                            }}
                            autoCorrect={false}
                            value={this.state.search}
                        />

                    </View>
                    <FlatList
                        data={this.state.datasource}
                        // (item =  tips ) here
                        renderItem={this.renderItem}
                        keyExtractor={item => item.uid}
                    //  ListHeaderComponent={this.renderHeader}
                    //  ListFooterComponent={this.renderFooter}
                    //   onRefresh={this.handleRefresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={this.handleLoadMore}
                    // onEndReachedThreshold={30}
                    />


                    <TouchableOpacity

                        style={{
                         alignContent: 'center',
                        }}
                        onPress={() =>

                            this.renderagain()}

                    >
                        <Image
                            style={{
                                width: 80, flex: 1,
                                height: 80, alignContent: 'center',
                            }}
                            resizeMode={'contain'}
                            source={require('../assets/refresh.png')}
                        />
                    </TouchableOpacity>
                    <View
                        style={{ height: 100 }}
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

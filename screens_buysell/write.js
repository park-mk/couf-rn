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
class WRITE extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            datasource: [],
            datasource1: [],
            pause:false,
            error: null,
            refreshing: false,
            search: '',
            images:'',
            toggleWriteForm :true,
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [],
            comment:'',
            price:'',
            location:'',
            contact:'',
            title:'',
            loadVisible:false,
            origin:'',
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
        if (!this.state.title) {
            alert("title  shouldn't be empty")
            return;
        }
        if (!this.state.price) {
            alert("price info shouldn't be empty")
            return;
        }
        if (!this.state.location) {
            alert("location info shouldn't be empty")
            return;
        }

        if(!this.state.contact){
            alert("contact info shouldn't be empty")
            return;
        }

       
        if (!(Array.isArray(this.state.photos) && this.state.photos.length))  {
            alert("images shouldn't be empty")
            return;
        }

        let user = firebase.auth().currentUser;
        let newPostKey = firebase.database().ref().child('comment/buyNsell').push().key;
        let createData = {
            title: this.state.title,
            content: this.state.comment,
            price:this.state.price,
            location:this.state.location,
            contact:this.state.contact,
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
            this.props.navigation.navigate('BUYLIST')
            console.log('final');
            
        });





        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        var usersRef = firebase.database().ref('userinfo/' + code + '/user_buysell');
        usersRef.once('value', (snapshot) => {
          var m = snapshot.val()
          this.setState({origin:m});
          //  console.log(this.state.origin);
        }).then((m)=>{
      

        firebase.database().ref('userinfo/' + code).update({
          user_buysell: this.state.origin + "," + newPostKey,
        }, function () {
              
        })
    
          });

         
          this.sendpush2();
         



    };


    clearData = () => {
        this.setState({
            comment: '',
            title: '',
            price:'',
            location:'',
            contact:'',
            photos: [],
        });
        this.toggleWriteForm();
        // go back
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
   
    sendpush2=()=>{

        var usersRef111 = firebase.database().ref('buyNsellwait');
        usersRef111.once('value', (snapshot) => {


            var m=snapshot.val()
            var keys= Object.values(m);
            this.setState({
                datasource1:  keys                                   // datasource of list
            })
         
       
        }).then((m)=>{


            console.log(this.state.datasource1,"kkkkkk",this.state.title,"biiii");

                const newData = this.state.datasource1.filter(item => {
                    const itemData = `${this.state.title.toUpperCase()} `;
    
                    const textData = item.wait.toUpperCase();
    
                    return itemData.indexOf(textData) > -1;
                });
                   console.log(this.state.datasource1,"biiiithc",this.state.title,"biiii");
                this.setState({ datasource1: newData });
           
        console.log(this.state.datasource1,"data");
        ob=Object.assign({}, this.state.datasource1)
        
        Object.keys(ob).map(function(key, index) {
            console.log("this",ob[key].uid);
            let response=fetch('https://exp.host/--/api/v2/push/send',{

                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    to:ob[key].uid,
                    sound:'default',
                    title:"Dear user",
                    body:"someone has uploaded the item you looked for ",
                })
               });



          });
        });
  
     }


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
                style={{height: 150, width: 150}}
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
    changePrice=(price) => {
        this.setState({price: price});
    };
    changeLocation=(location) => {
        this.setState({location: location});
    };
    changeContact=(contact) => {
        this.setState({contact: contact});
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
                 

                    <View>
                   
                        <View>
                          
                          
                                <TextInput
                                    
                                    onChangeText={(title) => this.changeTitle(title)}
                                    value={this.state.title}
                                    placeholder='WHAT ARE YOU TRYING TO SELL?'
                                    textAlignVertical='top'
                                    style={{ marginLeft:28,marginRight:28,marginTop:30,fontFamily:'title-font',fontSize:24,borderBottomWidth:2,borderBottomColor:'#C5C5C5'}}
                                />
                                 <TextInput
                                  
                                    onChangeText={(text) => this.changePrice(text)}
                                    value={this.state.price}
                                    placeholder='PRICE [$]'
                                 
                                    textAlignVertical='top'
                                    style={{ marginLeft:28,marginRight:28,marginTop:30,fontFamily:'title-font',fontSize:24,borderBottomWidth:2,borderBottomColor:'#C5C5C5'}}
                                    keyboardType={'numeric'}
                                />
                                  <TextInput
                                  
                                  onChangeText={(text) => this.changeLocation(text)}
                                  value={this.state.location}
                                  placeholder='LOCATION'
                               
                                  textAlignVertical='top'
                                  style={{ marginLeft:28,marginRight:28,marginTop:30,fontFamily:'title-font',fontSize:24,borderBottomWidth:2,borderBottomColor:'#C5C5C5'}}
                                 
                              />
                                 <TextInput
                                  
                                  onChangeText={(text) => this.changeContact(text)}
                                  value={this.state.contact}
                                  placeholder='contact info'
                               
                                  textAlignVertical='top'
                                  style={{ marginLeft:28,marginRight:28,marginTop:30,fontFamily:'title-font',fontSize:24,borderBottomWidth:2,borderBottomColor:'#C5C5C5'}}
                                 
                              />
                                <TextInput
                                    multiline={true}
                                    onChangeText={(text) => this.changeComment(text)}
                                    value={this.state.comment}
                                    placeholder='Description[optional]'
                                    numberOfLines={6}
                                    textAlignVertical='top'
                                    style={{ marginLeft:28,marginRight:28,marginTop:30,marginBottom:20,fontFamily:'title-font',fontSize:24,borderWidth:2,borderColor:'#C5C5C5'}}
                                /> 

                       <ProgressLoader
                    visible={this.state.loadVisible}
                    isModal={true} isHUD={true}
                    color={"#000000"}
                    barHeight={80}
                      />
                             <ScrollView
                          
                             horizontal={true}
                             >
                                {this.state.photos.map((item,i) => this.renderImage(item,i))}
                            </ScrollView>
                            <Buttons style={{marginTop:30,alignSelf: 'flex-end'}}>


                          


                                   <TouchableOpacity
                                     onPress={() => this.clearData()}>
                                    <Image
                                        style={{
                                            width: 80,
                                            height: 32,
                                            marginRight:10,
                                        }}
                                        source={require('../assets/clear.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                 onPress={() => this.setState({imageBrowserOpen: true})}>
                                    <Image
                                        style={{
                                            width: 80,
                                            height: 32,
                                            marginRight:10,
                                        }}
                                        source={require('../assets/camera.png')}
                                    />
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                 onPress={() => {
                                    this.createData();
                                }}>
                                    <Image
                                        style={{
                                            width: 80,
                                            height: 32,
                                            marginRight:5,
                                        }}
                                        source={require('../assets/submit.png')}
                                    />
                                </TouchableOpacity>

                             
                            </Buttons>
                        </View>
                     
                    </View>

                 
                    <View
                        style={{height:350}}
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


export default WRITE;

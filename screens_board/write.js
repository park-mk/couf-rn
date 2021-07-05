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
    TextInput,
    Modal,
    ActivityIndicator,
    Linking,
} from 'react-native';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import  firebase from "../firebase";
import call from 'react-native-phone-call';
import ImageSlider from 'react-native-image-slider';
import Icon from "../screens_suggestion/suggestionScreen";
import styled from "styled-components";
import ProgressLoader from 'rn-progress-loader';
import ImageBrowser from '../components/multiple-imagepicker/src/ImageBrowser';
import { Dialog } from 'react-native-simple-dialogs';




//load the firebase.database in order to simplfy
database=firebase.database();

//tip of liFE
class WRITE_B extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            datasource: [],
            datasource1: [],
            nickname:' ',
            nickname2:' ',
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
            commentVisible:false,
            loadVisible:false,
            loadVisible1:false,
            origin:'',
            korean:false,
        };
    }

    // this function  refresh everytime information is changed
    componentDidMount() {
        console.log(this.state.search);
     
        this.makeRemoteRequest();
    }
    // real refresh function
    makeRemoteRequest = () => {
        firebase.database().ref('zpushalarm').on('value', function (snapshot) {
            let korean = snapshot.val(); //|| {};
            console.log(korean.korean);
            this.setState({korean:korean.korean})
        }.bind(this), function (error) {
            console.error(error);
        });

        firebase.database().ref('userinfo/'+firebase.auth().currentUser.uid).on('value', function (snapshot) {
            let returnVal = snapshot.val(); //|| {};
            if(returnVal!=null){
            if(returnVal["nickname"]!=null){
                this.setState({ nickname: returnVal["nickname"]});
                this.setState({ nickname2: returnVal["nickname"]});
                }
                else{
                    this.setState({ nickname:"anonymous",nickname2:"anonymous"});
                }
            }
            else{
                this.setState({ nickname:"anonymous",nickname2:"anonymous"});
            }
          
         
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
    onClickComment = (value) => {
       
        this.setState({
          
                commentVisible: !this.state.commentVisible,
       
        });
    
};
    replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    regist = () => {

        console.log('regist')
        this.setState({nickname:this.state.nickname2});
        if (firebase.auth().currentUser != null) {
            var code = firebase.auth().currentUser.uid
            code = this.replaceAll(code, ".", "-");
            code = this.replaceAll(code, "#", "-");
            code = this.replaceAll(code, "$", "-");
            code = this.replaceAll(code, "[", "-");
            code = this.replaceAll(code, "]", "-");
            firebase.database().ref('userinfo/' + code).update({
                nickname: this.state.nickname2,
              
            }, function () {
             
              
            });
        }
        else alert("please login first");
        this.onClickComment();
        console.log("end");
    };

    _getImageDownLoadUrl = (image, index) => {

        return new Promise((resolve, reject) => {
            console.log("this is child")
            console.log(image);
            firebase.storage().ref().child("board/"+image).getDownloadURL().then(url => {
               
               console.log("succes get to  firebase however ");
               console.log(url);
                resolve(url);
            }).catch((error) => {
                console.log("fail get  to  firebase however ");
                reject(error);
            });
    
        });

    };

    setImageData = (data) => {
        return Promise.all(
            data.images.map((item,i) => this._getImageDownLoadUrl(item, i))
        ).then(function(values) {
            console.log("succes set image however");
            console.log(values);
            return values;
        }).catch((error) => {
            console.log("fail set image however ");
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
            console.log('upload Multi Image fail',error);
            console.log(error);
        });
    };

    replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
      }
    uploadImage = async (item, data,i) => {
       console.log("hahahahaha ");
      
        // if(!item || !item.uri) {
          
        //     return true;
        
        // }
        
       
        const response = await fetch(Object.values(item)[0]);
        const blob = await response.blob(); 
        let imageName = data.uid+'-'+i;
        data.images.push(imageName);
        console.log("pushing pushing yeah",item.uri);
        var metadata = {
            contentType: 'image/jpeg',
          };
        
        return firebase.storage().ref().child("board/" + imageName).put(blob,metadata);
    };

    createData=()=> {
      
        if (!this.state.title) {
            alert("title  shouldn't be empty")
            return;
        } 

        
      
        if(this.state.korean){
            let length= this.state.title.length
        for (let i=0; i<=length-1;i++){
        if (this.state.title[i].charCodeAt(0)  >= 0xAC00 && this.state.title[i].charCodeAt(0)  <= 0xD7A3) {
             this.setState({loadVisible1:true})
            return ;
        }
    
        // Hangul Jamo
        if (this.state.title[i].charCodeAt(0)  >= 0x1100 && this.state.title[i].charCodeAt(0)  <= 0x11FF) {
            this.setState({loadVisible1:true})
            return ;
        }
    
        // Hangul Compatibility Jamo 
        if (this.state.title[i].charCodeAt(0)  >= 0x3130 && this.state.title[i].charCodeAt(0) <= 0x318F) {
            this.setState({loadVisible1:true})
            return ;
        }
    
        // Hangul Jamo Extended-A
        if (this.state.title[i].charCodeAt(0)  >= 0xA960 && this.state.title[i].charCodeAt(0)  <= 0xA97F) {
           this.setState({loadVisible1:true})
            return ;
        }
    
        // Hangul Jamo Extended-B 
        if (this.state.title[i].charCodeAt(0)  >= 0xD7B0 && this.state.title[i].charCodeAt(0)  <= 0xD7FF) {
           this.setState({loadVisible1:true})
            return ;
        }
        

        }
        length= this.state.comment.length
        for (let i=0; i<=length-1;i++){
        if (this.state.comment[i].charCodeAt(0)  >= 0xAC00 && this.state.comment[i].charCodeAt(0)  <= 0xD7A3) {
           this.setState({loadVisible1:true})
            return ;
        }
    
        // Hangul Jamo
        if (this.state.comment[i].charCodeAt(0)  >= 0x1100 && this.state.comment[i].charCodeAt(0)  <= 0x11FF) {
           this.setState({loadVisible1:true})
            return ;
        }
    
        // Hangul Compatibility Jamo 
        if (this.state.comment[i].charCodeAt(0)  >= 0x3130 && this.state.comment[i].charCodeAt(0) <= 0x318F) {
           this.setState({loadVisible1:true})
            return ;
        }
    
        // Hangul Jamo Extended-A
        if (this.state.comment[i].charCodeAt(0)  >= 0xA960 && this.state.comment[i].charCodeAt(0)  <= 0xA97F) {
            this.setState({loadVisible1:true})
            return ;
        }
    
        // Hangul Jamo Extended-B 
        if (this.state.comment[i].charCodeAt(0)  >= 0xD7B0 && this.state.comment[i].charCodeAt(0)  <= 0xD7FF) {
            this.setState({loadVisible1:true})
            return ;
        }
        

        }
        
       
    }
     
       
     

        let user = firebase.auth().currentUser;
        let newPostKey = firebase.database().ref().child('comment/board').push().key;
        let createData = {}
        if (!(Array.isArray(this.state.photos) && this.state.photos.length))  {
            createData = {
                title: this.state.title,
                content: this.state.comment,
                user: user.uid,
                uid: newPostKey,
                useremail:user.email,
                displayName:user.displayName,
                timestamp:Date.now(),
                nickname:this.state.nickname,
                tags:{
                    'board':true
                },
            };

            this.props.navigation.navigate('BOARDLIST')
           
            return firebase.database().ref('comment/board/'+ newPostKey).set(createData);
           
        }
        else {
            createData = {
                title: this.state.title,
                content: this.state.comment,
                user: user.uid,
                uid: newPostKey,
                useremail:user.email,
                displayName:user.displayName,
                timestamp:Date.now(),
                nickname:this.state.nickname,
                images: [], // firebase image 이름
                imageUrl : [], //이미지 donwload url ( 보여주기용 url )
                tags:{
                    'board':true
                },
            };

        
  

        this.setState({loadVisible:true}); 

        this.uploadMultiImage(createData).then(function(){
            
            return this.setImageData(createData);
        
        }.bind(this)).then((response)=>{
            console.log('-------------');
            console.log(response)
            createData.imageUrl = response;
          
           return firebase.database().ref('comment/board/'+ newPostKey).set(createData);

        }).then(function(){
          //  this.sendpush2();
           

        }.bind(this)).catch((error) => {
            console.log('error',error);
        }).finally(() => {
            this.setState({loadVisible:false});
          
            this.props.navigation.navigate('BOARDLIST')
            console.log('finally');
            
        });

    }



        var code = firebase.auth().currentUser.uid;
        code=this.replaceAll(code,".","-");
        code=this.replaceAll(code,"#","-");
        code=this.replaceAll(code,"$","-");
        code=this.replaceAll(code,"[","-");
        code=this.replaceAll(code,"]","-");
        var usersRef = firebase.database().ref('userinfo/' + code + '/user_board');
        usersRef.once('value', (snapshot) => {
          var m = snapshot.val()
          this.setState({origin:m});
          //  console.log(this.state.origin);
        }).then((m)=>{
      

        firebase.database().ref('userinfo/' + code).update({
          user_board: this.state.origin + "," + newPostKey,
        }, function () {
              
        })

          }).then(()=>{

           
          })

         
        
         



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
        let imageheight=dimensions.height;
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


   
   
    sendpush2=()=>{
        console.log("send push sned push!! mingi");
        let title= this.state.title.toUpperCase();
        let comment= this.state.comment.toUpperCase();
        var usersRef111 = firebase.database().ref('boardwait');
        usersRef111.once('value', (snapshot) => {


            var m=snapshot.val()
            var keys= Object.values(m);
            this.setState({
                datasource1:  keys                                   // datasource of list
            })
         
       
        }).then((m)=>{


            console.log(this.state.datasource1," this is wait list \n",this.state.title,"\ntitle");

         
               
        let ob=Object.assign({}, this.state.datasource1)
        
        Object.keys(ob).map(function(key, index) {
            console.log("this is uid \n ",ob[key].uid);

            let ob2=ob[key].waitlist;
            if(ob2!=null && ob2 !=undefined){
            Object.keys(ob2).map(function(key2, index2) {
                console.log("this is wait\n",ob2[key2].item);
                console.log(title,comment);

                if(title.includes(ob2[key2].item)||comment.includes(ob2[key2].item)){
                    console.log("concluding!!!");
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
                }
            });


          }
           



          });
        }).then(()=>{
            this.clearData();
        })
  
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
    have_nick =()=>{

        <Image
        style={{height: 1500, width: 1500}}
        source={require('../assets/memberg.png')}
     
     />
    }

    changeTitle=(title) => {
        console.log("post~");
      
            
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
    onChangeText1 = (text) => {
        this.setState({
            nickname2: text,
        });
      
    };


    // start to draw whole screen
    render() {
        const { navigation } = this.props;
        let dimensions = Dimensions.get("window");
        let imageheight =  dimensions.height ;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth = dimensions.width;
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser max={10} callback={this.imageBrowserCallback}/>);
        }

        return (
            // flat list data= datasoucr= firebase.tips        details please look upper

            <View>
                  <Modal
                // nno pressed 
                    animationType="slide"
                    transparent={true}
                    visible={this.state.commentVisible}
                    backdropColor = {'white'}
                    backdropOpacity = {0.5}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                        
                    <View
                         style={{
                            alignItems: 'center',
                            height:imageheight,
                            width:imagewidth,
                            backgroundColor: '#00000080',
                            justifyContent: 'center',

                        }}
                    >

                     <TouchableOpacity
                             
                            >

                        <View
                            style={{
                                marginTop: 2.6 * imageheight / 8.5,
                                marginBottom: 3 * imageheight / 8.5,
                                marginLeft: imagewidth / 10,
                                marginRight:imagewidth/10,
                                backgroundColor: 'white',
                                height:imageheight*4/8,
                                width:imagewidth*8/10,
                                alignItems: 'center',
                                justifyContent: 'center',

                                }}>
                                <Text style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', fontFamily: 'content-font', fontSize: 30, marginTop: 3, color: '#67DBFF'
                                }}>
                                    SET YOUR NICKNAME
                       </Text>
                                <View style={{ flexDirection: "row" }}>
                                 
                                    <TextInput  
                                        style={{ height: 40, width: 4 * imagewidth / 10,fontFamily: 'content-font', fontSize:25, marginTop: 27}}
                                        onChangeText={text => this.onChangeText1(text)}
                                        placeholder={" "}
                                        placeholderTextColor = "#c5c5c5"
                                        value={this.state.nickname2}
                                    />
                           </View>
                           <View
                           style={{borderColor:"#c5c5c5",borderWidth:1,width:30+4 * imagewidth / 10,height:1}}
                           ></View>
                           
                       <Text style={{  alignItems: 'center',
                                justifyContent: 'center',fontFamily: 'content-font', fontSize: 15, marginTop: 3 }}>
                          Only this name will be posted on your posts and comments.
                       </Text>
                       <View
                        style={{  flexDirection:'row' }}>
                       
                              
                       <TouchableOpacity
                            onPress={() => this.onClickComment()}
                        >
                            <Image source={require('../assets/clear.png')}

                                style={{marginTop:10, width: 80, height: 40 ,marginLeft:0,resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                       <TouchableOpacity
                            onPress={() => this.regist()}
                        >
                            <Image source={require('../assets/submit.png')}

                                style={{marginTop:10, width: 80, height: 40 ,marginLeft:3*imagewidth / 10,resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                 
                        </View>
                            

                       </View>
                       </TouchableOpacity>
                    </View>
                   
                </Modal>
              
              <Header
                    height={80}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('BOARDLIST')}
                        >
                            <Image source={require('../assets/back.png')}

                                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                    }
                 
                    backgroundColor={'#fff'}
                    borderBottomColor={'#fff'}
                    centerComponent={{ text: 'BOARD', style: { fontFamily: 'title-font', fontSize: 40, marginLeft: 10, marginTop: 17, color: '#67DBFF' } }}

                />

                <ScrollView>

                 

                    <View>
                   
                        <View>
                          
                          
                                <TextInput
                                    
                                    onChangeText={(title) => this.changeTitle(title)}
                                value={this.state.title}
                                placeholder='TITLE'
                                textAlignVertical='top'
                                style={{ marginLeft: 28, marginRight: 28, marginTop: 30, fontSize: 17, borderBottomWidth: 2, borderBottomColor: '#C5C5C5' }}
                            />

                            <View 
                            style={{flexDirection:'row'}}
                            >
                            <TouchableOpacity
                               onPress={() => this.onClickComment()}
                            >
                                <Image
                                    style={{ marginLeft: 28, marginTop: 30, height: 40, width: 30 }}
                                    source={require('../assets/nickname.png')}

                                />
                            </TouchableOpacity>
                            <Text
                               style={{ marginLeft: 28, marginTop: 30 ,fontSize:20}}
                            >{this.state.nickname}</Text>
                            </View>
                            <TextInput
                                multiline={true}
                                onChangeText={(text) => this.changeComment(text)}
                                value={this.state.comment}
                                placeholder='Description[optional]'
                                    numberOfLines={6}
                                    textAlignVertical='top'
                                    style={{ marginLeft:28,marginRight:28,marginTop:30,marginBottom:20,fontSize:17,borderWidth:2,borderColor:'#C5C5C5'}}
                                /> 

                    
                     <View>
                     <Dialog
                             visible={this.state.loadVisible1}
                             onTouchOutside={() => this.setState({loadVisible1: false })} >
                             
                                 <View>
                              <Text
                               style={{fontSize:17}}
                              > For communication purposes, we will be restricting the use of Korean on this board indefinitely until further notice. If you have think there’s a post where Korean is necessary, please contact us through the CONTACTUS menu.Thank you.</Text>
                   <View 
                   style={{flexDirection:'row'}}
                    >
                         
                             <TouchableOpacity
                            
                    onPress={() => Linking.openURL("http://pf.kakao.com/_xlxfxaxgK/chat").catch((err) => console.error('An error occurred', err))}
              >
    <Image
                            style={{
                              marginTop:20,
                                borderRadius:7,
                                width: 30,
                                height: 30,
                          
                            }}
                            source={require('../assets/kakao.png')}
                            resizeMode={'contain'}
                        />
                        
           </TouchableOpacity>
           <TouchableOpacity
                    onPress={() => this.setState({loadVisible1: false })} 
                  >
                <Text 
                 style={{ color:'grey',fontSize:20,marginLeft:150,marginTop:15}}
                >cancle</Text>
                            
               </TouchableOpacity>
        
           </View>
                      </View>
                             </Dialog>
                     {
                         this.state.loadVisible &&  
                         <View>
                                 
                             <Dialog
                             visible={this.state.loadVisible}
                             >
                                 <View>
                              <Text
                               style={{fontSize:17}}
                              >Uploading the pictures takes a while, so please wait. </Text>
                             
                           <ActivityIndicator size="large" color='#67DBFF' />
                     
                      </View>
                             </Dialog>
                            
                         </View>
                     }
                     </View>
                        
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


export default WRITE_B;

import React from 'react';

import { Button, View, Text, ScrollView, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, Linking, Modal } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { Ionicons,MaterialIcons ,Entypo,Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from  '../components/Textedit'
import  firebase,{storage}  from "../firebase";
import Comment from '../components/comment'

class CLUBEX extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      up: 0,
      voted: false,
      commentVisible: false,
    };
  }

  analyze = (name) => {
    //search

    var str = "ffuck";
    var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
    var usersRef = firebase.database().ref('userinfo/' + code + '/user_like_history');
    usersRef.on('value', (snapshot) => {
      var m = snapshot.val()
      str = m;

      var lists = [];
      str = " " + str;

      var words = str.split(',');
      for (i = 0; i < str.split(",").length; i++) {

        lists.push(words[i]);
      }


      var found = lists.find(function (element) {
        return element == name;
      });



      if (found == undefined) {
        console.log("nofind")
      }

      if (found != undefined) {
        console.log("find");
       // this.setState({ voted: true })
          this.state.voted=true;
      }






    });











  }




 
  componentWillUnmount() {
    this.state.voted=false;
  }





  async componentDidMount() {
    const { navigation } = this.props;
    const name = navigation.getParam('name', 'NO-ID');
   

    var usersRef = firebase.database().ref('club/'  + name + '/upvote');


    usersRef.on('value', (snapshot) => {


      var m = snapshot.val()
      this.state.keys = Object.values(m);
      this.state.up = m
      console.log("here");
      console.log(this.state.up);
      console.log(this.state.keys);
    });


    this.analyze(name);



    this.makeRemoteRequest();


  }
  onClickComment = (value) => {
    this.setState({
      commentVisible: value || !this.state.commentVisible,
    });
  };


  makeRemoteRequest = () => {

    //this.setState({ upvote: this.state.up })
    var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;


    var usersRef = firebase.database().ref('userinfo/' + code + '/user_like_history');
    usersRef.on('value', (snapshot) => {
      var m = snapshot.val()
      this.state.origin = m;
      //  console.log(this.state.origin);
    });

  }


  check = () => { 
    // add likes


    if (firebase.auth().currentUser!=null){
    const { navigation } = this.props;
    const name = navigation.getParam('name', 'NO-ID');
    
    if (this.state.voted == false) {



      console.log("dong");

      firebase.database().ref('club/' + name).update({
        upvote: this.state.up + 1,
      }, function () {

      });


      var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

      firebase.database().ref('userinfo/' + code).update({
        user_like_history: this.state.origin + "," + name,
      }, function () {

      });

      //this.setState({ voted: true })
      this.state.voted=true;
      alert("thank you for your appreciate");
      
    }
    else {
      ///minus

      alert("you've already like it");


    }

    }
    else   alert("please login first");

    


  }




   
    render() {
       let dimensions=Dimensions.get("window");
       let imageheight=6*dimensions.height/10
       //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth =dimensions.width;
      const { navigation } = this.props;
      const name = navigation.getParam('name', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
      const time=navigation.getParam('time', 'NO-ID');
      const location = navigation.getParam('location', 'NO-ID');
      const topimage = navigation.getParam('topimage', 'NO-ID');
      const disname = navigation.getParam('disname', 'NO-ID');
      const uri = navigation.getParam('uri', 'NO-ID');
      const money =navigation.getParam('money', 'NO-ID');
      const date =navigation.getParam('date', 'NO-ID');
      const imagelist=navigation.getParam('imagelist', 'NO-ID');
      const tips = navigation.getParam('tips', 'NO-ID');
      const upvote = navigation.getParam('upvote', 'NO-ID');
      var number_of_pagraph=0; 
      var sentence= imagelist.substring(1,imagelist.length);
     
      var sen;
      number_of_pagraph=sentence.split("/*/").length - 1;
      
      const images = [
      
      ];  
       for(let i=0;i<number_of_pagraph;i++){
        var term= sentence.indexOf("/*/");
        let info=sentence.substring(0,term);
        if(i!=0)
        images.push(info);
        
        sentence=sentence.substring(term+3,sentence.length);
        console.log(sentence);
        
       }
    
       var vivid =JSON.stringify(description);
       var res = vivid.substring(1, 4);
       var storage = firebase.storage();
      
      return ( 

        <View
       // style={{ backgroundColor:"#1f2124"}}
        > 
       
         

       <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.commentVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
      <Header
          leftComponent={
            <TouchableOpacity
                onPress={() => {
                  this.onClickComment();
                }}
            >
              <Image source={require('../assets/back.png')}

                     style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
              />
            </TouchableOpacity>
          }
          backgroundColor={'#1f2124'}
          borderBottomColor={'#fff'}
          centerComponent={{ text: disname, style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#67DBFF' } }}

      />
      <Comment
          type={'club'}
          tag={disname}
      />
      </Modal> 



        <ScrollView
        stickyHeaderIndices={[0]}
     
          >   
    
          <TouchableOpacity 
          
          onPress={()=> this.props.navigation.navigate('CLUB')}
          >
            <View
             style={{flexDirection:'row',
               
             }}>
          <Image source={require('../assets/back.png')}
                      
         style={{width:70,height:80,marginLeft:-15,marginTop:25,resizeMode:'cover'}}
    />   
    
    </View>
    </TouchableOpacity>
        
           
          

        <View style={{ flex: 2,marginTop:-105}}>
        
        <ImageBackground    source={{uri:topimage.toString()}} style={{height:200,width:375 }}>
        <View style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      
         </View> 
        </ImageBackground>  
      
        <View >
       
              </View>
          <Text style={{fontFamily:'title-font' ,fontSize:60,marginLeft:10,color:'#67DBFF' }}> {JSON.stringify(disname).replace(/^"(.+)"$/,'$1')}</Text>
         
               
          <View style={{marginTop: 0,width:100}}>
          
          
          </View>
          <View style={{ flexDirection: 'row', flex: 3 ,marginTop:20}} >
            
           
          <View style={{ flex: 1 ,alignItems:'center'}}>
            <TouchableOpacity
              onPress={()=>  Linking.openURL(JSON.stringify(location).replace(/^"(.+)"$/,'$1')).catch((err) => console.error('An error occurred', err))}
               
            >
              <Image
                style={{
                  width: 30, flex: 1,
                  height: 30, alignContent: 'center',
                }}
                resizeMode={'contain'}
                source={require('../assets/place_lo.png')}
              />
             </TouchableOpacity>
  
            
                
              </View>
  
              <View style={{ flex: 1 ,alignItems:'center'}}>
              <View style={{ flex: 1 ,flexDirection:'row'}}>
            {this.state.voted ? (

<TouchableOpacity


  onPress={() => this.check()}>
            <Image
              style={{
                width: 30, flex: 1,
                height: 30, alignContent: 'center',
                
              }} 
              resizeMode={'contain'}
              source={require('../assets/Vector_f.png')}
            />

</TouchableOpacity>
          )
            : (<TouchableOpacity
              // styles={{textAlign:'center'}}

              onPress={() => this.check()} >

     <Image
              style={{
                width: 30, flex: 1,
                height: 30, alignContent: 'center',
                
              }} 
              resizeMode={'contain'}
              source={require('../assets/Vector.png')}
            />
</TouchableOpacity>
            )}
           <Text style={{ textAlign: 'left', fontSize: 20,color:'#67DBFF',marginBottom:3}}>{upvote}</Text>
              </View>
              </View>
              <View style={{ flex: 1 ,alignItems:'center'}}>
              <TouchableOpacity 
          
          onPress={() => {
            this.onClickComment();
          }}
          >
              <Image
                style={{
                  width: 30, flex: 1,
                  height: 30, alignContent: 'center'
                }}
                resizeMode={'contain'}
                source={require('../assets/baseline-chat-24px.png')}
              />
              </TouchableOpacity>
            
             
              </View>
            
            </View>
          
          
          <Texteditor
          
          text={vivid}/>
        
 </View>  
 {/*
        <SafeAreaView style={styles.container}>
        <View style={styles.content1}>
          
        </View>
     <ImageSlider
          loopBothSides
         // autoPlayWithInterval={3000}
          images={images}
          style={{height:imageheight,width:imagewidth }}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
             
              {images.map((image, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    underlayColor="#f00"
                    onPress={() => move(index)}
                    style={styles.button}
                  >
                    <Text style={position === index && styles.buttonSelected}>
                     
                    </Text>
                  </TouchableHighlight>
                );
              })}
            </View>
          )}
        /> 
      
       
      </SafeAreaView>
            */}
     
    { /* <View  style={{   marginLeft:20, flexDirection:'row',marginRight:20}} >
      <MaterialIcons name='date-range'  size={30}  color ="grey" /> 
     <Text style={{textAlign:'left', fontSize:20,color:'grey'}}> {JSON.stringify(date).replace(/^"(.+)"$/,'$1')} </Text> 
       </View>
       <View  style={{   marginLeft:23, flexDirection:'row'}} >
      <Ionicons name='md-time'  size={30}  color ="grey" /> 
        
      <Text style={{textAlign:'left', fontSize:20,color:'grey'}}>  {JSON.stringify(time).replace(/^"(.+)"$/,'$1').replace(/,.,/g, '\n')} </Text> 
       </View>
       <View  style={{   marginLeft:20, flexDirection:'row'}} >
      < FontAwesome name='won'  size={30}  color ="grey" /> 
      <Text style={{textAlign:'left', fontSize:14,color:'grey'}}> {JSON.stringify(money).replace(/^"(.+)"$/,'$1').replace(/,.,/g, '\n')}</Text> 
       </View>
       <View  style={{   marginLeft:20, flexDirection:'row'}} >
      <Entypo name='location'  size={30}  color ="grey" />  
      <Text   
        
           onPress={()=>  Linking.openURL("http://kko.to/3YRYTLyTB").catch((err) => console.error('An error occurred', err))}
      style={{textAlign:'left', fontSize:20,color:'blue',  }}> [ {JSON.stringify(location).replace(/^"(.+)"$/,'$1')} ]</Text> 
       </View>
      
       <View  style={{   marginLeft:20, flexDirection:'row'}} >
      <Feather name='info'  size={30}  color ="grey" /> 
      <Text style={{textAlign:'left', fontSize:20,color:'grey'}}> [ {JSON.stringify(tips).replace(/^"(.+)"$/,'$1')} ]</Text> 
       </View>*/}
        </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer: {
      flexDirection: 'row',
      backgroundColor: '#222',
    },
    image: {
      width: 200,
      height:100,
      height: '100%',
    },
    buttons: {
      height: 15,
      marginTop: 0,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: {
      margin: 3,
      width: 8,
      height: 8,
      borderRadius: 8 / 2,
      backgroundColor: '#ccc',
      opacity: 0.9,
    },
    buttonSelected: {
      opacity: 1,
      backgroundColor: '#fff',
    },
  });
  export default  CLUBEX;
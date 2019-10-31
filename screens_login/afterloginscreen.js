import React from 'react';
import {  Text, View ,StyleSheet, Image,TouchableHighlight,Dimensions,FlatList} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer,  withNavigation} from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import CHOSEarea from '../components/areachoose'
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import ProgressLoader from 'rn-progress-loader';

const wrapper = {
    padding: '5%'
};
const styles = StyleSheet.create({
    backgroundImage:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: null,
        height: null,
        opacity:0.5,
        resizeMode: 'cover',
    },
    wrapper:{
        display: 'flex',
        paddingLeft: wrapper.padding,
        paddingRight: wrapper.padding,
    },
    loginWrapper: {
        display:'flex',
        justifyContent:'center',
        height:'30%',
    },
    loginLogo: {
        textAlign:'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputBox: {
        borderRadius: 30,
        borderBottomWidth: 0,
    }, icon: {
        width: 141,
        height: 200,
        
        marginRight:10,
        borderWidth:2,borderColor:'#56B8FF',borderRadius:5
      },
});

const ProfileTopWrap = styled.View`
    display:flex;
    flex-direction: row;  
    padding:0 20px;
`;
const ProfileTopImage = styled.TouchableHighlight`
    width:75px;
    height:75px;
    border-radius:75px;
`;
const ProfileImage = styled.Image`
    width:75px;
    height:75px;
    border-radius: 37.5;
`;

const ProfileTopRight = styled.View`
    display:flex;
    flex-direction: column;  
    margin-left:20px;
`;




class Profile extends React.Component {


    constructor(props){
        super(props)


        this.state=({
            email: '',
            password: '',
            data:[],
            area:"MY AREA",
            currentarea:0,
            currentarea1:0,
            loadVisible:false,
            datasource:[],
            datasource1:[],

        })
    }
    componentDidMount() {


        // Toggle the state every second
        setInterval(
            () => this.setState({ currentarea1:this.state.currentarea }),
          
            1000
        );
      


        this.makeRemoteRequest();

    }

    makeRemoteRequest = () => {
       
        this.renderarea();
      this.SortTravel();
      this.SortRes();
     

    }; 
    choosearea = () => {


        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

        firebase.database().ref('userinfo/' + code ).update({

            area:null,
        }, function () {

        });


    };
    renderItem =({item})=>{

        return(
          <TouchableOpacity
          onPress={() => {

        
           if(item.cate!="more"){
               

                 this.props.navigation.navigate('TTi', {
                   name : item.name,
                   description :item.description,
                   location: item.location,
                   topimage : item.topimage,
                   cate:item.cate,
                   upvote:this.state.upvote,//item.upvote,
                   imagelist:item.images,
                   from:"profile",
                 //  imagelist:item.images,
                   //tips:item.tips,
                }); 
                }
        if(item.cate=="more"){
             this.props.navigation.navigate('TTlist',{

               name : item.name,
             });

            
        }
         
         }
       
       }
          >
         <View  style={{  flex:1,  marginLeft:10,flexDirection:'row',marginBottom:6,borderColor:'black'}} >
                 <Image  style={styles.icon}
                       source={{uri:item.topimage}}
                
                />
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

  renderItem1 =({item})=>{

    return(
      <TouchableOpacity
      onPress={() => {

    
        this.props.navigation.navigate('WTEA1', {
            name : item.name,
            description :item.description,
            location: item.location,
            loca: item.loca,
            topimage : item.topimage,
            imagelist: item.images,
            disname:item.disname,
            cate:item.cate,
            from:"profile"
           // cate:item.cate,
           // upvote:item.upvote,
          
          //  imagelist:item.images,
            //tips:item.tips,
         });
        
    
     
     }
   
   }
      >
     <View  style={{  flex:1,  marginLeft:10,flexDirection:'row',marginBottom:6,borderColor:'black'}} >
             <Image  style={{height:141,width:141, resizeMode:'cover',
                 marginRight:10,
              borderWidth:2,borderColor:'#56B8FF',borderRadius:5}}
                   source={{uri:item.topimage}}
            
            />
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

    loading(){
        /* TODO : rendering 을 계속하는 함수 나중에 따로 뺴는게 좋을듯 */
        // console.log(this.state.currentarea,"current area")
        var m;
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

        var usersRef = firebase.database().ref('userinfo/'+code+'/area');


        usersRef.on('value', (snapshot) => {


            m = snapshot.val()



            this.state.currentarea=m;

            //  this.setState({ currentarea: m});
            // console.log("here,,m",m);
        })
    }
    renderarea() {

        //  await loading();
        //console.log("this.state.currentarea",this.state.currentarea);
        if(this.state.currentarea1===0){

            return ;
        }
        if(this.state.currentarea1==null){

            return <CHOSEarea/>
        }
        if(this.state.currentarea1===1){


            return  <Image  style={{ resizeMode:'cover', marginLeft:18,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%201.png?alt=media&token=71eadde1-f1b7-4ecd-b7c6-8ab0e62ab502"}} />

        }
        if(this.state.currentarea1===2) {

            return  <Image  style={{ resizeMode:'cover', marginLeft:18,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%202.png?alt=media&token=364cf838-d93a-4183-bcbb-f456105f766d"}} />

        }
        if(this.state.currentarea1===3)
            return  <Image  style={{ resizeMode:'cover', marginLeft:18,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%203.png?alt=media&token=1b8a44d2-4dfc-437d-8e5a-9ff0d8a36f0a"}} />

        if(this.state.currentarea1===4)
            return  <Image  style={{ resizeMode:'cover', marginLeft:18,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%204.png?alt=media&token=9f42a327-15cd-433f-9fe7-df89cb418525"}} />




    }  
     
    SortRes() {
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        var usersRef = firebase.database().ref('userinfo/' + code + '/user_like_history_areae');
       var lists = [];
       var final_lists=[];
        var num_of_like;
         var data_res=[];
        usersRef.once('value', (snapshot) => {
          var m = snapshot.val()
          str = m;
    
         
          str = " " + str;
    
          var words = str.split(',');
          num_of_like=str.split(",").length;
          for (i = 0; i < str.split(",").length; i++) {
            var word=words[i].split(':');
           console.log(word[0],"word0",word[1]);
           lists.push(word[0]);
           var usersRef1 = firebase.database().ref(word[1]+'/'+word[0]);
           usersRef1.once('value', (snapshot) => {
   
   
               var m=snapshot.val() 
           
              console.log(m);
              if(m!=null)
             data_res.push(m);
      
             console.log(data_res,"date1");
            
             this.setState({ datasource1: data_res })
   
           }) 
        //   var result= data_travel.reduce((o, m) => m.concat(o), []);

      //  this.setState({ datasource: data_travel })
          }
           



       
        });


      



      
     


    }
    SortTravel() {
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;
        var usersRef = firebase.database().ref('userinfo/' + code + '/user_like_history');
       var lists = [];
       var final_lists=[];
        var num_of_like;
         var data_travel=[];
        usersRef.once('value', (snapshot) => {
          var m = snapshot.val()
          str = m;
    
         
          str = " " + str;
    
          var words = str.split(',');
          num_of_like=str.split(",").length;
          for (i = 0; i < str.split(",").length; i++) {
            var word=words[i].split(':');
           console.log(word[0],"word0",word[1]);
           lists.push(word[0]);
           var usersRef1 = firebase.database().ref('travel/'+word[1]+'/'+word[0]);
           usersRef1.once('value', (snapshot) => {
   
   
               var m=snapshot.val() 
           
              console.log(m);
              if(m!=null)
             data_travel.push(m);
      
             console.log(data_travel,"date1");
            
             this.setState({ datasource: data_travel })
   
           }) 
        //   var result= data_travel.reduce((o, m) => m.concat(o), []);

      //  this.setState({ datasource: data_travel })
          }
           



       
        });


      



      
     


    }

    _uploadImage = async (uri, imageName) => {
        if(!uri) return true;
        const response = await fetch(uri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child("user/" + firebase.auth().currentUser.uid);
        return ref.put(blob);
    };

    changeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({loadVisible:true});
            this._uploadImage(result.uri).then((response)=>{
                return firebase.storage().ref('user').child(firebase.auth().currentUser.uid).getDownloadURL();
            }).then((response)=>{
                console.log('download url', response);
                return firebase.auth().currentUser.updateProfile({
                    photoURL:response
                });
            }).finally(()=>{
                this.setState({loadVisible:false});
            });
        }
    };

    render() {
        return (
            <ScrollView>
            <View    style={ {  marginTop:60}} >
                <ProgressLoader
                    visible={this.state.loadVisible}
                    isModal={true} isHUD={true}
                    color={"#000000"}
                    barHeight={80}
                />

                <ProfileTopWrap>
                    <ProfileTopImage onPress={()=>{this.changeImage()}}>
                        <ProfileImage source={{ uri:firebase.auth().currentUser.photoURL }} />
                    </ProfileTopImage>
                    <ProfileTopRight>
                        <Text style={ {color:'#56B8FF', fontFamily:'title-font',fontSize:28} }>
                            {firebase.auth().currentUser.displayName}
                        </Text>
                        <Text style={ {color:'black', fontFamily:'content-font',fontSize:18} }>
                            {firebase.auth().currentUser.email}
                        </Text>

                    </ProfileTopRight>
                </ProfileTopWrap>

                <View style={{flexDirection:'row'}}>
                    <Text style={ { fontFamily:'title-font',marginTop:60,fontSize:30,marginLeft:18 } }> {this.state.area}</Text>
                    <TouchableOpacity
                        onPress={()=>this.choosearea()
                        }
                    >
                        <Text style={ { fontFamily:'title-font',color:'grey',marginTop:70,fontSize:20,marginLeft:80} }> change..</Text>
                    </TouchableOpacity>
                </View>
                {  this.loading()}
                {this.renderarea()}
                <View style={{ flexDirection: 'row',marginTop:60,marginBottom:10}} >
            
           
           
                  
              <TouchableOpacity
               
        
                  onPress={()=>
                
                  this.llink()}
                  
              >
                <Image
                  style={{
                    width: 30, flex: 1,marginLeft:18,
                    height: 30, alignContent: 'center',
                  }}
                  resizeMode={'contain'}
                  source={require('../assets/black_.png')}
                />
               </TouchableOpacity>
    
               
                  
               
                <Text style={ { fontFamily:'title-font',fontSize:26} }> liked places </Text>
             
                </View>

                
                <View  style={{marginLeft:0}}>
                <FlatList 
     
     data={this.state.datasource}
     
     renderItem={this.renderItem}
     
     horizontal={true}
     keyExtractor={item => item.name}
     initialNumToRender={4}
     maxToRenderPerBatch={4}
    // ListHeaderComponent={this.renderHeader}
 //   ListFooterComponent={this.renderFooter}
     onRefresh={this.handleRefresh}
     refreshing={this.state.refreshing}
  
    
      
  
   />
    </View>
    <View style={{ flexDirection: 'row',marginTop:30,marginBottom:10}} >
            
           
           
                  
            <TouchableOpacity
             
      
                onPress={()=>
              
                this.llink()}
                
            >
              <Image
                style={{
                  width: 30, flex: 1,marginLeft:18,
                  height: 30, alignContent: 'center',
                }}
                resizeMode={'contain'}
                source={require('../assets/black_.png')}
              />
             </TouchableOpacity>
  
             
                
             
              <Text style={ { fontFamily:'title-font',fontSize:26} }> liked restaurants </Text>
           
              </View>

              
              <View  style={{marginLeft:0}}>
              <FlatList 
   
   data={this.state.datasource1}
   
   renderItem={this.renderItem1}
   
   horizontal={true}
   keyExtractor={item => item.name}
   initialNumToRender={4}
   maxToRenderPerBatch={4}
  // ListHeaderComponent={this.renderHeader}
//   ListFooterComponent={this.renderFooter}
   onRefresh={this.handleRefresh}
   refreshing={this.state.refreshing}

  
    

 />
  </View>
     
            </View>
            
            </ScrollView>

        );
    }
}
export default  withNavigation(Profile);


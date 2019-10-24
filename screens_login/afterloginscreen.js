import React from 'react';
import {  Text, View ,StyleSheet, Image,TouchableHighlight,Dimensions} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer,  withNavigation} from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CHOSEarea from '../components/areachoose'

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
    }, profileImgContainer: {
        marginLeft: 20,
        height: 150,
        width: 150,
        borderRadius: 75,
        
      },
      profileImg: {
        height: 75,
        width: 75,
        borderRadius: 37.5,
      },
});


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
 
      })
    }
    componentDidMount() {
    
         if(this.state.currentarea==0){
        // Toggle the state every second
        setInterval(
          () => this.setState({ currentarea1:this.state.currentarea }),
          1000
        );
         }
   

        this.makeRemoteRequest();

      }
    
      makeRemoteRequest = () => {
        
        this.renderScreen()
    
     
      };
       
      loading(){

        console.log(this.state.currentarea,"ㅇ이거")
        var m;
        var code = firebase.auth().currentUser.email.substring(0, 4) + '_' + firebase.auth().currentUser.displayName;

        var usersRef = firebase.database().ref('userinfo/'+code+'/area');
    
    
         usersRef.on('value', (snapshot) => {
    
    
         m = snapshot.val()
      
    
        
         this.state.currentarea=m;
        
        //  this.setState({ currentarea: m});
          console.log("here,,m",m);
       }) 
      }
      renderScreen() {
           
          //  await loading();
          console.log("this.state.currentarea",this.state.currentarea);
            if(this.state.currentarea1==0){

            return ;
            }
           if(this.state.currentarea1==null){
              
           return <CHOSEarea/>
           }
           if(this.state.currentarea1==1){
         
         
           return  <Image  style={{ resizeMode:'cover', marginLeft:120,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%201.png?alt=media&token=71eadde1-f1b7-4ecd-b7c6-8ab0e62ab502"}} />
         
          }
           if(this.state.currentarea1==2) {
           
           return  <Image  style={{ resizeMode:'cover', marginLeft:120,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%201.png?alt=media&token=71eadde1-f1b7-4ecd-b7c6-8ab0e62ab502"}} />
        
          }
           if(this.state.currentarea1==3)
           return  <Image  style={{ resizeMode:'cover', marginLeft:120,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%201.png?alt=media&token=71eadde1-f1b7-4ecd-b7c6-8ab0e62ab502"}} />
       
           if(this.state.currentarea1==4)
           return  <Image  style={{ resizeMode:'cover', marginLeft:120,marginTop:10,padding:0.5 ,width:120, height:39, borderRadius:10 }} source={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/Home%2Farea%201.png?alt=media&token=71eadde1-f1b7-4ecd-b7c6-8ab0e62ab502"}} />
       
          
          

       }


  render() {

    let screenwidth=Dimensions.get('window').width;
    let screenheight=Dimensions.get('window').height; 
   

    return (


        <View    style={ {  marginTop:60}} >
            <View    style={ { flexDirection:'row'}} >
        <TouchableHighlight 
      style={ [styles.profileImgContainer]}
       
    >    

    <Image source={{ uri:
        "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/display.jpeg?alt=media&token=798c01c6-4684-44f4-b662-79d1fbc65f97" }} style={styles.profileImg} />
        </TouchableHighlight>
   
        <Text style={ {color:'#56B8FF', fontFamily:'title-font',fontSize:28,marginTop:10, marginLeft:-60} }>{firebase.auth().currentUser.displayName
                }</Text>
        </View>

        <Text style={ {color:'black', fontFamily:'content-font',fontSize:18,marginTop:-40,marginLeft:18 } }>{firebase.auth().currentUser.email
                }</Text>
             
       
          <TouchableOpacity
           onPress={()=>this.choosearea()
             }
          >   
  <Text style={ { fontFamily:'title-font',marginTop:60,fontSize:30,marginLeft:18 } }> {this.state.area}</Text>
            </TouchableOpacity>
            {  this.loading()}
            {this.renderScreen()}
          
          
          

          <Text style={ {color:'#56B8FF', fontFamily:'content-font',marginTop:60,fontSize:18,marginLeft:18 } }> liked places,food,etc</Text>

          <Text style={ {color:'#56B8FF', fontFamily:'content-font',fontSize:18,marginLeft:18 } }> personal area preference</Text>

          <Text style={ {color:'#56B8FF', fontFamily:'content-font',fontSize:18,marginLeft:18 } }> short cuts and more to come!</Text>
        



        
     
      
     
               

            </View>
       
    );
  }
}
export default  withNavigation(Profile);


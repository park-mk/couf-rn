import React from 'react';
import {  Text, View ,StyleSheet, Image,TouchableHighlight} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer,  withNavigation} from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'


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
 
      })
    }
    componentDidMount() {
    
        this.makeRemoteRequest();
      }
    
      makeRemoteRequest = () => {
        
         
    
     
      };

  render() {
    
   console.log('데이터다',firebase.auth().currentUser);
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





          <Text style={ {color:'#56B8FF', fontFamily:'content-font',marginTop:60,fontSize:18,marginLeft:18 } }> liked places,food,etc</Text>

          <Text style={ {color:'#56B8FF', fontFamily:'content-font',fontSize:18,marginLeft:18 } }> personal area preference</Text>

          <Text style={ {color:'#56B8FF', fontFamily:'content-font',fontSize:18,marginLeft:18 } }> short cuts and more to come!</Text>
        



        
     
      
     
               

            </View>
       
    );
  }
}
export default  withNavigation(Profile);


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
        marginLeft: 8,
        height: 150,
        width: 150,
        borderRadius: 75,
      },
      profileImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
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
        <Container style={styles.wrapper} >
           
            <Image style={styles.backgroundImage} source={require('../assets/images/soldier1.jpg')} />
            <View    style={ { justifyContent: 'center', alignItems: 'center',marginTop:30}} >
            <TouchableHighlight 
          style={ [styles.profileImgContainer]}
         
        >

        <Image source={{ uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/display.jpeg?alt=media&token=798c01c6-4684-44f4-b662-79d1fbc65f97" }} style={styles.profileImg} />
            </TouchableHighlight>
            
            
         
          
            <Button style={ {marginTop: 40, backgroundColor:'#bfb393' } }
                        full
                        rounded
                        sucess
                       
                >
                    <Text style={ {color:'white', fontWeight:'bold'} }>Disply Name:{firebase.auth().currentUser.displayName
                    }</Text>
                </Button>
               
                <Button style={ {marginTop: 10, backgroundColor:'#bfb393' } }
                        full
                        rounded
                        sucess
                       // onPress={() => firebase.auth().currentUser.metadata.push("ss")}
                >
                    <Text style={ {color:'white', fontWeight:'bold'} }>Email:{firebase.auth().currentUser.email
                    }</Text> 
                       
                 
                    
                </Button>
              
                   

                </View>
           
        </Container>
    );
  }
}
export default  withNavigation(Profile);


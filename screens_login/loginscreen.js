import React from 'react';
import {  Text,Modal, ScrollView,View ,TextInput,StyleSheet, Image,TouchableOpacity, AsyncStorage,Linking} from 'react-native';
import  firebase from "../firebase";
import{FormLabel,FormInput} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer,withNavigation } from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Label,Button} from 'native-base'
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';

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
    },
});


 class LoginScreen extends React.Component {


    constructor(props){
      super(props)
           

      this.state=({
       email: '',
       email2:'',
       first:'',
       last:'',
       password: '',
       Visible1:false
 
      })
    }

  
 
    logout = () => {
      setLoggedinStatus(false);
      setUserData(null);
      setImageLoadStatus(false);
    }
   singUpUser=(email,password)=>{
     try {
        if(this.state.password.length<6){
          alert("longer than 6 please")
          return 
        }
          else  alert("success singup")
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email.trim(),password)
     }
   
     catch(error){
      console.log(error.toString())
   }
  }
    
  loginUser=(email,password)=>{
    const { navigation } = this.props;
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        alert("loginsuccess") 
        navigation.navigate('Profile')
       
      })

     
    }
    catch(error){
      console.log(error.toString())
    }
  }
  check_login_server_open=() => {     
    var mm;
    var usersRef4 = firebase.database().ref('zpushalarm');
    usersRef4.once('value', (snapshot) => {

    
        mm = snapshot.val()
        console.log(mm);
       console.log(mm.login);

      

    }).then((check) => {
      console.log(mm,'checkk')
        if (mm.login== "yes") {
          this.setState({ Visible1:true});
        }
        else {
        
          alert("The login server has not yet been opened, Please contact us through Kakao!")
        }
      });
  
};
  changeEmail=(email) => {     
    this.setState({email: email});
  
};
changeEmail2=(email2) => {     
  this.setState({email2: email2});

};
changeFisrt=(first) => {     
  this.setState({first: first});

};
changeLast=(last) => {     
  this.setState({last: last});

};
  signin_via_email= ()=>{
    const { navigation } = this.props;
    if(this.state.email==''){
      alert("email can't be null!")
    }
    else if(this.state.email2==''){
     alert("email can't be null!")
   }
  else if(this.state.first==''){
     alert("first name can't be null!")
   }
  else  if(this.state.last==''){
     alert("last name can't be null!")
   }
   else {
   var final_email = this.state.email+"@"+this.state.email2;
   var name =this.state.first+"  "+this.state.last;
  
   firebase.auth().createUserWithEmailAndPassword(final_email,"123456789a").then(function () {

   }).then(function () {
       let user = firebase.auth().currentUser;
       return user.updateProfile({
           displayName: name,
          // photoURL:obj.picture.data.url,
       });
    
      alert("please wait");
   }).then(function(){
   
    // AsyncStorage.setItem('loginc', "first!");
  

    try{
           
     firebase.auth().signInWithEmailAndPassword(final_email,"123456789a").then(function(user){
     
     }).then(function(){
       
       alert("login success!")
       navigation.navigate('Profile')
       this.setState({Visible1:false})
       
     }
     )
     
    
   }
   catch(error){
     console.log(error.toString())
   }
    

   }).catch(function(error) {
     
     

    
   });
   

   }
 }


  appleLogIn = async (information) => {
    const { navigation } = this.props;
  
    if(information.email!==null){

    firebase.auth().createUserWithEmailAndPassword(information.email.trim(),"123456789a").then(function () {

    }).then(function () {
        let user = firebase.auth().currentUser;
        return user.updateProfile({
            displayName: information.fullName.givenName+information.fullName.familyName,
           // photoURL:obj.picture.data.url,
        });
     
       alert("please wait");
    }).then(function(){
      firebase.database().ref('appleuser/'+information.user.replaceAll('.', 'a') ).update({
        email: information.email,
      }, function () {
            
      })
  
        navigation.navigate('Profile');

    }).catch(function(error) {
        if(typeof error.message == 'string') 
        
        alert("please wait");
        console.log(error.message);


        try{
             alert(information.email)
            firebase.auth().signInWithEmailAndPassword(information.email,"123456789a").then(function(user){
        
              firebase.database().ref('appleuser/'+information.user.replaceAll('.', 'a') ).update({
                email: information.email,
              }, function () {
                    
              })
          
              
              alert("Welcome!")
             
             
              
            }).then( navigation.navigate('Profile'))
      
           
          }
          catch(error){
            console.log(error.toString())
          }
    });
    

    }
    if(information.email===null){ 

    
      
       var usersRef = firebase.database().ref('appleuser/'+information.user.replaceAll('.', 'a'));
       usersRef.once('value', (snapshot) => {
  
  
        let  m = snapshot.val()
        if(m===null){
          alert("if this alert continues to pop up, please go to Settings -> APPLE ID ->Password & Security   to cancel providing your ID to this app  and retry  THANK YOU.");
        }else{
          
        try{
          console.log("so try login")
          firebase.auth().signInWithEmailAndPassword(m.email,"123456789a").then(function(user){
          alert("If the screen doesn't change, please turn the app off and on.");
        
          navigation.navigate('Profile')
           
           
            
          })
    
         
        }
        catch(error){
          console.log(error.toString())
        }
        
        }
      }, function (m) {
          
      }).then((m)=>{
        
       
      }).catch(function(error) {
        
        alert("damn it ");
      });
    }

  }
  



  async  signInWithFacebook() {
    const { navigation } = this.props;
    try {
      await Facebook.initializeAsync({
        appId: '1998302263810491',
      });
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(
        //'1998302263810491'
       {permissions: ['public_profile','email'],}
      );
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
       // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
       const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      );
       
        const responseJSON = JSON.stringify(await response.json());
        console.log(responseJSON);
        var obj = JSON.parse(responseJSON);
        console.log(obj.name);
        console.log(obj.email);
        console.log(obj.picture.data.url);
       // const stripped = phrase.split('dog').join('')
       // console.log(JSON.stringify(response) );
       // console.log( JSON.stringify(response.email)  );
       
       

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook 1 Error: ${message}`);
      alert("fisrt ${message}");
    }
   var password="123456789a"
 
    firebase.auth().createUserWithEmailAndPassword(obj.email.trim(),"123456789a").then(function () {

    }).then(function () {
        let user = firebase.auth().currentUser;
        return user.updateProfile({
            displayName: obj.name,
            photoURL:obj.picture.data.url,
        });
        /*
                    }).then(function(response){
                        let code=email.substring(0,4)+"_"+displayname;

                        ??? 나중에 뭔지 물어보기
                        firebase.database().ref('userinfo/'+ code).update({
                            email:email,
                            user_like_history:"",
                            displayName:displayname,

                        }, function(){
                            alert('Success');
                        });
        */

       alert("please wait");
    }).then(function(){
        navigation.navigate('Profile');

    }).catch(function(error) {
        if(typeof error.message == 'string') 
        
        alert("please wait");
        console.log(error.message);


        try{
            console.log("so try login")
            firebase.auth().signInWithEmailAndPassword(obj.email,"123456789a").then(function(user){
            alert(" Login Success!")
            navigation.navigate('Profile')
             
             
              
            })
      
           
          }
          catch(error){
            console.log(error.toString())
          }
    });
    







      



////여기 

  }




   
  render() {
    const { navigation } = this.props;
    
    return (
       
        <View    style={ { alignItems:'center' }} >
             <Text style={ {color:'#56B8FF', fontFamily:'title-font',fontSize:40 ,marginTop:40,textAlign:'center' } }>LOGIN </Text>
           
                <TouchableOpacity
                             style={{
                                marginBottom:1,
                              
                                marginTop:200,
                             }}
                             onPress={()=> this.signInWithFacebook()}
                    >
 

                        <Image
                            style={{
                                borderRadius:7,
                                width: 200,
                                height: 50,
                                
                            }}
                            source={require('../assets/facebook.png')}
                            resizeMode={'contain'}
                        />

                        
                    </TouchableOpacity>
                    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: 200, height: 44, marginTop:120 }}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          const { identityToken, email, state } = credential;
        
          this.appleLogIn (credential);
       //   alert("trying");
        } catch (e) {
          if (e.code === 'ERR_CANCELED') {
            alert(e)
            // handle that the user canceled the sign-in flow
          } else {
            alert(e)
            // handle other errors
          }
        }
      }}
    />
    <Text> YOU MUST PROVIDE YOUR EMAIL INFO~</Text>
    <TouchableOpacity
    
                            onPress={() =>this.check_login_server_open()}
                        >
                           <Text style={{height:50,fontSize:20,marginTop:30,color:'grey',textDecorationLine:'underline'}}>Login in via email:</Text>
                 </TouchableOpacity>
         
    <Text style={{height:50,fontSize:13,marginTop:30,color:'grey',textDecorationLine:'underline'}}>If this screen is still maintained and the login is needed every time,Contact us through kakao :</Text>
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
           <Modal 
           visible={this.state.Visible1}
           // visible={this.state.Visible1}
          style={ { alignItems:'center' }} >
            <ScrollView>
                <TouchableOpacity
                            onPress={() =>this.setState({Visible1:false})}
                        >
                            <Image source={require('../assets/back.png')}

                                   style={{marginTop:40,width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
                            />
                        </TouchableOpacity>
               <View    style={ { alignItems:'center' }} >

     
               <Image
                            style={{
                                borderRadius:7,
                                width: 100,
                                height: 100,
                             marginTop:20
                            }}
                            source={require('../assets/images/ico.png')}
                            resizeMode={'contain'}
                        />
                          <Text style={{height:50,fontSize:20,marginTop:30,color:'grey'}}>Sign up with email</Text>
                           <View
         style={{flexDirection:'row'}}
        >
          
          <View
                style={{borderBottomWidth:2,borderBottomColor:'#C5C5C5',width:150}}
      >    
                         <TextInput
                                     autoCapitalize='none'
                                 onChangeText={(email) => this.changeEmail(email)}
                                    value={this.state.email}
                                    autoCapitalize = 'none'
                                    textAlignVertical='top'
                                    style={{marginTop:30,fontSize:24}}
                             />
           
           </View>        
       
        <Text style={{height:50,fontSize:24,marginTop:30,color:'grey'}}>@</Text>
        <View
                style={{borderBottomWidth:2,borderBottomColor:'#C5C5C5',width:150}}
      >           
        <TextInput
                                    
                                    onChangeText={(email2) => this.changeEmail2(email2)}
                                       value={this.state.email2}
                                       autoCapitalize = 'none'
                                       textAlignVertical='top'
                                       style={{marginTop:30,fontSize:24}}
                                />      

      </View>        
    </View>
    <View
         style={{flexDirection:'row',marginTop:20}}
      >
      
                
       <Text style={{marginLeft:-70,height:50,marginTop:0,fontSize:20,marginTop:0,color:'grey'}}>first name:</Text>
       <View
         style={{borderBottomWidth:2,borderBottomColor:'#C5C5C5',width:130}}
       >
    <TextInput
                                    
                                    onChangeText={(first) => this.changeFisrt(first)}
                                       value={this.state.first}
                                     
                                       textAlignVertical='top'
                                       style={{marginRight:28,marginTop:10,fontSize:24}}
                                />     
       </View>
     </View>
     <View
         style={{flexDirection:'row'}}
      >
                 
       <Text style={{marginLeft:-70,height:50,marginTop:20,fontSize:20,marginTop:0,color:'grey'}}>last name:</Text>
       <View
         style={{borderBottomWidth:2,borderBottomColor:'#C5C5C5',width:130}}
       >
       <TextInput
                                    
                                    onChangeText={(first) => this.changeLast(first)}
                                       value={this.state.last}
                                     
                                       textAlignVertical='top'
                                       style={{marginRight:28,marginTop:10,fontSize:24}}
                                />     
          </View>
             </View>

<View
         style={{flexDirection:'row',marginTop:10,marginLeft:20,marginRight:40}}
        >
           
               </View>         
               
               
               <TouchableOpacity
                    onPress={() =>  this.signin_via_email()}
              >
    <Image
                            style={{
                              marginTop:20,
                                borderRadius:7,
                                width: 100,
                                height: 60,
                          
                            }}
                            source={require('../assets/sign_in_button.png')}
                            resizeMode={'contain'}
                        />
           </TouchableOpacity>


        
                           <View
         style={{flexDirection:'row',marginTop:160}}
        >
              <Text style={{height:50,fontSize:13,marginTop:30,color:'grey',textDecorationLine:'underline'}}>Contact us through kakao :</Text>
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
                        </View>
                       
    </View>
    </ScrollView>
    </Modal>




        </View>
        
       
       
         
       

          
    );
  }
}
export default withNavigation(LoginScreen);


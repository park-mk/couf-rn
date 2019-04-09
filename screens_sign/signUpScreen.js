import React from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity,BackHandler} from 'react-native';
import * as firebase from 'firebase'
import BirthdayPicker from '../components/yearmonth'
import { FormLabel, FormInput, FormValidationMessage ,CheckBox,Slider  } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import {Container, Form, Item, Button, Input} from 'native-base'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const wrapper = {
    padding: '5%'
};
const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        paddingLeft: wrapper.padding,
        paddingRight: wrapper.padding,
    },
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
  
});
/*
var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'https://www.example.com/?email=immk100797@gmail.com' ,
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };*/

class SignUpScreen extends React.Component {
    constructor(props){
        super(props)

        this.state=({
            email: '',
            password: '',
            password2:'',
            firstname:'',
            lastname:'',
            age:'',
            male:false,
            female:false,
            checked: false,
            verify:0, 
            year:0,
            month:0,
            day:0,
            vvv:'verify',
            
           

        })
    }
   static navigationOptions={
          title:'SignUpScreen',
          headerLeft:null,

   }
   componentWillMount(){ 
       if(firebase.auth().currentUser!=null){
        this.state.vvv="verifying"+firebase.auth().currentUser.email;
           if(firebase.auth().currentUser.emailVerified==false)
       this.state.vvv="verified";
    
    }
    BackHandler.addEventListener('hardwareBackPress',function(){
        return true;
    });

   } 

     
   makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
    const move = navigation.getParam('move', 'NO-ID');

   
    
    
   
  };
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

   


    singUpUser=(email,password)=>{
      
    }

    singUpUser1=(email,password)=>{ 
        console.log(email);
     
  
          alert("next step"); 
        
            
          if(this.state.password==this.state.password2){
       
         if(this.state.year!=0){
        if(this.state.male^this.state.female){


            try {
                if(this.state.password.length<6){
                    alert("longer than 6 please")
                    return
                } 
             
                console.log(email, password);
                firebase.auth().createUserWithEmailAndPassword(email.trim(),password).then(function(user){
                    alert("create success");
                    console.log(user);
                })
                
              
                 
            }
    
            catch(error){
                console.log(error.toString())
            }


            this.props.navigation.navigate('SignUp1', {
                email : email,
                password: password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                male:this.state.male,
                female:this.state.female,
                year:this.state.year,
                month:this.state.month,
                day:this.state.day,
        
             });
         
        }
        else alert("please check your gender ");}
        else
        alert("please check your birthday")}

       
        else alert("confirming password is different with your password")




       
       }
       
    
     
    Out=(email,password)=>{
        try {
            var user = firebase.auth().currentUser;
             
              if(user!=null ){
                
                  if(user.emailVerified!=true){
                    alert(" User deleted1")
            user.delete().then(function() {
              alert(" User deleted")
            }).catch(function(error) {
              // An error happened.
            });  
        }         }
        }

        catch(error){
            console.log(error.toString())
        }

        this.props.navigation.navigate('Login1')
    }

    render() {
        return (
            <Container style={styles.wrapper}>
                <Image style={styles.backgroundImage} source={require('../assets/images/soldier1.jpg')} />
                <Form> 
                     <Item>
                        <Input
                            placeholder="First Name"
                           // secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(firstname)=>this.setState({firstname})}
                        />
                    </Item>
                    <Item>
                        <Input
                            placeholder="Last Name"
                          //  secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(lastname)=>this.setState({lastname})}
                        />
                    </Item>
                    <Item  style={{   flexDirection:'row'}}>
                    
                 <CheckBox
          title="male"
          checked={this.state.male} 
          onPress={() => this.setState({male:!this.state.male})}
         
         
        />
         <CheckBox
          title="female"
          checked={this.state.female}
         
          onPress={() => this.setState({female: !this.state.female})}
        
        />
                      
                     </Item>
                    
                   
                     <Item   >
                     <BirthdayPicker
  selectedYear={this.state.year}
  selectedMonth={this.state.month}
  selectedDay={this.state.day}
  yearsBack={80}
  //onYearValueChange={(year,i) => console.log("Year was changed to: ", year)}
  onYearValueChange={(year,i) => {this.state.year=year}}
 // onMonthValueChange={(month,i) => console.log("Month was changed to: ", month)}
  onMonthValueChange={(month,i) => {this.state.month=month}}
 // onDayValueChange={(day,i) => console.log("Day was changed to: ", day)}
  onDayValueChange={(day,i) => {this.state.day=day}}
 // autoCorrect={false}
/>
 

                    </Item>
                    <Item>
                        <Input
                            style={styles.inputBox}
                            placeholder="E-mail"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email)=>this.setState({email})}
                            

                        />
                    </Item>
                    
                    <Item>
                        <Input
                            placeholder="Password"
                           // secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText= {(password)=>this.setState({password})}
                           
                        />
                    </Item>

                    <Item>
                        <Input
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText= {(password2)=>this.setState({password2})}

                        />
                    </Item>
                  
                    <Button style={ { marginTop: 15, backgroundColor:'#d8d8d8' }}
                            full
                            rounded
                            primary
                           
                           onPress={
                               
                            ()=>this.singUpUser1(this.state.email,this.state.password)}
                    >
                        <Text style={ {color:'black'} }>NEXT</Text>
                    </Button>
                    <Button style={ { marginTop: 15, backgroundColor:'#d8d8d8' }}
                            full
                            rounded
                            primary
                           
                           onPress={
                               
                            ()=>this.Out(this.state.email,this.state.password)}
                    >
                        <Text style={ {color:'black'} }>quit</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}


export default SignUpScreen;
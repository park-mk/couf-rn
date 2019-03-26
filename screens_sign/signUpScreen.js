import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as firebase from 'firebase'

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import {Container, Form, Item, Button, Input} from 'native-base'

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



class SignUpScreen extends React.Component {
    constructor(props){
        super(props)

        this.state=({
            email: '',
            password: ''


        })
    }
    singUpUser=(email,password)=>{
        try {
            if(this.state.password.length<6){
                alert("longer than 6 please")
                return
            }
            console.log(email, password);
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email.trim(),password).then(function(user){
                alert("signin success");
                console.log(user);
            })
        }

        catch(error){
            console.log(error.toString())
        }
    }
    render() {
        return (
            <Container style={styles.wrapper}>
                <Image style={styles.backgroundImage} source={require('../assets/images/soldier1.jpg')} />
                <Form>
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
                            secureTextEntry={true}
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
                        />
                    </Item>
                    <Button style={ { marginTop: 15, backgroundColor:'#d8d8d8' }}
                            full
                            rounded
                            primary
                            onPress={()=>this.singUpUser(this.state.email,this.state.password)}
                    >
                        <Text style={ {color:'black'} }>Sign Up</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}
export default SignUpScreen;
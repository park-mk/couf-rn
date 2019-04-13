import React from 'react';
import {Image, Text, TextInput, View, FlatList} from 'react-native';
import styled from 'styled-components'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";


class SuggestionScreen extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            suggestion:'',
            lists:[],
            modify:{},
        })
        this.getData();
    }
    createData=(suggestion)=> {
        let userId = firebase.auth().currentUser.uid;
        let newPostKey = firebase.database().ref().child('suggestion').push().key;
        firebase.database().ref('suggestion/'+ newPostKey).set({
            content: suggestion,
            user: userId,
            uid: newPostKey,
            useremail:firebase.auth().currentUser.email,
            timestamp:Date.now(),
        });
    }
    deleteData= (key) => {
        console.log(key, 'user');
        firebase.database().ref().child('suggestion/'+key).set(null);
    }
    getData = () => {
        firebase.database().ref('suggestion').on('value', function(snapshot) {
            this.setState({
                lists:  Object.values(snapshot.val())
            })
        }.bind(this));
    }
    getDate = (timestamp) => {

        let date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }
    render(url) {
        return (
            <View>
                
                <Form>
                    <SuggestionInput
                        {...this.props}
                        editable = {true}
                        onChangeText={(suggestion) => this.setState({suggestion})}
                        value={this.state.suggestion}
                        placeholder='Input your suggestion'
                    />
                    <Button buttonStyle={ { width: 50 } } icon={
                        <Icon
                            name="check"
                            size={15}
                            color="white"
                        /> }
                        onPress={()=>this.createData(this.state.suggestion)}
                    />
                </Form>
                <FlatList data={this.state.lists}
                          extraData={this.state}
                          keyExtractor={item => item.uid}
                          renderItem={({item}) => (
                    <SuggestionList >
                        <TitleHeader>
                            <Title>
                                <Name>{item.useremail}</Name>
                                <DateForm>{this.getDate(item.timestamp)}</DateForm>
                            </Title>
                            {
                                item.useremail !== firebase.auth().currentUser.email ? <Text> </Text> : <Buttons>
                                    <Button type="clear" buttonStyle={{width: 30}}
                                            icon={<Icon name="trash" size={15} color="black"/>}
                                            onPress={() => this.deleteData(item.uid)}
                                    />
                                    <Button type="clear" buttonStyle={ { width: 30 } }
                                            icon={<Icon name="edit" size={15} color="black" /> }
                                            onPress={() => this.props.navigation.navigate('SuggestionModify', {
                                                item: item
                                            })}
                                    />
                                </Buttons>
                            }
                        </TitleHeader>
                        {
                            this.state.modify.uid === item.uid ? <EditInput
                                editable = {true}
                                onChangeText={(suggestion) => this.setState({suggestion})}
                                value={item.content}
                            /> : <Content>{item.content}</Content>
                        }
                    </SuggestionList>
                )}/>
            </View>
        );
    }
}

const Form = styled.View`
  padding : 10px
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`
const SuggestionInput = styled.TextInput`
  flex:1;
  margin-right:5px;
  border-bottom-width: 3px;
  border-bottom-color: green;
`
const EditInput = styled.TextInput`
    border:1px solid blue;
`
const SuggestionList = styled.View`
  border:1px solid #ccc;
  margin: 10px;
  padding: 10px 0;
`

const TitleHeader = styled.View`
  display:flex;
  flex-direction: row;
`
const Title = styled.View`
  flex:1;
`

const Buttons = styled.View`
  display:flex;
  flex-direction: row;
`
const Name = styled.Text`
    font-weight : 600;
`
const DateForm = styled.Text`
    font-size: 12;
    color: #ccc;
`
const Content = styled.Text`
    color:black;   
`



export default SuggestionScreen;
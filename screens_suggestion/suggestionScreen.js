import React from 'react';
import {Image, Text, TextInput, View, FlatList, ButtonGroup} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";


class SuggestionScreen extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            page:0,
            listSize:10,
            suggestion:'',
            lists:[],
            modify:{},
            isFetching: true,
        })
        this.getData();
    }
    createData=(suggestion)=> {
        this.setState({suggestion:  ''});
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
                lists:  Object.values(snapshot.val()),
                isFetching: false,
            })
        }.bind(this));
    }
    getDate = (timestamp) => {

        let date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }
    onRefresh() {
        console.log('refreshing');
        this.setState({ isFetching: true }, function() {
            this.getData()
        });
    }
    onEndReached = () => {
        firebase.database().ref('suggestion').limitToFirst(1).on('value', function(snapshot) {
            console.log(snapshot);
        });
    };
    render(url) {
        return (
            <View style={{flex:1}}>
                <Form>
                    <SuggestionInput
                        {...this.props}
                        multiline = {true}
                        editable = {true}
                        onChangeText={(suggestion) => this.setState({suggestion})}
                        value={this.state.suggestion}
                        placeholder='Input your suggestion'
                    />
                    <Buttons style={{alignSelf: 'flex-end'}}>
                        <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                                icon={<Icon name="close" size={15} color="grey"/>}
                                onPress={() => this.deleteData(item.uid)}
                        />
                        <Button type="solid" buttonStyle={{width: 50}}
                                icon={<Icon name="check" size={15} color="white"/>}
                                onPress={()=>this.createData(this.state.suggestion)}
                        />
                    </Buttons>
                </Form>
                <FlatList data={this.state.lists}
                          onRefresh={() => this.onRefresh()}
                          refreshing={this.state.isFetching}
                          keyExtractor={item => item.uid}
                          ListEmptyComponent={<Text>Empty</Text>}
/*
                          onEndReachedThreshold={1}
                          onEndReached={this.onEndReached}
*/
                          renderItem={({item}) => (
                              <ListItem
                                  key={item.uid}
                                  title={
                                      <View>
                                          <Text>{item.useremail}</Text>
                                          <DateForm>{this.getDate(item.timestamp)}</DateForm>
                                      </View>
                                  }
                                  leftAvatar={
                                      <Avatar
                                          containerStyle={{alignSelf: 'flex-start'}}
                                          rounded
                                          source={{
                                              uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                                          }}
                                      />
                                  }
                                  subtitle={
                                      <Content>{item.content}</Content>
                                  }
                                  rightElement={
                                      item.useremail !== firebase.auth().currentUser.email ? <Text> </Text> : <Buttons style={{alignSelf: 'flex-start'}}>
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
                              />

                          )}/>
            </View>
        );
    }
}

const Form = styled.View`
  padding : 10px
  margin-bottom: 10px;
`
const SuggestionInput = styled.TextInput`
  border-bottom-width: 3px;
  border-bottom-color: green;
  margin-bottom: 5px;
`
const Buttons = styled.View`
  display:flex;
  flex-direction: row;
`
const DateForm = styled.Text`
    font-size: 12;
    color: #ccc;
`
const Content = styled.Text`
    color:black;   
`



export default SuggestionScreen;
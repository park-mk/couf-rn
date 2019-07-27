import React from 'react';
import {Image, Text, TextInput, View, FlatList, CameraRoll} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";

class CommentList extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            page:0,
            listSize:10,
            suggestion:'',
            modify:{},
            isFetching: true,
            lists:[],
        })
        this.setData();
    }
    setData = () => {
        this.getData().then(function(response){
            this.setState({
                lists:  response,
                isFetching: false,
            })
        }.bind(this));
    };
    
    onRefresh() {
        this.setState({ isFetching: true }, function() {
            this.setData();
        }.bind(this));
    }
    deleteData= (key) => {
        console.log(key, 'user');
        firebase.database().ref().child('comment/'+this.props.type+'/'+key).set(null);
    };
   getDate = (timestamp) => {
        let date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    };
    getData = () => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('comment/'+this.props.type).on('value', function (snapshot) {
                let returnVal =  snapshot.val() || {};
                console.log('리스트2',Object.values(returnVal));
                resolve(Object.values(returnVal));
            }.bind(this),function(error){
                console.log('에러났는뎅',error);
                reject(error);
            });
        });
    };

    render(url) {
        return (
            <View style={{flex:1}}>
                <FlatList data={this.state.lists}
                          onRefresh={() => this.onRefresh()}
                          refreshing={this.state.isFetching}
                          keyExtractor={item => item.uid}
                          ListEmptyComponent={<Text>Empty</Text>}
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



export default CommentList;
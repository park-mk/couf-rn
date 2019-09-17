import React from 'react';
import {Text, View, FlatList, Modal, TouchableHighlight, TextInput} from 'react-native';
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
            modalVisible: false,
            modifyItem:{},
        })
        this.setData();
    }

    async componentWillReceiveProps(nextProps){
        if(nextProps.reload !== undefined && this.props.reload !== nextProps.reload){
            this.onRefresh();
        }
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
        /* TODO : 지울지 말지 확인창 띄우기 */
        firebase.database().ref().child('comment/'+this.props.type+'/'+key).set(null);
        this.setData();
    };
    getDate = (timestamp) => {
        let date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    };
    getData = () => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('comment/'+this.props.type).on('value', function (snapshot) {
                let returnVal =  snapshot.val() || {};
                resolve(Object.values(returnVal).reverse());
            }.bind(this),function(error){
                reject(error);
            });
        });
    };

    onClickModifyButton = (item) => {
        this.setState({
            modifyItem: item || {},
        });
        this.modifyModal(true);
    };

    modifyModal = (value) => {
        this.setState({
            modalVisible: value,
        });
    };

    modifyData= () => {
        firebase.database().ref('comment/'+this.props.type +'/'+ this.state.modifyItem.uid).update({
            content: this.state.modifyItem.content,
        }, function(){
            this.modifyModal(false);
            this.onRefresh();
        }.bind(this));
    };

    render(url) {
        return (
            <View style={{flex:1}}>
                {/* 수정 Form */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <ModifyList >
                        <ListItem
                            key={this.state.modifyItem.uid}
                            title={
                                <View>
                                    <Text>{this.state.modifyItem.useremail}</Text>
                                    <DateForm>{this.getDate(this.state.modifyItem.timestamp)}</DateForm>
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
                                <TextInput
                                    editable = {true}
                                    onChangeText={(text) => this.setState({modifyItem:{...this.state.modifyItem, content:text}})}
                                    value={this.state.modifyItem.content}
                                />

                            }
                        />

                        <Buttons>
                            <Button
                                onPress={() => this.modifyData()}
                                title="Modify"
                                color="#841584"
                            />
                            <Button
                                onPress={() => this.setState({modalVisible: false})}
                                title="Cancel"
                                color="#841584"
                            />
                        </Buttons>
                    </ModifyList>

                </Modal>

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
                                                  onPress={() => {
                                                      this.onClickModifyButton(item);
                                                  }}
                                              /*
                                                                                                onPress={() => this.props.navigation.navigate('SuggestionModify', {
                                                                                                    item: item
                                                                                                })}
                                              */
                                          />
                                      </Buttons>
                                  }
                              />

                          )}/>
            </View>
        );
    }
}

const ModifyList = styled.View`
  border:1px solid #ccc;
  margin: 10px;
  padding: 10px 0;
`
const ModifyTitleHeader = styled.View`
  display:flex;
  flex-direction: row;
`
const ModifyTitle = styled.View`
  flex:1;
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



export default CommentList;
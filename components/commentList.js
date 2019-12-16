import React from 'react';
import {Text, View, FlatList, Modal, TouchableHighlight, TextInput, Image} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";



class CommentList extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            modify:{},
            modalVisible: false,
            modifyItem:{},
            lists:[],
        });

        console.log('현재 유저',firebase.auth().currentUser);
        console.log('게시물',this.props.lists);
    }

    getDate = (timestamp) => {
        let date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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
        console.log('뭐여',this.props.type, this.state.modifyItem.uid);
        firebase.database().ref('comment/'+this.props.type +'/'+ this.state.modifyItem.uid).update({
            content: this.state.modifyItem.content,
        }, function(){
            this.modifyModal(false);
            this.props.onRefresh();
        }.bind(this));
    };

    renderImage(item, i) {
        return(
            <Image
                style={{height: 100, width: 100}}
                source={{uri: item.file}}
                key={i}
            />
        )
    }
    
    render(url) {
        return (
            <View>
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
                                        uri:this.state.modifyItem.thumbNail,
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
                <FlatList data={this.props.lists}
                          onRefresh={(e) => this.props.onRefresh(e)}
                          refreshing={this.props.fetching}
                          keyExtractor={item => item.uid}
                          ListEmptyComponent={<Text>no comments</Text>}
                          renderItem={({item}) => (
                              <ListItem
                                  key={item.uid}
                                  title={
                                      <View>
                                          <Text>{item.displayName}</Text>
                                          <DateForm>{this.getDate(item.timestamp)}</DateForm>
                                      </View>
                                  }
                                  leftAvatar={
                                      <Avatar
                                          containerStyle={{alignSelf: 'flex-start'}}
                                          rounded
                                          source={{
                                              uri:item.thumbNail,
                                          }}
                                      />
                                  }
                                  subtitle={
                                      <View>
                                          {
                                              item.imageUrl && item.imageUrl.map((image, i) => {
                                                  return (<Image source={{ uri: image }} style={{ width: 100, height: 100 }} key={i} />);
                                              })
                                          }

                                        <Content>{item.content}</Content>
                                      </View>
                                  }
                                  rightElement={
                                      (firebase.auth().currentUser && item.useremail == firebase.auth().currentUser.email) && <Buttons style={{alignSelf: 'flex-start'}}>
                                          <Button type="clear" buttonStyle={{width: 30}}
                                                  icon={<Icon name="trash" size={15} color="black"/>}
                                                  onPress={() => this.props.deleteData(item.uid)}
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
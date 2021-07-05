import React from 'react';
import {Text, View, FlatList, Modal, TouchableHighlight, TextInput, Image,TouchableOpacity} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
import CommentForm_b from '../components/commentForm_b'


class CommentList_b extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            modify:{},
            modalVisible: false,
            modifyItem:{},
            lists:[],
            current_uid:''
        });

    
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
    
        firebase.database().ref('comment/'+this.props.type +'/'+ this.state.modifyItem.uid).update({
            content: this.state.modifyItem.content,
        }, function(){
            this.modifyModal(false);
            this.props.onRefresh();
        }.bind(this));
    };



    content_check=()=>{
      
        if(this.props.korean){
      
        let length= this.state.comment.length
        for (let i=0; i<=length-1;i++){
        if (this.state.comment[i].charCodeAt(0)  >= 0xAC00 && this.state.comment[i].charCodeAt(0)  <= 0xD7A3) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
    
        // Hangul Jamo
        if (this.state.comment[i].charCodeAt(0)  >= 0x1100 && this.state.comment[i].charCodeAt(0)  <= 0x11FF) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
    
        // Hangul Compatibility Jamo 
        if (this.state.comment[i].charCodeAt(0)  >= 0x3130 && this.state.comment[i].charCodeAt(0) <= 0x318F) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
    
        // Hangul Jamo Extended-A
        if (this.state.comment[i].charCodeAt(0)  >= 0xA960 && this.state.comment[i].charCodeAt(0)  <= 0xA97F) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
    
        // Hangul Jamo Extended-B 
        if (this.state.comment[i].charCodeAt(0)  >= 0xD7B0 && this.state.comment[i].charCodeAt(0)  <= 0xD7FF) {
            alert("For smooth communication of all users, we will stop posting in Korean for a while. If you think it is a necessary post for information provision, please contact us through contactus in menu. Thank you.");
            return true ;
        }
        

        }

        return false;
    }
    return false;

    }



    createData=()=> {
        // 대댓글 
        if(firebase.auth().currentUser==null){
            alert("please login or wait for a second for login");
            return ;
        }
        if(this.props.banned){
            alert("Sorry, you have been banned from posting and writing comments for a while. If it lasts more than 1~2 weeks, please contact us through contactus in menu.")
            return;
        }   

        if(this.content_check()){
          
            return;
        }
        if (!this.state.comment||this.state.comment==" "||this.state.comment=="  "||this.state.comment=="   ") {
            alert("comment  shouldn't be empty")
            return;
        } 
      
        let user = firebase.auth().currentUser;
        let post_uid=this.props.uid
        let newPostKey = firebase.database().ref().child('comment/board/'+post_uid+'/comments/'+this.state.current_uid+'/c_comments').push().key;
        let createData = {
            content: this.state.comment,
            user: user.uid,
            nickname:this.props.nickname,
            uid: newPostKey,
            comment_uid:this.state.current_uid, 
            useremail:user.email,
            displayName:user.displayName,
            timestamp:Date.now(),
            tags:{},
        };

        if(this.props.tag) createData.tags[this.props.tag] = true;
        this.setState({comment:' '})
      
        firebase.database().ref('comment/board/'+post_uid+'/comments/'+this.state.current_uid+'/c_comments/'+ newPostKey).set(createData).then(function(){
            // this.uploadImage(this.state.image, 'test-image');
            this.props.onRefresh();
                 this.props.onRefresh.bind(this);
            this.props.setData();
        }.bind(this));
    };
    clearData =()=>{
        this.setState({comment:' '})
    }
    renderImage(item, i) {
        return(
            <Image
                style={{height: 100, width: 100}}
                source={{uri: item.file}}
                key={i}
            />
        )
    }
    changeComment=(comment) => {
        this.setState({comment: comment});
    };

    onClickComment=(uid)=>{
        this.setState({comment:''});
       this.setState({current_uid:uid});
    }
    onClickComment2=(uid,nickname)=>{

        this.setState({current_uid:uid});
      
        this.setState({comment:'@'+nickname});
     }

    renderItem2=({item})=>{
        if(firebase.auth().currentUser!=null){
        return (
            <TouchableOpacity
           onPress={() => this.onClickComment2(item.comment_uid,item.nickname)}
        > 
            <View
             style={{ flexDirection:'row'}}
            >
           { item.user==firebase.auth().currentUser.uid &&
            <Image source={require('../assets/people.png')}

            style={{ marginLeft:100,marginTop:17,width: 20, height: 25, marginLeft: 15, resizeMode: 'cover' }}
        /> 
           }
             { item.user!=firebase.auth().currentUser.uid&&
            <Image source={require('../assets/nickname.png')}

            style={{ marginLeft:100,marginTop:17,width: 20, height: 25, marginLeft: 15, resizeMode: 'cover' }}
        /> 
           }
        <View>
        <Text> {item.nickname}</Text>
            <Content>{item.content}</Content>
                    <DateForm>{this.getDate(item.timestamp)}</DateForm>
             
          </View>
          { item.user==firebase.auth().currentUser.uid &&
          <Buttons style={{alignSelf: 'flex-start'}}>
                                           <Button type="clear" buttonStyle={{width: 30}}
                                                   icon={<Icon name="trash" size={15} color="black"/>}
                                                   onPress={() => this.props.deleteData_c(this.props.uid,item,item.key)}
                                           />
                                       </Buttons>  
    }  
          </View>
          
                                           
        </TouchableOpacity>
        ) 
    }
    else {
        return (
            <TouchableOpacity
           onPress={() => this.onClickComment2(item.comment_uid,item.nickname)}
        > 
            <View
             style={{ flexDirection:'row'}}
            >
        
            <Image source={require('../assets/nickname.png')}

            style={{ marginLeft:100,marginTop:17,width: 20, height: 25, marginLeft: 15, resizeMode: 'cover' }}
        /> 
          
        <View>
        <Text> {item.nickname}</Text>
            <Content>{item.content}</Content>
                    <DateForm>{this.getDate(item.timestamp)}</DateForm>
             
          </View>
          </View>
          
                                           
        </TouchableOpacity>
        ) 

    }
    }

    renderItem =({item})=>{
        
     
        let c_comments=[];
         if(item.c_comments){
             
            c_comments= Object.values(item.c_comments)
         }
      
        if(item.deleted==true){

            return(
         
            <View
            
            style={{ borderBottomWidth:1}}>


                    <View style={{ flexDirection: 'row' }}>
                        <View width={10}>
                        
                        </View>
                        <Image source={require('../assets/nickname.png')}

                                style={{ marginTop:17,width: 20, height: 25, marginLeft: 15, resizeMode: 'cover' }}
                            />

                <View>
                    <Text> </Text>
                  
                    <Text
                     style={{fontSize:12,color:"grey"}}
                    >      THIS COMMENT IS DELETED</Text>
                     <Text
                        style={{fontSize:12,color:"grey"}}
                     >  </Text>
              
                                 
</View>
                                       
                                     
                                     
                                      </View>
      
                                      <View
                  style={{marginLeft:30}}
                 >
                                      <FlatList data={c_comments}
                          onRefresh={(e) => this.props.onRefresh(e)}
                          refreshing={this.props.fetching}
                          keyExtractor={item => item.uid}
                          ListEmptyComponent={<Text>  </Text>}
                          renderItem={this.renderItem2}/>  
                          </View>
                                      
                    { item.uid==this.state.current_uid &&
                                      <CommentForm_b
                    comment={this.state.comment}
                    image={this.state.image}
                    createData={this.createData}
                    clearData={this.clearData}
                    changeComment={this.changeComment}
                />
                    }
               
                                      </View>
        
             ) }
       if( firebase.auth().currentUser && item.useremail == firebase.auth().currentUser.email){
        return(

            <View
            
            style={{ borderBottomWidth:1}}>

<TouchableOpacity
            onPress={() => this.onClickComment(item.uid)}
        >
            
                    <View style={{ flexDirection: 'row' }}>
                        <View width={10}>
                        
                        </View>
                        <Image source={require('../assets/people.png')}

                                style={{ marginTop:17,width: 20, height: 25, marginLeft: 15, resizeMode: 'cover' }}
                            />

                <View>
                    <Text> {item.nickname}</Text>
                  
                    <Content>{item.content}</Content>
                    <DateForm>{this.getDate(item.timestamp)}</DateForm>
              
                                          {
                                              item.imageUrl && item.imageUrl.map((image, i) => {
                                                  return (<Image source={{ uri: image }} style={{ width: 100, height: 100 }} key={i} />);
                                              })
                                          }

</View>
                                       
                                        <Buttons style={{alignSelf: 'flex-start'}}>
                                           <Button type="clear" buttonStyle={{width: 30}}
                                                   icon={<Icon name="trash" size={15} color="black"/>}
                                                   onPress={() => this.props.deleteData(item)}
                                           />
                                           
                                       </Buttons>
                                     
                                      </View>
                                      </TouchableOpacity>
                                      <View
                  style={{marginLeft:30}}
                 >
                                      <FlatList data={c_comments}
                          onRefresh={(e) => this.props.onRefresh(e)}
                          refreshing={this.props.fetching}
                          keyExtractor={item => item.uid}
                          ListEmptyComponent={<Text>  </Text>}
                          renderItem={this.renderItem2}/>  
                          </View>
                                      
                    { item.uid==this.state.current_uid &&
                                      <CommentForm_b
                    comment={this.state.comment}
                    image={this.state.image}
                    createData={this.createData}
                    clearData={this.clearData}
                    changeComment={this.changeComment}
                />
                    }
               
                                      </View>
      
                                      
        )
    }
    else{
        return(
         
            <View style={{borderBottomWidth:1}}>
                   <TouchableOpacity
            onPress={() => this.onClickComment(item.uid)}
        >
            <View style={{flexDirection:'row' }}>
                <View width={10}>

                </View>  
                <Image source={require('../assets/nickname.png')}

style={{ marginTop:17,width: 20, height: 25, marginLeft: 15, resizeMode: 'cover' }}
/>
                <View >
                <Text> {item.nickname}</Text>
                <Content style={{marginRight:10}}>{item.content}</Content>
                <DateForm>{this.getDate(item.timestamp)}</DateForm>
          
                                      {
                                          item.imageUrl && item.imageUrl.map((image, i) => {
                                              return (<Image source={{ uri: image }} style={{ width: 100, height: 100 }} key={i} />);
                                          })
                                      }
                
</View>           

                 </View>
                 </TouchableOpacity>
                 <View
                  style={{marginLeft:30}}
                 >
                  <FlatList data={c_comments}
                          onRefresh={(e) => this.props.onRefresh(e)}
                          refreshing={this.props.fetching}
                          keyExtractor={item => item.uid}
                          ListEmptyComponent={<Text>  </Text>}
                          renderItem={this.renderItem2}/>  
                 </View>
                 { item.uid==this.state.current_uid &&
                 <CommentForm_b
                    comment={this.state.comment}
                    image={this.state.image}
                    createData={this.createData}
                    clearData={this.clearData}
                    changeComment={this.changeComment}
                />
                 }
                               </View>
                              
    )
    }



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
                <FlatList data={this.props.lists}
                          onRefresh={(e) => this.props.onRefresh(e)}
                          refreshing={this.props.fetching}
                          keyExtractor={item => item.uid}
                          ListEmptyComponent={<Text>no comments</Text>}
                          renderItem={this.renderItem}
                        //   renderItem={({item}) => (
                        //       <ListItem
                        //           key={item.uid}
                        //           title={
                        //               <View>
                        //                   <Text>{item.displayName}</Text>
                        //                   <DateForm>{this.getDate(item.timestamp)}</DateForm>
                        //               </View>
                        //           }
                        //           leftAvatar={
                        //               <Avatar
                        //                   containerStyle={{alignSelf: 'flex-start'}}
                        //                   rounded
                        //                   source={{
                        //                       uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                        //                   }}
                        //               />
                        //           }
                        //           subtitle={
                        //               <View>
                        //                   {
                        //                       item.imageUrl && item.imageUrl.map((image, i) => {
                        //                           return (<Image source={{ uri: image }} style={{ width: 100, height: 100 }} key={i} />);
                        //                       })
                        //                   }

                        //                 <Content>{item.content}</Content>
                        //               </View>
                        //           }
                        //           rightElement={
                        //               (firebase.auth().currentUser && item.useremail == firebase.auth().currentUser.email) && <Buttons style={{alignSelf: 'flex-start'}}>
                        //                   <Button type="clear" buttonStyle={{width: 30}}
                        //                           icon={<Icon name="trash" size={15} color="black"/>}
                        //                           onPress={() => this.props.deleteData(item)}
                        //                   />
                        //                   <Button type="clear" buttonStyle={ { width: 30 } }
                        //                           icon={<Icon name="edit" size={15} color="black" /> }
                        //                           onPress={() => {
                        //                               this.onClickModifyButton(item);
                        //                           }}
                        //                       /*
                        //                                                                         onPress={() => this.props.navigation.navigate('SuggestionModify', {
                        //                                                                             item: item
                        //                                                                         })}
                        //                       */
                        //                   />
                        //               </Buttons>
                        //           }
                        //       />

                        //   )}
                          
                          />
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
    font-size: 18;
`



export default CommentList_b;
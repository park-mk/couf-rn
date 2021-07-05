import React from 'react';
import {Image, Text, TextInput, View, CameraRoll} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
// import ImagePicker from 'react-native-image-picker';
// import { ImagePicker } from 'expo';

class CommentForm extends React.Component {
    constructor(props){
        super(props)
    }

    render(url) {
        return (
            <Form>
                <SuggestionInput
                    {...this.props}
                    multiline = {true}
                    editable = {true}
                    onChangeText={(comment) => this.props.changeComment(comment)}
                    value={this.props.comment}
                    placeholder='Input your comment'
                />
                <Buttons style={{alignSelf: 'flex-end'}}>
                    {/* <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                            icon={<Icon name="camera" size={15} color="grey"/>}
                            onPress={() => this.props.getImage()}
                    /> */}
                    <Button type="clear" buttonStyle={{width: 50, marginRight: 10}}
                            icon={<Icon name="close" size={15} color="grey"/>}
                            onPress={() => this.props.clearData()}
                    />
                    <Button type="solid" buttonStyle={{width: 50}}
                            icon={<Icon name="check" size={15} color="white"/>}
                            onPress={()=> { this.props.createData(); }}
                    />
                </Buttons>
{/*
                {this.props.image &&
                <Image source={{ uri: this.props.image }} style={{ width: 200, height: 200 }} />}
*/}
            </Form>
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

export default CommentForm;
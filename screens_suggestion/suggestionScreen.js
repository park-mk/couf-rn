import React from 'react';
import {Image, Text, TextInput, View, FlatList, CameraRoll} from 'react-native';
import styled from 'styled-components'
import { List, ListItem, Button, Avatar  } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";
// import ImagePicker from 'react-native-image-picker';
import { ImagePicker } from 'expo';
import Comment from '../components/comment'

class SuggestionScreen extends React.Component {
    constructor(props){
        super(props)
        this.state=({
            page:0,
            listSize:10,
            suggestion:'',
            lists:[],
            modify:{},
            fetching: true,
            isNeedReLoad: false,
        })
        // this.setData();
        this.base64Data = '';
    }

    render(url) {
        return (
            <View style={{flex:1}}>
                <Text
                 style={{fontFamily:'title-font' ,fontSize:25,marginLeft:10, }}
                  >please leave your suggestions  or the infromation you want to know for our app</Text>
              
                <Comment
                    type={'suggestion'}
                    tag={'suggestion'}
                />

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
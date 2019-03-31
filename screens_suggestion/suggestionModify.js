import React from 'react';
import {Image, Text, TextInput, View, FlatList} from 'react-native';
import styled from 'styled-components'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "../firebase";


class SuggestionModify extends React.Component {
    constructor(props){
        super(props)
        const { navigation } = this.props;
        const item = navigation.getParam('item', 'item');
        this.state=({
            content: item.content,
            user: item.user,
            uid: item.uid,
        })
    }
    modifyData= () => {
        console.log(this.state);
        firebase.database().ref('suggestion/'+ this.state.uid).update({
            content: this.state.content,
        }, function(){
            alert('Success');
        });

    }
    render() {

        return (
            <View>
                <SuggestionList >
                    <TitleHeader>
                        <Title>
                            <Name>나순재</Name>
                            <Date>2020.03.31</Date>
                        </Title>
                        <Buttons>
                            <Button type="clear" buttonStyle={ { width: 30 } }
                                    icon={<Icon name="check" size={15} color="black" /> }
                                    onPress={()=>this.modifyData()}
                            />
                        </Buttons>
                    </TitleHeader>
                    <EditInput
                        editable = {true}
                        onChangeText={(content) => this.setState({content})}
                        value={this.state.content}
                    />
                </SuggestionList>
            </View>
        );
    }
}
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
const Date = styled.Text`
    font-size: 12;
    color: #ccc;
`
export default SuggestionModify;
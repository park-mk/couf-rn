import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import  firebase,{storage}  from "../firebase";
class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      datasource: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {

    this.setState({ loading: true });                    //because while this function is working = loading 
    var usersRef =firebase.database().ref('Phonebook');       //   bring the database tips
    usersRef.on('value', (snapshot) => {                     //    tips database resort
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource:  keys                                   // datasource of list 
  }) 
  console.log(this.state.datasource);
});


  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      datasource: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
  
    return (
      <View style={{ flex: 1 }}>
          <Text>aa</Text>
        <FlatList
          data={this.state.datasource}
          renderItem={({ item }) => (
            <ListItem
            // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={item.name}
              subtitle={item.number}
            />
          )}
          keyExtractor={item => item.number}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default FlatListDemo;
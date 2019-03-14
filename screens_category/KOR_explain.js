import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

class KOR_explainScreen extends React.Component {
    render() {
    
      const { navigation } = this.props;
      const kor = navigation.getParam('kor', 'NO-ID');
      const description = navigation.getParam('description', 'some default value');
      const eng  = navigation.getParam('eng', 'NO-ID');
      const pro = navigation.getParam('pro', 'NO-ID');
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         
          <Text> {JSON.stringify(kor)}</Text>
          <Text> {JSON.stringify(pro)}</Text>
          <Text> {JSON.stringify(eng)}</Text>
          <Text> {JSON.stringify(description)}</Text>
        
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }
  }

  export default  KOR_explainScreen;
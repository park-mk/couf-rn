import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

class KOR_explainScreen extends React.Component {
    render() {
    
      const { navigation } = this.props;
      const kor = navigation.getParam('kor', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
      const eng  = navigation.getParam('eng', 'NO-ID');
      const pro = navigation.getParam('pro', 'NO-ID');
      return (
        <View style={{ flex: 1 }}>
           
          <Text style={{textAlign:'center', fontSize:60,marginTop:30}}> {JSON.stringify(kor).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{textAlign:'center', fontSize:30,color:'grey',marginBottom:50}}> [ {JSON.stringify(pro).replace(/^"(.+)"$/,'$1')} ]</Text>
          <Text style={{marginLeft:20,fontSize:40,marginBottom:6}}> {JSON.stringify(eng).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{fontSize:20,marginLeft:10,marginRight:20,fontStyle:'italic'}}> {JSON.stringify(description).replace(/^"(.+)"$/,'$1')}</Text>
       { /*
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />*/}
        </View>
      );
    }
  }

  export default  KOR_explainScreen;
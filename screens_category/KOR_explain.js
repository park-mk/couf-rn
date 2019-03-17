import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

class KOR_explainScreen extends React.Component {


  async _play(){
    try {
      
      const { sound: soundObject, status } = await Expo.Audio.Sound.createAsync(
          
          {uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/sound%2Fk1.mp3?alt=media&token=c0c4a00f-cff9-4813-a182-2bba419dae71"},
          { shouldPlay: true }
        );
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
  
   }
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

          <Button  title={'asdf'} onPress={() => this._play()}>
             <Text>sound</Text>
          </Button>
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
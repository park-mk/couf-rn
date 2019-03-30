import React from 'react';
import { Button, View, Text ,Image,TouchableOpacity,ScrollView} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 

class KOR_explainScreen extends React.Component {


  async _play(){
    try {
      
      const { sound: soundObject, status } = await Expo.Audio.Sound.createAsync(
          
          {uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/sound%2F%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%82%E1%85%A7%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%A6%E1%84%8B%E1%85%AD%20(online-audio-converter.com).mp3?alt=media&token=4706fe91-d38d-42fc-b29e-85f0e0a3cd38"},
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
        <ScrollView style={{ flex: 1 }}>
           
          <Text style={{textAlign:'center', fontSize:60,marginTop:30}}> {JSON.stringify(kor).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{textAlign:'center', fontSize:30,color:'grey',marginBottom:50}}> [ {JSON.stringify(pro).replace(/^"(.+)"$/,'$1')} ]</Text>
          <Text style={{marginLeft:20,fontSize:40,marginBottom:6}}> {JSON.stringify(eng).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{fontSize:20,marginLeft:10,marginRight:20,fontStyle:'italic'}}> {JSON.stringify(description).replace(/^"(.+)"$/,'$1')}</Text>

          <TouchableOpacity
         
             onPress={() => this._play()}
          >
              <Image   style={{ height:100,width:100,resizeMode: 'contain' } }
              source={ require('../assets/play.png' )} />
              
              
             
          </TouchableOpacity>
       { /*
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />*/}
        </ScrollView>
      );
    }
  }

  export default  KOR_explainScreen;
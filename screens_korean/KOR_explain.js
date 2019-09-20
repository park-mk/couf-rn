import React from 'react';
import { Button, View, Text ,Image,TouchableOpacity,ScrollView} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
class KOR_explainScreen extends React.Component {


  async _play(sound){
    try {
      
      const { sound: soundObject, status } = await Expo.Audio.Sound.createAsync(
          
          {uri:JSON.stringify(sound).replace(/^"(.+)"$/,'$1')},
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
      const uri = navigation.getParam('uri', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
      const eng  = navigation.getParam('eng', 'NO-ID');
      const pro = navigation.getParam('pro', 'NO-ID');
     
      return (
        <View style={{flex:1}}>
        <Header
        leftComponent={  <TouchableOpacity 
         onPress={()=> this.props.navigation.navigate('KOR')}
         >
         <Image source={require('../assets/back.png')}
                     
        style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
   /> 
   </TouchableOpacity>} 
       backgroundColor={'#fff'}
      borderBottomColor={'#fff'}
        centerComponent={{ text: 'LEARNING KOREAN', style: {fontFamily:'title-font' ,fontSize:30,marginLeft:10,color:'#56B8FF' } }}
       
         />
        <ScrollView style={{ flex: 1 }}>
           
          <Text style={{textAlign:'center', fontSize:60,marginTop:30}}> {JSON.stringify(kor).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{textAlign:'center', fontSize:30,color:'grey',marginBottom:50}}> [ {JSON.stringify(pro).replace(/^"(.+)"$/,'$1')} ]</Text>
          <Text style={{marginLeft:20,fontFamily:'content-font',fontSize:40,marginBottom:6}}> {JSON.stringify(eng).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{fontSize:20,marginLeft:10,fontFamily:'content-font',marginRight:20}}> {JSON.stringify(description).replace(/^"(.+)"$/,'$1')}</Text>

          <TouchableOpacity
         
             onPress={() => this._play(uri)}
          >
              <Image   style={{ height:100,width:100,resizeMode: 'contain' } }
              source={ require('../assets/play.png' )} />
              
              
             
          </TouchableOpacity>

          <Text style={{fontSize:15,marginLeft:10,fontFamily:'content-font',marginRight:20}}> please wait for 2~3 seconds for the sound</Text>
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
        </View>
      );
    }
  }

  export default  KOR_explainScreen;
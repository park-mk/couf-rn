import React from 'react';
import { Button, View, Text ,ScrollView,Image,Dimensions,ImageBackground,StyleSheet,TouchableHighlight,SafeAreaView} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import ImageSlider from 'react-native-image-slider';

class Travelitem extends React.Component {
    render() {
       let dimensions=Dimensions.get("window");
       let imageheight =Math.round((dimensions.width*9)/16);
        let imagewidth =dimensions.width;
      const { navigation } = this.props;
      const name = navigation.getParam('name', 'NO-ID');
      const description = navigation.getParam('description', 'NO-ID');
      const location = navigation.getParam('location', 'NO-ID');
      const topimage = navigation.getParam('topimage', 'NO-ID');
      const uri = navigation.getParam('uri', 'NO-ID');
      const images = [
        'https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/91.jpeg?alt=media&token=7228f5ba-c6a2-4dc1-bac9-e4ee18068c13',
         'https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/WechatIMG190.jpeg?alt=media&token=7c3e77ae-a838-4e0d-80c5-bc923f0eb28e',
        'https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/91.jpeg?alt=media&token=7228f5ba-c6a2-4dc1-bac9-e4ee18068c13',
        'https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/91.jpeg?alt=media&token=7228f5ba-c6a2-4dc1-bac9-e4ee18068c13',
       'https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-03-22%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2010.28.49.png?alt=media&token=1ea8f8cf-ce25-404e-94ed-638004249a96'
      ];
      return (
        <ScrollView>
      

        <View style={{ flex: 2}}>
        
        <ImageBackground    source={require('../assets/mama.png')} style={{height:imageheight,width:imagewidth }}>
        <View style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      
         </View>
        </ImageBackground> 
        <View >
       
              </View>
          <Text style={{textAlign:'center', fontSize:60,marginTop:30}}> {JSON.stringify(name).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{textAlign:'center', fontSize:30,color:'grey',marginBottom:50}}> [ {JSON.stringify(description).replace(/^"(.+)"$/,'$1')} ]</Text> 

          <View style={{marginTop: 0,width:100}}>
          
  
          </View>
          <Text style={{marginLeft:20,fontSize:40,marginBottom:6}}> {JSON.stringify(location).replace(/^"(.+)"$/,'$1')}</Text>
          <Text style={{fontSize:20,marginLeft:10,marginRight:20,fontStyle:'italic'}}> {JSON.stringify(uri.uri1).replace(/^"(.+)"$/,'$1')}</Text>
       
 </View>
        <SafeAreaView style={styles.container}>
        <View style={styles.content1}>
          
        </View>
        <ImageSlider
          loopBothSides
          autoPlayWithInterval={3000}
          images={images}
          style={{height:imageheight+30,width:imagewidth }}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
              {images.map((image, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    underlayColor="#ccc"
                    onPress={() => move(index)}
                    style={styles.button}
                  >
                    <Text style={position === index && styles.buttonSelected}>
                     
                    </Text>
                  </TouchableHighlight>
                );
              })}
            </View>
          )}
        />
        <View style={styles.content2}>
          <Text style={styles.contentText}>Content 2</Text>
        </View>
      </SafeAreaView>
 
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer: {
      flexDirection: 'row',
      backgroundColor: '#222',
    },
    image: {
      width: 200,
      height:100,
      height: '100%',
    },
    buttons: {
      height: 15,
      marginTop: 0,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: {
      margin: 3,
      width: 8,
      height: 8,
      borderRadius: 8 / 2,
      backgroundColor: '#ccc',
      opacity: 0.9,
    },
    buttonSelected: {
      opacity: 1,
      backgroundColor: '#fff',
    },
  });
  export default  Travelitem;
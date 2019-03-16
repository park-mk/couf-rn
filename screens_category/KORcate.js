import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Category from '../components/category'
class KORcate extends React.Component {

     

  render() {
    return ( 
    <View style={{flex:1}}>
         <ScrollView   onRefresh={this.handleRefresh} >
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                    <Category  imageURI={require('../assets/icon.png' )}
                           name='Basic Expression'
                           onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            this.props.navigation.navigate('KOR', {
                               move:'BASIC',
                            });
                          }}
                         
                      />
                    <Category  imageURI={require('../assets/icon.png' )}
                           name='Shopping Expression'
                          
                      />
             </View>
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={require('../assets/icon.png' )}
                           name='Food Expression'
                           
                    />
                   <Category  imageURI={require('../assets/icon.png' )}
                           name='date expression'
                          
                    />
             </View>
      { /*****  category sort  each view have 2 category  in row  *******/}
             <View   style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={require('../assets/icon.png' )}
                           name='slangs '
                         
                     />
                    <Category  imageURI={require('../assets/icon.png' )}
                          name='i wanna know '
                           
                      />
           </View>

            </ScrollView >
   </View>

            
    );
  }
}
export default KORcate;
{ /*****   design part  *******/}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
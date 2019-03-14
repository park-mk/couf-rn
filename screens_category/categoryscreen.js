import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Category from '../components/category'
class CategoryScreen extends React.Component {
  render() {
    return ( 
    <View style={{flex:1}}>
         <ScrollView>
         { /*****  category sort  each view have 2 category  in row  *******/}
             <View   style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={require('../assets/icon.png' )}
                           name='Exchange'
                           onPress={()=>Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
                     />
                    <Category  imageURI={require('../assets/icon.png' )}
                          name='About us'
                      />
           </View>
        { /*****  category sort  each view have 2 category  in row  *******/
         // hope we can 
      }      
          
             <View  style={{  flex:1,  flexDirection:'row'}}>
                    <Category  imageURI={require('../assets/icon.png' )}
                           name='food'
                       />
                    <Category  imageURI={require('../assets/icon.png' )}
                          name='Tips of life'
                      />
             </View> 
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                    <Category  imageURI={require('../assets/icon.png' )}
                           name='Learning Korean'
                      />
                    <Category  imageURI={require('../assets/icon.png' )}
                           name='Travel'
                      />
             </View>
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={require('../assets/icon.png' )}
                           name='Shopping'
                    />
                   <Category  imageURI={require('../assets/icon.png' )}
                           name='Q & A'
                    />
             </View>
      { /*****  category sort  each view have 2 category  in row  *******/}
             <View   style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={require('../assets/icon.png' )}
                           name='Suggestions for app'
                     />
                    <Category  imageURI={require('../assets/icon.png' )}
                          name='About us'
                      />
           </View>

            </ScrollView>
   </View>
    );
  }
}
export default CategoryScreen;
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
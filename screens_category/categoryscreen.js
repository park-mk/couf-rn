import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Category from '../components/category'
import Categor from '../components/anylist'
class CategoryScreen extends React.Component {

      handleRefresh = () => {
    
            this.setState(
              {
              
               
              },
              () => {
                
              }
            );
          }; 

  render() {
    return ( 
    <View style={{flex:1}}>
         <ScrollView   onRefresh={this.handleRefresh} >
         { /*****  category sort  each view have 2 category  in row  *******/}
             <View   style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category imageURI={require('../assets/icon.png' )}
                           name='Exchange'
                          
                           onPress={()=>  Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
                          
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
                           onPress={()=> this.props.navigation.navigate('TT')}
                          
                       />
                    <Category  imageURI={require('../assets/icon.png' )}
                          name='Tips of life'
                          onPress={()=> this.props.navigation.navigate('TOL')}
                      />
             </View> 
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                    <Category  imageURI={require('../assets/icon.png' )}
                           name='Learning Korean'
                           onPress={()=> this.props.navigation.navigate('KORca')}
                      />
                    <Category  imageURI={require('../assets/icon.png' )}
                           name='Travel'
                           onPress={()=> this.props.navigation.navigate('RR')}
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

            </ScrollView >
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
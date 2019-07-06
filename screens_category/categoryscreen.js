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
    <View style={{flex:1,marginTop:20}}>
         <ScrollView   onRefresh={this.handleRefresh} >
         { /*****  category sort  each view have 2 category  in row  *******/}
             <View   style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.23.10.png?alt=media&token=8ac01dfc-49bf-4f86-ba81-617e62ac4764"}}
                           name='Exchange'
                          
                           onPress={()=>  Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
                          
                     />
             
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-24%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.32.26.png?alt=media&token=6ae5fd71-f2b3-4a04-a5f8-0ad58157ccb8"}}
                          name='Festivals & Concerts'
                        
                      />
           </View>
        { /*****  category sort  each view have 2 category  in row  *******/
         // hope we can 
      }      
          
             <View  style={{  flex:1,  flexDirection:'row'}}>
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.48.10.png?alt=media&token=3ba845b5-a5b0-4251-926a-26cc52bcc0af"}}
                           name='food'
                           onPress={()=> this.props.navigation.navigate('Food')}
                          
                       />
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.26.39.png?alt=media&token=16ef90b5-5d69-4cb6-a2d0-06b2dd43318e"}}
                          name='Recommendations on Culture'
                          onPress={()=> this.props.navigation.navigate('TOL')}
                      />
             </View> 
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.05.39.png?alt=media&token=52d6143d-f978-42ce-9ecd-856983508c0f"}}
                           name='Learning Korean'
                           onPress={()=> this.props.navigation.navigate('KORca')}
                      />
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.50.09.png?alt=media&token=dc61de11-4862-429d-8796-6e58cc521ae7"}}
                           name='TOUR'
                           onPress={()=> this.props.navigation.navigate('TT')}
                      />
             </View>
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.27.58.png?alt=media&token=e0d7844c-c0c4-479d-8629-1fc0abf88399"}}
                           name='Shopping'
                           
                    />
                   <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.28.18.png?alt=media&token=40708640-b14f-4b14-84c0-f3db10ddd142"}}
                           name='Q & A / Suggestion for APP'
                          
                    />
             </View>
      { /*****  category sort  each view have 2 category  in row  *******/}
             <View   style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.28.37.png?alt=media&token=bfa1bc54-fcb2-42a0-bb21-917184e050d8"}}
                           name='BUY & SELL'
                         
                     />
                   
                   <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-06-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.25.02.png?alt=media&token=9a39eeb2-752c-430a-8848-759745b34ee2"}}
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
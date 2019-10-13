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
    <View style={{flex:1,marginTop:20,marginLeft:7}}>
         <ScrollView   onRefresh={this.handleRefresh} >
         { /*****  category sort  each view have 2 category  in row  *******/}
             <View   style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fexchange%20rate.png?alt=media&token=ab617188-a5ff-4f92-9f44-c381d655627a"}}
                           name='Exchange'
                          
                          // onPress={()=>  Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
                          onPress={()=> this.props.navigation.navigate('EXCHANGE')}
                     />
             
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Flearning%20korea.png?alt=media&token=27b4bb03-956a-4af6-8026-4718f7d8eecf"}}
                          name='korean'
                          onPress={()=> this.props.navigation.navigate('KORca')}
                      />
           </View>
        { /*****  category sort  each view have 2 category  in row  *******/
         // hope we can 
      }      
          
             <View  style={{  flex:1,  flexDirection:'row'}}>
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fbus%20schedule.png?alt=media&token=8f3279cd-2fa1-4d49-b603-85c9b9e6835d"}}
                           name='bus'
                           onPress={()=> this.props.navigation.navigate('BUS')}
                          
                       />
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fphone%20book.png?alt=media&token=4cfb18e7-66bb-451f-804b-e866220440ef"}}
                          name='phone'
                          onPress={()=> this.props.navigation.navigate('TOL')}
                      />
             </View> 
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fbuy%20%26%20sell.png?alt=media&token=5c07704a-85e8-4381-a860-14f33f81f160"}}
                           name='buy and sell'
                           onPress={()=> this.props.navigation.navigate('UNDEVELOP1')}
                      />
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F71583065_384095262479898_3086850522427162624_n.png?alt=media&token=d90c1db1-b1f3-49bd-8a95-c4e5223a2f53"}}
                           name='TOUR'
                           onPress={()=> this.props.navigation.navigate('UNDEVELOP1')}
                      />
             </View>
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F71943018_385345952161708_3197462092261097472_n.png?alt=media&token=d297dc46-a368-414d-b4fa-842f5cb079df"}}
                           name='culture'
                           
                    />
                   <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2F71348065_692662517904833_2631103120217735168_n.png?alt=media&token=9b1bb6f7-9af8-4241-9698-5c2b1e28675c"}}
                           name='contact us'
                           onPress={()=> this.props.navigation.navigate('CONTACT')}
                    />
             </View>
      { /*****  category sort  each view have 2 category  in row  *******/}
         

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
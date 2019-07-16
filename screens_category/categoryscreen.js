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
          
                   <Category imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fexchange%20rate.png?alt=media&token=0515b783-8ce0-4a60-ae00-40e078734daf"}}
                           name='Exchange'
                          
                          // onPress={()=>  Linking.openURL("https://www.dollars2won.com/").catch((err) => console.error('An error occurred', err))}
                          onPress={()=> this.props.navigation.navigate('EXCHANGE')}
                     />
             
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Flearning%20korean.png?alt=media&token=1e0c7392-3338-4b93-b424-d1566bb43883"}}
                          name='Festivals & Concerts'
                          onPress={()=> this.props.navigation.navigate('KORca')}
                      />
           </View>
        { /*****  category sort  each view have 2 category  in row  *******/
         // hope we can 
      }      
          
             <View  style={{  flex:1,  flexDirection:'row'}}>
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fbus%20schedule.png?alt=media&token=78b013c9-c972-49cc-9bdf-931f7de28113"}}
                           name='food'
                           onPress={()=> this.props.navigation.navigate('BUS')}
                          
                       />
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fphone%20book.png?alt=media&token=bf72c6d4-71c0-4829-ae46-7e4f1a2a511b"}}
                          name='Recommendations on Culture'
                          onPress={()=> this.props.navigation.navigate('TOL')}
                      />
             </View> 
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fbuy%20%26%20sell.png?alt=media&token=8493fe71-30b6-4461-81d4-a385fa562d11"}}
                           name='Learning Korean'
                          
                      />
                    <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2FQ%26A.png?alt=media&token=53b2c769-2dc1-437b-8454-4d99dab85827"}}
                           name='TOUR'
                           onPress={()=> this.props.navigation.navigate('TT')}
                      />
             </View>
       { /*****  category sort  each view have 2 category  in row  *******/}
             <View  style={{  flex:1,  flexDirection:'row'}}>
          
                   <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fculture.png?alt=media&token=7be4add3-d5a5-44c4-9986-5004b8b6b134"}}
                           name='Shopping'
                           
                    />
                   <Category  imageURI={{uri:"https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/category%2Fcontact%20us%20(1).png?alt=media&token=d8eaaa2d-7be6-49f5-bb3b-63f422d27c94"}}
                           name='Q & A / Suggestion for APP'
                          
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
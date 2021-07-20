import React from 'react';

import { Button, FlatList,View, Text, ScrollView, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, Linking, Modal } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar, Header, CheckBox } from "react-native-elements";
import { Ionicons, MaterialIcons, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from '../components/Textedit'
import firebase, { storage } from "../firebase";
import Comment from '../components/comment'

class COUPON_EX extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hot: false,
            new: true,
            datasource: []
        };
    }

    byLatest = () => {
        this.setState({
            new: true,
            hot: false,
        })
    }
    byRank = () => {
        this.setState({
            new: false,
            hot: true,
        })
    }


    llink = (location) => {
    
        if (JSON.stringify(location).replace(/^"(.+)"$/, '$1') != "NO") {
    
          Linking.openURL(JSON.stringify(location).replace(/^"(.+)"$/, '$1')).catch((err) => console.error('An error occurred', err))
        }
    
      }
    

   renderItem =({item})=>{

    return(
      <TouchableOpacity
      onPress={() => {


     
     }
   
   }
      >
     <View  style={{  flex:1,  marginRight:20,marginLeft:20,flexDirection:'row',marginBottom:6,marginTop:6,borderColor:'black'}} >
         
               <Image
                                style={{ width: 150, height: 150, resizeMode: 'cover' }}
                                resizeMode={'contain'}
                                source={require('../assets/ico.png')}
                            />
        <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 30, marginTop: 10 }}>    location: </Text>

             </View>
            
           </View>
           </TouchableOpacity>   




    )



}



    render() {
        let dimensions = Dimensions.get("window");
        let imageheight = dimensions.height
        let imagewidth = dimensions.width;
        const { navigation } = this.props;
        const location = navigation.getParam('location', 'NO-ID');
        const from = navigation.getParam('from', 'NO-ID');
        const description = navigation.getParam('description', 'NO-ID');
        const  image = navigation.getParam('image','NO-ID');

        return (

            <View
           style={{ height:imageheight,width:imagewidth, backgroundColor: 'white'}}
            >

                <Header
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(from)}
                        >
                            <Image source={require('../assets/back.png')}

                                style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
                            />
                        </TouchableOpacity>
                    }
                    backgroundColor={'#fff'}
                    borderBottomColor={'#fff'}
                    height={80}
                    centerComponent={{ text: 'COUPONS', style: { fontFamily: 'Bebas Neue Regular', fontSize: 40, marginLeft: 10, marginTop: 17, color: '#67DBFF' } }}

                >

                </Header>

                  

                <View

                >
                    <Image
                        style={{ width: imagewidth, height: imagewidth, resizeMode: 'cover' }}
                        resizeMode={'contain'}
                        source={{uri:image}}
                    />
                    <View
                    style={{alignItems:'center'}}
                    >
   <Text style={{ fontFamily: 'Roboto Bold', fontSize: 15,color: '#67DBFF' }}> you can use this coupon just by showing this screen before you pay   </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 23, marginLeft: 20, marginTop: 20 }}>Location   </Text>
                        <TouchableOpacity
                            onPress={() => this.llink(location)}
                        >
                        <Image source={require('../assets/placeg.png')}

                            style={{ width: 35, height: 40, marginLeft: -15, marginTop: 10,resizeMode: 'cover' }}
                        />
                         </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Roboto Bold', fontSize: 23, marginLeft: 20, marginTop: 20 }}>Description     </Text>
                      
                    </View>
                    <Text style={{ fontFamily: 'Roboto Bold', fontSize: 15, color:'grey',marginLeft: 20, marginTop: 20 }}> {description}   </Text>

                </View>






            </View>
        );
    }
}


export default COUPON_EX;
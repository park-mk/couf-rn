import React from 'react';

import { Button, FlatList,View, Text, ScrollView, Image, Dimensions, ImageBackground, StyleSheet, TouchableOpacity, TouchableHighlight, SafeAreaView, Linking, Modal } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImageSlider from 'react-native-image-slider';
import { List, ListItem, SearchBar, Header, CheckBox } from "react-native-elements";
import { Ionicons, MaterialIcons, Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import Texteditor from '../components/Textedit'
import firebase, { storage } from "../firebase";
import Comment from '../components/comment'

class COUPON extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hot: false,
            new: true,
            datasource: []
        };
    }


    componentDidMount() {

        this.makeRemoteRequest();
    }   
    sortFilterFunction_new = () => {
        console.log(this.state.datasource);
         var usersRef = firebase.database().ref('COUPONS/Osan');
            usersRef.once('value', (snapshot) => {                     //    tips database resort

                var m = snapshot.val()
                var keys = Object.values(m);
                this.setState({
                    datasource: keys                                   // datasource of list
                })
            }).then((m) => {


              
                const newData = this.state.datasource.sort(function(a,b) {
                    return a.date - b.date;
                });

                this.setState({ datasource: newData.reverse() });
                console.log("/////////////////////");
                console.log(this.state.datasource);
            })

          
        
    }
    sortFilterFunction_rank = () => {
        console.log(this.state.datasource);
         var usersRef = firebase.database().ref('COUPONS/Osan');
            usersRef.once('value', (snapshot) => {                     //    tips database resort

                var m = snapshot.val()
                var keys = Object.values(m);
                this.setState({
                    datasource: keys                                   // datasource of list
                })
            }).then((m) => {


              
                const newData = this.state.datasource.sort(function(a,b) {
                    return a.visit - b.visit;
                });

                this.setState({ datasource: newData.reverse() });
                console.log("/////////////////////");
                console.log(this.state.datasource);
            })

          
        
    }
    byLatest = () => {
        this.setState({
            new: true,
            hot: false,
        })
       this.sortFilterFunction_new();
    }
    byRank = () => {
        this.setState({
            new: false,
            hot: true,
        })
        this.sortFilterFunction_rank();
    }

    makeRemoteRequest = () => {
        const { navigation } = this.props;
        const from = navigation.getParam('from', 'NO-ID');

        if(from == 'new'){
            this.byLatest();
        }
        else{
            this.byRank();
        }
        
        // var usersRef = firebase.database().ref('COUPONS/Osan');


        // usersRef.on('value', (snapshot) => {


        //     var m = snapshot.val()
        //     var keys = Object.values(m);

        //     this.setState({
        //         datasource: keys
        //     })
        // });

    }


   renderItem =({item})=>{

    return(
      <TouchableOpacity
      onPress={() =>  this.props.navigation.navigate('COUPON_EX', {
        location:item.location ,
        description:item.description,
        from:"COUPON",
        image:item.link

    })

        
   
     }
      >
     <View  style={{  flex:1,  marginRight:20,marginLeft:20,flexDirection:'row',marginBottom:6,marginTop:6,borderColor:'black'}} >
         
               <Image
                                style={{ width: 150, height: 150, resizeMode: 'cover' }}
                                resizeMode={'contain'}
                                source={{ uri: item.link}}
                            />
             <View  >
    
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
        const name = navigation.getParam('name', 'NO-ID');
       


        return (

            <View
            style={{ backgroundColor: 'white' }}
            >

                <Header
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('COUPONLIST')}
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
                <ScrollView
                    style={{ backgroundColor: 'white' }}
                >
                    <Text style={{ fontFamily: 'Roboto Bold', fontSize: 30, marginLeft: 13, marginTop: 30 }}>Restaurant Vouchers</Text>
                    <Text style={{ fontFamily: 'Roboto Bold', fontSize: 20, marginLeft: 13, marginTop: 30 }}>{name}</Text>
                    <View
                        style={{ backgroundColor: 'white', height: 60, marginTop: 13, marginLeft: 15, flexDirection: 'row' }}
                    >
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            style={{ height: 40, backgroundColor: 'white' }}
                            title='by Rank '
                            checked={this.state.hot}
                            onPress={() => this.byRank()}


                        />
                        <CheckBox
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            style={{ height: 40, backgroundColor: 'white' }}
                            title='by Latest'
                            checked={this.state.new}
                            onPress={() => this.byLatest()}
                        />
                    </View>
                    <View 
                    style={{alignItems:'center'}}
                    >
                    <FlatList

                        data={this.state.datasource}

                        renderItem={this.renderItem}
                        numColumns={2}
                        horizontal={false}
                        keyExtractor={item => item.name}
                        initialNumToRender={4}
                        maxToRenderPerBatch={4}
                            // ListHeaderComponent={this.renderHeader}
                            //   ListFooterComponent={this.renderFooter}
                            onRefresh={this.handleRefresh}
                            refreshing={this.state.refreshing}

                            onEndReachedThreshold={10000000}


                        />

                        </View>





                </ScrollView>
            </View>
        );
    }
}


export default COUPON;
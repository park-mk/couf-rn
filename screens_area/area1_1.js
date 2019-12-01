import React from 'react';
import { Button, FlatList, Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, Linking, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar, Header } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import firebase, { storage } from "../firebase";
import A1WTD from '../screens_wtd/area1_wtd';
import A1WTE from '../screens_wte/area1_wte'
import Carousel from 'react-native-banner-carousel';

const color = {
  theme: '#06C1AE',
  border: '#e0e0e0',
  background: '#f3f3f3'
}
/*
const images = [
  "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2Fsauna.png?alt=media&token=5b28d7c5-326e-4c89-b493-680568910cb6",
  "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FYOUTUBE.png?alt=media&token=5cf3d21f-3e2c-495a-8299-29867da8fe72",
  "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FComponent%208.png?alt=media&token=7660c171-a0f5-4a56-b6c9-7d7e17b28a23"
];
*/

class Area1_1Screen extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      datasource: [],
      datasource1: [],
      datasource2: [],
      pause: false,
      error: null,
      refreshing: false,
      fontLoaded: true,
    };
  }









  componentDidMount() {


    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {



    this.setState({ loading: true });
    const { navigation } = this.props;

    var usersRef = firebase.database().ref('WTD_MAIN');


    usersRef.on('value', (snapshot) => {


      var m = snapshot.val()
      var keys = Object.values(m);
      this.setState({
        datasource: keys
      })

      usersRef = firebase.database().ref('WTD');


      usersRef.on('value', (snapshot) => {


        var m = snapshot.val()
        var keys = Object.values(m);
        this.setState({
          datasource1: keys
        })
      });


      usersRef1 = firebase.database().ref('A1WTD_AD');


      usersRef1.on('value', (snapshot) => {


        var m = snapshot.val()
        var keys = Object.values(m);
        this.setState({
          datasource2: keys
        })
        console.log(this.state.datasource2,"keys")
      });

   
    });








  };
  renderItem3 = ({ item }) => {
    let dimensions = Dimensions.get("window");
    let imageheight = 4 * dimensions.height / 10;
    let imagewidth = dimensions.width;

    return (

      <View  >
        <Image style={{
          width: imagewidth+10,
          height: item.height,
      
        }}
          source={{ uri: item.topimage }}

        />
      

      </View>




    )



  }

  renderItem = ({ item }) => {
    let dimensions = Dimensions.get("window");
    let imageheight = 4 * dimensions.height / 10;
    let imagewidth = dimensions.width;
    return (
      <TouchableOpacity
        onPress={() => {

          this.props.navigation.navigate('Area1_2', {

            title: item.title,
            description: item.description,

          

          });


        }

        }
      >



        <ImageBackground source={{ uri: item.topimage.toString() }} style={{ height: imageheight, width: imagewidth }}>
          <View style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>

          </View>
        </ImageBackground>



      </TouchableOpacity>




    )



  }

  renderPage(image, index) {
    let dimensions = Dimensions.get("window");
    //  let imageheight = Math.round((dimensions.width * 9) / 12);
    let imageheight =  dimensions.height / 10;
    let imagewidth = dimensions.width;

    return (
        <View key={index}>
            <Image style={{ width: imagewidth , height: imageheight  }} source={{ uri: image }} />
        </View>
    );
}


  _keyExtractor = (item, index) => item.key;

  render() {

    let dimensions = Dimensions.get("window");
    //  let imageheight = Math.round((dimensions.width * 9) / 12);
    let imageheight = 4 * dimensions.height / 10;
    let imagewidth = dimensions.width;


    return (
      <View>
        <Header
          leftComponent={<TouchableOpacity
            onPress={() => this.props.navigation.navigate('Area')}
          >
            <Image source={require('../assets/back.png')}

              style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
            />
          </TouchableOpacity>}
          backgroundColor={'#fff'}
          borderBottomColor={'#fff'}
          centerComponent={{ text: 'AREA1', style: { fontFamily: 'title-font', fontSize: 40, marginLeft: 10, color: '#67DBFF' } }}

        />


        <ScrollView>

          <View>
            <View style={{ flexDirection: "row", flex: 2 }}>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}

                onPress={() => this.props.navigation.navigate('Area1')}>
                <Text style={{ fontFamily: 'title-font', fontSize: 23, marginTop: 20, color: '#7f8182' }}  >THINGS TO EAT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'title-font', fontSize: 23, marginTop: 20, color: '#67DBFF' }}>WHAT TO DO</Text>
              </TouchableOpacity>


            </View>

            <View>









              <View style={{
                borderBottomColor: '#67DBFF',
                borderBottomWidth: 1,
                marginTop: 3,
              }} />
              <View style={{ flexDirection: 'row' }}>
                <View style={{
                  width: imagewidth / 2,
                  height: 3,

                }}    >
                </View>
                <View style={{
                  width: imagewidth / 2,
                  height: 3,
                  backgroundColor: '#67DBFF',
                }}    >
                </View>
              </View>

              <View style={{
                borderBottomColor: '#67DBFF',
                borderBottomWidth: 1,

              }} />


            </View >




            <View>
              <FlatList

                data={this.state.datasource}

                renderItem={this.renderItem}

                horizontal={true}
                keyExtractor={item => item.name}
                initialNumToRender={4}
                maxToRenderPerBatch={4}
                // ListHeaderComponent={this.renderHeader}
                //   ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}

              


              />



              {/*
    <FlatList 
          data={this.state.datasource}
          keyExtractor={this._keyExtractor}
          horizontal={true}
          renderItem={({ item }) => (
              
            <ListItem  
         //    linearGradientProps={{
            //  colors: ['#f45a5a', '#f45a5a'],
   // colors: ['#ea3807', '#e5bcb0'],
   // start: [1, 0],
    //end: [0.2, 0],
 // }}
 
 
               title=  {     
                 
                <View  style={{  flex:1,   alignContent:'center',marginRight:-3, borderWidth:2,borderColor:'#67DBFF'}}
                    
                >
              <ImageBackground   style={styles.icon}
                    source={{uri:item.topimage}}
             
             >
              
         
        <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}>
     
      <Image
        style={ { width: 35,
          height: 30,marginTop:200}}
        source={require('../assets/likewhithe.png')}
      /> 
      <Text style={{marginLeft:3,fontSize:30,color:'white',fontFamily:'title-font'}}>{item.upvote}</Text>
     
        
      </View>
             
              </ImageBackground>
              </View>
            
                
                  
          }
          
            
            
            onPress={() => {
             
              this.props.navigation.navigate('FOODi', {
                 name : item.name,
                 description :item.description,
                 cate:item.cate,
                 topimage : item.topimage,
               
                
               
                 imagelist:item.images,
                 //tips:item.tips,
              });
            }
          
          }
              
             // avatar={{ uri: item.picture.thumbnail }}
             
            />
          )
          
        }
          keyExtractor={item => item.name}
        
          
         // ListHeaderComponent={this.renderHeader}
         ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={40}
          const images = [
    "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2Fsauna.png?alt=media&token=5b28d7c5-326e-4c89-b493-680568910cb6",
    "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FYOUTUBE.png?alt=media&token=5cf3d21f-3e2c-495a-8299-29867da8fe72",
    "https://firebasestorage.googleapis.com/v0/b/react-nativedb-4eb41.appspot.com/o/V%202%20main%20pngs%20combined%2FYOUTUBE.png?alt=media&token=5cf3d21f-3e2c-495a-8299-29867da8fe72"
];

        />
    */}


            </View>
    {       /*
            <Carousel
              
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={imagewidth}
                >
                    {images.map((image, index) => this.renderPage(image, index))}
                </Carousel>
    */}

            <Text style={{ fontFamily: 'title-font', fontSize: 40, marginLeft: 20, marginTop: 30 }}

            >ACTIVITY</Text>

            <View>

              <FlatList
                data={this.state.datasource1}
                keyExtractor={this._keyExtractor}
                horizontal={true}
                renderItem={({ item }) => (

                  <ListItem
                    //    linearGradientProps={{
                    //  colors: ['#f45a5a', '#f45a5a'],
                    // colors: ['#ea3807', '#e5bcb0'],
                    // start: [1, 0],
                    //end: [0.2, 0],
                    // }}


                    title={

                      <View style={{
                        justifyContent: 'center',
                        alignItems: 'center', marginRight: -3, borderWidth: 2, borderColor: '#67DBFF', width: 260,
                        height: 160,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                      }

                      } >
                        <ImageBackground source={{ uri: item.topimage.toString() }} style={{ height: 160, width: 260 }}>
                          <View style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>

                          </View>
                        </ImageBackground>
                      </View>

                    }



                    onPress={() => {

                      this.props.navigation.navigate('A1WTD', {
                        name: item.name,

                        topimage: item.topimage,
                        locas: item.locas,
                        locass: item.locass,


                        imagelist: item.images,
                        //tips:item.tips,
                      });
                    }

                    }

                  // avatar={{ uri: item.picture.thumbnail }}

                  />
                )

                }
                keyExtractor={item => item.name}


                // ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={40}
              />



            </View>










          </View>
          <View

            style={{ width: 70, height: 80, marginLeft: -15 }}
          />
        </ScrollView>


      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1, /// PixelRatio.get(),
    // borderColor: color.border,
    backgroundColor: 'white',
  },
  icon: {
    width: 260,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',

    // alignContent:'center',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  price: {
    marginTop: 30,
    color: color.theme,

  },
  h1: {
    fontSize: 40,
    fontFamily: 'Raley-balck',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222222',

  },
  p: {
    fontSize: 15,
    //marginLeft:30,
    //textAlign: 'center',
    color: 'grey',
  },
  banner: {
    marginTop:1,
    flexGrow: 1,
    marginTop:40,
},
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: null,
    height: null,
    opacity: 0.5,
    resizeMode: 'cover',
  },
})

export default Area1_1Screen;
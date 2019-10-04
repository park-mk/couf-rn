
import React, { Component } from "react";
import { Button, View, Text ,ScrollView,Image,Dimensions,ImageBackground,StyleSheet,TouchableHighlight,TouchableOpacity,SafeAreaView,Linking} from 'react-native';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import  firebase,{storage}  from "../firebase";
import LOCA from '../components/loca';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import  someList from '../components/anylist';
import ImageSlider from 'react-native-image-slider';
import *  as Font from'expo-font'


  database=firebase.database();
 
  
  
  const color = {
    theme: '#06C1AE',
    border: '#e0e0e0',
    background: '#f3f3f3'
  }


class A1WTD extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      datasource: [],
      pause:false,
      error: null,
      refreshing: false,
      fontLoaded:true,
    };
  }



  











  


  componentDidMount() {
    Font.loadAsync({

        'Raley-balck':require('../assets/fonts/33676382891.ttf'),});
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
    const move = navigation.getParam('move', 'NO-ID');

    var usersRef = firebase.database().ref('WTD');
    
    
usersRef.on('value', (snapshot) => {
    
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource:  keys
  })
});
    
  };

  handleRefresh = () => {
    
    this.setState(
      {
      
        refreshing: false
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
   
    this.setState(
      {
        loading: false
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
      this.state.loading=true;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
      
        <ActivityIndicator animating size="large" />
       

      </View>
    );
  };
  renderSeparator = () => {
   
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
   

   renderItem =({item})=>{

         return(
  
          <View  style={{  flex:1,  flexDirection:'row',marginBottom:6,borderTopWidth:1}} >
                  <Image  style={styles.icon}
                        source={{uri:item.topimage}}
                 
                 />
                  <View  >
                  <Text style={styles.h1}>  </Text>  
                  <Text style={styles.h1} style={{fontFamily:'Raley-balck',fontSize:30}}>{item.name}</Text>  
               {   //<Text style={styles.p} >{item.type}</Text>   
              // <Text style={styles.price} >{item.location}</Text> 
             }
                
                  </View>
           

                  </View>




         )



   }
   renderList() {
    
       
          
          return <Text>   </Text> ;
    
}

   

  render() {
    let dimensions=Dimensions.get("window");
    let imageheight=6*dimensions.height/10
    //let imageheight =Math.round((dimensions.width*9)/12);
     let imagewidth =dimensions.width;
    const { navigation } = this.props;
    const imagelist=navigation.getParam('imagelist', 'NO-ID');
    const locas=navigation.getParam('locas', 'NO-ID');
    const locass=navigation.getParam('locass', 'NO-ID');
    const name=navigation.getParam('name', 'NO-ID');
    var sentence= imagelist.substring(1,imagelist.length);
    number_of_pagraph=sentence.split("/*/").length - 1;
    var sentence1= locas.substring(1,locas.length);
    number_of_locas=sentence1.split("/*/").length - 1;
    var sentence2= locass.substring(1,locass.length);
    number_of_locass=sentence2.split("/*/").length - 1;
    const images = [
      
    ];  
    const locaslist=
     {  name:[],
        loca:[], 
     };
    
    const locasslist=[];
     for(let i=0;i<number_of_pagraph;i++){
      var term= sentence.indexOf("/*/");
      let info=sentence.substring(0,term);
      if(i!=0)
      images.push(info);
     
      sentence=sentence.substring(term+3,sentence.length);
     
      
     }
     for(let i=0;i<number_of_locas;i++){
      var term= sentence1.indexOf("/*/");
      let info1=sentence1.substring(0,term);
      if(i!=0)
      locaslist.name.push(info1);
     
      sentence1=sentence1.substring(term+3,sentence1.length);
     
      
     }
     for(let i=0;i<number_of_locass;i++){
      var term= sentence2.indexOf("/*/");
      let info2=sentence2.substring(0,term);
      if(i!=0)
      locaslist.loca.push(info2);
     
      sentence2=sentence2.substring(term+3,sentence2.length);
     
      console.log(locaslist);
     }
    return (
      <View>
       <Header
      leftComponent={  
       <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('Area')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  /> 
  </TouchableOpacity>
  } 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: name, style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
     
       />
       <ScrollView>

     <SafeAreaView style={styles.container}>
        <View >
          
        </View>
     <ImageSlider
          loopBothSides
         // autoPlayWithInterval={3000}
          images={images}
          style={{height:imageheight,width:imagewidth }}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
             
              {images.map((image, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    underlayColor="#f00"
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
      
       
      </SafeAreaView> 
      {locaslist.name.map((contact, i) => {
                        return (
                        <LOCA name={locaslist.name[i]}
                               loca={locaslist.loca[i]}
                              

                                              key={i}/>
                                              
                                              );
                    })}

        <View  style={{height: 120}}>
       
          </View>
        
   
          </ScrollView>
       </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
   // padding: 10,
    //borderBottomWidth: 1  , /// PixelRatio.get(),
   // borderColor: color.border,
    backgroundColor: 'white',
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginRight:10,
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
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
  price: {
    marginTop:30,
    color: color.theme,
    
  },
  h1: {
    fontSize: 30,
    
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
  backgroundImage:{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: null,
    height: null,
    opacity:0.5,
    resizeMode: 'cover',
},
})


export default A1WTD;





import React from 'react';
import { Button, FlatList,Text, View ,TouchableOpacity,Image,StyleSheet,ScrollView,Linking,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar ,Header} from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import  firebase,{storage}  from "../firebase";
//import A3WTD from '../screens_wtd/area3_wtd';
import A1WTE from '../screens_wte/area1_wte'

const color = {
  theme: '#06C1AE',
  border: '#e0e0e0',
  background: '#f3f3f3'
}

class Area3Screen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      datasource: [],
      pause:false,
      error: null,
      refreshing: false
    };
  }



  




  


  componentDidMount() {
    
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    
     

    this.setState({ loading: true });
    const { navigation } = this.props;
    const move = navigation.getParam('move', 'NO-ID');
// 수정부분 
    var usersRef = firebase.database().ref('A3WTE');
    
    
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

 
  renderSeparator = () => {
    
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#56B8FF",
          marginLeft: "14%"
        }}
      />
    );
  };
   

   renderItem =({item})=>{

         return(
          <TouchableOpacity
          onPress={() => {
            
           this.props.navigation.navigate('WTEA1', {
              name : item.name,
              description :item.description,
              location: item.location,
              loca: item.loca,
              topimage : item.topimage,
              imagelist: item.images,
              disname:item.disname,
              cate:item.cate,
              from:"area3"
             // cate:item.cate,
             // upvote:item.upvote,
            
            //  imagelist:item.images,
              //tips:item.tips,
           });
         }
       
       }
          >
          <View  style={{  flex:1,  flexDirection:'row',marginBottom:0}} >
                  <Image  style={{  width: 100,
            height: 100,
                 borderRadius: 5,}}
                        source={{uri:item.topimage}}
                 
                 />
                  <View  >
                  <Text style={{ fontSize: 30,
    fontFamily:'title-font',
    marginLeft:7,
                  
                   } }>{item.disname}</Text>  
                  <Text style={styles.p} >{item.type}</Text>   
                  <Text style={styles.price} >{item.location}</Text>  
                
                  </View>
                 
                  </View>


             </TouchableOpacity>

         )



   }
  render() {

    let dimensions = Dimensions.get("window");
  //  let imageheight = Math.round((dimensions.width * 9) / 12);
    let imagewidth = dimensions.width;


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
     centerComponent={{ text: 'AREA3', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
    
      />
      <ScrollView>   
     
     
      <View>
      <View style ={{ flexDirection:"row" ,flex:2}}>
      <TouchableOpacity style={{flex:1,alignItems:'center'}}
      
      onPress={()=> this.props.navigation.navigate('Area3')}>
      <Text   style={{fontFamily:'title-font' ,fontSize:23,marginTop:20,color:'#56B8FF'}}  >THINGS TO EAT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1,alignItems:'center'}}

        onPress={()=> this.props.navigation.navigate('Area3_1')}
      >
      <Text style={{fontFamily:'title-font' ,fontSize:23, marginTop:20,color:'#7f8182'}}>WHAT TO DO</Text>
      </TouchableOpacity>
      
    
   </View> 
     
          <View>

         
            
         
      
        
        <View style={{
    borderBottomColor: '#56B8FF',
    borderBottomWidth: 1,
    marginTop:3,
         }}    />
         <View  style={{flexDirection:'row'}}>
            <View style={{
            width:  imagewidth/2,
            height:3,
            backgroundColor: '#56B8FF',
         }}    >
           </View>
               <View style={{
            width:  imagewidth/2,
            height:3,
          
         }}    >
         </View>
         </View>
         
<View style={{
    borderBottomColor: '#56B8FF',
    borderBottomWidth: 1,

         }}    /> 
   
      </View >


      <View >
   
   <FlatList 
         data={this.state.datasource}
         
         renderItem={this.renderItem}
         
       
         keyExtractor={item => item.name}
       
        // ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this.renderSeparator}
         onRefresh={this.handleRefresh}
         refreshing={this.state.refreshing}
         onEndReached={this.handleLoadMore}
         onEndReachedThreshold={40}
       />
      </View>

      
        
 
      



         
   

      </View>
      <View
                  
                  style={{width:70,height:80,marginLeft:-15}}
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
    borderBottomWidth: 1  , /// PixelRatio.get(),
   // borderColor: color.border,
    backgroundColor: 'white',
  },
  icon: {
    width: 260,
    height: 160,
    borderRadius: 5,
   
   // alignContent:'center',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  price: {
    marginTop:30,
    color: color.theme,
    
  },
  h1: {
    fontSize: 20,
    fontFamily:'Raley-balck',
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

export default Area3Screen;
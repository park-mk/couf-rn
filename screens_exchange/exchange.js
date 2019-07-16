import React from 'react';
import {Image, StyleSheet, Text, View,TouchableOpacity,BackHandler} from 'react-native';
import * as firebase from 'firebase'
import BirthdayPicker from '../components/yearmonth'
import { FormLabel, FormInput, FormValidationMessage ,CheckBox,Slider ,Header, ButtonGroup } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

import {Container, Form, Item, Button, Input} from 'native-base'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';


  //load the firebase.database in order to simplfy
  database=firebase.database();
  
//tip of liFE
class EXCHANGE extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
     rate:0,
      pause:false,
      error: null,
      refreshing: false,
      search: '',
      USD:0,
      KOR:0,
      USD1:0,
      KOR1:0,
    };
  }

  // this function  refresh everytime information is changed 
  componentDidMount() {
    console.log(this.state.search);
    this.makeRemoteRequest();
  }
 // real refresh function 
  makeRemoteRequest = () => {
    
    this.setState({ loading: true });                    //because while this function is working = loading 
    var usersRef =firebase.database().ref('exchange');       //   bring the database tips
    usersRef.on('value', (snapshot) => {                     //    tips database resort
    
     var m=snapshot.val() 
    
  this.setState({
    rate:  m                                   // datasource of list 
  })
});
    
  };
      
      //  up scroll to refresh
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
   // if approached end also refresh 
  won = () => {
  
    this.setState(
      {
        KOR: this.state.USD*this.state.rate
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };
  dollor = () => {
  
    this.setState(
      {
        USD: this.state.KOR/this.state.rate
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  
 //   header not used yet but im gonna use it as searching 

   // start to draw whole screen 
  render() {
     
    return (
        // flat list data= datasoucr= firebase.tips        details please look upper 
        <View>
        <Header
      leftComponent={  <TouchableOpacity 
       onPress={()=> this.props.navigation.navigate('Category')}
       >
       <Image source={require('../assets/back.png')}
                   
      style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
 /> 
 </TouchableOpacity>} 
     backgroundColor={'#fff'}
    borderBottomColor={'#fff'}
      centerComponent={{ text: 'EXCHANGE', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}
     
       />
    <View   style={{justifyContent:'center', marginTop:50}}> 
       <Text style={{fontFamily:'title-font' ,fontSize:30,marginLeft:10,marginTop:30,color:'#56B8FF' } }> USD</Text>

         <Item>
                     
                     
                        <Input
                            placeholder=""
                            keyboardType = 'numeric'
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText= {(USD)=>this.setState({USD})}
                            value={this.state.USD.toString()}
                        />
                         <Text style={{fontFamily:'title-font' ,fontSize:30,marginLeft:10,marginTop:30,color:'#56B8FF' } }>$ </Text>
                    </Item>
                   
   <View style={{ flexDirection:'row',justifyContent: 'space-around',}}       > 
                    <Button style={ { marginTop: 15, backgroundColor:'#56B8FF' }}
                        full
                        rounded
                        primary
                        onPress={() => this.won() }
                    // onPress={()=>this.singUpUser(this.state.email,this.state.password)}
                >
                    <Text style={ {color:'white',fontSize:20} }>    $    TO    ₩    </Text>
                </Button>
                <Button style={ { marginTop: 15, backgroundColor:'#56B8FF' }}
                        full
                        rounded
                        primary
                        //onPress={() => this.props.navigation.navigate('SignUp')}
                        onPress={() => this.dollor() }
                    // onPress={()=>this.singUpUser(this.state.email,this.state.password)}
                >
                    <Text style={ {color:'white',fontSize:20} }>   ₩    TO    $   </Text>
                </Button>

         </View>
         <Text style={{fontFamily:'title-font' ,fontSize:30,marginLeft:10,marginTop:30,color:'#56B8FF' } }> KOR</Text>
<Item>
            
   
             
               <Input
                
                   keyboardType = 'numeric'
                   autoCorrect={false}
                   autoCapitalize="none"
                   onChangeText= {(KOR)=>this.setState({KOR})}
                   value={this.state.KOR.toString()}
               />
                 <Text style={{fontFamily:'title-font' ,fontSize:30,marginLeft:10,marginTop:30,color:'#56B8FF' } }>₩ </Text>
           </Item>
          



    </View> 

    </View> 
    
       
    );
  }
}
export default EXCHANGE;
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */




 {/*
var num;          //means counts of TOL lists                       
var ref= database.ref('number');    // adding the firebase category number(counts of different components)
ref.on('value',gotData,errData);      // declare the functiong 

function gotData(data){         // get the data from firebase 
  var number=data.val();
  
  var  keys= Object.keys(number);
    var k=keys[0];                 // as   number is   storage as array   this step is to get the actual value
     num= number[k].num;
  

}
  function errData(err){      //err happens
   console.log('Erro');
}   

var title;            // the title of  TOL list   is  stored in different database with "number" (which is used just now )
var m;                // m here symbol whole title array    
var keys;                //  in order to get the 
var titles=[];
 ref=database.ref('tips');
 ref.on('value',gotcha,erra);
  function gotcha(data){
     m=data.val();
      keys= Object.keys(m);
      for (let i=0;i<num;i++){
      var k=keys[i];
      title=m[k].title;
      titles.push(title);
    
      }
     
    
  }
  function erra(err){
    console.log('Erro');
 }  
*/}
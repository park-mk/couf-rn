import React from 'react';
import {   View , FlatList,Image,Button,TouchableOpacity,Text,SafeAreaView,ScrollView} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import  firebase from "../firebase";
import call from 'react-native-phone-call';




  //load the firebase.database in order to simplfy
  database=firebase.database();
  
//tip of liFE
class TOLScreen extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      datasource: [],
      pause:false,
      error: null,
      refreshing: false,
      search: '',
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
    var usersRef =firebase.database().ref('Phonebook');       //   bring the database tips
    usersRef.on('value', (snapshot) => {                     //    tips database resort
    
     var m=snapshot.val() 
     var keys= Object.values(m);
  this.setState({
    datasource:  keys                                   // datasource of list 
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

  
 //   header not used yet but im gonna use it as searching 
 renderHeader = () => {    
  return (      
    <SearchBar        
     // placeholder="Type Here..."        
      lightTheme        
      round        
    //  onChangeText={(text) => this.searchFilterFunction(text)}
      onChangeText={this.updateSearch}
      autoCorrect={false}             
      value={this.state.search}
    />    
  );  
};


updateSearch = search => {
  this.setState({ search });
  
};


searchFilterFunction = text => {    
  this.setState({
    search: text,
  });
  console.log(this.state.search)

 const newData = this.state.datasource.filter(item => {      
    const itemData = `${item.name.toUpperCase()} ${item.number.toUpperCase()}   `;
    
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });

  this.setState({ datasource: newData });  

  //this.makeRemoteRequest();
};
 // not used also but gonna use when there is more info 
  renderFooter = () => {
    if (!this.state.loading) return null;
   //start to draw  footer 
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

  call = (number1) => {
    //handler to make a call
    const args = {
      number: number1,
      prompt: false,
    };

    call(args).catch(console.error);
  };

  // don't use also 
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

  renderagain = () => {
    this.setState({
      search: '',
    });
    this.makeRemoteRequest();
  }; 



   // start to draw whole screen 
  render() {
     
    return (
        // flat list data= datasoucr= firebase.tips        details please look upper 
          
    <View> 
      <ScrollView>
     <View  horizontal={true}> 
        <SearchBar        
        // placeholder="Type Here..." 
          
         lightTheme        
         round        
         onChangeText={(text) => this.searchFilterFunction(text)}
        // onChangeText={this.updateSearch}
         autoCorrect={false}             
         value={this.state.search}
       />    
             <TouchableOpacity
             onPress={  ()=> this.renderagain()}
             >
             <View
              style={{
                width:300, 
                height: 40, 
              }}
             
              
            >
             <Text  style={{fontFamily:'title-font' ,fontSize:23,textAlign:'center'}} > REFRESH FOR UNCORRECT TYPING</Text>
            </View>
             </TouchableOpacity>
         </View> 
     <FlatList
          data={this.state.datasource}
            // (item =  tips ) here
          renderItem={({ item }) => (
              
            <ListItem
                onPress={() => this.call(item.number)}
               // rightAvatar
                title={item.name} 
                subtitle={item.number}
             // avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 3 }}
            />
          )
          
        }
              keyExtractor={item => item.number}         
          //  ListHeaderComponent={this.renderHeader}
          //  ListFooterComponent={this.renderFooter}
          //   onRefresh={this.handleRefresh}
            // refreshing={this.state.refreshing}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={30}
      /> 
      
     <Button
  title="Refresh"
  type="outline"
  onPress={  ()=> this.renderagain()}
        />
      <View
       style={{height:100}}
      >
      </View>
      </ScrollView>
       </View>
    );
  }
}
export default TOLScreen;
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
import React from 'react';
import {
    View,
    FlatList,
    Image,
    Button,
    TouchableOpacity,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TextInput
} from 'react-native';
import { List, ListItem, SearchBar ,Header,CheckBox} from "react-native-elements";
import  firebase from "../firebase";
import call from 'react-native-phone-call';
import ImageSlider from 'react-native-image-slider';
import Icon from "../screens_suggestion/suggestionScreen";
import styled from "styled-components";
import ProgressLoader from 'rn-progress-loader';
import ImageBrowser from '../components/multiple-imagepicker/src/ImageBrowser';
import * as SMS from 'expo-sms';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import { presentPermissionsPickerAsync } from 'expo-media-library';


//load the firebase.database in order to simplfy
database=firebase.database();

//tip of liFE
class TAXI extends React.Component {

    //constuct  the state first in order to show which state i am in  certain function
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            datasource: [],
            datasource1: [],
            dialogVisible:false,
            pause:false,
            error: null,
            refreshing: false,
            search: '',
            images:'',
            toggleWriteForm :true,
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [],
            comment:'',
            price:'',
            dropoff:'',
            contact:'',
            pickup:'',
            loadVisible:false,
            origin:'',
            camp:'',
            once:false,
            camp1:false,
            camp2:false,
            camp3:false,
            camp4:false,
            camp5:false,
          
        };
    }

    // this function  refresh everytime information is changed
    componentDidMount() {
    


        // Toggle the state every second
        setInterval(
            () => this.check_login(),

            1000
        );




        this.makeRemoteRequest();
    }

    check_login(){
        if(this.state.once==false){
        if(firebase.auth().currentUser==null){
            this.setState({loading:true})
        }
        if(firebase.auth().currentUser!=null){
            this.setState({once:true}) 
            this.makeRemoteRequest();
        }
        }
      
    }
    // real refresh function
    replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    makeRemoteRequest = () => {
       
      
        const camp = this.props.navigation.getParam('camp', 'NO-ID');   
        this.setState({ camp:camp });     
        const camp_select = this.props.navigation.getParam('camp_select', 'NO-ID');  
        if(camp_select==1){
            this.setState({ camp1:true });     
        }
        if(camp_select==2){
            this.setState({ camp2:true });     
        }
                      //because while this function is working = loading 
        if(firebase.auth().currentUser!=null){
        var code = firebase.auth().currentUser.uid
            code = this.replaceAll(code, ".", "-");
            code = this.replaceAll(code, "#", "-");
            code = this.replaceAll(code, "$", "-");
            code = this.replaceAll(code, "[", "-");
            code = this.replaceAll(code, "]", "-");
       
        var usersRef =  firebase.database().ref('userinfo/' + code+"/taxi_history")    //   bring the database tips
        usersRef.on('value', (snapshot) => {                     //    tips database resort
    
          var m = snapshot.val()
          if(m!=null||m!=undefined){
          var keys = Object.values(m);
          
           this.setState({
             datasource: keys.reverse()                                   // datasource of list 
           })
        }
        });
    
    }

    };


    changepickup=(pickup) => {
     
      
            
        this.setState({pickup: pickup});
      
    };

    changeComment=(comment) => {
        this.setState({comment: comment});
    };

    changedropoff=(dropoff) => {
        this.setState({dropoff: dropoff});
    };
    updateview_taxi = () => {

       
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        var count_time = 0;

        var usersRef = firebase.database().ref('visit/bus/TAXI/' + today + '/call');
        usersRef.once('value', (snapshot) => {


            let m = snapshot.val()


            count_time = m;
        }, function (m) {

        }).then((m) => {

            firebase.database().ref('visit/bus/TAXI/' + today).update({
                call: count_time + 1
            }, function () {

            });
        })

   

    }

    sendsms = async () => {
        if(this.state.pickup==''){
            alert("PICK UP PLACE SHOULD NOT BE EMPTY!")
            return;
        }
        if(this.state.dropoff==''){
            alert("DESTINATION SHOULD NOT BE EMPTY!")
            return;
        }
        let content= "#"+this.state.pickup+"#"+this.state.dropoff;
        if(this.state.camp1==true){
            content+="#campHumphreys#"
        }
        else if(this.state.camp2==true){
            content+="#campCasey&Hovey#"
        }
        else if(this.state.camp3==true){
            content+="#YongsanGarrison#"
        }
        else if(this.state.camp4==true){
            content+="#campCarrol&Walker#"
        }
        else if(this.state.camp4==true){
            content+="#Osan Airbase#"
        }
        this.updateview_taxi();

        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            const { result } = await SMS.sendSMSAsync(
                ['15449080'],
                content,
                {
                
                }
              );
             
             
        } else {
            // misfortune... there's no SMS available on this device
        }
        if(firebase.auth().currentUser!=null)
        this.update_history();
      
      
    }
    update_history = ()=>{
        var code = firebase.auth().currentUser.uid
        var check_again=false;
        var time_stamp=Date.now() ;
        var old_time_stamp;
        var dd=this.state.dropoff;
        var ff =this.state.pickup;
        code = this.replaceAll(code, ".", "-");
        code = this.replaceAll(code, "#", "-");
        code = this.replaceAll(code, "$", "-");
        code = this.replaceAll(code, "[", "-");
        code = this.replaceAll(code, "]", "-");
        var postData = {
            destination: this.state.dropoff,
            from :this.state.pickup,
            time_stamp:time_stamp,
          };
        var usersRef =  firebase.database().ref('userinfo/' + code+"/taxi_history")    //   bring the database tips
        usersRef.once('value', (snapshot) => {                     //    tips database resort
    
          var m = snapshot.val()
          if(m!=null||m!=undefined){
          var keys = Object.values(m);
        

          if(keys.some(now => now.destination === this.state.dropoff &&now.from===this.state.pickup)){
              check_again=true;
              old_time_stamp=keys[Object.keys(keys).find(key => keys[key].destination === this.state.dropoff && keys[key].from === this.state.pickup)].time_stamp; 
              console.log(old_time_stamp,"old");
          }
        }
        })
        
     
         if(check_again==true){
            firebase.database().ref('userinfo/' + code+"/taxi_history/"+old_time_stamp).remove();
         }
          
       
        
        var updates = {};
    
        updates['/userinfo/' + code + '/taxi_history/' +time_stamp ] = postData;
        firebase.database().ref().update(updates);
    
      
    }
    fill_data= (des,from)=>{
        this.setState({  dropoff:des,pickup:from}) 
    }
    switch= ()=>{
        var temp=this.state.pickup;
        this.setState({  pickup:this.state.dropoff}) 
        this.setState({  dropoff:temp}) 

    }
 
    
    change_camp =(camp)=>{
        if(camp==1){
            this.setState({ camp1:true ,camp2:false,camp3:false,camp4:false,camp5:false }) 
            this.setState({  camp:"  HUMPHREYS"}) 
        }
        if(camp==2){
            this.setState({ camp1:false ,camp2:true,camp3:false,camp4:false,camp5:false }) 
            this.setState({  camp:"     CASEY"}) 
        }
        if(camp==3){
            this.setState({ camp1:false ,camp2:false,camp3:true,camp4:false,camp5:false }) 
            this.setState({  camp:"   YONGSAN"}) 
        }
        if(camp==4){
            this.setState({ camp1:false ,camp2:false,camp3:false,camp4:true,camp5:false }) 
            this.setState({  camp:"    WALKER"}) 
        } 
        if(camp==5){
            this.setState({ camp1:false ,camp2:false,camp3:false,camp4:false,camp5:true }) 
            this.setState({  camp:"       OSAN"}) 
        }
        this.setState({   dialogVisible:false}) 
        
    }
    _listEmptyComponent = () => {
        if(firebase.auth().currentUser!=null){
        return (
            <View>
               <Text 
              style={ {marginTop:8,fontFamily: 'Bayon', fontSize: 17}}
              >Your history will make it easier for you to call a cab at once.</Text>
            </View>
        )
        }else{
            return (
                <View>
                   <Text 
                  style={ {marginTop:8,fontFamily: 'Bayon', fontSize: 17}}
                  >Your history will make it easier for you to call a cab at once.SO Please login First</Text>
                </View>
            )
        }
     
    }
    renderItem = ({ item }) => {
        if(this.state.datasource!=[]){
        return (
          <TouchableOpacity
           onPress={() => this.fill_data(item.destination,item.from)}
          >
            <View style={{ flex: 1, marginLeft: 10, marginBottom: 6, borderColor: 'black' ,borderBottomWidth:1}} >
              <View style={{flexDirection:'row'}}>
              <Text 
              style={ {marginTop:8,fontFamily: 'Bayon', fontSize: 17}}
              >{item.from}</Text>
               <Text 
              style={ {fontFamily: 'Bayon', fontSize: 25 ,color:'grey'}}
              >   --  </Text>
               <Text 
              style={ {marginTop:8,fontFamily: 'Bayon', fontSize: 17 }}
              >{item.destination}</Text>
              </View>
            </View>
    
          </TouchableOpacity>
    
    
    
    
        )
    
        }
      
    
      }
  

    // start to draw whole screen

    renderScreen(){
        let dimensions=Dimensions.get("window");
        let imageheight=dimensions.height;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth =dimensions.width;
        return (
            <View>
            <Dialog
               visible={this.state.dialogVisible}
               title="CHOOSE YOUR AREA"
               onTouchOutside={() => this.setState({ dialogVisible: false })} >
               <View>
                 

                   <CheckBox
                     
                       title="CAMP HUMPHREYS"
                       checked={this.state.camp1}
                       onPress={() => this.change_camp(1)}
                   />
                       <CheckBox
                     
                       title='CAMP CASEY&HOVEY'
                       checked={this.state.camp2}
                       onPress={() => this.change_camp(2)}
                   />
                    <CheckBox
                     
                       title='YONGSAN'
                       checked={this.state.camp3}
                       onPress={() => this.change_camp(3)}
                   />
                       <CheckBox
                     
                       title='CAMP CARROLL & WALKER'
                       checked={this.state.camp4}
                       onPress={() => this.change_camp(4)}
                   />
                       <CheckBox
                      
                       title='OSAN '
                       checked={this.state.camp5}
                       onPress={() => this.change_camp(5)}
                   />
               
               </View>

           </Dialog>
         
         <Header
                   height={80}
               leftComponent={
                   <TouchableOpacity
                       onPress={() => this.props.navigation.navigate('Home')}
                   >
                       <Image source={require('../assets/back.png')}

                           style={{ width: 70, height: 80, marginLeft: -15, resizeMode: 'cover' }}
                       />
                   </TouchableOpacity>
               }
            
               backgroundColor={'#fff'}
               borderBottomColor={'#fff'}
               centerComponent={{ text: 'TAXI', style: { fontFamily: 'Bebas Neue Regular', fontSize: 40, marginLeft: 10, marginTop:17,color: '#67DBFF' } }}

           />
        
            

               <View>
              
                   <View 
                    style={{height:imageheight-80}}
                   >
                     
                   <View   style={{marginLeft:28,flexDirection:"row",borderBottomWidth:2,borderBottomColor:'#C5C5C5',marginRight:28}}>
                       <Text
                         style={{ marginTop:30,fontFamily:'Bebas Neue Regular',fontSize:24}}
                       >FROM</Text>
                           <TextInput
                               
                               onChangeText={(pickup) => this.changepickup(pickup)}
                               value={this.state.pickup}
                               placeholder=' '
                               textAlignVertical='top'
                               style={{ marginLeft:8,marginTop:30,fontFamily:'Bayon',fontSize:24,width:imagewidth}}
                           />
                 </View>
                 <TouchableOpacity
                 onPress={() => this.switch()
                   
                 }
                 style={{ width: 30, height: 30, resizeMode: 'cover' }}
                 >
                     <Image
                      
                         resizeMode={'contain'}
                         source={require('../assets/switch.png')}
                     />
                 </TouchableOpacity>
                 <View   style={{  marginTop:-30,marginLeft:28,flexDirection:"row",borderBottomWidth:2,borderBottomColor:'#C5C5C5',marginRight:28}}>
                       <Text
                         style={{ marginTop:30,fontFamily:'Bebas Neue Regular',fontSize:24}}
                       >TO</Text>
                           <TextInput
                               
                               onChangeText={(text) => this.changedropoff(text)}
                             value={this.state.dropoff}
                               placeholder=' '
                               textAlignVertical='top'
                               style={{ marginLeft:8,marginTop:30,fontFamily:'Bayon',fontSize:24,width:imagewidth}}
                           />
                 </View>
                
                        
                 <View   style={{marginTop:10,marginLeft:24,flexDirection:"row"}}>

                 <Image
                       style={{ width: 30, height: 30, resizeMode: 'cover' }}
                       resizeMode={'contain'}
                       source={require('../assets/alarm.png')}
                   />
                    <Text
                         style={{ fontFamily:'Bebas Neue Regular',fontSize:24}}
                       >HISTORY</Text>
                 </View>  
           <View
             style={{ marginLeft:10,marginRight:10,height:imageheight/2,borderWidth:2,borderColor:"grey"}}

           >  

                 <FlatList
       data={this.state.datasource}
       // (item =  tips ) here
       renderItem={this.renderItem}
       keyExtractor={item => item.number}
       ListEmptyComponent={this._listEmptyComponent}
     />

           </View>

                    
                    </View>  

                     
                 <View style={{ position: 'absolute', top: 46*imageheight/64, right: 0, }}>
               <TouchableOpacity
                onPress={() => this.sendsms()
                   
                  }
               >
                   <Image
                       style={{ width: imagewidth/2, height:67 , resizeMode: 'cover' }}
                       resizeMode={'contain'}
                       source={require('../assets/NOW.png')}
                   />
               </TouchableOpacity>
           </View>
           <View style={{ marginTop:1,position: 'absolute', top: 46*imageheight/64,  height:65,left: 0,backgroundColor:'grey' }}>
               <TouchableOpacity
             onPress={() =>  this.setState({   dialogVisible:true}) }
               >
                    
                     <Text style={{width: imagewidth/2,marginTop:10, height:67 ,fontFamily: 'Bebas Neue Regular', fontSize: 40  }} > {this.state.camp} </Text>
                   
                 
               </TouchableOpacity>
           </View>

                
               </View>

       
        
       </View>
        )
    }
    render() {
        let dimensions=Dimensions.get("window");
        let imageheight=dimensions.height;
        //let imageheight =Math.round((dimensions.width*9)/12);
        let imagewidth =dimensions.width;

   
        return (
            // flat list data= datasoucr= firebase.tips        details please look upper

            <View>
              {this.renderScreen()}
             
            </View>
        );
    }
}

const WrapTextInput = styled.View`
  border:3px solid grey;
  margin-bottom: 5px;
  padding:10px;
  display:flex;
`

const Buttons = styled.View`
  display:flex;
  flex-direction: row;
`
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 200,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});

export default TAXI;

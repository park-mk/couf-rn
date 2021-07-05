import React from 'react';
import { Button, Text, View , ART,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'




const {Surface, Shape, Path} = ART;

class YS extends React.Component {

    constructor(props) {
        super(props);
    
        this.state={

            springVal: new Animated.Value(1),
            moveAnimation : new Animated.ValueXY({ x: 10, y: 450 }),
            yvalue1:new Animated.Value(0),
          
            xvalue1:new Animated.Value(0),
          
            timeofcircle:24,
            circlelength:1584,
            time:Date(Date.now()).toString(),
            currentTime: null,
             currentDay: null ,
             timeheight: 100,
             day:true,
             explain:"weekday schedule",
             bus1s:false,
             bus2s:false,
             bus3s:false,
             bus4s:false,
             bus1:[700,730,800,830,900,930,1000,1030,1100,1130,1200,1230,1300,1330,1400,1430,1500,1530,1600,1630,1700,1730,1800,1830,1900,1930,2000],
             order:[700,730,800,830,900,930,1000,1030,1100,1130,1200,1230,1300,1330,1400,1430,1500,1530,1600,1630,1700,1730,1800,1830,1900,1930,2000],
             bus1h:[800,845,930,1015,1100,1145,1230,1315,1400,1445,1530,1615,1700,1745,1830,1915,2000],
             orderh:[800,845,930,1015,1100,1145,1230,1315,1400,1445,1530,1615,1700,1745,1830,1915,2000],
             
              nextbus:"loading....",
           
        }
        this.daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      }

   _spring=()=>{

    Animated.spring(this.state.springVal, {
        toValue: 1,

        friction:1,
      }).start(); 
     
   }

   _move=( )=>{
         
     
    Animated.timing(this.state.yvalue1,{
      
         toValue:700,
         duration:30000,   

    }
        ).start(); 


   }
   getMonthName =() =>{

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const d = new Date();
 return monthNames[d.getMonth()];
}

   _check=()=>{
     
      
       
       let hour = new Date().getHours();
       let minutes = new Date().getMinutes();
       let seconds = new Date().getSeconds();

      
        ////////// next bus 
          if(this.state.day==false){
           

       var number=hour*100+minutes;
       var next;
         for(let i =0;i<76;i++){
              if(number>this.state.orderh[i]&&number<=this.state.orderh[i+1]){

                   next=this.state.orderh[i+1]; 
                     break;
              }

              if(i==75)
              next=800;
         }      
 
         
         this.state.nextbus=next;
         let day=new Date().getDay();
         if(this.state.nextbus==800&&(day==7||day==0))
         this.state.nextbus=700;
        
            

/////////// bus1  
       
             for(let i=0;i<17;i++){
                if(number>=this.state.bus1h[i]&&number<=this.state.bus1h[i]+25){
                       
                    var h= (hour-parseInt(this.state.bus1h[i]/100));
                    var m= minutes-(this.state.bus1h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                     this.state.yvalue1=((h+m+(seconds/60))/this.state.timeofcircle)*this.state.circlelength;    
                      this.state.xvalue1=20; 
                      break;
                }
             }
        
         
            }
     
        //// holiday 
            if(this.state.day==true){
            
           
                var number=hour*100+minutes;
                var next;
                  for(let i =0;i<76;i++){
                       if(number>this.state.order[i]&&number<=this.state.order[i+1]){
         
                            next=this.state.order[i+1]; 
                              break;
                       }
         
                       if(i==75)
                       next=700;

                  }      
          
                   
                  this.state.nextbus=next;
                  let day=new Date().getDay();
                  if(this.state.nextbus==700&&day==5)
                  this.state.nextbus=800;
                     
         
         /////////// bus1  
          
                      for(let i=0;i<27;i++){
                         if(number>=this.state.bus1[i]&&number<=this.state.bus1[i]+25){
                               
                             var h= (hour-parseInt(this.state.bus1[i]/100));
                             var m= minutes-(this.state.bus1[i]%100);
                              
                             
                             var long=h*60+m+seconds/60
                              this.state.yvalue1=((h+m+(seconds/60))/this.state.timeofcircle)*this.state.circlelength;
                             
                               this.state.xvalue1=0; 
                             
                               break;
                         }
                      }
                 
                  
                     }
              
                 





   }
  
   
   componentWillUnmount()
   {
       clearInterval(this.timer);
     
   }

componentWillMount()
{
    this.getCurrentTime();

} 

componentDidMount()
{
    this.timer = setInterval(() =>
    {
        this.getCurrentTime();
        this._check();
    }, 1000);
}
getCurrentTime = () =>
{
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let day=new Date().getDay();
   
    let am_pm = 'pm';

    if( minutes < 10 )
    {
        minutes = '0' + minutes;
    }

    if( seconds < 10 )
    {
        seconds = '0' + seconds;
    }

    if( hour > 12 )
    {
       // hour = hour - 12;
    }

    if( hour == 0 )
    {
        hour = 12;
    }

    if( new Date().getHours() < 12 )
    {
        am_pm = 'am';
    }

    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' });

    this.daysArray.map(( item, key ) =>
    {
        if( key == new Date().getDay() )
        {
            this.setState({ currentDay: item.toUpperCase() });
        }
    })        
}



  onPress = () =>{ 
    
      if(this.state.day==true){
    this.setState({explain: 'holiday schedule'});
       this.state.day=false;
}
  else if(this.state.day==false){
    this.setState({explain: 'weekday schedule'});
       this.state.day=true;
     }
  }

  render() {
    let dimensions = Dimensions.get("window");
    let imageheight = dimensions.height/2;
    let imagewidth = dimensions.width/3;
    let { fadeAnim } = this.state;
       

    const path = new Path()
    .moveTo(50,1)
    .arc(0,30,8)
    .arc(0,-30,8)
    .close(); 

    const path2 = new Path()
    .moveTo(45,1)
    .lineTo(55,1)
    .lineTo(55,300)
    .lineTo(45,300)
    .close();
    
    return ( 
        <View>
        <Header
leftComponent={  
 <TouchableOpacity 
 onPress={()=> this.props.navigation.navigate('BUS')}
 >
 <Image source={require('../assets/back.png')}
             
style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  />
</TouchableOpacity>
} 
backgroundColor={'#fff'}
borderBottomColor={'#fff'}
centerComponent={{ text: 'BUS', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,color:'#56B8FF' } }}

 />

  <ScrollView >
  
  <View   style={{  flex:10}}>
      

  <View   style={{  marginLeft:imagewidth,flexDirection:"row"}}>

  <Text  style={{fontSize:30,fontFamily:'title-font',textAlign:'center'}}>{this.state.currentDay.toString()}</Text>
          
  <Text  style={{fontSize:30,fontFamily:'title-font',textAlign:'center'}}>,</Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'title-font'}}>{this.getMonthName()}</Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'title-font'}}> </Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'title-font'}}>{new Date().getDay() }</Text>

 
  

         </View>
         <Text  style={{marginTop:20,fontSize:30,textAlign:'center',fontFamily:'title-font',color:"#d11f1f"}}>YONGSAN BUS ROUTE</Text>
  


   
         <TouchableOpacity
       
           onPress={this.onPress}
         >
         <Text  style={{marginTop:20,fontSize:20,textAlign:'center',fontFamily:'content-font',color:"grey"}}>{this.state.explain}</Text>
         </TouchableOpacity>
        
         <Text  style={{fontSize:10,textAlign:'center',fontFamily:'content-font'}}>click to change schedule</Text>
         <Text  style={{marginTop:10,fontSize:10,textAlign:'center',fontFamily:'content-font'}}>location  of the bus is based on timetable, minor differences plausible</Text>

      
             <View style={{ flex: 8 }} > 
            

             
                <View   style={{  flexDirection:'row'}}>
                 <Image  
              source={require('../assets/bus_v.png')}
              style={styles.animation}           
             />   
                  <Text style={{fontSize:20}}>next bus departing : </Text>
                  <Text style={{fontSize:20,color:'blue'}}>{this.state.nextbus} </Text>
             </View >
             <View   style={{  flexDirection:'row'}}>
                       <Animated.Image  
              source={require('../assets/bus_v.png')}
              style={[styles.animation ,{transform:[{scale:this.state.springVal}],},{top: this.state.yvalue1},{left: this.state.xvalue1}]}           
             >  
             </Animated.Image>
            
             </View>
            
             <View   style={{  height:32, flexDirection:'row',marginTop :-40}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Bus Terminal</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
               
               
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Gate1</Text>
               </View> 
                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Honor's Cafe</Text>
               </View> 
                <Surface width={100} height={300}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >SAHS</Text>
               </View> 
                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Elementary School</Text>
               </View> 
                <Surface width={100} height={15}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Elementary School 2</Text>
               </View> 
                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} > 121 hospital</Text>
               </View> 
                <Surface width={100} height={80}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Collier FH</Text>
               </View> 
                <Surface width={100} height={10}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Gate13</Text>
               </View> 
                <Surface width={100} height={230}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Commiskey's </Text>
               </View> 
                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Commissary</Text>
               </View > 
                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Commissary 2</Text>
               </View> 
                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Theater</Text>
               </View> 
                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >CYS</Text>
               </View> 
                <Surface width={100} height={150}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Bus Teminal</Text>
               </View> 
              
               
              



                
            </View>
            <View style={{ flex: 6}}>

            </View>
               <Text style={{marginLeft:30,fontSize:20}}>It's not an official app, and the location of bus is  based on departure time but not GPS so it's not 100% accurate but worth to reference </Text>
            </View>

      
     </ScrollView>
     </View>

    );
  }
}
export default YS;

const styles = StyleSheet.create({
     animation:{
        width:40,
        height:40,
        backgroundColor:'red',
        marginLeft:30,

     }, button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      },
  });
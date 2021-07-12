import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'



const Square = () => {
   return <View style={styles.square} />;
 };
 

class HOVEY extends React.Component {

    constructor(props) {
        super(props);    
        this.state={
            timeofcircle:32,   
            
              // 32+34 =66  일분을 길이 120으로 치환 한다 
              // 한바퀴 돌때 걸리는 시간 17.25
            circlelength:3840,//  한바퀴 다돌려면35 분 걸림 35분 * 120 길이 즉 총길이는 2070임 
            //  한바퀴 총길이 
            springVal: new Animated.Value(1),
            moveAnimation : new Animated.ValueXY({ x: 10, y: 450 }),



            yvalue1:new Animated.Value(0),
            yvalue2:new Animated.Value(0),
            yvalue3:new Animated.Value(0),
            yvalue4:new Animated.Value(0),
            yvalue5:new Animated.Value(0),
          
            xvalue1:new Animated.Value(0),
            xvalue2:new Animated.Value(0),
            xvalue3:new Animated.Value(0),
            xvalue4:new Animated.Value(0),
            xvalue5:new Animated.Value(0),
          
            
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
             bus1:[ 5 , 510, 745, 825, 905, 945, 1025, 1105, 1145, 1225, 1305, 1345, 1425, 1515, 1555, 1635, 1715, 1755, 1835, 1915, 1955, 2050, 2150, 2250, 2350],//25
             bus2:[ 20, 520, 755, 835, 915, 955, 1035, 1115, 1155, 1235, 1315, 1355, 1445, 1525, 1605, 1645, 1725, 1805, 1845, 1925, 2005, 2105, 2205, 2305],//24
             bus3:[ 35, 725, 805, 845, 925, 1005, 1045, 1125, 1205, 1245, 1325, 1405, 1455, 1535, 1615, 1655, 1735, 1815, 1855, 1935, 2020, 2120, 2220, 2320],//24
             bus4:[500, 735, 815, 855, 935, 1015, 1055, 1135, 1215, 1255, 1335, 1415, 1505, 1545, 1625, 1705, 1745, 1825, 1905, 1945, 2035, 2135, 2235, 2335],//24
             order:[5,20,35,500,510,520,725,735,745,755,805,815,825,835,845,855,905,915,925,935,945,955,1005,1015,1025,1035,1045,1055,1105,1115,1125,1135,1145,1155,1205,1215,1225,1235,1245,1255,1305,1315,1325,1335,1345,1355,1405,1415,1425,1445,1455,1505,1515,1525,1535,1545,1555,1605,1615,1625,1635,1645,1655,1705,1715,1725,1735,1745,1755,1805,1815,1825,1835,1845,1855,1905,1915,1925,1935,1945,1955,2005,2020,2035,2050,2105,2120,2135,2150,2205,2220,2235,2250,2305,2320,2335,2350],//97

             bus1h:[  5, 720, 820, 935, 1035, 1135, 1235, 1335, 1420, 1520, 1620, 1720, 1820, 1920, 2020, 2120, 2220, 2320],//18
             bus2h:[ 20, 735, 835, 950, 1050, 1150, 1250, 1350, 1435, 1535, 1635, 1735, 1835, 1935, 2035, 2135, 2235, 2235],//18
             bus3h:[ 35, 750, 850, 1005, 1105, 1205, 1305, 1350, 1450, 1550, 1650, 1750, 1850, 1950, 2050, 2150, 2250, 2350],//18
             bus4h:[705, 805, 905, 1020, 1120, 1220, 1320, 1405, 1505, 1605, 1705, 1805, 1905, 2005, 2105, 2205, 2305],//17
          
             orderh:[5,20,35,705,720,735,750,805,820,835,850,905,935,950,1005,1020,1035,1050,1105,1120,1135,1150,1205,1220,1235,1250,1305,1320,1335,1350,1350,1405,1420,1435,1450,1505,1520,1535,1550,1605,1620,1635,1650,1705,1720,1735,1750,1805,1820,1835,1850,1905,1920,1935,1950,2005,2020,2035,2050,2105,2120,2135,2150,2205,2220,2235,2250,2305,2320,2235,2350],//71


            
             
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

   _check=()=>{
     
     
       let hour = new Date().getHours();
       let minutes = new Date().getMinutes();
       let seconds = new Date().getSeconds();

      
        ////////// next bus  weekend
          if(this.state.day==false){
           
       var number=hour*100+minutes; // 왜냐면 시간을 6시반 이면 630 이렇게 표현 하니까  number 사실상 시간의 백단위 표기법 
       var next;
         for(let i =0;i<71;i++){
              if(number>this.state.orderh[i]&&number<=this.state.orderh[i+1]){

                   next=this.state.orderh[i+1]; 
                   console.log("next busss faix",next)
                     break;
              }

              if(i==71)
              next="00:00";
         }      
         
         console.log("next bus ",next)
         this.state.nextbus=next; // 다음날 출발 날짜 
         let day=new Date().getDay();
         if(this.state.nextbus=="00:30"&&(day==7||day==0))// 만약 주말의 마지막 날이라면 다음 첫날의 출발 날짜 
         this.state.nextbus="00:15";
        
            

/////////// bus1  
       
             for(let i=0;i<18;i++){
               var compare=this.state.bus1h[i]+this.state.timeofcircle;
               if(((this.state.bus1h[i]+this.state.timeofcircle)/100)%1>0.6){
                     compare=compare+40;
               }
                if(number>=this.state.bus1h[i]&&number<=compare){
                       
                    var h= (hour-parseInt(this.state.bus1h[i]/100));
                    var m= minutes-(this.state.bus1h[i]%100);
                     
                    
                     var long=h*60+m+seconds/60
                     this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                     this.state.xvalue1=0; 
                    
                      break;
                }
                else this.state.yvalue1=-300;
             }

             for(let i=0;i<18;i++){
               var compare=this.state.bus2h[i]+this.state.timeofcircle;
               if(((this.state.bus2h[i]+this.state.timeofcircle)/100)%1>0.6){
                     compare=compare+40;
               }
                if(number>=this.state.bus2h[i]&&number<=compare){
                       
                    var h= (hour-parseInt(this.state.bus2h[i]/100));
                    var m= minutes-(this.state.bus2h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                    this.state.xvalue2=-50; 
                    
                      break;
                }
                else this.state.yvalue2=-300;
             }


             for(let i=0;i<18;i++){
               var compare=this.state.bus3h[i]+this.state.timeofcircle;
               if(((this.state.bus3h[i]+this.state.timeofcircle)/100)%1>0.6){
                     compare=compare+40;
               }
                if(number>=this.state.bus3h[i]&&number<=compare){
                       
                    var h= (hour-parseInt(this.state.bus3h[i]/100));
                    var m= minutes-(this.state.bus3h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue3=0; 
                    
                      break;
                }
                else this.state.yvalue3=-300;
             }



             
             for(let i=0;i<17;i++){
               var compare=this.state.bus4h[i]+this.state.timeofcircle;
               if(((this.state.bus4h[i]+this.state.timeofcircle)/100)%1>0.6){
                     compare=compare+40;
               }
                if(number>=this.state.bus4h[i]&&number<=compare){
                       
                    var h= (hour-parseInt(this.state.bus3h[i]/100));
                    var m= minutes-(this.state.bus3h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                     this.state.xvalue3=0; 
                    
                      break;
                }
                else this.state.yvalue4=-300;
             }




           
             this.state.yvalue5=-200;
          

         
            }
     
        
            if(this.state.day==true){
           

                var number=hour*100+minutes;
                var next;
                  for(let i =0;i<97;i++){
                       if(number>this.state.order[i]&&number<=this.state.order[i+1]){
         
                            next=this.state.order[i+1]; 
                            console.log("next busss fix",next)
                              break;
                       }
         
                       if(i==96)
                       next="00:05";
                  }      
          
                
                  this.state.nextbus=next;
                  let day=new Date().getDay();
                  if(this.state.nextbus=="00:05"&&day==5)
                  this.state.nextbus="00:05";
                     
         
         /////////// bus1  
                
                      for(let i=0;i<25;i++){
                        var compare=this.state.bus1[i]+this.state.timeofcircle;
                        if(((this.state.bus1[i]+this.state.timeofcircle)/100)%1>0.6){
                              compare=compare+40;
                        }
                          
                         if(number>=this.state.bus1[i]&&number<=compare){
                                 
                             var h= (hour-parseInt(this.state.bus1[i]/100));
                             var m= minutes-(this.state.bus1[i]%100);
                              
                             
                             var long=h*60+m+seconds/60
                              this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                               this.state.xvalue1=0; 
                             
                               break;
                         }
                         else this.state.yvalue1=-300;
                      }


                      for(let i=0;i<24;i++){
                        var compare=this.state.bus2[i]+this.state.timeofcircle;
                        if(((this.state.bus2[i]+this.state.timeofcircle)/100)%1>0.6){
                              compare=compare+40;
                        }
                        if(number>=this.state.bus2[i]&&number<=compare){
                               
                            var h= (hour-parseInt(this.state.bus2[i]/100));
                            var m= minutes-(this.state.bus2[i]%100);
                             
                            
                             var long=h*60+m+seconds/60
                              this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              this.state.xvalue2=0; 
                            
                              break;
                        }
                        else this.state.yvalue2=-300;
                     }



                     for(let i=0;i<24;i++){
                        var compare=this.state.bus3[i]+this.state.timeofcircle;
                        if(((this.state.bus3[i]+this.state.timeofcircle)/100)%1>0.6){
                              compare=compare+40;
                        }
                        console.log(this.state.bus3[i],number,compare)
                        if(number>=this.state.bus3[i]&&number<=compare){
                               
                            var h= (hour-parseInt(this.state.bus3[i]/100));
                            var m= minutes-(this.state.bus3[i]%100);
                             
                            
                              var long=h*60+m+seconds/60
                              this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              this.state.xvalue3=0; 
                              console.log(long/this.state.timeofcircle);
                              console.log(long);
                              break;
                        }
                        else this.state.yvalue3=-300;
                     }



                     for(let i=0;i<24;i++){
                        var compare=this.state.bus4[i]+this.state.timeofcircle;
                        if(((this.state.bus4[i]+this.state.timeofcircle)/100)%1>0.6){
                              compare=compare+40;

                        }
                      
                        if(number>=this.state.bus4[i]&&number<=compare){
                               
                            var h= (hour-parseInt(this.state.bus4[i]/100));
                            var m= minutes-(this.state.bus4[i]%100);
                             
                           
                            var long=h*60+m+seconds/60
                             this.state.yvalue4=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                              this.state.xvalue4=0; 
                            
                              break;
                        }
                        else this.state.yvalue4=-300;
                     }



                     
                       this.state.yvalue5=-300;
                     
                 
                  
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
getMonthName =() =>{

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const d = new Date();
 return monthNames[d.getMonth()];
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
       

    
    return ( 
        <View>
     
     <Header
leftComponent={  
 <TouchableOpacity 
 onPress={()=> this.props.navigation.navigate('Home')}
 >
 <Image source={require('../assets/back.png')}
             
style={{width:70,height:80,marginLeft:-15,resizeMode:'cover'}}
  />
</TouchableOpacity>
} 
backgroundColor={'#fff'}
borderBottomColor={'#fff'}
height={80}
centerComponent={{ text: 'BUS', style: {fontFamily:'Bebas Neue Regular' ,fontSize:40,marginLeft:10,marginTop:17,color:'#67DBFF' } }}

 >
     
    </Header>
  <ScrollView 
  
    style={{backgroundColor:'#ffffff'}}
  >
  
  <View   style={{  flex:10}}>
      

  <View   style={{  marginLeft:imagewidth,flexDirection:"row"}}>

  <Text  style={{fontSize:30,fontFamily:'Bebas Neue Regular',textAlign:'center'}}>{this.state.currentDay.toString()}</Text>
          
  <Text  style={{fontSize:30,fontFamily:'Bebas Neue Regular',textAlign:'center'}}>,</Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'Bebas Neue Regular'}}>{this.getMonthName()}</Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'Bebas Neue Regular'}}> </Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'Bebas Neue Regular'}}>{new Date().getDay() }</Text>

 
  

         </View>
         <Text  style={{marginTop:20,fontSize:30,textAlign:'center',fontFamily:'Bebas Neue Regular',color:"#d11f1f"}}>HOVEY BUS ROUTE</Text>
  


   
         <TouchableOpacity
       
           onPress={this.onPress}
         >
         <Text  style={{marginTop:20,fontSize:20,textAlign:'center',fontFamily:'Bayon',color:"grey"}}>{this.state.explain}</Text>
         </TouchableOpacity>
        
         <Text  style={{fontSize:10,textAlign:'center',fontFamily:'Bayon'}}>click to change schedule</Text>
         <Text  style={{marginTop:10,fontSize:10,textAlign:'center',fontFamily:'Bayon'}}>location  of the bus is based on timetable, minor differences plausible</Text>

      
            
         
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
             <Animated.Image  
              source={require('../assets/bus_v.png')}
              style={[styles.animation ,{transform:[{scale:this.state.springVal}],},{top: this.state.yvalue2},{left: -70}]}           
             >  
             </Animated.Image>
             <Animated.Image  
              source={require('../assets/bus_v.png')}
              style={[styles.animation ,{transform:[{scale:this.state.springVal}],},{top: this.state.yvalue3},{left: -140}]}//140          
             >  
             </Animated.Image>
             <Animated.Image  
              source={require('../assets/bus_v.png')}
              style={[styles.animation ,{transform:[{scale:this.state.springVal}],},{top: this.state.yvalue4},{left: -210}]}  //210         
             >  
             </Animated.Image>
             <Animated.Image  
              source={require('../assets/bus_v.png')}
              style={[styles.animation ,{transform:[{scale:this.state.springVal}],},{top: this.state.yvalue5},{left: -280}]}   //280        
             >  
             </Animated.Image>
            


           



            
             </View>
               
             <View   style={{  height:32, flexDirection:'row',marginTop :-40}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'red',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                <Square/>
                </View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Terminal</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={50-32}>
                
                </View>
 




             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >PX</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={120-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >MAIN DFAC</Text>
            </View> 

                  <View style={{alignItems:'center'}} width={100} height={90}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>  
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >CAC</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={130-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Buger King</Text>
             </View>  

                  <View style={{alignItems:'center'}} width={100} height={58}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Play Ground</Text>
            </View> 

                  <View style={{alignItems:'center'}} width={100} height={28}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>  
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Casey Theater</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={120-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Carey Gym</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={122-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >CASEY CTAS</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={188-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >TSAK range</Text>
             </View> 
                  <View style={{alignItems:'center'}} width={100} height={144-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={35}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >HOVEY Gym</Text>
             </View > 

                  <View style={{alignItems:'center'}} width={100} height={120-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >HOVEY Chapel</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={130-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Barber Shop</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={40-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={16}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Library </Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={40-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >HOVEY KSB</Text>
               </View> 
              
                   <View style={{alignItems:'center'}} width={100} height={182-32}>
                   
                 </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={40}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} > HOVEY CTAS</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={288-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={16}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >HOVEY DFAC</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={110-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={16}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Library</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={62-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Barber Shop</Text>
             </View> 

              
             
             
             <View style={{alignItems:'center'}} width={100} height={102-32}>
                   
                   </View>   
                <View   style={{  height:32, flexDirection:'row'}}>
                     <View style={{alignItems:'center'}} width={100} height={32}>
                       <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                   </View>
                   <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >HOVEY Chapel</Text>
                </View> 
   



                <View style={{alignItems:'center'}} width={100} height={102-32}>
                   
                   </View>   
                <View   style={{  height:32, flexDirection:'row'}}>
                     <View style={{alignItems:'center'}} width={100} height={32}>
                       <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                   </View>
                   <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >HOVEY Gym</Text>
                </View> 
   



                <View style={{alignItems:'center'}} width={100} height={146-32}>
                   
                   </View>   
                <View   style={{  height:32, flexDirection:'row'}}>
                     <View style={{alignItems:'center'}} width={100} height={32}>
                       <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                   </View>
                   <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >TSAK Range</Text>
                </View> 
   


                <View style={{alignItems:'center'}} width={100} height={190-32}>
                   
                   </View>   
                <View   style={{  height:32, flexDirection:'row'}}>
                     <View style={{alignItems:'center'}} width={100} height={32}>
                       <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                   </View>
                   <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Casey CTAS</Text>
                </View> 
   

                <View style={{alignItems:'center'}} width={100} height={102-32}>
                   
                   </View>   
                <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Carey Gym</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={90-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Casey Theater</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={50-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={16}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Play Ground</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={60-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Buger King</Text>
               </View> 
              
                   <View style={{alignItems:'center'}} width={100} height={130-22}>
                   
                 </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={40}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} > CAC</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={120-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={16}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >MAIN DFAC</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={120-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={16}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >PX</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={28}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Terminal</Text>
             </View> 

              
             
             




              

            </View> 
            <View style={{ flex: 6}}>

            </View>
               <Text style={{marginLeft:30,fontSize:20}}>It's not an official app, and the location of bus is  based on departure time but not GPS so it's not 100% accurate but worth to reference </Text>
            </View>
            <View
               height={150}
            >

            </View>
      
     </ScrollView>
     </View>

    );
  }
}
export default HOVEY;

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
      square: {
         width: 2,
         height: 3500,
         backgroundColor: "red",
       },
  });

  //the bug 수정하지 못한 버그 , 시간 계산을 시간이 안넘어갈때는 118 이고 넘어갈때는 158 근데 그냥 큰 숫자 158 로 채택함 문제 생기면 우선적으로 해결 바람 
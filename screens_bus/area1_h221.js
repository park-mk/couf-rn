import React from 'react';
import { Button, Text, View , ART,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'



const {Surface, Shape, Path} = ART;

class H221 extends React.Component {

    constructor(props) {
        super(props);    
        this.state={
            timeofcircle:17.25,   
            
            // 32+34 =66  일분을 길이 66으로 치환 한다 
            // 한바퀴 돌때 걸리는 시간 17.25
            circlelength:2070,//  한바퀴 다돌려면 17.25 분 걸림 17.25분 * 120 길이 즉 총길이는 2070임 
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
             bus1:[500,530,730,800,900,1000,1100,1145,1225,1315,1415,1515,1615,1705,1745,1830,1900,1930],
             bus2:[515,745,815,915,1015,1115,1155,1235,1330,1430,1530,1630,1715,1755,1845,1915,1945],
             bus3:[830,930,1030,1124,1205,1245,1345,1445,1545,1645,1725,1805,2000,2030,2100,2130,2200,2230,2300,2330],
             bus4:[15,845,945,1045,1135,1215,1300,1400,1500,1600,1655,,1735,1815,2015,2045,2115,2145,2215,2245,2315,2345],
             order:[15,500,515,530,730,745,800,815,830,845,900,915,930,945,1000,1015,1030,1045,1100,1115,1124,1135,1145,1155,1205,1215,1225,1235,1245,1300,1315,1330,1345,1400,1415,1430,1445,1500,1515,1530,1545,1600,1615,1630,1645,1655,1705,1715,1725,1735,1745,1755,1805,1815,1830,1845,1900,1915,1930,1945,2000,2015,2030,2045,2100,2115,2130,2145,2200,2215,2230,2245,2300,2315,2330,2345,],

             bus1h:[700,730,800,830,900,100,1100,1200,1300,1400,1500,1600,1715,1815,1845,1915,1945],
             bus2h:[715,745,815,845,915,1015,1115,1215,1315,1415,1515,1615,1700,1730,1800,1830,1900,1930],
             bus3h:[15,930,1030,11301230,1330,1430,1530,1630,1745,1915,2015,2115,2145,2215,2245,2315,2345],
             bus4h:[30,945,1045,1145,1245,1345,1445,1545,1645,2000,2030,2100,2130,2200,2230,2300,2330],
             orderh:[15,30,100,700,715,730,745,800,815,830,845,900,915,930,945,1015,1030,1045,1100,1115,1145,1200,1215,1245,1300,1315,1330,1345,1400,1415,1430,1445,1500,1515,1530,1545,1600,1615,1630,1645,1700,1715,1730,1745,1800,1815,1830,1845,1900,1915,1915,1930,1945,2000,2015,2030,2100,2115,2130,2145,2200,2215,2230,2245,2300,2315,2330,2345],


            
             
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
         for(let i =0;i<35;i++){
              if(number>this.state.orderh[i]&&number<=this.state.orderh[i+1]){

                   next=this.state.orderh[i+1]; 
                     break;
              }

              if(i==81)
              next="00:30";
         }      
 
         
         this.state.nextbus=next; // 다음날 출발 날짜 
         let day=new Date().getDay();
         if(this.state.nextbus=="00:30"&&(day==7||day==0))// 만약 주말의 마지막 날이라면 다음 첫날의 출발 날짜 
         this.state.nextbus="00:15";
        
            

/////////// bus1  
       
             for(let i=0;i<12;i++){
                if(number>=this.state.bus1h[i]&&number<=this.state.bus1h[i]+15){
                       
                    var h= (hour-parseInt(this.state.bus1h[i]/100));
                    var m= minutes-(this.state.bus1h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue1=0; 
                    
                      break;
                }
                else this.state.yvalue1=-300;
             }

             for(let i=0;i<12;i++){
                if(number>=this.state.bus2h[i]&&number<=this.state.bus2h[i]+15){
                       
                    var h= (hour-parseInt(this.state.bus2h[i]/100));
                    var m= minutes-(this.state.bus2h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue2=-50; 
                    
                      break;
                }
                else this.state.yvalue2=-300;
             }


             for(let i=0;i<12;i++){
                if(number>=this.state.bus3h[i]&&number<=this.state.bus3h[i]+15){
                       
                    var h= (hour-parseInt(this.state.bus3h[i]/100));
                    var m= minutes-(this.state.bus3h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue3=0; 
                    
                      break;
                }
                else this.state.yvalue3=-300;
             }



             
             for(let i=0;i<12;i++){
                if(number>=this.state.bus4h[i]&&number<=this.state.bus4h[i]+15){
                       
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
                  for(let i =0;i<78;i++){
                       if(number>this.state.order[i]&&number<=this.state.order[i+1]){
         
                            next=this.state.order[i+1]; 
                              break;
                       }
         
                       if(i==77)
                       next="00:15";
                  }      
          
                  
                  this.state.nextbus=next;
                  let day=new Date().getDay();
                  if(this.state.nextbus=="00:15"&&day==5)
                  this.state.nextbus="00:30";
                     
         
         /////////// bus1  
                
                      for(let i=0;i<18;i++){
                          
                         if(number>=this.state.bus1[i]&&number<=this.state.bus1[i]+15){
                                 
                             var h= (hour-parseInt(this.state.bus1[i]/100));
                             var m= minutes-(this.state.bus1[i]%100);
                              
                             
                             var long=h*60+m+seconds/60
                              this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                               this.state.xvalue1=0; 
                             
                               break;
                         }
                         else this.state.yvalue1=-300;
                      }


                      for(let i=0;i<18;i++){
                        if(number>=this.state.bus2[i]&&number<=this.state.bus2[i]+15){
                               
                            var h= (hour-parseInt(this.state.bus2[i]/100));
                            var m= minutes-(this.state.bus2[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              this.state.xvalue2=0; 
                            
                              break;
                        }
                        else this.state.yvalue2=-300;
                     }



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus3[i]&&number<=this.state.bus3[i]+15){
                               
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



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus4[i]&&number<=this.state.bus4[i]+15){
                               
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
         <Text  style={{marginTop:20,fontSize:30,textAlign:'center',fontFamily:'title-font',color:"#d11f1f"}}>H221 BUS ROUTE</Text>
  


   
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
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Terminal</Text>
             </View> 

                <Surface width={100} height={28}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >PX</Text>
             </View> 

                <Surface width={100} height={120-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >MAIN DFAC</Text>
            </View> 

                <Surface width={100} height={120-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>  
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >CAC</Text>
             </View> 

                <Surface width={100} height={130-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Buger King</Text>
             </View>  

                <Surface width={100} height={38}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Play Ground</Text>
            </View> 

                <Surface width={100} height={28}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>  
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Casey Theater</Text>
             </View> 

                <Surface width={100} height={90-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Carey Gym</Text>
             </View> 

                <Surface width={100} height={150-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >6/37 FA</Text>
             </View> 

                <Surface width={100} height={160-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Barracks </Text>
             </View> 
                <Surface width={100} height={120-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Thunder DFAC</Text>
             </View > 

                <Surface width={100} height={160-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Carey Gym</Text>
             </View> 

                <Surface width={100} height={90-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Casey Theater</Text>
             </View> 

               <Surface width={100} height={50-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Play Ground</Text>
             </View> 

                <Surface width={100} height={60-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Buger King</Text>
               </View> 
              
                 <Surface width={100} height={130-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                 </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} > CAC</Text>
             </View> 

               <Surface width={100} height={120-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >MAIN DFAC</Text>
             </View> 

               <Surface width={100} height={120-22}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >PX</Text>
             </View> 

               <Surface width={100} height={28}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Terminal</Text>
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
export default H221;

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

  //the bug 수정하지 못한 버그 , 시간 계산을 시간이 안넘어갈때는 118 이고 넘어갈때는 158 근데 그냥 큰 숫자 158 로 채택함 문제 생기면 우선적으로 해결 바람 
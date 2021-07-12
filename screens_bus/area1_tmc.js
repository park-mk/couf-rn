import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'



const Square = () => {
   return <View style={styles.square} />;
 };
 

class TMC extends React.Component {

    constructor(props) {
        super(props);    
        this.state={
            timeofcircle:17,   
            
            // 일분을 길이 120 으로 치환 한다 
            // 한바퀴 돌때 걸리는 시간 16
            circlelength:2040,//  한바퀴 다돌려면 17 분 걸림 16분 * 120 길이 즉 총길이는 2070임 
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
             bus1:[ 10, 515, 740, 840, 940, 1040, 1135, 1215, 1255, 1355, 1455, 1555, 1655, 1735, 1815, 1910, 2010, 2110, 2210, 2310],//20
             bus2:[ 25, 530, 755, 855, 955, 1055, 1145, 1225, 1310, 1410, 1510, 1610, 1705, 1745, 1825, 1925, 2025, 2125, 2225, 2325],//20
             bus3:[ 40, 710, 810, 910,1010, 1110, 1155, 1235, 1325, 1425, 1525, 1625, 1715, 1755, 1840, 1940, 2040, 2140, 2240, 2340],//20
             bus4:[ 500,725, 825, 925,1025, 1125, 1205, 1245, 1340, 1440, 1540, 1640, 1725, 1805, 1855, 1955, 2055, 2155, 2255, 2355],//20
             order:[10,25,40,500,515,530,710,725,740,755,810,825,840,855,910,925,940,955,1010,1025,1040,1055,1110,1125,1135,1145,1155,1205,1215,1225,1235,1245,1255,1310,1325,1340,1355,1410,1425,1440,1455,1510,1525,1540,1555,1610,1625,1640,1655,1705,1715,1725,1735,1745,1755,1805,1815,1825,1840,1855,1910,1925,1940,1955,2010,2025,2040,2055,2110,2125,2140,2155,2210,2225,2240,2255,2310,2325,2340,2355],//80

             bus1h:[10 , 725, 825, 925, 1025, 1125, 1225, 1325, 1425, 1525, 1625, 1725, 1825, 1925, 2025, 2125, 2225, 2325],//18
             bus2h:[ 25, 740, 840, 940, 1040, 1140, 1240, 1340, 1440, 1540, 1640, 1740, 1840, 1940, 2040, 2140, 2240, 2340],//18
             bus3h:[ 40, 755, 855, 955, 1055, 1155, 1255, 1355, 1455, 1555, 1655, 1755, 1855, 1955, 2055, 2155, 2255, 2355],//18
             bus4h:[710, 810, 910, 1010,1110, 1210, 1310, 1410, 1510, 1610, 1710, 1810, 1910, 2010, 2110, 2210, 2310],//17
             orderh:[10,25,40,710,725,740,755,810,825,840,855,910,925,940,955,1010,1025,1040,1055,1110,1125,1140,1155,1210,1225,1240,1255,1310,1325,1340,1355,1410,1425,1440,1455,1510,1525,1540,1555,1610,1625,1640,1655,1710,1725,1740,1755,1810,1825,1840,1855,1910,1925,1940,1955,2010,2025,2040,2055,2110,2125,2140,2155,2210,2225,2240,2255,2310,2325,2340,2355],//71

                
            
             
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
                
                      for(let i=0;i<20;i++){
                          var compare=this.state.bus1[i]+this.state.timeofcircle;
                        if(((this.state.bus1[i]+this.state.timeofcircle)/100)%1>0.6){
                              compare=compare+40;
                        }
                         if(number>=this.state.bus1[i]&&number<=compare){
                                 console.log("found!!")
                             var h= (hour-parseInt(this.state.bus1[i]/100));
                             var m= minutes-(this.state.bus1[i]%100);
                              
                             
                             var long=h*60+m+seconds/60
                              this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                               this.state.xvalue1=0; 
                                console.log("bus1 working");
                               break;
                         }
                         else this.state.yvalue1=-300;
                      }


                      for(let i=0;i<20;i++){
                        var compare=this.state.bus2[i]+this.state.timeofcircle;
                        if(((this.state.bus2[i]+this.state.timeofcircle)/100)%1>0.6){
                              compare=compare+40;
                        }
                        if(number>=this.state.bus2[i]&&number<=compare){
                               
                            var h= (hour-parseInt(this.state.bus2[i]/100));
                            var m= minutes-(this.state.bus2[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                            this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            this.state.xvalue2=50; 
                            console.log("bus2 working");
                              break;
                        }
                        else this.state.yvalue2=-300;
                     }



                     for(let i=0;i<20;i++){
                        var compare=this.state.bus3[i]+this.state.timeofcircle;
                        if(((this.state.bus3[i]+this.state.timeofcircle)/100)%1>0.6){
                              compare=compare+40;
                        }
                        if(number>=this.state.bus3[i]&&number<=compare){
                               
                            var h= (hour-parseInt(this.state.bus3[i]/100));
                            var m= minutes-(this.state.bus3[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              this.state.xvalue3=0; 
                              console.log(long/this.state.timeofcircle);
                              console.log(long);
                              console.log("bus3 working");
                              break;
                        }
                        else this.state.yvalue3=-300;
                     }



                     for(let i=0;i<20;i++){
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
                              console.log("bus working");
                            
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
    }, 955);
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
         <Text  style={{marginTop:20,fontSize:30,textAlign:'center',fontFamily:'Bebas Neue Regular',color:"#d11f1f"}}>TMC BUS ROUTE</Text>
  


   
         <TouchableOpacity
       
           onPress={this.onPress}
         >
         <Text  style={{marginTop:20,fontSize:20,textAlign:'center',fontFamily:'Bayon',color:"grey"}}>{this.state.explain}</Text>
         </TouchableOpacity>
        
         <Text  style={{fontSize:10,textAlign:'center',fontFamily:'Bayon'}}>click to change schedule</Text>
         <Text  style={{marginTop:10,fontSize:10,textAlign:'center',fontFamily:'Bayon'}}>Bus time is irregular, so please prepare it in advance.</Text>

      
            
         
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
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Terminal   </Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={28}>
                
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

                  <View style={{alignItems:'center'}} width={100} height={300-22}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={46}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >DRAGON VALLEY</Text>
             </View>  

                  <View style={{alignItems:'center'}} width={100} height={201-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >302 BSB</Text>
            </View> 

                  <View style={{alignItems:'center'}} width={100} height={40}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>  
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Golf Course</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={72-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Gate 2</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={65-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Golf Course</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={60-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Argonne DFAC</Text>
             </View> 
                  <View style={{alignItems:'center'}} width={100} height={40-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={35}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >TMC</Text>
             </View > 

                  <View style={{alignItems:'center'}} width={100} height={60-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={30}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Argonne DFAC</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={120-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={26}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >302 BSB</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={192-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={36}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Dragon Valley</Text>
             </View> 

                  <View style={{alignItems:'center'}} width={100} height={240-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={40}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} > CAC</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={100-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={16}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >MAIN DFAC</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={94-32}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                  <View style={{alignItems:'center'}} width={100} height={32}>
                    <View width={16} height={16}   style ={{borderColor:'red',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >PX</Text>
             </View> 

                 <View style={{alignItems:'center'}} width={100} height={60-32}>
                   
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
export default TMC;

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
         height: 2000,
         backgroundColor: "red",
       },
  });

  //the bug 수정하지 못한 버그 , 시간 계산을 시간이 안넘어갈때는 118 이고 넘어갈때는 158 근데 그냥 큰 숫자 158 로 채택함 문제 생기면 우선적으로 해결 바람 
import React from 'react';
import { Button, Text, View , ART,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'


const {Surface, Shape, Path} = ART;

class BLUE extends React.Component {

    constructor(props) {
        super(props);    
        this.state={
            timeofcircle:71,   // 32+34 =66  일분을 길이 66으로 치환 한다 
            // 한바퀴 돌때 걸리는 시간  78
            circlelength:4686,//  한바퀴 다돌려면 78 분 걸림 78 분 * 66 길이 즉 총길이는 5148임 
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
             bus1:[25,540,655,810,925,1040,1155,1310,1425,1540,1655,1810,1925,2040,2155,2310],
             bus2:[40,555,710,825,940,1055,1210,1325,1440,1555,1710,1825,1940,2055,2210,2325],
             bus3:[10,610,725,840,955,1110,1225,1340,1455,1610,1725,1840,1955,2110,2225,2340],
             bus4:[625,740,855,1010,1125,1240,1355,1510,1625,1740,1855,2010,2125,2240,2355],
             bus5:[640,755,910,1025,1140,1255,1410,1525,1640,1755,1910,2025,2140,2255],
             order:[10,25,40,540,555,610,625,640,655,710,725,740,755,810,825,840,855,910,925,940,955,1010,1025,1040,1055,1110,1125,1140,1155,1210,1225,1240,1255,1310,1325,1340,1355,1410,1425,1440,1455,1510,1525,1540,1555,1610,1625,1640,1655,1710,1725,1740,1755,1810,1825,1840,1855,1910,1925,1940,1955,2010,2025,2040,2055,2110,2125,2140,2155,2210,2225,2240,2255,2310,2325,2340,2355,2410],
             
             bus1h:[15,815,945,1115,1245,1415,1545,1715,1845,2015,2145,2315],
             bus2h:[45,845,1015,1145,1315,1445,1615,1745,1915,2045,2215,2345],
             bus3h:[745,915,1045,1215,1345,1515,1645,1815,1945,2115,2245],
             orderh:[15,45,745,815,845,915,945,1015,1045,1115,1145,1215,1245,1315,1345,1415,1445,1515,1545,1615,1645,1715,1745,1815,1845,1915,1945,2015,2045,2115,2145,2215,2245,2315,2345],

            
             
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
                if(number>=this.state.bus1h[i]&&number<=this.state.bus1h[i]+158){
                       
                    var h= (hour-parseInt(this.state.bus1h[i]/100));
                    var m= minutes-(this.state.bus1h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue1=0; 
                    
                      if(this.state.yvalue1<4700){
                              
                        break;}
                }
                else this.state.yvalue1=-300;
             }

             for(let i=0;i<12;i++){
                if(number>=this.state.bus2h[i]&&number<=this.state.bus2h[i]+158){
                       
                    var h= (hour-parseInt(this.state.bus2h[i]/100));
                    var m= minutes-(this.state.bus2h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue2=-50; 
                    
                      if(this.state.yvalue2<4700){
                              
                        break;}
                }
                else this.state.yvalue2=-300;
             }


             for(let i=0;i<12;i++){
                if(number>=this.state.bus3h[i]&&number<=this.state.bus3h[i]+158){
                       
                    var h= (hour-parseInt(this.state.bus3h[i]/100));
                    var m= minutes-(this.state.bus3h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue3=0; 
                    
                      if(this.state.yvalue3<4700){
                              
                        break;}
                }
             }
             this.state.yvalue4=-200;
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
                      
                         if(number>=this.state.bus1[i]&&number<=this.state.bus1[i]+158){
                                 
                             var h= (hour-parseInt(this.state.bus1[i]/100));
                             var m= minutes-(this.state.bus1[i]%100);
                              
                             
                             var long=h*60+m+seconds/60
                              this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                               this.state.xvalue1=0; 
                             
                               if(this.state.yvalue1<4700){
                              
                                break;}
                         }
                         else this.state.yvalue1=-300;
                      }


                      for(let i=0;i<18;i++){
                        console.log("bus2",this.state.yvalue2,"number",number);
                        if(number>=this.state.bus2[i]&&number<=this.state.bus2[i]+158){
                               
                            var h= (hour-parseInt(this.state.bus2[i]/100));
                            var m= minutes-(this.state.bus2[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              this.state.xvalue2=0; 
                              if(this.state.yvalue2<4700){
                              
                              break;}
                        }
                        else this.state.yvalue2=-300;
                     }



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus3[i]&&number<=this.state.bus3[i]+158){
                               
                            var h= (hour-parseInt(this.state.bus3[i]/100));
                            var m= minutes-(this.state.bus3[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              this.state.xvalue3=0; 
                            
                              if(this.state.yvalue3<4700){
                              
                                break;}
                        }
                        else this.state.yvalue3=-300;
                     }



                     for(let i=0;i<18;i++){
                      
                        if(number>=this.state.bus4[i]&&number<=this.state.bus4[i]+158){
                               
                            var h= (hour-parseInt(this.state.bus4[i]/100));
                            var m= minutes-(this.state.bus4[i]%100);
                             
                           
                            var long=h*60+m+seconds/60
                             this.state.yvalue4=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                              this.state.xvalue4=0; 
                            
                              if(this.state.yvalue4<4700){
                              
                                break;}
                        }
                        else this.state.yvalue4=-300;
                     }



                     for(let i=0;i<18;i++){
                     
                        if(number>=this.state.bus5[i]&&number<=this.state.bus5[i]+111){
                               
                            var h= (hour-parseInt(this.state.bus5[i]/100));
                            var m= minutes-(this.state.bus5[i]%100);
                            
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue5=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                             
                              this.state.xvalue5=0; 
                            
                              if(this.state.yvalue5<4700){
                              
                                break;}
                        }
                        else this.state.yvalue5=-300;
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
        <ScrollView >
      
        <View   style={{  flex:10}}>
            
          <Text style={{fontSize:30,textAlign:'center'}}>{this.state.currentTime }</Text>

          <Text  style={{fontSize:20,textAlign:'right',fontStyle:'italic'}}>{this.state.currentDay }</Text>
          <Text  style={{fontSize:15,textAlign:'left',fontStyle:'italic'}}>{this.state.explain }</Text>
            


            
         
             <View style={{ flex: 8 }} > 
            

             <Button
            onPress={this.onPress}
            title={this.state.explain}
            color="#00ced1"
          />
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
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >walkthru gate</Text>
             </View> 

                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Zoeckler station S1210 </Text>
             </View> 

                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Provider DFAC</Text>
            </View> 

                <Surface width={100} height={166}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>  
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >S-12114</Text>
             </View> 

                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >8th Army HQs</Text>
             </View>  

                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >ROKA HQs</Text>
            </View> 

                <Surface width={100} height={232}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>  
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >TMP P-7010</Text>
             </View> 

                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >3rd MI Bn</Text>
             </View> 

                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Talon DFAC</Text>
             </View> 

                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Barracks P-6001 </Text>
             </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Chapel P-6360</Text>
             </View > 

                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Bldg #P-6315</Text>
             </View> 

                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Spartan DFAC</Text>
             </View> 

               <Surface width={100} height={166}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Tomahawk DFAC</Text>
             </View> 

                <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >VMF S-7412</Text>
               </View> 
              
                 <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                 </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >VMF S-7515</Text>
             </View> 

               <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >HQs P-7621</Text>
             </View> 

               <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >VMF S-7515</Text>
             </View> 

               <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>





             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >VMF S-7412</Text>
             </View> 

               <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Tomahawk DFAC</Text>
             </View> 
             
               <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >One Stop Bldg A</Text>
             </View> 
             
               <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >One Stop Bldg</Text>
             </View> 
             
               <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New PX</Text>
             </View> 
             
               <Surface width={100} height={166}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Commissary</Text>
             </View> 
             
               <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >School</Text>
             </View> 
             
               <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Super Gym</Text>
             </View> 
             
               <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Quarry Gate</Text>
             </View> 
            
               <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >2nd CAB</Text>
             </View> 
            
               <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Medical Clinic</Text>
             </View> 
            
               <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >USO S-375</Text>
             </View> 
            
               <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Lodging S-121</Text>
             </View> 
               <Surface width={100} height={364}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >BUS Terminal</Text>
             </View> 
               <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >AV/CPX Gate</Text>
             </View>  
               <Surface width={100} height={166}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >1-17 CAV,P-860</Text>
             </View> 
               <Surface width={100} height={34}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >4-2 ARB S-869</Text>
             </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Dental Clinic</Text>
             </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>









             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >AV/VPX Gate</Text>
             </View> 
                <Surface width={100} height={232}>
                    <Shape d={path2} stroke="#000000" fill="#2c4ed6" strokeWidth={1} />
                </Surface>











             <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#2c4ed6" strokeWidth={1}/>
                </Surface>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >walkthru gate</Text>
             </View> 
               









           
              

            </View> 
            <View style={{ flex: 6}}>

            </View>
               <Text style={{marginLeft:30,fontSize:20}}>It's not an official app, and the location of bus is  based on departure time but not GPS so it's not 100% accurate but worth to reference </Text>
            </View>

      
     </ScrollView>

    );
  }
}
export default BLUE;

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
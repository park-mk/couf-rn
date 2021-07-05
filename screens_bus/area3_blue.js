import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'


const Square = () => {
    return <View style={styles.square} />;
  };


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
             statio1:'',
             statio2:'',
             statio3:'',
             station1:'',
             station2:'',
             station3:'',
             station4:'',
             station5:'',
             station6:'',
             station7:'',
             station8:'',
             station9:'',
             station10:'',
             station11:'',
             station12:'',
             station13:'',
             station14:'',
             station15:'',
             station16:'',
             station17:'',
             station18:'',
             station19:'',
             station20:'',
             station21:'',
             station22:'',
             station23:'',
             station24:'',
             station25:'',
             station26:'',
             station27:'',
             station28:'',
             station29:'',
             station30:'',
             station31:'',
             station32:'',
             station33:'',
             station34:'',
             station35:'',
             station36:'',
             station37:'',
             station38:'',
           
           
             
           


             bus1:[25,540,655,810,925,1040,1155,1310,1425,1540,1655,1810,1925,2040,2155,2310],
             bus2:[40,555,710,825,940,1055,1210,1325,1440,1555,1710,1825,1940,2055,2210,2325],
             bus3:[10,610,725,840,955,1110,1225,1340,1455,1610,1725,1840,1955,2110,2225,2340],
             bus4:[625,740,855,1010,1125,1240,1355,1510,1625,1740,1855,2010,2125,2240,2355],
             bus5:[640,755,910,1025,1140,1255,1410,1525,1640,1755,1910,2025,2140,2255],
             order:[10,25,40,540,555,610,625,640,655,710,725,740,755,810,825,840,855,910,925,940,955,1010,1025,1040,1055,1110,1125,1140,1155,1210,1225,1240,1255,1310,1325,1340,1355,1410,1425,1440,1455,1510,1525,1540,1555,1610,1625,1640,1655,1710,1725,1740,1755,1810,1825,1840,1855,1910,1925,1940,1955,2010,2025,2040,2055,2110,2125,2140,2155,2210,2225,2240,2255,2310,2325,2340,2355],
             
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

   time_to_string2=( h1,m1 )=>{
      let string = h1 +":"+ m1;
      if(string.indexOf(":")==2&&string.length==4){
         string = string+"0";
      }
      if(string.indexOf(":")==1){
         string = "0"+string;
      }
    
      return string;
    }
   time_to_string=( h1,m1 ,h2,m2)=>{
    

      if(m1>=60){
         h1=h1+1;
         m1=m1-60;
      }
      if(m1>=60){
         h1=h1+1;
         m1=m1-60;
      }
      if(m1<10){
        m1="0"+m1;
      }
      if(m2>=60){
         h2=h2+1;
         m2=m2-60;
      }
      if(m2>=60){
         h2=h2+1;
         m2=m2-60;
      }
      if(m2<10){
        m2="0"+m2;
      }

      let string = h1+":"+m1+"~" +h2+":"+m2;
      return string;
   }

   _checktime=()=>{
      let hour = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();
      var time=hour*60+minutes+seconds/60;
    
      if(this.state.day==false){

         for(let i =0;i<35;i++){
                  var h= parseInt(this.state.orderh[i]/100);
                    var m= this.state.orderh[i]%100;
                    var long=h*60+m   
                     h= parseInt(this.state.orderh[i+1]/100);
                     m= this.state.orderh[i+1]%100;
                    var long2=h*60+m    

                    if(time>long+3&&time<long2+3){
                    
                     
                     this.setState({statio1:this.time_to_string2(h,m+1)})
                    }//
                    if(time>long+6&&time<long2+6){
                    
                     
                     this.setState({statio2:this.time_to_string2(h,m+3)})
                    }//
                    if(time>long+8&&time<long2+8){
                    
                     
                     this.setState({station1:this.time_to_string(h,m+5,h,m+7)})
                    }//
                    if(time>long+10&&time<long2+10){
                 
                  
                     this.setState({station2:this.time_to_string(h,m+7,h,m+9)})
                     }//
                  if(time>long+12&&time<long2+12){
                 
                     this.setState({station3:this.time_to_string(h,m+9,h,m+11)})
                    }//
                  if(time>long+16&&time<long2+16){
                  
                     this.setState({station4:this.time_to_string(h,m+13,h,m+15)})
                     }//
                  if(time>long+17&&time<long2+17){
                  
                     this.setState({station5:this.time_to_string(h,m+14,h,m+16)})
                    }//
                  if(time>long+18&&time<long2+18){
                 
                     this.setState({station6:this.time_to_string(h,m+15,h,m+17)})
                     }//
                  if(time>long+19&&time<long2+19){
                    
                          this.setState({station7:this.time_to_string(h,m+16,h,m+18)})
                   }//      
                  if(time>long+21&&time<long2+21){
                    
                     this.setState({station8:this.time_to_string(h,m+18,h,m+20)})
                     }//      
                   if(time>long+22&&time<long2+22){
                  
                   
                    this.setState({station9:this.time_to_string(h,m+19,h,m+21)})
                    }//      



                    /////////다시 

                    if(time>long+25&&time<long2+25){
                  
                    
                     this.setState({station10:this.time_to_string(h,m+20,h,m+24)})
                     }//   spartan dfac
                   
                     if(time>long+28&&time<long2+28){
                       
                     
                   
                        this.setState({station11:this.time_to_string(h,m+23,h,m+27)})
                      }//      
                      if(time>long+29&&time<long2+29){
                  
                   
                        this.setState({station12:this.time_to_string(h,m+24,h,m+28)})
                      }//  
                      if(time>long+30&&time<long2+30){
                  
             
                        this.setState({station13:this.time_to_string(h,m+25,h,m+29)})
                    }//  
                    if(time>long+32&&time<long2+32){
                  
             
                     this.setState({station14:this.time_to_string(h,m+27,h,m+31)})
                    }//  

                   if(time>long+34&&time<long2+34){
                  
                   
                   this.setState({station15:this.time_to_string(h,m+29,h,m+33)})
                    }//      
                  if(time>long+35&&time<long2+35){
               
                
                     this.setState({station16:this.time_to_string(h,m+30,h,m+34)})
                   }//      
                   if(time>long+36&&time<long2+36){
               
                
                     this.setState({station17:this.time_to_string(h,m+31,h,m+35)})
                   }//  
                   if(time>long+38&&time<long2+38){
               
          
                     this.setState({station18:this.time_to_string(h,m+33,h,m+37)})
                 }//  
                 if(time>long+40&&time<long2+40){
               
          
                  this.setState({station19:this.time_to_string(h,m+35,h,m+39)})
              }//  
              if(time>long+42&&time<long2+42){
               
          
               this.setState({station20:this.time_to_string(h,m+37,h,m+41)})
            }//  
            if(time>long+45&&time<long2+45){
               
          
               this.setState({station21:this.time_to_string(h,m+40,h,m+44)})
            }//  
            if(time>long+47&&time<long2+47){
               
          
               this.setState({station22:this.time_to_string(h,m+42,h,m+46)})
            }//  
            if(time>long+48&&time<long2+48){
               
          
               this.setState({station23:this.time_to_string(h,m+43,h,m+47)})
            }//  
            if(time>long+50&&time<long2+50){
               
          
               this.setState({station24:this.time_to_string(h,m+45,h,m+49)})
            }//  
            if(time>long+51&&time<long2+51){
               
          
               this.setState({station25:this.time_to_string(h,m+46,h,m+50)})
            }//  

            if(time>long+52&&time<long2+52){
               
          
               this.setState({station26:this.time_to_string(h,m+47,h,m+51)})
            }//  
            if(time>long+53&&time<long2+53){
               
          
               this.setState({station27:this.time_to_string(h,m+48,h,m+52)})
            }//  
            if(time>long+54&&time<long2+54){
               
          
               this.setState({station28:this.time_to_string(h,m+49,h,m+53)})
            }//  
            if(time>long+60&&time<long2+60){
               
          
               this.setState({station29:this.time_to_string(h,m+55,h,m+59)})
            }//  
            if(time>long+62&&time<long2+62){
               
          
               this.setState({station30:this.time_to_string(h,m+57,h,m+61)})
            }//  
            if(time>long+65&&time<long2+65){
               
          
               this.setState({station31:this.time_to_string(h,m+60,h,m+64)})
            }//  
            if(time>long+66&&time<long2+66){
               
          
               this.setState({station32:this.time_to_string(h,m+61,h,m+65)})
            }//  
            if(time>long+68&&time<long2+68){
               
          
               this.setState({station33:this.time_to_string(h,m+63,h,m+67)})
            }//  
            if(time>long+70&&time<long2+70){
               
          
               this.setState({station34:this.time_to_string(h,m+65,h,m+69)})
            }//  
      

       }      

      }
      if(this.state.day==true){

         
         for(let i =0;i<78;i++){
            var h= parseInt(this.state.order[i]/100);
              var m= this.state.order[i]%100;
              var long=h*60+m   
               h= parseInt(this.state.order[i+1]/100);
               m= this.state.order[i+1]%100;
              var long2=h*60+m    
             
              if(time>long+3&&time<long2+3){
                    
                     
               this.setState({statio1:this.time_to_string2(h,m+1)})
              }//
              if(time>long+6&&time<long2+6){
              
               
               this.setState({statio2:this.time_to_string2(h,m+3)})
              }//
              if(time>long+7&&time<long2+8){
              
               
               this.setState({station1:this.time_to_string(h,m+5,h,m+7)})
              }//
              if(time>long+10&&time<long2+10){
           
            
               this.setState({station2:this.time_to_string(h,m+7,h,m+9)})
               }//
            if(time>long+12&&time<long2+12){
           
               this.setState({station3:this.time_to_string(h,m+9,h,m+11)})
              }//
            if(time>long+16&&time<long2+16){
            
               this.setState({station4:this.time_to_string(h,m+13,h,m+15)})
               }//
            if(time>long+17&&time<long2+17){
            
               this.setState({station5:this.time_to_string(h,m+14,h,m+16)})
              }//
            if(time>long+18&&time<long2+18){
           
               this.setState({station6:this.time_to_string(h,m+15,h,m+17)})
               }//
            if(time>long+19&&time<long2+19){
              
                    this.setState({station7:this.time_to_string(h,m+16,h,m+18)})
             }//      
            if(time>long+21&&time<long2+21){
              
               this.setState({station8:this.time_to_string(h,m+18,h,m+20)})
               }//      
             if(time>long+22&&time<long2+22){
            
             
              this.setState({station9:this.time_to_string(h,m+19,h,m+21)})
              }//      



              /////////다시 

              if(time>long+25&&time<long2+25){
            
              
               this.setState({station10:this.time_to_string(h,m+20,h,m+24)})
               }//   spartan dfac
             
               if(time>long+28&&time<long2+28){
                 
               
             
                  this.setState({station11:this.time_to_string(h,m+23,h,m+27)})
                }//      
                if(time>long+29&&time<long2+29){
            
             
                  this.setState({station12:this.time_to_string(h,m+24,h,m+28)})
                }//  
                if(time>long+30&&time<long2+30){
            
       
                  this.setState({station13:this.time_to_string(h,m+25,h,m+29)})
              }//  
              if(time>long+32&&time<long2+32){
            
       
               this.setState({station14:this.time_to_string(h,m+27,h,m+31)})
              }//  

             if(time>long+34&&time<long2+34){
            
             
             this.setState({station15:this.time_to_string(h,m+29,h,m+33)})
              }//      
            if(time>long+35&&time<long2+35){
         
          
               this.setState({station16:this.time_to_string(h,m+30,h,m+34)})
             }//      
             if(time>long+36&&time<long2+36){
         
          
               this.setState({station17:this.time_to_string(h,m+31,h,m+35)})
             }//  
             if(time>long+38&&time<long2+38){
         
    
               this.setState({station18:this.time_to_string(h,m+33,h,m+37)})
           }//  
           if(time>long+40&&time<long2+40){
         
    
            this.setState({station19:this.time_to_string(h,m+35,h,m+39)})
        }//  
        if(time>long+42&&time<long2+42){
         
    
         this.setState({station20:this.time_to_string(h,m+37,h,m+41)})
      }//  
      if(time>long+45&&time<long2+45){
         
    
         this.setState({station21:this.time_to_string(h,m+40,h,m+44)})
      }//  
      if(time>long+47&&time<long2+47){
         
    
         this.setState({station22:this.time_to_string(h,m+42,h,m+46)})
      }//  
      if(time>long+48&&time<long2+48){
         
    
         this.setState({station23:this.time_to_string(h,m+43,h,m+47)})
      }//  
      if(time>long+50&&time<long2+50){
         
    
         this.setState({station24:this.time_to_string(h,m+45,h,m+49)})
      }//  
      if(time>long+51&&time<long2+51){
         
    
         this.setState({station25:this.time_to_string(h,m+46,h,m+50)})
      }//  

      if(time>long+52&&time<long2+52){
         
    
         this.setState({station26:this.time_to_string(h,m+47,h,m+51)})
      }//  
      if(time>long+53&&time<long2+53){
         
    
         this.setState({station27:this.time_to_string(h,m+48,h,m+52)})
      }//  
      if(time>long+54&&time<long2+54){
         
    
         this.setState({station28:this.time_to_string(h,m+49,h,m+53)})
      }//  
      if(time>long+60&&time<long2+60){
         
    
         this.setState({station29:this.time_to_string(h,m+55,h,m+59)})
      }//  
      if(time>long+62&&time<long2+62){
         
    
         this.setState({station30:this.time_to_string(h,m+57,h,m+61)})
      }//  
      if(time>long+65&&time<long2+65){
         
    
         this.setState({station31:this.time_to_string(h,m+60,h,m+64)})
      }//  
      if(time>long+66&&time<long2+66){
         
    
         this.setState({station32:this.time_to_string(h,m+61,h,m+65)})
      }//  
      if(time>long+68&&time<long2+68){
         
    
         this.setState({station33:this.time_to_string(h,m+63,h,m+67)})
      }//  
      if(time>long+70&&time<long2+70){
         
    
         this.setState({station34:this.time_to_string(h,m+65,h,m+69)})
      }//  


 }      
      }
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
         
 
         
         this.state.nextbus=this.time_to_string2( parseInt(next/100),next%100); // 다음날 출발 날짜 
         let day=new Date().getDay();
         if(this.state.nextbus=="00:30"&&(day==7||day==0))// 만약 주말의 마지막 날이라면 다음 첫날의 출발 날짜 
         this.state.nextbus="00:10";
        
         

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
          
                  
                  this.state.nextbus=this.time_to_string2( parseInt(next/100),next%100); // 다음날 출발 날짜 
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
                      
                        if(number>=this.state.bus2[i]&&number<=this.state.bus2[i]+158){
                               
                            var h= (hour-parseInt(this.state.bus2[i]/100));
                            var m= minutes-(this.state.bus2[i]%100);
                             console.log("check bus2",number ,this.state.bus2[i]+158)
                            
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
    this._checktime();
} 

componentDidMount()
{  
    
    this.timer = setInterval(() =>
    {
        this.getCurrentTime();
        this._check();
    
    }, 1000);
    this.timer = setInterval(() =>
    {
       
        this._checktime();
    }, 10000);

}
getMonthName =() =>{

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const d = new Date();
 return monthNames[d.getMonth()];
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
       this._checktime();
}
  else if(this.state.day==false){
    this.setState({explain: 'weekday schedule'});
       this.state.day=true;
       this._checktime();
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
centerComponent={{ text: 'BUS', style: {fontFamily:'title-font' ,fontSize:40,marginLeft:10,marginTop:17,color:'#67DBFF' } }}

 >
     
    </Header>

  <ScrollView
    style={{backgroundColor:'#ffffff'}}
  >
  
  <View   style={{  flex:10}}>
      

  <View   style={{  marginLeft:imagewidth,flexDirection:"row"}}>

  <Text  style={{fontSize:30,fontFamily:'title-font',textAlign:'center'}}>{this.state.currentDay.toString()}</Text>
          
  <Text  style={{fontSize:30,fontFamily:'title-font',textAlign:'center'}}>,</Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'title-font'}}>{this.getMonthName()}</Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'title-font'}}> </Text>
  <Text  style={{fontSize:30,textAlign:'center',fontFamily:'title-font'}}>{new Date().getDay() }</Text>

 
  

         </View>
         <Text  style={{marginTop:20,fontSize:30,textAlign:'center',fontFamily:'title-font',color:"#2c4ed6"}}>BLUE BUS ROUTE</Text>
  


   
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
                <Text style={{fontSize:25,fontFamily:'title-font'}}>next departure: </Text>
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
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                   <Square/>
                </View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >walkthru gate</Text>
             </View> 

                <View width={100} height={34}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Zoeckler station S1210 </Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.statio1} </Text>
                </View> 
             
             </View> 

                <View width={100} height={100}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
               <View>
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Provider DFAC</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.statio2} </Text>
                </View> 
              
            </View> 

                <View width={100} height={166}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >S-12114</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station1} </Text>
                </View> 
             </View> 

                <View width={100} height={100}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >8th Army HQs</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station2} </Text>
               </View>  
             </View>  

                <View width={100} height={100}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >ROKA HQs</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station3} </Text>
                </View> 
            </View> 

                <View width={100} height={232}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>  
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >TMP P-7010</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station4} </Text>
                </View> 
             </View> 

                <View width={100} height={34}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >3rd MI Bn</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station5} </Text>
                </View>  
             </View> 

                <View width={100} height={34}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Talon DFAC</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station6} </Text>
                </View> 
             </View> 

                <View width={100} height={34}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Barracks P-6001 </Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station7} </Text>
                </View> 
             </View> 
                <View width={100} height={100}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Chapel P-6360</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station8} </Text>
                </View> 
             </View > 

                <View width={100} height={34}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Bldg #P-6315</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station9} </Text>
                </View> 
             </View> 

                <View width={100} height={100}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Spartan DFAC</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station10} </Text>
                </View> 
             </View> 

               <View width={100} height={166}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Tomahawk DFAC</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station11} </Text>
                </View> 
             </View> 

                <View width={100} height={34}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >VMF S-7412</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station12} </Text>
                </View> 
               </View> 
              
                 <View width={100} height={34}>
                   
                 </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >VMF S-7515</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station13} </Text>
                </View> 
             </View> 

               <View width={100} height={100}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >HQs P-7621</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station14} </Text>
                </View> 
             </View> 

               <View width={100} height={100}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >VMF S-7515</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station15} </Text>
                </View> 
             </View> 

               <View width={100} height={34}>
                   
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >VMF S-7412</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station16} </Text>
                </View> 
             </View> 

               <View width={100} height={34}>
                   
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Tomahawk DFAC</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station17} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                   
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >One Stop Bldg A</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station18} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                   
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >One Stop Bldg</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station19} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                   
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New PX</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station20} </Text>
                </View> 
             </View> 
             
               <View width={100} height={166}>
                   
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Commissary</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station21} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                   
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >School</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station22} </Text>
                </View> 
             </View> 
             
               <View width={100} height={34}>
                   
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Super Gym</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station23} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Quarry Gate</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station24} </Text>
                </View> 
             </View> 
            
               <View width={100} height={34}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >2nd CAB</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station25} </Text>
                </View> 
             </View> 
            
               <View width={100} height={34}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Medical Clinic</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station26} </Text>
                </View> 
             </View> 
            
               <View width={100} height={34}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >USO S-375</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station27} </Text>
                </View> 
             </View> 
            
               <View width={100} height={34}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Lodging S-121</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station28} </Text>
                </View> 
             </View> 
               <View width={100} height={364}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >BUS Terminal</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station29} </Text>
                </View> 
             </View> 
               <View width={100} height={100}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >AV/CPX Gate</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station30} </Text>
                </View> 
             </View>  
               <View width={100} height={166}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >1-17 CAV,P-860</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station31} </Text>
                </View> 
             </View> 
               <View width={100} height={34}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >4-2 ARB S-869</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station32} </Text>
                </View> 
             </View> 
                <View width={100} height={100}>
                   
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Dental Clinic</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station33} </Text>
                </View> 
             </View> 
                <View width={100} height={100}>
                   
                </View>









             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >AV/VPX Gate</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station34} </Text>
                </View> 
             </View> 
                <View width={100} height={232}>
                   
                </View>











             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                   <View width={16} height={25}   style ={{borderColor:'blue',borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View>
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >walkthru gate</Text>
              
                </View> 
             </View> 
               









           
              

            </View> 
           
               <Text style={{marginLeft:30,fontSize:20}}>It's not an official app, and the location of bus is  based on departure time but not GPS so it's not 100% accurate but worth to reference </Text>
            </View>
            <View width={100} height={100}>
                  
                  </View>
      
     </ScrollView>
     </View>

    );
  }
}
export default BLUE;

const styles = StyleSheet.create({
     animation:{
        width:40,
        height:40,
        backgroundColor:'blue',
        marginLeft:30,

     }, button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      },
         square: {
        width: 2,
        height: 4670,
        backgroundColor: "blue",
      },
  });

  //the bug 수정하지 못한 버그 , 시간 계산을 시간이 안넘어갈때는 118 이고 넘어갈때는 158 근데 그냥 큰 숫자 158 로 채택함 문제 생기면 우선적으로 해결 바람 
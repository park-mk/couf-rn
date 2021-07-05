import React from 'react';
import { Button, Text, View ,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet,Dimensions} from 'react-native';
import { List, ListItem, SearchBar,Header } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'



const Square = () => {
    return <View style={styles.square} />;
  };


class GREEN extends React.Component {

    constructor(props) {
        super(props);    
        this.state={
            timeofcircle:62,   // 32+34 =66  일분을 길이 66으로 치환 한다 
            // 한바퀴 돌때 걸리는 시간 
            circlelength:4092,//  한바퀴 다돌려면 66 분 걸림 66 분 * 66 길이 즉 총길이는 4356임 
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
             bus1:[530,645,800,915,1030,1145,1300,1415,1530,1645,1800,1915,2030,2145,2300],
             bus2:[545,700,815,930,1045,1200,1315,1430,1545,1700,1815,1930,2045,2200,2315],
             bus3:[600,715,830,945,1100,1215,1330,1445,1600,1715,1830,1945,2100,2215,2330],
             bus4:[615,730,845,1000,1115,1230,1345,1500,1615,1730,1845,2000,2115,2230,2345],
             bus5:[630,745,900,1015,1130,1245,1400,1515,1630,1745,1900,2015,2130,2245,2400],

             order:[530,545,600,615,630,645,700,715,730,745,800,815,830,845,900,915,930,945,1000,1015,1030,1045,1100,1115,1130,1145,1200,1215,1230,1245,1300,1315,1330,1345,1400,1415,1430,1445,1500,1515,1530,1545,1600,1615,1630,1645,1700,1715,1730,1745,1800,1815,1830,1845,1900,1915,1930,1945,2000,2015,2030,2045,2100,2115,2130,2145,2200,2215,2230,2245,2300,2315,2330,2345,2400],
             bus1h:[800,930,1100,1230,1400,1530,1700,1830,2000,2130,2300],
             bus2h:[830,1000,1130,1300,1430,1600,1730,1900,2030,2200,2330],
             bus3h:[730,900,1030,1200,1330,1500,1630,1800,1930,2100,2230,2400],
             orderh:[730,800,830,900,930,1000,1030,1100,1130,1200,1230,1300,1330,1400,1430,1500,1530,1600,1630,1700,1730,1800,1830,1900,1930,2000,2030,2100,2130,2200,2230,2300,2330,2400],

            
             
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
      if(string.indexOf(":")==1){
         string = "0"+string;
      }
       
      if(string.length==7){
         string = "05:30";
      
      }
      console.log(string,string.length);
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
         console.log(seconds," holiday time");
          for(let i =0;i<35;i++){
            var h= parseInt(this.state.orderh[i]/100);
            var m= this.state.orderh[i]%100;
            var long=h*60+m   
             h= parseInt(this.state.orderh[i+1]/100);
             m= this.state.orderh[i+1]%100;
            var long2=h*60+m    
           
            if(time>long+5&&time<long2+5){
                  
                   
               this.setState({station1:this.time_to_string(h,m+2,h,m+4)})
              }//
              if(time>long+6&&time<long2+6){
           
            
               this.setState({station2:this.time_to_string(h,m+3,h,m+5)})
               }//
            if(time>long+8&&time<long2+8){
           
               this.setState({station3:this.time_to_string(h,m+5,h,m+7)})
              }//
            if(time>long+10&&time<long2+10){
            
               this.setState({station4:this.time_to_string(h,m+7,h,m+9)})
               }//
            if(time>long+11&&time<long2+11){
            
               this.setState({station5:this.time_to_string(h,m+8,h,m+10)})
              }//
            if(time>long+13&&time<long2+13){
           
               this.setState({station6:this.time_to_string(h,m+10,h,m+12)})
               }//
            if(time>long+15&&time<long2+15){
              
                    this.setState({station7:this.time_to_string(h,m+12,h,m+14)})
             }//      
            if(time>long+17&&time<long2+17){
              
               this.setState({station8:this.time_to_string(h,m+14,h,m+16)})
               }//      
             if(time>long+18&&time<long2+18){
            
             
              this.setState({station9:this.time_to_string(h,m+15,h,m+17)})
              }//      



              /////////다시 

              if(time>long+21&&time<long2+21){
            
              
               this.setState({station10:this.time_to_string(h,m+16,h,m+20)})
               }//   spartan dfac
             
               if(time>long+23&&time<long2+23){
                 
               
             
                  this.setState({station11:this.time_to_string(h,m+18,h,m+22)})
                }//      
                if(time>long+25&&time<long2+25){
            
             
                  this.setState({station12:this.time_to_string(h,m+20,h,m+24)})
                }//  
                if(time>long+27&&time<long2+27){
            
       
                  this.setState({station13:this.time_to_string(h,m+22,h,m+26)})
              }//  
              if(time>long+29&&time<long2+29){
            
       
               this.setState({station14:this.time_to_string(h,m+24,h,m+28)})
              }//  

             if(time>long+31&&time<long2+31){
            
             
             this.setState({station15:this.time_to_string(h,m+26,h,m+30)})
              }//      
            if(time>long+33&&time<long2+33){
         
          
               this.setState({station16:this.time_to_string(h,m+28,h,m+32)})
             }//      
             if(time>long+34&&time<long2+34){
         
          
               this.setState({station17:this.time_to_string(h,m+29,h,m+33)})
             }//  
             if(time>long+36&&time<long2+36){
         
    
               this.setState({station18:this.time_to_string(h,m+31,h,m+35)})
           }//  
           if(time>long+38&&time<long2+38){
         
    
            this.setState({station19:this.time_to_string(h,m+33,h,m+37)})
        }//  
        if(time>long+40&&time<long2+40){
         
    
         this.setState({station20:this.time_to_string(h,m+35,h,m+39)})
      }//  
      if(time>long+41&&time<long2+41){
         
    
         this.setState({station21:this.time_to_string(h,m+36,h,m+40)})
      }//  
      if(time>long+43&&time<long2+43){
         
    
         this.setState({station22:this.time_to_string(h,m+38,h,m+42)})
      }//  
      if(time>long+45&&time<long2+45){
         
    
         this.setState({station23:this.time_to_string(h,m+40,h,m+44)})
      }//  
      if(time>long+47&&time<long2+47){
         
    
         this.setState({station24:this.time_to_string(h,m+42,h,m+46)})
      }//  
      if(time>long+49&&time<long2+49){
         
    
         this.setState({station25:this.time_to_string(h,m+44,h,m+48)})
      }//  

      if(time>long+50&&time<long2+50){
         
    
         this.setState({station26:this.time_to_string(h,m+45,h,m+49)})
      }//  
      if(time>long+54&&time<long2+54){
         
    
         this.setState({station27:this.time_to_string(h,m+49,h,m+53)})
      }//  
      if(time>long+55&&time<long2+55){
         
    
         this.setState({station28:this.time_to_string(h,m+50,h,m+54)})
      }//  
      if(time>long+57&&time<long2+57){
         
    
         this.setState({station29:this.time_to_string(h,m+52,h,m+56)})
      }//  
      if(time>long+59&&time<long2+59){
         
    
         this.setState({station30:this.time_to_string(h,m+54,h,m+58)})
      }//  
      if(time>long+60&&time<long2+60){
         
    
         this.setState({station31:this.time_to_string(h,m+55,h,m+59)})
      }//  
      if(time>long+64&&time<long2+64){
         
    
         this.setState({station32:this.time_to_string(h,m+59,h,m+63)})
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
              
               if(time>long+5&&time<long2+5){
                     
                      
                  this.setState({station1:this.time_to_string(h,m+2,h,m+4)})
                 }//
                 if(time>long+6&&time<long2+6){
              
               
                  this.setState({station2:this.time_to_string(h,m+3,h,m+5)})
                  }//
               if(time>long+8&&time<long2+8){
              
                  this.setState({station3:this.time_to_string(h,m+5,h,m+7)})
                 }//
               if(time>long+10&&time<long2+10){
               
                  this.setState({station4:this.time_to_string(h,m+7,h,m+9)})
                  }//
               if(time>long+11&&time<long2+11){
               
                  this.setState({station5:this.time_to_string(h,m+8,h,m+10)})
                 }//
               if(time>long+13&&time<long2+13){
              
                  this.setState({station6:this.time_to_string(h,m+10,h,m+12)})
                  }//
               if(time>long+15&&time<long2+15){
                 
                       this.setState({station7:this.time_to_string(h,m+12,h,m+14)})
                }//      
               if(time>long+17&&time<long2+17){
                 
                  this.setState({station8:this.time_to_string(h,m+14,h,m+16)})
                  }//      
                if(time>long+18&&time<long2+18){
               
                
                 this.setState({station9:this.time_to_string(h,m+15,h,m+17)})
                 }//      



                 /////////다시 

                 if(time>long+21&&time<long2+21){
               
                 
                  this.setState({station10:this.time_to_string(h,m+16,h,m+20)})
                  }//   spartan dfac
                
                  if(time>long+23&&time<long2+23){
                    
                  
                
                     this.setState({station11:this.time_to_string(h,m+18,h,m+22)})
                   }//      
                   if(time>long+25&&time<long2+25){
               
                
                     this.setState({station12:this.time_to_string(h,m+20,h,m+24)})
                   }//  
                   if(time>long+27&&time<long2+27){
               
          
                     this.setState({station13:this.time_to_string(h,m+22,h,m+26)})
                 }//  
                 if(time>long+29&&time<long2+29){
               
          
                  this.setState({station14:this.time_to_string(h,m+24,h,m+28)})
                 }//  

                if(time>long+31&&time<long2+31){
               
                
                this.setState({station15:this.time_to_string(h,m+26,h,m+30)})
                 }//      
               if(time>long+33&&time<long2+33){
            
             
                  this.setState({station16:this.time_to_string(h,m+28,h,m+32)})
                }//      
                if(time>long+34&&time<long2+34){
            
             
                  this.setState({station17:this.time_to_string(h,m+29,h,m+33)})
                }//  
                if(time>long+36&&time<long2+36){
            
       
                  this.setState({station18:this.time_to_string(h,m+31,h,m+35)})
              }//  
              if(time>long+38&&time<long2+38){
            
       
               this.setState({station19:this.time_to_string(h,m+33,h,m+37)})
           }//  
           if(time>long+40&&time<long2+40){
            
       
            this.setState({station20:this.time_to_string(h,m+35,h,m+39)})
         }//  
         if(time>long+41&&time<long2+41){
            
       
            this.setState({station21:this.time_to_string(h,m+36,h,m+40)})
         }//  
         if(time>long+43&&time<long2+43){
            
       
            this.setState({station22:this.time_to_string(h,m+38,h,m+42)})
         }//  
         if(time>long+45&&time<long2+45){
            
       
            this.setState({station23:this.time_to_string(h,m+40,h,m+44)})
         }//  
         if(time>long+47&&time<long2+47){
            
       
            this.setState({station24:this.time_to_string(h,m+42,h,m+46)})
         }//  
         if(time>long+49&&time<long2+49){
            
       
            this.setState({station25:this.time_to_string(h,m+44,h,m+48)})
         }//  

         if(time>long+50&&time<long2+50){
            
       
            this.setState({station26:this.time_to_string(h,m+45,h,m+49)})
         }//  
         if(time>long+54&&time<long2+54){
            
       
            this.setState({station27:this.time_to_string(h,m+49,h,m+53)})
         }//  
         if(time>long+55&&time<long2+55){
            
       
            this.setState({station28:this.time_to_string(h,m+50,h,m+54)})
         }//  
         if(time>long+57&&time<long2+57){
            
       
            this.setState({station29:this.time_to_string(h,m+52,h,m+56)})
         }//  
         if(time>long+59&&time<long2+59){
            
       
            this.setState({station30:this.time_to_string(h,m+54,h,m+58)})
         }//  
         if(time>long+60&&time<long2+60){
            
       
            this.setState({station31:this.time_to_string(h,m+55,h,m+59)})
         }//  
         if(time>long+64&&time<long2+64){
            
       
            this.setState({station32:this.time_to_string(h,m+59,h,m+63)})
         }//  
     
            
       
     
 
  }      
       }
    }


    set_first_bus=()=>{
       if( this.state.day==false){
      this.setState({station1:"07:33", station2:"07:34", station3:"07:36", station4:"07:38", station5:"07:39", station6:"07:41", station7:"07:43",station8:"07:45", station9:"07:46",station10:"07:48",station11:"07:50",station12:"07:52",station13:"07:54",station14:"07:56",station15:"07:58",station16:"08:00",station17:"08:01",station18:"08:03",station19:"08:07",station20:"08:07",station21:"08:08",station22:"08:10",station23:"08:12",station24:"08:14",station25:"08:16",station26:"08:17",station27:"08:21",station28:"08:22",station29:"08:24",station30:"08:26",station31:"08:27",station32:"08:31"})
       }
       else{
         this.setState({station1:"05:33", station2:"05:34", station3:"05:36", station4:"05:38", station5:"05:39", station6:"05:41", station7:"05:43",station8:"05:45", station9:"05:46",station10:"05:48",station11:"05:50",station12:"05:52",station13:"05:54",station14:"05:56",station15:"05:58",station16:"06:00",station17:"06:01",station18:"06:03",station19:"06:05",station20:"06:07",station21:"06:08",station22:"06:10",station23:"06:12",station24:"06:14",station25:"06:16",station26:"06:17",station27:"06:21",station28:"06:22",station29:"06:24",station30:"06:26",station31:"06:27",station32:"06:31"})

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
 
       
         // if(isNaN(this.time_to_string2( parseInt(next/100),next%100))){
         //    this.state.nextbus="07:30";
         //   this.set_first_bus();
         //    }
         //    else{
           this.state.nextbus=this.time_to_string2( parseInt(next/100),next%100);;
         //   }
         let day=new Date().getDay();
         if(this.state.nextbus=="00:30"&&(day==7||day==0))// 만약 주말의 마지막 날이라면 다음 첫날의 출발 날짜 
         this.state.nextbus="00:15";
         if(this.state.nextbus==null)
         this.state.nextbus="null"

        
            

/////////// bus1  
       
             for(let i=0;i<12;i++){
                 
                if(number>=this.state.bus1h[i]&&number<=this.state.bus1h[i]+99){
                       
                    var h= (hour-parseInt(this.state.bus1h[i]/100));
                    var m= minutes-(this.state.bus1h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue1=0; 
                    
                      break;
                }
                else this.state.yvalue1=-3000;
             }

             for(let i=0;i<12;i++){
                if(number>=this.state.bus2h[i]&&number<=this.state.bus2h[i]+99){
                       
                    var h= (hour-parseInt(this.state.bus2h[i]/100));
                    var m= minutes-(this.state.bus2h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue2=-50; 
                    
                      break;
                }
                else this.state.yvalue2=-3000;
             }


             for(let i=0;i<12;i++){
                if(number>=this.state.bus3h[i]&&number<=this.state.bus3h[i]+99){
                       
                    var h= (hour-parseInt(this.state.bus3h[i]/100));
                    var m= minutes-(this.state.bus3h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                    this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                      this.state.xvalue3=0; 
                    
                      break;

                }
                else this.state.yvalue3=-3000;
            
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
                       next="00:15d";
                  }      
              
                  // if(isNaN(this.time_to_string2( parseInt(next/100),next%100))){
                  //    console.log("check2",this.time_to_string2( parseInt(next/100),next%100),typeof(this.time_to_string2( parseInt(next/100),next%100)));
                  //    this.state.nextbus="05:30";
                  //     this.set_first_bus();
                  //    }
                  //    else{
                    this.state.nextbus=this.time_to_string2( parseInt(next/100),next%100);
                    if(this.state.nextbus=="05:30"){
                     this.set_first_bus();
                    }
                 //    }
                  
                  let day=new Date().getDay();
                  if(this.state.nextbus=="00:15"&&day==5)
                  this.state.nextbus="00:30";
                     
         
         /////////// bus1  
                
                      for(let i=0;i<18;i++){
                      
                         if(number>=this.state.bus1[i]&&number<=this.state.bus1[i]+99){
                                 
                             var h= (hour-parseInt(this.state.bus1[i]/100));
                             var m= minutes-(this.state.bus1[i]%100);
                              
                             
                             var long=h*60+m+seconds/60
                              this.state.yvalue1=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                               this.state.xvalue1=0; 
                             
                               break;
                         }
                        else this.state.yvalue1=-3000;

                      }


                      for(let i=0;i<18;i++){
                        if(number>=this.state.bus2[i]&&number<=this.state.bus2[i]+99){
                               
                            var h= (hour-parseInt(this.state.bus2[i]/100));
                            var m= minutes-(this.state.bus2[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue2=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              this.state.xvalue2=0; 
                            
                              break;
                        }
                        else this.state.yvalue2=-3000;
                     }



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus3[i]&&number<=this.state.bus3[i]+99){
                               
                            var h= (hour-parseInt(this.state.bus3[i]/100));
                            var m= minutes-(this.state.bus3[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue3=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              this.state.xvalue3=0; 
                            
                              break;
                        }
                        else this.state.yvalue3=-3000;
                     }



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus4[i]&&number<=this.state.bus4[i]+99){
                               
                            var h= (hour-parseInt(this.state.bus4[i]/100));
                            var m= minutes-(this.state.bus4[i]%100);
                             
                           
                            var long=h*60+m+seconds/60
                             this.state.yvalue4=(long/this.state.timeofcircle)*this.state.circlelength-50;
                            
                              this.state.xvalue4=0; 
                            
                              break;
                        }
                        else this.state.yvalue4=-3000;
                     }



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus5[i]&&number<=this.state.bus5[i]+99){
                               
                            var h= (hour-parseInt(this.state.bus5[i]/100));
                            var m= minutes-(this.state.bus5[i]%100);
                            
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue5=(long/this.state.timeofcircle)*this.state.circlelength-50;
                              //console.log(this.state.yvalue5);
                             
                              this.state.xvalue5=0; 
                            
                              break;
                        }
                        else this.state.yvalue5=-3000;
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
               <Text  style={{marginTop:20,fontSize:30,textAlign:'center',fontFamily:'title-font',color:"#21dd21"}}>GREEN BUS ROUTE</Text>
        

  
         
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
                  <Text style={{fontSize:20,color:'green'}}>{this.state.nextbus} </Text>
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
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                        <Square/>
                </View>  
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >BUS Terminal</Text>
             </View> 

                <View width={100} height={166}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>

                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Medical Clinic</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station1} </Text>
                </View> 
             </View> 

                <View width={100} height={34}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >USO S-375</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station2} </Text>
                </View> 
            </View> 

                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View>   
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Super Gym</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station3} </Text>
                </View> 
             </View> 

                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >School</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station4} </Text>
                </View> 
             </View>  

                <View width={100} height={34}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Talon DFAC</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station5} </Text>
                </View> 
            </View> 

                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View>   
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >3rd MI</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station6} </Text>
                </View> 
             </View> 

                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View>  
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Barracks P-6001</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station7} </Text>
                </View> 
             </View> 

                <View width={100} height={100}>
                  
                </View>





                <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Chapel P-6360</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station8} </Text>
                </View> 
             </View> 

                <View width={100} height={34}>
                  
                </View>




             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Bldg P-6315</Text>
                 <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station9} </Text>
                </View> 
             </View> 

                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Spartan S-6321 </Text>
                 <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station10} </Text>
                </View> 
             </View> 
                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >One stop</Text>
                 <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station11} </Text>
                </View> 
             </View > 

                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Commissary</Text>
                 <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station12} </Text>
                </View> 
             </View> 

                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} > New PX</Text>
                 <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station13} </Text>
                </View> 
             </View> 

               <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Warrior Zone S 6813</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station14} </Text>
                </View> 
             </View> 

                <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Spartan S-6321</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station15} </Text>
                </View> 
               </View> 
              
                 <View width={100} height={100}>
                  
                 </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} > Bldg P-6315</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station16} </Text>
                </View> 
             </View> 

               <View width={100} height={34}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Chapel P-6360</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station17} </Text>
                </View> 
             </View> 

               <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >New Barrack P-6001</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station18} </Text>
                </View> 
             </View> 

               <View width={100} height={100}>
                  
                </View>





             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >3rd MI</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station19} </Text>
                </View> 
             </View> 

               <View width={100} height={100}>
                  
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Talon DFAC</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station20} </Text>
                </View> 
             </View> 
             
               <View width={100} height={34}>
                  
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >School</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station21} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                  
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
             <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Super Gym</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station22} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                  
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >USO S-375</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station23} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                  
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Medical Clinic</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station24} </Text>
                </View> 
             </View> 
             
               <View width={100} height={100}>
                  
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >BUS Terminal</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station25} </Text>
                </View> 
             </View> 
             
               <View width={100} height={34}>
                  
                </View>
             
             
             
             
             
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >CPX</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station26} </Text>
                </View> 
             </View> 
             
               <View width={100} height={232}>
                  
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Walk thru gate</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station27} </Text>
                </View> 
             </View> 
            
               <View width={100} height={34}>
                  
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Zoekler station S-1210</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station28} </Text>
                </View> 
             </View> 
            
               <View width={100} height={100}>
                  
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Provider Grill</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station29} </Text>
                </View> 
             </View> 
            
               <View width={100} height={100}>
                  
                </View>
            
            
            
            
            
             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Zoekler station S-1210</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station30} </Text>
                </View> 
             </View> 
            
               <View width={100} height={34}>
                  
                </View>
            
            
            
            
                <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Walk thru gate</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station31} </Text>
                </View> 
             </View> 
            
               <View width={100} height={232}>
                  
                </View>



                <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >CPX</Text>
                <Text style={{ marginTop:-10,marginLeft:-17,fontSize:15,marginTop:5,color:'grey'}} >Estimated {this.state.station32} </Text>
                </View> 
             </View> 
            
               <View width={100} height={34}>
                  
                </View>



             <View   style={{  height:32, flexDirection:'row'}}>
                <View style={{alignItems:'center'}} width={100} height={32}>
                <View width={16} height={28}   style ={{borderColor:'green',marginTop:-5,borderRadius:8,borderWidth:2,backgroundColor:'#ffffff'}}/>
               
                </View> 
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:22}} >Bus Terminal</Text>
             </View> 
               
                



              

            </View> 
           
               <Text style={{marginLeft:30,fontSize:20}}>It's not an official app, and the location of bus is  based on departure time but not GPS so it's not 100% accurate but worth to reference </Text>
            </View>
            <View height={100}>

                    </View>
      
     </ScrollView>
     </View>

    );
  }
}
export default GREEN;

const styles = StyleSheet.create({
     animation:{
        width:40,
        height:40,
        backgroundColor:'green',
        marginLeft:30,

     }, button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      },
      square: {
        width: 2,
        height: 4080,
        backgroundColor: "green",
      },
  });
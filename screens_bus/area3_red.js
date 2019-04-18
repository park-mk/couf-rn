import React from 'react';
import { Button, Text, View , ART,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'





const {Surface, Shape, Path} = ART;

class Red extends React.Component {

    constructor(props) {
        super(props);
    
        this.state={

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
             bus1:[15,530,645,800,915,1030,1145,1300,1415,1530,1645,1800,1915,2030,2145,2300],
             bus2:[30,545,700,815,930,1045,1200,1315,1430,1545,1700,1815,1930,2045,2200,2315],
             bus3:[45,600,715,830,945,1100,1215,1330,1445,1600,1715,1830,1945,2100,2215,2330],
             bus4:[100,615,730,845,1000,1115,1230,1345,1500,1615,1730,1845,2000,2115,2230,2345],
             bus5:[630,745,900,1015,1130,1245,1400,1515,1630,1745,1900,2015,2130,2245,2400],
             order:[15,30,45,100,530,545,600,615,630,645,700,715,730,745,800,815,830,845,900,915,930,945,1000,1015,1030,1045,1100,1115,1130,1145,1200,1215,1230,1245,1300,1315,1330,1345,1400,1415,1430,1445,1500,1515,1530,1545,1600,1615,1630,1645,1700,1715,1730,1745,1800,1815,1830,1845,1900,1915,1930,1945,2000,2015,2030,2045,2100,2115,2130,2145,2200,2215,2230,2245,2300,2315,2330,2345,2400],
            
             
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

   _check=()=>{
     
       if(this.state.yvalue1._value>600){
       this.state.xvalue._value=100;
       } 
       
       let hour = new Date().getHours();
       let minutes = new Date().getMinutes();
       let seconds = new Date().getSeconds();

      
        ////////// next bus  weekend
          if(this.state.day==false){
           

       var number=hour*100+minutes;
       var next;
         for(let i =0;i<82;i++){
              if(number>this.state.orderh[i]&&number<=this.state.orderh[i+1]){

                   next=this.state.orderh[i+1]; 
                     break;
              }

              if(i==81)
              next=530;
         }      
 
         
         this.state.nextbus=next;
         let day=new Date().getDay();
         if(this.state.nextbus==730&&(day==7||day==0))
         this.state.nextbus=730;
        
            

/////////// bus1  
       
             for(let i=0;i<18;i++){
                if(number>=this.state.bus1h[i]&&number<=this.state.bus1h[i]+25){
                       
                    var h= (hour-parseInt(this.state.bus1h[i]/100));
                    var m= minutes-(this.state.bus1h[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                     this.state.yvalue1=((h+m+(seconds/60))/23)*2112;
                      this.state.xvalue1=0; 
                    
                      break;
                }
             }
        
         
            }
     
        
            if(this.state.day==true){
           

                var number=hour*100+minutes;
                var next;
                  for(let i =0;i<82;i++){
                       if(number>this.state.order[i]&&number<=this.state.order[i+1]){
         
                            next=this.state.order[i+1]; 
                              break;
                       }
         
                       if(i==81)
                       next="00:10";
                  }      
          
                  
                  this.state.nextbus=next;
                  let day=new Date().getDay();
                  if(this.state.nextbus==530&&day==5)
                  this.state.nextbus="00:30";
                     
         
         /////////// bus1  
                
                      for(let i=0;i<18;i++){
                         if(number>=this.state.bus1[i]&&number<=this.state.bus1[i]+25){
                                
                             var h= (hour-parseInt(this.state.bus1[i]/100));
                             var m= minutes-(this.state.bus1[i]%100);
                              
                             
                             var long=h*60+m+seconds/60
                              this.state.yvalue1=((h+m+(seconds/60))/23)*2112;
                               this.state.xvalue1=0; 
                             
                               break;
                         }
                      }


                      for(let i=0;i<18;i++){
                        if(number>=this.state.bus2[i]&&number<=this.state.bus2[i]+25){
                               
                            var h= (hour-parseInt(this.state.bus2[i]/100));
                            var m= minutes-(this.state.bus2[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue2=((h+m+(seconds/60))/23)*2112;
                              this.state.xvalue2=0; 
                            
                              break;
                        }
                     }



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus3[i]&&number<=this.state.bus3[i]+25){
                               
                            var h= (hour-parseInt(this.state.bus3[i]/100));
                            var m= minutes-(this.state.bus3[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue3=((h+m+(seconds/60))/23)*2112;
                              this.state.xvalue3=0; 
                            
                              break;
                        }
                     }



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus4[i]&&number<=this.state.bus4[i]+25){
                               
                            var h= (hour-parseInt(this.state.bus4[i]/100));
                            var m= minutes-(this.state.bus4[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue4=((h+m+(seconds/60))/23)*2112;
                              this.state.xvalue4=0; 
                            
                              break;
                        }
                     }



                     for(let i=0;i<18;i++){
                        if(number>=this.state.bus5[i]&&number<=this.state.bus5[i]+25){
                               
                            var h= (hour-parseInt(this.state.bus5[i]/100));
                            var m= minutes-(this.state.bus5[i]%100);
                             
                            
                            var long=h*60+m+seconds/60
                             this.state.yvalue5=((h+m+(seconds/60))/23)*2112;
                              this.state.xvalue5=0; 
                            
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
                <Surface width={100} height={70}>
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

    );
  }
}
export default Red;

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
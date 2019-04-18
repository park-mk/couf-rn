import React from 'react';
import { Button, Text, View , ART,TouchableOpacity,Image,ScrollView,Linking,Animated,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Circle from '../components/circle'





const {Surface, Shape, Path} = ART;

class TMC extends React.Component {

    constructor(props) {
        super(props);
    
        this.state={

            springVal: new Animated.Value(1),
            moveAnimation : new Animated.ValueXY({ x: 10, y: 450 }),
            yvalue1:new Animated.Value(0),
            yvalue2:new Animated.Value(0),
            yvalue3:new Animated.Value(0),
            yvalue4:new Animated.Value(0),
            xvalue1:new Animated.Value(0),
            xvalue2:new Animated.Value(-70),
            xvalue3:new Animated.Value(-140),
            xvalue4:new Animated.Value(-210),
            
            time:Date(Date.now()).toString(),
            currentTime: null,
             currentDay: null ,
             timeheight: 100,
             bus1s:false,
             bus2s:false,
             bus3s:false,
             bus4s:false,
             bus1:[500,530,710,740,810,910,1010,1110,1155,1235,1310,1410,1510,1610,1705,1745,1825,1855],
             bus2:[515,725,755,825,925,1025,1125,1205,1245,1325,1425,1525,1625,1715,1755,1840,1910],
             bus3:[840,940,1040,1135,1215,1340,1440,1540,1640,1725,1805,1925,1955,2025,2055,2125,2225,2255,2325,2355],
             bus4:[855,955,1055,1145,1225,1255,1355,1455,1555,1655,1735,1815,1940,2010,2040,2110,2140,2210,2240,2310,2340,2410],
             order:[500,515,530,710,725,740,755,810,825,840,855,910,925,940,955,1010,1025,1040,1055,1110,1125,1135,1145,1155,1205,1215,1225,1235,1245,1255,1310,1325,1340,1355,1410,1425,1440,1455,1510,1525,1540,1555,1610,1625,1640,1655,1705,1715,1725,1735,1745,1755,1805,1815,1825,1840,1855,1910,1925,1940,1955,2010,2025,2040,2055,2110,2125,2140,2210,2225,2240,2255,2310,2325,2340,2355,2410],
              nextbus:0,
           
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

       if(hour==13&&minutes==14&&seconds==30)
       {
           alert("start");
           this._move();
       }
        ////////// next bus
       var number=hour*100+minutes;
       var next;
         for(let i =0;i<76;i++){
              if(number>this.state.order[i]&&number<=this.state.order[i+1]){

                   next=this.state.order[i+1]; 
                     break;
              }

         }      
         
         this.state.nextbus=next;

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
        
         

     
            for(let i=0;i<17;i++){
                if(number>=this.state.bus2[i]&&number<=this.state.bus2[i]+25){
                     
                  
                    var h= (hour-parseInt(this.state.bus2[i]/100));
                    var m= minutes-(this.state.bus2[i]%100);
                     
                    
                    var long=h*60+m+seconds/60
                 
                   
                 
                 
                     this.state.yvalue2=(long/23)*2112;
                    
                     this.state.xvalue2=0;
                   
                     break;
               }
            }
       

       
        for(let i=0;i<20;i++){
            if(number>=this.state.bus3[i]&&number<=this.state.bus3[i]+25){
                console.log(number);
                console.log(this.state.bus3[i]);
                var h= (hour-parseInt(this.state.bus3[i]/100));
                var m= minutes-(this.state.bus3[i]%100);
                 
              
                var long=h*60+m+seconds/60
                
                
             
                 this.state.yvalue3=(long/23)*2112;
                 this.state.xvalue3=0;
            
                 break;
           }
        }
   

  
    for(let i=0;i<22;i++){
        if(number>=this.state.bus4[i]&&number<=this.state.bus4[i]+25){
                      
            var h= (hour-parseInt(this.state.bus4[i]/100));
            var m= minutes-(this.state.bus4[i]%100);
             
          
            var long=h*60+m+seconds/60
                 
                     this.state.yvalue4=(long/23)*2112;
             this.state.xvalue4=0;
             
             break;
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
            


            
         
             <View style={{ flex: 8 }} > 
            

               <TouchableOpacity
                 style={styles.button}
                  onPress={this._move }
                  title="Go to "
                />      
                <View   style={{  flexDirection:'row'}}>
                 <Image  
              source={require('../assets/bus_v.png')}
              style={styles.animation}           
             />   
                  <Text style={{fontSize:20}}>next bus is departing at </Text>
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
              style={[styles.animation ,{transform:[{scale:this.state.springVal}],},{top: this.state.yvalue2},{left: this.state.xvalue2}]}           
             >  
             </Animated.Image>
             <Animated.Image  
              source={require('../assets/bus_v.png')}
              style={[styles.animation ,{transform:[{scale:this.state.springVal}],},{top: this.state.yvalue3},{left: this.state.xvalue3}]}           
             >  
             </Animated.Image>
             <Animated.Image  
              source={require('../assets/bus_v.png')}
              style={[styles.animation ,{transform:[{scale:this.state.springVal}],},{top: this.state.yvalue4},{left: this.state.xvalue4}]}           
             >  
             </Animated.Image>
             </View>
            
             <View   style={{  height:32, flexDirection:'row',marginTop :-40}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Gate1</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
               
               
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >PX</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >DFAC</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >CAC</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Dragon Valley</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >zip ap</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Gate 2</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Barracks</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >TMC</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Barracks(return)</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >zip ap(return)</Text>
               </View > 
                <Surface width={100} height={this.state.timeheight}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Dragon valley(to gate1)</Text>
               </View> 
                <Surface width={100} height={this.state.timeheight}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >CAC(return)</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >DFAC(return)</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >PX(return)</Text>
               </View> 
                <Surface width={100} height={100}>
                    <Shape d={path2} stroke="#000000" fill="#d11f1f" strokeWidth={1} />
                </Surface>
                <View   style={{  height:32, flexDirection:'row'}}>
                <Surface width={100} height={32}>
                    <Shape d={path} stroke="#d11f1f" strokeWidth={1}/>
                </Surface>
               
                <Text style={{ marginTop:-10,marginLeft:0,fontSize:30}} >Gate 1</Text>
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
  });
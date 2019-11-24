

import React from 'react';

import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  ART,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Modal,
} from 'react-native';

import {
  createStackNavigator,
  StackViewTransitionConfigs,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { YellowBox } from 'react-native';

import CategoryScreen from './screens_category/categoryscreen'

import UNDEVELOP from './undeveloped'
import UNDEVELOP1 from './undeveloped1'
import CONTACT from './contactus'

import TOLScreen from './screens_category/TOLscreen'
import KORcate from './screens_korean/KORcate'

import Fooditem from './screens_food/food_ex'
import Travelitem from './screens_travel/Travel_ex'
import TTlist from './screens_travel/Travellist'

import KORScreen from './screens_korean/KORScreen'
import NEWSScreen from './screens_news/news'
import NEWSS from './screens_news/news_ex'
import CULTUREScreen from './screens_culture/culture'
import CUL_EX from './screens_culture/culture_ex'
import TIP from './screens_tips/tips'
import TIP_EX from './screens_tips/tips_ex'





import KOR_explainScreen from './screens_korean/KOR_explain'
import AreaScreen from './screens_area/areascreen'

import Travellist from './screens_travel/Travel'
import Foodlist from './screens_food/food'
import A1WTE from './screens_wte/area1_wte'
import A1WTD from './screens_wtd/area1_wtd'

import Area1Screen from './screens_area/area1'
import WTEA1 from './screens_area/area1wte'
import Area1_1Screen from './screens_area/area1_1'
import Area1_2Screen from './screens_area/area1_2'
import Area2Screen from './screens_area/area2'
import Area2_1Screen from './screens_area/area2_1'
import Area2_2Screen from './screens_area/area2_2'
import Area3Screen from './screens_area/area3'
import Area3_1Screen from './screens_area/area3_1'
import Area3_2Screen from './screens_area/area3_2'
import Area4Screen from './screens_area/area4'
import Area4_1Screen from './screens_area/area4_1'
import Area4_2Screen from './screens_area/area4_2'
import TMC from './screens_bus/area1_tmc'
import H221 from './screens_bus/area1_h221'
import YS from './screens_bus/area1_yongsan'


import BUSScreen from './screens_bus/bus'
import Red from './screens_bus/area3_red'
import GREEN from './screens_bus/area3_green'
import BLUE from './screens_bus/area3_blue'
import LoginScreen from './screens_login/loginscreen'
import SignUpScreen from './screens_sign/signUpScreen'
import SignUp1 from './screens_sign/sign1'
import SignUp2 from './screens_sign/sign2'

import Profile from './screens_login/afterloginscreen'
import Loginc from './screens_login/beforelogin'
import SuggestionScreen from './screens_suggestion/suggestionScreen'
import SuggestionModify from './screens_suggestion/suggestionModify'
import Home1 from'./screens_home/Home'
import HOMEX from'./screens_home/Home_ex'
import EXCHANGE from './screens_exchange/exchange'
import BUYLIST from './screens_buysell/list'

import NIGHT from './screens_night/seperate'
import Clublist from './screens_night/nightlife'
import CLUBEX from'./screens_night/club_ex'
import FESTIVAL from'./screens_night/festival'
import FESTIVALEX from'./screens_night/festival_ex'
import CONCERT from'./screens_night/concert'
import CONCERTEX from'./screens_night/concert_ex'

import * as Font from 'expo-font';
//import { createIconSet } from '@expo/vector-icons';
import expo from './app.json'

const glyphMap = { 'icon-name': 1234, test: '∆' };
//const expoAssetId = require("@expo/vector-icons/Ionicons.ttf");
//const CustomIcon = createIconSet(glyphMap, 'FontName', expoAssetId);


/////////////
import { InteractionManager } from 'react-native';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;


if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}
//*****  in order to ignore the warning  *******//

//YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Remote debugger']);
//YellowBox.ignoreWarnings(['Failed prop']);
class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false
    }
  }
  
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({

      'Raley-balck': require('./assets/fonts/33676382891.ttf'),
      'title-font': require('./assets/fonts/BebasNeue-Regular.ttf'),
       'content-font':require('./assets/fonts/Bayon.ttf'),
      // Ionicons: require('@expo/vector-icons/Ionicons.ttf'),

    });
  }



  

  renderScreen() {
   

    return <View>
      
    <Home1
        navigation={this.props.navigation}
     ></Home1>

   </View>;
}
  
  render() {
  
  
 
     //navigation.navigate('Home1')
    return (
      <ScrollView >
      
      {
         

        
        this.renderScreen()
        
        
        
        }
     </ScrollView>
       
    
      
    );
  }
}


//*****  build bottom navigator stack mainly:  1.HOME  2. CATEGORY  3. AREA  4.LOGIN  *******///

const HomeStack = createStackNavigator({

  Home: {
    screen: HomeScreen,
   navigationOptions: {
    title: 'Home',    // HEADER DELETE
    
      header: null,       // HEADER DELETE
    
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    }
  },
  Home1: { screen: Home1 },
  HOMEX: { screen: HOMEX },
  NIGHT: { screen: NIGHT , navigationOptions: {
    header: null,

  }},
  SuggestionScreen: { screen: SuggestionScreen },
  SuggestionModify: { screen: SuggestionModify },
  TT: { screen: Travellist , navigationOptions: {
    header: null,

  } },
  TTi: {
    screen: Travelitem,
    navigationOptions: {
      header: null,       // HEADER DELETE
    }
  },
  TTlist: {
    screen: TTlist,
    navigationOptions: {
      header: null,       // HEADER DELETE
    }
  },
  Food: {
    screen: Foodlist,
      navigationOptions: {
        header: null,       // HEADER DELETE
      }
  },
  FOODi: {
    screen: Fooditem,
    navigationOptions: {
      header: null,       // HEADER DELETE
    }
  },
  CLUB: { screen: Clublist , navigationOptions: {
    header: null,
   

  }},
  CLUBEX: { screen: CLUBEX , navigationOptions: {
    header: null,
   

  }},
  FESTIVAL: { screen: FESTIVAL , navigationOptions: {
    header: null,
   

  }},
  FESTIVALEX: { screen: FESTIVALEX , navigationOptions: {
    header: null,
   

  }},
  CONCERT: { screen: CONCERT , navigationOptions: {
    header: null,
   

  }},
  CONCERTEX: { screen: CONCERTEX , navigationOptions: {
    header: null,
   

  }},BUYLIST: { screen: BUYLIST , navigationOptions: {
    header: null,
   

  }},UNDEVELOP: { screen: UNDEVELOP , navigationOptions: {
    header: null,
   

  }}

});

const CategoryStack = createStackNavigator({
  Category: {
    screen: CategoryScreen, navigationOptions: {
      header: null,

    }
  },
  BUS: {
    screen: BUSScreen, navigationOptions: {
      header: null,

    }
  },
  EXCHANGE: {
    screen: EXCHANGE, navigationOptions: {
      header: null,

    }
  },
  TOL: { screen: TOLScreen , navigationOptions: {
    header: null,

  }},
  KORca: { screen: KORcate , navigationOptions: {
    header: null,

  }},
  KOR: { screen: KORScreen , navigationOptions: {
    header: null,

  }},
  KORex: { screen: KOR_explainScreen , navigationOptions: {
    header: null,

  }},  NEWS: { screen: NEWSScreen , navigationOptions: {
    header: null,

  }},
  NEWSS: { screen: NEWSS , navigationOptions: {
    header: null,

  }},

  CULTURE: { screen: CULTUREScreen , navigationOptions: {
    header: null,

  }},
  CUL_EX: { screen: CUL_EX , navigationOptions: {
    header: null,

  }},
  TIP: { screen: TIP , navigationOptions: {
    header: null,

  }},
  TIP_EX: { screen: TIP_EX , navigationOptions: {
    header: null,

  }},

  
  
   TMC: { screen: TMC , navigationOptions: {
    header: null,

  }},
  YS: { screen: YS , navigationOptions: {
    header: null,

  }},
  H221: { screen: H221, navigationOptions: {
    header: null,

  }},
  Red: { screen: Red , navigationOptions: {
    header: null,

  }},
  GREEN: { screen: GREEN , navigationOptions: {
    header: null,

  }},
  BLUE: { screen: BLUE , navigationOptions: {
    header: null,

  }},
  CONTACT: { screen: CONTACT , navigationOptions: {
    header: null,
   

  }},UNDEVELOP1: { screen: UNDEVELOP1 , navigationOptions: {
    header: null,
   

  }}
  

});

const AreaStack = createStackNavigator({
 
  Area: {
    screen: AreaScreen,navigationOptions: {
      header: null,

    }

  },
  Area1: { screen: Area1Screen, navigationOptions: {
    header: null,

  } },

  Area1_1: { screen: Area1_1Screen, navigationOptions: {
    header: null,

  } },
  Area1_2: { screen: Area1_2Screen, navigationOptions: {
    header: null,

  } },
  WTEA1: { screen: WTEA1, navigationOptions: {
    header: null,

  } },



  Area2: { screen: Area2Screen , navigationOptions: {
    header: null,

  } },
  Area2_1: { screen: Area2_1Screen, navigationOptions: {
    header: null,

  } },
  Area2_2: { screen: Area2_2Screen, navigationOptions: {
    header: null,

  } },
  Area3: { screen: Area3Screen , navigationOptions: {
    header: null,

  } },
  Area3_1: { screen: Area3_1Screen, navigationOptions: {
    header: null,

  } },
  Area3_2: { screen: Area3_2Screen, navigationOptions: {
    header: null,

  } },
  Area4: { screen: Area4Screen , navigationOptions: {
    header: null,

  } },
  Area4_1: { screen: Area4_1Screen, navigationOptions: {
    header: null,

  } },
  Area4_2: { screen: Area4_2Screen, navigationOptions: {
    header: null,

  } },
 
  A1WTE:{ screen:A1WTE},
  A1WTD:{ screen:A1WTD,  navigationOptions: {
    header: null,

  }},


});

const LoginStack = createStackNavigator({
  Loginc: {
    screen: Loginc, navigationOptions: {
      header: null,
  
    } },
  Login1: {
    screen: LoginScreen, navigationOptions: {
      header: null,
  
    } },

  SignUp: {
    screen: SignUpScreen, navigationOptions: {
      header: null,
  
    } },
  SignUp1: {
    screen: SignUp1, navigationOptions: {
      header: null,
  
    } },
  SignUp2: {
    screen: SignUp2, navigationOptions: {
      header: null,
  
    } },
  Profile: {
    screen: Profile, navigationOptions: {
      header: null,
  
    } }
});

const SuggestionStack = createStackNavigator({
  SuggestionScreen: { screen: SuggestionScreen },
  SuggestionModify: { screen: SuggestionModify },
});



export default createAppContainer(createBottomTabNavigator(
  {

    Home: { screen: HomeStack, },
    Category: { screen: CategoryStack },

    
    Area: { screen: AreaStack  },
    Login1: { screen: LoginStack },


  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
       
        if (routeName === 'Category'&&focused===true) {
          iconName = require("./assets/more.png");
        }
        if (routeName === 'Category'&&focused===false) {
          iconName = require("./assets/moreg.png");
        }


        if (routeName === 'Home'&&focused===true) {
          iconName = require("./assets/home.png");
        }
        if (routeName === 'Home'&&focused===false) {
          iconName =require("./assets/homeg.png");
        }


        if (routeName === 'Area'&&focused===true) {
          iconName = require("./assets/place_lo.png");
        }
        if (routeName === 'Area'&&focused===false) {
          iconName = require("./assets/placeg.png");
        }


        if (routeName === 'Login1'&&focused===true) {
          iconName = require("./assets/member.png");
        }
        if (routeName === 'Login1'&&focused===false) {
          iconName = require("./assets/memberg.png");
        }
        if (routeName === 'Suggestion') {
          iconName = `ios-contact`;
        }
        return  <Image
        style={{
          width: 30, flex: 1,
          height: 30, alignContent: 'center'
        }}
        tintColor={tintColor}
        resizeMode={'contain'} 
        source={iconName}
       // source={{uri:iconName}}
       
      />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#67DBFF',
      inactiveTintColor: 'gray',
      showLabel:false,
    },
    navigationOptions: {
      tabBarVisible: true,
     
    },
  }
));



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

  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
 // AsyncStorage,
  Modal,
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
} from 'react-navigation-tabs';

import {
  StackViewTransitionConfigs,
  createAppContainer
} from 'react-navigation';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { YellowBox } from 'react-native';
///menu
import Home1 from'./screens_home/Home'
import HOMEX from'./screens_home/Home_ex'
import Travelitem from './screens_travel/Travel_ex'
import TTlist from './screens_travel/Travellist'
import Travellist from './screens_travel/Travel'
//night
import NIGHT from './screens_night/seperate'
import Clublist from './screens_night/nightlife'
import CLUBEX from'./screens_night/club_ex'
import FESTIVAL from'./screens_night/festival'
import FESTIVALEX from'./screens_night/festival_ex'
import CONCERT from'./screens_night/concert'
import CONCERTEX from'./screens_night/concert_ex'

//food
import Foodlist from './screens_food/food'
import Fooditem from './screens_food/food_ex'
//buy&sell
import BUYLIST from './screens_buysell/list'
import WAITLIST from './screens_buysell/waitlist'
import WRITE from './screens_buysell/write'
import ITEM from './screens_buysell/item'
//BOARD
import BOARDLIST from './screens_board/list'
import WRITE_B from './screens_board/write'
import ITEM_B from './screens_board/item'
//suggestion
import SuggestionScreen from './screens_suggestion/suggestionScreen'
import SuggestionModify from './screens_suggestion/suggestionModify'
//contact
import CategoryScreen from './screens_category/categoryscreen'
import CONTACT from './contactus'
import EXCHANGE from './screens_exchange/exchange'
import TOLScreen from './screens_category/TOLscreen'
import KORcate from './screens_korean/KORcate'
import KORScreen from './screens_korean/KORScreen'
import NEWSScreen from './screens_news/news'
import NEWSS from './screens_news/news_ex'
import CULTUREScreen from './screens_culture/culture'
import CUL_EX from './screens_culture/culture_ex'
import TIP from './screens_tips/tips'
import TIP_EX from './screens_tips/tips_ex'
import KOR_explainScreen from './screens_korean/KOR_explain'
//login 
import Loginc from './screens_login/beforelogin'
import LoginScreen from './screens_login/loginscreen'
import LoginModal from './screens_login/login_modal'

//profile
import Profile from './screens_login/afterloginscreen'
import UNDEVELOP from './undeveloped'
import UNDEVELOP1 from './undeveloped1'
import UNDEVELOP2 from './covid'
//bus
import H221 from './screens_bus/area1_h221'
import TMC from './screens_bus/area1_tmc'
import HOVEY from './screens_bus/area1_hovey'
import Red from './screens_bus/area3_red'
import BLUE from './screens_bus/area3_blue'
import GREEN from './screens_bus/area3_green'
import OTHERBUSScreen from './screens_bus/other'
import BUSScreen from './screens_bus/bus'
import TAXI from './screens_bus/taxi'




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
//YellowBox.ignoreWarnings(['Remote debugger']);
//YellowBox.ignoreWarnings(['Failed prop']);
class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false
    }
  }
  
  componentDidMount() {
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
      
  
      <BUSScreen
        navigation={this.props.navigation}
     ></BUSScreen>
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
  Login_first: {
    screen: LoginModal, navigationOptions: {
      header: null,
  
    } },
  H221: { screen: H221, navigationOptions: {
    header: null,

  }},
  TMC: { screen: TMC, navigationOptions: {
    header: null,

  }},
  HOVEY: { screen: HOVEY, navigationOptions: {
    header: null,

  }},
  Red: { screen: Red, navigationOptions: {
    header: null,

  }},
  BLUE: { screen: BLUE, navigationOptions: {
    header: null,

  }},
  GREEN: { screen: GREEN, navigationOptions: {
    header: null,

  }},
  OTHER :{screen:OTHERBUSScreen ,
    navigationOptions: {
      header: null,
  
    }},
    TAXI:{screen:TAXI ,
      navigationOptions: {
        header: null,
    
      }},
  

 
 

});
const MenuStack = createStackNavigator({

  Menu: {
    screen:Home1,
   navigationOptions: {
    title: 'Menu',    // HEADER DELETE
    
      header: null,       // HEADER DELETE
    
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    }
  },

  Home1: { screen: Home1 },
  HOMEX: { screen: HOMEX },


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
  NIGHT: { screen: NIGHT , navigationOptions: {
    header: null,

  }},

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
   

  }},
  UNDEVELOP2: { screen: UNDEVELOP2 , navigationOptions: {
    header: null,
   

  }},

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
  BUYLIST: { screen: BUYLIST , navigationOptions: {
    header: null,
   

  }},
  WAITLIST: { screen: WAITLIST , navigationOptions: {
    header: null,
   

  }},
  
  WRITE: { screen: WRITE , navigationOptions: {
    header: null,
   

  }},ITEM: { screen: ITEM , navigationOptions: {
    header: null,
   

  }},
  BOARDLIST: { screen: BOARDLIST , navigationOptions: {
    header: null,
   

  }},

  
  WRITE_B: { screen: WRITE_B , navigationOptions: {
    header: null,
   

  }},ITEM_B: { screen: ITEM_B , navigationOptions: {
    header: null,
   

  }},
  SuggestionScreen: { screen: SuggestionScreen , navigationOptions: {
    header: null,
   

  }}, 
  SuggestionModify: { screen: SuggestionModify , navigationOptions: {
    header: null,
  }}

});


const CategoryStack = createStackNavigator({
  Category: {
    screen: CategoryScreen, navigationOptions: {
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

  
  
  CONTACT: { screen: CONTACT , navigationOptions: {
    header: null,
   

  }},UNDEVELOP1: { screen: UNDEVELOP1 , navigationOptions: {
    header: null,
   

  }}
  
});


const LoginStack = createStackNavigator({
  Loginc: {
    screen:Loginc, navigationOptions: {
      header: null,
  
    } },
    Login1: {
      screen: LoginScreen, navigationOptions: {
        header: null,
    
      } },
    
  
  
    Profile: {
      screen: Profile, navigationOptions: {
        header: null,
    
      } }
  
});



export default createAppContainer(createBottomTabNavigator(
  {

    Home: { screen: HomeStack, },
    Menu:{ screen: MenuStack, },
    Category: { screen: CategoryStack },

   // Area: { screen: AreaStack  },

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
          iconName = require("./assets/busactive.png");
        }
        if (routeName === 'Home'&&focused===false) {
          iconName =require("./assets/busdisactive.png");
        }

        if (routeName === 'Menu'&&focused===true) {
          iconName = require("./assets/home.png");
        }
        if (routeName === 'Menu'&&focused===false) {
          iconName =require("./assets/homeg.png");
        }


        // if (routeName === 'Area'&&focused===true) {
        //   iconName = require("./assets/place_lo.png");
        // }
        // if (routeName === 'Area'&&focused===false) {
        //   iconName = require("./assets/placeg.png");
        // }


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

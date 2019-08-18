

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
} from 'react-native';

import {
  createStackNavigator,
  StackViewTransitionConfigs,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import { YellowBox } from 'react-native';

import CategoryScreen from './screens_category/categoryscreen'

import TOLScreen from './screens_category/TOLscreen'
import KORcate from './screens_korean/KORcate'
import Fooditem from './screens_food/food_ex'
import Travelitem from './screens_travel/Travel_ex'
import KORScreen from './screens_korean/KORScreen'

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
import EXCHANGE from './screens_exchange/exchange'


import NIGHT from './screens_night/seperate'
import Clublist from './screens_night/nightlife'
import CLUBEX from'./screens_night/club_ex'
import FESTIVAL from'./screens_night/festival'
import FESTIVALEX from'./screens_night/festival_ex'

import { Font } from 'expo'
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
  

  async componentDidMount() {
    await Font.loadAsync({

      'Raley-balck': require('./assets/fonts/33676382891.ttf'),
      'title-font': require('./assets/fonts/BebasNeue-Regular.ttf'),
       'content-font':require('./assets/fonts/Bayon.ttf'),

    });
    this.setState({ fontLoaded: true })
  }
  render() {
    let dimensions = Dimensions.get("window");
    let imageheight = dimensions.height/5;
    let imagewidth = dimensions.width;
     //navigation.navigate('Home1')
    return (
     // <SafeAreaView style={{ flex: 1 }}>
    
       
      <View>
       <Home1
           navigation={this.props.navigation}
        ></Home1>
  
      </View>
      
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
  NIGHT: { screen: NIGHT , navigationOptions: {
    header: null,

  }},
  SuggestionScreen: { screen: SuggestionScreen },
  SuggestionModify: { screen: SuggestionModify },

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
  TOL: { screen: TOLScreen },
  KORca: { screen: KORcate , navigationOptions: {
    header: null,

  }},
  KOR: { screen: KORScreen , navigationOptions: {
    header: null,

  }},
  KORex: { screen: KOR_explainScreen , navigationOptions: {
    header: null,

  }},
  TT: { screen: Travellist , navigationOptions: {
    header: null,

  } },
  TTi: {
    screen: Travelitem,
    navigationOptions: {
      header: null,       // HEADER DELETE
    }
  },
  Food: {
    screen: Foodlist, navigationOptions: {
      title: 'FOOD',
   
      headerTintColor: '#56B8FF',
      headerTitleStyle: {
        fontWeight: 'bold',
      
      },   // HEADER DELETE
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
  TMC: { screen: TMC },
  YS: { screen: YS },
  H221: { screen: H221 },
  Red: { screen: Red },
  GREEN: { screen: GREEN },
  BLUE: { screen: BLUE },
  A1WTE:{ screen:A1WTE},
  A1WTD:{ screen:A1WTD},


});

const LoginStack = createStackNavigator({
  Loginc: {
    screen: Loginc
  },
  Login1: {
    screen: LoginScreen
    , navigationOptions: {
      header: null,




    }

  },

  SignUp: {
    screen: SignUpScreen
  },
  SignUp1: {
    screen: SignUp1
  },
  SignUp2: {
    screen: SignUp2
  },
  Profile: {
    screen: Profile
  }
});

const SuggestionStack = createStackNavigator({
  SuggestionScreen: { screen: SuggestionScreen },
  SuggestionModify: { screen: SuggestionModify },
});



export default createAppContainer(createBottomTabNavigator(
  {

    Home: { screen: HomeStack, },
    Category: { screen: CategoryStack },

    
    Area: { screen: AreaStack },
    Login1: { screen: LoginStack },
   Suggestion: { screen: SuggestionStack },

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
      
        if (routeName === 'Category') {
          iconName = `md-list`;
        }
        if (routeName === 'Home') {
          iconName = `ios-home`;
        }
        if (routeName === 'Area') {
          iconName = `ios-pin`;
        }
        if (routeName === 'Login1') {
          iconName = `ios-contact`;
        }
        if (routeName === 'Suggestion') {
          iconName = `ios-contact`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#56B8FF',
      inactiveTintColor: 'gray',
      showLabel:false,
    },
    navigationOptions: {
      tabBarVisible: true,
     
    },
  }
));

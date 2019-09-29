import React from 'react';

import HelpScreen from '../Screens/Customer/HelpScreen';
import NotificationScreen from '../Screens/Customer/NotificationScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Rate from '../Screens/Rate';
import ProblemScreen from '../Screens/Customer/ProblemScreen';
import HomePage from '../Screens/Customer/HomePage';
import ChatScreen from '../Screens/ChatScreen';
import RequestListPage from '../Screens/Customer/RequestListPage';
import CreateProblem from '../Screens/Customer/CreateProblem';
import Wallet from '../Screens/Customer/Wallet';
import ActivateScreen from '../Screens/ActivateScreen';
import RequestResetPassword from '../Screens/RequestResetPassword';
import ResetPassword from '../Screens/ResetPassword';
import HomePageCraftsman from '../Screens/Craftsman/HomePageCraftsman';
import store from '../store';
import ChatUserScreen from '../Screens/ChatUserScreen';
import {
  TouchableOpacity,
  Icon,
  Platform,
  Dimensions,
  Button,
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  DrawerItems,
  createSwitchNavigator
} from 'react-navigation';

import Login from '../Screens/Login';
import Signup from '../Screens/Signup';

/*logout = (props)=> {
  fetch('https://faheem.zwdmedia.com/api/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + store.getState().token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

      })
      .catch((error) => {
        console.error(error);
      });

  props.navigation.navigate('Login');


};*/
const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1, }}>

    <View style={{
      height: hp('14%'),
      backgroundColor: '#FF9800',

    }}>
      <View style={{marginTop:hp('3%'),}}></View>
      <TouchableOpacity onPress={() => props.navigation.navigate('ProfileScreen')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
             marginLeft:wp('2.5%'),
          }}>
          <Image
            source={{ uri: 'https://faheem.zwdmedia.com/images/' + store.getState().image }}
            style={{
              height: hp('9%'),
              width: wp('15%'),
              borderRadius: wp('70%'),
              resizeMode: 'contain',
            }}
          />
        <Text style={{fontSize: wp('4%'),marginLeft:wp('2%')}}>{store.getState().name}</Text>


        </View>
      </TouchableOpacity>
    </View>

    <ScrollView>
      <DrawerItems {...props} itemStyle={{height:hp('10%'),marginLeft:wp('2%')} } labelStyle={{fontSize:wp('4%'),marginLeft:wp('5%')}}/>
      <TouchableOpacity onPress={()=>{
        fetch('https://faheem.zwdmedia.com/api/logout', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + store.getState().token,
          },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          props.navigation.navigate('Login');

        })
        .catch((error) => {
          console.error(error);
        });


      }} style={{
        flexDirection: 'row', alignItems: 'center',
      }}>
        <Image source={require('../icons/logout.png')} style={{ height: hp('5%'), width: wp('10%'), resizeMode: 'contain',marginLeft:wp('2.5%') }} />
        <Text style={styles.logText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);
const HomePageStack = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    CreateProblem: {
      screen: CreateProblem,
    },
    ProblemScreen: {
      screen: ProblemScreen,
    },
    Rate : {
      screen: Rate,
    }
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image source={require('../icons/home.png')} style={styles.iconNav} />
      ),
    },
  }
);

const RequestListPageStack = createStackNavigator(
  {

    RequestListPage: {
      screen: RequestListPage,
    },
    ProblemScreen: {
      screen: ProblemScreen,
    },


  CreateProblem:{
    screen:CreateProblem
  },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    ChatScreen: {
      screen: ChatScreen,
    },


  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image source={require('../icons/tasks.jpg')} style={styles.iconNav} />
      ),
    },
  }
);

const WalletStack = createStackNavigator(
  {
    Wallet: {
      screen: Wallet,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    ProblemScreen: {
      screen: ProblemScreen,
    },

  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image source={require('../icons/wallet.png')} style={styles.iconNav} />
      ),
    },
  }
);

const ChatUserScreenStack = createStackNavigator({
  ChatUserScreen: {
    screen: ChatUserScreen
  },
  ChatScreen: {
    screen: ChatScreen
  },
  ProfileScreen: {
    screen: ProfileScreen
  },
  ProblemScreen: {
    screen: ProblemScreen,
  },
  Rate : {
    screen: Rate,
  }
},
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image source={require('../icons/chatIcon.png')} style={styles.iconNav} />
      ),
    },
  });

const HelpScreensStack = createStackNavigator(
  {
    HelpScreen: {
      screen: HelpScreen,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    ProblemScreen: {
      screen: ProblemScreen,
    },

  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image source={require('../icons/help.png')} style={styles.iconNav} />
      ),
    },
  }
);
const NotificationScreensStack = createStackNavigator(
  {
    NotificationScreen: {
      screen: NotificationScreen,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    ProblemScreen: {
      screen: ProblemScreen,
    },


  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../icons/notification.png')}
          style={styles.iconNav}
        />
      ),
    },
  }
);
const LoginStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Activate: {
    screen: ActivateScreen
  },
  RequestResetPassword: {
    screen: RequestResetPassword
  },
  ResetPassword: {
    screen: ResetPassword
  }

},
  {
    headerMode: 'none',

  }
);
const DrawerNavigatorCustomer = createDrawerNavigator(
  {
    Home: HomePageStack,
    Problem: RequestListPageStack,
    Chat: ChatUserScreenStack,
    Notification: NotificationScreensStack,
    Help: HelpScreensStack,
  },

  {
    drawerWidth: wp('70%'),
    contentComponent: CustomDrawerComponent,
  }
);

const HomePageCraftsmanStack = createStackNavigator(
  {
    HomePage: {
      screen: HomePageCraftsman,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Image source={require('../icons/home.png')} style={styles.iconNav} />
      ),
    },
  }
);

const DrawerNavigatorCraftsman = createDrawerNavigator(
  {
    Home: HomePageCraftsmanStack,
    Problem: RequestListPageStack,
    Notification: NotificationScreensStack,
    Chat: ChatUserScreenStack
  },

  {
    drawerWidth: wp('70%'),
    contentComponent: CustomDrawerComponent,
  }
);

const styles = StyleSheet.create({
  iconNav: {
    width: wp('10%'),
    height: hp('5%'),
  },
  logText: {
    fontSize: wp('4%'),
    marginLeft: wp('2.5%'),
    fontWeight: 'bold',
    color: 'black'
  },
});
//const LoginContainer = createAppContainer(LoginStack);
//const Root = createAppContainer(DrawerNavigator)

const FinalContainer = createAppContainer(createSwitchNavigator(
  {
    Login: LoginStack,
    Customer: DrawerNavigatorCustomer,
    Craftsman: DrawerNavigatorCraftsman,
  },
  {
    initialRouteName: 'Login',
  }
));
//export {LoginContainer,Root};
export default (FinalContainer);

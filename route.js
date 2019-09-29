import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import RequestListPage from './Screens/RequestListPage';
import ChatScreen from './Screens/ChatScreen';

const my = createStackNavigator({
  RequestListPage: {
    screen: RequestListPage,
    navigationOptions: {
      title: 'First',
    },
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      title: 'Second',
    },
  },
});

const AppNavigator = createAppContainer(my);
export default AppNavigator;

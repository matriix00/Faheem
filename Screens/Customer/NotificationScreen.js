import React, { Component } from 'react';
import { DrawerActions } from 'react-navigation';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import NotificationList from '../../components/NotificationList';
import store from '../../store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
export default class NotificationScreen extends Component {
  state = {
    items:[]
  }

  static navigationOptions = ({ navigation }) => ({
  title: 'Notification',
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Image
        source={require('../../icons/menu.png')}
        style={{height: hp('5%'), width: wp('5%'),marginLeft: wp('5%'), }}
      />
    </TouchableOpacity>
  ),

  headerStyle: {
    backgroundColor: '#FF9800',
    height:hp('10%'),

  },
  headerTitleStyle:{
    fontSize:wp('5%'),
    marginLeft: wp('5%'),


},
  headerTintColor: '#fff',
});


render() {
  return <NotificationList /*items={this.state.items}*/ on={this.props} />;
}

}
const styles = StyleSheet.create({

});

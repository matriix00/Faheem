import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { DrawerActions } from 'react-navigation';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import store from '../../store';
import RequestList from '../../components/RequestList';


export default class RequestListPage extends Component {



    static navigationOptions = ({ navigation }) => ({
      title: 'Request List',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image
            source={require('../../icons/menu.png')}
            style={{ height: hp('5%'), width: wp('5%'),marginLeft: wp('5%'),  }}
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
        return (
            <View>
                <RequestList on={this.props} />
            </View>
        );
    }
}

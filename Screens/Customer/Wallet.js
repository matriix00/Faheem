import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class Wallet extends Component {


    static navigationOptions = ({ navigation }) => ({
      title: 'Wallet',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image
            source={require('../../icons/menu.png')}
            style={{  height: hp('5%'), width: wp('5%'),marginLeft: wp('5%')}}
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
            <View style={style.root}>
                <TouchableOpacity style={style.ch}>
                    <Image
                        style={{ width: wp('20%'), height: hp('8%') }}
                        source={require('../../icons/cash.png')}
                    />
                    <View style={style.textV}>
                        <Text style={style.text}>
                            Cash
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={style.ch}>
                    <Image
                        style={{ width: wp('20%'), height: hp('8%') }}
                        source={require('../../icons/card.png')}
                    />
                    <View style={style.textV}>
                        <Text style={style.text} >
                            Add credit card
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={style.ch}>
                 <Text style={style.use}>
                    use credit card first ( 0 EGP )
                 </Text>
                 <Switch
                    style={style.switch}
                 />
                </View>

            </View>
        );
    }
}

const style = StyleSheet.create({
    root: {
        marginHorizontal: wp('2.8%')
    },
    ch: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: hp('3%'),
        alignItems: 'center',
    },
    textV: {
        justifyContent: 'center',
        marginLeft: wp('3.2%'),
    },
    text: {
        fontSize: wp('5%'),
        color: '#000',
    },
    use: {
        fontSize: wp('4%'),
        color: '#000',
        paddingLeft: wp('2.8%')
    },
    switch: {
        flex: 1,
        marginRight: wp('2.8%'),
        alignItems: 'flex-end',
    }
});

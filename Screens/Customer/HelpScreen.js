import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Icon,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DrawerActions } from 'react-navigation';
const iconLinks = [
  {
    id: 1,
    name: 'facebook',
    link: 'https://www.facebook.com',
  },
  {
    id: 2,
    name: 'twitter',
    link: 'https://www.twitter.com',
  },
  {
    id: 3,
    name: 'instgram',
    link: 'https://www.instgram.com',
  },
  {
    id: 4,
    name: 'whatsapp',
    link: 'https://www.whatsapp.com',
  },
];
export default class HelpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Help',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} activeOpacity={1} >
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
      <View style={styles.container}>
        <View>
          <TouchableOpacity>
            <Text style={styles.reportText}> Report A probem </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.contactText}> Contact Us </Text>
        <Text style={{ fontSize: wp('4.5%'), textAlign: 'center' }}>
          Have a question, feedback or complaint ? Our Team will be happy to
          support you as soon as possible
        </Text>
        <Text style={styles.emailText}> Email Us</Text>

        <View style={styles.imageList}>
          <TouchableOpacity onPress={()=>{Linking.openURL(iconLinks[0].link)}}>
            <Image
              style={styles.imageStyle}
              source={require('../../icons/fb.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{Linking.openURL(iconLinks[1].link)}}>
            <Image
              style={styles.imageStyle}
              source={require('../../icons/tw.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{Linking.openURL(iconLinks[2].link)}}>
            <Image
              style={styles.imageStyle}
              source={require('../../icons/inst.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{Linking.openURL(iconLinks[3].link)}}>
            <Image
              style={styles.imageStyle}
              source={require('../../icons/wh.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ marginLeft: wp('5%'), fontSize: wp('3.2%') }}>
          Copyright © 2010 by Faheem corporation All rights reserved. No part of
          this publication may be reproduced, distributed, or transmitted in any
          form or by any means, including photocopying, recording, or other
          electronic or mechanical methods.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: hp('1%'),
    alignItems: 'center',
   
  },
  reportText: {
    color: 'green',
    fontSize: wp('6%'),
  },
  imageStyle: {
    resizeMode: 'contain',
    height: hp('8%'),
    width: wp('20%'),
    marginLeft: wp('1%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  imageList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1.4%'),
  },
  contactText: {
    marginTop: hp('1%'),
    color: '#999',
    fontSize: wp('6%'),
    marginBottom: hp('1.2%'),
  },
  emailText: {
    marginTop: hp('1%'),
    color: 'green',
    fontSize: wp('6%'),
    marginBottom: hp('1.2%'),
  },
});

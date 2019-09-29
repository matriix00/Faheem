import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { DrawerActions,withNavigation } from 'react-navigation';

import Star from 'react-native-star-view';
import store from '../store';
 class  ReplyItem extends Component {
  beginChat = (id,bid_id,craftName,craftImage) =>{
    let obj = {}
    obj.id=id;
    obj.bid_id=bid_id;
    console.log(obj)
    fetch('https://faheem.zwdmedia.com/api/projects/assign-provider', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + store.getState().token,
        },
        body: JSON.stringify(obj),
        
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        alert(responseJson.status);
        if(responseJson.status === "success"){
          this.props.navigation.navigate('ChatScreen',
          {
            idChat:responseJson.data.id,
            idSender:responseJson.data.client_id,
            idReciever:responseJson.data.provider_id,
            name:craftName,
            image:craftImage
          })
        }
      })
      .catch((error) => {
       console.error(error);
      });
  }
  
  render() {
    const { craftName, craftImage, rating, money, period,id ,bid_id} = this.props;
    const starStyle = {
      width: wp('36%'),
      height: hp('4%'),
      marginTop: hp('1%'),
      marginLeft: wp('2.8%'),
    };
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginTop: hp('0.5%'), }}>
          <Image source={{uri:'https://faheem.zwdmedia.com/images/'+craftImage}} style={styles.profile} />
          <Text style={styles.profileName}>{craftName} </Text>
          <Star score={rating} style={starStyle} />
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={()=>this.beginChat(id,bid_id,craftName,craftImage)}>
            <Image
              source={require('../icons/apply.png')}
              style={styles.applyicon}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: hp('2%') }}>
          <Image source={require('../icons/dollar.png')} style={styles.icon} />
          <Text style={styles.textStyle}>{money} </Text>
          <Image source={require('../icons/clock.png')} style={styles.icon} />
          <Text style={styles.textStyle}>{period}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: hp('1.5%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
  },
  icon: {
    width: wp('5%'),
    height: hp('3%'),
    marginLeft: wp('2.8%'),
    
  },
  profile: {
    width: wp('13.55%'),
    height: hp('7.66%'),
    resizeMode: 'contain',
  },
  applyicon: {
    width: wp('13%'),
    height: hp('8%'),
  },
  textStyle: {
    fontSize: wp('3%'),
    marginLeft:wp('2.8%'),
   
  },
  profileName: {
    fontSize: wp('3.1%'),
    marginLeft: wp('2.8%'),
    marginTop: hp('2.8%'),
  },
});
export default withNavigation(ReplyItem);
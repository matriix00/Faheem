import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import store from '../store';
const keyExtractor = ({ id }) => id.toString();



export default class Rate extends Component {
  static navigationOptions = ({ navigation }) => ({

    title: `Rate`,
    headerLeft: (
      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../icons/arrowback.png')}
            style={{height: hp('5%'), width: wp('5%'),marginLeft: wp('5%'),borderRadius: wp('80%')}}
          />
        </TouchableOpacity>
      </View>
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

  constructor(props){
    super(props);
    this.state={
      rate : '0',
      price: props.navigation.state.params.price,
      id: props.navigation.state.params.id,
    };
  }
  renderItem = ({ item  }) => {
    return (
      <TouchableOpacity onPress={()=>{this.setState({rate:item.id})}} activeOpacity={1} style={{width: wp('15%'),height: hp('9%')}}>
        { this.state.rate<item.id && <Image style={{width: wp('15%'),height: hp('9%')}} source={require('../icons/star-gray.png')} /> }
        { this.state.rate>=item.id && <Image style={{width: wp('15%'),height: hp('9%')}} source={require('../icons/star-yellow.png')} /> }
      </TouchableOpacity>
    );
  }

  submit =()=>{
    var obj= {};
    obj.project = 2;
    obj.value = this.state.rate;
    console.log("TEST : ",obj);
    fetch('https://faheem.zwdmedia.com/api/profile/rate',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + store.getState().token,
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.props.navigation.navigate('Home');
    }).catch((error) => {
      console.log(error);
      alert('Check your network and try again.');

    })
  }

  render() {
    const ids = [
      {
        id:1
      },
      {
        id:2
      },
      {
        id:3
      },
      {
        id:4
      },
      {
        id:5
      },
    ];
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textSz}>Price : {this.state.price}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textSz}>Rate the Provider : </Text>
        </View>
        <FlatList
          data={ids}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
          horizontal={true}
        />
      <View style={{flex: 1,alignItems: 'center'}}>
          <TouchableOpacity style={styles.buttonBid}  activeOpacity={1} onPress={this.submit}>
             <Text style={styles.buttonTextBid} >
               submit
             </Text>
           </TouchableOpacity>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSz: {
    fontSize: wp('8%'),
    color: 'black',
  },
  textContainer: {
    marginTop: hp('10%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
  },
  buttonBid: {
    width: wp('70%'),
    backgroundColor: '#25e507',
    borderRadius: 25,
    marginVertical: hp('.5%'),
    paddingVertical: hp('1.8%'),
    marginHorizontal: wp('3%'),
  },
  buttonTextBid: {
    fontSize: wp('5%'),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

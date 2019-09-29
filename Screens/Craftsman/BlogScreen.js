import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BoxShadow } from 'react-native-shadow'
import Slideshow from 'react-native-image-slider-show';
import store from '../../store';
import Spinner from 'react-native-loading-spinner-overlay';

export default class BlogScreen extends Component {
    constructor(props) {
      super(props);

      this.state = {
          id: this.props.id,
          name: this.props.name,
          problem: this.props.problem,
          clientAvatar: this.props.clientAvatar,
          address: '10th of ramadan',
          bid: false,
          money: '',
          description: '',
          submitted: false,
          token: store.getState().token,
          spinner: false,
      };
    }

    Submit = () => {
      console.log("submit");
      this.setState({ spinner: true });

        var obj = {}
        obj.id = this.state.id;
        obj.description = this.state.description;
        obj.price = this.state.money;
        fetch('https://faheem.zwdmedia.com/api/projects/submit-bid',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
          },
          body: JSON.stringify(obj),
        }).then((response)=> response.json())
        .then((responseJson)=>{
          this.setState({ spinner: false });

          // console.log(responseJson);
          if (responseJson.status==="success") {
            this.setState({submitted: true})
          }else {
           // print error or required
          }
        }).catch((error)=>{
          console.log(error);
          alert('Check your network and try again.');
          this.setState({ spinner: false });


        })
    }

    Cancell = () => {
        this.setState({ money: '', time: '', bid:false });
    }

    Bid = () => {
        this.setState({bid:true});
    }

    ASK = () => {

    }
    render() {
      // console.log("Avatar : ",this.state.clientAvatar);
       return (
          <View style={{flex: 1}}>
            { this.state.spinner &&
              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />

            }
            {!this.state.submitted && <View style={styles.container}>
              <View style={styles.child}>
                  <Image style={styles.avatar} source={{uri : 'https://faheem.zwdmedia.com/images/' + this.state.clientAvatar }} />
                  <View style={styles.txtContainer}>
                      <Text style={{ fontSize: wp('5%') }}>{this.state.name}</Text>
                  </View>
              </View>
              <View style={styles.childContainer}>
                      <Text style={styles.type}>Problem : </Text>
                  <Text style={styles.problemTxt}>{this.state.problem}</Text>
              </View>
              {this.state.bid &&
                  <View>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

                      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <View style={styles.bidRow}>
                            <TextInput
                                placeholder='Enter Yout option'
                                placeholderTextColor="#002f6c"
                                selectionColor="#fff"
                                underlineColorAndroid="rgba(0,0,0,0)"
                                onChangeText={(description) => this.setState({description:description})}
                                value={this.state.description}
                                style={styles.bidInput}
                            />
                        </View>
                        <View style={styles.bidRow}>
                          <Image style={styles.bidIcon} source={require('../../icons/dollar.png')}/>
                          <TextInput
                            placeholder='0'
                            placeholderTextColor="#002f6c"
                            selectionColor="#fff"
                            underlineColorAndroid="rgba(0,0,0,0)"
                            keyboardType="numeric"
                            onChangeText={(money) => this.setState({money:money})}
                            value={this.state.money}
                            style={styles.bidInput}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.submit}>
                           <Text style={styles.buttonTextBid} onPress={this.Submit}>
                             Submit
                           </Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.cancell} onPress={this.Cancell} >
                            <Text style={styles.cancellTxt} >
                              Cancell
                            </Text>
                          </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>

                </View>
            }
             {!this.state.bid && <View style={{ flexDirection: 'row' }}>
                  <View style={{flex: 1,alignItems: 'center'}}>
                    <TouchableOpacity style={styles.buttonBid}>
                       <Text style={styles.buttonTextBid} onPress={this.Bid}>
                         Bid
                       </Text>
                     </TouchableOpacity>
                   </View>
              </View>}
            </View>}
          </View>
       );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    marginHorizontal: wp('1%'),
    marginVertical: hp('2%'),
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    borderWidth: .01

  },
  child: {
      flexDirection: 'row',
      paddingBottom: hp('1.5%'),
      borderBottomWidth: 1
  },
  avatar: {
      width: wp('14%'),
      height: hp('7%'),
      borderRadius: 100
  },
  ask: {
      width: wp('10.5%'),
      height: hp('6%'),
  },
  askContainer: {
      flex: 1,
      paddingVertical: hp('.9%'),
      alignItems: 'flex-end',
  },
  txtContainer: {
      marginHorizontal: wp('3%'),
      paddingVertical: hp('1.3%'),
  },
  problemTxt: {
      fontSize: wp('4%'),
      color: 'black',
      flex: 1,
  },
  type: {
      fontSize: wp('4%'),
      color: 'blue'
  },
  childContainer: {
      flexDirection: 'row',
      marginVertical: hp('1%'),
  },
  img: {
      width: wp('90%'),
      height: hp('20%'),
  },
  imgContainer: {
      flexWrap: 'wrap',
      marginVertical: wp('5%'),

  },
  buttonBid: {
    width: wp('60%'),
    backgroundColor: '#25e507',
    borderRadius: 25,
    marginVertical: hp('.5%'),
    paddingVertical: hp('1.8%'),
    marginHorizontal: wp('3%'),
  },
  buttonAsk: {
    width: wp('40%'),
    backgroundColor: '#FFF552',
    borderRadius: 25,
    marginVertical: hp('.5%'),
    paddingVertical: hp('2%'),
    marginHorizontal: wp('3%'),
  },
  buttonTextBid: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonTextAsk: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: 'blue',
    textAlign: 'center',
  },
  bidIcon: {
      width: wp('12.5%'),
      height: hp('7%'),
      margin: wp('.5%')
  },
  bidRow: {
      marginHorizontal: wp('5%'),
      marginVertical: hp('1%'),
      flexDirection: 'row',
      borderWidth: 0.5,
      borderRadius: 7,
      borderColor: '#ADADAD'
  },
  bidInput: {
      borderColor: '#ADADAD',
      paddingLeft: wp('3%'),
      height: hp('6%'),
      fontSize: wp('4%'),
      borderLeftWidth: 1,
      flex: 1,
  },
  cancell: {
    width: wp('40%'),
    backgroundColor: '#F54C4C',
    borderRadius: 25,
    marginVertical: hp('.5%'),
    paddingVertical: hp('2%'),
    marginHorizontal: wp('3%'),
  },
  submit: {
    width: wp('40%'),
    backgroundColor: '#25e507',
    borderRadius: 25,
    marginVertical: hp('.5%'),
    paddingVertical: hp('2%'),
    marginHorizontal: wp('3%'),
  },
  cancellTxt: {
      fontSize: wp('4%'),
      fontWeight: '500',
      color: '#FFF',
      textAlign: 'center',
  }
});

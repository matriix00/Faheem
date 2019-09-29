import React, { Component } from 'react';
import { StyleSheet,
     View,
     Text,
     Keyboard,
     Image,
     TouchableOpacity,
     TextInput,
     KeyboardAvoidingView,
     ActivityIndicator,
  } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class RequestResetPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        loading: false,
      };
    }

    saveData = async () => {
      this.setState({ loading: true });
      Keyboard.dismiss();
      let obj = {}
      obj.email = this.state.email;
      console.log(obj);
      console.log(obj);
      fetch('https://faheem.zwdmedia.com/api/password/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false });
        console.log(responseJson);
        if (responseJson.status === 'success') {
            alert('Check your Email, We have e-mailed your password reset link!');
            this.props.navigation.navigate('ResetPassword',{email : this.state.email});
        }else {
            alert('cant find your email !');
        }
      })
      .catch((error) => {
        console.error(error);
      });

    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                { this.state.loading && <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ fontSize: wp('7%')}}>loading</Text>
                </View>

                }
                { !this.state.loading &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginBottom: hp('2%') }}>
                             <Text style={{ fontSize: wp('6%') }}>Enter your Email</Text>
                        </View>

                        <KeyboardAvoidingView behavior="padding">
                            <TextInput
                              style={styles.inputBox}
                              onChangeText={email => this.setState({ email })}
                              underlineColorAndroid="rgba(0,0,0,0)"
                              placeholder="Enter your Email"
                              placeholderTextColor="#002f6c"
                              selectionColor="#fff"
                              keyboardType="email-address"
                            />
                            <TouchableOpacity style={styles.button}>
                               <Text style={styles.buttonText} onPress={this.saveData}>
                                 reset
                               </Text>
                             </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
  inputBox: {
    width: wp('75%'),
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: wp('5%'),
    fontSize: wp('4%'),
    color: '#002f6c',
    marginVertical: hp('1%'),
    },
    button: {
      width: wp('75%'),
      backgroundColor: '#4f83cc',
      borderRadius: 35,
      marginVertical: hp('1.5%'),
      paddingVertical: hp('2%'),
    },
    buttonText: {
      fontSize: wp('4%'),
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center',
    },
});

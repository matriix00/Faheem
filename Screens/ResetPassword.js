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

export default class ResetPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        token: '',
        password: '',
        confirmPassword: '',
        loading: false,
      };
    }

    saveData = async () => {
      this.setState({ loading: true });
      Keyboard.dismiss();
      let obj = {};
      obj.email = this.props.navigation.getParam('email','No');
      obj.password = this.state.password;
      obj.password_confirmation  = this.state.confirmPassword;
      obj.token= this.state.token;

      console.log(obj);
      fetch('https://faheem.zwdmedia.com/api/password/reset', {
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
            alert('Your Password is Changed , Now you can Login with new password');
            this.props.navigation.navigate('Login');
        }else {
            alert('cant cnange your password , please check you token again !');
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
                        <View style={{ marginBottom: hp('3%') }}>
                             <Text style={{ fontSize: wp('5%') }}>Change Your Password</Text>
                        </View>

                        <KeyboardAvoidingView behavior="padding">
                            <TextInput
                              style={styles.inputBox}
                              onChangeText={token => this.setState({ token })}
                              underlineColorAndroid="rgba(0,0,0,0)"
                              placeholder="Enter your Token"
                              placeholderTextColor="#002f6c"
                              selectionColor="#fff"
                              keyboardType="email-address"
                            />
                            <TextInput
                              style={styles.inputBox}
                              onChangeText={password => this.setState({ password })}
                              underlineColorAndroid="rgba(0,0,0,0)"
                              placeholder="password"
                              placeholderTextColor="#002f6c"
                              selectionColor="#fff"
                            />
                            <TextInput
                              style={styles.inputBox}
                              onChangeText={confirmPassword => this.setState({ confirmPassword })}
                              underlineColorAndroid="rgba(0,0,0,0)"
                              placeholder="confirm password"
                              placeholderTextColor="#002f6c"
                              selectionColor="#fff"
                            />
                            <TouchableOpacity style={styles.button}>
                               <Text style={styles.buttonText} onPress={this.saveData}>
                                 Change
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
    paddingHorizontal: wp('4%'),
    fontSize: wp('4%'),
    color: '#002f6c',
    marginVertical: hp('.9%'),
    },
    button: {
      width: wp('75%'),
      backgroundColor: '#4f83cc',
      borderRadius: 25,
      marginVertical: hp('2%'),
      paddingVertical: hp('2%'),
    },
    buttonText: {
      fontSize: wp('4%'),
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center',
    },
});

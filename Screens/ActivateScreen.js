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

export default class ActivateScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        loading: false,
      };
    }

    saveData = async () => {
      this.setState({ loading: true });
      Keyboard.dismiss();
      let obj = {}
      obj.token = this.state.token;
      console.log(obj);
      fetch('https://faheem.zwdmedia.com/api/user/activate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loading: false });
        console.log(responseJson)
        if (responseJson.status === 'success') {
            alert('Thank you for verifying your email, Your account is ready for login.');
            this.props.navigation.navigate('Login');
        }else {
            alert('cant validate your account , please check you token again !');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Check your network and try again.');

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
                             <Text style={{ fontSize: wp('5.5%') }}>Enter token to validate your account</Text>
                        </View>

                        <KeyboardAvoidingView behavior="padding">
                            <TextInput
                              style={styles.inputBox}
                              onChangeText={token => this.setState({ token })}
                              underlineColorAndroid="rgba(0,0,0,0)"
                              placeholder="token"
                              placeholderTextColor="#002f6c"
                              selectionColor="#fff"
                            />
                            <TouchableOpacity style={styles.button}>
                               <Text style={styles.buttonText} onPress={this.saveData}>
                                 Validate
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
    marginVertical: hp('1.5%'),
    },
    button: {
      width: wp('75%'),
      backgroundColor: '#4f83cc',
      borderRadius: 25,
      marginVertical: wp('1.5$'),
      paddingVertical: wp('3.5%'),
    },
    buttonText: {
      fontSize: wp('4%'),
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center',
    },
});

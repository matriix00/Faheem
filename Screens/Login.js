import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import store from '../store';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hidePassword: true,
      logged: false,
      spinner: false,
    };

  }


  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  saveData = async () => {
    console.log("TTT");

    this.setState({ spinner: true });
    Keyboard.dismiss();
    let obj = {}
    obj.email = this.state.email;
    obj.password = this.state.password;
    fetch('https://faheem.zwdmedia.com/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.status === 'success') {
          store.setState({token: responseJson.data.token,type: responseJson.data.type});
          console.log(responseJson.data.token);
          console.log(responseJson.data.type);
          fetch('https://faheem.zwdmedia.com/api/details',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  responseJson.data.token,
            },
          }).then((response2) => response2.json())
          .then((responseJson2) => {
            console.log(responseJson2);
            store.setState({name: responseJson2.data['0'].name,image: responseJson2.data['0'].image,id: responseJson2.data['0'].id});
            if (responseJson.data.type === 'client') {
              this.props.navigation.navigate('Customer');
            }else if (responseJson.data.type === 'provider') {
              this.props.navigation.navigate('Craftsman');
            }
            // store.setState({name})
          }).catch((error)=>{
            console.log(error);
            this.setState({ spinner: false });

          })
        } else if (responseJson.status === 'error') {
          this.setState({ spinner: false });
          alert('invalid email or password');
        }
    })
    .catch((error) => {
      console.error(error);
      alert('Check your network and try again.');
      this.setState({spinner:false});
    });
  };

  showData = async () => {
    let loginDetails = await AsyncStorage.getItem('loginDetails');
    let ld = JSON.parse(loginDetails);
    alert(
      'email : ' + ld.email + ' ' + 'password: ' + ld.password
    );
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerStyle: { backgroundColor: '#1565c0' },
    headerTintColor: '#fff',
  });
  SignupPressed = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          { this.state.spinner &&
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          }
          <KeyboardAvoidingView
            style={styles.container}
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <Image
              source={require('../icons/logo.jpg')}
              style={{ height: hp('40%'), width: wp('60%') }}
            />
            <View style={styles.containerForm}>
              <TextInput
                style={styles.inputBox}
                onChangeText={email => this.setState({ email })}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Enter your email"
                placeholderTextColor="#002f6c"
                selectionColor="#fff"
                keyboardType="email-address"
                returnKeyType={'done'}
                onSubmitEditing={() => this.password.focus()}
              />
              <View style={{ position: 'relative',
                  alignSelf: 'stretch',
                  justifyContent: 'center'}}>
                <TextInput
                  style={styles.inputBox}
                  onChangeText={password => this.setState({ password })}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Password"
                  secureTextEntry={this.state.hidePassword}
                  placeholderTextColor="#002f6c"
                  ref={input => (this.password = input)}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={this.managePasswordVisibility}>
                  <Image
                    source={
                      this.state.hidePassword
                        ? require('../icons/hide.png')
                        : require('../icons/show.png')
                    }
                    style={styles.btnImage}
                  />
                </TouchableOpacity>

                <View>
                  <TouchableOpacity style={{marginLeft: wp('4%'),paddingVertical: hp('.5%')}} onPress={() => this.props.navigation.navigate('RequestResetPassword')}>
                    <Text style={{fontSize: wp('3.5%')}}>Forget Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={this.saveData}>
                <Text style={styles.buttonText} >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Dont have an account yet? </Text>
              <TouchableOpacity onPress={this.SignupPressed}>
                <Text style={styles.signupButton}>Signup</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupTextCont: {
    justifyContent: 'center',
    paddingVertical: hp('1%'),
    flexDirection: 'row',
  },
  signupText: {
    color: '#12799f',
    fontSize: wp('4%'),
  },
  signupButton: {
    color: '#12799f',
    fontSize: wp('3.7%'),
    fontWeight: '500',
  },
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
    borderRadius: 25,
    marginVertical: hp('1%'),
    paddingVertical: hp('2%'),
  },
  buttonText: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  visibilityBtn: {
    position: 'absolute',
    right: wp('4%'),
    top:hp('1.5%'),
    height: hp('6%'),
    width: wp('9%'),
    paddingVertical: hp('.8%'),
    paddingHorizontal: wp('1%')
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  spinnerTextStyle: {
  color: '#FFF'
  },
});

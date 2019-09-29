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
  Picker,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';

const RadioOptions = [
  {
    key: '1',
    text: 'craftsmen',
  },
  {
    key: '2',
    text: 'customer',
  },
];
import RadioButton from '../components/RadioButton';



export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPass: '',
      option: '',
      serviceId: '',
      type:'',
      loading: false,
      options:[],
      index:'',
      spinner: false,
    };
    let obj = {};

    fetch('https://faheem.zwdmedia.com/api/jobs',{
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then( (responseJson) => {
      console.log(responseJson);
        this.setState({

          options: responseJson,

        });
        console.log(this.state.options);


    }).catch((error) =>{
      console.log(error);
      alert('Check your network and try again.');
    })
  }
  changeOpthion = (val) => {
      this.setState({ type: val });
  }
  handleSubmit = () => {
    const { password, confirmPass } = this.state;
    // perform all neccassary validations
    if (password !== confirmPass) {
        alert(password + " " + confirmPass );
    } else {
        // make API call
    }
}
  saveData = async () => {
    this.setState({ spinner: true });

    Keyboard.dismiss();
    let obj = {}
    obj.name = this.state.name;
    obj.email = this.state.email;
    obj.phone = this.state.phoneNumber;
    obj.password = this.state.password;
    obj.password_confirmation = this.state.confirmPass;
    obj.type = this.state.type;
    if(this.state.type == "craftsmen"){
      obj.job = this.state.option+1;
      console.log(obj.job+"  sadsadasdas  "+ this.state.index);
    }
    console.log(obj);
    fetch('https://faheem.zwdmedia.com/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({spinner:false});
      console.log(responseJson);
      if (responseJson.status === 'success') {
          this.props.navigation.navigate('Activate');
      } else {
          alert(responseJson.status);
          console.log(responseJson.error);
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Check your network and try again.');
      this.setState({spinner:false});
    });
  };

  static navigationOptions = ({ navigation }) => ( {
    title: 'Signup',
    headerStyle: { backgroundColor: '#1565c0' },
    headerTintColor: '#fff',
  });

  SignupPressed = () => {
    this.props.navigation.goBack();
  };

  render() {
    var options = ['plumber', 'carpenter', 'dustman', 'oyster'];
    return (
      <View style={styles.container}>

        { this.state.spinner &&
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />

        }
            <View>
                <View style={{alignItems:  'center'}}>
                  <Image
                    source={require('../icons/logo.jpg')}
                    style={{ height: hp('20%'), width: wp('40%') }}
                  />
                </View>
                <View style={styles.containerForm}>
                <KeyboardAvoidingView behavior="padding">
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={name => this.setState({ name })}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      placeholder="Name"
                      placeholderTextColor="#002f6c"
                      selectionColor="#fff"
                      keyboardType="default"
                      onSubmitEditing={() => this.email.focus()}
                    />
                  </KeyboardAvoidingView>

                  <KeyboardAvoidingView behavior="padding">
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={email => this.setState({ email })}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      placeholder="Email"
                      placeholderTextColor="#002f6c"
                      selectionColor="#fff"
                      keyboardType="email-address"
                      ref={input => (this.email = input)}
                      onSubmitEditing={() => this.password.focus()}
                    />
                  </KeyboardAvoidingView>

                  <KeyboardAvoidingView behavior="padding">
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={phoneNumber => this.setState({ phoneNumber })}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      placeholder="phone Number"
                      placeholderTextColor="#002f6c"
                      selectionColor="#fff"
                      keyboardType="phone-pad"
                      ref={input => (this.phoneNumber = input)}
                      returnKeyType={'done'}
                    />
                  </KeyboardAvoidingView>

                  <KeyboardAvoidingView behavior="padding">
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={password => this.setState({ password })}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      placeholder="Password"
                      secureTextEntry={true}
                      placeholderTextColor="#002f6c"
                      onSubmitEditing={() => this.confirm.focus()}
                      ref={input => (this.password = input)}
                    />
                  </KeyboardAvoidingView>


                  <KeyboardAvoidingView behavior="padding">
                    <TextInput
                      style={styles.inputBox}
                      onChangeText={confirmPass => this.setState({ confirmPass })}
                      underlineColorAndroid="rgba(0,0,0,0)"
                      placeholder="Confirm Password"
                      secureTextEntry={true}
                      placeholderTextColor="#002f6c"
                      onSubmitEditing={() => this.phoneNumber.focus()}
                      onEndEditing={this.handleSubmit}
                      ref={input => (this.confirm = input)}
                    />
                  </KeyboardAvoidingView>

                  <RadioButton option={RadioOptions} changeOpthion={this.changeOpthion} />

                  <View style={{alignItems: 'center'}}>

                  { this.state.type === 'craftsmen' &&
                      <Picker
                        selectedValue={this.state.option}
                        style={{ height: hp('6%'), width: wp('40%'), }}
                        onValueChange={(itemValue,index) =>
                          this.setState({ option: itemValue,index:index })
                        }>
                        {this.state.options.map((item, index) => {
                          return <Picker.Item label={item.title} value={index} key={index} />;
                        })}
                      </Picker>
                  }

                </View>
                 <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.saveData}>
                      Signup
                    </Text>
                  </TouchableOpacity>
                 </View>
                 <View style={styles.signupTextCont}>
                   <Text style={styles.signupText}>Already have an account? </Text>
                   <TouchableOpacity onPress={this.SignupPressed /*this.goBack*/}>
                     <Text style={styles.signupButton}>Sign in</Text>
                   </TouchableOpacity>
                 </View>
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
    backgroundColor: 'white',
  },
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupTextCont: {
    justifyContent: 'center',
    paddingVertical: wp('4%'),
    flexDirection: 'row',
  },
  signupText: {
    color: '#12799f',
    fontSize: wp('4%'),
  },
  signupButton: {
    color: '#12799f',
    fontSize: wp('4.5%'),
    fontWeight: '500',
  },
  inputBox: {
    width: wp('75%'),
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: wp('5%'),
    fontSize: wp('4.5%'),
    color: '#002f6c',
    marginVertical: hp('.7%'),
  },
  button: {
    width: wp('75%'),
    backgroundColor: '#4f83cc',
    borderRadius: 25,
    marginVertical: hp('1.2%'),
    paddingVertical: hp('2%'),
  },
  buttonText: {
    fontSize: wp('4.5%'),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },

});

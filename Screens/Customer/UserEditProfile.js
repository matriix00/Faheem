import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import Star from 'react-native-star-view';
import store from '../../store';
export default class UserEditProfile extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#FF9800',
    },
    headerTintColor: '#fff',
  });

  state = {
       sourc:"",
       rate: 5,
       intialName: 'Mina Maher',
       name: 'Mina Maher',
       email: 'provider@provider.com',
       intialEmail: 'provider@provider.com',
       phone: '01010101010',
       Profession: 'Customer',
       changed: false,
       profileUpdate:[],
       loading:false,
       image:'',
       type:'',


  }

  updateData= async() => {
    let obj = {}
    obj.name = this.state.name;
    obj.email = this.state.email;
    obj.phone = this.state.phone;
    obj.image = this.state.image;


    console.log(this.state.image);
    fetch('https://faheem.zwdmedia.com/api/update-user', {
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

      if (responseJson.status === 'success') {
         this.setState({loading:true})
      }
      alert(this.state.loading);
    })
    .catch((error) => {
      console.error(error);
      alert('Check your network and try again.');

    });

    if(this.state.loading === true){
      alert("data updated");

    }else{
      alert("data wasnt updated");
    }
  };

  handleChoosePhoto = () => {
      const options = {
        noData: true,
      }
      ImagePicker.launchImageLibrary(options, response => {
        console.log( response);

        if (response.uri) {
          this.setState({ sourc: { uri: response.uri }, image:response.fileName,type:response.type });
          this.setState({changed:true});
        }
      })
  };


  componentWillMount(){
    fetch('https://faheem.zwdmedia.com/api/details', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + store.getState().token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({profileUpdate : responseJson })
       console.log(this.state.profileUpdate.data[0].name);
       this.setState({name:this.state.profileUpdate.data[0].name,email:this.state.profileUpdate.data[0].email,phone:this.state.profileUpdate.data[0].phone,image:this.state.profileUpdate.data[0].image})

      })
      .catch((error) => {
        console.error(error);
        alert('Check your network and try again.');

      });
  }


  saveData = async () => {

  };

  render() {
    const starStyle = {
      width: wp('50%'),
      height: hp('5.5%'),
      marginLeft: wp('2'),
    };
    return (
      <ScrollView>
      <View style={styles.container}>
          <Image style={{width: wp('100%'), height: hp('35%')}} source={this.state.sourc+this.state.image} />
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={this.handleChoosePhoto}
            >
            <Image
              source={require('../../icons/floatingButton2.png')}
              style={styles.floatingStyle}
            />
          </TouchableOpacity>
          <View style={styles.childContainer}>
            <KeyboardAvoidingView behavior="padding">
            <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>

              <Text style={{ fontSize: wp('4%'), color: 'black', width: wp('25%'), paddingVertical: hp('1.5%')}}>Name : </Text>
              <View style={{ flex: 1, alignItems: 'center', width: wp('75%') }}>
                <TextInput
                  style={styles.inputBox}
                  onChangeText={name => {
                    this.setState({ name });
                    if (this.state.intialName !== this.state.name){
                      this.setState({changed:true});
                    }
                  }}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Enter your email"
                  placeholderTextColor="#002f6c"
                  returnKeyType={'done'}
                  containerStyle={{ flexGrow: 1 }}
                  value={this.state.name}
                />
              </View>
            </View>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior="padding">
            <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
              <Text style={{ fontSize: wp('4%'), color: 'black', width: wp('25%'), paddingVertical: hp('1.5%') }}>Email : </Text>
              <View style={{ flex: 1, alignItems: 'center', width: wp('75%') }}>
                <TextInput
                  style={styles.inputBox}
                  onChangeText={email => {
                     this.setState({ email });
                     if (this.state.intialEmail !== this.state.email) {
                       this.setState({changed:true});
                     }
                   }
                  }
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Enter your email"
                  placeholderTextColor="#002f6c"
                  containerStyle={{ flexGrow: 1 }}
                  value={this.state.email}
                />
              </View>
            </View>
          </KeyboardAvoidingView>

            <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
              <Text style={{ fontSize: wp('4%'), color: 'black', width: wp('25%'), }}>Phone : </Text>
              <View style={{ flex: 1, alignItems: 'center', width: wp('75%') }}>
                <Text style={{ fontSize: wp('4%'), color: 'black' }}>{this.state.phone}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
              <Text style={{ fontSize: wp('4%'), color: 'black', width: wp('25%'), }}>Profession : </Text>
              <View style={{ flex: 1, alignItems: 'center', width: wp('75%') }}>
                <Text style={{ fontSize: wp('4%'), color: 'black' }}>{this.state.Profession}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: hp('1.5%') }}>
              <Text style={{ fontSize: wp('4%'), color: 'black', width: wp('25%'), paddingVertical: hp('1.5%') }}>Rate : </Text>
              <View style={{ flex: 1, alignItems: 'center', width: wp('75%') }}>
                <Star score={this.state.rate} style={starStyle} />
              </View>
            </View>
          </View>
          { this.state.changed &&
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={this.updateData}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          }
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBox: {

    width: wp('60%'),
    backgroundColor: '#eeeeee',
    borderRadius: 25,
    paddingHorizontal: wp('2%'),
    fontSize: wp('4%'),
    paddingVertical: hp('1%'),
    color: '#002f6c',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlignVertical: 'top'
  },
  childContainer: {
      marginVertical: hp('3%'),
      marginHorizontal: wp('5%')
  },
  floatingStyle: {
    width: wp('15%'),
    height: hp('8.2%'),
    marginTop: -hp('4.1%'),
  },
  button: {
    width: wp('70%'),
    backgroundColor: '#4f83cc',
    borderRadius: 25,
    marginVertical: hp('1%'),
    paddingVertical: wp('3'),
  },
  buttonText: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

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
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import Star from 'react-native-star-view';
import store from '../store';
import Spinner from 'react-native-loading-spinner-overlay';


const createFormData = (photo) => {
  const data = new FormData();

  data.append("image", {
    name: photo.fileName,
    type: photo.type,
    uri:
    Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });


  return data;
};

export default class ProfileScreenCraftsman extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../icons/arrowback.png')}
          style={{ height: hp('5%'), width: wp('5%'),marginLeft: wp('5%'), }}
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

  constructor(props) {
    super(props);

    this.state = {
      sourc: '',
      rate: 0,
      id: '',
      intialName: '',
      name: '',
      email: '',
      intialEmail: '',
      phone: '',
      Profession: '',
      changed: false,
      token: store.getState().token,
      type:store.getState().type,
      spinner: true,

    };
    var obj ={}
    fetch('https://faheem.zwdmedia.com/api/details',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      },
      body : JSON.stringify(obj),
    }).then((response) => response.json())
    .then( (responseJson) => {
      console.log(responseJson);
      if (responseJson.status==="success") {
        this.setState({
          sourc: 'https://faheem.zwdmedia.com/images/' +responseJson.data[0].image,
          photo: null,
          intialName: responseJson.data[0].name,
          name: responseJson.data[0].name,
          email: responseJson.data[0].email,
          intialEmail: responseJson.data[0].email,
          phone: responseJson.data[0].phone,
          id: responseJson.data[0].id,
          changePhoto: false,
        }, () => {
          obj.id = this.state.id;
          console.log("Object : ",obj);
          fetch('https://faheem.zwdmedia.com/api/rate', {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + this.state.token,
            },
            body : JSON.stringify(obj),
          }).then((response) => response.json())
          .then( (responseJson) => {
            this.setState({
              rate: responseJson,
              spinner: false,
            });
          }).catch((error) =>{
            console.log(error);
          })
        });
        if(this.state.type == "client") {
          this.setState({Profession:"customer"});
        }else{
          this.setState({Profession:responseJson.data[0].job.title,});

        }
      }else {
        alert('try again later!');
      }
    }).catch((error) =>{
      console.log(error);
    })
  }

  fet= () => {
      const options = {
        noData: true,
      }
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          this.setState({ photo: response},()=>{
            this.setState({changePhoto: true, changed:true})
            console.log(this.state.photo);

          })
        }
      })
  }


  updateDate = async () => {
    var obj = {}
    obj.name=this.state.name;
    obj.email=this.state.email;
    obj.photo= this.state.photo;
    fetch('https://faheem.zwdmedia.com/api/update-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      },
      body: createFormData(this.state.photo)
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log("update : ",responseJson);
      if (responseJson.status==="success"){
        this.setState({
          intialName: this.state.name,
          intialEmail: this.state.email,
          changed:false,
        });
      }else{
        alert('Failed! please try agan later');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  render() {
    const starStyle = {
      width: wp('50%'),
      height: hp('5.5%'),
      marginLeft: wp('2'),
    };
    return (
      <ScrollView>
        { this.state.spinner &&
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        }
      <View style={styles.container}>
          <Image style={{width: wp('100%'), height: hp('35%'),resizeMode:'contain'}} source={{uri : (this.state.changePhoto ?  this.state.photo.uri : this.state.sourc)}} />
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={this.fet}
            >
            <Image
              source={require('../icons/floatingButton2.png')}
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
                  placeholder="Enter your Name"
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
                <Text style={styles.buttonText} onPress={this.updateDate}>
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
    paddingVertical: wp('3%'),
  },
  buttonText: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

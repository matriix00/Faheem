import React, { Component } from 'react';
import {
    StyleSheet,
    Keyboard,
    View,
    FlatList,
    Text,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity } from 'react-native';
import Pusher from 'pusher-js/react-native';
import ChatList from '../components/ChatList';
import store from '../store';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';


export default class ChatScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

      title: ``,
      headerLeft: (
        <View style={{justifyContent: 'center',flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../icons/arrowback.png')}
              style={{height: hp('5%'), width: wp('5%'),marginLeft: wp('5%'),borderRadius: wp('80%')}}
            />
          </TouchableOpacity>
        </View>
        <Image style={{justifyContent: 'center',marginLeft: wp('1.5%'),width: wp('9%'),height: hp('6%')}} source={{uri : 'https://faheem.zwdmedia.com/images/' + navigation.state.params.image}} />
        <View style={{justifyContent: 'center'}}>
          <Text style={{ marginLeft: wp('1%'),fontSize: wp('4%'),color: 'black'}}>{navigation.state.params.name}</Text>
        </View>
        </View>
      ),
      headerRight: (
        <TouchableOpacity style={styles.buttonBid}  activeOpacity={1} onPress={navigation.state.params.finish}>
           <Text style={styles.buttonTextBid} >
             finish problem
           </Text>
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

    finish = () =>{
      var obj= {};
      console.log("TEST");
      obj.id = this.state.idChat;
      fetch('https://faheem.zwdmedia.com/api/projects/finish',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.props.navigation.navigate('Rate',{price : responseJson.price,id : this.state.id});
      }).catch((error) => {
        console.log(error);
        alert('Check your network and try again.');

      })

    }

    constructor(props) {
      super(props);

      this.state = {
        token: store.getState().token,
        Wmessage: '',
        items: [],
        idChat: props.navigation.state.params.idChat,
        idSender: props.navigation.state.params.idSender,
        idReciever: props.navigation.state.params.idReciever,
        id: props.navigation.state.params.id,
        readAll: false,
        finished: false,
      };

      var obj= {};
      obj.id = this.state.idChat;
      fetch('https://faheem.zwdmedia.com/api/chats/find',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ items: responseJson.messages }, ()=>{this.setState({finished:true})});
      }).catch((error) => {
        console.log(error);
        alert('Check your network and try again.');

      })
      this.markRead();

    }

    componentDidMount() {
      Pusher.logToConsole = true;
      this.props.navigation.setParams({
        finish: this.finish
      });
      const pusher = new Pusher('4f39c274825854efe52f', {
        cluster: 'eu',
        forceTLS: true,
        authEndpoint: 'https://faheem.zwdmedia.com/api/broadcasting/auth',
        auth: {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + store.getState().token,
            }
        },
      });

      console.log("TEST");
      let channel = pusher.subscribe(`private-user.${this.state.idSender}`);
      channel.bind('App\\Events\\SendMessageEvent', (data) => {
      //  alert(JSON.stringify(data));
        console.log("send : ",data);
        if (data.sender_id!==this.state.idSender) {

        this.setState({items : [...this.state.items,{ id: this.state.items.length+1, sender_id: this.state.idReciever, message: data.action, created_at: '10:00'}]})
        PushNotification.localNotification({
          message: data.action,
          vibrate: true,
        });
        }
      });
      channel.bind('App\\Events\\MarkAsReadEvent', (data) => {
      //  alert(JSON.stringify(data));
        console.log("read : ",data);
        if (data.sender_id!==this.state.idSender) {
          this.setState({ readAll: true }, ()=>{this.setState({ readAll: true })})
        }
        //this.setState({items : [...this.state.items,{ id: this.state.items.length+1, sender_id: this.state.idReciever, message: data.action, created_at: '10:00'}]})
      });
    }



    onsend = async () => {
        const { Wmessage, items } = this.state;
        this.setState({
            items: [...items, { id: this.state.items.length+1, sender_id: this.state.idSender, message: Wmessage, created_at: '10:00',pending:true, readAll: false }],
            Wmessage: '',
            });
        var obj ={}
        obj.id= this.state.idChat;
        obj.message= Wmessage;
        console.log(obj);
        fetch('https://faheem.zwdmedia.com/api/chats/new-message',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
          },
          body : JSON.stringify(obj),
        }).then((response) => response.json())
        .then( (responseJson) => {
          console.log(responseJson);
          if (responseJson.status==="success"){
            this.setState(({items}) => ({items: [...items.slice(0,items.length-1),{...items[items.length-1],pending: false}]}),()=>{console.log(this.state);})
          }else{
            alert("error");
          }
        }).catch((error)=>{
          console.log(error);
          alert('Check your network and try again.');

        })
    }

    markRead = () => {
      var obj ={}
      obj.id= this.state.idChat;
      fetch('https://faheem.zwdmedia.com/api/chats/mark-read',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body: JSON.stringify(obj),
      }).then((response)=>response.json())
      .then((responseJson)=>{

      }).catch((error)=>{
        console.log(error);
        alert('Check your network and try again.');

      })
    }

    render() {
        console.log("State : ",this.state);
        return (
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{ flex: 1 }} >
                    <PushController />

                        {this.state.finished && <ChatList items={this.state.items} id={this.state.idSender} image={this.props.navigation.state.params.image} readAll={this.state.readAll} />}
                        <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 1 }}
                                placeholder='Enter text here'
                                value={this.state.Wmessage}
                                onFocus={() => this.markRead()}
                                onChangeText={(Wmessage) => this.setState({ Wmessage })}
                                multiline
                            />
                        <TouchableOpacity
                            style={{ justifyContent: 'center' }}
                            onPress={this.onsend}
                            clearButtonMode='always'
                        >
                            {!!this.state.Wmessage && <Text style={styles.text}>Send</Text> }
                        </TouchableOpacity>
                        </View>
                </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'blue',
  },
  buttonBid: {
    width: wp('30%'),
    backgroundColor: '#25e507',
    borderRadius: 25,
    marginVertical: hp('.5%'),
    paddingVertical: hp('1.8%'),
    marginHorizontal: wp('3%'),
  },
  buttonTextBid: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});

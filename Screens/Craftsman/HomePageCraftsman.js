import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import BlogScreen from './BlogScreen';
import { DrawerActions } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import store from '../../store';
import Pusher from 'pusher-js/react-native';
import PushController from '../PushController';
import PushNotification from 'react-native-push-notification';

const keyExtractor = ({ Name }) => Name;

export default class HomePageCraftsman extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'projects',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image
          source={require('../../icons/menu.png')}
          style={{ height: hp('5%'), width: wp('5%'),marginLeft: wp('5%'),  }}
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
      token: store.getState().token,
      items : [],
      finished: true,
      refreshing:true,

    };
    this.getJobs();



  }
  componentDidMount() {Pusher.logToConsole = true;
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
  let channel = pusher.subscribe(`private-user.${store.getState().id}`);
  channel.bind('App\\Events\\NewProjectEvent', (data) => {
    console.log("send : ",data);
    PushNotification.localNotification({
      message: data.name+' '+data.action,
      vibrate: true,
    });
    this.setState({finished: true});
    this.onRefresh();
    }
  );
  }

  renderItem = (item) => {
      return (
          <BlogScreen
            id={item.item.id}
            name={item.item.Name}
            problem={item.item.Problem}
            clientAvatar={item.item.ClientImage}
          />
      );
  };

  getJobs = ()=>{
    fetch('https://faheem.zwdmedia.com/api/projects/suggested',{
        method: "POST",
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        }
    }).then((response) => response.json())
    .then((responseJson) => {
        console.log("RESP : ,",responseJson.length);
        if (responseJson.length == 0 ){
          this.setState({finished : false});
        }
        var arr=[]
        for (let i=0;i<responseJson.length;++i) {
          var obj2 = {}
          obj2.id=responseJson[i].id;
          fetch('https://faheem.zwdmedia.com/api/projects/find',{
              method: "POST",
              headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
              },
              body : JSON.stringify(obj2),
          }).then((response) => response.json())
          .then((responseJson2) => {
            console.log("dsdd : ",responseJson2)
            this.setState({items: [...this.state.items,{id:obj2.id,Name:responseJson2.client.name,ClientImage:responseJson2.client.image,Problem:responseJson[0].user_answers[0].answer.answer}]},()=>{if (i===responseJson.length-1){
              this.setState({finished : false});
            }})
          }).catch((error) => {
            this.setState({finished : false});
            console.log(error);
            alert('Check your network and try again.');

          })

        }

    }).catch((error) => {
      console.log(error);
    });
  }

  onRefresh(){
    this.setState({ items: [] });
    this.getJobs();
  }
  render() {
    console.log("Items : ",this.state.items);
    if (this.state.finished) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: hp('3%') }}>
          <ActivityIndicator />
        </View>
      );
    }
    console.log("Fin : ",this.state.finished);
    return (
      <View style={styles.container}>
      { !this.state.finished && <FlatList
        data={this.state.items}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={this.state.finished}
            onRefresh={this.onRefresh.bind(this)}
            />
          }
        />

      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity,RefreshControl,ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import NotificationItem from './NotificationItem';
import store from '../store';
const keyExtractor = ({ id }) => id.toString();

export default class NotificationList extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing:true,
      items:[]
    }
    this.getNotification();
  }
  onRefresh(){
    this.setState({ items: [] });
    this.getNotification();
  }
  getNotification = ()=>{
    fetch('https://faheem.zwdmedia.com/api/notifications', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + store.getState().token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(store.getState().token);
        this.setState({items : responseJson,refreshing:false })
      })
      .catch((error) => {
        console.error(error);
        alert('Check your network and try again.');

      });
    };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%',
          marginVertical:hp('1%'),
          marginRight: '5%',
        }}
      />
    );
  };
  notificationNavigation= ()=>{

  }
  renderItem = ({ item: { id, ImageUrl, created_at, data } }) => (
      <TouchableOpacity onPress={()=> this.props.on.navigation.navigate('ProblemScreen',{'problemID':data.id})}>
            <NotificationItem
              ImageUrl={'https://faheem.zwdmedia.com/images/' + data.image}
              Date={created_at}
              Notification={data.name+' '+data.action}
            />
      </TouchableOpacity>
  );
  render() {
    //const { items } = this.state.items;
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: hp('3%') }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFE',
  },
});

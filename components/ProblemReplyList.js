import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList,RefreshControl,ActivityIndicator } from 'react-native';

import ReplyItem from './ReplyItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
const keyExtractor = ({ id }) => id.toString();
import store from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class ProblemReplyList extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing:true,
      bids:[],
      projectId:this.props.projectId
    }
    this.getBids();
  }
  onRefresh(){
    this.setState({ bids: [] });
    this.getBids();
  }
  getBids = ()=>{

    let obj = {}
    
   
    obj.id=this.props.projectId;
    
    fetch('https://faheem.zwdmedia.com/api/projects/find', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + store.getState().token,
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          bids:responseJson.bids,projectId:responseJson.id,
          refreshing:false
        });
        console.log(responseJson);
      })
      .catch((error) => {
       console.error(error);
      });
    };
  
  renderSeparator = () => {
    return (
      <View
        style={{
          height: hp('1%'),
          width: wp('86%'),
          backgroundColor: '#CED0CE',
          marginLeft: wp('10%'),
          marginRight: wp('10%'),
        }}
      />
    );
  };
  renderItem = ({
    item: { id, price, craftImage, rating, money, description,user },
  }) => (
    <ReplyItem
      craftName={user.name}
      craftImage={user.image}
      money={price}
      period={description}
      rating={2.2}
      bid_id={id}
      id={this.props.projectId}
      
    />
  );
  render() {
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
        <TouchableOpacity style={{alignItems:"center"}} onPress={()=>{this.onRefresh();}}>
          <Image source={require('../icons/refresh.png')} style={{width:wp('2%'),height:hp('2%')}}></Image>
        </TouchableOpacity>
        <FlatList
          data={this.state.bids}
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
    paddingVertical: hp('.8%'),
    paddingHorizontal: 10,
    borderWidth: wp('0.3%'),
    margin: wp('2%'),
    borderColor: '#787878',
  },
});

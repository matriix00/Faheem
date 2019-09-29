import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import RequestListItem from './RequestListItem';
import store from '../store';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const keyExtractor = ({ id }) => id.toString();

export default class RequestList extends Component {


    navi = (Status,id) => {
        if (Status === 'Pending') {
            return (() => this.props.on.navigation.navigate('ProblemScreen',{problemID: id}));

        }

    }
    constructor(props) {
      super(props);

      this.state={
        items: [],
        refreshing:true,

      };

      this.getRequest();

    }

    getRequest = () =>{
      fetch('https://faheem.zwdmedia.com/api/projects', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + store.getState().token,
        },
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log("projects : ",responseJson);
        this.setState({items: responseJson,refreshing: false});
      })
      .catch((error) => {
        console.error(error);
        alert('Check your network and try again.');

      });
    }
    onRefresh(){
      this.setState({ items: [] });
      this.getRequest();
    }
    renderItem = ({ item  }) => {
            return (
              <TouchableOpacity onPress={this.navi(item.status.name,item.id)} activeOpacity={1}>
                    <RequestListItem
                        JopType={item.service.title}
                        JopImg={'https://faheem.zwdmedia.com/images/' + item.service.image}
                        Startdate={item.service.created_at}
                        EndDate={item.deleted_at ? item.deleted_at : "Now"}
                        Status={item.status.name}
                        press={this.props.on}
                    />
              </TouchableOpacity>
            );
    };

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
            <View style={style.root}>
                <FlatList
                    data={this.state.items}
                    renderItem={this.renderItem}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
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

const style = StyleSheet.create ({
    root: {
        padding: 15,
    }
});

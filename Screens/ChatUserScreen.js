//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity,Image,RefreshControl,ActivityIndicator } from 'react-native';
import ChatUser from '../components/ChatUser';
// create a component
import { DrawerActions } from 'react-navigation';

import store from '../store';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const keyExtractor = ({ id }) => id.toString();

class ChatUserScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Chat',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} activeOpacity={1} >
            <Image
              source={require('../icons/menu.png')}
              style={{ height: hp('5%'), width: wp('5%'),marginLeft: wp('5%'),}}
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
        this.state={
            items:[],
            refreshing:true,
        }
        this.getChatList();

    }
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
    onRefresh(){
    this.setState({ items: [] });
    this.getChatList();
  }
  getChatList = ()=>{

    fetch('https://faheem.zwdmedia.com/api/chats', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + store.getState().token,
            },
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log("sss ",responseJson);
        this.setState({items : responseJson ,refreshing:false})
      })
      .catch((error) => {
        console.error(error);
      });

    };
    renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('ChatScreen',{id: item.project_id,idChat: item.id,idSender: store.getState().type==="client"? item.client_id: item.provider_id,idReciever: store.getState().type==="client"? item.provider_id:item.client_id,name:store.getState().type==="client"? item.provider.name : item.client.name ,image:store.getState().type==="client"?  item.provider.image :item.client.image})}>
              <ChatUser
                name={store.getState().type==="client"? item.provider.name : item.client.name}
                avatar={'https://faheem.zwdmedia.com/images/'+ (store.getState().type==="client"?  item.provider.image :item.client.image)}
              />
        </TouchableOpacity>
    );
    render() {
        const items =[
            {
                id:1,
                name:'omar magdy',
                avatar:require('../icons/profile.png')
            },{
                id:2,
                name:'mina maher',
                avatar:require('../icons/profile.png')
            },
            {
                id:3,
                name:'ismaele abdelhameed',
                avatar:require('../icons/profile.png')
            },
            {
                id:4,
                name:'abdallah ahmed',
                avatar:require('../icons/profile.png')
            },
            {
                id:5,
                name:'mohamed moustafa',
                avatar:require('../icons/profile.png')
            },
            {
                id:6,
                name:'abdelrahaman gamal',
                avatar:require('../icons/profile.png')
            }

        ];
        if (this.state.refreshing) {
          return (
            //loading view while data is loading
            <View style={{ flex: 1, paddingTop: 20 }}>
              <ActivityIndicator />
            </View>
          );
        }
        console.log(this.state.items);
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

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default ChatUserScreen;

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import ProblemReplyList from '../../components/ProblemReplyList';
import items from '../../components/ReplyListData';

import store from '../../store';


export default class ProblemScreen extends Component {


  constructor(props){
    super(props);
    this.state = {
      clientData:{},
      clientName:'',
      problemCreated:'',
      clientProfileImage:'',
      projectData:{},
      bids:[],
      projectId:'',
      description:''
    }
    this.getProblemData();
  }

  getProblemData = () => {
    let obj = {}

    console.log('id in state ' + this.state.idd);
    obj.id=this.props.navigation.getParam('problemID');
    console.log(obj);
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
          projectData : responseJson, clientName:responseJson.client.name, problemCreated:responseJson.created_at, clientProfileImage:'https://faheem.zwdmedia.com/images/'+responseJson.client.image,
          bids:responseJson.bids,projectId:responseJson.id,description:responseJson.user_answers[0].answer.description
        });
        console.log(responseJson.bids);
        console.log(this.state.projectData.client.name);
      })
      .catch((error) => {
       console.error(error);
       alert('Check your network and try again.');

      });
    };


    static navigationOptions = ({ navigation }) => ({

      title: `problem`,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../icons/arrowback.png')}
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

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProfileScreen')}}>
                    <Image
                      style={{ height: hp('9.66%'), width: wp('15.55%') }}
                      source={{uri :  this.state.clientProfileImage}}
                    />
                  </TouchableOpacity>
                  <Text style={{ marginTop: hp('2.9%'), marginLeft: wp('2.6%'), fontSize: wp('4%') }}>
                   {this.state.clientName}
                  </Text>
                </View>
                <Text style={styles.problem}>{this.state.description}  </Text>
                <Text style={styles.time}>{this.state.problemCreated}</Text>
              </View>
            </View>
          </View>

          <ProblemReplyList projectId={this.props.navigation.getParam('problemID')} />

        </ScrollView>
      </View>
    );
  }
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('1%'),
  },

  cardHeader: {
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('3%'),
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardImage: {
    height: hp('30%'),
    width: null,
    flex: 1,
    resizeMode: 'contain',
  },
  problem: {
    fontSize: wp('5%'),
  },
  time: {
    fontSize: wp('2.7%'),
    color: '#808080',
    marginTop: hp('1%'),
  },
});

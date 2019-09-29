import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import store from '../../store';
const keyExtractor = ({ id }) => id.toString();
import Spinner from 'react-native-loading-spinner-overlay';


export default class CreateProblem extends Component {


  getFirstQuestion = () =>{
    let items =[{}];
    let obj = {}
    obj.service = this.props.navigation.getParam('serviceId');
    fetch('https://faheem.zwdmedia.com/api/projects/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      },
      body: JSON.stringify(obj),
    }).then((response)=>response.json())
    .then((responseJson)=>{

      var obj2 = {}
      obj2.id = responseJson.data.id;
      this.setState({projectID:responseJson.data.id});
      this.setState({ spinner: true });

      fetch('https://faheem.zwdmedia.com/api/projects/bot', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body: JSON.stringify(obj2),
      }).then((response2)=>response2.json())
      .then((responseJson2)=>{

        this.setState({answers:responseJson2.data.question.answers,question:responseJson2.data.question.question,questionID:responseJson2.data.question.id});
        this.setState({spinner:false});
      })
    }).catch((error)=>{
      console.log(error);
      this.setState({spinner:false});

      alert('Check your network and try again.');

    })
  }
  getQuestion = ()=>{
    var obj = {}
    this.setState({ spinner: true });
    obj.id = this.state.projectID;
    fetch('https://faheem.zwdmedia.com/api/projects/bot', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body:JSON.stringify(obj),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log("Quest : ",responseJson.data);
        if(responseJson.data.question === null){
          this.setState({btnHidden:true,finalMessage:responseJson.data.user_answers});
          this.setState({ spinner: false });


        }else{
        this.setState({answers:responseJson.data.question.answers,question:responseJson.data.question.question,questionID:responseJson.data.question.id});
        this.setState({spinner:false});

        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({spinner:false});

        alert('Check your network and try again.');

      });
  }
  submitProblem = () =>{
    this.setState({btnHidden:true})
    if(this.state.solved === "Solved"){
      alert('problemSolved');

      this.props.navigation.navigate('HomePage');
    }else{
      alert("wait providers to bid");
    this.props.navigation.navigate('HomePage',{'problemID':this.state.projectID});
    }

  }
  submitAnswer = (itemId) =>{
    this.setState({ spinner: true });
    var obj ={};
    obj.id=this.state.projectID;
    obj.question=this.state.questionID;
    obj.answer=itemId;

    fetch('https://faheem.zwdmedia.com/api/projects/submit-answer', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body:JSON.stringify(obj),
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ spinner: false });

        console.log("submitAnswer : ",responseJson);
        this.setState({solved:responseJson.message});
        this.getQuestion();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ spinner: false });

        alert('Check your network and try again.');

      });
  }
  static navigationOptions = ({ navigation }) => ({
      title: `Request ${navigation.state.params.type}`,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} activeOpacity={1} >
          <Image
            source={require('../../icons/menu.png')}
            style={{ height: hp('5%'), width: wp('5%'),marginLeft: wp('5%'),}}
          />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        fontSize:wp('5%'),
        marginLeft: wp('5%'),


    },
      headerStyle: {
        backgroundColor: '#FF9800',
        height:hp('10%'),
      },
      headerTintColor: '#fff',
    });

  constructor(props) {
    super(props);
    this.state={
      serviceId:null,
      token: store.getState().token,
      question:'',
      answers:[],
      answerID:'',
      projectID:'',
      questionID:'',
      spinner: true,
      finalMessage:[],
      solved:null,
      btnHidden:false,
      spinner: false,
    }
   this.getFirstQuestion();

  }
    renderItem = ({ item  }) => {
          return (
                <View style={styles.answerContainer}>

                  <TouchableOpacity onPress={() => {
                        this.setState({
                          answerID:item.id
                        });
                        this.submitAnswer(item.id);
                        console.log("sadada asdda "+this.state.answerID)
                      }}>
                      <Text style={styles.answerText}>{item.answer}</Text>
                    </TouchableOpacity>
                </View>
          );
  };

  render() {
    const items= [
      {
        id:1,
        answer:'answer1',
      },
      {
        id:2,
        answer:'answer2',
      },
      {
        id:3,
        answer:'answer3',
      },

    ];
    const { navigation } = this.props;
    const itemId = navigation.getParam('serviceId');
    console.log(this.state.answers);

    return (
        <View style={styles.container}>
          { this.state.spinner &&
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />

          }
            { !this.state.btnHidden &&
              <View>
              <View style={styles.header}>
                <Text style={styles.askText}>
                  {this.state.question}
                </Text>
            </View>
            <FlatList
              data={this.state.answers}
              extraData={this.state.answers}
              renderItem={this.renderItem}
              keyExtractor={keyExtractor}
            /></View>}
              { this.state.btnHidden &&
                <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                  {/*<View style={{marginHorizontal: wp('2%'),alignItems: 'center',marginVertical: hp('5%')}}>
                    <Text style={{fontSize: wp('5%')}}>Your problem submitted , wait for response from our craftsmans</Text>
                  </View>*/}
              <TouchableOpacity style={styles.buttonBid} onPress={()=>{this.submitProblem()} }>
                 <Text style={styles.buttonTextBid} >
                   submit
                 </Text>
               </TouchableOpacity>
             </View>
              }

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b0aeae',
    borderRadius: 25,
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  askText: {
    fontSize: wp('5%'),
    color: 'black'
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    marginLeft: 5,
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B',
  },
  answerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginHorizontal: wp('5%'),
      marginTop: hp('5%'),
  },
  answerText: {
    fontSize: wp('4%'),
    color: 'black',
  },
  buttonBid: {
    width: wp('80%'),
    backgroundColor: '#25e507',
    borderRadius: 25,
    marginVertical: 4,
    paddingVertical: 12,
    marginHorizontal: wp('3%'),
  },
  buttonTextBid: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF'
    },
});

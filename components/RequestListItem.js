import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class RequestListItem extends Component {


    constructor(props) {
        super(props);
        this.state = { img: require('../icons/waiting.png') };
      }
    componentWillMount() {
        if (this.props.Status === 'In progress') {
            this.setState({img: require('../icons/processing.png')});
        }
        if (this.props.Status === 'pending') {
            this.setState({img: require('../icons/waiting.png')});
        }
        if (this.props.Status === 'Finished') {
            this.setState({img: require('../icons/done.png')});
        }
        if (this.props.Status === 'cancell') {
            this.setState({img: require('../icons/cancell.png')});
        }
    }


    render() {
        const { JopType, JopImg, Startdate, EndDate, Status, press } = this.props;
        return (
                <View style={style.root}>
                    <Image
                        style={{ width: wp('18%'), height: hp('10%') }}
                        source={{uri : JopImg}}
                    />
                    <View style={style.child}>
                        <Text style={style.text}>
                            {JopType}
                        </Text>
                        <Text style={style.textStyle}>
                            {Startdate} - {EndDate}
                        </Text>
                        <Text style={style.textStyle}>
                            {Status}
                        </Text>
                    </View>
                    <View style={style.lastimg}>
                        <Image
                            style={{ width: wp('14%'), height: hp('8%') }}
                            source={this.state.img}
                        />
                    </View>
             </View>

        );
    }
}

const style = StyleSheet.create({
    root: {
        flexDirection: 'row',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('1%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('.5%'),
        backgroundColor: '#FFF',

        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        borderWidth: .01
    },
    child: {
        flexDirection: 'column',
        paddingLeft: wp('3%'),
    },
    text: {
        fontSize: wp('5%'),
        color: '#000'
    },
    lastimg: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textStyle:{
        fontSize:wp('3%')
    }
});

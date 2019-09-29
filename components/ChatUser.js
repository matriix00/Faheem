//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

// create a component
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class ChatUser extends Component {
    render() {
        const {name, avatar}= this.props;
        return (
            <View style={styles.container}>
             <View style={{justifyContent:'center'}}>
                <Image style={{resizeMode:'contain',height:hp('15%'),width:wp('14%')}} source={{uri:avatar}} />
              </View>
                <View style={{justifyContent:'center',marginHorizontal:wp('5%')}}>

                <Text style={styles.textStyle}>{name}</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"row",
        marginHorizontal: wp('3%'),
        },
        textStyle:{
            fontSize:wp('5%'),
            color:'black',

        }
});

//make this component available to the app
export default ChatUser;

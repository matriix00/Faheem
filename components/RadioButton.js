import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class RadioButtons extends Component {
  state = {
    value: null,
  };

  render() {
    const { option } = this.props;
    const { value } = this.state;

    return (
      <View style={{ flexDirection: 'row' }}>
        {option.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text style={{fontSize:wp('3.5%')}}>{item.text}</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  this.setState({
                    value: item.key,
                  });
                  this.props.changeOpthion(item.text);

                }}>
                {value === item.key && <View style={styles.checkedCircle} /> }
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: wp('6%'),
  },

  circle: {
    height: hp('3.5%'),
    width: hp('3.5%'),
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#ACACAC',
    alignItems: 'center',
    marginLeft: wp('2%'),
    justifyContent: 'center',
  },
  checkedCircle: {
    height: hp('3.5%'),
    width: hp('3.5%'),
    borderRadius: 15,
    backgroundColor: '#794F9B',
  },
});

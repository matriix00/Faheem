import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


export default class ItemList extends Component {
    render() {
        const { ImageLink, JopType, NumberWorker } = this.props;
        console.log(ImageLink);
        return (
            <View style={styles.item}>
                <Image
                    style={{ width: wp('18%'), height: hp('10%') }}
                    source={{uri : `${ImageLink}` }}
                />
                <View>
                    <Text style={styles.name}>
                        {JopType}
                    </Text>
                    <Text style={styles.number}>
                        {NumberWorker} found in your area
                    </Text>

                </View>
                <View  style={styles.arrow}>
                    <Image
                        style={{ width: wp('5%'), height: wp('7%') }}
                        source={require('../icons/arrow.png')}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        marginVertical:  hp('.7%'),
        marginHorizontal: wp('4%'),
        flexDirection: 'row',
        paddingVertical:  hp('.8%'),
        paddingHorizontal: wp('1.5%'),
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
    icon: {

    },
    name: {
        marginTop: hp('1%'),
        marginLeft: wp('4%'),
        color: '#000',
        fontSize: wp('5%'),

    },
    number: {
        marginTop: hp('.8%'),
        marginLeft: wp('3.5%'),
        fontSize: wp('3.5%'),
    },
    arrow: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: wp('3%')
    }
});

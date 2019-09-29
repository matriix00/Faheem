import { View, Text, StyleSheet, Image } from 'react-native';
import React, { Component } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class ChatComponent extends Component {

    render() {
        const { message, time, fl, read, pending, readAll } = this.props;
        return (
            <View style={style[fl].container}>
                <View style={{ flexDirection: "row" }}>
                    {fl === "lift" && <View style={{ justifyContent: 'center', marginHorizontal: wp('1%') }}>
                        <Image style={{ width: wp('10%'), height: hp('9%'), resizeMode: "contain" }} source={{uri : 'https://faheem.zwdmedia.com/images/' + this.props.image}} />
                    </View>
                    }
                    <View style={style[fl].wrapper}>
                        <Text style={style[fl].textm}>
                            {message}
                        </Text>
                        {<View style={{ flexDirection: 'row', marginHorizontal: wp('1%') }}>
                            <Text style={style[fl].textt}>
                                {time}
                            </Text>
                            {fl==="right" &&
                              <View style={{ flexDirection: 'row'}}>
                                {!pending && (
                                    <Text>✓</Text>
                                )}
                                {(read || readAll ) && (
                                    <Text>✓</Text>
                                )}
                                {pending && (
                                    <Text>🕓</Text>
                                )}
                              </View>
                            }
                        </View>}

                    </View>
                </View>
            </View>
        );
    }
}

const style = {
    lift: {
        container: {
            flex: 1,
            alignItems: 'flex-start',
        },
        wrapper: {
            borderRadius: 20,
            backgroundColor: '#cccccc',
            marginTop: hp('1%'),
            paddingHorizontal: wp('.5%'),
            paddingVertical: hp('.5%'),
            minHeight: hp('7%'),
            maxWidth: wp('70%'),
            justifyContent: 'flex-end',
        },
        textm: {
            fontSize: wp('4%'),
            paddingHorizontal: wp('1.5%'),
            backgroundColor: 'transparent',
            color: '#000',
        },
        textt: {
            fontSize: wp('2.5%'),
            paddingVertical: wp('.5%'),
            paddingHorizontal: wp('.5%'),
            backgroundColor: 'transparent',
            color: '#000',
        }
    },
    right: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-end',
        },
        wrapper: {
            borderRadius: 20,
            marginTop: hp('1%'),
            marginRight: wp('.5%'),
            paddingHorizontal: wp('.5%'),
            paddingVertical: hp('.5%'),
            minHeight: hp('7%'),
            maxWidth: wp('70%'),
            justifyContent: 'flex-end',
            backgroundColor: '#0084ff',
        },
        textm: {
            fontSize: wp('4%'),
            paddingTop: hp('.8%'),
            paddingHorizontal: wp('1%'),
            backgroundColor: 'transparent',
            color: '#fff',
        },
        textt: {
            fontSize: wp('2.5%'),
            paddingVertical: wp('.5%'),
            paddingHorizontal: wp('.5%'),
            backgroundColor: 'transparent',
            color: '#fff',
        }
    })
}

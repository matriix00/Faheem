import React,{ Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class NotificationItem extends Component {
  render() {
    const {  ImageUrl, Date, Notification } = this.props
    var x = Date.replace(" ","   ");
    console.log(ImageUrl);
    return(
      <View style={styles.container}>
         <View style={styles.imageStyle}>
            <Image style={{height:hp('7%'), width:wp('12%')}} source={{uri :ImageUrl}}/>
         </View>
        <View style={{flex:1,flexDirection:"column", marginTop:hp('0.5%'),}}>
          <Text style= {styles.textStyle}>{Notification}</Text>
          <View style={{justifyContent:'flex-end',marginTop:hp('0.5%')}}>
            <Text style={styles.dateStyle}>{x}</Text>
           </View>
        </View>
        
       
       </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    paddingHorizontal: wp('3%'),
    flex:1,
    flexDirection:'row',
  },
  textStyle:{
    fontSize:wp('5%'),
    color: 'black'
  },
  dateStyle:{
    fontSize:wp('3.5%'),
    color:'black',
  },
  imageStyle:{
    marginTop:hp('0.5%'),
    alignItems: 'center',
    marginRight: wp('1%'),
    
  }
});

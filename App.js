import React, { Component } from 'react';
import { View, Text, Image, Button, Platform, StatusBar, StyleSheet } from 'react-native'

import Root from './navigation/RootNavigator';
import FinalContainer from './navigation/RootNavigator';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#002f6c"
          barStyle="light-content"
        />
        <Root />  
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

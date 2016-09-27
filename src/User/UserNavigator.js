import React, {Component} from 'react';
import {NavigatorIOS, View} from 'react-native';

import UserView from './UserView'

export default class UserNavigator extends Component{
  render(){
    return (
      <NavigatorIOS
        ref="nav"
        initialRoute={{
          component: UserView,
          title: "User"
        }}
        style={{flex:1}}
        barTintColor="#ffffcc"
      >
      </NavigatorIOS>
    )
  }
}

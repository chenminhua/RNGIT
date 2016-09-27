import React, {Component} from 'react'
import {NavigatorIOS, View} from 'react-native'

import StarListView from './StarListView'

export default class StarNavigator extends Component{
  render(){
    return (
      <NavigatorIOS
        ref="nav"
        initialRoute={{
          component: StarListView,
          title: 'Star',
        }}
        style={{flex:1}}
        barTintColor="#ffffcc"
      >

      </NavigatorIOS>
    )
  }
}

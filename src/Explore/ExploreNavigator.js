import React, {Component, PropTypes} from 'react';
import {NavigatorIOS} from 'react-native';

import ExploreListView from './ExploreListView'
import FilterView from './FilterView'

export default class ExploreNavigator extends Component{
  constructor(props){
    super(props)
  }

  render(){
    let filterRoute = {
      component: FilterView,
      title: 'bar',
    }
    return (
      <NavigatorIOS
        ref="nav"
        initialRoute={{
          component: ExploreListView,
          title: 'Explore',
          rightButtonTitle:'fliter',
          onRightButtonPress: ()=>{
            this.refs.nav.push(filterRoute)
          }
        }}
        style={{flex:1}}
        barTintColor="#ffffcc"
      >
      </NavigatorIOS>
    )
  }
}

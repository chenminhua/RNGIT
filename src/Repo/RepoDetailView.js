import React, {Component} from 'react'
import {WebView} from 'react-native'

export default class RepoDetailView extends Component{
  render(){
    return (
      <WebView
        source={{uri:'https://github.com/'+this.props.full_name}}
      />

    )
  }
}

import React, {Component} from 'react'
import {View, StyleSheet, Image, Text, TouchableHighlight, AsyncStorage, TextInput} from 'react-native'

import UserLoginView from "./UserLoginView"

import UserInfoView from "./UserInfoView"

export default class UserView extends Component{
  constructor(props){
    super(props)
    this.state = {
      user:{}
    }
    AsyncStorage.getItem("@me:token").then((value)=>{
      console.log(value)
      this.setState({token: value})
      if(value){
        this._login(value)
      }
    })
  }

  //登录过程，设定state（让组件重新render）,并将用户信息全部存入AsyncStorage
  _login(token){
    fetch("https://api.github.com/user",{
      method: 'get',
      headers: {
        'Authorization': 'Basic '+btoa(token),
      }}).then((response)=> response.json())
      .then(((data)=>{
        if(data){
          //设置token会触发重新render,显示用户信息界面
          this.setState({
            user:data,
            token:token
          })
          AsyncStorage.setItem("@me:name", data.login)
          AsyncStorage.setItem("@me:token", token)
        }
      }).bind(this))
  }

  //如果用户已经登录，显示用户信息，否则显示登录界面
  render(){
    if(this.state.token){
      return this._renderInfo()
    } else{
      return this._renderLogin()
    }
  }

  //显示登录界面
  _renderLogin(){
    return (
      <UserLoginView login={this._login.bind(this)}/>
    )
  }

  //注销用户，从AsyncStorage中删除用户token
  _logout(){
    AsyncStorage.removeItem("@me:token")
    AsyncStorage.removeItem("@me:name")
    this.setState({
      token:"",user:{}
    })
  }

  //显示用户信息
  _renderInfo(){
    return (
      <UserInfoView
        user={this.state.user}
        admin={true}
        logout={this._logout.bind(this)}
        navigator={this.props.navigator}
        />
    )
  }

}

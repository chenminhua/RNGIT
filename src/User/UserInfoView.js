import React, {Component} from 'react'
import {View, StyleSheet, Image, Text, TouchableHighlight, AsyncStorage, TextInput} from 'react-native'

import UserReposListView from "./UserReposListView"
import UserListView from "./UserListView"

export default class UserInfoView extends Component{
  constructor(props){
    super(props)
  }
  _getfollowerView(){
    this.props.navigator.push({
      title: "Followers",
      component: UserListView,
      passProps: {type: "followers",username:this.props.user.login}
    });
  }

  _getfollowingView(){
    this.props.navigator.push({
      title: 'Following',
      component: UserListView,
      passProps: {type: "following", username:this.props.user.login}
    })
  }

  _getuserreposView(){
    this.props.navigator.push({
      title: 'Repos',
      component: UserReposListView,
      passProps: {username:this.props.user.login}
    })
  }

  render(){
    let user = this.props.user
    let source = {uri: user.avatar_url}
    let logoutBtn
    console.log(this.props.admin)
    if(this.props.admin){
      logoutBtn = (
        <TouchableHighlight onPress={this.props.logout.bind(this)}>
          <Text style={styles.logoutBtn}>Logout</Text>
          </TouchableHighlight>
        )
    }
    return (
      <View style={{marginTop:60}}>
        <View style={styles.userProfile}>
          <Image source={source} style={styles.userAvator}/>
          <View style={{flex:1, flexDirection:'row',marginTop:16}}>
            <Text style={{fontSize:20}}>{user.login}</Text>
            {logoutBtn}
          </View>

          <View style={styles.userMeta}>
            <TouchableHighlight onPress={this._getfollowerView.bind(this)}>
              <Text style={styles.userMetaText} >follower{'\n'}{user.followers}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._getfollowingView.bind(this)}>
              <Text style={styles.userMetaText} >following{'\n'}{user.following}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._getuserreposView.bind(this)}>
              <Text style={styles.userMetaText} >repos{'\n'}{user.public_repos}</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={{marginTop: 40, marginLeft: 20}}>
          <Text style={styles.userInfoText}>位置      {user.location}</Text>
          <Text style={styles.userInfoText}>邮箱      {user.email}</Text>
          <Text style={styles.userInfoText}>创建      {user.created_at}</Text>
          <Text style={styles.userInfoText}>公司      {user.company}</Text>
        </View>


      </View>
    )
  }
}


let styles = StyleSheet.create({
  userProfile: {
    flex: 1,
    flexDirection: "column",
    height: 210,
    backgroundColor: "#51b1d9",
    justifyContent: "center",
    alignItems: "center"
  },
  userAvator: {
    width: 50,
    height: 50,
    marginTop: 20,
    borderRadius: 25
  },
  userMeta: {
    flex:1,
    flexDirection: 'row',
    marginTop: 20
  },
  userMetaText:{
    width:110,
    height:40,
    fontSize:16,
    borderWidth: 1,
    marginLeft:5,
    marginRight:5,
    textAlign: "center"
  },
  logoutBtn:{
    marginLeft:10,
    width:60,
    backgroundColor: 'red',
    textAlign: 'center',
    padding:3,
    borderRadius: 5
  },
  userInfoText:{
    fontSize: 16,
    height: 40
  }
})

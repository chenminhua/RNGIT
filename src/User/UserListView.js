import React, {Component} from 'react'
import {Text, ListView, RefreshControl, AsyncStorage, View, StyleSheet,Image, TouchableHighlight} from 'react-native'

import UserInfoView from './UserInfoView'

export default class UserListView extends Component{
  _getUser(){
    let ds = this.state.dataSource
    fetch(`https://api.github.com/users/${this.props.username}/${this.props.type}?page=${this.state.page}`)
      .then((response)=>response.json())
      .then((res)=> {
        if (res.length>0) this.state.page += 1
        this.state.userList = this.state.userList.concat(res)
        this.setState({
          dataSource: ds.cloneWithRows(this.state.userList)
        })
      })
  }

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      userList: [],
      dataSource: ds,
      page: 1
    }
    this._getUser()
  }

  _getUserInfo(username){
    fetch(`http://api.github.com/users/${username}`).then((response) => response.json())
      .then(((res) => {
        console.log(res)
        this.props.navigator.push({
          title: "User",
          component: UserInfoView,
          passProps: {user:res,admin:false,navigator:this.props.navigator, logout:()=>{}}
        });
      }).bind(this))
  }

  render(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        onEndReached={this._getUser.bind(this)}
        onEndReachedThreshold={10}
        renderRow={(rowData) => <UserItem user={rowData} onPress={this._getUserInfo.bind(this, rowData.login)}/> }
      />
    )
  }
}


// UserItem
class UserItem extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let source = {uri: this.props.user.avatar_url}
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.userItem}>
          <Image source={source} style={styles.userAvator}/>
          <Text style={styles.userNameText}>{this.props.user.login}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

let styles = StyleSheet.create({
  userItem:{
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    height: 35,
    borderBottomWidth: 1,
    borderColor: "rgba(128,138,138,0.5)"

  },
  userAvator: {
    marginLeft: 20,
    width: 30,
    height: 30,
    borderRadius: 20
  },
  userNameText:{
    marginLeft: 20
  }
})

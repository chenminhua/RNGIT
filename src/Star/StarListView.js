import React, {Component} from 'react'
import {ListView, AsyncStorage, Text, ScrollView, RefreshControl, View} from 'react-native'

import RepoItem from '../Repo/RepoItem'
import RepoDetailView from '../Repo/RepoDetailView'

export default class StarListView extends Component{
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      starList: [],
      dataSource: ds,
      page: 1,
      logined: true
    }
    this._getStars()
  }

  _getStars(){
    let ds = this.state.dataSource
    AsyncStorage.getItem("@me:name").then((username)=>{
      if(username){
        fetch(`https://api.github.com/users/${username}/starred?page=${this.state.page}`)
          .then((response) => response.json())
          .then((res) => {
            this.state.starList = this.state.starList.concat(res)
            this.setState({
              dataSource: ds.cloneWithRows(this.state.starList),
              page: this.state.page + 1,
              logined:true,
            })
          })
      }else{
        this.setState({
          logined:false
        })
      }

    })
  }

  _handleNextPress(repoName){
    this.props.navigator.push({
      title: "Repo detail",
      component: RepoDetailView,
      passProps: {full_name: repoName}
    });
  }



  render(){
    if(this.state.logined){
      return (
        <ListView
          dataSource={this.state.dataSource}
          onEndReached={this._getStars.bind(this)}
          onEndReachedThreshold={10}
          renderRow={(rowData)=> <RepoItem repo={rowData} onPress={this._handleNextPress.bind(this, rowData.full_name)}/>}
        />
      )
    }else{
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.logined}
              onRefresh={this._getStars.bind(this)}
            />
          }
        >
        <View>
          <Text style={{marginTop:100, fontSize:40, textAlign: "center"}}>请先登录!</Text>
          <Text style={{marginTop:30, fontSize:20, textAlign: "center"}}>登录后下拉刷新</Text>
        </View>

        </ScrollView>

      )
    }


  }
}

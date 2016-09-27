import React, {Component} from 'react'
import {Text, ListView, RefreshControl, AsyncStorage} from 'react-native'

import RepoItem from '../Repo/RepoItem'
import RepoDetailView from '../Repo/RepoDetailView'

export default class ExploreListView extends Component{

  _getRepos(){
    AsyncStorage.getItem("@me:language").then((value) =>{
      this._getReposByLang(value)
    }).catch((error)=>{
      this._getReposByLang("all")
    })

  }

  _getReposByLang(language){
    let ds = this.state.dataSource
    let d7 = new Date((new Date()).getTime()-7*24*60*60*1000)
    let d7str = d7.toISOString().slice(0,10)
    fetch(`https://api.github.com/search/repositories?q=language:${language}+created:>${d7str}&sort=stars&page=${this.state.page}`)
      .then((response) => response.json())
      .then((repos) => {
        this.state.repoList = this.state.repoList.concat(repos.items)
        this.setState({
          dataSource: ds.cloneWithRows(this.state.repoList),
          refreshing: false,
          page: this.state.page + 1
        })
      })
  }

  _handleBackPress(){
    this.props.navigator.pop();
  }

  //负责跳转到详情页面
  _handleNextPress(repoName){
    this.props.navigator.push({
      title: "Repo detail",
      component: RepoDetailView,
      passProps: {full_name: repoName}
    });
  }

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      repoList: [],
      dataSource: ds,
      refreshing: false,
      page: 1
    };
    this._getRepos()
  }

  _onRefresh(){
    this.setState({refreshing: true,page:1,repoList:[]});
    this._getRepos()
  }

  _onUpdate(){
    this._getRepos()
  }

  render(){

    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        onEndReached={this._onUpdate.bind(this)}
        onEndReachedThreshold={10}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <RepoItem repo={rowData} onPress={this._handleNextPress.bind(this, rowData.full_name)} />}
      />
    )
  }
}

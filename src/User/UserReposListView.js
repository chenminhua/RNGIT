import React, {Component} from 'react'
import {ListView, Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import RepoDetailView from "../Repo/RepoDetailView"

export default class UserReposListView extends Component{
  _getUserRepo(){
    let ds = this.state.dataSource
    fetch(`https://api.github.com/users/${this.props.username}/repos?sort=updated&page=${this.state.page}`)
      .then((response)=>response.json())
      .then((res)=> {
        if (res.length>0) this.state.page += 1
        this.state.repoList = this.state.repoList.concat(res)
        this.setState({
          dataSource: ds.cloneWithRows(this.state.repoList),
        })
      })
  }

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSource: ds,
      repoList: [],
      page: 1
    }
    this._getUserRepo()
  }

  _handleNextPress(repoName){
    this.props.navigator.push({
      title: "Repo detail",
      component: RepoDetailView,
      passProps: {full_name: repoName}
    });
  }

  render(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        onEndReached={this._getUserRepo.bind(this)}
        onEndReachedThreshold={10}
        renderRow={(rowData) => <RepoItem repo={rowData} onPress={this._handleNextPress.bind(this, rowData.full_name)}/>}
      />
    )
  }
}

class RepoItem extends Component{
  render(){
    let repo = this.props.repo
    if (repo.description && repo.description.length > 25){
      repo.description = repo.description.substr(0,25) + '...'
    }
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.repoItem}>
          <Text style={[styles.repoText, styles.repoTitle]}>{repo.name}</Text>
          <Text style={[styles.repoText, styles.repoDescription]}>{repo.description}</Text>
          <View style={styles.repoMeta}>
            <Text style={styles.repoMetaText}>stars {repo.stargazers_count}</Text>
            <Text style={styles.repoMetaText}>forks {repo.forks}</Text>
            <Text style={styles.repoMetaText}>watchers {repo.watchers}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

let styles = StyleSheet.create({
  repoItem:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#51b1d9",
    borderBottomWidth: 1,
    borderColor: "rgba(128,138,138,0.5)",
  },
  repoText:{
    marginLeft: 20
  },
  repoTitle:{
    fontSize: 16
  },
  repoDescription:{
    fontSize: 10,
    color: "#333"
  },
  repoMeta:{
    flex: 1,
    flexDirection:"row",
    marginLeft: 20
  },
  repoMetaText:{
    width: 100,
    fontSize: 10
  }

})

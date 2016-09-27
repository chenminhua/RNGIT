import React, {Component} from 'react';
import {TouchableHighlight, Text, StyleSheet, View, Image} from 'react-native';

import RepoDetailView from "./RepoDetailView"

export default class RepoItem extends Component{
  render(){
    let source = {uri: this.props.repo.owner.avatar_url}
    let repo = this.props.repo
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        >
        <View style={styles.repoitem}>
          <Image source={source} style={styles.repoImage}/>
          <View style={styles.repoData}>
            <View>
              <Text style={{fontSize:20}}>{repo.name}</Text>
            </View>
            <View>
              <Text style={{fontSize: 12}}>{repo.description}</Text>
            </View>
            <View style={styles.repoMeta}>
              <Text style={{width:100}}>star:{repo.stargazers_count}</Text>
              <Text style={{width:100}}>fork:{repo.forks}</Text>
              <Text style={{width:100}}>{repo.language}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

let styles = StyleSheet.create({
  repoitem:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: "#51b1d9",
    borderBottomWidth: 1,
    borderColor: "rgba(128,138,138,0.5)"
  },
  repoImage:{
    marginLeft: 20,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  repoData:{
    marginLeft: 20
  },
  repoMeta:{
    flex:1,
    flexDirection: "row"
  }

})

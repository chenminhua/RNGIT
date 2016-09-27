import React, {Component} from 'react'
import {Text, StyleSheet, View, NavigatorIOS, TabBarIOS} from 'react-native'
import ExploreNavigator from "./Explore/ExploreNavigator"
import UserNavigator from "./User/UserNavigator"
import StarNavigator from "./Star/StarNavigator"

export default class App extends Component{
  static title = '<TabBarIOS>'
  static description = 'Tab-based navigation'
  static displayName = 'TabBarExample'

  state = {
    selectedTab: 'recents',
    notifCount: 0,
  };

  render(){
    return (
      <TabBarIOS>

        <TabBarIOS.Item
          systemIcon = "recents"
          selected={this.state.selectedTab === 'recents'}
          onPress={() => {
            this.setState({
              selectedTab: "recents"
            })
          }}>
          <ExploreNavigator/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            systemIcon = "favorites"
            // badge = {this.state.notifCount > 0 ? this.state.notifCount : undefined}
            selected = {this.state.selectedTab === "stars"}
            onPress={() => {
              this.setState({
                selectedTab: 'stars',
                // notifCount: this.state.notifCount + 1,
              });
            }}>
            <StarNavigator/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            systemIcon = "contacts"
            selected={this.state.selectedTab === "user"}
            onPress={() => {
              this.setState({
                selectedTab: "user"
              })
            }}
          >
          <UserNavigator/>
          </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

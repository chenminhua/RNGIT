import React, {Component} from 'react'
import {TextInput, View, StyleSheet,Text, TouchableHighlight, AsyncStorage} from 'react-native'

export default class UserLoginView extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      _login: this.props.login
    }
  }



  render(){
    return (
      <View style={styles.loginView}>
        <Text style={{fontSize:40}}>Login</Text>

        <TextInput
          style={styles.textInput}
          placeholder="username"
          onChangeText={(username) => this.setState({username})}
          />
        <TextInput
          style={styles.textInput}
          placeholder="password"
          onChangeText={(password) => this.setState({password})}
          />

        <TouchableHighlight onPress={
          (()=>{
            this.state._login(this.state.username+":"+ this.state.password)
          }).bind(this)
        }>
          <Text style={styles.button}>submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

styles = StyleSheet.create({
  loginView: {
    flex: 1,
    flexDirection: 'column',
    marginTop:160,
    alignItems:"center",
  },
  textInput: {
    marginTop:20,
    marginLeft:30,
    height:40,
    width:300,
    borderColor:'gray',
    borderWidth:1,
    borderRadius:10,
    paddingLeft:10
  },
  button:{
    marginTop:20,
    fontSize:20,
    backgroundColor: "green",
    padding: 10,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:10
  }
})

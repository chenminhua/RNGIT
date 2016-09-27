import React, {Component, PropTypes} from 'react';
import {PickerIOS, PickerItemIOS, View, AsyncStorage} from 'react-native';


export default class FilterView extends Component{
  constructor(props){
    super(props)
    this.state = {language: 'all'}
    AsyncStorage.getItem('@me:language', (error, value)=>{
      this.setState({language:value})
    })
  }

  _handleBackPress(){
    this.props.navigator.pop();
  }

  render(){
    let array = [
      {label:"all",value:"all"},
      {label:"javascript", value:"javascript"},
      {label:"python", value:"python"},
      {label:"java",value:"java"},
      {label:"c",value:"c"},
      {label:"c++",value:"c++"},
      {label:"ruby",value:"ruby"},
      {label:"swift",value:"swift"},
      {label:"lisp",value:"lisp"}
    ]
    return (
      <View style={{marginTop:60}}>
        <PickerIOS
          selectedValue={this.state.language}
          onValueChange={(value)=> {
            this.setState({language: value})
            AsyncStorage.setItem('@me:language', value);
          }}>
          {array.map((obj) => (
            <PickerItemIOS
              key={obj.value+obj.label}
              value={obj.value}
              label={obj.label}
            />
          ))}

        </PickerIOS>
      </View>

    )
  }
}

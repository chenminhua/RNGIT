import React, {Component} from 'react';
import {AppRegistry, AsyncStorage} from 'react-native';

import App from "./src/App.js"
//AsyncStorage.removeItem("@me:token")
AppRegistry.registerComponent('Gitget',() => App)

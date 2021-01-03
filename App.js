import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native'

import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP5o72TIq5tlGqSNFDGFEiXz2OQC6tdzw",
  authDomain: "intagram-dev-880a0.firebaseapp.com",
  projectId: "intagram-dev-880a0",
  storageBucket: "intagram-dev-880a0.appspot.com",
  messagingSenderId: "36505042593",
  appId: "1:36505042593:web:f0d52f6f150f0665d87ae0",
  measurementId: "G-B7RMZ7RP3H"
};  

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

const Stack = createStackNavigator()


export default class App extends Component {
  constructor( props ) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state
    if(!loaded){
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>
            Loading
          </Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen 
            name="Landing"
            component={ LandingScreen }
            options={{ headerShown: false }}
          />  
          <Stack.Screen 
            name="Register"
            component={ RegisterScreen }
          />  
        </Stack.Navigator>      
      </NavigationContainer>
      )

    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>
          User is Logged in
        </Text>
      </View>
    )
    
  }
}




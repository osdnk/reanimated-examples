import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import StatefulButton from './src/StatefulButton'
import LabeledTextInput from './src/LabeledTextInput'

class App extends Component {
  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LabeledTextInput placeholder="Email address" />
        <StatefulButton title="Submit" />
      </SafeAreaView>
    )
  }
}

export default App

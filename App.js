import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import StatefulButton from './src/StatefulButton'

class App extends Component {
  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <StatefulButton title="Submit" />
      </SafeAreaView>
    )
  }
}

export default App

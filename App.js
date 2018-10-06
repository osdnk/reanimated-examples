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
        <StatefulButton title="Submit" h={0} s={0} v={0} rgb="rgb(0, 0, 0)" />
      </SafeAreaView>
    )
  }
}

export default App

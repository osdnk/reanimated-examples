import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import LabeledTextInput from './src/LabeledTextInput'
import FeedbackButton from './src/FeedbackButton'

class App extends Component {
  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
        <FeedbackButton title="Submit" h={230} s={0.69} v={0.977} rgb="rgb(77, 105, 249)" />
      </SafeAreaView>
    )
  }
}

export default App

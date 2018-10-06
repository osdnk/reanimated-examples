import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LabeledTextInput from './src/LabeledTextInput'
import FeedbackButton from './src/FeedbackButton'

const blue = 'rgb(77, 105, 249)'
const gray = 'rgb(161, 165, 169)'

// Ignore immortal warning.
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['onHandlerStateChange'])

class App extends Component {
  renderSlogans = () =>
    <View>
      <Text style={styles.sloganHeader}>
        Welcome, friend!
      </Text>
      <Text style={styles.sloganText}>
        Sign up for free to join the world&rsquo;s{' '}
        <Text style={{ color: '#666', fontWeight: '500' }}>best</Text>{' '}
        community of professionals,{' '}
        doing professional stuff for{' '}
        <Text style={{ fontStyle: 'italic' }}>real money</Text>,{' '}
        day and night.
      </Text>
    </View>

  renderPasswordForgot = () =>
    <View style={styles.forgotPasswordSection}>
      <Text style={[styles.text, { color: gray }]}>Forgot password?</Text>
      <Text style={[styles.text, { color: blue, marginLeft: 5 }]}>Reset</Text>
    </View>

  renderInputs = () =>
    <View>
      <LabeledTextInput
        placeholder="E-mail address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <LabeledTextInput
        placeholder="Password"
        textContentType="password"
        autoCapitalize="none"
        secureTextEntry={true}
      />
    </View>

  renderSignUpButton = () =>
    <View style={styles.signUpSection}>
      <FeedbackButton
        title="Sign in"
        h={230} s={0.69} v={0.977}
        rgb="rgb(77, 105, 249)"
      />
    </View>

  renderSignUpPrompt = () =>
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Text style={[styles.text, { color: gray }]}>
        Don&rsquo;t have an account?
      </Text>
      <Text style={[styles.text, { color: blue, marginLeft: 5 }]}>
        Sign up
      </Text>
    </View>

  render() {
    return (
      <SafeAreaView style={styles.areaView}>
        {this.renderSlogans()}
        {this.renderInputs()}
        {this.renderPasswordForgot()}
        {this.renderSignUpButton()}
        {this.renderSignUpPrompt()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
  },
  text: {
    fontFamily: 'Rubik',
    fontWeight: '500',
  },
  sloganHeader: {
    fontFamily: 'Rubik',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 20,
  },
  sloganText: {
    fontFamily: 'Rubik',
    fontSize: 16,
    marginBottom: 60,
    lineHeight: 22,
    color: gray,
  },
  forgotPasswordSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  signUpSection: {
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 70,
  }
})
export default App

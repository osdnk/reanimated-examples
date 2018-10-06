import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { toUpperCase, colorHSV } from './utils'

const {
  add,
  and,
  block,
  Clock,
  clockRunning,
  color,
  cond,
  debug,
  eq,
  event,
  multiply,
  not,
  set,
  startClock,
  stopClock,
  sub,
  timing,
  Value,
} = Animated


const anim = (clock, gestureState, condition) => {
  const state = {
    finished:  new Value(0),
    position:  new Value(0),
    time:      new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 300,
    toValue: new Value(1),
    easing: Easing.in(Easing.ease),
  }

  return block([
    cond(
      eq(condition, 1), [
        startClock(clock),
      ],
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    debug('', state.position),
  ])
}

class LabeledTextInput extends Component {
  state        = { input: '' }
  gestureState = new Value(-1)
  active       = new Value(0)
  focused      = new Value(0)
  clock        = new Clock()

  handleStateChange = event([{ nativeEvent: { state: this.gestureState }}])
  focusedValue = anim(this.clock, this.gestureState, this.focused)

  handleFocus    = () => this.focused.setValue(1)
  handleBlur     = () => this.focused.setValue(0)

  handleTextChange = text => {
    if (text.length === 0) {
      this.focused.setValue(0)
    } else {
      this.focused.setValue(1)
    }
    this.setState({ input: text })
  }

  render() {
    const { placeholder, ...props } = this.props
    const { input } = this.state
    return (
      <TapGestureHandler onHandlerStateChange={this.handleStateChange}>
        <Animated.View style={[styles.view, {  }]}>
          <Animated.Text style={[styles.placeholder, {  }]}>
            {toUpperCase(placeholder)}
          </Animated.Text>
          <TextInput
            {...props}
            style={styles.input}
            onChangeText={this.handleTextChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={input}
          />
        </Animated.View>
      </TapGestureHandler>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    height: 50,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgb(241, 243, 247)',
  },
  placeholder: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Rubik',
    position: 'absolute',
    color: 'rgb(161, 165, 169)',
    paddingHorizontal: 8,
    top: 8,
  },
  input: {
    fontFamily: 'Rubik',
    // fontWeight: '500',
    fontSize: 18,
    color: '#444',
    width: '100%',
    height: 36,
    marginTop: 16,
    paddingHorizontal: 8,
  },
})

export default LabeledTextInput

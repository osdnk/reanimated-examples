import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { colorHSV } from './utils'

const {
  add,
  and,
  block,
  Clock,
  clockRunning,
  color,
  cond,
  eq,
  event,
  multiply,
  not,
  set,
  startClock,
  stopClock,
  timing,
  Value,
} = Animated


const anim = (clock, gestureState, active) => {
  const state = {
    finished:  new Value(0),
    position:  new Value(0),
    time:      new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 1000,
    toValue: new Value(1),
    easing: Easing.in(Easing.ease),
  }

  return block([
    cond(
      and(not(clockRunning(clock)), eq(active, 1)), [
        startClock(clock),
      ],
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ])
}

class LabeledTextInput extends Component {
  state        = { input: '' }
  gestureState = new Value(-1)
  active       = new Value(0)
  focused      = new Value(0)
  clock        = new Clock()

  handleStateChange = event([{ nativeEvent: { state: this.gestureState }}])
  value = anim(this.clock, this.gestureState, this.active)

  handleKeyPress = () => this.active.setValue(1)
  handleFocus    = () => this.focused.setValue(1)
  handleBlur     = () => this.focused.setValue(0)

  handleTextChange = text => {
    if (text.length === 0) {
      this.active.setValue(0)
    }
    this.setState({ input: text })
  }

  fontSize = cond(eq(this.active, 1), 14, 18)
  top = cond(eq(this.active, 1), 0, 18)
  borderBottomColor = cond(
    eq(this.focused, 1),
    colorHSV(160, 0.79, 0.79),
    color(230, 230, 230),
  )

  render() {
    const { fontSize, top, borderBottomColor } = this
    const { placeholder } = this.props
    const { input } = this.state
    return (
      <TapGestureHandler onHandlerStateChange={this.handleStateChange}>
        <Animated.View style={[styles.view, { borderBottomColor }]}>
          <Animated.Text style={[styles.placeholder, { fontSize, top }]}>
            {placeholder}
          </Animated.Text>
          <TextInput
            style={styles.input}
            onKeyPress={this.handleKeyPress}
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
    width: 250,
    justifyContent: 'center',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  placeholder: {
    fontFamily: 'Rubik',
    fontSize: 18,
    color: '#888',
    position: 'absolute',
    top: 0,
  },
  input: {
    fontFamily: 'Rubik',
    fontSize: 18,
    color: '#333',
    width: '100%',
    height: 40,
    marginTop: 10,
  },
})

export default LabeledTextInput

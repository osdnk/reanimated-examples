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
    duration: 1000,
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
  activeClock  = new Clock()
  focusedClock = new Clock()

  handleStateChange = event([{ nativeEvent: { state: this.gestureState }}])
  activeValue  = anim(this.activeClock, this.gestureState, this.active)
  focusedValue = anim(this.focusedClock, this.gestureState, this.focused)

  handleKeyPress = () => this.active.setValue(1)
  handleFocus    = () => this.focused.setValue(1)
  handleBlur     = () => this.focused.setValue(0)

  handleTextChange = text => {
    if (text.length === 0) {
      this.active.setValue(0)
    }
    this.setState({ input: text })
  }

  fontSize = cond(
    eq(this.active, 1),
    sub(18, multiply(this.activeValue, 4)),
    18,
  )
  top = cond(
    eq(this.active, 1),
    multiply(18, sub(1, this.activeValue)),
    18,
  )
  color = cond(
    eq(this.active, 1),
    colorHSV(160, 0.79, add(0.79, multiply(this.activeValue, 0))),
    colorHSV(
      160,
      multiply(this.activeValue, 0.79),
      add(0.53, multiply(this.activeValue, sub(0.79, 0.53))),
    ),
  )
  borderBottomColor = cond(
    eq(this.focused, 1),
    colorHSV(
      160,
      multiply(this.focusedValue, 0.79),
      sub(0.93, multiply(this.focusedValue, sub(0.93, 0.79))),
    ),
    colorHSV(160, 0, 0.93),
  )

  render() {
    const { fontSize, top, borderBottomColor, color } = this
    const { placeholder, ...props } = this.props
    const { input } = this.state
    return (
      <TapGestureHandler onHandlerStateChange={this.handleStateChange}>
        <Animated.View style={[styles.view, { borderBottomColor }]}>
          <Animated.Text style={[styles.placeholder, { fontSize, top, color }]}>
            {placeholder}
          </Animated.Text>
          <TextInput
            {...props}
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
    fontSize: 18,
    fontFamily: 'Rubik',
    position: 'absolute',
  },
  input: {
    fontFamily: 'Rubik',
    fontSize: 18,
    color: '#444',
    width: '100%',
    height: 40,
    marginTop: 10,
  },
})

export default LabeledTextInput

import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { colorHSV } from './utils'

const {
  add,
  Value,
  Clock,
  cond,
  color,
  eq,
  event,
  multiply,
  set,
} = Animated


const anim = (clock, gestureState) => {
  return 0
}

class LabeledTextInput extends Component {
  state = { input: '' }
  gestureState = new Value(-1)
  clock = new Clock()
  handleStateChange = event([{ nativeEvent: { state: this.gestureState }}])
  value = anim(this.clock, this.gestureState)
  active = new Value(0)
  focused = new Value(0)

  handleKeyPress = () => this.active.setValue(1)
  handleFocus = () => this.focused.setValue(1)
  handleBlur = () => this.focused.setValue(0)

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

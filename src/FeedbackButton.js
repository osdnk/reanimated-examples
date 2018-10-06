import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'

const {
  add,
  and,
  block,
  Clock,
  color,
  cond,
  event,
  eq,
  max,
  min,
  multiply,
  neq,
  or,
  set,
  startClock,
  stopClock,
  sub,
  timing,
  Value,
} = Animated

import {
  match,
  colorHSV,
} from './utils'

const phase = {
  idle:   0,
  fill:   1,
  wait:   2,
  shrink: 3,
  done:   4,
}

const params = {
  buttonWidth: 120,
}

const anim = (clock, gestureState, currentPhase) => {
  const state = {
    finished:  new Value(0),
    position:  new Value(0),
    time:      new Value(0),
    frameTime: new Value(0),
  }

  const configFill = {
    duration: 150,
    toValue: new Value(1),
    easing: Easing.in(Easing.ease),
  }

  const configWait = {
    duration: 700,
    toValue: new Value(1),
    easing: Easing.in(Easing.ease),
  }

  const configShrink = {
    duration: 300,
    toValue: new Value(1),
    easing: Easing.in(Easing.ease),
  }

  const configDone = {
    duration: 500,
    toValue: new Value(1),
    easing: Easing.in(Easing.ease),
  }

  return block([
    cond(
      and(
        eq(currentPhase, phase.idle),
        eq(gestureState, State.BEGAN),
      ), [
        startClock(clock),
        set(currentPhase, phase.fill),
      ]),
      match([
        eq(currentPhase, phase.fill),
        timing(clock, state, configFill),
        eq(currentPhase, phase.wait),
        timing(clock, state, configWait),
        eq(currentPhase, phase.shrink),
        timing(clock, state, configShrink),
        eq(currentPhase, phase.done),
        timing(clock, state, configDone),
      ]),
      cond(state.finished, [
        stopClock(clock),
        cond(neq(currentPhase, phase.done), [
          set(state.finished, 0),
          set(state.position, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          startClock(clock),
        ]),
        set(currentPhase, min(add(currentPhase, 1), phase.done)),
      ]),
      state.position,
    ])
}

class FeedbackButton extends Component {
  gestureState = new Value(-1)
  animationPhase = new Value(0)
  clock = new Clock()
  handleStateChange = event([{ nativeEvent: { state: this.gestureState }}])
  value = anim(this.clock, this.gestureState, this.animationPhase)

  backgroundColor = match([
    eq(this.animationPhase, phase.idle),
    color(255, 255, add(255, multiply(this.value, 0))),
    eq(this.animationPhase, phase.fill),
    // white -> green
    colorHSV(
      this.props.h,
      multiply(this.value, this.props.s),
      sub(1, multiply(this.value, sub(1, this.props.v))),
    ),
    eq(this.animationPhase, phase.wait),
    colorHSV(this.props.h, this.props.s, this.props.v),
    eq(this.animationPhase, phase.shrink),
    // green -> white
    colorHSV(
      this.props.h,
      multiply(this.props.s, sub(1, this.value)),
      add(this.props.v, multiply(this.value, sub(1, this.props.v))),
    ),
    eq(this.animationPhase, phase.done),
    color(255, 255, add(255, multiply(this.value, 0))),
  ])

  width = match([
    or(
      eq(this.animationPhase, phase.idle),
      eq(this.animationPhase, phase.fill),
      eq(this.animationPhase, phase.wait),
    ),
    params.buttonWidth,
    eq(this.animationPhase, phase.shrink),
    max(50, multiply(params.buttonWidth, sub(1, this.value))),
    eq(this.animationPhase, phase.done),
    50,
  ])

  opacity = match([
    or(
      eq(this.animationPhase, phase.idle),
      eq(this.animationPhase, phase.fill),
      eq(this.animationPhase, phase.wait),
    ),
    1,
    eq(this.animationPhase, phase.shrink),
    max(0, sub(1, multiply(2, this.value))),
    eq(this.animationPhase, phase.done),
    0,
  ])

  color = match([
    eq(this.animationPhase, phase.idle),
    colorHSV(this.props.h, this.props.s, add(this.props.v, multiply(this.value, 0))),
    eq(this.animationPhase, phase.fill),
    // green -> white
    colorHSV(
      this.props.h,
      multiply(this.props.s, sub(1, this.value)),
      add(this.props.v, multiply(this.value, sub(1, this.props.v))),
    ),
    or(
      eq(this.animationPhase, phase.wait),
      eq(this.animationPhase, phase.shrink),
      eq(this.animationPhase, phase.done),
    ),
    color(255, 255, add(255, multiply(this.value, 0))),
  ])

  renderCheckMark = () =>
    <Animated.Text style={[styles.check, { color: this.props.rgb }]}>
      🌀
    </Animated.Text>

  renderTitle = () =>
    <Animated.View style={{ ...absoluteCenter, opacity: this.opacity }}>
      <Animated.Text style={[styles.text, { color: this.color }]}>
        {this.props.title}
      </Animated.Text>
    </Animated.View>

  renderCheckView = () =>
    <Animated.View style={[{
      ...absoluteCenter,
      opacity: cond(
        eq(this.animationPhase, phase.done),
        this.value,
        0,
      ),
    }]}>
      {this.renderCheckMark()}
    </Animated.View>

  render() {
    const {
      backgroundColor,
      width,
      renderTitle,
      renderCheckView,
    } = this

    return (
      <TapGestureHandler onHandlerStateChange={this.handleStateChange}>
        <Animated.View style={[styles.button, {
          backgroundColor,
          width,
          borderColor: this.props.rgb,
        }]}>
          {renderTitle()}
          {renderCheckView()}
        </Animated.View>
      </TapGestureHandler>
    )
  }
}

const absoluteCenter = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: 'rgb(77, 105, 249)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  text: {
    fontFamily: 'Rubik',
    fontWeight: '500',
    fontSize: 18,
  },
  check: {
    fontFamily: 'icomoon',
    fontSize: 30,
  },
})

export default FeedbackButton

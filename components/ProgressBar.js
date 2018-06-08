import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Animated,
  View
} from 'react-native'

const backgroundColor = 'rgba(255,255,255,0.25)'

const styles = StyleSheet.create({
  outerBar: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  completed: {
    height: 3
  },
  incomplete: {
    height: 3,
    backgroundColor
  }
})

class ProgressBar extends Component {
  constructor() {
    super()
    this.complete = new Animated.Value(0)
    this.incomplete = new Animated.Value(1)
  }

  render() {
    const { progress, theme } = this.props
    const incomplete = 1 - progress
    Animated.parallel([
      Animated.timing(this.complete, { toValue: progress, duration: 250 }),
      Animated.timing(this.incomplete, { toValue: incomplete, duration: 250 })
    ]).start()
    return (
      <View style={styles.outerBar}>
        <Animated.View style={[{ flex: this.complete, backgroundColor: theme }, styles.completed]} />
        <Animated.View style={[{ flex: this.incomplete }, styles.incomplete]} />
      </View>
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired
}

export { ProgressBar }

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

const backgroundColor = 'transparent'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor,
    justifyContent: 'center',
    padding: 10,
    minWidth: 60
  }
})

class Time extends Component {
  getTime(time) {
    // format the seconds saved into 00:00:00
    const secs = time % 60
    const s2 = (time - secs) / 60
    const mins = s2 % 60
    const hrs = (s2 - mins) / 60
    const hours = this.addZeros(hrs) > 0 ? `${this.addZeros(hrs)}:` : ''
    return `${hours}${this.addZeros(mins)}:${this.addZeros(secs)}`
  }

  addZeros(time) {
    return (time < 10) ? (`0${time}`) : time
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: this.props.theme }}>{this.getTime(parseInt(this.props.time, 10))}</Text>
      </View>
    )
  }
}

Time.propTypes = {
  time: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired
}

export { Time }

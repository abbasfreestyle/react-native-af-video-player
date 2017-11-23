import React, { Component } from 'react'
import { number, string } from 'prop-types'
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
  getTime(s) {
    // format the seconds saved into 00:00:00
    const secs = s % 60
    const s2 = (s - secs) / 60
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
  time: number,
  theme: string
}

Time.defaultProps = {
  time: 0,
  theme: null
}

export { Time }

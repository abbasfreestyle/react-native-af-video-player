import React, { Component } from 'react'
import { bool, string } from 'prop-types'
import {
  View,
  Easing,
  StyleSheet,
  Animated
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    height: 5,
    width: 75
  }
})

class Loading extends Component {
  constructor() {
    super()
    this.state = {
      width: new Animated.Value(10),
      translateX: new Animated.Value(-50)
    }
  }

  componentDidMount() {
    Animated.loop(Animated.parallel([
      Animated.sequence([
        Animated.timing(this.state.width, {
          toValue: 75,
          easing: Easing.back(1),
          duration: 750
        }),
        Animated.timing(this.state.width, {
          toValue: 10,
          // easing: Easing.back(2),
          duration: 250
        }),
        Animated.timing(this.state.width, {
          toValue: 75,
          easing: Easing.back(1),
          duration: 750
        }),
        Animated.timing(this.state.width, {
          toValue: 10,
          // easing: Easing.back(2),
          duration: 250
        })
      ]),
      Animated.sequence([
        Animated.timing(this.state.translateX, { toValue: 50, easing: Easing.back(1), duration: 1000 }),
        Animated.timing(this.state.translateX, { toValue: -50, easing: Easing.back(1), duration: 1000 })
      ])
    ])).start()
  }

  render() {
    const { translateX, width } = this.state
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <Animated.View style={[
            styles.line,
            {
              backgroundColor: this.props.theme,
              width,
              transform: [{ translateX }]
            }
          ]}
          />
        </View>
      )
    }
    return null
  }
}

Loading.propTypes = {
  loading: bool,
  theme: string
}

Loading.defaultProps = {
  loading: true,
  theme: null
}

export { Loading }

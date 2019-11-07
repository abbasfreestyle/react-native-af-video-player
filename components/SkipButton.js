import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'

const backgroundColor = 'transparent'

const styles = StyleSheet.create({
  skipButton: {
    opacity: 0.9
  },
  skipContainer: {
    flex: 1,
    backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const SkipButton = props => (
  <View style={styles.skipContainer}>
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
      <Icons
        style={styles.skipButton}
        name={props.rewind ? 'replay-5' : 'forward-10'}
        color={props.theme}
        size={40}
      />
    </TouchableOpacity>
  </View>
)

SkipButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  rewind: PropTypes.bool.isRequired
}

export { SkipButton }

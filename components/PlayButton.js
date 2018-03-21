import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'

const backgroundColor = 'transparent'

const styles = StyleSheet.create({
  playButton: {
    opacity: 0.9
  },
  playContainer: {
    flex: 1,
    backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const PlayButton = props => (
  <View style={styles.playContainer}>
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
      <Icons
        style={styles.playButton}
        name={props.paused ? 'play-circle-outline' : 'pause-circle-outline'}
        color={props.theme}
        size={75}
      />
    </TouchableOpacity>
  </View>
)

PlayButton.propTypes = {
  onPress: PropTypes.func,
  paused: PropTypes.bool,
  theme: PropTypes.string
}

PlayButton.defaultProps = {
  onPress: undefined,
  paused: false,
  theme: null
}

export { PlayButton }

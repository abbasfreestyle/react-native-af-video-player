import React from 'react'
import { func, bool, string } from 'prop-types'
import { View, StyleSheet } from 'react-native'
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
    <Icons
      style={styles.playButton}
      onPress={() => props.onPress()}
      name={props.paused ? 'play-circle-outline' : 'pause-circle-outline'}
      color={props.theme}
      size={75}
    />
  </View>
)

PlayButton.propTypes = {
  onPress: func,
  paused: bool,
  theme: string
}

PlayButton.defaultProps = {
  onPress: undefined,
  paused: false,
  theme: null
}

export { PlayButton }

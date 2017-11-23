import React from 'react' // eslint-disable-line
import { func, number, string } from 'prop-types'
import {
  View,
  Platform,
  StyleSheet,
  Slider as RNSlider
} from 'react-native'
import Slider from 'react-native-slider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  slider: {
    marginHorizontal: -10
  }
})

const Scrubber = (props) => {
  const trackColor = 'rgba(255,255,255,0.5)'
  const { progress, theme } = props
  const thumbStyle = { width: 15, height: 15 }
  const trackStyle = { borderRadius: 1 }
  return (
    <View style={styles.container}>
      { Platform.OS === 'ios' ?
        <Slider
          onValueChange={val => props.onSeek(val)}
          onSlidingComplete={val => props.onSeekRelease(val)}
          value={progress}
          thumbTintColor={theme}
          thumbStyle={thumbStyle}
          trackStyle={trackStyle}
          minimumTrackTintColor={theme}
          maximumTrackTintColor={trackColor}
        />
      :
        <RNSlider
          style={styles.slider}
          onValueChange={val => props.onSeek(val)}
          onSlidingComplete={val => props.onSeekRelease(val)}
          value={progress}
          thumbTintColor={theme}
          minimumTrackTintColor={theme}
          maximumTrackTintColor={trackColor}
        />
      }
    </View>
  )
}

Scrubber.propTypes = {
  onSeek: func,
  onSeekRelease: func,
  progress: number,
  theme: string
}

Scrubber.defaultProps = {
  onSeek: undefined,
  onSeekRelease: undefined,
  progress: 0,
  theme: null
}

export { Scrubber }

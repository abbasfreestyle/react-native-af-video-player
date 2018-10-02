import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ToggleIcon, Time, Scrubber } from './'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 35,
    alignSelf: 'stretch',
    justifyContent: 'flex-end'
  }
});

const normalView = (props) => {
  const {
    onSeek,
    onSeekRelease,
    progress,
    currentTime,
    duration,
    muted,
    showMute,
    theme,
    settings,
    onSettingsPress
  } = props;

  return (
    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']} style={styles.container}>
      <Time time={currentTime} theme={theme.seconds} />
      <Scrubber
        onSeek={pos => onSeek(pos)}
        onSeekRelease={pos => onSeekRelease(pos)}
        progress={progress}
        theme={{ scrubberThumb: theme.scrubberThumb, scrubberBar: theme.scrubberBar }}
      />
      { showMute &&
      <ToggleIcon
        paddingLeft
        theme={theme.volume}
        onPress={() => props.toggleMute()}
        isOn={muted}
        iconOff="volume-up"
        iconOn="volume-mute"
        size={20}
      />}
      <Time time={duration} theme={theme.duration} />
      { settings &&
      <ToggleIcon
        style={styles.settings}
        onPress={() => onSettingsPress()}
        paddingRight
        iconOff="settings"
        iconOn="settings"
        theme={theme.settings}
        size={25}
      />}
    </LinearGradient>
  )
}


const ControlBar = (props) => {
    return (normalView(props));
};

ControlBar.propTypes = {
  toggleMute: PropTypes.func.isRequired,
  showMute: PropTypes.bool.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekRelease: PropTypes.func.isRequired,
  muted: PropTypes.bool.isRequired,
  minimized: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  settings: PropTypes.bool.isRequired,
  onSettingsPress: PropTypes.func.isRequired
};

export { ControlBar }

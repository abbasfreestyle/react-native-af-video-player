import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ToggleIcon, Time, Scrubber } from "./";
import { isIphoneX } from "./utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 35,
    alignSelf: "stretch",
    justifyContent: "flex-end"
  },
  iPhoneXStyle: {
    marginBottom: 34
  }
});

const ControlBar = props => {
  const {
    onSeek,
    onSeekRelease,
    progress,
    currentTime,
    duration,
    muted,
    paused,
    fullscreen,
    theme,
    inlineOnly
  } = props;

  return (
    <LinearGradient
      colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.75)"]}
      style={[
        styles.container,
        isIphoneX() && fullscreen && styles.iPhoneXStyle
      ]}
    >
      {/* <Time time={currentTime} theme={theme.seconds} /> */}
      <ToggleIcon
        paddingLeft
        name="play"
        theme={theme.volume}
        onPress={() => props.togglePlay()}
        iconOn="play-arrow"
        iconOff="pause"
        isOn={paused}
      />
      <Scrubber
        onSeek={pos => onSeek(pos)}
        onSeekRelease={pos => onSeekRelease(pos)}
        progress={progress}
        theme={{
          scrubberThumb: theme.scrubberThumb,
          scrubberBar: theme.scrubberBar
        }}
      />
      <ToggleIcon
        name="volume"
        paddingLeft
        theme={theme.volume}
        onPress={() => props.toggleMute()}
        isOn={muted}
        iconOff="volume-up"
        iconOn="volume-mute"
        size={20}
      />
      <Time time={duration - currentTime} theme={theme.duration} />
      {!inlineOnly && (
        <ToggleIcon
          name="screen"
          paddingRight
          onPress={() => props.toggleFS()}
          iconOff="fullscreen"
          iconOn="fullscreen-exit"
          isOn={fullscreen}
          theme={theme.fullscreen}
        />
      )}
    </LinearGradient>
  );
};

ControlBar.propTypes = {
  toggleFS: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekRelease: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  inlineOnly: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

export { ControlBar };

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback as Touchable
} from 'react-native'
import {
  PlayButton,
  ControlBar,
  Loading,
  TopBar,
  ProgressBar,
  StyledPlayButton
} from './';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99
  },
  flex: {
    flex: 1
  }
});

class Controls extends Component {
  constructor() {
    super();
    this.state = {
      hideControls: false,
      seconds: 0,
      seeking: false
    };
    this.animControls = new Animated.Value(1);
    this.scale = new Animated.Value(1);
    this.progressbar = new Animated.Value(2);
  }

  componentDidMount() {
    this.setTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onSeek(pos) {
    this.props.onSeek(pos);
    if (!this.state.seeking) {
      this.setState({ seeking: true })
    }
  }

  onSeekRelease(pos) {
    this.props.onSeekRelease(pos);
    this.setState({ seeking: false, seconds: 0 })
  }

  setTimer() {
    this.timer = setInterval(() => {
      switch (true) {
        case this.state.seeking:
          // do nothing
          break ;
        case this.props.paused:
          if (this.state.seconds > 0) this.setState({ seconds: 0 })
          break;
        case this.state.hideControls:
          break;
        case this.state.seconds > 3:
          this.hideControls();
          break;
        default:
          this.setState({ seconds: this.state.seconds + 1 })
      }
    }, 1000)
  }

  showControls() {
    this.setState({ hideControls: false }, () => {
      this.progressbar.setValue(2)
      Animated.parallel([
        Animated.timing(this.animControls, { toValue: 1, duration: 200 }),
        Animated.timing(this.scale, { toValue: 1, duration: 200 })
      ]).start()
    })
  }

  hideControls() {
    Animated.parallel([
      Animated.timing(this.animControls, { toValue: 0, duration: 200 }),
      Animated.timing(this.scale, { toValue: 0.25, duration: 200 })
    ]).start(() => this.setState({ hideControls: true, seconds: 0 }))
  }

  hiddenControls() {
    Animated.timing(this.progressbar, { toValue: 0, duration: 200 }).start()
    return (
      <Touchable style={styles.container} onPress={() => this.showControls()}>
        <Animated.View style={[styles.container, { paddingBottom: this.progressbar }]}>
          <ProgressBar theme={this.props.theme.progress} progress={this.props.progress} />
        </Animated.View>
      </Touchable>
    )
  }

  loading() {
    return (
      <View style={styles.container}>
        <Loading theme={this.props.theme.loading} />
      </View>
    )
  }

  displayedControls() {
    const {
      paused,
      fullscreen,
      muted,
      loading,
      more,
      onMorePress,
      title,
      progress,
      currentTime,
      duration,
      theme,
      inlineOnly,
      settings,
      onSettingsPress,
      alternatePlayBtn,
      mediaType
    } = this.props;

    const { center, ...controlBar } = theme;

    return (
      <Touchable onPress={() => this.hideControls()}>
        <Animated.View style={[styles.container, { opacity: this.animControls }]}>
          <TopBar
            title={title}
            more={more}
            onMorePress={() => onMorePress()}
            theme={{ title: theme.title, more: theme.more, fullscreen: theme.fullscreen }}
            toggleFS={() => this.props.toggleFS()}
            fullscreen={fullscreen}
          />
          <Animated.View style={[styles.flex, { transform: [{ scale: this.scale }] }]}>
            {
              alternatePlayBtn ?
                (
                  <StyledPlayButton
                    onPress={() => this.props.togglePlay()}
                    paused={paused}
                    mediaType={mediaType}
                  />
                ) :
                (
                  <PlayButton
                    onPress={() => this.props.togglePlay()}
                    paused={paused}
                    loading={loading}
                    theme={center}
                  />
                )
            }
          </Animated.View>
          <ControlBar
            showMute={false}
            toggleMute={() => this.props.toggleMute()}
            togglePlay={() => this.props.togglePlay()}
            muted={muted}
            paused={paused}
            fullscreen={fullscreen}
            onSeek={pos => this.onSeek(pos)}
            onSeekRelease={pos => this.onSeekRelease(pos)}
            progress={progress}
            currentTime={currentTime}
            duration={duration}
            theme={controlBar}
            inlineOnly={inlineOnly}
            settings={settings}
            onSettingsPress={() => onSettingsPress()}
          />
        </Animated.View>
      </Touchable>
    )
  }

  render() {
    if (this.props.loading) return this.loading()
    if (this.state.hideControls) {
      return this.hiddenControls()
    }
    return this.displayedControls()
  }
}

Controls.propTypes = {
  toggleFS: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekRelease: PropTypes.func.isRequired,
  onMorePress: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  inlineOnly: PropTypes.bool.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  more: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  settings: PropTypes.bool.isRequired,
  onSettingsPress: PropTypes.func.isRequired,
  alternatePlayBtn: PropTypes.bool.isRequired,
  mediaType: PropTypes.oneOf(['video', 'audio']).isRequired
};

export { Controls }

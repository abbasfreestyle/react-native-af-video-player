import React, { Component } from 'react'
import { func, bool, number, string } from 'prop-types'
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
  ProgressBar
} from './'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99
  },
  flex: {
    flex: 1
  }
})

class Controls extends Component {
  constructor() {
    super()
    this.state = {
      hideControls: false,
      seconds: 0,
      seeking: false
    }
    this.animControls = new Animated.Value(1)
    this.scale = new Animated.Value(1)
    this.progressbar = new Animated.Value(2)
  }

  componentDidMount() {
    this.setTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onSeek(pos) {
    this.props.onSeek(pos)
    if (!this.state.seeking) {
      this.setState({ seeking: true })
    }
  }

  onSeekRelease(pos) {
    this.props.onSeekRelease(pos)
    this.setState({ seeking: false, seconds: 0 })
  }

  setTimer() {
    this.timer = setInterval(() => {
      switch (true) {
        case this.state.seeking:
          // do nothing
          break
        case this.props.paused:
          if (this.state.seconds > 0) this.setState({ seconds: 0 })
          break
        case this.state.hideControls:
          break
        case this.state.seconds > 3:
          this.hideControls()
          break
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
          <ProgressBar theme={this.props.theme} progress={this.props.progress} />
        </Animated.View>
      </Touchable>
    )
  }

  loading() {
    return (
      <View style={styles.container}>
        <Loading theme={this.props.theme} />
      </View>
    )
  }

  displayedControls() {
    const {
      paused,
      fullscreen,
      muted,
      loading,
      logo,
      more,
      onMorePress,
      title,
      progress,
      currentTime,
      duration,
      theme,
      inlineOnly
    } = this.props

    return (
      <Touchable onPress={() => this.hideControls()}>
        <Animated.View style={[styles.container, { opacity: this.animControls }]}>
          <TopBar
            title={title}
            logo={logo}
            more={more}
            onMorePress={() => onMorePress()}
            theme={theme}
          />
          <Animated.View style={[styles.flex, { transform: [{ scale: this.scale }] }]}>
            <PlayButton
              onPress={() => this.props.togglePlay()}
              paused={paused}
              loading={loading}
              theme={theme}
            />
          </Animated.View>
          <ControlBar
            toggleFS={() => this.props.toggleFS()}
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
            theme={theme}
            inlineOnly={inlineOnly}
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
  toggleFS: func,
  toggleMute: func,
  togglePlay: func,
  onSeek: func,
  onSeekRelease: func,
  onMorePress: func,
  paused: bool,
  inlineOnly: bool,
  fullscreen: bool,
  muted: bool,
  more: bool,
  loading: bool,
  progress: number,
  currentTime: number,
  duration: number,
  title: string,
  logo: string,
  theme: string
}

Controls.defaultProps = {
  toggleFS: undefined,
  toggleMute: undefined,
  togglePlay: undefined,
  onMorePress: undefined,
  onSeek: undefined,
  onSeekRelease: undefined,
  paused: false,
  more: false,
  inlineOnly: false,
  fullscreen: false,
  muted: false,
  loading: true,
  progress: 0,
  currentTime: 0,
  duration: 0,
  title: '',
  logo: undefined,
  theme: null
}

export { Controls }

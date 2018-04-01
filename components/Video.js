import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  BackHandler,
  Animated,
  Image,
  Alert
} from 'react-native'
import VideoPlayer from 'react-native-video'
import KeepAwake from 'react-native-keep-awake'
import Orientation from 'react-native-orientation'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Controls } from './'
const Win = Dimensions.get('window')
const backgroundColor = '#000'

const styles = StyleSheet.create({
  background: {
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 98
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99
  }
})

class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paused: !props.autoPlay,
      muted: false,
      fullScreen: false,
      inlineHeight: Win.width * 0.5625,
      loading: false,
      duration: 0,
      progress: 0,
      currentTime: 0,
      seeking: false,
      renderError: false
    }
    this.animInline = new Animated.Value(Win.width * 0.5625)
    this.animFullscreen = new Animated.Value(Win.width * 0.5625)
    this.BackHandler = this.BackHandler.bind(this)
    this.onRotated = this.onRotated.bind(this)
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onRotated)
    BackHandler.addEventListener('hardwareBackPress', this.BackHandler)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onRotated)
    BackHandler.removeEventListener('hardwareBackPress', this.BackHandler)
  }

  onLoadStart() {
    this.setState({ paused: true, loading: true })
  }

  onLoad(data) {
    if (!this.state.loading) return
    this.props.onLoad(data)
    const { height, width } = data.naturalSize
    const ratio = height === 'undefined' && width === 'undefined' ?
      (9 / 16) : (height / width)
    const inlineHeight = this.props.lockRatio ?
      (Win.width / this.props.lockRatio)
      : (Win.width * ratio)
    this.setState({
      paused: !this.props.autoPlay,
      loading: false,
      inlineHeight,
      duration: data.duration
    }, () => {
      Animated.timing(this.animInline, { toValue: inlineHeight, duration: 200 }).start()
      if (!this.state.paused) {
        KeepAwake.activate()
        if (this.props.fullScreenOnly) {
          this.setState({ fullScreen: true }, () => {
            this.props.onFullScreen(this.state.fullScreen)
            this.animToFullscreen(Win.height)
            if (this.props.rotateToFullScreen) Orientation.lockToLandscape()
          })
        }
      }
    })
  }

  // onBuffer() {
  //   // console.log('buffering')
  //   this.setState({ loading: true, paused: true })
  // }

  onEnd() {
    this.props.onEnd()
    const { loop } = this.props
    if (!loop) this.pause()
    this.onSeekRelease(0)
    this.setState({ currentTime: 0 }, () => {
      if (!loop) this.controls.showControls()
    })
  }

  onRotated({ window: { width, height } }) {
    // Add this condition incase if inline and fullscreen options are turned on
    if (this.props.inlineOnly) return
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT'
    if (this.props.rotateToFullScreen) {
      if (orientation === 'LANDSCAPE') {
        this.setState({ fullScreen: true }, () => {
          this.animToFullscreen(height)
          this.props.onFullScreen(this.state.fullScreen)
        })
        return
      }
      if (orientation === 'PORTRAIT') {
        this.setState({
          fullScreen: false,
          paused: this.props.fullScreenOnly || this.state.paused
        }, () => {
          this.animToInline()
          this.props.onFullScreen(this.state.fullScreen)
        })
        return
      }
    } else {
      this.animToInline()
    }
    if (this.state.fullScreen) this.animToFullscreen(height)
  }

  onSeekRelease(pos) {
    const newPosition = pos * this.state.duration
    this.setState({ progress: pos, seeking: false }, () => {
      this.player.seek(newPosition)
    })
  }

  onError(msg) {
    this.props.onError(msg)
    const { error } = this.props
    this.setState({ renderError: true }, () => {
      let type
      switch (true) {
        case error === false:
          type = error
          break
        case typeof error === 'object':
          type = Alert.alert(error.title, error.message, error.button, error.options)
          break
        default:
          type = Alert.alert('Oops!', 'There was an error playing this video, please try again later.', [{ text: 'Close' }])
          break
      }
      return type
    })
  }

  BackHandler() {
    if (this.state.fullScreen) {
      this.setState({ fullScreen: false }, () => {
        this.animToInline()
        this.props.onFullScreen(this.state.fullScreen)
        if (this.props.fullScreenOnly && !this.state.paused) this.togglePlay()
        if (this.props.rotateToFullScreen) Orientation.lockToPortrait()
        setTimeout(() => {
          if (!this.props.lockPortraitOnFsExit) Orientation.unlockAllOrientations()
        }, 1500)
      })
      return true
    }
    return false
  }

  pause() {
    if (!this.state.paused) this.togglePlay()
  }

  play() {
    if (this.state.paused) this.togglePlay()
  }

  togglePlay() {
    this.setState({ paused: !this.state.paused }, () => {
      Orientation.getOrientation((e, orientation) => {
        if (this.props.inlineOnly) return
        if (!this.state.paused) {
          if (this.props.fullScreenOnly && !this.state.fullScreen) {
            this.setState({ fullScreen: true }, () => {
              this.props.onFullScreen(this.state.fullScreen)
              const initialOrient = Orientation.getInitialOrientation()
              const height = orientation !== initialOrient ?
                Win.width : Win.height
              this.animToFullscreen(height)
              if (this.props.rotateToFullScreen) Orientation.lockToLandscape()
            })
          }
          KeepAwake.activate()
        } else {
          KeepAwake.deactivate()
        }
      })
    })
  }

  toggleFS() {
    this.setState({ fullScreen: !this.state.fullScreen }, () => {
      Orientation.getOrientation((e, orientation) => {
        if (this.state.fullScreen) {
          const initialOrient = Orientation.getInitialOrientation()
          const height = orientation !== initialOrient ?
            Win.width : Win.height
          this.animToFullscreen(height)
          this.props.onFullScreen(this.state.fullScreen)
          if (this.props.rotateToFullScreen) Orientation.lockToLandscape()
        } else {
          if (this.props.fullScreenOnly) this.setState({ paused: true })
          this.animToInline()
          this.props.onFullScreen(this.state.fullScreen)
          if (this.props.rotateToFullScreen) Orientation.lockToPortrait()
          setTimeout(() => {
            if (!this.props.lockPortraitOnFsExit) Orientation.unlockAllOrientations()
          }, 1500)
        }
      })
    })
  }

  animToFullscreen(height) {
    Animated.parallel([
      Animated.timing(this.animFullscreen, { toValue: height, duration: 200 }),
      Animated.timing(this.animInline, { toValue: height, duration: 200 })
    ]).start()
  }

  animToInline(height) {
    const newHeight = height || this.state.inlineHeight
    Animated.parallel([
      Animated.timing(this.animFullscreen, { toValue: newHeight, duration: 100 }),
      Animated.timing(this.animInline, { toValue: this.state.inlineHeight, duration: 100 })
    ]).start()
  }

  toggleMute() {
    this.setState({ muted: !this.state.muted })
  }

  seek(val) {
    const currentTime = val * this.state.duration
    this.setState({ seeking: true, currentTime })
  }

  progress(time) {
    const { currentTime } = time
    const progress = currentTime / this.state.duration
    if (!this.state.seeking) {
      this.setState({ progress, currentTime }, () => {
        this.props.onProgress(time)
      })
    }
  }

  checkSource(uri) {
    return typeof uri === 'string' ?
      { source: { uri } } : { source: uri }
  }

  renderError() {
    const { fullScreen } = this.state
    const inline = {
      height: this.animInline,
      alignSelf: 'stretch'
    }
    const textStyle = { color: 'white', padding: 10 }
    return (
      <Animated.View
        style={[styles.background, fullScreen ? styles.fullScreen : inline]}
      >
        <Text style={textStyle}>Retry</Text>
        <Icons
          name="replay"
          size={60}
          color={this.props.theme}
          onPress={() => this.setState({ renderError: false })}
        />
      </Animated.View>
    )
  }

  renderPlayer() {
    const {
      fullScreen,
      paused,
      muted,
      loading,
      progress,
      duration,
      inlineHeight,
      currentTime
    } = this.state

    const {
      url,
      loop,
      title,
      logo,
      rate,
      style,
      volume,
      placeholder,
      theme,
      onTimedMetadata,
      resizeMode,
      onMorePress,
      inlineOnly,
      playInBackground,
      playWhenInactive
    } = this.props

    const inline = {
      height: inlineHeight,
      alignSelf: 'stretch'
    }

    return (
      <Animated.View
        style={[
          styles.background,
          fullScreen ?
            (styles.fullScreen, { height: this.animFullscreen })
            : { height: this.animInline },
          fullScreen ? null : style
        ]}
      >
        <StatusBar hidden={fullScreen} />
        {
          ((loading && placeholder) || currentTime < 0.1) &&
          <Image resizeMode="cover" style={styles.image} source={{ uri: placeholder }} />
        }
        <VideoPlayer
          {...this.checkSource(url)}
          paused={paused}
          resizeMode={resizeMode}
          repeat={loop}
          style={fullScreen ? styles.fullScreen : inline}
          ref={(ref) => { this.player = ref }}
          rate={rate}
          volume={volume}
          muted={muted}
          playInBackground={playInBackground} // Audio continues to play when app entering background.
          playWhenInactive={playWhenInactive} // [iOS] Video continues to play when control or notification center are shown.
          // progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          onLoadStart={() => this.onLoadStart()} // Callback when video starts to load
          onLoad={e => this.onLoad(e)} // Callback when video loads
          onProgress={e => this.progress(e)} // Callback every ~250ms with currentTime
          onEnd={() => this.onEnd()}
          onError={e => this.onError(e)}
          // onBuffer={() => this.onBuffer()} // Callback when remote video is buffering
          onTimedMetadata={e => onTimedMetadata(e)} // Callback when the stream receive some metadata
        />
        <Controls
          ref={(ref) => { this.controls = ref }}
          toggleMute={() => this.toggleMute()}
          toggleFS={() => this.toggleFS()}
          togglePlay={() => this.togglePlay()}
          paused={paused}
          muted={muted}
          fullscreen={fullScreen}
          loading={loading}
          onSeek={val => this.seek(val)}
          onSeekRelease={pos => this.onSeekRelease(pos)}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          logo={logo}
          title={title}
          more={!!onMorePress}
          onMorePress={() => onMorePress()}
          theme={theme}
          inlineOnly={inlineOnly}
        />
      </Animated.View>
    )
  }

  render() {
    if (this.state.renderError) return this.renderError()
    return this.renderPlayer()
  }
}

Video.propTypes = {
  url: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  title: PropTypes.string,
  logo: PropTypes.string,
  resizeMode: PropTypes.string,
  onMorePress: PropTypes.func,
  onFullScreen: PropTypes.func,
  onTimedMetadata: PropTypes.func,
  theme: PropTypes.string,
  placeholder: PropTypes.string,
  rotateToFullScreen: PropTypes.bool,
  fullScreenOnly: PropTypes.bool,
  inlineOnly: PropTypes.bool,
  rate: PropTypes.number,
  volume: PropTypes.number,
  playInBackground: PropTypes.bool,
  playWhenInactive: PropTypes.bool,
  lockPortraitOnFsExit: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  onError: PropTypes.func,
  onEnd: PropTypes.func,
  onProgress: PropTypes.func,
  onLoad: PropTypes.func,
  lockRatio: PropTypes.number
}

Video.defaultProps = {
  autoPlay: false,
  loop: false,
  title: '',
  logo: undefined,
  resizeMode: 'contain',
  onMorePress: undefined,
  onFullScreen: () => {},
  onTimedMetadata: undefined,
  theme: 'white',
  placeholder: undefined,
  rotateToFullScreen: false,
  fullScreenOnly: false,
  inlineOnly: false,
  playInBackground: false,
  playWhenInactive: false,
  rate: 1,
  volume: 1,
  lockPortraitOnFsExit: false,
  style: {},
  error: true,
  onError: () => {},
  onEnd: () => {},
  onProgress: () => {},
  onLoad: () => {},
  lockRatio: undefined
}

export default Video

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  BackHandler,
  Image,
  Alert,
  Platform
} from 'react-native'
import Video from 'react-native-video'
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
  inline: {
    height: Win.width * 0.5625,
    alignSelf: 'stretch'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99
  }
})

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paused: !props.autoPlay,
      muted: false,
      fullScreen: false,
      height: Win.height,
      loading: false,
      duration: 0,
      progress: 0,
      currentTime: 0,
      seeking: false,
      renderError: false
    }
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

  onLoad(data) {
    if (!this.state.loading) return
    this.setState({
      paused: !this.props.autoPlay,
      loading: false,
      duration: data.duration
    }, () => {
      if (!this.state.paused) {
        KeepAwake.activate()
        if (this.props.fullScreenOnly) {
          this.setState({ fullScreen: true }, () => {
            this.props.onFullScreen(this.state.fullScreen)
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
    const { loop } = this.props
    if (!loop) this.pause()
    this.onSeekRelease(0)
    this.setState({ currentTime: 0 }, () => {
      if (!loop) this.controls.showControls()
    })
  }

  onFullScreenCallback() {
    this.props.onFullScreen(this.state.fullScreen);
  }

  setStateAfterRotate(orientation, height) {
    switch (orientation) {
      case 'LANDSCAPE':
        this.setState({
          fullScreen: true,
          landscape: true,
          height
        }, () => {
          this.props.onFullScreen(this.state.fullScreen);
        });
        break;
      case 'PORTRAIT':
        this.setState({
          fullsScreen: false,
          landscape: false,
          height,
          paused: (this.props.fullScreenOnly && this.state.landscape) || this.state.paused
        }, () => {
          this.props.onFullScreen(this.state.fullScreen);
        });
      default:
        return;
    }
  }

  rotateAndroid(width, height) {
    Orientation.getOrientation((err, orientation) => {
      if (orientation === 'LANDSCAPE') {
        console.log(orientation);
        this.setStateAfterRotate(orientation, Math.min(width, height));
      }
      if (orientation === 'PORTRAIT') {
        console.log(orientation);
        this.setStateAfterRotate(orientation, Math.max(width, height));
      }
    });
  }

  rotateIOS(width, height) {
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
    if (orientation === 'LANDSCAPE') {
      this.setStateAfterRotate(orientation, height);
    }
    if (orientation === 'PORTRAIT') {
      this.setStateAfterRotate(orientation, height);
    }
  }

  onRotated({ window: { width, height } }) {
    // Add this condition in case if inline and fullscreen options are turned on
    if (this.props.inlineOnly) return;
    // Only rotate to FS when video is already playing
    if (this.state.paused) return;
    const _width = width;
    const _height = height;
    if (this.props.rotateToFullScreen) {
      Platform.OS === 'ios' ? this.rotateIOS(_width, _height) : this.rotateAndroid(_width, _height);
    } else {
      this.setState({ height: _height });
    }
  }

  onSeekRelease(pos) {
    const newPosition = pos * this.state.duration
    this.setState({ progress: pos, seeking: false }, () => {
      this.player.seek(newPosition)
    })
  }

  onError() {
    this.setState({ renderError: true }, () => {
      Alert.alert('Oops', 'There was an error playing this video, please try again later.', [{ text: 'Close' }])
    })
  }

  BackHandler() {
    if (this.state.fullScreen) {
      this.setState({ fullScreen: false, landscape: false }, () => {
        this.props.onFullScreen(this.state.fullScreen)
        if (this.props.fullScreenOnly && !this.state.paused) this.togglePlay()
        Orientation.lockToPortrait()
        setTimeout(() => {
          if (!this.props.lockPortraitOnFsExit) Orientation.unlockAllOrientations()
        }, 1500)
      })
      return true
    }
    return false
  }

  loadStart() {
    this.setState({ paused: true, loading: true })
  }

  pause() {
    if (!this.state.paused) this.togglePlay()
  }

  play() {
    if (this.state.paused) this.togglePlay()
  }

  togglePlay() {
    this.setState({ paused: !this.state.paused }, () => {
      if (this.props.togglePlayCB) {
        this.props.togglePlayCB();
      }
      if (this.props.inlineOnly) return
      if (!this.state.paused) {
        if (this.props.fullScreenOnly && !this.state.fullScreen) {
          this.setState({ fullScreen: true }, () => {
            this.props.onFullScreen(this.state.fullScreen)
            if (this.props.rotateToFullScreen) Orientation.lockToLandscape()
          })
        }
        KeepAwake.activate()
      } else {
        KeepAwake.deactivate()
      }
    })
  }

  toggleFS() {
    if ((!this.state.paused && !this.state.fullScreen) || (this.state.fullScreen)) {
      this.setState({
        fullScreen: !this.state.fullScreen
      }, () => {
        if (this.state.fullScreen) {
          this.props.onFullScreen(this.state.fullScreen)
          if (this.props.rotateToFullScreen) Orientation.lockToLandscape()
        } else {
          if (this.props.fullScreenOnly) this.setState({ paused: true })
          this.props.onFullScreen(this.state.fullScreen)
          Orientation.lockToPortrait()
          setTimeout(() => {
            if (!this.props.lockPortraitOnFsExit) Orientation.unlockAllOrientations()
          }, 1500)
        }
      })
    }
  }

  toggleMute() {
    this.setState({ muted: !this.state.muted });
    if (this.props.storeMute) {
      this.props.storeMute();
    }
  }

  seek(val) {
    const currentTime = val * this.state.duration
    this.setState({ seeking: true, currentTime })
  }

  progress(time) {
    const progress = time.currentTime / this.state.duration
    if (!this.state.seeking) {
      this.setState({ progress, currentTime: time.currentTime })
    }
  }

  renderError() {
    const { fullScreen } = this.state
    const textStyle = { color: 'white', padding: 10 }
    return (
      <View
        style={[styles.background, fullScreen ? styles.fullScreen : styles.inline]}
      >
        <Text style={textStyle}>Retry</Text>
        <Icons
          name="replay"
          size={60}
          color={this.props.theme}
          onPress={() => this.setState({ renderError: false })}
        />
      </View>
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
      height,
      currentTime
    } = this.state

    const {
      url,
      loop,
      title,
      logo,
      rate,
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

    return (
      <View
        style={[styles.background, fullScreen ? (styles.fullScreen, { height }) : styles.inline]}
      >
        <StatusBar hidden={fullScreen} />
        {
          ((loading && placeholder) || currentTime < 0.1) &&
          <Image resizeMode="cover" style={styles.image} source={{ uri: placeholder }} />
        }
        <Video
          source={{ uri: url }}
          paused={paused}
          resizeMode={resizeMode}
          repeat={loop}
          style={fullScreen ? styles.fullScreen : styles.inline}
          ref={(ref) => { this.player = ref }}
          rate={rate}
          volume={volume}
          muted={muted}
          playInBackground={playInBackground} // Audio continues to play when app entering background.
          playWhenInactive={playWhenInactive} // [iOS] Video continues to play when control or notification center are shown.
          // progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          onLoadStart={() => this.loadStart()} // Callback when video starts to load
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
      </View>
    )
  }

  render() {
    if (this.state.renderError) return this.renderError()
    return this.renderPlayer()
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  title: PropTypes.string,
  logo: PropTypes.string,
  resizeMode: PropTypes.string,
  onMorePress: PropTypes.func,
  onFullScreen: PropTypes.func,
  onTimedMetadata: PropTypes.func,
  storeMute: PropTypes.func,
  togglePlayCB: PropTypes.func,
  theme: PropTypes.string,
  placeholder: PropTypes.string,
  rotateToFullScreen: PropTypes.bool,
  fullScreenOnly: PropTypes.bool,
  inlineOnly: PropTypes.bool,
  rate: PropTypes.number,
  volume: PropTypes.number,
  playInBackground: PropTypes.bool,
  playWhenInactive: PropTypes.bool,
  lockPortraitOnFsExit: PropTypes.bool
}

VideoPlayer.defaultProps = {
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
  lockPortraitOnFsExit: false
}

export { VideoPlayer }

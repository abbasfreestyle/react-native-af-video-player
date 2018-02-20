import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { VideoPlayer } from './'

class Video extends Component {
  constructor(props) {
    super(props)
    this.scrollPos = 0
    this.state = {
      fullScreen: props.fullScreen
    }
  }

  onFullScreenChange(fullScreen) {
    this.props.onFullScreen(fullScreen)
    this.setState({ fullScreen })
    if (!fullScreen) this.scrollBackToPosition()
  }

  scrollBackToPosition() {
    if (this.scroll) this.scroll.scrollTo({ y: this.scrollPos, animated: false })
  }

  pause() {
    this.video.pause()
  }

  play() {
    this.video.play()
  }

  renderScrollVideo() {
    const { fullScreen } = this.state
    const { contentAbove, contentBelow, scrollBounce } = this.props
    return (
      <ScrollView
        ref={(scroll) => { this.scroll = scroll }}
        bounces={fullScreen ? !fullScreen : scrollBounce}
        onScroll={(event) => {
          if (!fullScreen) this.scrollPos = event.nativeEvent.contentOffset.y
        }}
        scrollEventThrottle={16}
      >
        {fullScreen ? null : contentAbove}
        <VideoPlayer
          {...this.props}
          ref={(ref) => { this.video = ref }}
          onFullScreen={val => this.onFullScreenChange(val)}
        />
        {fullScreen ? null : contentBelow}
      </ScrollView>
    )
  }

  renderFixedVideo() {
    return (
      <VideoPlayer
        {...this.props}
        ref={(ref) => { this.video = ref }}
      />
    )
  }

  render() {
    const { contentAbove, contentBelow } = this.props
    if (contentAbove || contentBelow) return this.renderScrollVideo()
    return this.renderFixedVideo()
  }
}

Video.propTypes = {
  fullScreen: PropTypes.bool,
  onFullScreen: PropTypes.func,
  scrollBounce: PropTypes.bool,
  contentAbove: PropTypes.node,
  contentBelow: PropTypes.node
}

Video.defaultProps = {
  onFullScreen: () => {},
  fullScreen: false,
  scrollBounce: false,
  contentAbove: null,
  contentBelow: null
}

export default Video

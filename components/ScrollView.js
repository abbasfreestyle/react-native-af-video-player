import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView as RNScrollView
} from 'react-native'

class ScrollView extends Component {
  constructor(props) {
    super(props)
    this.scrollPos = 0
    this.state = {
      fullscreen: false
    }
  }

  onFullScreenChange(fullscreen) {
    this.setState({ fullscreen }, () => {
      if (!fullscreen) this.scrollBackToPosition()
    })
  }

  scrollBackToPosition() {
    if (this.scroll) this.scroll.scrollTo({ y: this.scrollPos, animated: false })
  }

  cloneElement(child) {
    return React.cloneElement(child, {
      onFullScreen: (val) => {
        child.props.onFullScreen(val)
        this.onFullScreenChange(val)
      }
    })
  }

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      const element = child.type.name
      switch (true) {
        case element === 'Container': {
          const props = this.state.fullscreen ? { style: {} } : child.props
          const components = React.Children.map(child.props.children, (component) => {
            const { name } = component.type
            if (name === 'Video') return this.cloneElement(component)
            if (this.state.fullscreen && name !== 'Video') return null
            return component
          })
          return React.cloneElement(child, props, components)
        }
        case element === 'Video':
          return this.cloneElement(child)
        case (this.state.fullscreen && element !== 'Video'):
          return null
        default:
          return child
      }
    })
  }

  render() {
    const { fullscreen } = this.state
    const {
      bounces,
      children,
      onScroll,
      scrollEventThrottle,
      ...scrollProps
    } = this.props
    return (
      <RNScrollView
        {...scrollProps}
        ref={(scroll) => { this.scroll = scroll }}
        bounces={fullscreen ? !fullscreen : bounces}
        onScroll={(event) => {
          if (!fullscreen) this.scrollPos = event.nativeEvent.contentOffset.y
          onScroll()
        }}
        scrollEventThrottle={scrollEventThrottle}
      >
        {this.renderChildren(children)}
      </RNScrollView>
    )
  }
}

ScrollView.propTypes = {
  children: PropTypes.node.isRequired,
  scrollEventThrottle: PropTypes.number,
  onScroll: PropTypes.func,
  bounces: PropTypes.bool
}

ScrollView.defaultProps = {
  scrollEventThrottle: 16,
  onScroll: () => {},
  bounces: false
}

export { ScrollView }

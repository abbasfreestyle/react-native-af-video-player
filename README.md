## react-native-af-video-player

[![npm version](http://img.shields.io/npm/v/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-989898.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")

A customisable React Native video player for Android and IOS

![Demo](https://gfycat.com/gifs/detail/HilariousLateBlueandgoldmackaw)

<iframe src='https://gfycat.com/ifr/HilariousLateBlueandgoldmackaw' frameborder='0' scrolling='no' width='532' height='944'></iframe>

## Features

* Fullscreen support for Android and iOS!
* Works with react-navigation
* Optional action button for custom use
* Add your own logo and/or placeholder

## Install

```shell
npm i -s react-native-af-video-player
```

Then link

```shell
react-native link react-native-video
react-native link react-native-keep-awake
react-native link react-native-vector-icons
react-native link react-native-orientation
react-native link react-native-linear-gradient
```

## Simple Usage

```jsx
import React from 'react'
import { AppRegistry, StyleSheet, View } from 'react-native'
import VideoPlayer from 'react-native-af-video-player'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const url = ''

class VideoExample extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <VideoPlayer url={url} />
      </View>
    )
  }
}

AppRegistry.registerComponent('VideoExample', () => VideoExample)
```

## Props

Prop                  | Type     | Required | Default                   | Description
--------------------- | -------- | -------- | ------------------------- | -----------
url                   | string   | Yes      |                           | a URL string is required.
autoPlay              | bool     | No       | false                     | Autoplay the video as soon as it's loaded
loop                  | bool     | No       | false                     | Allow the video to continuously loop
title                 | string   | No       | ''                        | Add a title of your video at the top of the player
placeholder           | string   | No       | undefined                 | Add an image placeholder while it's loading and stopped at the beginning
logo                  | string   | No       | undefined                 | Add an image logo at the top left corner of the video
theme                 | string   | No       | 'white'                   | Add an optional theme colour to the players controls
resizeMode            | string   | No       | 'contain'                 | Fill the whole screen at aspect ratio. contain, cover etc
rotateOnFullScreen    | bool     | No       | false                     | Tapping the fullscreen button will rotate the screen. Also rotating the screen will automatically switch to fullscreen mode
fullScreenOnly        | bool     | No       | false                     | This will only play in landscape fullscreen mode
inlineOnly            | bool     | No       | false                     | This hides the fullscreen button and only plays the video in inline mode
playInBackground      | bool     | No       | false                     | Audio continues to play when app enters background.
playWhenInactive      | bool     | No       | false                     | [iOS] Video continues to play when control or notification center are shown.
rate                  | number   | No       | 1                         | Adjust the speed of the video. 0 = stopped, 1.0 = normal
volume                | number   | No       | 1                         | Adjust the volume of the video. 0 = mute, 1.0 = full volume
onMorePress           | function | No       | undefined                 | Adds an action button at the top right of the player. Use this callback function for your own use. e.g share link
onFullScreen          | function | No       |                           | Returns the fullscreen status whenever it toggles. Useful for situations like react navigation.
onTimedMetadata       | function | No       | undefined                 | Callback when the stream receives metadata

## Troubleshoot

### React Navigation

If you’re using react-navigation you need to manually hide the headers / tab bars to take advantage of fullscreen videos.

### Example

```jsx
import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Alert, Text } from 'react-native'

import VideoPlayer from 'react-native-af-video-player'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

class ReactNavigationExample extends Component {

  componentDidMount() {
    this.url = 'https://your-url.com/video.mp4'
    this.logo = 'https://your-url.com/logo.png'
    this.placeholder = 'https://your-url.com/placeholder.png'
    this.title = 'My video title'
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    // Setup the header and tabBarVisible status
    const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    return {
      // If you're using stack navigators, you can hide the header bar like so
      header,
      // If you're using the tab navigators, you can hide the tab bar like so
      tabBarVisible,
    }
  }

  onFullScreen(status) {
    // Set the params to pass in the fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    })
  }

  onMorePress() {
    Alert.alert('Boom', 'This is an action call!', [{ text: 'Aw yeah!' }])
  }

  render() {
    return (
      <View style={styles.container}>
        <VideoPlayer
          autoPlay
          url={this.url}
          title={this.title}
          logo={this.logo}
          placeholder={this.placeholder}
          onMorePress={() => this.onMorePress()}
          onFullScreen={status => this.onFullScreen(status)}
          fullScreenOnly
        />
        <ScrollView>
          <Text>Aww yeah!</Text>
        </ScrollView>
      </View>
    )
  }
}

export default ReactNavigationExample

```

### http vs https

For your sanity you should use https especially if you’re planning to use this for iOS. Using http will not work due to App Transport Security Settings and may result in AppStore rejection.

## Issues

### Fullscreen videos inside a ScrollView

Sadly fullscreen isn’t supported for videos inside a ScrollView, it causes weird layout behaviour by filling the entire ScrollView. However playing videos inline will still work as normal. The best solution is to disable fullscreen by adding inlineOnly prop to remove the fullscreen button.

```jsx
  <View style={styles.container}>
    <ScrollView>
      <Text>Some text above</Text>
      <VideoPlayer
        autoPlay
        url={url}
        title={title}
        logo={logo}
        placeholder={logo}
        inlineOnly
      />
      <Text>Some text beneath</Text>
    </ScrollView>
  </View>
```

## To Do

* Improve scrubber controls for iOS
* Customise specific components for better theming

---

**MIT Licensed**

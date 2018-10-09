# react-native-af-video-player

[![npm version](http://img.shields.io/npm/v/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![npm downloads](http://img.shields.io/npm/dm/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![npm licence](http://img.shields.io/npm/l/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-989898.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")
[![npm](https://img.shields.io/npm/dt/react-native-af-video-player.svg?style=flat-square)](https://npmjs.org/package/react-native-af-video-player "View this project on npm")

A customisable React Native video player for Android and IOS

![Demo](https://github.com/abbasfreestyle/react-native-af-video-player/blob/master/demo.gif)

## Features

* Fullscreen support for Android and iOS!
* Works with react-navigation
* Optional action button for custom use
* Add your own logo and/or placeholder
* Customise theme

## Install

```shell
npm i -S react-native-af-video-player
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
import Video from 'react-native-af-video-player'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

const url = 'https://your-url.com/video.mp4'

class VideoExample extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Video url={url} />
      </View>
    )
  }
}

AppRegistry.registerComponent('VideoExample', () => VideoExample)
```

## Props

Prop                  | Type     | Required | Default                   | Description
--------------------- | -------- | -------- | ------------------------- | -----------
url                   | string, number | Yes |                          | A URL string (or number for local) is required.
autoPlay              | bool     | No       | false                     | Autoplays the video as soon as it's loaded
loop                  | bool     | No       | false                     | Allows the video to continuously loop
title                 | string   | No       | ''                        | Adds a title of your video at the top of the player
placeholder           | string   | No       | undefined                 | Adds an image placeholder while it's loading and stopped at the beginning
logo                  | string   | No       | undefined                 | Adds an image logo at the top left corner of the video
theme                 | string   | No       | 'white'                   | Adds an optional theme colour to the players controls
style                 | number, object | No | {}                        | Apply styles directly to the Video player (ignored in fullscreen mode)
resizeMode            | string   | No       | 'contain'                 | Fills the whole screen at aspect ratio. contain, cover etc
rotateToFullScreen    | bool     | No       | false                     | Tapping the fullscreen button will rotate the screen. Also rotating the screen will automatically switch to fullscreen mode
fullScreenOnly        | bool     | No       | false                     | This will play only in fullscreen mode
inlineOnly            | bool     | No       | false                     | This hides the fullscreen button and only plays the video in inline mode
playInBackground      | bool     | No       | false                     | Audio continues to play when app enters background.
playWhenInactive      | bool     | No       | false                     | [iOS] Video continues to play when control or notification center are shown.
rate                  | number   | No       | 1                         | Adjusts the speed of the video. 0 = stopped, 1.0 = normal
volume                | number   | No       | 1                         | Adjusts the volume of the video. 0 = mute, 1.0 = full volume
onMorePress           | function | No       | undefined                 | Adds an action button at the top right of the player. Use this callback function for your own use. e.g share link
onFullScreen          | function | No       | (value) => {}             | Returns the fullscreen status whenever it toggles. Useful for situations like react navigation.
onTimedMetadata       | function | No       | undefined                 | Callback when the stream receives metadata
scrollBounce          | bool     | No       | false                     | Enables the bounce effect for the ScrollView
lockPortraitOnFsExit  | bool     | No       | false                     | Keep Portrait mode locked after Exiting from Fullscreen mode
lockRatio             | number   | No       | undefined                 | Force a specific ratio to the Video player. e.g. lockRatio={16 / 9}
onLoad                | function | No       | (data) => {}              | Returns data once video is loaded
onProgress            | function | No       | (progress) => {}          | Returns progress data
onEnd                 | function | No       | () => {}                  | Invoked when video finishes playing  
onError               | function | No       | (error) => {}             | Returns an error message argument
onPlay                | function | No       | (playing) => {}           | Returns a boolean during playback
error                 | boolean, object | No | true                     | Pass in an object to Alert. See https://facebook.github.io/react-native/docs/alert.html
theme                 | object   | No       | all white                 | Pass in an object to theme. (See example below to see the full list of available settings)
allowsExternalPlayback| bool     | No       | true                      | Indicates whether the player allows switching to external playback mode such as AirPlay or HDMI
audioOnly             | bool     | No       | false                     | Indicates whether the player should only play audio track and instead of displaying the video track, show poster instead
bufferConfig          | object   | No       | {}                        | Adjust the buffer settings. This prop takes an object with one or more of the properties listed in [bufferConfig](#bufferConfig)
ignoreSilentSwitch    | string   | No       | 'inherit'                 | Controls th iOS silent switch behaivor, values listed in [ignoreSilentSwitch](#ignoreSilentSwitch)
progressUpdateInterval| number   | No       | 250.0                     | Delay in milliseconds between onProgress events in milliseconds
selectedAudioTrack    | object   | No       | {}                        | Configure which audio track, if any, is played. See also: [selectedAudioTrack](#selectedAudioTrack)
selectedTextTrack     | object   | No       | {}                        | Configure which text track (caption or subtitle), if any, is shown. See also: [selectedTextTrack](#selectedTextTrack)
stereoPan             | number   | No       | 0.0                       | Adjust the balance of the left and right audio channels. Any value between -1.0 and 1.0 is accepted. [stereoPan](#stereoPan)
textTracks            | array    | No       | []                        | List of "sidecar" text tracks, [textTracks](#textTracks)

## Props

#### bufferConfig
Property                | Type   | Description
----------------------- | ------ | -----------
minBufferMs             | number | The default minimum duration of media that the player will attempt to ensure is buffered at all times, in milliseconds
maxBufferMs             | number | The default maximum duration of media that the player will attempt to buffer, in milliseconds.
bufferedForPlaybackMs   | number | The default duration of media that must be buffered for playback to start or resume following a user action such as a seek, in milliseconds
playbackAfterRebufferMs | number | The default duration of media that must be buffered for playback to resume after a rebuffer, in milliseconds. A rebuffer is defined to be caused by buffer depletion rather than a user action.

This prop should only be set when you are setting the source, changing it after the media is loaded will cause it to be reloaded.

Example with default values:
```
bufferConfig={{
  minBufferMs: 15000,
  maxBufferMs: 50000,
  bufferForPlaybackMs: 2500,
  bufferForPlaybackAfterRebufferMs: 5000
}}
```

Platforms: Android ExoPlayer

#### ignoreSilentSwitch
* **"inherit" (default)** - Use the default AVPlayer behaivor
* **"ignore"** - Play audio even if the silent switch is set
* **"obey"** - Don't play audio if the silent switch is set

Platform: iOS

#### selectedAudioTrack
Structure:
```
selectedAudioTrack={{
  type: Type,
  value: Value
}}
```

Example:
```
selectedAudioTrack={{
  type: 'title',
  value: 'Dubbing'
}}
```

Type                | Value   | Description
 ---                |  ---    | ---
 "system" (default) | N/A     | Play the audio track that matches the system language. If none match, play the first track.
 "disabled"         | N/A     | Turn off audio
 "title"            | string  | Play the audio track with the title specified as the Value, e.g. "French"
 "language"         | string  | Play the audio track with the language specified as the Value, e.g. "fr"
 "index"            | number  | Play the audio track with the index specified as the value, e.g. 0

 If a track matching the specified Type (and Value if appropriate) is unavailable, the first audio track will be played. If multiple tracks match the criteria, the first match will be used.

 Platforms: Android ExoPlayer, iOS

 #### selectedTextTrack
 Structure:
 ```
 selectedTextTrack={{
   type: Type,
   value: Value
 }}
 ```

 Example:
 ```
 selectedTextTrack={{
   type: 'title',
   value: 'English Subtitles'
 }}
 ```

 Type                 | Value   | Description
  ---                 | ---     | ---
  "system" (default)  | N/A     | Display captions only if the system preference for captions is enabled
  "disabled"          | N/A     | Don't display a text track
  "title"             | string  | Display the text track with the title specified as the Value, e.g. "French"
  "language"          | string  | Display the text track with the language specified as the Value, e.g. "fr"
  "index"             | number  | Display the text track with the index specified as the value, e.g. 0

  Both iOS & Android (only 4.4 and higher) offer Settings to enable Captions for hearing impaired people. If "system" is selected and the Captions setting is enabled, iOS/Android will look for a caption that matches that customer's language and display it.

  If a track matching the specified Type (and Value if appropriate) is unavailable, no text track will be displayed. If multiple tracks match the criteria, the first match will be used.

  Platforms: Android ExoPlayer, iOS

#### stereoPan
* **-1.0** - Full left
* **0.0 (default)** - Center
* **1.0** - Full right

Platforms: Android ExoPlayer

#### textTracks
Load one or more "sidecar" text tracks. This takes an array of objects representing each track. Each object should have the format:

Property | Description
--- | ---
title | Descriptive name for the track
language | 2 letter [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) representing the language
type | Mime type of the track<br> * TextTrackType.SRT - SubRip (.srt)<br> * TextTrackType.TTML - TTML (.ttml)<br> * TextTrackType.VTT - WebVTT (.vtt)<br>iOS only supports VTT, Android ExoPlayer supports all 3
uri | URL for the text track. Currently, only tracks hosted on a websever are supported

On iOS, sidecar text tracks are only supported for individual files, not HLS playlists. For HLS, you should include the text tracks as part of the playlist.

Example:
```
import { TextTrackType }, Video from 'react-native-video';

textTracks={[
  {
    title: "English CC",
    language: "en",
    type: TextTrackType.VTT, // "text/vtt"
    uri: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt"
  },
  {
    title: "Spanish Subtitles",
    language: "es",
    type: "TextTrackType.SRT, // "application/x-subrip"
    uri: "https://durian.blender.org/wp-content/content/subtitles/sintel_es.srt"
  }
]}
```

Platforms: Android ExoPlayer, iOS

## Referencing

To toggle play/pause manually, you can do it like so:

```jsx

  const theme = {
    title: '#FFF',
    more: '#446984',
    center: '#7B8F99',
    fullscreen: '#446984',
    volume: '#A5957B',
    scrubberThumb: '#234458',
    scrubberBar: '#DBD5C7',
    seconds: '#DBD5C7',
    duration: '#DBD5C7',
    progress: '#446984',
    loading: '#DBD5C7'
  }

  class MyComponent extends Component {

    play() {
      this.video.play()
      this.video.seekTo(25)
    }

    pause() {
      this.video.pause()
    }

    render() {
      return (
        <View>
          <Video
            url={url}
            ref={(ref) => { this.video = ref }}
            theme={theme}
          />
          <Button onPress={() => this.play()}>Play</Button>
          <Button onPress={() => this.pause()}>Pause</Button>
        </View>
      )
    }
  }
```

# Issues

## Container

Avoid adding alignItems: 'center' to the container, it can cause fullscreen mode to disappear :D

## React Navigation

If you’re using react-navigation you need to manually hide the headers / tab bars to take advantage of fullscreen videos.

## Example

```jsx
import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Alert, Text } from 'react-native'

import Video from 'react-native-af-video-player'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class ReactNavigationExample extends Component {

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    // Setup the header and tabBarVisible status
    const header = state.params && (state.params.fullscreen ? undefined : null)
    const tabBarVisible = state.params ? state.params.fullscreen : true
    return {
      // For stack navigators, you can hide the header bar like so
      header,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible,
    }
  }

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    })
  }

  onMorePress() {
    Alert.alert(
      'Boom',
      'This is an action call!',
      [{ text: 'Aw yeah!' }]
    )
  }

  render() {

    const url = 'https://your-url.com/video.mp4'
    const logo = 'https://your-url.com/logo.png'
    const placeholder = 'https://your-url.com/placeholder.png'
    const title = 'My video title'

    return (
      <View style={styles.container}>
        <Video
          autoPlay
          url={url}
          title={title}
          logo={logo}
          placeholder={placeholder}
          onMorePress={() => this.onMorePress()}
          onFullScreen={status => this.onFullScreen(status)}
          fullScreenOnly
        />
        <ScrollView>
          <Text>Some content here...</Text>
        </ScrollView>
      </View>
    )
  }
}

export default ReactNavigationExample

```

## http vs https

For your sanity you should use https especially if you’re planning to use this for iOS. Using http will not work due to App Transport Security Settings will result in AppStore rejection.

## Fullscreen videos inside a ScrollView

If you need the video inside a ScrollView, use our ScrollView instead:
The reason for this is because we need to hide all of it's content due to ScrollView styling challenges when enabling fullscreen mode. We wouldn't want you deal with that headache, instead let this component handle it :)
You can also apply styles to the video by wrapping our Container around it. Note: wrapping the video with your own element can cause fullscreen defects.
Also having multiple videos in a ScrollView isn't perfect, so use at your own risk.

## Example

```jsx

  import Video, { ScrollView, Container } from 'react-native-af-video-player'

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    videoContainer: {
      margin: 10
    }
  })

  class VideoInScrollView extends React.Component {

    render() {
      return (
        <ScrollView style={styles.container}>

          <Text>Some content above</Text>

          <Container style={styles.videoContainer}>
            <Video
              autoPlay
              url={url}
              title={title}
              logo={logo}
              placeholder={logo}
              rotateToFullScreen
            />
          </Container>

          {/* Or use without the Container */}
          <Video
            autoPlay
            url={url}
            title={title}
            logo={logo}
            placeholder={logo}
            rotateToFullScreen
          />

          <Text>Some content below</Text>

        </ScrollView>
      )
    }
  }
```

# To Do

- [ ] Option to use custom icons
- [ ] Support Immersive mode for Android
- [ ] improve multiple videos fullscreen support within a ScrollView
- [ ] investigate subtitle support
- [x] Improve scrubber controls for iOS
- [x] Provide fullscreen support within a ScrollView
- [x] Customise specific components for better theming

---

**MIT Licensed**

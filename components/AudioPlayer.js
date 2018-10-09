'use-strict';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { IconAsset } from './IconAsset';
//import * as common from '../../styles';
import { WdrSansText } from './WdrSansText';
import { Time, Scrubber, Loading } from './'

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  secondsToTime(seconds) {
    if (!seconds) return '00:00';
    const minute = parseInt(seconds / 60, 10);
    const second = parseInt(seconds % 60, 10);
    let minuteStr = `0${minute}`;
    if (minute >= 10) {
      minuteStr = `${minute}`;
    }
    let secondStr = `0${second}`;
    if (second >= 10) {
      secondStr = `${second}`;
    }
    return `${minuteStr}:${secondStr}`;
  }

  /**
    In Abhängigkeit vom Abspielmodus wird entweder der Button für Pause oder
    für Play gerendert.
  */
  getButtons(style, buttonBackgroundColor, togglePlay) {
      return (
        <View style={style} >
          <TouchableOpacity
            onPress={togglePlay}
            style={{ backgroundColor: buttonBackgroundColor, borderRadius: style.width / 2 }}
          >
            <IconAsset
              icon={this.props.paused ? 'button_play_audio' : 'button_pause'}
              iconStyle={{ height: style.height, width: style.width }}
            />
          </TouchableOpacity>
        </View>
      );
  }

  getRetryButton(style, buttonBackgroundColor, onRetry) {
      return (
        <View style={style} >
          {/* <TouchableOpacity
            onPress={onRetry}
            style={{ backgroundColor: buttonBackgroundColor, borderRadius: style.width / 2 }}
          > */}
            <Icons
              name="replay"
              size={60}
              color={this.props.theme.error}
              onPress={onRetry}
            />
          {/* </TouchableOpacity> */}
        </View>
      );
  }


  getDeleteButton(style, onClosePress) {
    return (
      <View style={style} >
        <TouchableOpacity
          onPress={onClosePress}
        >
          <IconAsset
            icon={'icon_close'}
            iconStyle={{ height: style.height, width: style.width }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  /**
    Audioplayer wird gerendert.
  */
  render() {
    const {
      onSeek, onSeekRelease, duration, style,
      buttonBackgroundColor, onClosePress,
      togglePlay, loading, currentTime, theme, progress,
      renderError, onPressRetry
    } = this.props;
    const heightPlayIcon = style.height * 0.72;
    const heightDeleteIcon = style.height * 0.5;



    let styles = {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.background,
        height: style.height,
        zIndex: 99,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

      },
      buttons: {
        width: heightPlayIcon,
        height: heightPlayIcon,
        minWidth: heightPlayIcon,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: theme.background,
        paddingLeft: style.padding,
        marginRight: style.padding,
      },
      deleteButton: {
        width: heightDeleteIcon,
        height: heightDeleteIcon,
        minWidht: heightDeleteIcon,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: theme.background,
        paddingRight: style.padding,
        marginLeft: style.padding
      },
    };

    if (renderError) {
      return(
        <View style={styles.container}>
          {this.getRetryButton(styles.buttons, theme.buttonBackground, onPressRetry)}
          <Text style={{ color: theme.loading }} >Retry</Text>
          {this.getDeleteButton(styles.deleteButton, onClosePress)}
        </View>
      );
    }

    if (loading) {
      return(
        <View style={styles.container}>
          {this.getButtons(styles.buttons, theme.buttonBackground, () => {})}
          <Loading theme={theme.loading} />
          {this.getDeleteButton(styles.deleteButton, onClosePress)}
        </View>
      );
    }

    return (
      <View style={styles.container} >
        {this.getButtons(styles.buttons, theme.buttonBackground, togglePlay)}
          <Time time={currentTime} theme={theme.seconds} />
        <Scrubber
          onSeek={pos => onSeek(pos)}
          onSeekRelease={pos => onSeekRelease(pos)}
          progress={progress}
          theme={{ scrubberThumb: theme.scrubberThumb, scrubberBar: theme.scrubberBar }}
        />
          <Time time={duration} theme={theme.duration} />
        {this.getDeleteButton(styles.deleteButton, onClosePress)}
      </View>
    );
  }
}

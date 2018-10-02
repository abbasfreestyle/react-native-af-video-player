'use-strict';
import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import { IconAsset } from './IconAsset';
//import * as common from '../../styles';
import { WdrSansText } from './WdrSansText';
import { Time, Scrubber } from './'

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
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

  progressBar(style, barColor, spaceColor, percentage){
    const styles = {
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      bar: {
        flex: percentage,
        backgroundColor: barColor,
        height: style.height
      },
      barBackground: {
        flex: 1 - percentage,
        backgroundColor: spaceColor,
        height: style.height,
        borderWidth: 1,
        borderColor: barColor
      }
    }

      return (
        <View
          style={[styles.container, style]}
        >
          <View style={styles.bar} />
          <View style={styles.barBackground} />
        </View>
      );
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
              icon={this.props.paused ? 'button_pause' : 'button_play_audio'}
              iconStyle={{ height: style.height, width: style.width }}
            />
          </TouchableOpacity>
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
      duration, style, barFillColor, barBackgroundColor,
      buttonBackgroundColor, onClosePress,
      togglePlay, loading, currentTime
    } = this.props;
    const heightPlayIcon = style.height * 0.72;
    const heightDeleteIcon = style.height * 0.5;



    let styles = {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor,
        borderRadius: style.borderRadius,
        borderWidth: style.borderWidth,
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
        backgroundColor: style.backgroundColor,
        //paddingLeft: common.PAD_LEFT,
        paddingLeft: 10,
      },
      currentTime: {
          flex: 0.15,
          textAlign: 'center',
          backgroundColor: style.backgroundColor,
          color: style.color,
          //fontSize: common.FS_14(),
          fontSize: 14,
      },
      bar: {
        flex: 0.45,
        height: 10,
        backgroundColor: style.backgroundColor,
        padding: 0
      },
      diffTime: {
            flex: 0.15,
            textAlign: 'center',
            backgroundColor: style.backgroundColor,
            color: style.color,
            //fontSize: common.FS_14(),
            fontSize: 14,
      },
      deleteButton: {
        width: heightDeleteIcon,
        height: heightDeleteIcon,
        minWidht: heightDeleteIcon,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: style.backgroundColor,
        //paddingRight: common.PAD_RIGHT,
        paddingRight: 10
      },
    };
    //if (common.isFontScaled()) {
    if (false) {
      styles.currentTime = { ...styles.currentTime, ...{ flex: 0.22 } };
      styles.bar = { ...styles.bar, ...{ flex: 0.28 } };
      styles.diffTime = { ...styles.diffTime, ...{ flex: 0.22 } };
    }
    let diff = 10.0;
    let percentage = 0.5;

    //console.log('---- Audioplayer --> loading = ', loading);
    if (loading) {
      return(
        <View style={styles.container} >
          <WdrSansText style={styles.currentTime}>
            {'Audio wird geladen ...'}
          </WdrSansText>
        </View>
      );
    }

    return (
      <View style={styles.container} >
        {this.getButtons(styles.buttons, buttonBackgroundColor, togglePlay)}
          <Time time={currentTime} theme={'#FFFFFF'} />
        {this.progressBar(styles.bar, barFillColor, barBackgroundColor, percentage)}
          <Time time={duration} theme={'#FFFFFF'} />
        {this.getDeleteButton(styles.deleteButton, onClosePress)}
      </View>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const backgroundColor = 'rgba(255, 255, 255, 0.7)';
const videoImgSource = require('../assets/img/icoPlayVideo.png');
const audioImgSource = require('../assets/img/icoPlayAudio.png');

const styles = StyleSheet.create({
  playButton: {
    opacity: 0.9,
    height: 35,
    width: 35
  },
  playButtonContainer: {
    backgroundColor,
    height: 75,
    width: 75,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const StyledPlayButton = props => (
  <View style={styles.playContainer}>
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
      <View style={styles.playButtonContainer}>
        {
          props.mediaType === 'video' ?
            <Image style={styles.playButton} source={videoImgSource} resizeMode='contain' /> :
            <Image style={styles.playButton} source={audioImgSource} resizeMode='contain' />
        }
      </View>
    </TouchableOpacity>
  </View>
);

StyledPlayButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  mediaType: PropTypes.oneOf(['video', 'audio'])
};

export { StyledPlayButton };

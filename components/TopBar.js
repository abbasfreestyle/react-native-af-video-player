import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { ToggleIcon } from './';

const backgroundColor = 'transparent';

const styles = StyleSheet.create({
  container: {
    height: 35,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    backgroundColor,
    paddingLeft: 10,
    paddingRight: 35,
    fontSize: 16
  }
});

const TopBar = (props) => {
  const {
    more,
    title,
    theme,
    onMorePress,
    fullscreen
  } = props;
  return (
    <LinearGradient colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0)']} style={styles.container}>
      <View style={styles.row}>
        <ToggleIcon
          onPress={() => props.toggleFs()}
          iconOff="fullscreen"
          iconOn="fullscreen-exit"
          isOn={fullscreen}
          theme={theme.fullscreen}
        />
        <Text
          style={[styles.title, { color: theme.title }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        { more &&
          <ToggleIcon
            style={styles.more}
            onPress={() => onMorePress()}
            paddingRight
            iconOff="more-horiz"
            iconOn="more-horiz"
            theme={theme.more}
            size={25}
          />
        }
      </View>
    </LinearGradient>
  )
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  more: PropTypes.bool.isRequired,
  onMorePress: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  toggleFS: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool.isRequired
};

export { TopBar }

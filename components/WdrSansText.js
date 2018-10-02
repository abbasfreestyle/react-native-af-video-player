import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  plain: {
    fontFamily: 'TheSansE4s-Plain'
  },
  bold: {
    ...Platform.select({
      ios: {
        fontFamily: 'TheSansE4s-Bold'
      },
      android: {
        fontFamily: 'TheSansE4s-Bold'
      }
    })
  }
});

const WdrSansText = (props) => {
  let text = styles.plain;

  switch (props.fontType) {
    case 'plain':
      text = styles.plain;
      break;
    case 'bold':
      text = styles.bold;
      break;
    default:
      break;
  }

  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[text, props.style]}
    >
      {props.children}
    </Text>
  );
};

export { WdrSansText };

WdrSansText.propTypes = {
  fontType: PropTypes.string.isRequired
};

WdrSansText.defaultProps = {
  fontType: 'plain'
};

import React from 'react';
import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const ICONS = new Map([
 [
    'icon_close',
    (<Image source={require('./../assets/img/iconClose.png')} />)
  ], [
    'button_pause',
    (<Image source={require('./../assets/img/buttonPause.png')} />)
  ], [
    'button_play_audio',
    (<Image source={require('./../assets/img/buttonPlayAudio.png')} />)
  ]
]);

const IconAsset = ({ style, icon, iconStyle }) => {
  let ico;
  if (iconStyle) {
    ico = React.cloneElement(ICONS.get(icon), { style: iconStyle });
  } else {
    ico = ICONS.get(icon);
  }
  return (
    <View style={style}>
      {ico}
    </View>
  );
};

export { IconAsset };

IconAsset.propTypes = {
  style: ViewPropTypes.style,
  iconStyle: Image.propTypes.style,
  icon: PropTypes.string.isRequired
};

IconAsset.defaultProps = {
  iconStyle: undefined
};

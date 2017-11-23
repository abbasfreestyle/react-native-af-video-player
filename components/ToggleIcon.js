import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'

const backgroundColor = 'transparent'

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    backgroundColor,
    justifyContent: 'center'
  }
})

const ToggleIcon = (props) => {
  const {
    paddingLeft,
    paddingRight,
    isOn,
    iconOn,
    iconOff,
    theme,
    size
  } = props
  return (
    <View style={styles.btnContainer}>
      <Icons
        style={{ // eslint-disable-line
          paddingLeft: paddingLeft ? 10 : 0,
          paddingRight: paddingRight ? 5 : 0
        }}
        onPress={() => props.onPress()}
        name={isOn ? iconOn : iconOff}
        color={theme}
        size={size}
      />
    </View>
  )
}

ToggleIcon.propTypes = {
  onPress: PropTypes.func,
  isOn: PropTypes.bool,
  iconOff: PropTypes.string.isRequired,
  iconOn: PropTypes.string.isRequired,
  theme: PropTypes.string,
  size: PropTypes.number,
  paddingRight: PropTypes.bool,
  paddingLeft: PropTypes.bool
}

ToggleIcon.defaultProps = {
  onPress: undefined,
  isOn: false,
  theme: null,
  size: 25,
  paddingRight: false,
  paddingLeft: false
}

export { ToggleIcon }

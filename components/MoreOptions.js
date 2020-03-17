import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import {
  Menu,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const backgroundColor = 'transparent'

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    backgroundColor,
    justifyContent: 'center'
  }
})

const MoreOptions = (props) => {
  const {
    paddingLeft,
    paddingRight,
    isOn,
    iconOn,
    iconOff,
    theme,
    size,
  } = props

  const padding = {
    paddingLeft: paddingLeft ? 10 : 0,
    paddingRight: paddingRight ? 5 : 0
  }

  return (
    <View style={styles.btnContainer}>
        <Menu>
        <MenuTrigger>
          <Icons
            style={padding}
            name={isOn ? iconOn : iconOff}
            color={theme}
            size={size}
          />    
        </MenuTrigger>
        <MenuOptions style={{padding:10}}>
          <TouchableOpacity
              onPress={() => props.onPress(0.5)}>
            <View style={{margin:10}}>
              <Text>0.5 x</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => props.onPress(1)}>
            <View style={{margin:10}}>
              <Text>1 x</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => props.onPress(1.25)}>
            <View style={{margin:10}}>
              <Text>1.25 x</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => props.onPress(1.5)}>
            <View style={{margin:10}}>
              <Text>1.5 x</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => props.onPress(2)}>
            <View style={{margin:10}}>
              <Text>2 x</Text>
            </View>
          </TouchableOpacity>
        </MenuOptions>
      </Menu> 
    </View>
  )
}

MoreOptions.propTypes = {
  onPress: PropTypes.func,
  isOn: PropTypes.bool,
  iconOff: PropTypes.string.isRequired,
  iconOn: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  size: PropTypes.number,
  paddingRight: PropTypes.bool,
  paddingLeft: PropTypes.bool
}

MoreOptions.defaultProps = {
  onPress: undefined,
  isOn: false,
  size: 25,
  paddingRight: false,
  paddingLeft: false
}

export { MoreOptions }

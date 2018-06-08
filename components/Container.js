import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const Container = ({ children, ...props }) => <View {...props}>{children}</View>

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export { Container }

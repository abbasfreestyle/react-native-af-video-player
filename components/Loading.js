import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

class Loading extends Component {
  render() {
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
    return null;
  }
}

Loading.propTypes = {
  theme: PropTypes.string.isRequired,
  loading: PropTypes.bool
}

Loading.defaultProps = {
  loading: true
}

export { Loading }

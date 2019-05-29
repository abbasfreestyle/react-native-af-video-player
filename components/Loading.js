import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Easing,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    height: 5,
    width: 75
  },
  closeButton: {
    alignItems: 'flex-end',
    paddingTop: 2,
    paddingRight: 2,
  }
})

class Loading extends Component {
  constructor(props) {
    super(props)
    this.anim = {
      width: new Animated.Value(10),
      translateX: new Animated.Value(-50)
    }
  }

  componentDidMount() {
    Animated.loop(Animated.parallel([
      Animated.sequence([
        Animated.timing(this.anim.width, {
          toValue: 75,
          easing: Easing.back(1),
          duration: 750
        }),
        Animated.timing(this.anim.width, {
          toValue: 10,
          // easing: Easing.back(2),
          duration: 250
        }),
        Animated.timing(this.anim.width, {
          toValue: 75,
          easing: Easing.back(1),
          duration: 750
        }),
        Animated.timing(this.anim.width, {
          toValue: 10,
          // easing: Easing.back(2),
          duration: 250
        })
      ]),
      Animated.sequence([
        Animated.timing(this.anim.translateX, { toValue: 50, easing: Easing.back(1), duration: 1000 }),
        Animated.timing(this.anim.translateX, { toValue: -50, easing: Easing.back(1), duration: 1000 })
      ])
    ])).start()
  }

  render() {
    const { translateX, width } = this.anim
    const {
      onLoadingCloseButtonPress,
    } = this.props
    if (this.props.loading) {
      return (
        <View style={{flex:1}}>
          <View style={styles.closeButton}>
          <TouchableOpacity
              onPress={() => onLoadingCloseButtonPress()}
            >
            <Icons
              name="close"
              style={styles.closeButton}
              iconStyle={{marginRight:5, marginTop:5}}
              size={25}
              underlayColor="transparent"
              backgroundColor="transparent"
              title="close"
              color="white"
            />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Animated.View style={[
              styles.line,
              {
                backgroundColor: this.props.theme,
                width,
                transform: [{ translateX }]
              }
            ]}
            />
          </View>
        </View>
      )
    }
    return null
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

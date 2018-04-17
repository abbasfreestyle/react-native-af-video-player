import React, {Component} from 'react'
import {FlatList as RNFlatList} from 'react-native'
import PropTypes from 'prop-types'

class FlatList extends Component {
	constructor(props) {
		super(props) 
    	this.scrollPos = 0
		this.state = {
			fullscreen:false
		}
	}

	onFullScreenChange(fullscreen) {
	    this.setState({ fullscreen }, () => {
	      if (!fullscreen) this.scrollBackToPosition()
	    })
	}

	 scrollBackToPosition() {
	    if (this.scroll) this.scroll.scrollToOffset({ offset: this.scrollPos, animated: false })
	 }

	 cloneElement(child) {
	   return React.cloneElement(child, {
	      onFullScreen: (val) => {
	        child.props.onFullScreen(val)
	        this.onFullScreenChange(val)
	      }
	    })
	 }

  	renderItemComponent(itemComponent) {
  		const element = itemComponent.type.name
		switch (true) {
		case element === 'Container': {
		  const props = this.state.fullscreen ? { style: {} } : itemComponent.props
		  const components = React.Children.map(itemComponent.props.children, (component) => {
		    const { name } = component.type
		    if (name === 'Video') return this.cloneElement(component)
		    if (this.state.fullscreen && name !== 'Video') return null
		    return component
		  })
		  return React.cloneElement(itemComponent, props, components)
		}
		case element === 'Video':
		  return this.cloneElement(itemComponent)
		case (this.state.fullscreen && element !== 'Video'):
		  return null
		default:
		  return itemComponent
		}
	  
  	}

	render() {
		const { fullscreen } = this.state
		const {
			onScroll,
			bounces,
      		renderItem,
      		scrollEventThrottle,

			...listProps
		} = this.props
		return (
			<RNFlatList 
				{...listProps}
				ref={(scroll) => { this.scroll = scroll }}
		        bounces={fullscreen ? !fullscreen : bounces}
		        onScroll={(event) => {
		          if (!fullscreen) {this.scrollPos = event.nativeEvent.contentOffset.y}
		          onScroll(event)
		        }}
				renderItem = {(item)=> {
					return this.renderItemComponent(renderItem(item))
				}}
				scrollEventThrottle={scrollEventThrottle}
				/>
			)
	
	}
}

FlatList.propTypes = {
	renderItem:PropTypes.func.isRequired,
	data:PropTypes.array.isRequired,
	onScroll: PropTypes.func,
	bounces: PropTypes.bool,
	scrollEventThrottle: PropTypes.number,
}

FlatList.defaultProps = {
	scrollEventThrottle: 16,
	onScroll: (event) => {},
	bounces: true
}
export { FlatList }
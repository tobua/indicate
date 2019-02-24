import React, { Component, Children, cloneElement } from 'react'
import Indicate from 'indicate'

// React Wrapper Component for Scroll Indicator Plugin.
export default class IndicateReact extends Component {
	componentDidMount () {
		this.instance = new Indicate(this.element, this.props)
	}

	componentDidUpdate () {
		this.instance.update(this.props)
	}

	componentWillUnmount () {
		this.instance.destroy()
	}

	render () {
    const { children } = this.props
    const child = Children.only(children)

    return cloneElement(child, { ref: ref => (this.element = ref)})
	}
}

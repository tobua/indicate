import React, { Component } from 'react'
import Core from 'indicate'

export default class Indicate extends Component {
	componentDidMount () {
		this.instance = new Core(this.element, this.props)
	}

	componentDidUpdate () {
		this.instance.update(this.props)
	}

	componentWillUnmount () {
		this.instance.destroy()
	}

	render () {
		// TODO access topmost node from props.children and ref that instead
		// NOTE tried to access it but no ref available
		return (
			<div ref={ref => this.element = ref}>
				{this.props.children}
			</div>
		)
	}
}

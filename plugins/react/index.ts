import React, { Component, Children, cloneElement } from 'react'
import Indicate from 'indicate'

// React Wrapper Component for Scroll Indicator Plugin.
export default class IndicateReact extends Component {
  private _instance: Indicate
  private _node: HTMLElement

  componentDidMount() {
    this._instance = new Indicate(this._node, this.props)
  }

  componentDidUpdate() {
    this._instance.update(this.props)
  }

  componentWillUnmount() {
    this._instance.destroy()
  }

  render() {
    const { children } = this.props
    const child = Children.only(children)

    return cloneElement(child as any, { ref: ref => (this._node = ref) })
  }
}

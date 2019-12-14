// @flow
import React, { Component } from 'react'
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import omit from 'omit.js'
import type {
  LayoutEvent,
  ScrollEvent
} from 'react-native/Libraries/Types/CoreEventTypes'
import type { Props as ScrollViewProps } from 'react-native/Libraries/Components/ScrollView/ScrollView'
import direction from './util/direction'
import { Fade } from './Fade'

export type Props = {
  appearanceOffset: number,
  fadeWidth: number,
  horizontal: ?boolean,
  vertical: ?boolean,
  style: ?any,
  wrapperStyle: ?any,
  contentContainerStyle: ?any,
  gradient: ?any,
  children: ?any
} & ScrollViewProps

type State = {
  direction: Direction,
  fade: {
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean
  },
  view: {
    width: number,
    height: number
  },
  content: {
    width: number,
    height: number
  }
}

export type Direction = 'both' | 'horizontal' | 'vertical'

export default class Indicate extends Component<Props, State> {
  static defaultProps = {
    appearanceOffset: 10,
    fadeWidth: 20
  }

  state = {
    // Scroll directions (horizontal, vertical or both).
    direction: direction(this.props.horizontal, this.props.vertical),
    // Which fade elements are currently active.
    fade: {
      top: false,
      right:
        direction(this.props.horizontal, this.props.vertical) !== 'vertical',
      bottom:
        direction(this.props.horizontal, this.props.vertical) !== 'horizontal',
      left: false
    },
    view: {
      width: 0,
      height: 0
    },
    content: {
      width: 0,
      height: 0
    }
  }

  handleLayout = (event: LayoutEvent) => {
    const layout = event.nativeEvent.layout
    const { fade, view, content } = this.state

    if (view.width < layout.width) {
      view.width = layout.width
    }
    if (content.width) {
      fade.right = content.width > view.width
    }

    if (view.height < layout.height) {
      view.height = layout.height
    }
    if (content.height) {
      fade.bottom = content.height > view.height
    }

    this.setState({
      fade,
      view
    })
  }

  handleContentSizeChange = (
    direction: Direction,
    width: number,
    height: number
  ) => {
    const { fade, view, content } = this.state

    if (direction === 'horizontal' || direction === 'both') {
      content.width = width
      if (view.width) {
        fade.right = content.width > view.width
      }
    }

    if (direction === 'vertical' || direction === 'both') {
      content.height = height
      if (view.height) {
        fade.bottom = content.height > view.height
      }
    }

    this.setState({
      fade,
      content
    })
  }

  handleScroll = (direction: Direction, event: ScrollEvent) => {
    const offset = event.nativeEvent.contentOffset
    const { fade, view, content } = this.state

    if (direction === 'horizontal' || direction === 'both') {
      fade.right =
        offset.x + view.width + this.props.appearanceOffset < content.width
      fade.left = offset.x > this.props.appearanceOffset
    }

    if (direction === 'vertical' || direction === 'both') {
      fade.top = offset.y > this.props.appearanceOffset
      fade.bottom =
        offset.y + view.height + this.props.appearanceOffset < content.height
    }

    this.setState({
      fade
    })
  }

  renderFadeElements() {
    const { fadeWidth, gradient } = this.props
    const { fade, view } = this.state

    return (
      <>
        <Fade
          side="top"
          show={fade.top}
          width={fadeWidth}
          view={view}
          gradient={gradient}
        />
        <Fade
          side="right"
          show={fade.right}
          width={fadeWidth}
          view={view}
          gradient={gradient}
        />
        <Fade
          side="bottom"
          show={fade.bottom}
          width={fadeWidth}
          view={view}
          gradient={gradient}
        />
        <Fade
          side="left"
          show={fade.left}
          width={fadeWidth}
          view={view}
          gradient={gradient}
        />
      </>
    )
  }

  renderInnerScrollView(passedProps: any) {
    const { children } = this.props

    if (this.state.direction !== 'both') {
      return this.props.children
    }

    // Second ScrollView for other direction as a ScrollView only supports one direction.
    return (
      <ScrollView
        style={[styles.view, this.props.style]}
        contentContainerStyle={[
          styles.container,
          this.props.contentContainerStyle
        ]}
        onContentSizeChange={this.handleContentSizeChange.bind(
          this,
          'vertical'
        )}
        scrollEventThrottle={300}
        onScroll={this.handleScroll.bind(this, 'vertical')}
        {...passedProps}
      >
        {children}
      </ScrollView>
    )
  }

  render() {
    const { wrapperStyle, contentContainerStyle, style } = this.props
    const { direction } = this.state
    // Make sure not to overwrite default styles of the ScrollView.
    const passedProps = omit(this.props, [
      'style',
      'contentContainerStyle',
      'horizontal',
      'vertical',
      'appearanceOffset',
      'fadeWidth'
    ])

    return (
      <SafeAreaView style={[styles.wrapper, wrapperStyle]}>
        <ScrollView
          style={[styles.view, style]}
          contentContainerStyle={[styles.container, contentContainerStyle]}
          onContentSizeChange={this.handleContentSizeChange.bind(
            this,
            direction === 'both' ? 'horizontal' : direction
          )}
          scrollEventThrottle={300}
          onScroll={this.handleScroll.bind(
            this,
            direction === 'both' ? 'horizontal' : direction
          )}
          onLayout={this.handleLayout}
          horizontal={direction === 'both' || direction === 'horizontal'}
          // All additional Indicate props will be passed to the ScrollView element.
          {...passedProps}
        >
          {this.renderInnerScrollView(passedProps)}
        </ScrollView>
        {this.renderFadeElements()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  view: {},
  container: {}
})

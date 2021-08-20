// @flow
import React, { useState } from 'react'
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import omit from 'omit.js'
import type {
  LayoutEvent,
  ScrollEvent,
} from 'react-native/Libraries/Types/CoreEventTypes'
import type { Props as ScrollViewProps } from 'react-native/Libraries/Components/ScrollView/ScrollView'
import { getDirectionFromBoolean } from './direction'
import { Fade } from './Fade'
import type { Direction, FadeType, View, Content } from './types'

export type Props = {
  appearanceOffset: number,
  fadeWidth: number,
  horizontal: ?boolean,
  vertical: ?boolean,
  style: ?any,
  wrapperStyle: ?any,
  contentContainerStyle: ?any,
  gradient: ?any,
  children: ?any,
} & ScrollViewProps

type State = {
  direction: Direction,
  setDirection: (value: Direction) => void,
  fade: FadeType,
  setFade: (value: FadeType) => void,
  view: View,
  setView: (value: View) => void,
  content: Content,
  setContent: (value: Content) => void,
}

const handleLayout = (state, event: LayoutEvent) => {
  const layout = event.nativeEvent.layout

  if (state.view.width < layout.width) {
    state.view.width = layout.width
  }
  if (state.content.width) {
    state.fade.right = state.content.width > state.view.width
  }

  if (state.view.height < layout.height) {
    state.view.height = layout.height
  }
  if (state.content.height) {
    state.fade.bottom = state.content.height > state.view.height
  }

  state.setFade(state.fade)
  state.setView(state.view)
}

const handleScroll = (
  props: Props,
  state: State,
  direction: Direction,
  event: ScrollEvent
) => {
  const offset = event.nativeEvent.contentOffset

  if (direction === 'horizontal' || direction === 'both') {
    state.fade.right =
      offset.x + state.view.width + props.appearanceOffset < state.content.width
    state.fade.left = offset.x > props.appearanceOffset
  }

  if (direction === 'vertical' || direction === 'both') {
    state.fade.top = offset.y > props.appearanceOffset
    state.fade.bottom =
      offset.y + state.view.height + props.appearanceOffset <
      state.content.height
  }

  state.setFade(state.fade)
}

const handleContentSizeChange = (
  state: State,
  direction: Direction,
  width: number,
  height: number
) => {
  // TODO new object
  if (direction === 'horizontal' || direction === 'both') {
    state.content.width = width
    if (state.view.width) {
      state.fade.right = state.content.width > state.view.width
    }
  }

  if (direction === 'vertical' || direction === 'both') {
    state.content.height = height
    if (state.view.height) {
      state.fade.bottom = state.content.height > state.view.height
    }
  }

  state.setFade(state.fade)
  state.setContent(state.content)
}

const renderInnerScrollView = (
  viewCompatibleProps: any,
  props: Props,
  state: State,
  direction: Direction
) => {
  if (direction !== 'both') {
    return props.children
  }

  // Second ScrollView for other direction as a ScrollView only supports one direction.
  return (
    <ScrollView
      style={[styles.view, props.style]}
      contentContainerStyle={[styles.container, props.contentContainerStyle]}
      onContentSizeChange={(width, height) =>
        handleContentSizeChange(state, 'vertical', width, height)
      }
      scrollEventThrottle={300}
      onScroll={(event: ScrollEvent) =>
        handleScroll(props, state, 'vertical', event)
      }
      {...viewCompatibleProps}
    >
      {props.children}
    </ScrollView>
  )
}

export default (props: Props): any => {
  const { horizontal, vertical } = props

  if (!props.appearanceOffset) {
    props.appearanceOffset = 10
  }

  if (!props.fadeWidth) {
    props.fadeWidth = 20
  }

  // Scroll directions (horizontal, vertical or both).
  const [direction, setDirection] = useState<Direction>(
    getDirectionFromBoolean(horizontal, vertical)
  )
  // Which fade elements are currently active.
  const [fade, setFade] = useState<FadeType>({
    top: false,
    right: getDirectionFromBoolean(horizontal, vertical) !== 'vertical',
    bottom: getDirectionFromBoolean(horizontal, vertical) !== 'horizontal',
    left: false,
  })
  const [view, setView] = useState<View>({ width: 0, height: 0 })
  const [content, setContent] = useState<Content>({ width: 0, height: 0 })

  const state: State = {
    direction,
    setDirection,
    fade,
    setFade,
    view,
    setView,
    content,
    setContent,
  }

  // Make sure not to overwrite default styles of the ScrollView.
  const viewCompatibleProps = omit(props, [
    'style',
    'contentContainerStyle',
    'horizontal',
    'vertical',
  ])

  return (
    <SafeAreaView style={[styles.wrapper, props.wrapperStyle]}>
      <ScrollView
        style={[styles.view, props.style]}
        contentContainerStyle={[styles.container, props.contentContainerStyle]}
        onContentSizeChange={(width, height) =>
          handleContentSizeChange(
            state,
            direction === 'both' ? 'horizontal' : direction,
            width,
            height
          )
        }
        scrollEventThrottle={300}
        onScroll={(event: ScrollEvent) =>
          handleScroll(
            props,
            state,
            direction === 'both' ? 'horizontal' : direction,
            event
          )
        }
        onLayout={(event: LayoutEvent) => handleLayout(state, event)}
        horizontal={direction === 'both' || direction === 'horizontal'}
        // All additional Indicate props will be passed to the ScrollView element.
        {...viewCompatibleProps}
      >
        {renderInnerScrollView(viewCompatibleProps, props, state, direction)}
      </ScrollView>
      <Fade
        side="top"
        show={fade.top}
        width={props.fadeWidth}
        view={view}
        gradient={props.gradient}
      />
      <Fade
        side="right"
        show={fade.right}
        width={props.fadeWidth}
        view={view}
        gradient={props.gradient}
      />
      <Fade
        side="bottom"
        show={fade.bottom}
        width={props.fadeWidth}
        view={view}
        gradient={props.gradient}
      />
      <Fade
        side="left"
        show={fade.left}
        width={props.fadeWidth}
        view={view}
        gradient={props.gradient}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  view: {},
  container: {},
})

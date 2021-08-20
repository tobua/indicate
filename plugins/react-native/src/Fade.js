// @flow
import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import defaultGradient from './gradient.png'

type Props = {
  side: Side,
  show: boolean,
  width: number,
  view: { width: number, height: number },
  gradient: ?number,
}

type Side = 'top' | 'right' | 'bottom' | 'left'

export const Fade = ({ side, show, width, view, gradient }: Props) => {
  if (!show) {
    return null
  }

  return (
    <View
      pointerEvents="none"
      style={[
        styles.fade,
        {
          left: leftPosition(side, view, width),
          right: side === 'right' ? 0 : 'auto',
          top: topPosition(side, view, width),
          height: side === 'left' || side === 'right' ? '100%' : view.width,
          width: side === 'bottom' || side === 'top' ? width : width,
        },
      ]}
    >
      <ImageBackground
        source={gradient || defaultGradient}
        style={{
          width: '100%',
          height: '100%',
        }}
        imageStyle={{
          resizeMode: 'stretch',
          transform: [{ rotate: rotateGradient(side) }],
        }}
      />
    </View>
  )
}

const rotateGradient = (side) => {
  if (side === 'right') {
    return '180deg'
  }

  if (side === 'top') {
    return '90deg'
  }

  if (side === 'bottom') {
    return '270deg'
  }

  return '0deg'
}

const leftPosition = (side, view, width) => {
  if (side === 'left') {
    return 0
  }

  if (side === 'top' || side === 'bottom') {
    return view.width / 2 - width / 2
  }

  return 'auto'
}

const topPosition = (side, view, width) => {
  if (side === 'top') {
    // Weird value, due to rotation.
    return -view.width / 2 + width / 2
  }

  if (side === 'bottom') {
    return -view.width / 2 - width / 2 + view.height
  }

  return 'auto'
}

const styles = StyleSheet.create({
  fade: {
    position: 'absolute',
  },
})

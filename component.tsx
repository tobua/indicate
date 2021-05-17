import React, {
  useEffect,
  useRef,
  createElement,
  ElementType,
  ReactNode,
} from 'react'
import { remove, indicate } from './instance'
import { PluginOptions, pluginOptionsProperties } from './types'

// Remove PluginOptions from props to get the props meant for the element.
const getElementProps = (ref: any, options: {}) => {
  const props = { ref, ...options }

  pluginOptionsProperties.forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      delete props[property]
    }
  })

  return props
}

// Get the options applicable to the plugin.
const getPluginProps = (options: {}, alsoEmpty = false) => {
  const props = {}

  pluginOptionsProperties.forEach((property) => {
    if (alsoEmpty || Object.prototype.hasOwnProperty.call(options, property)) {
      props[property] = options[property]
    }
  })

  return props
}

interface Props {
  as?: ElementType<any>
  children: ReactNode
}

export const Indicate = ({
  as = 'div',
  children,
  ...options
}: Props &
  PluginOptions &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const outerWrapperRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLElement>(null)
  const innerWrapperRef = useRef<HTMLDivElement>(null)
  const elementProps = getElementProps(elementRef, options)
  const allPluginOptions = getPluginProps(options, true)
  const pluginOptions = getPluginProps(options)

  useEffect(
    () => {
      const outerWrapper = outerWrapperRef.current
      const element = elementRef.current
      const innerWrapper = innerWrapperRef.current

      indicate(element, { outerWrapper, innerWrapper, ...pluginOptions })

      return () => {
        remove(element)
      }
    },
    // Size of arguments needs to stay constant, therefore also empty options.
    Object.keys(allPluginOptions).map((key) => allPluginOptions[key])
  )

  // createElement workaround to render "as" element from string.
  return (
    <div ref={outerWrapperRef}>
      {createElement(
        as,
        elementProps,
        <div ref={innerWrapperRef}>{children}</div>
      )}
    </div>
  )
}

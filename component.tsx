import React, {
  useEffect,
  useRef,
  createElement,
  cloneElement,
  ElementType,
  ReactNode,
  ReactElement,
  Fragment,
  Children,
  forwardRef,
  MutableRefObject,
} from 'react'
import { remove, indicate } from './instance'
import { PluginOptions, pluginOptionsProperties } from './types'
import { base } from './style'
import { log } from './helper'

// Remove PluginOptions from props to get the props meant for the element.
const getElementProps = (ref: any, options: PluginOptions) => {
  const props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > = { ref, ...options }

  pluginOptionsProperties.forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      delete props[property]
    }
  })

  if (options.inlineStyles && options.inlineStyles.element) {
    props.style = {
      ...options.inlineStyles.element,
      ...props.style,
    }
  }

  if (
    props.style &&
    props.style.overflow !== 'auto' &&
    props.style.overflow !== 'scroll'
  ) {
    props.style.overflow = 'auto'
  }

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

// https://stackoverflow.com/questions/49012718/check-if-a-child-is-react-fragment
const isFragment = (element: any, evaluated = false) => {
  if (typeof element === 'object' && element.type === Fragment) {
    return true
  }

  if (element === Fragment) {
    return true
  }

  if (typeof element.type !== 'function') {
    return false
  }

  // Only using this check in development.
  if (process.env.NODE_ENV !== 'production') {
    // Workaround to evaluate element.
    const Element = element.type(element.props)

    if (!evaluated) {
      return isFragment(Element, true)
    }
  }

  return false
}

type ReactHTMLElementProperties = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>
type ReactHTMLDivElementProperties = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

interface Props {
  as?: ElementType<any>
  children: ReactNode
  childAsElement?: boolean
}

/* eslint-disable react/prop-types */
export const Indicate = forwardRef<
  HTMLElement,
  Props & PluginOptions & ReactHTMLElementProperties
>(({ as = 'div', children, childAsElement, ...options }, childRef) => {
  const outerWrapperRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLElement>(null)
  const innerWrapperRef = useRef<HTMLDivElement>(null)
  const elementProps = getElementProps(elementRef, options)
  const allPluginOptions = getPluginProps(options, true)
  const pluginOptions = getPluginProps(options)
  const considerFragment = childAsElement && Children.count(children) === 1
  const isChildFragment = considerFragment && isFragment(children)
  let content = null
  const outerWrapperProps: ReactHTMLDivElementProperties = {
    ref: outerWrapperRef,
  }
  const innerWrapperProps: ReactHTMLDivElementProperties = {
    ref: innerWrapperRef,
  }

  if (!elementRef.current) {
    // TODO consider table and inline elements as well.
    outerWrapperProps.style = {
      overflow: 'auto',
      ...base.outerWrapper(null, null, null, false),
    }
    innerWrapperProps.style = base.innerWrapper(null, null, false)
  }

  useEffect(
    () => {
      const outerWrapper = outerWrapperRef.current
      const element =
        elementRef?.current ??
        (childRef as MutableRefObject<HTMLElement>)?.current
      const innerWrapper = innerWrapperRef?.current

      indicate(element, { outerWrapper, innerWrapper, ...pluginOptions })

      return () => {
        remove(element)
      }
    },
    // Size of arguments needs to stay constant, therefore also empty options.
    Object.keys(allPluginOptions).map((key) => allPluginOptions[key])
  )

  if (considerFragment && !isChildFragment) {
    // cloneElement necessary to add styles, React elements immutable.
    content = cloneElement(children as ReactElement, {
      style: { overflow: 'auto', ...options?.inlineStyles?.element },
    })
  } else {
    if (considerFragment && isChildFragment) {
      log('ReactChildFragment', { children })
    }

    // createElement workaround to render "as" element from string.
    content = createElement(
      as,
      elementProps,
      <div {...innerWrapperProps}>{children}</div>
    )
  }

  return <div {...outerWrapperProps}>{content}</div>
})

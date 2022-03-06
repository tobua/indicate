import React, {
  useEffect,
  useRef,
  createElement,
  cloneElement,
  ElementType,
  ReactNode,
  ReactElement,
  Children,
  forwardRef,
  MutableRefObject,
  ForwardedRef,
} from 'react'
import { remove, indicate } from './instance'
import { PluginOptions, pluginOptionsProperties } from './types'
import { base } from './style'
import { log } from './helper'

// Remove PluginOptions from props to get the props meant for the element.
const getElementProps = (ref: any, optionsAndProps: PluginOptions) => {
  const props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {
    ref,
    ...optionsAndProps,
  }

  pluginOptionsProperties.forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      delete props[property]
    }
  })

  if (optionsAndProps.inlineStyles && optionsAndProps.inlineStyles.element) {
    props.style = {
      ...optionsAndProps.inlineStyles.element,
      ...props.style,
    }
  }

  if (!props.style) {
    props.style = {}
  }

  if (props.style.overflow !== 'auto' && props.style.overflow !== 'scroll') {
    props.style.overflow = 'auto'
  }

  return props
}

// Get plugin options from props and extract all values for useEffect().
const spreadProperties = (optionsAndProps: {}) => {
  const options: PluginOptions = {}
  const optionValues = []

  pluginOptionsProperties.forEach((property) => {
    if (Object.prototype.hasOwnProperty.call(optionsAndProps, property)) {
      options[property] = optionsAndProps[property]
    }
    optionValues.push(optionsAndProps[property])
  })

  return {
    options,
    // Size of arguments with useEffect needs to stay constant, therefore also empty options.
    optionValues,
  }
}

const childrenValid = (children: ReactNode, childRef: ForwardedRef<HTMLElement>) => {
  let valid = true

  if (Children.count(children) !== 1) {
    log('ReactMultipleChildren', { children })
    valid = false
  }

  if (!childRef) {
    log('ReactMissingRef')
    valid = false
  }

  return valid
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
export const Indicate = forwardRef<HTMLElement, Props & PluginOptions & ReactHTMLElementProperties>(
  ({ as = 'div', children, childAsElement, ...optionsAndProps }, childRef) => {
    const outerWrapperRef = useRef<HTMLDivElement>(null)
    const elementRef = useRef<HTMLElement>(null)
    const innerWrapperRef = useRef<HTMLDivElement>(null)
    const elementProps = getElementProps(elementRef, optionsAndProps)
    const { options, optionValues } = spreadProperties(optionsAndProps)
    let content = null
    const outerWrapperProps: ReactHTMLDivElementProperties = {
      ref: outerWrapperRef,
    }
    const innerWrapperProps: ReactHTMLDivElementProperties = {
      ref: innerWrapperRef,
    }

    if (!elementRef.current) {
      outerWrapperProps.style = {
        ...(childAsElement && { overflow: 'auto' }),
        ...base.outerWrapper(null, null, null, false),
        ...options.inlineStyles?.outerWrapper,
      }
      innerWrapperProps.style = {
        ...base.innerWrapper(null, null, false),
        ...options.inlineStyles?.innerWrapper,
      }
    }

    useEffect(() => {
      const outerWrapper = outerWrapperRef.current
      const element = elementRef?.current ?? (childRef as MutableRefObject<HTMLElement>)?.current
      const innerWrapper = innerWrapperRef?.current

      indicate(element, { outerWrapper, innerWrapper, ...options })

      return () => {
        remove(element)
      }
    }, optionValues)

    if (childAsElement && childrenValid(children, childRef)) {
      // cloneElement necessary to add styles, React elements immutable.
      content = cloneElement(children as ReactElement, {
        ...elementProps,
        style: {
          overflow: 'auto',
          ...options?.inlineStyles?.element,
          ...elementProps?.style,
          ...(!(childRef as MutableRefObject<HTMLElement>)?.current &&
            options?.inlineStyles?.innerWrapper),
        },
      })
    } else {
      // createElement workaround to render "as" element from string.
      content = createElement(as, elementProps, <div {...innerWrapperProps}>{children}</div>)
    }

    return <div {...outerWrapperProps}>{content}</div>
  }
)

import React, {
  useEffect,
  useRef,
  createElement,
  ElementType,
  ReactNode,
} from 'react'
import { indicate, remove } from './index'
import { PluginOptions, pluginOptionsProperties } from './types'

// Remove PluginOptions from props to get the props meant for the element.
const getElementProps = (ref, options) => {
  const props = { ref, ...options }

  pluginOptionsProperties.forEach((property) => {
    if (props.hasOwnProperty(property)) {
      delete props[property]
    }
  })

  return props
}

interface Props {
  as?: ElementType<any>
  children: ReactNode
}

export const Indicate = ({
  as,
  children,
  ...options
}: Props &
  PluginOptions &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const outerWrapperRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLElement>(null)
  const innerWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outerWrapper = outerWrapperRef.current
    const element = elementRef.current
    const innerWrapper = innerWrapperRef.current

    indicate({ element, options: { outerWrapper, innerWrapper, ...options } })
    return () => remove(element)
  }, [options])

  // createElement workaround to render "as" element from string.
  return (
    <div ref={outerWrapperRef}>
      {createElement(
        as,
        getElementProps(elementRef, options),
        <div ref={innerWrapperRef}>{children}</div>
      )}
    </div>
  )
}

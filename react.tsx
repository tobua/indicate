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
  useCallback,
  useState,
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import { directions, Direction, isHorizontal, isVertical } from './types'
import { log } from './helper'

type ObserverRefs = Record<Direction, MutableRefObject<HTMLSpanElement>>

const initialVisibility = (horizontal: boolean, vertical: boolean) => ({
  [Direction.top]: false,
  [Direction.right]: !vertical,
  [Direction.bottom]: !horizontal,
  [Direction.left]: false,
})

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

type ReactHTMLElementProperties = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
type ReactHTMLDivElementProperties = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

interface Props {
  as?: ElementType<any>
  children: ReactNode
  childAsElement?: boolean
  horizontal?: boolean
  vertical?: boolean
  click?: false & { scrollDenominator: number }
  color?: string
  width?: string
  style?: CSSProperties
  innerStyle?: CSSProperties
  outerStyle?: CSSProperties
  outerWrapperProps?: ReactHTMLDivElementProperties
  innerWrapperProps?: ReactHTMLDivElementProperties
}

const createDirectionRefsObject = () =>
  directions.reduce((item, direction) => {
    item[direction] = useRef<HTMLSpanElement>()
    return item
  }, {}) as ObserverRefs

/* eslint-disable react/prop-types */
export const Indicate = forwardRef<HTMLElement, Props & ReactHTMLElementProperties>(
  (
    {
      as = 'div',
      children,
      childAsElement,
      horizontal = false,
      vertical = false,
      click = { scrollDenominator: 4 },
      color = '#FFFFFF',
      width = '20px',
      style,
      innerStyle,
      outerStyle,
      outerWrapperProps,
      innerWrapperProps,
      ...props
    },
    childRef
  ) => {
    // TODO table, inline
    const outerWrapperRef = useRef<HTMLDivElement>(null)
    const elementRef = useRef<HTMLElement>(null)
    const innerWrapperRef = useRef<HTMLDivElement>(null)
    const indicatorsRef = useRef<HTMLSpanElement[]>([])

    const observersRef = createDirectionRefsObject()
    const [visibility, setVisibility] = useState(initialVisibility(horizontal, vertical))
    const sharedVisibility = useRef(visibility)
    let content = null
    const handleIndicatorClick = useCallback((direction: Direction) => {
      const horizontalCurrent = isHorizontal(direction)
      const position = horizontalCurrent
        ? elementRef.current.scrollLeft
        : elementRef.current.scrollTop

      let scrollOffset =
        (horizontalCurrent ? elementRef.current.offsetWidth : elementRef.current.offsetHeight) /
        click.scrollDenominator

      if (direction === Direction.left || direction === Direction.top) {
        scrollOffset = -scrollOffset
      }

      elementRef.current.scrollTo({
        [horizontalCurrent ? Direction.left : Direction.top]: position + scrollOffset,
        behavior: 'smooth',
      })
    }, [])

    const handleObservation = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const visibilities = []
        const newState = { ...sharedVisibility.current }

        entries.forEach((entry) =>
          directions.forEach((direction) => {
            const isMatch = entry.target === observersRef[direction].current

            if (isMatch) {
              visibilities.push({ direction, visible: entry.isIntersecting })
            }
          })
        )

        visibilities.forEach((currentVisibility) => {
          if (currentVisibility.visible) {
            newState[currentVisibility.direction] = false
          } else {
            newState[currentVisibility.direction] = true
          }
        })

        if (
          newState.top !== visibility.top ||
          newState.right !== visibility.right ||
          newState.bottom !== visibility.bottom ||
          newState.left !== visibility.left
        ) {
          setVisibility(newState)
          sharedVisibility.current = newState
        }
      },
      [visibility, observersRef, sharedVisibility]
    )

    const observe = useCallback((element: HTMLElement) => {
      const observer = new IntersectionObserver(handleObservation, {
        // TODO innerWrapper if table
        root: element,
        // Only parts of element inside the root element are counted.
        rootMargin: '0px',
        // Even if only 10% of the observer is visible, trigger handler.
        threshold: 0.1,
      })

      // Observe all four observer elements absolutely positioned at the borders of the root element.
      directions.forEach((direction) => {
        observer.observe(observersRef[direction].current)
      })

      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      // const outerWrapper = outerWrapperRef.current
      const element = elementRef?.current ?? (childRef as MutableRefObject<HTMLElement>)?.current
      // const innerWrapper = innerWrapperRef?.current

      const disconnectObserver = observe(element)

      return disconnectObserver
    }, [])

    if (childAsElement && childrenValid(children, childRef)) {
      // cloneElement necessary to add styles, React elements immutable.
      content = cloneElement(children as ReactElement, {
        ...props,
        style: {
          overflow: 'auto',
          // ...options?.inlineStyles?.element,
          // ...elementProps?.style,
          // ...(!(childRef as MutableRefObject<HTMLElement>)?.current && options?.inlineStyles?.innerWrapper),
        },
      })
    } else {
      // createElement workaround to render "as" element from string.
      content = createElement(
        as,
        { ref: elementRef, style: { overflow: 'auto', ...style }, ...props },
        <div
          style={{
            ...innerStyle,
            position: 'relative',
            display: 'inline-flex',
            verticalAlign: 'top',
          }}
          ref={innerWrapperRef}
          {...innerWrapperProps}
        >
          {children}
          {/* Observers */}
          {directions.map((direction) => (
            <span
              key={direction}
              ref={observersRef[direction]}
              style={{
                position: 'absolute',
                top: isHorizontal(direction) ? '0' : 'auto',
                left: isVertical(direction) ? '0' : 'auto',
                [direction]: '0',
                width: isVertical(direction) ? '100%' : 1,
                height: isHorizontal(direction) ? '100%' : 1,
              }}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        style={{ ...outerStyle, position: 'relative', ...(childAsElement && { overflow: 'auto' }) }}
        ref={outerWrapperRef}
        {...outerWrapperProps}
      >
        {content}
        {/* Indicators */}
        {directions.map((direction, index) => (
          <span
            key={direction}
            style={{
              display: 'flex',
              opacity: visibility[direction] ? 1 : 0,
              pointerEvents: visibility[direction] ? 'auto' : 'none',
              background: `linear-gradient(to ${direction}, rgba(255, 255, 255, 0), ${color})`,
              transition: 'opacity 300ms linear',
              position: 'absolute',
              cursor: click ? 'pointer' : 'inherit',
              top: isHorizontal(direction) ? '0' : 'auto',
              left: isVertical(direction) ? '0' : 'auto',
              [direction]: '0',
              alignItems: 'center',
              justifyContent: 'center',
              width: isHorizontal(direction) ? width : '100%',
              height: isVertical(direction) ? width : '100%',
            }}
            role="button"
            aria-label={`Scroll ${direction}.`}
            tabIndex={0}
            onKeyDown={() => {}}
            ref={indicatorsRef[index]}
            onClick={click ? () => handleIndicatorClick(direction) : null}
          />
        ))}
      </div>
    )
  }
)

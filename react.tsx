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

type ObserverRefs = Record<Direction, MutableRefObject<HTMLSpanElement & HTMLTableSectionElement>>
type Visibility = Record<Direction, boolean>

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

const hideScrollbarClass = 'hide-indicate-scrollbar'

type ArrowIcon = 'arrow-rounded' | 'pointer-rounded' | 'arrow' | 'pointer'
type ArrowPosition = 'center' | 'end' | 'start'

interface ArrowProps {
  // eslint-disable-next-line react/no-unused-prop-types
  position: ArrowPosition
  icon: ArrowIcon
  color: string
  image?: string
  markup?: JSX.Element | ReactNode
}

const defaultArrowProps: ArrowProps = {
  position: 'center',
  icon: 'arrow-rounded',
  color: '#000000',
}

const directionToRotation = {
  [Direction.left]: 180,
  [Direction.right]: 0,
  [Direction.top]: 270,
  [Direction.bottom]: 90,
}

function Arrow({ icon, color, markup, image, direction }: ArrowProps & { direction: Direction }) {
  const style = {
    width: 12,
    height: 12,
    display: 'block',
    transform: `rotate(${directionToRotation[direction]}deg)`,
  }

  if (image) {
    return <img style={style} src={image} alt={`indicate arrow ${direction}`} />
  }

  if (markup) {
    return <span style={style}>{markup}</span>
  }

  if (icon === 'arrow-rounded') {
    return (
      <svg style={style} viewBox="0 0 120 120" stroke={color}>
        <line strokeWidth={20} strokeLinecap="round" x1="10" y1="60" x2="110" y2="60" />
        <line
          strokeWidth={20}
          strokeLinecap="round"
          x1="108.213"
          y1="57.3553"
          x2="61.5442"
          y2="10.6863"
        />
        <line
          strokeWidth={20}
          strokeLinecap="round"
          x1="61.5442"
          y1="109.213"
          x2="108.213"
          y2="62.5442"
        />
      </svg>
    )
  }

  if (icon === 'pointer-rounded') {
    return (
      <svg style={style} viewBox="0 0 120 120" stroke={color}>
        <line
          strokeWidth={20}
          strokeLinecap="round"
          x1="43.1421"
          y1="11"
          x2="91.2254"
          y2="59.0833"
        />
        <line
          strokeWidth={20}
          strokeLinecap="round"
          x1="91.2254"
          y1="60.1421"
          x2="43.1421"
          y2="108.225"
        />
      </svg>
    )
  }

  if (icon === 'arrow') {
    return (
      <svg style={style} viewBox="0 0 120 120" stroke={color}>
        <line strokeWidth={20} x1="0" y1="60" x2="120" y2="60" />
        <line strokeWidth={20} x1="62.9289" y1="112.929" x2="113.284" y2="62.5736" />
        <line strokeWidth={20} x1="113.284" y1="57.4264" x2="62.929" y2="7.07109" />
      </svg>
    )
  }

  return (
    <svg style={style} viewBox="0 0 120 120" stroke={color}>
      <line strokeWidth={20} x1="37.0711" y1="6.92893" x2="96.8923" y2="66.7502" />
      <line strokeWidth={20} x1="96.468" y1="53.0711" x2="37.0711" y2="112.468" />
    </svg>
  )
}

const getArrowPosition = (arrow: Partial<ArrowProps>) => {
  const position = arrow.position ?? 'center'

  if (position === 'center') {
    return position
  }

  return `flex-${position}`
}

const getInline = (tag: ElementType<any>, display?: string) => {
  if (display && display.startsWith('inline')) {
    return true
  }

  return ['a', 'code', 'cite', 'span', 'strong', 'b', 'textarea'].includes(String(tag))
}

function Observers({
  observersRef,
  as: ObserverElementType = 'span',
  theme,
}: Partial<Omit<Props, 'arrow'>> & {
  observersRef: ObserverRefs
  as?: 'span' | 'tbody'
}) {
  return (
    <>
      {directions.map((direction) => (
        <ObserverElementType
          key={direction}
          ref={observersRef[direction]}
          style={{
            position: 'absolute',
            top: isHorizontal(direction) ? '0' : 'auto',
            left: isVertical(direction) ? '0' : 'auto',
            [direction]: '0',
            width: isVertical(direction) ? '100%' : 1,
            height: isHorizontal(direction) ? '100%' : 1,
            ...theme.observer,
          }}
        />
      ))}
    </>
  )
}

function Indicators({
  visibility,
  click,
  arrow,
  indicatorsRef,
  handleIndicatorClick,
  width,
  color,
  theme,
}: Partial<Omit<Props, 'arrow'>> & {
  indicatorsRef: MutableRefObject<HTMLSpanElement[]>
  visibility: Visibility
  handleIndicatorClick: (direction: Direction) => void
  arrow: Partial<ArrowProps>
}) {
  return (
    <>
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
            alignItems: getArrowPosition(arrow),
            justifyContent: getArrowPosition(arrow),
            width: isHorizontal(direction) ? width : '100%',
            height: isVertical(direction) ? width : '100%',
            ...theme.indicator,
            ...(visibility[direction]
              ? theme.show && theme.show(indicatorsRef[index])
              : theme.show && theme.hide(indicatorsRef[index])),
          }}
          role="button"
          aria-label={`Scroll ${direction}.`}
          tabIndex={0}
          onKeyDown={() => {}}
          ref={indicatorsRef[index]}
          onClick={click ? () => handleIndicatorClick(direction) : null}
        >
          {arrow && <Arrow {...defaultArrowProps} {...arrow} direction={direction} />}
        </span>
      ))}
    </>
  )
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
  click?: boolean | { scrollDenominator: number }
  color?: string
  width?: string
  style?: CSSProperties
  hideScrollbar?: boolean
  innerStyle?: CSSProperties
  outerStyle?: CSSProperties
  outerWrapperProps?: ReactHTMLDivElementProperties
  innerWrapperProps?: ReactHTMLDivElementProperties
  arrow?: boolean | Partial<ArrowProps>
  theme?: {
    outerWrapper?: CSSProperties
    element?: CSSProperties
    innerWrapper?: CSSProperties
    indicator?: CSSProperties
    observer?: CSSProperties
    arrow?: CSSProperties
    hide?: (indicator: HTMLSpanElement) => void | CSSProperties
    show?: (indicator: HTMLSpanElement) => void | CSSProperties
  }
  show?: (indicator: HTMLSpanElement) => void
  hide?: (hide: HTMLSpanElement) => void
  moveStylesToWrapper?: boolean
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
      arrow = defaultArrowProps,
      hideScrollbar = true,
      className,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      moveStylesToWrapper = false, // TODO
      theme = {},
      ...props
    },
    childRef
  ) => {
    const outerWrapperRef = useRef<HTMLDivElement>(null)
    const elementRef = useRef<HTMLElement>(null)
    const innerWrapperRef = useRef<HTMLDivElement & HTMLTableElement>(null)
    const indicatorsRef = useRef<HTMLSpanElement[]>([])
    const isInline = getInline(as, style && style.display)

    const observersRef = createDirectionRefsObject()
    const [visibility, setVisibility] = useState(initialVisibility(horizontal, vertical))
    const sharedVisibility = useRef<Visibility>(visibility)
    let content = null
    const handleIndicatorClick = useCallback((direction: Direction) => {
      const horizontalCurrent = isHorizontal(direction)
      const position = horizontalCurrent
        ? elementRef.current.scrollLeft
        : elementRef.current.scrollTop
      const denominator = (click as { scrollDenominator: number }).scrollDenominator

      let scrollOffset =
        (horizontalCurrent ? elementRef.current.offsetWidth : elementRef.current.offsetHeight) /
        denominator

      if (direction === Direction.left || direction === Direction.top) {
        scrollOffset = -scrollOffset
      }

      elementRef.current.scrollTo({
        [horizontalCurrent ? Direction.left : Direction.top]: position + scrollOffset,
        behavior: 'smooth',
      })
    }, [])

    if (arrow === true) {
      // eslint-disable-next-line no-param-reassign
      arrow = defaultArrowProps
    }

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
          newState.top !== sharedVisibility.current.top ||
          newState.right !== sharedVisibility.current.right ||
          newState.bottom !== sharedVisibility.current.bottom ||
          newState.left !== sharedVisibility.current.left
        ) {
          sharedVisibility.current = newState
          setVisibility(newState)
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
          ...(hideScrollbar && {
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }),
          ...style,
          ...theme.element,
          // ...options?.inlineStyles?.element,
          // ...elementProps?.style,
          // ...(!(childRef as MutableRefObject<HTMLElement>)?.current && options?.inlineStyles?.innerWrapper),
        },
      })
    } else if (as === 'table') {
      content = (
        <div
          // @ts-ignore
          ref={elementRef}
          style={{
            position: 'relative',
            overflow: 'auto',
            verticalAlign: 'top',
            ...style,
            ...theme.element,
          }}
        >
          {/* @ts-ignore */}
          <table
            ref={innerWrapperRef}
            style={{
              display: 'inline-block',
              position: 'relative',
              verticalAlign: 'top',
              ...theme.innerWrapper,
            }}
          >
            {children}
            <Observers as="tbody" observersRef={observersRef} theme={theme} />
          </table>
        </div>
      )
    } else if (isInline) {
      content = (
        <div
          // @ts-ignore
          ref={elementRef}
          style={{
            ...style,
            display: 'inline-block',
            overflow: 'auto',
            verticalAlign: 'top',
            ...theme.element,
          }}
        >
          {createElement(
            as,
            {
              ref: innerWrapperRef,
              style: {
                position: 'relative',
                verticalAlign: 'top',
                display: 'inline-flex',
                ...theme.innerWrapper,
              },
            },
            <>
              {children}
              <Observers observersRef={observersRef} theme={theme} />
            </>
          )}
        </div>
      )
    } else {
      // createElement workaround to render "as" element from string.
      content = createElement(
        as,
        {
          ref: elementRef,
          className:
            className || hideScrollbar
              ? `${className}${hideScrollbar ? ` ${hideScrollbarClass}` : ''}`
              : undefined,
          style: {
            overflow: 'auto',
            ...(hideScrollbar && {
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }),
            ...style,
            ...theme.element,
          },
          ...props,
        },
        <div
          style={{
            ...innerStyle,
            position: 'relative',
            display: 'inline-flex',
            verticalAlign: 'top',
            ...theme.innerWrapper,
          }}
          ref={innerWrapperRef}
          {...innerWrapperProps}
        >
          {children}
          <Observers observersRef={observersRef} theme={theme} />
        </div>
      )
    }

    return (
      <div
        style={{
          ...outerStyle,
          position: 'relative',
          ...(childAsElement && { overflow: 'auto' }),
          ...(isInline && { display: 'inline-block' }),
          ...theme.outerWrapper,
        }}
        ref={outerWrapperRef}
        {...outerWrapperProps}
      >
        {hideScrollbar && (
          <style>{`.${hideScrollbarClass}::-webkit-scrollbar { display: none; }`}</style>
        )}
        {content}
        <Indicators
          visibility={visibility}
          click={click}
          arrow={arrow as Partial<ArrowProps>}
          indicatorsRef={indicatorsRef}
          handleIndicatorClick={handleIndicatorClick}
          width={width}
          color={color}
          theme={theme}
        />
      </div>
    )
  }
)

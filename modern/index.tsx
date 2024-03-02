import type { CSSProperties } from 'react'

type Direction = 'top' | 'right' | 'bottom' | 'left'

const wrapperStyles: CSSProperties = {
  position: 'relative',
}

const overflowStyles: CSSProperties = {
  display: 'flex',
  overflow: 'auto',
  scrollTimelineName: '--indicate-scroll-element',
  scrollTimelineAxis: 'inline', // TODO possibly only one direction supported.
}

const indicatorStyles = (direction: Direction, horizontal: boolean): CSSProperties => ({
  display: 'flex',
  position: 'absolute',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  height: horizontal ? '100%' : 20,
  width: horizontal ? 20 : '100%',
  background: 'red',
  animationTimeline: '--indicate-scroll-element',
  animationTimingFunction: 'linear',
  animationFillMode: 'forwards',
  animationName: `indicate-${direction}`,
  left: direction === 'left' ? 0 : 'auto',
  right: direction === 'right' ? 0 : 'auto',
  top: direction === 'top' ? 0 : 'auto',
  bottom: direction === 'bottom' ? 0 : 'auto',
  opacity: direction === 'left' || direction === 'top' ? 0 : 1,
})

const keyframes = `@keyframes indicate-top {
  20% { opacity: 1; }
  100% { opacity: 1; }
}
@keyframes indicate-right {
  80% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes indicate-bottom {
  80% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes indicate-left {
  20% { opacity: 1; }
  100% { opacity: 1; }
}`

const scrollByDirection = {
  top: (container: HTMLDivElement) => ({ top: container.scrollTop - container.scrollHeight * 0.2 }),
  right: (container: HTMLDivElement) => ({
    left: container.scrollLeft + container.scrollWidth * 0.2,
  }),
  bottom: (container: HTMLDivElement) => ({
    top: container.scrollTop + container.scrollHeight * 0.2,
  }),
  left: (container: HTMLDivElement) => ({
    left: container.scrollLeft - container.scrollWidth * 0.2,
  }),
}

function Indicator({ direction, style }: { direction: Direction; style?: CSSProperties }) {
  const horizontal = direction === 'left' || direction === 'right'

  return (
    <button
      aria-label={`Scroll to ${direction}`}
      type="button"
      style={{
        ...indicatorStyles(direction, horizontal),
        ...style,
      }}
      onClick={(event) => {
        const element = event.target as HTMLButtonElement
        const container = element.parentElement as HTMLDivElement
        container.scrollTo({
          behavior: 'smooth',
          ...scrollByDirection[direction](container),
        })
      }}
    />
  )
}

export function Indicate({
  style,
  overflowStyle,
  indicatorStyle,
  children,
  ...props
}: JSX.IntrinsicElements['div'] & {
  overflowStyle?: CSSProperties
  indicatorStyle?: CSSProperties
}) {
  return (
    <div {...props} style={{ ...wrapperStyles, ...style }}>
      <div
        className="scroller"
        style={{
          ...overflowStyles,
          ...overflowStyle,
        }}
      >
        {children}
        <style>{keyframes}</style>
        <Indicator style={indicatorStyle} direction="top" />
        <Indicator style={indicatorStyle} direction="right" />
        <Indicator style={indicatorStyle} direction="bottom" />
        <Indicator style={indicatorStyle} direction="left" />
      </div>
    </div>
  )
}

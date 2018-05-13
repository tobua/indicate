/**
 * Configuration for assigning position and stretch (width/height) to fade/arrow
 * nodes.
 **/
export default {
  top: {
    stretch: (style, instance) => (style.width = `${instance.elementWidth()}px`),
    left: outer => `${outer.left}px`,
    top: outer => `${outer.top}px`
  },
  right: {
    stretch: (style, instance) => (style.height = `${instance.elementHeight()}px`),
    left: (outer, instance) => `calc(${outer.left}px + ${instance.elementWidth()}px - ${instance.options.fadeWidth})`,
    top: outer => `${outer.top}px`
  },
  bottom: {
    stretch: (style, instance) => (style.width = `${instance.elementWidth()}px`),
    left: outer => `${outer.left}px`,
    top: (outer, instance) => `calc(${outer.top}px + ${instance.elementHeight()}px - ${instance.options.fadeWidth})`
  },
  left: {
    stretch: (style, instance) => (style.height = `${instance.elementHeight()}px`),
    left: outer => `${outer.left}px`,
    top: outer => `${outer.top}px`
  }
}

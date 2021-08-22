import { observable } from 'mobx'
import { Type } from 'konfi'
import youtube from 'indicate/theme/youtube'
import className from 'indicate/theme/class-name'

const themes = {
  youtube,
  none: {},
  'class-name': className,
}

export const getTheme = (name: string) => {
  if (name === 'default') {
    return undefined
  }

  return themes[name]
}

// The schema is optional and in most cases can be inferred from the data.
export const optionsSchema = {
  arrow: [
    {
      type: Type.boolean,
    },
    {
      position: {
        type: Type.select,
        values: ['start', 'center', 'end'],
        default: 1,
      },
      icon: {
        type: Type.select,
        values: ['arrow-rounded', 'pointer-rounded', 'arrow', 'pointer'],
      },
      color: {
        type: Type.hex,
      },
      image: {
        type: Type.string,
      },
      markup: {
        type: Type.string,
      },
    },
  ],
  click: [
    {
      type: Type.boolean,
    },
    {
      denominator: {
        type: Type.number,
        default: 2,
      },
    },
  ],
  color: {
    type: Type.hex,
  },
  width: {
    type: Type.string,
  },
  hideScrollbar: {
    type: Type.boolean,
  },
  moveStylesToWrapper: {
    type: Type.boolean,
  },
  theme: {
    type: Type.select,
    values: ['default', 'none', 'youtube', 'class-name'],
  },
}

export const options = observable({
  arrow: true,
  click: true,
  color: '#FFFFFF',
  width: '20px',
  hideScrollbar: true,
  moveStylesToWrapper: false,
  theme: undefined,
})

export const styles = observable({
  maxHeight: '15vw',
  tiles: 9,
  rows: 1,
})

import { observable } from 'mobx'
import { Type } from 'konfi'

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
}

export const options = observable({
  arrow: true,
  click: true,
  color: '#FFFFFF',
  width: '20px',
})

export const styles = observable({
  maxHeight: '15vw',
  tiles: 9,
  rows: 1,
})

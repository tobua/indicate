import { observable } from 'mobx'
import { Type } from 'konfi'

// The schema is optional and in most cases can be inferred from the data.
export const optionsSchema = {
  arrow: {
    type: Type.boolean,
  },
  arrowPosition: {
    type: Type.select,
    values: ['start', 'center', 'end'],
  },
  click: {
    type: Type.boolean,
  },
  color: {
    type: Type.hex,
  },
  width: {
    type: Type.string,
  },
}

export const options = observable({
  arrow: true,
  arrowPosition: 'center' as 'center',
  click: true,
  color: '#FFFFFF',
  width: '20px',
})

export const styles = observable({
  maxHeight: '15vw',
  tiles: 9,
  rows: 1,
})

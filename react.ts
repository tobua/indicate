import { useEffect, useRef } from 'react'
import { indicate, remove } from './index'
import { PluginOptions } from './types'

export function useIndicate(options: PluginOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    indicate({ element: ref.current, options })
    return () => remove(ref.current)
  })

  return ref
}

import { useEffect, useRef } from 'react'
import { indicate, remove } from './index'
import { PluginOptions } from './types'

export function useIndicate<T extends HTMLElement>(
  options: PluginOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    indicate({ element: ref.current, options })
    return () => remove(ref.current)
  })

  return ref
}

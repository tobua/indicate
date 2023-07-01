import { toJS } from 'mobx'
import prettier from 'prettier'
import parserBabel from 'prettier/esm/parser-babel.mjs'
import { defaultOptions } from 'indicate'
import { options } from 'state'

// Remove the default options, so only the changes remain.
const removeDefaultOptions = (currentOptions, defaults = defaultOptions) => {
  const withoutDefaults = { ...currentOptions }

  Object.keys(withoutDefaults).forEach((key) => {
    if (withoutDefaults[key] !== null && typeof withoutDefaults[key] === 'object') {
      withoutDefaults[key] = removeDefaultOptions(withoutDefaults[key], defaults[key])
      return
    }

    if (
      withoutDefaults[key] === defaults[key] ||
      (withoutDefaults[key] === true && typeof defaults[key] === 'object')
    ) {
      delete withoutDefaults[key]
    }
  })

  return withoutDefaults
}

export const formatCode = (
  code: (value: string, objectValues?: string) => string,
  wrapper?: (value: string) => string
) => {
  const modifiedOptions = removeDefaultOptions(options)
  const hasProperties = !!Object.keys(modifiedOptions).length
  let stringifiedOptions = hasProperties ? JSON.stringify(modifiedOptions) : ''

  // Optional wrapper only applied if there are options.
  if (wrapper && hasProperties) {
    stringifiedOptions = wrapper(stringifiedOptions)
  }

  return prettier.format(code(stringifiedOptions, modifiedOptions), {
    parser: 'babel',
    plugins: [parserBabel],
    semi: false,
    trailingComma: 'none',
    singleQuote: true,
    printWidth: 40,
  })
}

export const addDirectionToOptions = (rows) => {
  const currentOptions = toJS(options)

  if (rows > 1) {
    // @ts-ignore
    currentOptions.inlineStyles = {
      innerWrapper: {
        flexDirection: 'column',
      },
    }
  }

  return currentOptions
}

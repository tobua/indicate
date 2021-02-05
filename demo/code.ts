import prettier from 'prettier'
// @ts-ignore
import parserBabel from 'prettier/esm/parser-babel.mjs'
import { defaultOptions } from 'indicate'
import { options } from 'state'

// Remove the default options, so only the changes remain.
const removeDefaultOptions = (currentOptions, defaults = defaultOptions) => {
  const withoutDefaults = { ...currentOptions }

  Object.keys(withoutDefaults).forEach((key) => {
    if (
      withoutDefaults[key] !== null &&
      typeof withoutDefaults[key] === 'object'
    ) {
      withoutDefaults[key] = removeDefaultOptions(
        withoutDefaults[key],
        defaults[key]
      )
      return
    }

    if (withoutDefaults[key] === defaults[key]) {
      delete withoutDefaults[key]
    }
  })

  return withoutDefaults
}

export const formatCode = (
  code: (value: string) => string,
  wrapper?: (value: string) => string
) => {
  const modifiedOptions = removeDefaultOptions(options)
  const hasProperties = !!Object.keys(modifiedOptions).length
  let stringifiedOptions = hasProperties ? JSON.stringify(modifiedOptions) : ''

  // Optional wrapper only applied if there are options.
  if (wrapper && hasProperties) {
    stringifiedOptions = wrapper(stringifiedOptions)
  }

  return prettier.format(code(stringifiedOptions), {
    parser: 'babel',
    plugins: [parserBabel],
    semi: false,
    trailingComma: 'none',
    singleQuote: true,
    printWidth: 40,
  })
}

import React from 'react'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'
import Indicate from 'react-native-indicate'

test('README example renders correctly.', () => {
  const rendered = renderer.create(
    <Indicate>
      <Text>Hello World</Text>
    </Indicate>
  )
  const tree = rendered.toJSON()

  expect(tree.type).toEqual('RCTSafeAreaView')
})

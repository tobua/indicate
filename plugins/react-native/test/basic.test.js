import React from 'react'
import { View, Text } from 'react-native'
import renderer from 'react-test-renderer'
import Indicate from 'react-native-indicate'

const getChildren = (tree) =>
  tree.children[0].children[0].children[0].children[0].children

test('Renders empty and without any options.', () => {
  const rendered = renderer.create(<Indicate />)
  const tree = rendered.toJSON()

  expect(tree.type).toEqual('RCTSafeAreaView')
  // ScrollView plus right and bottom fade.
  expect(tree.children.length).toEqual(3)
  // Includes two ScrollViews by default, one for vertical and one for horizontal.
  expect(tree.children[0].type).toEqual('RCTScrollView')
  expect(tree.children[0].props.horizontal).toEqual(true)
  expect(tree.children[0].children[0].children[0].type).toEqual('RCTScrollView')
  expect(tree.children[0].children[0].children[0].props.vertical).toEqual(true)
  // Doesn't contain any children.
  expect(getChildren(tree)).toEqual(null)
})

test('Renders inside a View.', () => {
  const rendered = renderer.create(
    <View>
      <Indicate />
    </View>
  )
  const tree = rendered.toJSON()

  expect(tree.type).toEqual('View')
  expect(tree.children[0].type).toEqual('RCTSafeAreaView')
})

test('Renders with a Text component inside.', () => {
  const rendered = renderer.create(
    <Indicate>
      <Text>Hello World</Text>
    </Indicate>
  )
  const tree = rendered.toJSON()

  expect(getChildren(tree)[0].type).toEqual('Text')
  expect(getChildren(tree)[0].children[0]).toEqual('Hello World')
})

test('Renders with a View component inside.', () => {
  const rendered = renderer.create(
    <Indicate>
      <View />
    </Indicate>
  )
  const tree = rendered.toJSON()

  expect(getChildren(tree)[0].type).toEqual('View')
  expect(getChildren(tree)[0].children).toEqual(null)
})

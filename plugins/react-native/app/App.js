import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Indicate from 'react-native-indicate'
import blackGradient from './black-gradient.png'

export default () => (
  <ScrollView contentContainerStyle={styles.screen}>
    <Text style={styles.title}>Indicate</Text>
    <Text style={styles.subtitle}>both directions</Text>
    <Indicate wrapperStyle={styles.wrapper} style={styles.view}>
      <Text style={styles.first}>
        Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa. Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.
      </Text>
    </Indicate>
    <Text style={styles.subtitle}>horizontal</Text>
    <Indicate horizontal wrapperStyle={styles.wrapper} style={styles.view}>
      <Text style={styles.second}>
        Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa. Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.
      </Text>
    </Indicate>
    <Text style={styles.subtitle}>vertical</Text>
    <Indicate vertical wrapperStyle={styles.wrapper} style={styles.view}>
      <Text style={styles.third}>
        Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa. Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.
      </Text>
    </Indicate>
    <Text style={styles.subtitle}>gradient and style</Text>
    <Indicate
      wrapperStyle={styles.wrapper}
      style={[styles.view, styles.viewBorder]}
      gradient={blackGradient}
    >
      <Text style={styles.fourth}>
        Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa. Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
        arepa.
      </Text>
    </Indicate>
    <Text style={styles.footer}>create-react-native-plugin</Text>
  </ScrollView>
)

const styles = StyleSheet.create({
  screen: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    marginBottom: 20,
    fontSize: 40,
  },
  footer: {
    marginTop: 30,
    fontSize: 15,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  wrapper: {
    height: 100,
  },
  view: {
    backgroundColor: 'lightgray',
  },
  first: { width: 500, height: 200 },
  second: { width: 500, height: 100 },
  third: { width: 200, height: 200 },
  fourth: { width: 500, height: 200 },
  viewBorder: { borderWidth: 2 },
})

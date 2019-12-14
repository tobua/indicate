import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Indicate from 'react-native-indicate'
import blackGradient from './black-gradient.png'

export default class App extends Component {
  render () {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Indicate</Text>
        <Text style={styles.subtitle}>both directions</Text>
        <Indicate wrapperStyle={styles.wrapper} style={styles.view}>
          <Text style={{ width: 500, height: 200 }}>
            Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
            arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato
            molutiso arepa. Lorem ipsum dolor ipsum sit loret amo loremata
            disorato molutiso arepa.Lorem ipsum dolor ipsum sit loret amo
            loremata disorato molutiso arepa.Lorem ipsum dolor ipsum sit loret
            amo loremata disorato molutiso arepa.Lorem ipsum dolor ipsum sit
            loret amo loremata disorato molutiso arepa.Lorem ipsum dolor ipsum
            sit loret amo loremata disorato molutiso arepa.Lorem ipsum dolor
            ipsum sit loret amo loremata disorato molutiso arepa.Lorem ipsum
            dolor ipsum sit loret amo loremata disorato molutiso arepa.Lorem
            ipsum dolor ipsum sit loret amo loremata disorato molutiso
            arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato
            molutiso arepa.Lorem ipsum dolor ipsum sit loret amo loremata
            disorato molutiso arepa.
          </Text>
        </Indicate>
        <Text style={styles.subtitle}>horizontal</Text>
        <Indicate horizontal wrapperStyle={styles.wrapper} style={styles.view}>
          <Text style={{ width: 500, height: 100 }}>
            Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
            arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato
            molutiso arepa. Lorem ipsum dolor ipsum sit loret amo loremata
            disorato molutiso arepa.Lorem ipsum dolor ipsum sit loret amo
            loremata disorato molutiso arepa.Lorem ipsum dolor ipsum sit loret
            amo loremata disorato molutiso arepa.Lorem ipsum dolor ipsum sit
            loret amo loremata disorato molutiso arepa.Lorem ipsum dolor ipsum
            sit loret amo loremata disorato molutiso arepa.Lorem ipsum dolor
            ipsum sit loret amo loremata disorato molutiso arepa.Lorem ipsum
            dolor ipsum sit loret amo loremata disorato molutiso arepa.Lorem
            ipsum dolor ipsum sit loret amo loremata disorato molutiso
            arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato
            molutiso arepa.Lorem ipsum dolor ipsum sit loret amo loremata
            disorato molutiso arepa.
          </Text>
        </Indicate>
        <Text style={styles.subtitle}>vertical</Text>
        <Indicate vertical wrapperStyle={styles.wrapper} style={styles.view}>
          <Text style={{ width: 200, height: 200 }}>
            Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
            arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato
            molutiso arepa. Lorem ipsum dolor ipsum sit loret amo loremata
            disorato molutiso arepa.Lorem ipsum dolor ipsum sit loret amo
            loremata disorato molutiso arepa.Lorem ipsum dolor ipsum sit loret
            amo loremata disorato molutiso arepa.Lorem ipsum dolor ipsum sit
            loret amo loremata disorato molutiso arepa.Lorem ipsum dolor ipsum
            sit loret amo loremata disorato molutiso arepa.Lorem ipsum dolor
            ipsum sit loret amo loremata disorato molutiso arepa.Lorem ipsum
            dolor ipsum sit loret amo loremata disorato molutiso arepa.Lorem
            ipsum dolor ipsum sit loret amo loremata disorato molutiso
            arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato
            molutiso arepa.Lorem ipsum dolor ipsum sit loret amo loremata
            disorato molutiso arepa.
          </Text>
        </Indicate>
        <Text style={styles.subtitle}>gradient and style</Text>
        <Indicate
          wrapperStyle={styles.wrapper}
          style={[styles.view, { borderWidth: 2 }]}
          gradient={blackGradient}
        >
          <Text style={{ width: 500, height: 200 }}>
            Lorem ipsum dolor ipsum sit loret amo loremata disorato molutiso
            arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato
            molutiso arepa. Lorem ipsum dolor ipsum sit loret amo loremata
            disorato molutiso arepa.Lorem ipsum dolor ipsum sit loret amo
            loremata disorato molutiso arepa.Lorem ipsum dolor ipsum sit loret
            amo loremata disorato molutiso arepa.Lorem ipsum dolor ipsum sit
            loret amo loremata disorato molutiso arepa.Lorem ipsum dolor ipsum
            sit loret amo loremata disorato molutiso arepa.Lorem ipsum dolor
            ipsum sit loret amo loremata disorato molutiso arepa.Lorem ipsum
            dolor ipsum sit loret amo loremata disorato molutiso arepa.Lorem
            ipsum dolor ipsum sit loret amo loremata disorato molutiso
            arepa.Lorem ipsum dolor ipsum sit loret amo loremata disorato
            molutiso arepa.Lorem ipsum dolor ipsum sit loret amo loremata
            disorato molutiso arepa.
          </Text>
        </Indicate>
        <Text style={styles.footer}>create-react-native-plugin</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 70,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40
  },
  title: {
    marginBottom: 30,
    fontSize: 50
  },
  footer: {
    marginTop: 30,
    fontSize: 15
  },
  subtitle: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 20,
    alignSelf: 'flex-start'
  },
  wrapper: {
    height: 100
  },
  view: {
    backgroundColor: 'lightgray'
  }
})

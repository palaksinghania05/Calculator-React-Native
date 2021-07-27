import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Screen extends Component {
  render() {
    const {
      expression,
      result,
    } = this.props;

    return (
      <View style={styles.screenComponent}>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenComponent: {
    flex: 3,
   // borderWidth: 1,
   // borderColor: 'red',
    backgroundColor: 'skyblue',
  },
  expression: {
    color: 'black',
    fontSize: 30,
   // borderColor: 'black',
  //  borderWidth: 1,
    textAlign: 'right',
    padding: 10,
  },
  result: {
    color: 'black',
    fontSize: 20,
  //  borderColor: 'black',
   // borderWidth: 1,
    textAlign: 'right',
    padding: 10,
  },
});

export default Screen;

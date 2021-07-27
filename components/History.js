import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ScrollView,
} from 'react-native';

class History extends Component {
  render() {
    const { history, deleteHistory, slideIn, closeHistory } = this.props;

    return (
      <View style={styles.historyComponent}>
        <Animated.View
          style={{
            ...styles.mainHistory,
            bottom: slideIn.interpolate({
              inputRange: [0, 1],
              outputRange: ['100%', '0%'], 
            }),
          }}>
          <View style={styles.historyHeader}>
            <Text style={styles.headerText}>History</Text>
            <Pressable
              style={styles.historyClearButton}
              android_ripple={{ color: 'white', borderless: false }}
              onPress={deleteHistory}>
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>
          </View>

          <View style={styles.historyContent}>
            <ScrollView style={{ flex: 1 }}>
              {history.map((item) => (
                <View style={styles.historyView}>
                  <Text style={styles.historyExp}>{item.expression} = {item.result}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <Pressable
            style={styles.historyCloseButton}
            android_ripple={{ color: 'white', borderless: false }}
            onPress={closeHistory}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Animated.View>

        <View style={styles.disabledArea}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  historyComponent: {
    flex: 1, 
  },
  mainHistory: {
    flex: 9,
    backgroundColor: 'skyblue',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  disabledArea: {
    flex: 1, 
  },
  historyHeader: {
    flex: 1,
    // borderWidth:1,
    // borderColor:"white",
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  historyContent: {
    flex: 8,
    // borderWidth:1,
    //  borderColor:"white"
  },
  historyCloseButton: {
    flex: 1,
    // borderWidth:1,
    //  borderColor:"white"
  },
  closeText: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    height: '100%',
    textAlignVertical: 'center',
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  headerText: {
    fontSize: 28,
    color: 'black',
    paddingLeft: 10,
    paddingTop: 3,
    textAlignVertical: 'center',
  },
  clearText: {
    fontSize: 22,
    color: 'black',
    paddingRight: 10,
    paddingTop: 25,
    textAlignVertical: 'center',
  },
  historyView: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
  },
  historyExp: {
    fontSize: 25,
    color: 'black'
  },
});

export default History;

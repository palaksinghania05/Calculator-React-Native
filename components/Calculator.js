import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ToastAndroid,
  Animated,
} from 'react-native';

import Screen from './Screen';
import Buttons from './Buttons';
import History from './History';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: 'Calculator',
      result: '',
      actualExpression: '',
      history: [],
      isHistoryVisible: false,
      slideIn: new Animated.Value(0),
    };
  }

  //openHistory
  openHistory = () => {
    this.setState({
      isHistoryVisible: true,
    });
  };

  //closeHistory
  closeHistory = () => {
    this.setState({
      isHistoryVisible: false,
    });
  }

  addHistory = () => {
    const { expression, result, history } = this.state;

    if(this.state.expression && this.state.expression!='Calculator'){
    ToastAndroid.show('History Saved', ToastAndroid.SHORT);

    const expressionHistory = {
      expression: expression,
      result,
    };

    this.setState({
      history: [...history, expressionHistory],
    });

    this.setState({
      expression: 'Calculator',
      actualExpression: '',
      result: '',
    });
    }
  }

  deleteHistory = () => {
    ToastAndroid.show('History cleared successfully!', ToastAndroid.SHORT);
    this.setState({
      history: [],
    });
  }

   slideIn = () => {
    this.openHistory();
    Animated.timing(this.state.slideIn, {
      toValue: 1,
      duration: 500, 
    }).start();
  };

  slideOut = () => {
    Animated.timing(this.state.slideIn, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      this.closeHistory()
    });
  };

  getPressedButtonValue = (buttonPressed) => {
    const { expression, actualExpression, result } = this.state;
    let newExpression = `${
      expression === 'Calculator' ? '' : expression
    }${buttonPressed}`;
    this.setState({
      expression: newExpression,
    });
    this.setState({
      expression: newExpression,
    });

    //actual character
    let actualCharacter = buttonPressed;
    if (buttonPressed === '÷') actualCharacter = '/';
    else if (buttonPressed === '×') actualCharacter = '*';

    //actual expression
    let newActualExpression = `${actualExpression}${actualCharacter}`;
    this.setState({
      actualExpression: newActualExpression,
    });

    //evaluate result
    try {
      this.setState({
        result: eval(newActualExpression).toString(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  //clear on pressing AC
  clearAll = () => {
    this.setState({
      expression: '',
      actualExpression: '',
      result: '',
    });
  }

  //delete button functionality
  deleteLastCharacter = () => {
    const { expression, actualExpression } = this.state;
    const slicedExpression = expression.slice(0, expression.length - 1);
    const slicedActualExpression = actualExpression.slice(
      0,
      expression.length - 1
    );
    this.setState({
      expression: slicedExpression,
      actualExpression: slicedActualExpression,
    });

    if (slicedActualExpression === '')
      this.setState({
        result: '',
        expression: 'Calculator',
      });

    try {
      this.setState({
        result: eval(slicedActualExpression).toString(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    //destructured
    const { expression, result, isHistoryVisible, history, slideIn} = this.state;

    return (
      <View style={styles.calculatorComponent}>
        <StatusBar barStyle="light-content" backgroundColor="skyblue" />
        {isHistoryVisible ? 
          <View style={styles.history}>
            <History
              closeHistory={this.slideOut}
              history={history}
              deleteHistory={this.deleteHistory}
              slideIn={slideIn}
            />
          </View>
         : null
        }
        <Screen 
        expression={expression} 
        result={result} 
        />
        <Buttons
          getPressedButtonValue={this.getPressedButtonValue}
          clearAll={this.clearAll}
          deleteLastCharacter={this.deleteLastCharacter}
          openHistory={this.slideIn}
          addHistory={this.addHistory}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calculatorComponent: {
    flex: 1,
    // borderWidth: 1,
    //  borderColor: 'red',
  },
  history: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#00000061',
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
});

export default Calculator;

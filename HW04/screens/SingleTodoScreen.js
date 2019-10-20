import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SingleTodoScreen = props => {
  const { status, body, id } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Toggled {status} on task No.{id}
      </Text>
      <Text style={styles.bodyText}>{body}</Text>
    </View>
  );
};

SingleTodoScreen.navigationOptions = {
  title: 'SingleTodoScreen'
};

export default SingleTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center'
  },
  bodyText: {
    fontSize: 50,
    textAlign: 'center'
  }
});
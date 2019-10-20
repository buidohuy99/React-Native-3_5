import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function TodoItem (props) {
  const todoStateColor = props.todo.status === 'Done' ? 'green' : 'blue';
  const itemKey = props.id + 1;
  
  return (
    <TouchableOpacity
    key = {itemKey}
    style = {[styles.todoItem,{backgroundColor : todoStateColor}]}
    onPress = {() => props.onToggle(itemKey)}
    onLongPress = {() => props.onDeleteItem(itemKey)}>
      <Text style = {styles.todoText}>
          {itemKey} : {props.todo.body}  
      </Text>
    </TouchableOpacity>
  ); 
}; 

const styles = StyleSheet.create({
    todoItem: {
        margin: 5,
        padding: 10,
        width: '95%',
        minHeight: 20,
        color: 'white',
        borderRadius: 5,
        flexWrap: 'wrap'
    },
    todoText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
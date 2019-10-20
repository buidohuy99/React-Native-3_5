import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  Dimensions
} from 'react-native';
import {TodoItem} from '../components/TodoItem.js'

export default class AllScreen extends React.Component{
  constructor (){
    super();
    this.scrollView = null;
    this.state = {
      todoList: null,
      newTodoBody: null,
      isReady: false,
    };
  };

  retrieveData = () => {
    try{
      AsyncStorage.getItem("todoList").then((value)=>{
        let stateObj = {
          isReady: true,
          todoList: [],
        };
        if(value != null) {
          stateObj.todoList = JSON.parse(value);
        }
        this.setState(stateObj);
      });
    } catch (e){
      console.log(e);
    }
  };

  saveData = (newData) => {
    try{
      AsyncStorage.setItem("todoList", JSON.stringify(newData))
      .catch((err)=>{alert(err);});
    } catch (e){
      console.log(e);
    }
  };

  submitNewToDo = () => {
    if(this.state.newTodoBody !== null) {
      const newTodo = {
        body: this.state.newTodoBody,
        status: 'Active',
      };
      const newList = [...this.state.todoList,newTodo];
      this.state.newTodoBody = null;
      this.saveData(newList);
      this.setState({todoList: newList});
    }
  };

  onToggleTodoItem = (itemKey) => {
    const currentItem = this.state.todoList[itemKey - 1];
    currentItem.status = currentItem.status === "Done" ? "Active" : "Done";
    this.saveData(this.state.todoList);
    this.setState(this.state);
    setTimeout(() => {
      this.props.navigation.navigate('SingleTodo', {
        status: currentItem.status,
        body: currentItem.body,
        id: itemKey,
      });
    }, 500);
  }

  onDeleteTodoItem = (itemKey) => {
    Alert.alert(
      'Delete your todo?',
      `"${this.state.todoList[itemKey-1].body}"`,
      [
        {
          text: 'Cancel',
        },
        { text: 'OK', 
          onPress: () => {
            this.state.todoList.splice(itemKey-1,1);
            this.saveData(this.state.todoList);
            this.setState(this.state);
          } 
        }
      ],
      { cancelable: true }
    );
  }

  componentDidMount(){
    this.retrieveData();
  }

  render(){
    return (
      <ImageBackground style={styles.backgroundContainer}
      source = {require("../assets/images/background.jpg")}>
        <KeyboardAvoidingView
          behavior="padding" enabled>
          <ScrollView 
          ref = {ref => this.scrollView = ref}
          contentContainerStyle = {styles.scrollContainer}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
            this.scrollView.scrollToEnd({animated: true});
          }}>

            { this.state.isReady?
              <View style = {styles.todoItemsContainer}>
                {this.state.todoList.map( (todoItem, idx) => {
                    return <TodoItem
                    key = {idx} todo = {todoItem} id = {idx}
                    onToggle = {this.onToggleTodoItem}
                    onDeleteItem = {this.onDeleteTodoItem}/>;
                })}
              </View> 
              : null
            }

            
            { this.state.isReady?
              <View style={styles.inputContainer}>
                <TextInput
                  value={this.state.newTodoBody}
                  style={styles.todoInput}
                  placeholder="Type your new todo here to add"
                  onChangeText={text => this.setState({newTodoBody: text})}
                />
                <TouchableOpacity style={styles.button} onPress={this.submitNewToDo}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View> : null
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

AllScreen.navigationOptions = {
  title: "All Todos",
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    width: Math.round(Dimensions.get('window').width),
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: '10%',
  },
  todoItemsContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  todoInput: {
    width: '95%',
    minHeight: 50,
    padding: 10,
    color: 'black',
    borderWidth: 1,
    marginBottom: '5%',
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  inputContainer: {
      flexGrow: 1,
      width: '90%',
      marginTop: '10%',
      alignItems: 'center',
      justifyContent: 'flex-start',
  },
  button: {
      height: 50,
      width: '50%',
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: 'blue',
      justifyContent: 'center'
  },
  buttonText: {
      color: 'white',
      fontWeight: 'bold'
  }
});

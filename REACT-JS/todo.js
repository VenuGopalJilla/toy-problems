import {View, Text, Button, ScrollView, TextInput, StyleSheet} from 'react-native';
import { CheckBox } from 'react-native-elements';
import React from 'react';
import { Constants } from 'expo';

let id = 0;

const styles = StyleSheet.create({
    todoElement: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    appElement: {
        paddingTop: 50,

    },
    scrollElement: {
        paddingTop: 10,
    },

})


const Todo = props => (
    <View style = {styles.todoElement}>
        <CheckBox onPress = {props.onChecked} checked = {props.todo.checked}/>
        <Text>{props.todo.text}</Text>
        <Button onPress = {props.onDelete} title = "delete" />
    </View>
);

export default class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            inputTask: '',
            dueDate: '',
            todos: [],
        };
    }

    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(), 
    //         1000
    //     );
    // }
  
    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }
    toggleTask(id) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id !== id) {
                    return todo;
                }
                return {
                    id : todo.id,
                    text: todo.text,
                    checked: !todo.checked,
                }
                
            })
        });
    }

    removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }

    addTodo(text) {
        // var text = text;
        var text1 = text +  "  :  " + new Date().toLocaleTimeString();
        this.setState({
            todos : [...this.state.todos, 
                {id: id++, text: text1, checked: false}],
            inputTask: '',
            dueDate: '',
        })
    }

    render() {
        return (
        <View style = {styles.appElement}>
            <Text style = {{fontWeight: 'bold'}}>Todo Tasks</Text>
            <Text style = {{paddingTop: 10}}>Total Tasks : {this.state.todos.length}</Text>
            <Text>Unchecked Tasks count: {
                this.state.todos.filter(todo => !todo.checked).length
                }</Text>
            <ScrollView style = {styles.scrollElement}>
                {this.state.todos.map(
                    todo => <Todo
                    onChecked = {() => this.toggleTask(todo.id)}
                    onDelete = {() => this.removeTodo(todo.id)} todo = {todo}
                    />
                    )
                    }
            </ScrollView>
            {/* <h3 id = "tasks">First Task , {new Date().toLocaleTimeString()}</h3> */}
            <Text style = {{paddingTop: 50}}>Task to be done : </Text>
            <TextInput id = "inputTask" onChangeText = { (inputTask) => this.setState({inputTask}) } value = {this.state.inputTask}/>
            <Text> Due Date : </Text>
            <TextInput type = "date"  id = "dueDate"  onChangeText = { (dueDate) => this.setState({dueDate}) } value = {this.state.dueDate}/>
            <Button onPress = {() => this.addTodo(this.state.inputTask 
            + "  |--|  " + this.state.dueDate)} title = "Add Task" />
        </View>
        );
    }
}


// ReactDOM.render(
//     <TodoApp />,
//     document.getElementById('todo')
// );
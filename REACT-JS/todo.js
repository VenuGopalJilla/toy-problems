import {View, Text, Button, ScrollView, TextInput, StyleSheet} from 'react-native';
import { CheckBox } from 'react-native-elements';
import React from 'react';
import { Constants } from 'expo';
import DatePicker from 'react-native-datepicker'

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

        if (this.state.inputTask != '') {
            //Check for the Task
            if (this.state.date != '') {
              //Check for the due date
                alert('Success');
                var text1 = text +  "  :  " + new Date().toLocaleTimeString();
                this.setState({
                    todos : [...this.state.todos, 
                        {id: id++, text: text1, checked: false}],
                    inputTask: '',
                    date: '',
                });
            } else {
                alert('Please Enter the Due Date');
            }
        } else {
            alert('Please Enter the Task');
        }
        
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
            <Text style = {{paddingTop: 50}}>Task to be done </Text>
            <TextInput id = "inputTask" onChangeText = { (inputTask) => this.setState({inputTask}) } value = {this.state.inputTask} placeholder = "Enter the Task"/>
            <Text> Due Date </Text>


            <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2000-01-01"
                maxDate="2021-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                value = {this.state.date}
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
            />



            {/* <TextInput type = "date"  id = "dueDate"  onChangeText = { (dueDate) => this.setState({dueDate}) } value = {this.state.dueDate} placeholder = "Due date"/> */}
            <Button onPress = {() => this.addTodo(this.state.inputTask 
            + "  |--|  " + this.state.date)} title = "Add Task" />
        </View>
        );
    }
}


// ReactDOM.render(
//     <TodoApp />,
//     document.getElementById('todo')
// );
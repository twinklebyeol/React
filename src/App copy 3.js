
import './App.css';
import { Component } from "react";
import Title from './Title';
import Content from './Content';
import TodoList from './TodoList';
import TodoListItem from './TodoListItem';




export default class App extends Component {

  render() {
    return (
      <div>
        <h2>
          <Title text="TodoList" />
        </h2>
        <p className='ContentStyle'>
        <Content/></p>
      </div>
    );
  }
}



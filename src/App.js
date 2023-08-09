import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './component/TodoTempalte';
import TodoHead from './component/TodoHead';
import TodoList from './component/TodoList';
import TodoCreate from './component/TodoCreate';
import { TodoProvider } from './TodoContext';
// import Users from './Users';
import Address from './Address';
import RestaurantBookmarkApp from './RestaurantBookmarkApp'


const GlobalStyle = createGlobalStyle`

body{
  background : #e9ecef;
}`;



function App() {
  return( 
  
    <TodoProvider>
      <Address />
      <RestaurantBookmarkApp />
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>

  );

}


export default App;
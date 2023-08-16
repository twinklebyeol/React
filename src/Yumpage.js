import React from "react";
import { createGlobalStyle } from "styled-components";
import YumTemplate from "./component/YumTemplate";
import YumHead from "./component/YumHead";
import YumList from "./component/YumList";
import YumCreate from "./component/YumCreate";
import { TodoProvider } from "./TodoContext";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function Yumpage() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <YumTemplate>
        <YumHead />
        <YumList />
        <YumCreate />
      </YumTemplate>
    </TodoProvider>
  );
}

export default Yumpage;

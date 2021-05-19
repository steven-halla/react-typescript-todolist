import React, {FC} from 'react';
import './App.scss';
import {Header} from "./components/Header";
import {TodoContextProvider} from "./components/TodoContext";
import {TodoList} from "./components/TodoList";
import styled, {ThemeProvider} from "styled-components";
import {createMuiTheme} from "@material-ui/core";

const StyledApp = styled.div`
  &.app {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const App: FC = () => {
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TodoContextProvider>
                <StyledApp className="app">
                    <Header/>
                    <TodoList/>
                </StyledApp>
            </TodoContextProvider>
        </ThemeProvider>
    );
}

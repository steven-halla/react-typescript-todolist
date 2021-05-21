import React, {FC, useEffect, useState} from 'react';
import {Task} from "../model/Task";
import {loadTodoList, saveTodoList} from "../localstorage";

interface TodoContextState {
    todoList: Task[];
    setTodoList: (todoList: Task[]) => void;
}

export const TodoContext = React.createContext({} as TodoContextState);

export const TodoContextProvider: FC = (props) => {
    const [todoList, setTodoList] = useState<Task[]>([]);

    // when component loads, read todo list from local storage.
    useEffect(() => {
        setTodoList(loadTodoList());

    }, []);

    // a single place to handle saving todo list to local storage.
    // this is easier than remembering to do it in both Header.addTask() and TodoTask.completeTask()
    useEffect(() => {
        saveTodoList(todoList);

    }, [todoList]);

    return (
        <TodoContext.Provider
            value={{
                todoList, setTodoList,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};

import React, {FC, useContext} from 'react'
import {Task} from "../model/Task";
import styled from "styled-components";
import {TodoTask} from "./TodoTask";
import {TodoContext} from "./TodoContext";

const StyledTodoList = styled.div`
  &.todo-list {
    flex: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 15px;
    flex-direction: column;
  }
`;

export const TodoList: FC = (props) => {
    const { todoList, setTodoList } = useContext(TodoContext);

    const completeTask = (taskNameToDelete: string): void => {
        setTodoList(todoList.filter((task) => {
            return task.taskName !== taskNameToDelete
        }));
    };

    return (
        <StyledTodoList className="todo-list">
            {todoList.map((task: Task, key: number) => {
                return <TodoTask key={key} task={task} completeTask={completeTask}/>;
            })}
        </StyledTodoList>
    );
};

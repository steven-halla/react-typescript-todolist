import React, {FC, useState, ChangeEvent, useContext} from 'react';
import {Task} from '../model/Task'
import {TodoContext} from "./TodoContext";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Box, TextField} from "@material-ui/core";


const StyledHeader = styled.div`
  &.header {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: tomato;
    
    .input-container {
      display: flex;
      flex-flow: row nowrap;

      input {
        background-color: white;
        font-size: 17px;
        border: 1px solid grey;
      }

      .task-name-input {
        .MuiInputBase-root {
          height: 58px;
          background-color: white;
        }

        textarea {
        }
      }

      .deadline-input {
        input {
          max-width: 80px;
        }
      }
    }

    button {
      width: 70px;
      height: 59px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border: 1px solid grey;
    }

    .MuiSvgIcon-root {
      display: flex;
      justify-items: center;
      padding-left: 16px;
    }

  }
`;

const validateTask = (task: Task): boolean => {
    if (!task.taskName || task.taskName.trim().length === 0) {
        alert("Must provide task name.");
        return false;
    }

    // deadline not required, but validate if present.
    if (task.deadline != null && task.deadline < 0) {
        alert("Deadline must be greater than zero.");
        return false;
    }

    return true;
}

export const Header: FC = () => {
    const {todoList, setTodoList} = useContext(TodoContext);

    const [taskName, setTaskName] = useState<string>("");
    const [deadline, setDeadline] = useState<number | string>(""); // allow number | string because setting state for number input to undefined, does not clear the input.

    const onChangeTaskName = (event: ChangeEvent<HTMLInputElement>): void => {
        setTaskName(event.target.value);
    };

    const onChangeDeadline = (event: ChangeEvent<HTMLInputElement>): void => {
        const deadLine = Number(event.target.value);
        if (deadLine >= 0) {
            setDeadline(deadLine);
        } else {
            setDeadline("");
        }
    };

    const addTask = (): void => {
        const task: Task = {
            taskName: taskName,
            deadline: Number(deadline)
        }

        if (!validateTask(task)) {
            return;
        }

        // prepend task to todo list
        setTodoList([task].concat(todoList));

        setTaskName("");
        setDeadline("");
    };

    return (
        <StyledHeader className="header">
            <div className="input-container">
                <Box p="10px">
                    <label htmlFor="task">
                        <TextField
                            id="outlined-basic"
                            className="task-name-input"
                            multiline
                            name="task"
                            onChange={onChangeTaskName}
                            type="text"
                            placeholder="task"
                            value={taskName}
                            variant="outlined"
                        />
                    </label>
                </Box>

                <Box p="10px">
                    <label htmlFor="deadline">
                        <TextField
                            id="outlined-basic"
                            className="deadline-input"
                            name="deadline"
                            onChange={onChangeDeadline}
                            placeholder="days"
                            type="number"
                            value={deadline}
                            variant="outlined"
                        />
                    </label>
                </Box>

                <Box p="10px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addTask}
                        startIcon={<AddIcon style={{fontSize: '60px'}}/>}>
                    </Button>
                </Box>
            </div>
        </StyledHeader>
    );
}



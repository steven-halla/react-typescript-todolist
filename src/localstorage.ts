import {Task} from "./model/Task";

const SAVE_KEY = "todoList";

export const loadTodoList = (): Task[] => {
    const todoListJson = localStorage.getItem(SAVE_KEY);
    if (!todoListJson) {
        return [];
    }
    return JSON.parse(todoListJson) as Task[];
}

export const saveTodoList = (todoList: Task[]) => {
    return localStorage.setItem(SAVE_KEY, JSON.stringify(todoList));
}
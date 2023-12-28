import { createContext, useContext } from "react";


export const TodoContext = createContext(
    {
        todoList:
            [ /*{todo_1},{todo_2} */
                {
                    id: 1,
                    todoText: "Testing",
                    completed: false
                }
            ],
        addTodo: (todo) => { },
        editTodo: (id, todo) => { },
        deleteTodo: (id) => { },
        toggleComplete: (id) => { }
    }
);

export const useTodo = () => {
    return useContext(TodoContext)
};

export const TodoProvider = TodoContext.Provider


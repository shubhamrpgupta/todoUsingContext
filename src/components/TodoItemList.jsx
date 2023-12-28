import React, { useState } from 'react'
import { useTodo } from "../context/todoContext";

const TodoItemList = ({ singleTodo }) => {

    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(singleTodo.todoText)
    const { editTodo, deleteTodo, toggleComplete } = useTodo();

    const updateTodo = () => {
        editTodo(singleTodo.id, { ...singleTodo, todoText: todoMsg });
        setIsTodoEditable(false);
    }

    const toggleCompleteStatus = () => {
        toggleComplete(singleTodo.id);
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${singleTodo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={singleTodo.completed}
                onChange={toggleCompleteStatus}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${singleTodo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (singleTodo.completed) return;

                    if (isTodoEditable) {
                        updateTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={singleTodo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(singleTodo.id)}
            >
                ❌
            </button>
        </div>
    )
}

export default TodoItemList;
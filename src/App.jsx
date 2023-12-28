import { useEffect, useState } from "react"
import './App.css'
import { TodoProvider } from "./context/todoContext"
import NewTodoForm from "./components/NewTodoForm";
import TodoItemList from "./components/TodoItemList";

function App() {

  const [todoList, setTodoList] = useState([]);

  const addTodo = (todo) => {
    setTodoList((allTodosList) => {
      return [...allTodosList, { id: Date.now(), ...todo }]
    })
  }

  const editTodo = (id, todo) => {
    setTodoList((allTodosList) => {
      return allTodosList.map((singleTodo) => {
        return (singleTodo.id === id ? todo : singleTodo)
      })
    })
  };

  const deleteTodo = (id) => {
    setTodoList((allTodosList) => {
      return allTodosList.filter((singleTodo) => singleTodo.id !== id)
    })
  }

  const toggleComplete = (id) => {
    setTodoList((allTodosList) => allTodosList.map((singleTodo) => {
      if (singleTodo.id === id) {
        return { ...singleTodo, completed: !singleTodo.completed }
      } else return singleTodo;
    })
    )
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("storeTodo"))
    if (storedTodos && storedTodos.length > 0) {
      setTodoList(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("storeTodo", JSON.stringify(todoList))
  }, [todoList])

  return (
    <TodoProvider value={{ todoList, addTodo, deleteTodo, editTodo, toggleComplete }}>

      <div className="bg-[#28416a] min-h-screen py-8 ">
        <div className="w-full bg-[#172842] max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <NewTodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">

            {todoList.map((individualTodo) => (
              <div
                key={individualTodo.id}
                className="w-full"
              >
                <TodoItemList singleTodo={individualTodo} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </TodoProvider>
  )
}

export default App

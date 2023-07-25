import React, { useEffect, useState, useRef } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = "todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  //This useEffect will take effect once the component loads for the first time. 
  //As we are passing an empty array (line 21) into the useEffect and the component 
  //passes an empty array in the useState, (line 8), it will only be called once. This 
  //is because as the empty array on line 21 never changes, it will never recall this 
  //useEffect
  useEffect(() => {
      const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      console.log('refresh page call:', data);

      if (data) 
        setTodos(data);
      
      /*const storedTodos = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
      console.log('Load To Dos' + storedTodos);
      console.log(storedTodos.length);
      if (storedTodos) setTodos(storedTodos);*/
      }, []);

  //This useEffect will take effect each time a new todo is saved in the todos list
  //and will be saved to the local storage. 
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id)
  {
      const newTodos = [...todos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.completed = !todo.completed
      setTodos(newTodos)
  }
  
  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return
    setTodos(prevToDo => {
        return [...prevToDo, {id: uuidv4(), name: name, completed: false}]
      })
      todoNameRef.current.value = null
  }

  function handleClear() {
    const newToDos = todos.filter(todo => !todo.completed)
    setTodos(newToDos)
  }

  return (
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}> Add To The List </button>
      <button onClick={handleClear}> Clear Completed To Dos </button>
      <div>{todos.filter(todo => !todo.completed).length} Left To Do </div> 
    </>
  )
}

export default App;

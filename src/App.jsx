import React, { useEffect, useState } from 'react'
import './App.css'

export default function App() {

  // Load todos from localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
    


// Load theme from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme === "dark";
  });
  
  
  //  /todo Items 
  const [text, setText] = useState("");

  
  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
    

  // Save theme whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);


  const addTodo = () => {
    if (!text.trim()) return;

    const todo = {
      id: Date.now(),
      title: text,
      completed: false,
    };

    setTodos([...todos, todo]);
    setText("");
  };
    
    
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
    
    const toggleTodo = (id) => {
        setTodos(
        todos.map(todo =>
            todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
        );
    };

    const editTodo = (id) => {
        const newTitle = prompt("Edit Todo");

        if (!newTitle) return;

        setTodos(
        todos.map(todo =>
            todo.id === id
            ? { ...todo, title: newTitle }
            : todo
        )
        );
    };



  return (
    <div className= {darkMode ? 'app dark' : 'app'}>
      <div className="container">
        <h3 style={{textAlign:"center"}}>React Todo application</h3>
        <button
          className='theme-btn'
          onClick={()=>setDarkMode(!darkMode)} 
        >
              {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <div className="input-box">
          <input
            value={text}  
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter Your Items..'
        />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className="table">
            {todos.map(todo => (
                <div className="todo" key={todo.id}>
                    <span
                        className={todo.completed ? "completed" : ""}
                    >
                    {todo.title}
                    </span>
                    <div>

                    <button onClick={() => toggleTodo(todo.id)}>
                        ✔
                    </button>
                    <button onClick={() => editTodo(todo.id)}>
                        ✏
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>
                        ❌
                    </button>
                </div>
            </div>
            ))}      
        </div>
        <span className='totalItems'>
            {`Total Items Addedd: ${todos.length}`}      
        </span>
       </div>
    </div>
  )
}

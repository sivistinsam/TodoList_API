import './App.css';
import React,{ useState,useEffect } from 'react';

// Main function starts here
function App() {
  const [text, setText] = useState("");
  const [arr, setArr] = useState([]);
// Calling fetchData function in useEffect
  useEffect(() => {
    fetchTodo();
  }, []);
// Created function to fetch data from API
  const fetchTodo = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    setArr(data.slice(1, 10));
  };
  // Created function to Post data to API
  const postTodo = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: text,
        checked: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setArr((oldList) => [json, ...oldList])); // Place the new item at the beginning
    setText("");
  };
  // Created function to Update data to API (checkbox will be updated)
  const updateTodo = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((json) => console.log(json))
        .catch((error) => console.error("Error:", error));

      const newArr = arr.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      });
      setArr(newArr);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Created function to delete data from API

  const deleteTodo = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    const updatedArr = arr.filter((item) => item.id !== id);
    setArr(updatedArr);
  };
  return (
    //Main div starts from here
    <div className="App">
      {/* Main section starts from here */}
      <section className="main">
        {/* Heading starts from here */}
      <div className="heading">
        <h1>Todo List</h1>
      </div>
      {/* Input field and add button starts from here */}
      <div className="submain">
        <input
          id="input"
          value={text}
          placeholder="Enter your text here"
          onChange={(e) => setText(e.target.value)}
        />
        <button id="add" onClick={postTodo}>
          Add
        </button>
      </div>
      {/* Iterating all the array item starts from here */}
      <div className="task">
        {arr.map((item, index) => (
          <div
            className="item"
            key={`${item.id}_${index}`}
            style={item.checked ? { textDecoration: "line-through" } : null}
          >
            {/* Checkbox creation starts from here */}
            <div className="check-box">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => updateTodo(item.id)}
              />
              {item.title}
            </div>
            {/* Creating delete button for every todo list */}
            <div>
              <button id="cross" onClick={() => deleteTodo(item.id)}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
      
    </div>
  );
}

export default App;

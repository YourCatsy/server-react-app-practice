import React, { useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import AddTodoOption from "./ToDolist";

export default function SelectOptions({ ListFromModal }) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [todo, setTodo] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // Храним сумму

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    
    // Пересчет цены при изменении списка
    const newTotal = todos.reduce((sum, item) => sum + Number(item.text[1] || 0), 0);
    setTotalPrice(newTotal);

  }, [todos]); // Вызывается при изменении `todos`

  function handleAddInputChange(e) {
    setTodo(e.target.value);
  }

  function handleAddFormSubmit(e) {
    e.preventDefault();
    const [name, price] = todo.split(',');
    
    if (todo !== "") {
      setTodos([...todos, { id: new Date().getTime(), text: [name, price] }]);
      setTodo(""); // Очищаем ввод
    }
  }

  function handleDeleteClick(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
      <form onSubmit={ListFromModal}>
        <ToDoForm
          todo={todo}
          onAddInputChange={handleAddInputChange}
          onAddFormSubmit={handleAddFormSubmit}
        />
        <ul className='todo_list' id='total_price_ul'>
          {todos.map(todo => (
            <AddTodoOption key={todo.id} todo={todo} onDeleteClick={handleDeleteClick} />
          ))}
        </ul>
        <div className="total-price">
          <p className="total-price_click-text">Total Price: {totalPrice} </p>
        </div>
      </form>
    </div>
  );
}

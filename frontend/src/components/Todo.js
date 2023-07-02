import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, updateTodo, deleteTodo } from "../redux/actions";

const Todo = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo?.data);

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    setEditing((prevState) => !prevState);

    dispatch(updateTodo(todo._id, text));
  };

  return (
    <li className="task" data-testid="todo-test">
      <label
        style={{
          textDecoration: todo?.done ? "line-through" : "",
          color: todo?.done ? "#bdc3c7" : "#34495e",
        }}
      >
        <input
          className="checkbox"
          type="checkbox"
          checked={todo?.done}
          onChange={() => dispatch(toggleTodo(todo._id))}
        />
        <span>{todo?.data}</span>
      </label>

      <form
        style={{ display: editing ? "inline" : "none" }}
        onSubmit={onFormSubmit}
      >
        <input
          type="text"
          value={text}
          className="edit-todo"
          onChange={(e) => setText(e.target.value)}
        />
      </form>

      <button onClick={() => dispatch(deleteTodo(todo._id))}>
        <i className="fa-solid fa-trash" />
      </button>
      <button onClick={() => setEditing((prevState) => !prevState)}>
        <i className="fa-solid fa-pen" />
      </button>
    </li>
  );
};

export default Todo;

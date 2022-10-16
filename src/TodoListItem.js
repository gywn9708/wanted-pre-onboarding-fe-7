import React, { useState, useEffect, useRef } from "react";
import { BsFillPencilFill, BsFillTrashFill, BsCheckLg } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import "./css/todo.css";

const TodoListItem = ({
  todo,

  onUpdate,
  onRemove,
  onChecked,
  todoList,
  setTodoList,
}) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todo.todo);
  const [aa, setAa] = useState(todo.isCompleted);
  const editInputRef = useRef(null);

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  const onClickSubmitButton = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      text: item.id === todo.id ? newText : item.text,
    }));

    console.log("nextTodoList:", nextTodoList);
    setTodoList(nextTodoList);

    setEdited(false);
    onUpdate(newText, todo.id, todo.isCompleted);
  };

  useEffect(() => {
    console.log("todoList:", todoList);
    console.log(todo.todo);
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  return (
    <Container>
      <ul className="TodoListItem">
        <input
          className="checkboxInput"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => {
            onChecked(todo.todo, todo.id, todo.isCompleted);
          }}
        />

        {edited ? (
          <input
            className="editInput"
            type="text"
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
          />
        ) : (
          <span
            className={`todoapp__item-ctx ${
              todo.isCompleted ? "todoapp__item-ctx-checked" : ""
            }`}
          >
            {todo.todo}
          </span>
        )}

        {!todo.isCompleted ? (
          edited ? (
            <button
              type="button"
              className="update"
              onClick={onClickSubmitButton}
            >
              <BsCheckLg />
            </button>
          ) : (
            <button
              type="button"
              className="update"
              onClick={onClickEditButton}
            >
              <BsFillPencilFill />
            </button>
          )
        ) : null}

        <button className="remove" onClick={() => onRemove(todo.id)}>
          <BsFillTrashFill />
        </button>
      </ul>
    </Container>
  );
};

export default TodoListItem;

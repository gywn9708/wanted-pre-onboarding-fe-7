import React from "react";
import TodoListItem from "./TodoListItem";
import Container from "react-bootstrap/Container";

const TodoList = ({
  todos,
  onUpdate,
  onRemove,
  onChecked,
  todoList,
  setTodoList,
}) => {
  return (
    <Container>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onChecked={onChecked}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ))}
    </Container>
  );
};

export default TodoList;

import React from "react";
import TodoListItem from "./TodoListItem";
import Container from "react-bootstrap/Container";

const TodoList = ({
  todos,
  updateTodo,
  deleteTodo,
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
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          onChecked={onChecked}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ))}
    </Container>
  );
};

export default TodoList;

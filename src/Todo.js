import React, { useRef } from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import Container from "react-bootstrap/Container";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [id, setId] = useState("");

  const nextId = useRef(0);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });

  const getTodos = () => {
    axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((result) => {
        if (result.status === 200) {
          // console.log("getTodos", result);
          setTodoList(result.data);
          setTodos(result.data);
        } else {
          alert("잘못된 요청입니다.");
        }
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const createTodo = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        todo: text,
        isCompleted: false,
      };
      fetch("https://pre-onboarding-selection-task.shop/todos", {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
        mode: "cors",
      })
        .then((response) => {
          if (response.status === 201) {
            // console.log("createTodo", response);
            getTodos();
          } else {
            alert("잘못된 요청입니다.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [todos, id]
  );

  const updateTodo = useCallback((text, id, isCompleted) => {
    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: text, isCompleted: isCompleted }),
    })
      .then((response) => {
        if (response.status === 200) {
          // console.log("isCompleted", isCompleted);
          getTodos();
        } else {
          alert("잘못된 요청입니다.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const deleteTodo = useCallback((id) => {
    axios({
      method: "delete",
      url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.status === 204) {
        // console.log("deleteTodo", response);
        getTodos();
      } else {
        alert("잘못된 요청입니다.");
      }
    });
  });

  const onChecked = (text, id, isCompleted) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      })
    );
    updateTodo(text, id, !isCompleted);
  };

  return (
    <Container>
      <TodoTemplate>
        <TodoInsert
          createTodo={createTodo}
          todoList={todoList}
          setTodoList={setTodoList}
        />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          onChecked={onChecked}
        />
      </TodoTemplate>
    </Container>
  );
};

export default Todo;

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

  const getTodo = () => {
    axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((result) => {
        console.log("result:", result);
        setTodoList(result.data);
        setTodos(result.data);
      });
  };

  useEffect(() => {
    getTodo();
  }, []);

  const onInsert = useCallback(
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
          getTodo();
        })
        .then((result) => {
          console.log(result);
          // console.log(todos);
          // setTodos(result);
          // setId(id + 1);
          // setTodos(todos.concat(todos));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [todos, id]
  );

  const onUpdate = useCallback((text, id, isCompleted) => {
    console.log(id);

    fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: text, isCompleted: isCompleted }),
    })
      .then((response) => {
        console.log("is", isCompleted);
        // setTodos(response);
        getTodo();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const onRemove = useCallback((id) => {
    axios({
      method: "delete",
      url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      getTodo();
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

    onUpdate(text, id, !isCompleted);
  };
  // const onChecked = useCallback(
  //   (id) => {
  //     const todo = todos
  //       .filter((t) => t.id === id)
  //       .map((t) => ({ ...t, checked: !t.checked }));

  //     console.log(todo[0]);

  //     axios({
  //       method: "put",
  //       url: `https://pre-onboarding-selection-task.shop/todos/${id}`,
  //       data: todo[0],
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //         "Content-Type": "application/json",
  //       },
  //     }).then((response) => {
  //       getTodo();
  //     });
  //   },
  //   [todos]
  // );

  return (
    <Container>
      <TodoTemplate>
        <TodoInsert
          onInsert={onInsert}
          todoList={todoList}
          setTodoList={setTodoList}
        />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          todos={todos}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onChecked={onChecked}
        />
      </TodoTemplate>
    </Container>
  );
};

export default Todo;

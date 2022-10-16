import React from "react";
import "./css/todo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

const TodoTemplate = ({ children }) => {
  return (
    <Container className="todoTemplate">
      <h2 className="title">TODO LIST</h2>
      <div className="content">{children}</div>
    </Container>
  );
};

export default TodoTemplate;

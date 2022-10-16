import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const TodoInsert = ({ onInsert, todoList, setTodoList }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue("");

      const nextTodoList = todoList.concat({
        id: todoList.length,
        todo: value,
        isCompleted: false,
      });
      setTodoList(nextTodoList);
      //서브밋되면 화면이 새로고침되기 때문에 새로고침 방지
      e.preventDefault();
      console.log(nextTodoList);
    },
    [onInsert, value]
  );

  // useEffect(() => {
  //   ref.current.focus();
  // }, []);

  return (
    <Container>
      <Form className="TodoInsert" onSubmit={handleSubmit}>
        <Form.Control
          style={{ width: "400px" }}
          type="text"
          placeholder="할 일을 입력하세요."
          value={value}
          onChange={onChange}
        />
        <Button className="insertBtn" variant="primary" type="submit">
          <MdAdd />
        </Button>
      </Form>
    </Container>
  );
};

export default TodoInsert;

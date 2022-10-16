import React, { useState } from "react";
import "./css/user.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCallback } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.access_token);
          window.location.href = "/todo";
        }
      });
  };

  return (
    <Container className="userContainer">
      <Row>
        <form>
          <Col sm={12}>
            <h3>로그인</h3>
          </Col>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control type="email" onChange={onChangeEmail} />
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control type="password" onChange={onChangePassword} />
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            <Button
              style={{ width: "400px" }}
              type="submit"
              variant="primary"
              onClick={onHandleSubmit}
            >
              로그인
            </Button>
          </Col>
          <Col sm={12}>
            <a style={{ fontSize: "0.75rem", float: "right" }} href="/join">
              계정이 없으시면 여기서 회원가입하세요.
            </a>
          </Col>
        </form>
      </Row>
    </Container>
  );
};

export default Login;

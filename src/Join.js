import React, { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./css/user.css";
import { useState } from "react";

const Join = () => {
  // 이메일, 비밀번호
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 오류메시지 상태 저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);

    if (!e.target.value.includes("@")) {
      setEmailMessage("이메일 형식이 틀렸어요!");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요!");
      setIsEmail(true);
    }
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);

    if (e.target.value.length < 8) {
      setPasswordMessage("비밀번호는 최소 8자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요!");
      setIsPassword(true);
    }
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    fetch("https://pre-onboarding-selection-task.shop/auth/signup", {
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
      .then(() => {
        window.location.href = "/";
      });
  };

  return (
    <Container className="userContainer">
      <Row>
        <form>
          <Col sm={12}>
            <h3>회원가입</h3>
          </Col>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control type="email" onChange={onChangeEmail} />
              {email.length > 0 && <span>{emailMessage}</span>}
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control type="password" onChange={onChangePassword} />
              {password.length > 0 && <span>{passwordMessage}</span>}
            </FloatingLabel>
          </Col>
          <Col sm={12}>
            <Button
              style={{ width: "400px" }}
              type="submit"
              variant="primary"
              disabled={!(isEmail && isPassword)}
              onClick={onHandleSubmit}
            >
              회원가입
            </Button>
          </Col>
          <Col sm={12}>
            <a style={{ fontSize: "0.75rem", float: "right" }} href="/">
              이미 계정이 있습니까? 로그인하세요.
            </a>
          </Col>
        </form>
      </Row>
    </Container>
  );
};

export default Join;

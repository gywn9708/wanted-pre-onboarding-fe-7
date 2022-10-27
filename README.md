# 원티드 프리온보딩 프론트엔드 - 선발 과제

## 프로젝트 실행 방법
```
npm install
npm start
```

## 배포 링크(데모영상 대체)
https://todolist-wanted.netlify.app/

## 폴더구조
```
📦 src
├── 📂 pages
│   ├──📂 auth 
│   │   ├── 📜 Join.js
|   |   └── 📜 Login.js   
│   │
│   └── 📂 todo
│        └──📜 Todo.js
│
├── 📂 components
|    ├── 📜 TodoInsert.js
|    ├── 📜 TodoList.js
|    ├── 📜 TodoListItem.js
|    └── 📜 TodoTemplate.js
|
├── 📂 css
|    ├── 📜 todo.css
|    └── 📜 user.css
|
├── 📜 App.js
└── 📜 index.js
     
```

## 구현사항
</br>


# 로그인/회원가입

● 이메일, 비밀번호 유효성 검사
```
// Join.js

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
```
</br>


● 아이디, 비밀번호 회원가입 조건 충족시 회원가입 버튼 활성화
```
// Join.js

<Button
     style={{ width: "400px" }}
     type="submit"
     variant="primary"
     disabled={!(isEmail && isPassword)}
     onClick={onHandleSubmit}
>
     회원가입
</Button>
```
</br>


● 회원가입시 아이디, 비밀번호 확인 및 토근 발급 후 로그인 페이지롱 이동
```
// Join.js

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
```


[JSX]
```
<Button
    style={{ width: "400px" }}
    type="submit"
    variant="primary"
    disabled={!(isEmail && isPassword)}
    onClick={onHandleSubmit}
>
    회원가입
</Button>
```
</br>


● 로그인시 아이디, 비밀번호 확인 및 토근 발급
```
//Login.js

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
        } else {
          alert("아이디 또는 비밀번호를 확인해주세요.");
        }
      });
  };
```


[JSX]
```
<Button
    style={{ width: "400px" }}
    type="submit"
    variant="primary"
    onClick={onHandleSubmit}
>
    로그인
</Button>
```

# 투두 리스트
 ● 투두 리스트 CRUD
 ```
 //Todo.js
 
 const getTodos = () => {
    axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((result) => {
        if (result.status === 200) {
          setTodoList(result.data);
          setTodos(result.data);
        } else {
          alert("잘못된 요청입니다.");
        }
      });
  };
  
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
        getTodos();
      } else {
        alert("잘못된 요청입니다.");
      }
    });
  });
 ```
 </br>
 
 
 ● 투두 항목(할일) 추가 컴포넌트
 ```
 //TodoInsert.js
 
   const handleSubmit = useCallback(
    (e) => {
      createTodo(value);
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
    [createTodo, value]
  );
```  
</br>

 ● 투두 리스트 컴포넌트
 ```
 //TodoList.js
 
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
 ```
 </br>
 
 
 ● 투두 항목 셋팅 컴포넌트
```
//TodoListItem.js

const TodoListItem = ({
  todo,
  updateTodo,
  deleteTodo,
  onChecked,
  todoList,
  setTodoList,
}) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todo.todo);

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
    updateTodo(newText, todo.id, todo.isCompleted);
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

        <button className="remove" onClick={() => deleteTodo(todo.id)}>
          <BsFillTrashFill />
        </button>
      </ul>
    </Container>
  );
};
```
 



 
 











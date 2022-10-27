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
  






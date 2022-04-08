import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo.js";
import {
  Paper,
  List,
  Container,
} from "@material-ui/core";
import { call } from "../service/ApiService";

const Todo = () => {
  const [state, setState] = useState({
    items: [],
    /* 1. 로딩중이라는 상태이다. 생성자에 상태 변수를 추가한다. */
    loading: true,
  });

  // componentDidMount 대신 userEffect 사용
  useEffect(() => {
    /* 2. userEffect에서 todo리스트를 가져오는 
    GET 리퀘스트가 성공적으로 리턴하는 경우 loading을 false로 고친다. 
    더 이상 로딩중이 아니라는 뜻이다. */
    call("/todo", "GET", null).then((response) =>
      setState({ items: response.data, loading: false })
    );
  }, []);

  const add = (item) => {
    call("/todo", "POST", item).then((response) =>
      setState({ items: response.data })
    );
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      setState({ items: response.data })
    );
  };

  const update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      setState({ items: response.data })
    );
  };

  var todoItems = state.items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {state.items.map((item, idx) => (
          <TodoItem
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            update={update}
          />
        ))}
      </List>
    </Paper>
  );

  /* 로딩중이 아닐 때 렌더링 할 부분 */
  var todoListPage = (
    <div>
      <Container maxWidth="md">
        <AddTodo add={add} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  /* 로딩중일 때 렌더링 할 부분 */
  var loadingPage = <h1> 로딩중.. </h1>;

  var content = loadingPage;

  if (!state.loading) {
    /* 로딩중이 아니면 todoListPage를 선택*/
    content = todoListPage;
  }

  /* 선택한 content 렌더링 */
  return <div className="Todo">{content}</div>;
};

export default Todo;
import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useEffect, useState } from "react";
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      try {
        setTodoList(JSON.parse(storagedTodoList));
      } catch (error) {
        console.error("Failed to parse the todo list from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
    }
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddButtonClick = useCallback((e) => {
    //Them text input vao danh sach TodoList
    setTodoList([
      { id: v4(), name: textInput, isCompleted: false },
      ...todoList, 
    ]);
      setTextInput(""); 
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield name="Add-Todo" placeholder="Thêm việc cần làm..." elemAfterInput={
        <Button 
        isDisabled={!textInput} 
        appearance="primary" 
        onClick={onAddButtonClick}
        >
          Thêm
        </Button>
      }
      css={{ padding: "2px 4px 2px" }}
      value={textInput}
      onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;


import { useState, useEffect, useCallback } from "react";
import { Form } from "../../Form";
import { TodoListView } from "../../TodoListView";
import { Buttons } from "../../Buttons";
import { PaginationData, createTodoApi} from "../../shared/gettodos";

export function CommonParent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [buttonState, setButtonState] = useState<
    "complete" | "uncomplete" | "all"
  >("all");
  const [buttonCounter, setButtonCounter] = useState(true);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    todos: [],
    has_next: false,
    has_prev: false,
    current_page: 1,
    total_pages: 0,
    total_items: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = "http://localhost:8000/api/todos";
 
  let api = createTodoApi(BASE_URL);

  const fetchTodos = useCallback(
   async (page: number = 1, filter: string = "all") => {
      try {
        const response = await api.fetchTodos(page, filter);
        const data = await response.data;
        setPaginationData(data);
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
  }, [])//без колбека лог летит бесконечно, почему? 
  useEffect(() => {
    fetchTodos(currentPage, buttonState);
  }, [currentPage, buttonState, fetchTodos]);

  // useLayoutEffect(()=>{
  //     setTodos(JSON.parse(localStorage.getItem("todo") ?? '[]'))
  // },[])

  const changeToDoStatus = async (id: string, isDone: boolean) => {
    try {
      await api.updateStatus(id, isDone)
      fetchTodos(currentPage, buttonState);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteToDo = async (id: string) => {
    try {
      await api.deleteTodo(id);
      fetchTodos(currentPage, buttonState);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const onSubmit = async (str: string) => {
    try {
      await api.createTodo(str);
      setCurrentPage(1);
      fetchTodos(1, buttonState);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const completeAllTasks = async () => {
    try {
      if (buttonCounter) {
        await api.completeAll();
      } else {
        await api.uncompleteAll();
      }
      setButtonCounter(!buttonCounter);
      fetchTodos(currentPage, buttonState);
    } catch (error) {
      console.error("Error completing all tasks:", error);
    }
  };

  const deleteAllToDo = async () => {
    try {
      await api.deleteAll();
      setTodos([]);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  };

  const showCompleteToDo = () => {
    setButtonState("complete");
    setCurrentPage(1);
  };

  const showUncompleteToDo = () => {
    setButtonState("uncomplete");
    setCurrentPage(1);
  };

  const showAll = () => {
    setButtonState("all");
    setCurrentPage(1);
  };

  const editToDo = async (id: string, name: string) => {
    try {
      await api.editTodo(id, name);
      fetchTodos(currentPage, buttonState);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Form addTodo={onSubmit} />
      <Buttons
        completeAllToDo={completeAllTasks}
        deleteAll={deleteAllToDo}
        showCmp={showCompleteToDo}
        showUncmp={showUncompleteToDo}
        showAll={showAll}
      />
      <TodoListView
        todos={todos}
        buttonFilter={buttonState}
        completeTodo={changeToDoStatus}
        deleteToDo={deleteToDo}
        editToDo={editToDo}
        paginationData={paginationData}
        onPageChange={handlePageChange}
      />
    </>
  );
}

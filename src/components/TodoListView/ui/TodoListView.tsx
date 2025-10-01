import React, { ChangeEvent, useState,} from "react";
import { Paginator } from "../../Paginator";


// отметить все, перейти к отмеченным, отметить все, все ломается

interface ListViewProps {
  todos: Todo[];
  buttonFilter: "complete" | "uncomplete" | "all";
  completeTodo(id: string, isDone: boolean): void;
  deleteToDo(id: string): void;
  editToDo(id: string, input: string): void;
  paginationData: {
    has_next: boolean;
    has_prev: boolean;
    current_page: number;
    total_pages: number;
    total_items: number;
  };
  onPageChange: (page: number) => void;
}


export function TodoListView({
  todos,
  buttonFilter,
  completeTodo,
  deleteToDo,
  editToDo,
  paginationData,
  onPageChange
}: ListViewProps) {

  
 
  const [edit, setEdit] = useState("");
  const [input, setInput] = useState("");
 

  const toggleToDo = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    completeTodo(id, event.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };


  const handleNextPageClick = () => {
    if (paginationData.has_next) {
      onPageChange(paginationData.current_page + 1);
    }
  };

  const handlePrevPageClick = () => {
    if (paginationData.has_prev) {
      onPageChange(paginationData.current_page - 1);
    }
  };


  if (todos.length === 0) {
    return <h1>Список пуст</h1>;
  }


  return (
    <>
      {todos.map((todo) => (
        <div onDoubleClick={() => setEdit(todo.id)} key={todo.id}>
          {edit === todo.id && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editToDo(todo.id, input);
                setEdit("");
              }}
            >
              <input
                ref={(ref) => ref?.focus()}
                type="text"
                onChange={handleChange}
                onBlur={() => {
                  setEdit("");
                }}
              ></input>
            </form>
          )}
          <input
            type="checkbox"
            checked={todo.status}
            onChange={(event) => toggleToDo(todo.id, event)}
          />
          <button onClick={() => deleteToDo(todo.id)}>X</button>
          {todo.status ? <s>{todo.title}</s> : todo.title}
        </div>
      ))}

      {todos.length > 0 && (
        <Paginator
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: !paginationData.has_prev,
            right: !paginationData.has_next,
          }}
          nav={{
            current: paginationData.current_page,
            total: paginationData.total_pages,
          }}
        />
      )}
    </>
  )
}

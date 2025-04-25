import React, { ChangeEvent, useState, useCallback } from "react";
import { Paginator } from '../../Paginator'

interface ListViewProps{
    aaaa: Todo[];
    buttonFilter: "complete" | "uncomplete" | "all";
    completeTodo(id:string, isDone: boolean): void;
    deleteToDo(id:string): void;
    editToDo(id:string, input:string): void;
}


export function TodoListView ({aaaa, buttonFilter, completeTodo, deleteToDo, editToDo}:ListViewProps) {
    
    const TODO_PER_PAGE = 5;

    const getTotalPageCount = (rowCount: number): number => Math.ceil(rowCount / TODO_PER_PAGE);


    const [edit, setEdit] = useState("")
    const [input, setInput] = useState("")
    const [page, setPage] = useState(1)

    const toggleToDo = (id:string, event:ChangeEvent<HTMLInputElement>)=>{
        completeTodo(id, event.target.checked)
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInput(e.target.value)
    }

    if (aaaa.length === 0) {
        return <h1>Список пуст</h1>
    }

    const paginatedTodos = aaaa.slice(
        (page - 1) * TODO_PER_PAGE,
        page * TODO_PER_PAGE
      );

    const handleNextPageClick = useCallback(() => {
        const current = page;
        const next = current + 1;
        const total = aaaa ? getTotalPageCount(aaaa.length) : current;
    
        setPage(next <= total ? next : current);
      }, [page, aaaa]);
    
      const handlePrevPageClick = useCallback(() => {
        const current = page;
        const prev = current - 1;
    
        setPage(prev > 0 ? prev : current);
      }, [page]);

    return (
        <>
        {aaaa && paginatedTodos.filter((item) => {
            if (buttonFilter === "complete") 
                return item.isDone === true
            else if (buttonFilter === "uncomplete")
                return item.isDone === false 
            else return aaaa
        }).map((todo)=> (
            <div onDoubleClick={()=>setEdit(todo.id) } key={todo.id}>
                {edit===todo.id && <form onSubmit={(e)=>{
                    e.preventDefault();
                    editToDo(todo.id, input);
                    setEdit("");
                }}><input type="text" onChange={handleChange}></input></form> }
                <input type="checkbox" checked={todo.isDone} onChange={(event) => toggleToDo(todo.id, event)} />
                <button onClick={()=> deleteToDo(todo.id)}>X</button>
                {todo.isDone ? <s>{todo.name}</s>
                : todo.name}                
                </div>
        ))}

        {aaaa.length > 0 && (<Paginator onNextPageClick={handleNextPageClick} onPrevPageClick={handlePrevPageClick} 
        disable={{
            left: page === 1,
            right: page === getTotalPageCount(aaaa.length),
          }}
        nav={{ current: page, total: getTotalPageCount(aaaa.length) }}  />)}
        </>
    )
}
import { useState, useEffect, useLayoutEffect, useRef} from "react"
import {Form} from '../../Form'
import { TodoListView } from "../../TodoListView";  
import { Buttons } from "../../Buttons";

const getInitTodos = () => {
    const todos = localStorage.getItem("todo");
    if (!todos) return [];
    return JSON.parse(todos);
}

export function CommonParent () {
    const [todos, setTodos] = useState<Todo[]>(getInitTodos);
    const [buttonState, setButtonState] = useState<"complete" | "uncomplete" | "all">("all")

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todos))
    }, [todos])

    // useLayoutEffect(()=>{
    //     setTodos(JSON.parse(localStorage.getItem("todo") ?? '[]'))
    // },[])

    const changeToDoStatus = (id:string, isDone: boolean) => {
        setTodos(todos.map((todo)=> {
            if (todo.id === id) {
                todo.isDone = isDone
            } return todo
        }))
    };

    const deleteToDo = (id:string) => {  
        setTodos(todos.filter((todo)=> todo.id!==id))
    }

    const onSubmit = (str: string) => {
        setTodos([...todos, {name:str, isDone:false, id: crypto.randomUUID()}])
    }
      
    const completeAllTasks = () => {
        setTodos(todos.map((todo)=> {   
            todo.isDone = true;
            console.log(todo)
            return todo
        }
        ))
    }

    const deleteAllToDo = () => {
        setTodos([])
    }

    const showCompleteToDo = () => {
        setButtonState("complete")
    }

    const showUncompleteToDo = () => {
        setButtonState("uncomplete")
    }

    const showAll = () => {
        setButtonState("all")
    }

    const editToDo = (id:string, name:string) => {
        setTodos(todos.map((todo)=> {
            if (todo.id === id) {
               if (name !== "") {todo.name = name} 
               else return todo
            } return todo
        }))
    }

    return (
        <>
        <Form bbb={onSubmit} />
        <Buttons  completeAllToDo={completeAllTasks} deleteAll={deleteAllToDo} showCmp={showCompleteToDo} showUncmp={showUncompleteToDo} showAll={showAll} />
        <TodoListView aaaa={todos} buttonFilter={buttonState} completeTodo={changeToDoStatus} deleteToDo={deleteToDo} editToDo={editToDo}/>
        </>
    )
}
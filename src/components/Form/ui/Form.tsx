import React, { FormEvent, useState } from "react";

interface FormProps {
  addTodo: (userInput: string) => void;
}

export function Form({ addTodo }: FormProps) {
  const [userInput, setUserInput] = useState("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput === "") {
      return;
    }
    addTodo(userInput);
    setUserInput("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="form">
        <input
          value={userInput}
          onChange={handleChange}
          name="input"
          type="text"
          placeholder="Что надо сделать?"
          className="form"
        />
        <button className="addTaskButton">Добавить</button>
      </form>
    </>
  );
}

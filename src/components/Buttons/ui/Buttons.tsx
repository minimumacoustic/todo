interface ButtonsProps {
  completeAllToDo(): void;
  deleteAll(): void;
  showCmp(): void;
  showUncmp(): void;
  showAll(): void;
}

export function Buttons({
  completeAllToDo,
  deleteAll,
  showCmp,
  showUncmp,
  showAll,
}: ButtonsProps) {
  return (
    <div id="buttons">
      <button onClick={() => completeAllToDo()}>Отметить все</button>
      <button onClick={() => deleteAll()}>Удалить все</button>
      <button onClick={() => showCmp()}>Перейти к отмеченным</button>
      <button onClick={() => showUncmp()}>Перейти к неотмеченным</button>
      <button onClick={() => showAll()}>Убрать фильтры</button>
    </div>
  );
}

import * as React from "react";

import { ITodo } from "..";

interface ITodoListProps {
  items: ITodo[];
}

const TodoList: React.FunctionComponent<ITodoListProps> = ({ items = [] }) => {
  if (!items.length) {
    return <>No todo item!</>;
  }

  return (
    <>
      {items.map((todo) => (
        <div
          className="todo-item"
          key={todo.id}
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          {todo.title}
          <h4
            style={{
              backgroundColor: todo.completed ? "lightgreen" : "salmon",
              fontWeight: 500,
              padding: 2,
            }}
          >
            {todo.completed ? "done" : `undone`}
          </h4>
        </div>
      ))}
    </>
  );
};

export default TodoList;

import * as React from "react"

import { ITodo } from ".."

interface ITodoListProps {
  items: ITodo[]
}

const TodoList: React.FunctionComponent<ITodoListProps> = ({ items = [] }) => {
  if (!items.length) {
    return <>No todo item!</>
  }

  return (
    <>
      {items.map((todo) => (
        <div className="todo-item" key={todo.id}>
          {todo.title}
        </div>
      ))}
    </>
  )
}

export default TodoList

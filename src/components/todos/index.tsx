import * as React from "react"

import TodoList from "./list"

export interface ITodo {
  completed: boolean
  id: number
  title: string
  userId?: number
  userName?: string
}

interface ITodosListProps {}

const PERSONS = ["Mahdi", "Mamz", "Mohamamdreza"]

const TodosList: React.FunctionComponent<ITodosListProps> = (props) => {
  //State for storing todos
  const [todos, setTodos] = React.useState<ITodo[]>([])

  //Method for fetching
  const fetchData = async () => {
    let data
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos")
      data = await response.json()
      setTodos(data)
    } catch (e) {
      console.error(e)
    }
    return data
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  //Target items
  const targetItems = todos
    .filter((_, index) => index < 10)
    .map((todo) => {
      const userName = PERSONS[Math.floor(Math.random() * 3)]
      return {
        id: todo.id,
        title: `${todo.title} Assigned to ${userName}`,
        completed: todo.completed,
        userName
      }
    })
    .map((todo) => ({
      ...todo
    }))

  //Find less person tasks
  const findPersonWithSmallestWork = React.useCallback(() => {
    let smallestPersonTask: any = {}
    for (let person of PERSONS) {
      const personTasks = targetItems.filter((item) => item.userName === person)
      smallestPersonTask[person] = personTasks.length
    }

    const findSmallestTask = Math.min(
      ...Object.values(smallestPersonTask).map((item) => item as number)
    )

    for (let person of PERSONS) {
      if (smallestPersonTask[person] === findSmallestTask) {
        return person
      }
    }
    return null
  }, [targetItems])

  const luckiestPerson = findPersonWithSmallestWork()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div className="todo-list">
        <h2>Todo List</h2>
        <TodoList items={targetItems} />
      </div>
      <div className="todo-status">
        <h2>Todo Status</h2>
        <div>
          <div>Items: {targetItems.length}</div>
        </div>
        <div
          className="persons"
          style={{
            display: "flex",
            gap: 8,
            flexDirection: "column",
            marginTop: 8
          }}
        >
          {PERSONS.map((person) => {
            //Total person task
            const totalPersonTask = targetItems.filter(
              (item) => item.userName === person
            )

            return (
              <div key={person.toLocaleLowerCase()} className="person">
                {`${person} - ${totalPersonTask.length}`}
                {luckiestPerson === person ? (
                  <span style={{ background: "yellow", marginLeft: 8 }}>
                    Luckiest
                  </span>
                ) : null}
                <div className="task-list">
                  <TodoList items={totalPersonTask} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TodosList

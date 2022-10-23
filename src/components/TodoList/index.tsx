import { ChangeEventHandler, useCallback } from 'react'


interface TodoItem {
  text: string
  completed: boolean
}

interface TodoListCheckboxProps {
  checked: boolean
  onCheck: (value: boolean) => void
}

interface TodoListProps {
  items: TodoItem[]
}

const TodoListCheckbox: React.FunctionComponent<TodoListCheckboxProps> = function(props) {
  const { checked, onCheck } = props
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheck(e.target.checked)}
    />
  )
}

const TodoList: React.FunctionComponent<TodoListProps> = function(props) {
  const { items } = props
  return (
    <div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.text}>
              <TodoListCheckbox
                onCheck={(checked) => console.log(checked)}
                checked={item.completed}
              />
              {item.text}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { TodoList }
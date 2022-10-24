import { useAppDispatch, useAppSelector } from '../../hooks'
import { completeTodo, uncompleteTodo } from '../../redux/slices/TodosSlice'

interface TodoListCheckboxProps {
  checked: boolean
  onCheck: (value: boolean) => void
}

interface TodoListProps {
  title: string
  listId: string
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
  const { title, listId } = props
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.todos.todos.filter((t) => t.listId === listId))
  return (
    <div>
      <span>{title}</span>
      {items.length > 0 &&
        <ul>
          {items.map((item) => {
            return (
              <li key={item.text}>
                <TodoListCheckbox
                  onCheck={(checked) => {
                    if(checked) {
                      dispatch(completeTodo(item.id))
                    } else {
                      dispatch(uncompleteTodo(item.id))
                    }
                  }}
                  checked={item.completed}
                />
                {item.text}
              </li>
            )
          })}
        </ul>
      }
      {items.length === 0 &&
        <div>No items to display</div>
      }
    </div>
  )
}

export { TodoList }
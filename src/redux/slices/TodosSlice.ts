import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

interface TodoItem {
  id: string
  listId: string
  text: string
  completed: boolean
}

interface TodosState {
  todos: TodoItem[]
}

interface AddTodoAction {
  listId: string
  text: string
}

const initialState = {
  todos: [
    {
      id: nanoid(),
      text: 'test todo',
      completed: false,
      listId: 'work2'
    }
  ]
} as TodosState

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<AddTodoAction>) {
      const { text, listId } = action.payload
      state.todos.push(
        {
          id: nanoid(),
          completed: false,
          text,
          listId,
        }
      )
    },
    completeTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find((t) => t.id === action.payload)
      if(todo !== undefined) {
        todo.completed = true
      }
    },
    uncompleteTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find((t) => t.id === action.payload)
      if(todo !== undefined) {
        todo.completed = false
      }
    }
  }
})

export const { addTodo, completeTodo, uncompleteTodo } = todosSlice.actions
export default todosSlice.reducer
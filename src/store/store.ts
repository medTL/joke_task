import { configureStore } from '@reduxjs/toolkit'
import jokeReducer from './joke-reducer'



export const store = configureStore({
  reducer: {
    joke: jokeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
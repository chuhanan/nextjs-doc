import React, { createContext, useContext, useReducer } from 'react'

import { reducer, initialState, InitialState } from './reducer'

const GlobalContext = createContext<{ [key: string]: any }>(initialState)

export const GlobalProvider = ({ children, data }) => {
  const [store, dispatch] = useReducer(reducer, { ...initialState, ...data })
  return <GlobalContext.Provider value={{ store, dispatch }}>{children}</GlobalContext.Provider>
}

type ActionType = {
  type: string
  payload: Promise<any> | any
  callback?: (errorInfo?: any, responseData?: any) => void
}

type UseHomepageType = {
  store: InitialState
  dispatch: (action: ActionType) => void
  [key: string]: any
}

export default function useGlobal(): UseHomepageType {
  return useContext(GlobalContext) as UseHomepageType
}

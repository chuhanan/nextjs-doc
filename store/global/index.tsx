import React, { createContext, useContext, useReducer } from 'react'

import { reducer, initialState, InitialState } from './reducer'

import ACTIONS from './actions'

const GlobalContext = createContext<{ [key: string]: any }>(initialState)

export const GlobalProvider = ({ children, data }) => {
  const [store, dispatch] = useReducer(reducer, { ...initialState, ...data })
  return <GlobalContext.Provider value={{ store, dispatch }}>{children}</GlobalContext.Provider>
}

export interface IGlobalState extends InitialState {
  setCartData: (data: any) => void
}

export default function useGlobal(): IGlobalState {
  const { dispatch, ...store } = useContext(GlobalContext)
  return {
    ...store.store,
    setCartData: (data) => {
      dispatch({ type: ACTIONS.SET_CART_DATA, payload: data })
    },
  }
}

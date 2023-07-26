import ACTIONS from './actions'

export interface InitialState {
  global: any
  cart: any
}

export const initialState = {
  global: {},
  cart: {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_GLOBAL_INFO:
      return {
        ...state,
        global: action.payload,
      }
    case ACTIONS.SET_CART_DATA:
      return {
        ...state,
        cart: action.payload,
      }
    default:
      return state
  }
}

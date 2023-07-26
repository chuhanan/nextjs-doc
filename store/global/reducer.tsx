import ACTIONS from './actions'

export interface InitialState {
  global: any
}

export const initialState = {
  global: {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_GLOBAL_INFO:
      return {
        ...state,
        global: action.payload,
      }

    default:
      return state
  }
}

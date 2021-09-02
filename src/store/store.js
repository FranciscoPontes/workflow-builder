import { createStore } from 'redux'

const initialState = {
  triggerRefresh: false,
  workflowData: null,
}

const storeSettings = function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, workflowData: action.data }
    case 'REFRESH':
      return { ...state, triggerRefresh: true }
    case 'STOP_REFRESH':
      return { ...state, triggerRefresh: false }
    default:
      return state
  }
}

const store = createStore(
  storeSettings,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store

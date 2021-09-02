import { createStore } from 'redux'
import { actionTypes } from './actionTypes'

const initialState = {
  triggerRefresh: false,
  workflowData: null,
  modalData: null,
  snackbarData: {
    show: false,
    content: '',
    severity: 'success',
  },
  confirmationData: {
    open: false,
    title: null,
    description: null,
    callback: null,
  },
  appData: {
    appID: null,
    appCode: null,
    DBTier: null,
  },
}

const storeSettings = function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.setAppData:
      return { ...state, appData: action.data }
    case actionTypes.showConfirmation:
      return { ...state, confirmationData: { open: true, ...action.data } }
    case actionTypes.hideConfirmation:
      return {
        ...state,
        confirmationData: { ...state.confirmationData, open: false },
      }
    case actionTypes.updateSnackbar:
      return { ...state, snackbarData: action.data }
    case actionTypes.closeSnackbar:
      return { ...state, snackbarData: { ...state.snackbarData, show: false } }
    case actionTypes.modalData:
      return { ...state, modalData: action.data }
    case actionTypes.updateData:
      return { ...state, workflowData: action.data }
    case actionTypes.refresh:
      return { ...state, triggerRefresh: true }
    case actionTypes.stopRefresh:
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

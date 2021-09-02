import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../store/actionTypes'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export enum EseverityTypes {
  success = 'SUCCESS',
  error = 'ERROR',
}

export interface ISnackbarData {
  show: boolean
  content: string
  severity: EseverityTypes
}

export default function CustomSnackbar() {
  const snackbarData: ISnackbarData = useSelector((state) => state.snackbarData)
  const dispatch = useDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    dispatch({ type: actionTypes.closeSnackbar })
  }

  return (
    <Snackbar
      open={snackbarData?.show}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      message={snackbarData?.content}
    />
  )
}

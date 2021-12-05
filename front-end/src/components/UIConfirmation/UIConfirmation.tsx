import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../store/actionTypes'

export interface IConfirmationData {
  title: string
  description?: string
  callback: () => void
}

export default function UIConfirmation() {
  const data: IConfirmationData = useSelector((state) => state.confirmationData)
  const dispatch = useDispatch()

  const handleCancel = () => {
    dispatch({ type: actionTypes.hideConfirmation })
  }

  const handleConfirm = () => {
    data.callback()
    dispatch({ type: actionTypes.hideConfirmation })
  }

  return (
    <div>
      <Dialog open={data.open} onClose={handleCancel}>
        <DialogTitle>{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{data.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

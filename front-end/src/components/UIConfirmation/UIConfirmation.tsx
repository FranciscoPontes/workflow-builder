import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../store/actionTypes";

export interface IConfirmationData {
  title: string;
  description?: string;
  callback: () => void;
}

export default function UIConfirmation() {
  const data: IConfirmationData = useSelector(
    (state) => state.confirmationData
  );
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch({ type: actionTypes.hideConfirmation });
  };

  const handleConfirm = () => {
    data.callback();
    dispatch({ type: actionTypes.hideConfirmation });
  };

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
  );
}

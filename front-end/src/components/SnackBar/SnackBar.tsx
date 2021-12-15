import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../store/actionTypes";
import { TStore } from "../../types/types";
import Alert from "@mui/material/Alert";

export enum EseverityTypes {
  success = "success",
  error = "error",
}

export interface ISnackbarData {
  show: boolean;
  content: string;
  severity: EseverityTypes;
}

export default function CustomSnackbar() {
  const snackbarData: ISnackbarData = useSelector(
    (state: TStore) => state.snackbarData
  );
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    // if (reason === 'clickaway') return
    dispatch({ type: actionTypes.closeSnackbar });
  };

  return snackbarData.show ? (
    <Snackbar
      open={snackbarData?.show}
      autoHideDuration={
        snackbarData.severity === EseverityTypes.success ? 2000 : null
      }
      onClose={() => handleClose()}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Alert severity={snackbarData.severity} variant="filled">
        {snackbarData.content}
      </Alert>
    </Snackbar>
  ) : null;
}

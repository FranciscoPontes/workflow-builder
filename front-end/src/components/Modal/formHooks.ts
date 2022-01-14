import { useState } from "react";
import { useDispatch } from "react-redux";
import { DBService } from "../../services/db_communication";
import { actionTypes } from "../../store/actionTypes";
import { EseverityTypes, ISnackbarData } from "../SnackBar/SnackBar";
import { IConfirmationData } from "../UIConfirmation/UIConfirmation";
import { IAction } from "../workflowItems/Action/Action";
import { phaseDefinition } from "../workflowItems/Phase/Phase";
import { stateDefinition } from "../workflowItems/State/State";

interface IUploadFormDataProps {
  dataToPost: object;
  customErrorMessage: string;
  hideModalAfterwards: boolean;
  snackbarData: ISnackbarData;
}

const useUploadFormData = ({
  dataToPost,
  customErrorMessage,
  hideModalAfterwards,
  snackbarData,
}: IUploadFormDataProps) => {
  const dispatch = useDispatch();

  const [cleanModal, setCleanModal] = useState(true);

  const saveData = async (
    callBackLoadingIndicator: (isLoading: boolean) => void
  ) => {
    await DBService.changeData(dataToPost)
      .then(() => {
        dispatch({ type: actionTypes.updateSnackbar, data: snackbarData });
        dispatch({ type: actionTypes.refresh });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: actionTypes.updateSnackbar,
          data: {
            ...snackbarData,
            severity: EseverityTypes.error,
            content: `${customErrorMessage} ${err.message}`,
          },
        });
      });
    callBackLoadingIndicator(false);
    if (hideModalAfterwards) dispatch({ type: actionTypes.hideModal });
    else {
      setCleanModal(true);
    }
  };

  return [cleanModal, setCleanModal, saveData];
};

interface IDeleteElementProps {
  dataToPost: object;
  customErrorMessage: string;
  customSuccessMessage: string;
  snackbarData: ISnackbarData;
  confirmDeleteDialogMetadata: IConfirmationData;
}

const useDeleteElement = ({
  dataToPost,
  customErrorMessage,
  customSuccessMessage,
  snackbarData,
  confirmDeleteDialogMetadata,
}: IDeleteElementProps) => {
  const dispatch = useDispatch();

  const deleteElement = async () => {
    await DBService.changeData(dataToPost)
      .then(() => {
        dispatch({ type: actionTypes.refresh });
        dispatch({
          type: actionTypes.updateSnackbar,
          data: { ...snackbarData, content: customSuccessMessage },
        });
        dispatch({ type: actionTypes.hideModal });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: actionTypes.updateSnackbar,
          data: {
            ...snackbarData,
            severity: EseverityTypes.error,
            content: `${customErrorMessage} ${err.message}`,
          },
        });
      });
  };

  const confirmDelete = () => {
    dispatch({
      type: actionTypes.showConfirmation,
      data: { ...confirmDeleteDialogMetadata, callback: deleteElement },
    });
  };

  return confirmDelete;
};

const useCalculateNewSortOrder = (objArray: object[]) => {
  const computeNewSortOrder = () => {
    const sortOrderArray: Array<number> = objArray?.map(
      (obj) => obj.sort_order
    );
    if (sortOrderArray.length === 0) return 1;
    return Math.max(...sortOrderArray) + 1;
  };

  return computeNewSortOrder;
};

export { useUploadFormData, useDeleteElement, useCalculateNewSortOrder };

import { useState } from "react";
import { useDispatch } from "react-redux";
import useBECommunication from "../../services/useBECommunication";
import { actionTypes } from "../../store/actionTypes";
import { ISnackbarData } from "../SnackBar/SnackBar";
import { IConfirmationData } from "../UIConfirmation/UIConfirmation";

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

  const [cleanModal, setCleanModal] = useState(false);
  const [_, changeData] = useBECommunication();

  const saveModalData = async (
    callBackLoadingIndicator: (isLoading: boolean) => void
  ) => {
    await changeData(dataToPost, snackbarData, customErrorMessage);
    if (hideModalAfterwards) dispatch({ type: actionTypes.hideModal });
    else {
      setCleanModal(true);
    }
    callBackLoadingIndicator(false);
  };

  return [cleanModal, setCleanModal, saveModalData];
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

  const [_, changeData] = useBECommunication();

  const deleteElement = async () => {
    await changeData(
      dataToPost,
      { ...snackbarData, content: customSuccessMessage },
      customErrorMessage
    );
    dispatch({ type: actionTypes.hideModal });
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

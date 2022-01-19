import { useState } from "react";
import { useDispatch } from "react-redux";
import useBECommunication from "../../services/useBECommunication";
import { actionTypes } from "../../store/actionTypes";
import { ISnackbarData } from "../SnackBar/SnackBar";
import { IConfirmationData } from "../UIConfirmation/UIConfirmation";
import { EActionTypes } from "../workflowItems/Action/Action";
import { EModalTypes, IModal } from "./Modal";

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
    if (!sortOrderArray || sortOrderArray.length === 0) return 1;
    return Math.max(...sortOrderArray) + 1;
  };

  return computeNewSortOrder;
};

const useInvokeModal = () => {
  const dispatch = useDispatch();

  const phaseModalData = {
    title: "New phase",
    description: null,
    type: EModalTypes.phase,
  };

  const StateModalData: IModal = {
    type: EModalTypes.state,
    title: "New State",
    description: "",
  };

  const ActionModalData: IModal = {
    title: "New action",
    description: "",
    type: EModalTypes.action,
  };

  const invokePhaseModal = () =>
    dispatch({
      type: actionTypes.showModal,
      data: phaseModalData,
    });

  const invokeStateModal = () =>
    dispatch({
      type: actionTypes.showModal,
      data: StateModalData,
    });

  const invokeActionModal = (actionType: EActionTypes) =>
    dispatch({
      type: actionTypes.showModal,
      data: {
        ...ActionModalData,
        metadata: {
          actionMetadata: {
            action_type: actionType,
          },
        },
      },
    });

  return { invokePhaseModal, invokeStateModal, invokeActionModal };
};

export {
  useUploadFormData,
  useDeleteElement,
  useCalculateNewSortOrder,
  useInvokeModal,
};

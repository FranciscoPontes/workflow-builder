import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { DBService } from "../../../services/db_communication";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { actionTypes } from "../../../store/actionTypes";
import { IConfirmationData } from "../../UIConfirmation/UIConfirmation";
import { useEffect } from "react";
import { DBActionTypes } from "../../../services/dbActionTypes";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import { phaseDefinition } from "../../workflowItems/Phase/Phase";
import { Box } from "@mui/material";
import { formatCode, formatLabel } from "../../../utils/inputFormatter";
import ButtonRegion from "../ButtonRegion";
import {
  useCalculateNewSortOrder,
  useDeleteElement,
  useUploadFormData,
} from "../formHooks";

const useStyles = {
  root: {
    "& > *": {
      // m: 1,
      width: "65%",
    },
  },
  form: {
    display: "flex",
    m: "auto",
    flexFlow: "column",
    alignItems: "center",
  },
};

interface IPhaseForm {
  props: phaseDefinition;
}

const PhaseForm = ({ props }: IPhaseForm) => {
  const dispatch = useDispatch();
  const workflowData = useSelector((state) => state.workflowData);
  const appID = useSelector((state) => state.appData.appID);
  const classes = useStyles;

  const getNewSortOrder = useCalculateNewSortOrder(workflowData.phases);

  const [data, setData] = useState<phaseDefinition>({
    code: props?.code || "",
    label: props?.label || "",
    sort_order: props?.sort_order || getNewSortOrder(),
    id: props?.id || null,
    active_yn: props?.active_yn || null,
  });

  const snackbarData: ISnackbarData = {
    content: `Phase ${!data.id ? "created" : "updated"}!`,
    severity: EseverityTypes.success,
    show: true,
  };

  const phaseData = {
    ...data,
    app_id: appID,
  };

  const dataToPost = {
    phases: [phaseData],
    change_type: DBActionTypes.updatePhases,
  };

  const customErrorMessage = `Error ${
    !data.id ? "creating" : "updating"
  } phase!`;

  const uploadData = useUploadFormData({
    dataToPost,
    customErrorMessage,
    hideModalAfterwards: data.id !== null,
    snackbarData,
  });

  const saveData = async (formikData, setSubmitting) => {
    uploadData(setSubmitting);
  };

  const confirmDeleteDialogMetadata: IConfirmationData = {
    title: "Delete Phase?",
    description:
      "This action will delete all associated states and dependencies (actions, permissions..)",
    callback: null,
  };

  const tryDelete = useDeleteElement({
    dataToPost: {
      change_type: DBActionTypes.removePhase,
      id: data?.id,
    },
    customErrorMessage: "Error deleting phase!",
    customSuccessMessage: "Phase deleted!",
    snackbarData,
    confirmDeleteDialogMetadata,
  });

  // when adding new phases, keep increasing new sort order for quick batch insert
  useEffect(() => {
    if (!data.id) {
      setData({
        ...data,
        sort_order: getNewSortOrder(),
      });
    }
  }, [workflowData]);

  return (
    <Formik
      initialValues={data}
      onSubmit={(formikData, { setSubmitting }) =>
        saveData(formikData, setSubmitting)
      }
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          sx={{
            ...classes.root,
            ...classes.form,
          }}
        >
          <TextField
            autoFocus
            id="phase-code"
            label="Code"
            variant="outlined"
            value={data.code}
            onChange={(e) =>
              setData({
                ...data,
                code: formatCode(e.target.value),
                label: data.id ? data.label : formatLabel(e.target.value),
              })
            }
            required
          />
          <TextField
            id="phase-label"
            label="Label"
            variant="outlined"
            value={data.label}
            onChange={(e) => setData({ ...data, label: e.target.value })}
            required
          />
          <ButtonRegion
            handleSubmit={handleSubmit}
            id={props?.id}
            isSubmitting={isSubmitting}
            tryDelete={tryDelete}
          />
        </Box>
      )}
    </Formik>
  );
};

export default PhaseForm;

import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { IConfirmationData } from "../../UIConfirmation/UIConfirmation";
import { useEffect } from "react";
import { DBActionTypes } from "../../../services/dbActionTypes";
import { formatCode, formatLabel } from "../../../utils/inputFormatter";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import { Box } from "@mui/material";
import { stateDefinition } from "../../workflowItems/State/State";
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
      width: 0.65,
    },
  },
  selectEmpty: {
    mt: 2,
  },
  stateForm: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
};

interface IStateForm {
  props: stateDefinition;
}

const StateForm = ({ props }: IStateForm) => {
  const workflowData = useSelector((state) => state.workflowData);
  const appID = useSelector((state) => state.appData.appID);
  const classes = useStyles;
  const selectedPhase = useSelector((state) => state.selectedPhase);

  const [closeFormAfterwards, setCloseFormAfterwards] = useState(true);

  const [data, setData] = useState<stateDefinition>({
    code: props?.code || "",
    label: props?.label || "",
    sort_order: props?.sort_order,
    pha_id: props?.pha_id || selectedPhase || "",
    id: props?.id || null,
  });

  const snackbarData: ISnackbarData = {
    content: `State ${!data.id ? "created" : "updated"}!`,
    severity: EseverityTypes.success,
    show: true,
  };

  const getNewSortOrder = useCalculateNewSortOrder(
    workflowData.states.filter((sta) => sta.pha_id === data.pha_id)
  );

  const phaseArray = () =>
    workflowData.phases?.map((pha) => ({ pha_id: pha.id, code: pha.code }));

  const stateData = {
    pha_id: data.pha_id !== "" ? data.pha_id : null,
    app_id: appID,
    code: data.code,
    label: data.label,
    sort_order: data.sort_order,
    id: data.id,
  };

  const dataToPost = {
    states: [stateData],
    change_type: DBActionTypes.updateStates,
  };

  const customErrorMessage = `Error ${
    !data.id ? "creating" : "updating"
  } state!`;

  const confirmDeleteDialogMetadata: IConfirmationData = {
    title: "Delete State?",
    description:
      "This action will delete all associated dependencies (actions, permissions..)",
    callback: null,
  };

  const [cleanModal, setCleanModal, uploadData] = useUploadFormData({
    dataToPost,
    customErrorMessage,
    hideModalAfterwards: data.id !== null || (!data.id && closeFormAfterwards),
    snackbarData,
  });

  useEffect(() => {
    if (cleanModal) {
      setData({
        ...data,
        id: null,
        code: "",
        label: "",
        sort_order: null,
      });
      setCleanModal(false);
    }
  }, [cleanModal]);

  const saveData = async (formikData, setSubmitting) => {
    uploadData(setSubmitting);
  };

  const tryDelete = useDeleteElement({
    dataToPost: {
      change_type: DBActionTypes.removeState,
      id: props?.id,
    },
    customErrorMessage: "Error deleting state!",
    customSuccessMessage: "State deleted!",
    snackbarData,
    confirmDeleteDialogMetadata,
  });

  // when adding new states, keep increasing new sort order for quick batch insert
  useEffect(() => {
    if (!data.id && !data.sort_order) {
      setData({
        ...data,
        sort_order: getNewSortOrder(),
      });
    }
  }, [data]);

  // update new sort order when selected phase changes
  useEffect(() => {
    if (data.pha_id === props?.pha_id && props.id) {
      setData({
        ...data,
        sort_order: props.sort_order,
      });
      return;
    }
    setData({
      ...data,
      sort_order: getNewSortOrder(),
    });
  }, [data.pha_id]);

  return (
    <Formik
      initialValues={data}
      onSubmit={(formikData, { setSubmitting }) =>
        saveData(formikData, setSubmitting)
      }
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box sx={{ ...classes.root, ...classes.stateForm }}>
          <FormControl variant="outlined">
            <InputLabel>Phase</InputLabel>
            <Select
              value={data.pha_id}
              onChange={(e) => setData({ ...data, pha_id: e.target.value })}
              label="Phase"
              required
            >
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
              {phaseArray().map((pha) => (
                <MenuItem key={pha.pha_id} value={pha.pha_id}>
                  {pha.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
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
            label="Label"
            variant="outlined"
            value={data.label}
            onChange={(e) => setData({ ...data, label: e.target.value })}
            required
          />
          <ButtonRegion
            closeFormAfterwards={(value) => setCloseFormAfterwards(value)}
            handleSubmit={handleSubmit}
            id={data?.id}
            isSubmitting={isSubmitting}
            tryDelete={tryDelete}
          />
        </Box>
      )}
    </Formik>
  );
};

export default StateForm;

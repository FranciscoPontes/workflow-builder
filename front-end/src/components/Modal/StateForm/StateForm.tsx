import React from "react";
import { makeStyles } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { DBService } from "../../../services/db_communication";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { IConfirmationData } from "../../UIConfirmation/UIConfirmation";
import { useEffect } from "react";
import { DBActionTypes } from "../../../services/dbActionTypes";
import { formatCode, formatLabel } from "../../../utils/inputFormatter";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import { Box } from "@mui/material";
import { stateDefinition } from "../../workflowItems/State/State";
import { actionTypes } from "../../../store/actionTypes";

const useStyles = {
  root: {
    "& > *": {
      m: 1,
      width: 0.65,
    },
  },
  formControl: {
    m: 1,
    minWidth: 240,
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
  const dispatch = useDispatch();
  const workflowData = useSelector((state) => state.workflowData);
  const appID = useSelector((state) => state.appData.appID);
  const classes = useStyles;
  const selectedPhase = useSelector((state) => state.selectedPhase);

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

  const getNewSortOrder = (): number => {
    if (!workflowData.states) return 1;

    const sortOrderArray: Array<number> = workflowData.states
      .filter((sta) => sta.pha_id === data.pha_id)
      .map((sta) => sta.sort_order);

    if (sortOrderArray.length === 0) return 1;
    return Math.max(...sortOrderArray) + 1;
  };

  const phaseArray = () =>
    workflowData.phases?.map((pha) => ({ pha_id: pha.id, code: pha.code }));

  const saveData = async (formikData, setSubmitting) => {
    const stateData = {
      pha_id: data.pha_id !== "" ? data.pha_id : null,
      app_id: appID,
      code: data.code,
      label: data.label,
      sort_order: data.sort_order,
      id: data.id,
    };
    console.log(
      JSON.stringify({
        states: [stateData],
        change_type: DBActionTypes.updateStates,
      })
    );
    await DBService.changeData({
      states: [stateData],
      change_type: DBActionTypes.updateStates,
    })
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
            content: `Error ${!data.id ? "creating" : "updating"} state! ${
              err.message
            }`,
          },
        });
      });
    setSubmitting(false);
    if (data.id) dispatch({ type: actionTypes.hideModal });
  };

  const deleteState = async () => {
    await DBService.changeData({
      change_type: DBActionTypes.removeState,
      id: props.id,
    })
      .then(() => {
        dispatch({ type: actionTypes.refresh });
        dispatch({
          type: actionTypes.updateSnackbar,
          data: { ...snackbarData, content: "State deleted!" },
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
            content: `Error deleting action! ${err.message}`,
          },
        });
      });
  };

  const confirmData: IConfirmationData = {
    title: "Delete State?",
    description:
      "This action will delete all associated dependencies (actions, permissions..)",
    callback: deleteState,
  };

  const tryDelete = () => {
    dispatch({ type: actionTypes.showConfirmation, data: confirmData });
  };

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
    console.log("Changing sort order due to phase change..");
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
        <form
          onSubmit={handleSubmit}
          className={[classes.root, classes.stateForm].join(" ")}
        >
          <FormControl variant="outlined" sx={{ ...classes.formControl }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: 20,
            }}
          >
            {data?.id ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={tryDelete}
                size="small"
              >
                delete
              </Button>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default StateForm;

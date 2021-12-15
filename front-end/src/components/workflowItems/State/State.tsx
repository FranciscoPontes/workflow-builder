import React, { Fragment, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../store/actionTypes";
import { EModalTypes, IModal } from "../../Modal/Modal";
import { DBActionTypes } from "../../../services/dbActionTypes";
import { DBService } from "../../../services/db_communication";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Typography from "@mui/material/Typography";
import Action, { IAction } from "../Action/Action";
import { ESwitch } from "../../../types/types";
import { Box } from "@mui/material";

export interface stateDefinition {
  id: number;
  pha_id: number;
  code: string;
  label: string;
  sort_order: number;
  active_yn: ESwitch;
}

interface IStateProps {
  props: stateDefinition;
  actions: Array<IAction>;
}

const styles = {
  stateContainer: {
    display: "flex",
    mb: "10px",
    my: "3px",
    mt: 0,
    justifyContent: "center",
  },

  state: {
    backgroundColor: "#dee2e2",
    border: "1px solid black",
    boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgb(0 0 0 / 0%)",
    width: 0.8,
    minHeight: "20vh",
    padding: "10px",
    m: "10px",
    mt: "5px",
    display: "flex",
    flexFlow: "column",
  },

  selected: {
    border: "4px solid #363533",
  },

  stateDependencies: {
    textAlign: "left",
    width: 1,
  },

  // stateDependencies p,
  // .stateDependencies span {
  //   font-size: small !important,
  // }

  /* arrows */
  arrowContainer: {
    display: "flex",
    flexFlow: "column",
    fontSize: "smaller",
    justifyContent: "center",
  },

  arrow: {
    cursor: "pointer",
    m: "3px 0",
  },

  /* gear icon */
  gear: {
    cursor: "pointer",
    height: "fit-content",
  },

  actionSequence: {
    display: "flex",
    flexFlow: "column",
    m: "auto",
    alignItems: "center",
  },
};

export const State = ({ props, actions }: IStateProps) => {
  const states = useSelector((state) =>
    state.workflowData.states.filter((sta) => sta.pha_id === props.pha_id)
  );
  const selectedState = useSelector((state) => state.selectedState);

  const dispatch = useDispatch();

  const statesLenght = states.length;

  const indexOfThisState = states.indexOf(
    states.filter((sta) => sta.id === props.id)[0]
  );

  const modalData: IModal = {
    title: "State settings",
    description: "",
    type: EModalTypes.state,
    metadata: {
      stateMetadata: props,
    },
  };

  const snackbarData: ISnackbarData = {
    content: "State updated!",
    severity: EseverityTypes.success,
    show: true,
  };

  const triggerDataChange = async (data) => {
    console.log({
      states: data,
      change_type: DBActionTypes.updateStates,
    });
    await DBService.changeData({
      states: data,
      change_type: DBActionTypes.updateStates,
    })
      .then(() => {
        dispatch({ type: actionTypes.updateSnackbar, data: snackbarData });
        dispatch({ type: actionTypes.refresh });
      })
      .catch((err) => {
        console.error(`Catched error ${err}`);
        dispatch({
          type: actionTypes.updateSnackbar,
          data: {
            ...snackbarData,
            severity: EseverityTypes.error,
            content: `Error updating state order! ${err.message}`,
          },
        });
      });
  };

  const changeStateOrder = async (increment) => {
    const sortOrderOfThisState = states[indexOfThisState].sort_order;
    const sortOrderOfSiblingState =
      states[indexOfThisState + increment].sort_order;

    let modifiedStates = [...states];

    modifiedStates[indexOfThisState].sort_order = sortOrderOfSiblingState;
    modifiedStates[indexOfThisState + increment].sort_order =
      sortOrderOfThisState;

    await triggerDataChange(modifiedStates);
  };

  const changeStateOrderUp = async () => {
    if (indexOfThisState + 1 !== statesLenght) changeStateOrder(1);
  };

  const changeStateOrderDown = async () => {
    if (indexOfThisState !== 0) changeStateOrder(-1);
  };

  const setSelectedState = () => {
    dispatch({ type: actionTypes.setSelectedState, data: props.id });
    dispatch({ type: actionTypes.setSelectedPhase, data: null });
  };

  return (
    <Box
      sx={{
        ...styles.stateContainer,
      }}
    >
      <Box
        sx={{ ...styles.gear }}
        onClick={() =>
          dispatch({ type: actionTypes.showModal, data: modalData })
        }
      >
        <SettingsIcon fontSize="small" />
      </Box>
      <Box
        sx={{
          ...styles.state,
          ...(selectedState === props.id && styles.selected),
        }}
      >
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={setSelectedState}
          align="center"
        >
          {props.code}
        </Typography>
        <Box sx={{ ...styles.stateDependencies }}>
          <Box sx={{ ...styles.actionSequence }}>
            {actions?.map((act) => (
              <Action props={act} key={act.id} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          onClick={changeStateOrderDown}
          sx={{
            cursor: indexOfThisState !== 0 ? "pointer" : "default",
            height: "fit-content",
          }}
        >
          <ArrowUpwardIcon
            color={indexOfThisState !== 0 ? "inherit" : "disabled"}
          />
        </Box>
        <Box
          onClick={changeStateOrderUp}
          sx={{
            cursor:
              indexOfThisState + 1 !== statesLenght ? "pointer" : "default",
            height: "fit-content",
          }}
        >
          <ArrowDownwardIcon
            color={
              indexOfThisState + 1 !== statesLenght ? "inherit" : "disabled"
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

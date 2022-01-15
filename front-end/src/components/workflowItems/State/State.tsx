import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../store/actionTypes";
import { EModalTypes, IModal } from "../../Modal/Modal";
import { DBActionTypes } from "../../../services/dbActionTypes";
import useBECommunication from "../../../services/useBECommunication";
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
    bgcolor: "action.hover",
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
    border: 4,
    borderColor: "borderSelection.main",
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

  icon: {
    cursor: "pointer",
    color: "text.primary",
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

  const [_, changeData] = useBECommunication();

  const triggerDataChange = async (data) => {
    await changeData(
      {
        states: data,
        change_type: DBActionTypes.updateStates,
      },
      snackbarData,
      "Error updating state order!"
    );
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
        <SettingsIcon fontSize="small" sx={{ ...styles.icon }} />
      </Box>
      <Box
        sx={{
          ...styles.state,
          ...(selectedState === props.id && styles.selected),
        }}
      >
        <Typography
          sx={{ ...styles.icon }}
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
            height: "fit-content",
          }}
        >
          <ArrowUpwardIcon
            sx={{
              ...styles.icon,
              cursor: indexOfThisState !== 0 ? "pointer" : "default",
              color:
                indexOfThisState !== 0 ? "text.primary" : "action.disabled",
            }}
          />
        </Box>
        <Box
          onClick={changeStateOrderUp}
          sx={{
            height: "fit-content",
          }}
        >
          <ArrowDownwardIcon
            sx={{
              ...styles.icon,
              cursor:
                indexOfThisState + 1 !== statesLenght ? "pointer" : "default",
              color:
                indexOfThisState + 1 !== statesLenght
                  ? "text.primary"
                  : "action.disabled",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../store/actionTypes";
import { EModalTypes, IModal } from "../../Modal/Modal";
import { DBActionTypes } from "../../../services/dbActionTypes";
import useBECommunication from "../../../services/useBECommunication";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import Typography from "@mui/material/Typography";
import Action, { EActionTypes, IAction } from "../Action/Action";
import { ESwitch } from "../../../types/types";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { dragTypes } from "../../DragAndDrop/dragTypes";
import { useInvokeModal } from "../../Modal/formHooks";
import { animatedDropZoneStyles } from "../../DragAndDrop/dropzoneStyling";
import OrderingBox from "../../OrderingBox";

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

  const dispatch = useDispatch();

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

  const changeSelectedState = () => {
    dispatch({ type: actionTypes.setSelectedState, data: props.id });
    dispatch({ type: actionTypes.setSelectedPhase, data: null });
  };

  const { invokeActionModal } = useInvokeModal();

  const [{ isActionDragActive }, actionDrop] = useDrop(() => ({
    accept: dragTypes.action,
    drop: (item: { actionType: EActionTypes }) => {
      changeSelectedState();
      invokeActionModal(item.actionType);
    },
    collect: (monitor) => ({
      isActionDragActive: monitor.canDrop() && monitor.isOver(),
    }),
  }));

  return (
    <Box
      sx={{
        ...styles.stateContainer,
        ...(isActionDragActive ? animatedDropZoneStyles.dropzoneBorder : null),
      }}
      ref={actionDrop}
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
        }}
      >
        <Typography align="center" sx={{ color: "text.primary" }}>
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
      <OrderingBox
        applyChangesCallback={triggerDataChange}
        currentElementIndex={indexOfThisState}
        elementArray={states}
      />
    </Box>
  );
};

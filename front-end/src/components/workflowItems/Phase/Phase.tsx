import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { EModalTypes } from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import useBECommunication from "../../../services/useBECommunication";
import { actionTypes } from "../../../store/actionTypes";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import { DBActionTypes } from "../../../services/dbActionTypes";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ESwitch, TStore } from "../../../types/types";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { dragTypes } from "../../DragAndDrop/dragTypes";
import { useInvokeModal } from "../../Modal/formHooks";
import { animatedDropZoneStyles } from "../../DragAndDrop/dropzoneStyling";
import OrderingBox from "../../OrderingBox";

export interface phaseDefinition {
  id: number;
  code: string;
  label: string;
  sort_order: number;
  active_yn: ESwitch;
}

const styles = {
  phase: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    p: "10px",
    // m: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    color: "text.primary",
    cursor: "pointer",
  },
};

const Phase = (props: phaseDefinition) => {
  const workflowData = useSelector((state: TStore) => state.workflowData);
  const phases = workflowData.phases;
  const collapsedPhases = useSelector((state: TStore) => state.collapsedPhases);
  const dispatch = useDispatch();

  const indexOfThisPhase = phases.indexOf(
    phases.filter((pha) => pha.id === props.id)[0]
  );

  const snackbarData: ISnackbarData = {
    content: "Phase updated!",
    severity: EseverityTypes.success,
    show: true,
  };

  const [_, changeData] = useBECommunication();

  const triggerDataChange = async (data) => {
    await changeData(
      {
        phases: data,
        change_type: DBActionTypes.updatePhases,
      },
      snackbarData,
      "Error updating phase order!"
    );
  };

  const phaseModalData = {
    title: "Phase settings",
    description: null,
    type: EModalTypes.phase,
    metadata: { phaseMetadata: props },
  };

  const changeSelectedPhase = () => {
    dispatch({ type: actionTypes.setSelectedPhase, data: props.id });
    dispatch({ type: actionTypes.setSelectedState, data: null });
  };

  /**
   * Adds or removes the phase id from the store collapsed phases array
   * @returns the modified array
   */
  const handlePhaseCollapse = (): Array<number> =>
    collapsedPhases.includes(props.id)
      ? collapsedPhases.filter((id) => id !== props.id)
      : collapsedPhases.concat(props.id);

  const stateCount = () => {
    return workflowData.states.filter((state) => state.pha_id === props.id)
      .length;
  };

  const { invokeStateModal } = useInvokeModal();

  const [{ isActive }, drop] = useDrop(() => ({
    accept: dragTypes.state,
    drop: () => {
      changeSelectedPhase();
      invokeStateModal();
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        ...(isActive ? animatedDropZoneStyles.dropzoneBorder : null),
      }}
    >
      <Box
        sx={{
          ...styles.phase,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            onClick={() =>
              dispatch({
                type: actionTypes.showModal,
                data: phaseModalData,
              })
            }
          >
            <SettingsIcon fontSize="small" sx={{ ...styles.icon }} />
          </Box>
          {stateCount() !== 0 ? (
            <Box
              onClick={() =>
                dispatch({
                  type: actionTypes.setCollapsedPhases,
                  data: handlePhaseCollapse(),
                })
              }
            >
              {collapsedPhases.includes(props.id) ? (
                <ArrowDropDownIcon sx={{ ...styles.icon }} />
              ) : (
                <ArrowDropUpIcon sx={{ ...styles.icon }} />
              )}
            </Box>
          ) : null}
        </Box>
        <Typography variant="body1">{props.code}</Typography>
        <OrderingBox
          applyChangesCallback={triggerDataChange}
          currentElementIndex={indexOfThisPhase}
          elementArray={phases}
        />
      </Box>
      {props.children}
    </Box>
  );
};

export default Phase;

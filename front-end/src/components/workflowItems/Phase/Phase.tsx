import React from "react";
import styles from "./Phase.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import { EModalMetadataTypes, EModalTypes, IModal } from "../../Modal/Modal";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDispatch, useSelector } from "react-redux";
import { DBService } from "../../../services/db_communication";
import { actionTypes } from "../../../store/actionTypes";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import { DBActionTypes } from "../../../services/dbActionTypes";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ESwitch, TStore } from "../../../types/types";
import Typography from "@mui/material/Typography";

export interface phaseDefinition {
  id: number;
  code: string;
  label: string;
  sort_order: number;
  active_yn: ESwitch;
}

const Phase = (props: phaseDefinition) => {
  const workflowData = useSelector((state: TStore) => state.workflowData);
  const phases = workflowData.phases;
  const collapsedPhases = useSelector((state: TStore) => state.collapsedPhases);
  const dispatch = useDispatch();

  const phasesLenght = phases.length;

  const indexOfThisPhase = phases.indexOf(
    phases.filter((pha) => pha.id === props.id)[0]
  );

  const snackbarData: ISnackbarData = {
    content: "Phase updated!",
    severity: EseverityTypes.success,
    show: true,
  };

  const triggerDataChange = async (data) => {
    await DBService.changeData({
      phases: data,
      change_type: DBActionTypes.updatePhases,
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
            content: `Error updating phase order! ${err.message}`,
          },
        });
      });
  };

  const changePhaseOrder = async (increment) => {
    const sortOrderOfThisPhase = phases[indexOfThisPhase].sort_order;
    const sortOrderOfSiblingPhase =
      phases[indexOfThisPhase + increment].sort_order;

    let modifiedPhases = [...phases];

    modifiedPhases[indexOfThisPhase].sort_order = sortOrderOfSiblingPhase;
    modifiedPhases[indexOfThisPhase + increment].sort_order =
      sortOrderOfThisPhase;

    await triggerDataChange(modifiedPhases);
  };

  const changePhaseOrderUp = async () => {
    if (indexOfThisPhase + 1 !== phasesLenght) changePhaseOrder(1);
  };

  const changePhaseOrderDown = async () => {
    if (indexOfThisPhase !== 0) changePhaseOrder(-1);
  };

  const phaseModalData = {
    title: "Phase settings",
    description: null,
    type: EModalTypes.phase,
    metadata: { phaseMetadata: props },
  };

  const metadata: EModalMetadataTypes = {
    stateMetadata: {
      pha_id: props.id,
    },
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

  return (
    <div className={styles.phase}>
      <div style={{ display: "flex" }}>
        <div
          onClick={() =>
            dispatch({
              type: actionTypes.showModal,
              data: phaseModalData,
            })
          }
          style={{ cursor: "pointer" }}
        >
          <SettingsIcon fontSize="small" />
        </div>
        {stateCount() !== 0 ? (
          <div
            onClick={() =>
              dispatch({
                type: actionTypes.setCollapsedPhases,
                data: handlePhaseCollapse(),
              })
            }
            style={{ cursor: "pointer" }}
          >
            {collapsedPhases.includes(props.id) ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )}
          </div>
        ) : null}
      </div>
      <Typography
        variant="body1"
        onClick={changeSelectedPhase}
        style={{ cursor: "pointer" }}
      >
        {props.code}
      </Typography>
      <div style={{ display: "flex" }}>
        <div
          onClick={changePhaseOrderDown}
          style={{ cursor: indexOfThisPhase !== 0 ? "pointer" : "default" }}
        >
          <ArrowUpwardIcon
            color={indexOfThisPhase !== 0 ? "inherit" : "disabled"}
          />
        </div>
        <div
          onClick={changePhaseOrderUp}
          style={{
            cursor:
              indexOfThisPhase + 1 !== phasesLenght ? "pointer" : "default",
          }}
        >
          <ArrowDownwardIcon
            color={
              indexOfThisPhase + 1 !== phasesLenght ? "inherit" : "disabled"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Phase;

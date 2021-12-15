import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { TStore } from "../../types/types";
import { IAction } from "../workflowItems/Action/Action";
import { IPermission } from "../workflowItems/Permission/Permission";
import Phase, { phaseDefinition } from "../workflowItems/Phase/Phase";
import { State, stateDefinition } from "../workflowItems/State/State";
import { Box } from "@mui/material";

type TStates = Array<stateDefinition>;
type TPhases = Array<phaseDefinition>;
type TPermissions = Array<IPermission>;
type TActions = Array<IAction>;
export type TMailTemplates = Array<{
  code: string;
}>;

export type TRequestTypes = Array<{
  id: number;
  code: string;
}>;

export type workflowData = {
  phases: TPhases;
  states: TStates;
  permissions: TPermissions;
  actions: TActions;
  mail_templates: TMailTemplates;
  request_types: TRequestTypes;
};

const styles = {
  box: {
    width: 0.9,
    justifyContent: "center",
    backgroundColor: "action.disabled",
    overflow: "auto",
  },

  workflowPhases: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    border: "1px solid #8e8888",
  },

  phase: {
    width: 1,
  },

  selected: {
    border: "4px solid #363533",
  },

  states: {
    // writing-mode: horizontal-tb;
    m: "auto",
    display: "flex",
    flexFlow: "column",
    mb: 1,
    width: 0.9,
  },
};

export const WorkflowBox = () => {
  const data: workflowData = useSelector((state: TStore) => state.workflowData);
  const selectedPhase = useSelector((state: TStore) => state.selectedPhase);
  const collapsedPhases = useSelector((state: TStore) => state.collapsedPhases);

  const statePermissionCount = (sta: stateDefinition): number => {
    return data.permissions?.filter((per) => per.sta_id === sta.id).length;
  };

  const stateActions = (sta: stateDefinition): TActions => {
    return data.actions?.filter((act) => act.sta_id === sta.id);
  };

  const selectedStyling = (id) => {
    if (selectedPhase === id) {
      return {
        ...styles.workflowPhases,
        ...styles.selected,
      };
    } else {
      return { ...styles.workflowPhases };
    }
  };

  return (
    <Box sx={{ ...styles.box }}>
      {data
        ? data.phases?.map((phase) => (
            <Box sx={selectedStyling(phase.id)} key={phase.code}>
              <Box sx={{ ...styles.phase }}>
                <Phase
                  code={phase.code}
                  sort_order={phase.sort_order}
                  id={phase.id}
                  label={phase.label}
                  active_yn={phase.active_yn}
                />
              </Box>
              {!collapsedPhases.includes(phase.id) ? (
                <Box sx={{ ...styles.states }}>
                  {data.states
                    ?.filter((sta) => sta.pha_id === phase.id)
                    .map((sta) => (
                      <State
                        key={sta.code}
                        props={sta}
                        permissionCount={statePermissionCount(sta)}
                        actions={stateActions(sta)}
                      />
                    ))}
                </Box>
              ) : null}
            </Box>
          ))
        : null}
    </Box>
  );
};

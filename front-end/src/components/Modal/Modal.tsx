import React from "react";
import Modal from "@mui/material/Modal";
import PhaseForm from "./PhaseForm/PhaseForm";
import StateForm from "./StateForm/StateForm";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../store/actionTypes";
import ActionForm from "./ActionForm/ActionForm";
import { IAction } from "../workflowItems/Action/Action";
import { phaseDefinition } from "../workflowItems/Phase/Phase";
import { stateDefinition } from "../workflowItems/State/State";
import { Box, Typography } from "@mui/material";

export enum EModalTypes {
  phase = "PHASE",
  state = "STATE",
  action = "ACTION",
}

export interface EModalMetadataTypes {
  phaseMetadata?: phaseDefinition;
  stateMetadata?: stateDefinition;
  actionMetadata?: IAction;
}

export type IModal = {
  isOpen?: boolean;
  title: string;
  description: string;
  type: EModalTypes;
  metadata?: EModalMetadataTypes;
};

export const SimpleModal = (props: IModal) => {
  const dispatch = useDispatch();

  const body = (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "30vw",
        margin: "auto",
        border: "2px solid #000",
        bgcolor: "background.default",
        borderRadius: "2%",
        padding: "10px",
        textAlign: "center",
        transform: "translate(-50%, -50%)",
        height: "fit-content",
        maxHeight: "70vh",
        overflow: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
        sx={{ color: "text.primary", mb: 2 }}
      >
        {props.title}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {props.description}
      </Typography>
      {props.type === EModalTypes.phase ? (
        <PhaseForm props={props?.metadata?.phaseMetadata} />
      ) : props.type === EModalTypes.state ? (
        <StateForm props={props?.metadata?.stateMetadata} />
      ) : (
        <ActionForm props={props?.metadata?.actionMetadata} />
      )}
    </Box>
  );

  return (
    <Box>
      <Modal
        open={props.isOpen}
        onClose={() =>
          dispatch({
            type: actionTypes.hideModal,
          })
        }
      >
        {body}
      </Modal>
    </Box>
  );
};

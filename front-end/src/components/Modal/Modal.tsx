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
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "50vw",
        margin: "auto",
        border: "2px solid #000",
        backgroundColor: "white",
        borderRadius: "2%",
        padding: "10px",
        textAlign: "center",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      {props.type === EModalTypes.phase ? (
        <PhaseForm props={props?.metadata?.phaseMetadata} />
      ) : props.type === EModalTypes.state ? (
        <StateForm props={props?.metadata?.stateMetadata} />
      ) : (
        <ActionForm props={props?.metadata?.actionMetadata} />
      )}
    </div>
  );

  return (
    <div>
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
    </div>
  );
};

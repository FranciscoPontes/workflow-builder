import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../store/actionTypes";
import { EModalTypes, IModal } from "../../Modal/Modal";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import { DBActionTypes } from "../../../services/dbActionTypes";
import useBECommunication from "../../../services/useBECommunication";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ESwitch } from "../../../types/types";
import { Box, Typography } from "@mui/material";

export interface IActionSetting {
  id: number;
  act_id: number;
  name: string;
  string_value: string;
}

export enum EActionTypes {
  mail = "SEND_MAIL",
  plsql = "PLSQL",
  stateChange = "STATUS_CHANGE",
}

export interface IAction {
  action_type: EActionTypes;
  code: string;
  id: number;
  label: string;
  sta_id: number;
  user_action_yn: ESwitch;
  sort_order: number;
  action_settings?: Array<IActionSetting>;
  reqt_id: number;
  active_yn: ESwitch;
}

interface IActionProps {
  props: IAction;
}

const styles = {
  action: {
    display: "flex",
    p: "10px",
    m: "10px",
    border: "1px solid black",
    boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgb(0 0 0 / 0%)",
    justifyContent: "space-between",
    alignItems: "center",
    width: 1,
  },

  UIAction: {
    backgroundColor: "#96b16d",
  },

  automaticAction: {
    backgroundColor: "#a29a9a",
  },

  icon: {
    cursor: "pointer",
  },
  themeColor: {
    color: "text.primary",
  },
};

const Action = ({ props }: IActionProps) => {
  const dispatch = useDispatch();
  const appID = useSelector((state) => state.appData.appID);
  const workflowData = useSelector((state) => state.workflowData);

  const modalData: IModal = {
    title: "Action settings",
    description: "",
    type: EModalTypes.action,
    metadata: {
      actionMetadata: props,
    },
  };

  const actions = useSelector((state) =>
    state.workflowData.actions
      .filter((act) => act.sta_id === props.sta_id)
      .map((act) => ({ ...act, app_id: appID }))
  );

  const actionTypeActionSettingMapping = {
    [EActionTypes.mail]: "MAIL_TEMPLATE_CODE",
    [EActionTypes.plsql]: "PLSQL_FUNCTION_NAME",
    [EActionTypes.stateChange]: "NEXT_STATE_CODE_1",
  };

  const actionsLenght = actions.length;

  const indexOfThisAction = actions.indexOf(
    actions.filter((act) => act.id === props.id)[0]
  );

  const snackbarData: ISnackbarData = {
    content: "Action updated!",
    severity: EseverityTypes.success,
    show: true,
  };

  const [_, changeData] = useBECommunication();

  const triggerDataChange = async (data) => {
    await changeData(
      {
        actions: data,
        change_type: DBActionTypes.updateActions,
      },
      snackbarData,
      "Error updating action order!"
    );
  };

  const changeActionOrder = async (increment) => {
    const sortOrderOfThisState = actions[indexOfThisAction].sort_order;
    const sortOrderOfSiblingState =
      actions[indexOfThisAction + increment].sort_order;

    let modifiedActions = [...actions];

    modifiedActions[indexOfThisAction].sort_order = sortOrderOfSiblingState;
    modifiedActions[indexOfThisAction + increment].sort_order =
      sortOrderOfThisState;

    await triggerDataChange(modifiedActions);
  };

  const changeActionOrderUp = async () => {
    if (indexOfThisAction + 1 !== actionsLenght) changeActionOrder(1);
  };

  const changeActionOrderDown = async () => {
    if (indexOfThisAction !== 0) changeActionOrder(-1);
  };

  const requestTypes = workflowData.request_types?.map((reqt) => reqt);

  const getCorrectActionSetting: Array<IActionSetting> =
    props.action_settings?.filter(
      (acts) => acts.name === actionTypeActionSettingMapping[props?.action_type]
    );

  const actionSettingInfo = (
    <Box
      style={{
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Typography variant="body2" sx={{ ...styles.themeColor }}>
        {props.action_type === EActionTypes.mail
          ? `Mail code: ${getCorrectActionSetting[0].string_value || ""}`
          : props.action_type === EActionTypes.plsql
          ? `PL/SQL Function: ${getCorrectActionSetting[0].string_value || ""}`
          : props.action_type === EActionTypes.stateChange
          ? `From ${props.code} to ${
              getCorrectActionSetting[0].string_value || ""
            }`
          : ""}
      </Typography>
      <Typography variant="body2" sx={{ ...styles.themeColor }}>
        {`Request type: ${
          props.reqt_id
            ? requestTypes.filter((reqt) => reqt.id === props.reqt_id)[0].code
            : "All"
        }`}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", width: "80%" }}>
      <Box
        sx={{ height: "fit-content" }}
        onClick={() =>
          dispatch({ type: actionTypes.showModal, data: modalData })
        }
      >
        <SettingsIcon
          fontSize="small"
          sx={{ ...styles.themeColor, ...styles.icon }}
        />
      </Box>
      <Box
        sx={{
          ...styles.action,
          ...(props.user_action_yn === "Y"
            ? styles.UIAction
            : styles.automaticAction),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
          }}
        >
          <Typography variant="body1" sx={{ ...styles.themeColor }}>
            {`${props.label} - ${
              props.user_action_yn !== "Y" ? "Automatic action" : "User Action"
            }`}
          </Typography>
          {actionSettingInfo}
        </Box>
        {props.action_type === EActionTypes.mail ? (
          <MailIcon sx={{ ...styles.themeColor }} />
        ) : props.action_type === EActionTypes.stateChange ? (
          <TrendingFlatIcon sx={{ ...styles.themeColor }} />
        ) : (
          <NewReleasesIcon sx={{ ...styles.themeColor }} />
        )}
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          onClick={changeActionOrderDown}
          sx={{
            height: "fit-content",
          }}
        >
          <ArrowUpwardIcon
            sx={{
              ...styles.themeColor,
              color:
                indexOfThisAction !== 0 ? "text.primary" : "action.disabled",
              cursor: indexOfThisAction !== 0 ? "pointer" : "default",
            }}
          />
        </Box>
        <Box
          onClick={changeActionOrderUp}
          sx={{
            height: "fit-content",
          }}
        >
          <ArrowDownwardIcon
            sx={{
              ...styles.themeColor,
              color:
                indexOfThisAction + 1 !== actionsLenght
                  ? "text.primary"
                  : "action.disabled",
              cursor:
                indexOfThisAction + 1 !== actionsLenght ? "pointer" : "default",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Action;

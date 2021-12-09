const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DBActionTypes = {
  // phases
  updatePhases: "UPDATE_PHASES",
  removePhase: "REMOVE_PHASE",
  // states
  updateStates: "UPDATE_STATES",
  removeState: "REMOVE_STATE",
  // actions
  updateActions: "UPDATE_ACTIONS",
  removeAction: "REMOVE_ACTION",
};

let appMetadata = {
  app_code: "OWP",
  request_types: [
    {
      id: 9742,
      code: "WORK_PERMIT",
    },
  ],
  phases: [
    {
      id: 10387,
      active_yn: "Y",
      code: "INITIAL",
      label: "Initial",
      sort_order: 10,
    },
    {
      id: 10388,
      active_yn: "Y",
      code: "REVIEW",
      label: "Review",
      sort_order: 20,
    },
    {
      id: 10389,
      active_yn: "Y",
      code: "EXECUTION",
      label: "Execution",
      sort_order: 30,
    },
    {
      id: 10390,
      active_yn: "Y",
      code: "CLOSED",
      label: "Closed",
      sort_order: 40,
    },
  ],
  states: [
    {
      id: 13955,
      active_yn: "Y",
      pha_id: 10387,
      code: "INITIAL_DRAFT",
      label: "Draft",
      sort_order: 11,
    },
  ],
  actions: [],
  action_settings: [],
  mail_templates: [
    {
      id: 11742,
      app_id: 5221,
      active_yn: "Y",
      code: "TEST",
      label: "TEST",
      description: null,
      subject: "adf",
      content: "af",
    },
    {
      id: 11570,
      app_id: 5221,
      active_yn: "Y",
      code: "NOTIFY_SAFETY_OFFICER",
      label: "NOTIFY_SAFETY_OFFICER",
      description: null,
      subject: "Online work permit:  Request ##ID## - waiting for review",
      content:
        "There is a new request ##TITLE## (Control Number: CN##ID##) waiting for your review.\r\nPlease follow the link below and approve or reject the request. </br> ##EXTERNAL_LINK##",
    },
    {
      id: 11571,
      app_id: 5221,
      active_yn: "Y",
      code: "NOTIFY_MISSING_INFORMATION",
      label: "NOTIFY_MISSING_INFORMATION",
      description: null,
      subject: "Online work permit: Request ##ID## - information missing",
      content:
        "Your request ##TITLE## (Control Number: CN##ID##) has been rejected by the reviewer because of missing information with the following comment: </br>\r\n##SAFETY_COMMENTS##\r\n\r\nPlease review and update your request and submit it again.",
    },
    {
      id: 11572,
      app_id: 5221,
      active_yn: "Y",
      code: "EXECUTION_COMPLETED",
      label: "EXECUTION_COMPLETED",
      description: null,
      subject: "Online work permit: Request ##ID## - completed & closed",
      content:
        "Your request ##TITLE## (Control Number: CN##ID##) has been completed and will now be printed and signed.",
    },
    {
      id: 11573,
      app_id: 5221,
      active_yn: "Y",
      code: "NOTIFY_REQUESTER_REVIEW_APPROVED",
      label: "NOTIFY_REQUESTER_REVIEW_APPROVED",
      description: null,
      subject: "Online work permit: Request ##ID## - approved",
      content:
        "Your request ##TITLE## (Control Number: CN##ID##) has been approved by the reviewer. </br>\r\nSafety notes: ##SAFETY_COMMENTS## </br>\r\nFollow the link to submit and complete the request or to cancel it. </br>\r\n##EXTERNAL_LINK##",
    },
    {
      id: 11574,
      app_id: 5221,
      active_yn: "Y",
      code: "NOTIFY_REQUESTER_REJECTED",
      label: "NOTIFY_REQUESTER_REJECTED",
      description: null,
      subject: "Online work permit: Request ##ID## - rejected & closed",
      content:
        "Your request ##TITLE## (Control Number: CN##ID##) has been rejected by the reviewer with the following comment:\r\n</br> ##SAFETY_COMMENTS##",
    },
    {
      id: 11575,
      app_id: 5221,
      active_yn: "Y",
      code: "EXECUTION_CANCELED",
      label: "EXECUTION_CANCELED",
      description: null,
      subject: "Online work permit: Request ##ID## - canceled & closed",
      content:
        "Your request ##TITLE## (Control Number: CN##ID##) has been canceled.\r\nFor further questions please contact the person assigned to the request.",
    },
    {
      id: 11576,
      app_id: 5221,
      active_yn: "Y",
      code: "SUBMIT_NOTIFICATION_REQUESTER",
      label: "SUBMIT_NOTIFICATION_REQUESTER",
      description: null,
      subject: "Online work permit: Request ##ID## - submitted to review",
      content:
        "Your request ##TITLE## (Control Number: CN##ID##) has been successfully submitted and is now waiting for review.\r\nYou will get informed as soon as the request has been approved or rejected.",
    },
  ],
};

const actionTypes = {
  mail: "SEND_MAIL",
  plsql: "PLSQL",
  stateChange: "STATUS_CHANGE",
};

const actionTypeActionSettingMapping = {
  [actionTypes.mail]: "MAIL_TEMPLATE_CODE",
  [actionTypes.plsql]: "PLSQL_FUNCTION_NAME",
  [actionTypes.stateChange]: "NEXT_STATE_CODE_1",
};

const actionSettingSchema = {
  id: null,
  act_id: null,
  name: "",
  string_value: "",
};

const deleteObjectFromAppMetadata = (objectID, objectType) => {
  appMetadata = {
    ...appMetadata,
    [objectType]: appMetadata[objectType].filter((sta) => sta.id !== objectID),
  };
};

const deleteActionSettings = (actsID) => {
  deleteObjectFromAppMetadata(actsID, "action_settings");
};

const deleteAction = (actID) => {
  deleteObjectFromAppMetadata(actID, "actions");

  appMetadata.action_settings
    .filter((acts) => acts.act_id === actID)
    .forEach((acts) => deleteActionSettings(acts.id));
};

const deleteState = (stateID) => {
  deleteObjectFromAppMetadata(stateID, "states");

  appMetadata.actions
    .filter((act) => act.sta_id === stateID)
    .forEach((act) => deleteAction(act.id));
};

const deletePhase = (phaseID) => {
  deleteObjectFromAppMetadata(phaseID, "phases");

  appMetadata.states
    .filter((sta) => sta.pha_id === phaseID)
    .forEach((sta) => deleteState(sta.id));
};

const getNextID = (dataArray) => {
  if (dataArray.length === 0) {
    return 1;
  }
  const IDArray = dataArray.map((obj) => obj.id);
  return Math.max(...IDArray) + 1;
};

const handleAppDataChange = (metadata, changeType) => {
  console.log(`Change type received ${changeType}`);
  console.log(metadata);

  switch (changeType) {
    case DBActionTypes.updatePhases:
      if (metadata.phases.length > 1) {
        appMetadata = {
          ...appMetadata,
          phases: metadata.phases,
        };
        return;
      }

      const phase = {
        ...metadata.phases[0],
        id: getNextID(appMetadata.phases),
        active_yn: "Y",
      };
      appMetadata = {
        ...appMetadata,
        phases: appMetadata.phases.concat(phase),
      };
      break;

    case DBActionTypes.updateStates:
      if (metadata.states.length > 1) {
        appMetadata = {
          ...appMetadata,
          states: metadata.states,
        };
        return;
      }

      const state = {
        ...metadata.states[0],
        id: getNextID(appMetadata.states),
        active_yn: "Y",
      };
      appMetadata = {
        ...appMetadata,
        states: appMetadata.states.concat(state),
      };
      break;

    case DBActionTypes.updateActions:
      if (metadata.actions.length > 1) {
        appMetadata = {
          ...appMetadata,
          actions: metadata.actions,
        };
        return;
      }

      const actionSettingName =
        actionTypeActionSettingMapping[metadata.actions[0].action_type];

      const action = {
        ...metadata.actions[0],
        id: getNextID(appMetadata.actions),
      };

      // generate action setting
      const nextID = getNextID(appMetadata.action_settings);

      const actionSetting = {
        ...actionSettingSchema,
        id: nextID,
        act_id: nextID,
        name: actionSettingName,
      };

      appMetadata = {
        ...appMetadata,
        actions: appMetadata.actions.concat(action),
        action_settings: appMetadata.action_settings.concat(actionSetting),
      };
      break;

    case DBActionTypes.removePhase:
      deletePhase(metadata.id);
      break;
    case DBActionTypes.removeState:
      deleteState(metadata.id);
      break;
    case DBActionTypes.removeAction:
      deleteAction(metadata.id);
      break;
    default:
      break;
  }
};

app.get("/get-app-metadata", (req, res) => {
  const items = [{ result: JSON.stringify({ DEV: appMetadata }) }];
  res.send({
    items: items,
  });
});

app.post("/change-app-data", (req, res) => {
  console.log("POST request triggered");
  console.log(req.body);
  const changeType = req.body.change_type;
  const metadata = req.body;
  delete metadata.change_type;
  handleAppDataChange(metadata, changeType);

  res.end("");
});

app.listen(port, () => {
  console.log("Server started");
});

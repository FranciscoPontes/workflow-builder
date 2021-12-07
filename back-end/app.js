const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const appMetadata = {
  DEV: {
    app_code: "OWP",
    request_types: [
      {
        id: 9861,
        code: "PARENT_REQT",
      },
      {
        id: 10361,
        code: "CHILD_REQUEST",
      },
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
    actions: [
      {
        id: 24384,
        active_yn: "Y",
        code: "EXECUTION_IN_PROGRESS",
        label: "In progress",
        reqt_id: 9742,
        sta_id: 13982,
        user_action_yn: "Y",
        action_type: "STATUS_CHANGE",
        sort_order: 9310,
      },
    ],
    action_settings: [
      {
        id: 40996,
        app_id: 5221,
        active_yn: "Y",
        act_id: 24384,
        name: "NEXT_STATE_CODE_1",
        label: "Next State Code",
        description: null,
        type: "STRING",
        string_value: null,
        number_value: null,
        date_value: null,
        framework_yn: "Y",
      },
      {
        id: 40997,
        app_id: 5221,
        active_yn: "Y",
        act_id: 24384,
        name: "UI_BUTTON_NAME_1",
        label: "UI button id/name",
        description: "Set the button name/id. Default: action code",
        type: "STRING",
        string_value: null,
        number_value: null,
        date_value: null,
        framework_yn: "Y",
      },
      {
        id: 40998,
        app_id: 5221,
        active_yn: "Y",
        act_id: 24384,
        name: "UI_BUTTON_LABEL_1",
        label: "UI button label",
        description: "Set the button label. Default: action label",
        type: "STRING",
        string_value: null,
        number_value: null,
        date_value: null,
        framework_yn: "Y",
      },
      {
        id: 40999,
        app_id: 5221,
        active_yn: "Y",
        act_id: 24384,
        name: "UI_BUTTON_POSITION_1",
        label: "UI button position",
        description:
          "Set the button position (top-left, top-right, bottom-left, bottom-right). Default: bottom-right",
        type: "STRING",
        string_value: null,
        number_value: null,
        date_value: null,
        framework_yn: "Y",
      },
      {
        id: 41000,
        app_id: 5221,
        active_yn: "Y",
        act_id: 24384,
        name: "UI_BUTTON_IMAGE_1",
        label: "UI button image",
        description: "Set the button icon. Default: none",
        type: "STRING",
        string_value: null,
        number_value: null,
        date_value: null,
        framework_yn: "Y",
      },
    ],
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
  },
};

const handleAppDataChange = (metadata, changetype) => {
  console.log(`Change type received ${changetype}`);
  console.log(metadata);
};

app.get("/get-app-metadata", (req, res) => {
  const items = [{ result: JSON.stringify(appMetadata) }];
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
});

app.listen(port, () => {
  console.log("Server started");
});

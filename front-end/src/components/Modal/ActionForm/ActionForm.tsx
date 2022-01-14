import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { IConfirmationData } from "../../UIConfirmation/UIConfirmation";
import { useEffect } from "react";
import { DBActionTypes } from "../../../services/dbActionTypes";
import {
  EActionTypes,
  IAction,
  IActionSetting,
} from "../../workflowItems/Action/Action";
import { stateDefinition } from "../../workflowItems/State/State";
import { formatCode, formatLabel } from "../../../utils/inputFormatter";
import { EseverityTypes, ISnackbarData } from "../../SnackBar/SnackBar";
import { ESwitch, TStore } from "../../../types/types";
import CustomSwitch from "../../Switch";
import Box from "@mui/material/Box";
import ButtonRegion from "../ButtonRegion";
import {
  useCalculateNewSortOrder,
  useDeleteElement,
  useUploadFormData,
} from "../formHooks";

const useStyles = {
  root: {
    "& > *": {
      width: 1,
    },
  },
  formControl: {
    width: 1,
  },
  selectEmpty: {
    mt: 2,
  },
  actionForm: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    width: 0.65,
    m: "auto",
  },

  formRow: {
    display: "flex",
    justifyContent: "center",
  },
};

interface IActionForm {
  props: IAction;
}

const ActionForm = ({ props }: IActionForm) => {
  const workflowData = useSelector((state: TStore) => state.workflowData);
  const appID = useSelector((state: TStore) => state.appData.appID);
  const classes = useStyles;
  const selectedState = useSelector((state: TStore) => state.selectedState);

  const [closeFormAfterwards, setCloseFormAfterwards] = useState(true);

  const validActionTypes: Array<EActionTypes> = [
    EActionTypes.mail,
    EActionTypes.plsql,
    EActionTypes.stateChange,
  ];

  const actionTypeActionSettingMapping = {
    [EActionTypes.mail]: "MAIL_TEMPLATE_CODE",
    [EActionTypes.plsql]: "PLSQL_FUNCTION_NAME",
    [EActionTypes.stateChange]: "NEXT_STATE_CODE_1",
  };

  const actionTypeActionSettingLabelMapping = {
    [EActionTypes.mail]: "Mail template code",
    [EActionTypes.plsql]: "PLSQL Function Name",
    [EActionTypes.stateChange]: "Next state code",
  };

  const getCorrectActionSetting = (): Array<IActionSetting> =>
    props.action_settings?.filter(
      (acts) => acts.name === actionTypeActionSettingMapping[props?.action_type]
    );

  const [data, setData] = useState<IAction>({
    action_type: props?.action_type || "",
    code: props?.code || "",
    id: props?.id || null,
    label: props?.label || "",
    sta_id: props?.sta_id || selectedState || "",
    user_action_yn: props?.user_action_yn || ESwitch.y,
    sort_order: props?.sort_order,
    action_settings: props?.id ? getCorrectActionSetting() : [],
    reqt_id: props?.reqt_id || "",
  });

  const snackbarData: ISnackbarData = {
    content: `Action ${!data.id ? "created" : "updated"}!`,
    severity: EseverityTypes.success,
    show: true,
  };

  const actionSettingValue: string =
    data.action_settings[0]?.string_value || "";

  const getNewSortOrder = useCalculateNewSortOrder(
    workflowData.actions?.filter((act) => act.sta_id === data.sta_id)
  );

  const stateArray = (): Array<{ id: number; label: string }> =>
    workflowData.states?.map((sta: stateDefinition) => ({
      id: sta.id,
      label: sta.code,
    }));

  const mailTemplates = () => workflowData.mail_templates?.map((mt) => mt.code);

  const requestTypes = () => workflowData.request_types?.map((reqt) => reqt);

  const actionData = {
    ...data,
    app_id: appID,
    reqt_id: data.reqt_id !== "" ? data.reqt_id : null,
    sta_id: data.sta_id !== "" ? data.sta_id : null,
  };

  const dataToPost = {
    actions: [actionData],
    change_type: DBActionTypes.updateActions,
  };

  const customErrorMessage = `Error ${
    !data.id ? "creating" : "updating"
  } action!`;

  const [cleanModal, setCleanModal, uploadData] = useUploadFormData({
    dataToPost,
    customErrorMessage,
    hideModalAfterwards: data.id !== null || (!data.id && closeFormAfterwards),
    snackbarData,
  });

  useEffect(() => {
    if (cleanModal) {
      setData({
        ...data,
        id: null,
        code: "",
        label: "",
        sort_order: null,
      });
      setCleanModal(false);
    }
  }, [cleanModal]);

  const saveData = async (formikData, setSubmitting) => {
    uploadData(setSubmitting);
  };

  const confirmDeleteDialogMetadata: IConfirmationData = {
    title: "Delete Action?",
    description:
      "This action will delete all associated dependencies (action settings)",
    callback: null,
  };

  const tryDelete = useDeleteElement({
    dataToPost: {
      change_type: DBActionTypes.removeAction,
      id: props?.id,
    },
    customErrorMessage: "Error deleting action!",
    customSuccessMessage: "Action deleted!",
    snackbarData,
    confirmDeleteDialogMetadata,
  });

  // when adding new states, keep increasing new sort order for quick batch insert
  useEffect(() => {
    if (!data.id) {
      setData({
        ...data,
        sort_order: getNewSortOrder(),
      });
    }
  }, [workflowData]);

  // update new sort order when selected phase changes
  useEffect(() => {
    if (data.id) return;
    setData({
      ...data,
      sort_order: getNewSortOrder(),
    });
  }, [data.sta_id]);

  return (
    <Formik
      initialValues={data}
      onSubmit={(formikData, { setSubmitting }) =>
        saveData(formikData, setSubmitting)
      }
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box sx={{ ...classes.root, ...classes.actionForm }}>
          <Box sx={{ ...classes.formRow }}>
            <Box
              sx={{
                width: 1,
                ml: "5px",
                display: "flex",
                "& .MuiFormGroup-root": {
                  justifyContent: "center",
                },
              }}
            >
              <CustomSwitch
                label="User Action"
                active={data.user_action_yn}
                onChange={() =>
                  setData({
                    ...data,
                    user_action_yn:
                      data.user_action_yn === ESwitch.y ? ESwitch.n : ESwitch.y,
                  })
                }
              />
            </Box>
            <FormControl variant="outlined" sx={{ ...classes.formControl }}>
              <InputLabel>State</InputLabel>
              <Select
                value={data.sta_id}
                onChange={(e) => setData({ ...data, sta_id: e.target.value })}
                label="State"
                required
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {stateArray()?.map((sta) => (
                  <MenuItem key={sta.id} value={sta.id}>
                    {sta.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ ...classes.formRow, ...classes.noMarginRight }}>
            <FormControl
              variant="outlined"
              sx={{ ...classes.formControl, mr: 1 }}
            >
              <InputLabel>Request type</InputLabel>
              <Select
                value={data.reqt_id}
                onChange={(e) =>
                  setData({ ...data, reqt_id: parseInt(e.target.value) })
                }
                label="Request Type"
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {requestTypes()?.map((reqt) => (
                  <MenuItem key={reqt.id} value={reqt.id}>
                    {reqt.code}
                  </MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>
                Leave null to apply to all request types
              </FormHelperText> */}
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{ ...classes.formControl, ...classes.noMarginRight }}
            >
              <InputLabel>Action Type</InputLabel>
              <Select
                value={data.action_type}
                onChange={(e) =>
                  setData({ ...data, action_type: e.target.value })
                }
                label="Action Type"
                required
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {validActionTypes.map((actt, idx) => (
                  <MenuItem key={idx} value={actt}>
                    {actt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            autoFocus
            label="Code"
            variant="outlined"
            value={data.code}
            onChange={(e) =>
              setData({
                ...data,
                code: formatCode(e.target.value),
                label: data.id ? data.label : formatLabel(e.target.value),
              })
            }
            required
          />
          <TextField
            label="Label"
            variant="outlined"
            value={data.label}
            onChange={(e) => setData({ ...data, label: e.target.value })}
            required
          />

          {data.id ? (
            data.action_type === EActionTypes.stateChange ? (
              <FormControl variant="outlined" sx={{ ...classes.formControl }}>
                <InputLabel>Next state code</InputLabel>
                <Select
                  value={actionSettingValue}
                  onChange={(e) =>
                    setData({
                      ...data,
                      action_settings: [
                        {
                          ...data.action_settings[0],
                          string_value: e.target.value,
                        },
                      ],
                    })
                  }
                  label="Next state code"
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {stateArray()
                    ?.filter((sta) => sta.id !== data.sta_id)
                    .map((sta) => (
                      <MenuItem key={sta.label} value={sta.label}>
                        {sta.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            ) : data.action_type === EActionTypes.mail ? (
              <FormControl variant="outlined" sx={{ ...classes.formControl }}>
                <InputLabel>Mail Template code</InputLabel>
                <Select
                  value={actionSettingValue}
                  onChange={(e) =>
                    setData({
                      ...data,
                      action_settings: [
                        {
                          ...data.action_settings[0],
                          string_value: e.target.value,
                        },
                      ],
                    })
                  }
                  label="Mail Template code"
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {mailTemplates()?.map((mt) => (
                    <MenuItem key={mt} value={mt}>
                      {mt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                label={actionTypeActionSettingLabelMapping[data.action_type]}
                variant="outlined"
                value={actionSettingValue}
                sx={{ ...classes.formControl }}
                onChange={(e) =>
                  setData({
                    ...data,
                    action_settings: [
                      {
                        ...data.action_settings[0],
                        string_value: e.target.value,
                      },
                    ],
                  })
                }
              />
            )
          ) : null}
          <ButtonRegion
            closeFormAfterwards={(value) => setCloseFormAfterwards(value)}
            handleSubmit={handleSubmit}
            id={data?.id}
            isSubmitting={isSubmitting}
            tryDelete={tryDelete}
          />
        </Box>
      )}
    </Formik>
  );
};

export default ActionForm;

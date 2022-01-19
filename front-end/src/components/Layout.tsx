import React, { Fragment, useState } from "react";
import {
  TMailTemplates,
  TRequestTypes,
  WorkflowBox,
  workflowData,
} from "./WorkflowBox/WorkflowBox";
import { EModalTypes, IModal, SimpleModal } from "./Modal/Modal";
import { useEffect } from "react";
import { DBService } from "../services/db_communication";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackbar, { EseverityTypes } from "./SnackBar/SnackBar";
import { actionTypes } from "../store/actionTypes";
import UIConfirmation from "./UIConfirmation/UIConfirmation";
import { IPermission } from "./workflowItems/Permission/Permission";
import { IAction, IActionSetting } from "./workflowItems/Action/Action";
import LeftPanel from "./LeftPanel/LeftPanel";
import { TStore } from "../types/types";
import { phaseDefinition } from "./workflowItems/Phase/Phase";
import { stateDefinition } from "./workflowItems/State/State";
import { Box } from "@mui/material";
import useBECommunication from "../services/useBECommunication";

enum EDBTiers {
  DEV = "DEV",
  Q = "Q",
  PROD = "PROD",
}

type TLayout = {
  appCode: string;
  DBTier: EDBTiers;
  appID: number;
};

export interface ILayout {
  props: TLayout;
}

const styles = {
  layout: {
    display: "flex",
    height: "90vh",
    p: 2,
    width: "100%",
  },

  objectList: {
    display: "flex",
    flexFlow: "column",
    mt: "20px",
  },
};

// objet panel in the left + workflow box
const Layout = ({ props }: ILayout) => {
  const refresh = useSelector((state: TStore) => state.triggerRefresh);
  const dispatch = useDispatch();
  const workflowData = useSelector((state: TStore) => state.workflowData);
  const modalData = useSelector((state: TStore) => state.modalData);

  const preparePhases = (data: workflowData): Array<phaseDefinition> => {
    return data.phases?.map((pha) => {
      const treatedPhase: phaseDefinition = {
        id: pha.id,
        code: pha.code,
        label: pha.label,
        sort_order: pha.sort_order,
        active_yn: pha.active_yn,
      };
      return treatedPhase;
    });
  };

  const prepareStates = (data: workflowData): Array<stateDefinition> => {
    return data.states?.map((sta) => {
      const treatedState: stateDefinition = {
        id: sta.id,
        pha_id: sta.pha_id,
        code: sta.code,
        label: sta.label,
        sort_order: sta.sort_order,
        active_yn: sta.active_yn,
      };
      return treatedState;
    });
  };

  const preparePermissions = (data: workflowData): Array<IPermission> => {
    return data.permissions?.map((per) => {
      const treatedPer: IPermission = {
        id: per.id,
        sta_id: per.sta_id,
        reqt_id: per.reqt_id,
        permission_type: per.permission_type,
        user_type: per.user_type,
        username: per.username,
      };
      return treatedPer;
    });
  };

  const getActionSettings = (
    data: object,
    actID: number
  ): Array<IActionSetting> =>
    data.action_settings?.filter((acts) => acts.act_id === actID);

  const prepareActions = (data: workflowData): Array<IAction> => {
    return data.actions?.map((act) => {
      const treatedAct: IAction = {
        id: act.id,
        code: act.code,
        label: act.label,
        sta_id: act.sta_id,
        user_action_yn: act.user_action_yn,
        action_type: act.action_type,
        sort_order: act.sort_order,
        action_settings: getActionSettings(data, act.id),
        reqt_id: act.reqt_id,
        active_yn: act.active_yn,
      };
      return treatedAct || [];
    });
  };

  const prepareMailTemplates = (data: workflowData): TMailTemplates => {
    return data.mail_templates?.map((mailt) => {
      return { code: mailt.code };
    });
  };

  const prepareRequestTypes = (data: workflowData): TRequestTypes => {
    return data.request_types?.map((reqt) => {
      return { id: reqt.id, code: reqt.code };
    });
  };

  const arrangedTemplateData = (data: workflowData): workflowData => ({
    phases:
      preparePhases(data)?.sort((x, y) => x.sort_order - y.sort_order) || [],
    states:
      prepareStates(data)
        ?.sort((x, y) => x.sort_order - y.sort_order)
        .sort((x, y) => x.pha_id - y.pha_id) || [],
    permissions: preparePermissions(data) || [],
    actions:
      prepareActions(data)
        ?.sort((x, y) => x.sort_order - y.sort_order)
        .sort((x, y) => x.sta_id - y.sta_id) || [],
    mail_templates: prepareMailTemplates(data) || [],
    request_types: prepareRequestTypes(data) || [],
  });

  const [getApplicationData] = useBECommunication();

  /**
   * Refresh application data from ORDS endpoint
   */
  const refreshData = async () => {
    await getApplicationData({
      appMetadata: props,
      customErrorMessage: "Error fetching app data.",
      onTreatDataCallback: arrangedTemplateData,
    });
  };

  // set app data
  useEffect(() => {
    dispatch({ type: actionTypes.setAppData, data: props });
  }, []);

  useEffect(() => {
    (async () => {
      refreshData();
      if (refresh) dispatch({ type: actionTypes.stopRefresh });
    })();

    return () => null;
  }, [refresh]);

  return (
    <Box sx={{ ...styles.layout, bgcolor: "rgba(0, 0, 0, 0.12)" }}>
      {workflowData ? (
        <Fragment>
          <LeftPanel />
          <WorkflowBox />
          {modalData ? (
            <SimpleModal
              isOpen={modalData.isOpen || false}
              title={modalData.title}
              description={modalData.description}
              type={modalData.type}
              metadata={modalData.metadata}
            />
          ) : null}
          <CustomSnackbar />
          <UIConfirmation />
        </Fragment>
      ) : (
        <CustomSnackbar />
      )}
    </Box>
  );
};

export default Layout;

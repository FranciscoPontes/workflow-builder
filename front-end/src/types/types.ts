import { workflowData } from "../components/WorkflowBox/WorkflowBox";
import { EseverityTypes } from "./../components/SnackBar/SnackBar";

enum EDBTiers {
  DEV = "DEV",
  Q = "Q",
  PROD = "PROD",
}

enum ESwitch {
  y = "Y",
  n = "N",
}

type TStore = {
  triggerRefresh: boolean;
  workflowData: workflowData;
  modalData: {
    isOpen: boolean;
    title: string;
    description: string;
    type: string;
    metadata: string;
  };
  snackbarData: {
    show: boolean;
    content: string;
    severity: EseverityTypes;
  };
  confirmationData: {
    open: boolean;
    title: string;
    description: string;
    callback: string;
  };
  appData: {
    appID: string;
    appCode: string;
    DBTier: string;
  };
  selectedPhase: number;
  selectedState: number;
  collapsedPhases: Array<number>;
};

export { TStore, ESwitch, EDBTiers };

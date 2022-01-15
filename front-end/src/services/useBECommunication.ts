import { workflowData } from "../components/WorkflowBox/WorkflowBox";
import { useDispatch } from "react-redux";
import axios from "axios";
import { actionTypes } from "../store/actionTypes";
import { EseverityTypes, ISnackbarData } from "../components/SnackBar/SnackBar";
import { useEndpoints } from "..";

type TAppMetadata = {
  appCode: string;
  DBTier: string;
};

interface IGetAppData {
  appMetadata: TAppMetadata;
  customErrorMessage: string;
  onTreatDataCallback: (data: workflowData) => workflowData;
}

const useBECommunication = () => {
  const dispatch = useDispatch();

  const { getEndpoint, postEndpoint } = useEndpoints();

  const _getApplicationData = async (): Promise<any> =>
    await axios.get(getEndpoint);

  const _changeData = async (data: object): Promise<any> =>
    await axios.post(postEndpoint, data);

  const getApplicationData = async ({
    appMetadata,
    customErrorMessage,
    onTreatDataCallback,
  }: IGetAppData): Promise<any> =>
    await _getApplicationData()
      .then((res) => {
        console.group("Application data received");
        console.log(res);
        console.groupEnd();

        const allData = JSON.parse(res.data.items[0].result);
        dispatch({
          type: actionTypes.updateData,
          data: onTreatDataCallback(allData[appMetadata.DBTier]),
        });
      })
      .catch((err) => {
        console.error(`${customErrorMessage} ${err.message}`);
        dispatch({
          type: actionTypes.updateSnackbar,
          data: {
            show: true,
            severity: EseverityTypes.error,
            content: `${customErrorMessage} ${err.message}`,
          },
        });
      });

  const changeData = async (
    data: object,
    snackbarData: ISnackbarData,
    customErrorMessage: string
  ) => {
    await _changeData(data)
      .then(() => {
        dispatch({ type: actionTypes.refresh });
        dispatch({
          type: actionTypes.updateSnackbar,
          data: snackbarData,
        });
        // dispatch({ type: actionTypes.hideModal });
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({
          type: actionTypes.updateSnackbar,
          data: {
            ...snackbarData,
            severity: EseverityTypes.error,
            content: `${customErrorMessage} ${err.message}`,
          },
        });
      });
  };

  return [getApplicationData, changeData];
};

export default useBECommunication;

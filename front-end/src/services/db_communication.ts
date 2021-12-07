import axios from "axios";

interface IGetAppData {
  appCode: string;
  DBTier: string;
}

const getApplicationData = async ({
  appCode,
  DBTier,
}: IGetAppData): Promise<any> =>
  // await axios
  // .get(`${window.baseURL}req-app-config/app_configuration/${appCode}`)
  await axios.get(`http://localhost:3000/get-app-metadata`).then((res) => {
    console.log(res);
    const allData = JSON.parse(res.data.items[0].result);
    return allData[DBTier];
  });

const changeData = async (data): Promise<any> =>
  await axios.post(`http://localhost:3000/change-app-data`, data);
// await axios.post(`${window.baseURL}req-app-config/change_app_data`, data);

export const DBService = { getApplicationData, changeData };

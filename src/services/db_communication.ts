import axios from 'axios'

interface IGetAppData {
  appCode: string
  DBTier: string
}

const getApplicationData = async ({
  appCode,
  DBTier,
}: IGetAppData): Promise<any> =>
  await axios
    .get(`${window.baseURL}req-app-config/app_configuration/${appCode}`)
    .then((res) => {
      const allData = JSON.parse(res.data.items[0].result)
      return allData[DBTier]
    })
    .catch((error) => console.error(error))

const addPhase = async (data): Promise<any> =>
  await axios
    .post(`${window.baseURL}req-app-config/phases`, data)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => console.error(error))

export const DBService = { getApplicationData, addPhase }

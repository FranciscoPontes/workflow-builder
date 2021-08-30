import axios from 'axios';

// TODO: setting IN APEX
axios.defaults.baseURL = 'https://q-apex.ams.com/ords/appsq/req_owner/';

interface IGetAppData {
    appCode: string,
    DBTier: string
}

const getApplicationData = async ({appCode, DBTier} : IGetAppData) : Promise<any> => await axios.get(`req-app-config/app_configuration/${appCode}`)
                                                                                .then( res => { 
                                                                                    const allData = JSON.parse(res.data.items[0].result);
                                                                                    return allData[DBTier];
                                                                                 } )
                                                                                .catch(error => console.error(error))

export const DBService = { getApplicationData }                                                                
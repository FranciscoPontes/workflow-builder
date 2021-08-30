import axios from 'axios';

const { REACT_ORDS_BASE_ENDPOINT } = process.env;

axios.defaults.baseURL = REACT_ORDS_BASE_ENDPOINT;

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
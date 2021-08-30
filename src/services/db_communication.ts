import axios from 'axios';

// TODO: setting IN APEX
axios.defaults.baseURL = 'https://q-apex.ams.com/ords/appsq/req_owner/';

const getApplicationData = async (appCode : string) : Promise<any> => await axios.get(`req-app-config/app_configuration/${appCode}`)
                                                                                .then( res => res.data.items[0].result )
                                                                                .catch(error => console.error(error))

export const DBService = { getApplicationData }                                                                
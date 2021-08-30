import axios from 'axios';

axios.defaults.baseURL = 'https://q-apex.ams.com/ords/appsq/req_owner/';

const getApplicationData  = (appCode : string) : Object => axios.get(`req-app-config/app_configuration/${appCode}`)
                                                                .then( res => res)
                                                                .catch(error => console.error(error))

export const DBService = { getApplicationData }                                                                
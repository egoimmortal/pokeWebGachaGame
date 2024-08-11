import { SERVERMETHOD } from "./serverMethod";

export default async function fetchData(method: SERVERMETHOD, api = '', params = {}, token = ''){
    const config = useRuntimeConfig().public.apiUrl;
    const apiUrl = config + api;
    console.log('===fetchData===');
    if(api == ''){
        console.log('缺少指定api');
    }
    console.log('config = ', config);
    console.log('apiUrl = ', apiUrl);
    console.log('method = ', method);
    console.log('params = ', params);
    console.log('token = ', token);

    const rs: any =  await $fetch(apiUrl, {
        method: method,
        params: params,
        onResponse(rs){
            console.log(rs);
        }
    });

    return rs;
}
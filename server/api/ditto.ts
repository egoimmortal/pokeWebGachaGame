import fetchData from "../utils/fetchData";
import { SERVERMETHOD } from "../utils/serverMethod";

export default defineEventHandler(async(event) => {
    const body = await readBody(event);

    console.log('===ditto===');
    console.log('body = ', body);

    let rs = await fetchData(SERVERMETHOD.GET, 'pokemon/ditto');
    console.log('===ditto===');
    console.log('rs = ', rs);

    return rs;
    // return rs;
})
export default defineEventHandler(async(event) => {
    const body = await readBody(event);

    console.log('===pokemon===');
    console.log('body = ', body);

    let rs = await fetchData(SERVERMETHOD.GET, 'pokemon-form/' + body.id);
    console.log('===pokemon rs===');
    console.log('rs = ', rs);

    return rs;
})
const webScraper = require('./src/utils/webScraper');
//run over night
async function run() {
    let ids = ['Moon','Apollo_13'];
    for (let i = 0; i < ids.length; i++) {
        await webScraper.parsePagesWithDepth(ids[i],0,null,true,true);
    }
}
run();
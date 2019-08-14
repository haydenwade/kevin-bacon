const webScraper = require('./src/utils/webScraper');
//run over night
async function run() {
    let ids = ['Kevin_Bacon','Taj_Mahal','Philosophy'];
    for (let i = 0; i < ids.length; i++) {
        await webScraper.parsePagesWithDepth(ids[i],1,null,true,true);
    }
}
run();
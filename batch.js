const webScraper = require('./src/utils/webScraper');
//run over night
async function run() {
    let ids = ['Kevin_Bacon','A_Few_Good_Men','Peter_Thiel','Cleveland','Moon','Apollo_13','Taj_Mahal','Philosophy','Footloose_(1984_film)','Tom_Cruise'];
    for (let i = 0; i < ids.length; i++) {
        await webScraper.parsePagesWithDepth(ids[i],0,null,true,true);
    }
}
run();
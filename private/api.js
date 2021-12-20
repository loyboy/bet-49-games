process.setMaxListeners(0);

const http = require('http');


(async function () {
  
    const router = require('./router');
    const bot = require('./bot');

    void bot(); 

    http.createServer(router).listen(8070);
})();


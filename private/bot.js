const puppeteer  = require('puppeteer');
const fetch      = require('node-fetch');
const useragent  = require('user-agents');
const cmd        = require('child_process').exec;
const agent      = new useragent({deviceCategory:'desktop'});
const rstring    = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
var fs = require('fs');


const random     = function(length) {
  let t = rstring.length - 1;
  let c = '';
  while (c.length < length) {
    c += rstring.charAt(Math.round(Math.random() * t));
  }
  return c;
};
const sleep      = function(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};
const range    = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


let loginurl     = "";
let loggedin     = false;

let debugmode    = true;

let f            = parseFloat;
let i            = parseInt;
let browser;


let debug           = function(text) {
  if (debugmode) console.log(text);
};

let reset = function() {
  return setTimeout(() => {
   
    void debug('24 Hour reset');
    shell.exec('pkill chrome')
   
    void setTimeout(() => process.exit(0), 1e4);
  }, 6000);
};


let data_get        = async function(type, coin) {
 let browser2  = await puppeteer.launch({
    args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--window-size=1920x1080',
      `--user-agent=${agent.random().toString()}`
    ],
    headless: true,
    ignoreHTTPSErrors: true
  });
  let page    = await browser2.newPage();
  let pageurl = url(type, coin);
  let result  = false;
  try {
    await page.setViewport({width:1920,height:1080});
    await page.goto(pageurl, {waitUntil: "load", timeout: 2e4});
  }
  catch(err) {
    void evidence(page);
  }
  debug('1st wait for timeout');
  await page.waitFor(4000);
  try {
    result = JSON.parse(await page.evaluate('document.body.innerText'));
  }
  catch(err) {
    debug('Data retrieval failed.' + err);
  }
  finally {
    await page.close();
    await browser2.close()
    return result;
  }
};



let presskey        = async function(page, times, key) {
  for (let i = 0; i < times; i++) {
    await page.keyboard.down(key);
    await page.keyboard.up(key);
  }
  return;
};


let pressreturn     = async function(page) {
  await page.keyboard.down('Shift');
  await page.keyboard.down('Enter');
  await page.keyboard.up('Enter');
  await page.keyboard.up('Shift');
  return;
};


let typeword        = async function(page, word, tab) {
  for (let letter of word.split('')) {
    await presskey(1, 'Shift');
    await page.keyboard.sendCharacter(letter);
  }
  if (tab) {
    await presskey(page, 1, "Tab");
    await sleep(range(900,2156));
  }
  return;
};


let typemessage     = async function(page, message) {
  const msg = message.split("");
  for (const i of msg) {
    if (i == "\n" || i == '\t' || i == '\r') {
      await pressreturn(page);
    }
    else if (i == " ") {
      await presskey(page, 1, 'Space');
    }
    else {
      await page.keyboard.sendCharacter(i);
    }
  }
  return;
};


let evidence        = async function(page, offer) {
  if (!debugmode) return;
  try {
    let filename = offer ? "/home/public/app/evidence-" + offer + ".jpeg" : "/home/public/app/evidence.jpeg";
    
    await page.screenshot({
      path: filename,
      fullPage: true,
      type: 'jpeg',
      quality: 80
    });
    void browsercheck();
  }
  catch(err) {}
  return;
};




let clicknumber     = async function(page, number) {
  try {
    let k = document.querySelectorAll('.ball-grid').forEach(function(item,index) {
      //check if its the first row
     var found_row1 =  ['1','2','3','4','5','6','7','8','9','10','11','12'].find((x) => x === number );// Row 1
     if(found_row1){
       if (index === 0){
        let parent = item.querySelector('.ball-grid__row');
        let child = parent.children[ i(number) - 1];
        child.click();
       }
     }

     var found_row2 =  ['13','14','15','16','17','18','19','20','21','22','23','24'].find((x) => x === number );// Row 2
     if(found_row2){
       if (index === 1){
        let parent = item.querySelector('.ball-grid__row');
        let child = parent.children[ i(number) - 1];
        child.click();
       }
     }

     var found_row3 =  ['25','26','27','28','29','30','31','32','33','34','35','36'].find((x) => x === number );// Row 3
     if(found_row3){
       if (index === 2){
        let parent = item.querySelector('.ball-grid__row');
        let child = parent.children[ i(number) - 1];
        child.click();
       }
     }

     var found_row4 =  ['37','38','39','40','41','42','43','44','45','46','47','48'].find((x) => x === number );// Row 4
     if(found_row4){
       if (index === 3){
        let parent = item.querySelector('.ball-grid__row');
        let child = parent.children[ i(number) - 1];
        child.click();
       }
     }

     var found_row5 =  ['49'].find((x) => x === number );// Row 5
     if(found_row5){
       if (index === 4){
        let parent = item.querySelector('.ball-grid__row');
        let child = parent.children[ i(number) - 1];
        child.click();
       }
     }


  });  

  } catch(err) {
    return false;
  }
};

let clearselection  = async function(page) {
  try {
    return await page.evaluate(() => {
      var clearselectionparent = document.querySelector('.game__rs');
      var clearselectionchild1 = clearselectionparent.children[1];
      var clearselectionchild2 = clearselectionchild1.children[1];
      var selectiondiv = clearselectionchild2.querySelector('.g-ctrl__item');
      var innerselectiondiv = selectiondiv.querySelector('.g-btn');
      innerselectiondiv.click();
    });
  } catch(err) {
    return false;
  }
};

let placebet  = async function(page) {
  try {
    return await page.evaluate(() => {
      var stakesparent = document.querySelector('.stakes__body');
      var stakeschild1 = stakesparent.children[2];
      var innerplacebetlink = stakeschild1.querySelector('.place-bet');
      console.log(innerplacebetlink);
      innerplacebetlink.click();
    });
  } catch(err) {
    return false;
  }
};


let bot   = async function() {
  /*browser  = await puppeteer.launch({
    args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--window-size=1920x1080',
      `--user-agent=${agent.random().toString()}`
    ],
    headless: true,
    ignoreHTTPSErrors: true
  });*/
  
  void data_getrates();
  void reset();
  
  while (!hasprices && !hasoffers) {
    await sleep(1e3);
  } 

};

module.exports = bot;

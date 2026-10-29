const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
let p=await b.newPage({viewport:{width:794,height:1123},deviceScaleFactor:2});await p.goto('file://'+__dirname+'/cover.html');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/cover.png'});
p=await b.newPage({viewport:{width:400,height:60},deviceScaleFactor:4});await p.goto('file://'+__dirname+'/header.html');await p.waitForTimeout(300);await (await p.$('#l')).screenshot({path:__dirname+'/header-logo.png',omitBackground:true});
await b.close();})();

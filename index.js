const pup = require("puppeteer");
const base = "sonic";
const color = "purple";
const number = 10;
const layout = "square";
var imgs = [];
var current = number;
console.log("starting");
(async ()=>{
const browser = await pup.launch({headless:true});
const tab = await browser.newPage();
console.log("opening tab...");
await tab.goto(`https://duckduckgo.com/?t=lm&q=${escape(base)}&iax=images&ia=images&iaf=color%3A${color.replace(/[^a-z]/g,"")[0].toUpperCase()}${color.toLowerCase().replace(/[^a-z]/g,"").substring(1)}%2Csize%3AWallpaper%2Clayout%3A${layout.replace(/[^a-z]/g,"")[0].toUpperCase()}${layout.toLowerCase().replace(/[^a-z]/g,"").substring(1)}`,
{waitUntil:"networkidle2"})
console.log("opening image...");
await tab.evaluate(`document.querySelectorAll("#zci-images img")[0].click()`);
await tab.waitForNavigation({waitUntil:"networkidle0"});
console.log("ok")
while (current > 0) {
current--;
var img = await tab.evaluate(`document.querySelector(".detail__media__img-highres").src`);
console.log(img);
imgs.push(img);
await tab.evaluate(`document.querySelector(".js-detail-next").click()`);
await tab.waitForNetworkIdle({idleTime:1000});
}
console.log("done!");
await browser.close();

console.log("saving...");
var fs = require("fs");
fs.writeFileSync("wallp-"+number+"x-"+base+"-"+color+"-"+layout+".json",JSON.stringify(imgs));
console.log("finished")

})()

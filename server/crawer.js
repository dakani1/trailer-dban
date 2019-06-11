const puppeteer = require('puppeteer');

(async () => {
  const pageUrl = 'https://movie.douban.com/explore#!type=movie&tag=%E7%BB%8F%E5%85%B8&sort=time&page_limit=20&page_start=0'
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, {
    waitUntil: 'networkidle2'
  });
  await page.evaluate(function () {
    
  });
  await browser.close();
})();
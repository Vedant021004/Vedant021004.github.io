import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://giphy.com/search/crawling-ant-transparent', { waitUntil: 'networkidle2' });
  
  const gifUrl = await page.evaluate(() => {
    // Find the first GIF that actually looks like an ant
    const imgs = Array.from(document.querySelectorAll('img'));
    const gif = imgs.find(img => img.src.includes('giphy.com/media/') && !img.src.includes('transparent'));
    return gif ? gif.src : null;
  });

  if (gifUrl) {
    console.log("Found GIF URL:", gifUrl);
    // Giphy blocks direct fetch if not careful, but puppeteer page can fetch it!
    const buffer = await page.evaluate(async (url) => {
        const res = await fetch(url);
        const buff = await res.arrayBuffer();
        return Array.from(new Uint8Array(buff));
    }, gifUrl);
    
    fs.writeFileSync('src/assets/ant.gif', Buffer.from(buffer));
    console.log("Downloaded successfully to src/assets/ant.gif");
  } else {
    console.log("No GIF found.");
  }
  
  await browser.close();
})();

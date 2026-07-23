import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Go to Tenor search for realistic ant transparent
  console.log("Searching Tenor...");
  await page.goto('https://tenor.com/search/ant-crawling-gifs', { waitUntil: 'networkidle2' });
  
  console.log("Extracting GIF URL...");
  const gifUrl = await page.evaluate(() => {
    // Find the first GIF image in the results
    const imgs = Array.from(document.querySelectorAll('img'));
    const gif = imgs.find(img => img.src.includes('.gif') || img.src.includes('tenor.com/m/'));
    return gif ? gif.src : null;
  });

  if (gifUrl) {
    console.log("Found GIF URL:", gifUrl);
    // Download it
    const response = await fetch(gifUrl);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync('src/assets/ant.gif', Buffer.from(buffer));
    console.log("Downloaded successfully to src/assets/ant.gif");
  } else {
    console.log("No GIF found.");
  }
  
  await browser.close();
})();

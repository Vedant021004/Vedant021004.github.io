import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  console.log("Navigating to localhost:4173...");
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  console.log("Page loaded. Title:", await page.title());
  
  // click the theme toggle
  console.log("Clicking theme toggle...");
  await page.evaluate(() => {
    const btn = document.querySelector('button[title="Toggle Theme"]');
    if (btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
  console.log("Done.");
})();

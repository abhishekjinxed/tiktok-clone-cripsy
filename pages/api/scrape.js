// pages/api/scrape.js

import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  let browser = null;

  try {
    // Launch Puppeteer with Chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const { q } = req.query;
   

    // Construct the URL with the query parameter
    const searchUrl = `https://prompthero.com/search?q=${encodeURIComponent(q)}`;

//console.log(searchUrl)
    const page = await browser.newPage();
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.the-prompt-text');

    // Extract text content
    const tagTexts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.the-prompt-text')).map(tag =>
        
        tag.textContent.replace(/girl/gi, 'sameera') // Replace "girl" with "sameera", case-insensitive
      
      );
    });

    const imageUrls = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img.img-fluid.prompt-main-image')).map(img =>
        img.getAttribute('src')
      );
    });

    res.status(200).json({ tags: tagTexts,imageUrl: imageUrls});
  } catch (error) {
    console.error('Error scraping:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

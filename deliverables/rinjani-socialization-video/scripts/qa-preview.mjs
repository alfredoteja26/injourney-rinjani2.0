import {chromium} from "playwright";

const browser = await chromium.launch({headless: true});
const page = await browser.newPage({viewport: {width: 1280, height: 720}});

try {
  await page.goto("http://127.0.0.1:3100", {waitUntil: "domcontentloaded"});
  await page.waitForTimeout(2200);
  await page.keyboard.press("Space");
  await page.waitForTimeout(2400);
  await page.screenshot({path: "dist/playwright-preview-playing.png", fullPage: false});

  const metrics = await page.evaluate(() => ({
    title: document.title,
    bodyText: document.body.innerText.slice(0, 700),
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    clientWidth: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    canScrollX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    canScrollY: document.documentElement.scrollHeight > document.documentElement.clientHeight,
  }));

  console.log(JSON.stringify(metrics, null, 2));
} finally {
  await browser.close();
}

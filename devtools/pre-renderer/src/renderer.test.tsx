import { expect, test } from 'vitest'
import { logger } from "./utils/logger.js";
import path from 'path';
import shelljs from 'shelljs';
import fs from 'fs'
import _ from 'lodash';
import puppeteer from 'puppeteer';

let sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

test('laftools-spa-prerenderer', async () => {
  logger.info("hello, world")
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://laftools.cn');

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // sleep 5s
  await sleep(5000);

  // Get the HTML content of the page
  const html = await page.content();
  logger.info("html: " + html)

  await browser.close();
}, {
  timeout: -1
})

import { expect, test } from 'vitest';
import { DataTypes, Model } from 'sequelize';
import path from 'path';
import shelljs from 'shelljs';
import fs from 'fs';
import _ from 'lodash';
let postProcessFolder = path.join(__dirname, 'post-process');
shelljs.mkdir('-p', postProcessFolder);
import puppeteer from 'puppeteer';


test(
  'seo-prerender',
  async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:5173', {
      waitUntil: 'networkidle0',
    });
  },
  {
    timeout: -1,
  }
);

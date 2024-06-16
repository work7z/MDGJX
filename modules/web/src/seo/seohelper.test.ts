import { expect, test } from 'vitest';
import { DataTypes, Model } from 'sequelize';
import path from 'path';
import shelljs from 'shelljs';
import fs from 'fs';
import _ from 'lodash';
import puppeteer from 'puppeteer';
import SeoDetailItemForMDGJX from './seo-list';
import $ from 'cheerio'

test(
  'seo-prerender',
  async () => {
    const webServerDir = path.join(process.env.MDGJX_ROOT as any, 'modules', 'web-server');
    const htmlDir = path.join(
      webServerDir,
      'html'
    )
    shelljs.rm('-rf', htmlDir);
    shelljs.mkdir('-p', htmlDir);
    console.log('SeoDetailItemForMDGJX: ' + JSON.stringify(SeoDetailItemForMDGJX));

    const rootJSON = path.join(htmlDir, 'root.json');
    fs.writeFileSync(rootJSON, JSON.stringify(SeoDetailItemForMDGJX, null, 2));

    const screenshotSubFolder = path.join(webServerDir, 'screenshots');

    shelljs.rm('-rf', screenshotSubFolder);
    shelljs.mkdir('-p', screenshotSubFolder);

    for (let item of SeoDetailItemForMDGJX) {
      for (let eachPath of item.path) {
        const htmlFileName = encodeURIComponent(eachPath) + '-head.html';
        console.log(eachPath);
        console.log('htmlFileName: ' + htmlFileName);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://127.0.0.1:5173${eachPath}`, {
          waitUntil: 'networkidle0',
        });
        await page.waitForSelector('.mantine-AppShell-header', {
          timeout: 10000
        });
        await page.screenshot({
          path: path.join(screenshotSubFolder, encodeURIComponent(eachPath) + '.png'),
        })
        const fullSpaHtml = await page.content();
        let $ele = $.load(`
          <html>
          ${fullSpaHtml}
</html>
        `,null,false);

        $ele('style').remove()
        $ele('script').remove()
        $ele('svg').remove()

        let spaHtml = $ele.html().replaceAll("id=", "data-id=").replaceAll('class=','data-class=') as string;
        console.log('spaHtml: ' + spaHtml)
        await browser.close();

        const f = (str: string) => {
          return str.replaceAll('"', '')
        }
        const completeHTmlFile = path.join(htmlDir, htmlFileName);
        fs.writeFileSync(
          completeHTmlFile,
          `<link rel="dns-prefetch" href="//api.mdgjx.com">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="keywords" content="${f(item.keywords)}">
<meta name="description" content="${f(item.description)}">
<title>${f(item.title)}</title>
`
        );
        const bodyHtmlFileName = encodeURIComponent(eachPath) + '-body.html';
        const completeBodyHtml = path.join(htmlDir, bodyHtmlFileName);
        fs.writeFileSync(
          completeBodyHtml,
          `${spaHtml}`
        );
      }
    }
  },
  {
    timeout: -1,
  }
);

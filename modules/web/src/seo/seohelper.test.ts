import { expect, test } from 'vitest';
import { DataTypes, Model } from 'sequelize';
import path from 'path';
import shelljs from 'shelljs';
import fs from 'fs';
import _ from 'lodash';
import puppeteer from 'puppeteer';
import { fn_getAllSeoDetail, SeoDetail } from './seo-list';
import $ from 'cheerio';
import { sleep } from '@/utils/CommonUtils';
import { MiaodaBasicConfig } from '@/systemModules';

test(
  'seo-prerender',
  async () => {
    const webServerDir = path.join(process.env.MDGJX_ROOT as any, 'modules', 'web-server');
    const htmlDir = path.join(webServerDir, 'html');
    const SeoDetailItemForMDGJX = await fn_getAllSeoDetail();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:5173`, {
      waitUntil: 'networkidle0',
    });
    await page.waitForSelector('.mantine-AppShell-header', {
      timeout: 20000,
    });

    shelljs.mkdir('-p', htmlDir);
    console.log('SeoDetailItemForMDGJX: ' + JSON.stringify(SeoDetailItemForMDGJX));

    const fetchGetFullInfo:{
      data:{
        miaodaConfigs: MiaodaBasicConfig[]
      }
    } = await(
      (await fetch('http://127.0.0.1:5173/local/ext/get-full-info?env=local-config', {})).json()
    );
    console.log('fetchGetFullInfo: ' + JSON.stringify(fetchGetFullInfo));
      fetchGetFullInfo.data.miaodaConfigs.forEach(x=>{
        x.menus.forEach(eachMenu=>{
          eachMenu.children?.forEach(xx=>{
            xx.id;
            SeoDetailItemForMDGJX.push({
              path: [`/${eachMenu.id}/${xx.id}`],
              title: `${xx.name} | ${eachMenu.name}`,
              description: xx.description + '',
              keywords: (xx.keywords || []).join(','),
            });

          })
        })
      })

    const rootJSON = path.join(htmlDir, 'root.json');
    fs.writeFileSync(rootJSON, JSON.stringify(SeoDetailItemForMDGJX, null, 2));

    const screenshotSubFolder = path.join(webServerDir, 'screenshots');

    shelljs.mkdir('-p', screenshotSubFolder);

    for (let item of SeoDetailItemForMDGJX) {
      for (let eachPath of item.path) {
        const htmlFileName = encodeURIComponent(eachPath) + '-head.html';
        console.log(eachPath);
        console.log('htmlFileName: ' + htmlFileName);
        console.log('eachPath: '+eachPath)
        // if(fs.existsSync(path.join(htmlDir, htmlFileName))){
        //   continue;
        // }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://127.0.0.1:5173${eachPath}`, {
          waitUntil: 'networkidle0',
        });
        await page.waitForSelector('.mantine-AppShell-header', {
          timeout: 10000,
        });
        await page.screenshot({
          path: path.join(screenshotSubFolder, encodeURIComponent(eachPath) + '.png'),
        });
        const fullSpaHtml = await page.content();
        let $ele = $.load(
          `
          <html>
          ${fullSpaHtml}
</html>
        `,
          null,
          false
        );

        $ele('style').remove();
        $ele('script').remove();
        $ele('svg').remove();
        $ele('title').remove();
        $ele('meta').remove();
        $ele('link').remove();

        let spaHtml = `
        <div style='color:transparent;display:none;'>
        ${$ele
            .html()
            .replace('<!-- MDGJX_HEAD -->', '')
            .replace('<!-- MDGJX_BODY -->', '')
            .replaceAll('id=', 'data-id=')
            .replaceAll('class=', 'data-class=') as string
          }
        </div>
        `.trim();
        await browser.close();

        const f = (str: string) => {
          return str.replaceAll('"', '');
        };
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
<title>${f(item.title)} - 秒达工具箱(MDGJX)</title>
<script>window.PRE_RENDER_MODE=true</script>
`
        );
        const bodyHtmlFileName = encodeURIComponent(eachPath) + '-body.html';
        const completeBodyHtml = path.join(htmlDir, bodyHtmlFileName);
        fs.writeFileSync(completeBodyHtml, `${spaHtml}`);
      }
    }
  },
  {
    timeout: -1,
  }
);

test('seo-blend-it', async () => {
  const distExampleStr = path.join(process.env.MDGJX_ROOT as any, 'modules', 'web', 'dist-example');
  const WEB_DIST_DIR = process.env.WEB_DIST_DIR || distExampleStr;
  const isLocalTestMode = !process.env.WEB_DIST_DIR;
  const WEB_HTML_DIR =
    process.env.WEB_HTML_DIR ||
    path.join(process.env.MDGJX_ROOT as any, 'modules', 'web-server', 'html');
  console.log('WEB_DIST_DIR: ' + WEB_DIST_DIR);
  console.log('WEB_HTML_DIR: ' + WEB_HTML_DIR);
  if (!WEB_DIST_DIR || !WEB_HTML_DIR) {
    throw new Error('WEB_DIST_DIR or WEB_HTML_DIR not found');
  }
  const indexHtmlFile = path.join(WEB_DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlFile)) {
    throw new Error('index.html not found');
  }
  const indexHtmlStr = fs.readFileSync(indexHtmlFile, 'utf-8');
  const rootJsonInHtml = JSON.parse(fs.readFileSync(path.join(WEB_HTML_DIR, 'root.json'), 'utf-8'));
  console.log('indexHtml: ' + indexHtmlStr);
  console.log('rootJsonInHtml: ' + JSON.stringify(rootJsonInHtml));
  for (let eachRootJsonItem of rootJsonInHtml) {
    const val_eachRootJsonItem = eachRootJsonItem as SeoDetail;
    for (let eachPath of val_eachRootJsonItem.path) {
      const body_htmlFileName = encodeURIComponent(eachPath) + '-body.html';
      const body_htmlFileFullPath = path.join(WEB_HTML_DIR, body_htmlFileName);
      // if(!fs.existsSync(body_htmlFileFullPath)){
      //   continue;
      // }
      const head_htmlFileName = encodeURIComponent(eachPath) + '-head.html';
      const head_htmlFileFullPath = path.join(WEB_HTML_DIR, head_htmlFileName);
      // if(!fs.existsSync(head_htmlFileFullPath)){
      //   continue;
      // }
      // get html str
      const bodyHtml = fs.readFileSync(body_htmlFileFullPath, 'utf-8');
      const headHtml = fs.readFileSync(head_htmlFileFullPath, 'utf-8');
      const finalOutputHtmlStr = indexHtmlStr
        .replace('<!-- MDGJX_HEAD -->', headHtml)
        .replace('<!-- MDGJX_BODY -->', bodyHtml);
      const subPath = eachPath.split('/').filter((x) => x !== '');

      let finalOutputFileName = _.isEmpty(subPath)
        ? path.join(WEB_DIST_DIR as any, isLocalTestMode ? 'index-test.html' : 'index.html')
        : path.join(
          WEB_DIST_DIR as any,
          ..._.take(subPath, subPath.length - 1),
          _.last(subPath) + (isLocalTestMode ? '-test.html' : '.html')
        );
      // mkdir parent of finalOutputFileName
      shelljs.mkdir('-p', path.dirname(finalOutputFileName));
      fs.writeFileSync(finalOutputFileName, finalOutputHtmlStr);
    }
  }
}, 0);

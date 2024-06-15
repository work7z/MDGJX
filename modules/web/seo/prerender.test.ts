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
   
  },
  {
    timeout: -1,
  }
);

import { expect, test } from 'vitest';
import { DataTypes, Model } from 'sequelize';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import translateTools from './translation/translateTools';
import { logger } from '@/utils/logger';
import i18nItems from '@/i18n/i18n';
import AIUtils from './gpt/ai-utils';

test('run-gpt-content', async () => {
  console.log('handle gpt translation');
  const res = await AIUtils.askQwen([
    {
      role: 'user',
      content: `
你是精通Markdown格式的翻译大师，并且可以跳过代码和专用名词，请你直接翻译下面Markdown为英文并直接输出：
\`\`\`markdown
# 这是一个标题
这是一个段落


## 历史沿革

- **秦始皇时期**：公元前214年，潮州地域属南海郡。
- **西汉时期**：公元前111年，属南海郡揭阳县地。
- **东晋时期**：公元331年，设立东冠郡；公元413年，分东官置义安郡，潮州的前身。
- **隋朝**：隋文帝开皇十年（公元590年），全国撤郡设州，始有“潮州”之名。
\`\`\`
      
      `,
    },
  ]);
  console.log(res.output);
  console.log(res.usage.total_tokens);
}, 0);

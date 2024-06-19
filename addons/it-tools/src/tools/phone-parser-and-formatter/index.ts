import { Phone } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: '电话号码解析和格式化',
  path: '/phone-parser-and-formatter',
  description:
    // 'Parse, validate and format phone numbers. Get information about the phone number, like the country code, type, etc.',
    '解析、验证和格式化电话号码。获取有关电话号码的信息，如国家代码、类型等。',
  keywords: [
    'phone',
    'parser',
    'formatter',
    'validate',
    'format',
    'number',
    'telephone',
    'mobile',
    'cell',
    'international',
    'national',
  ],
  component: () => import('./phone-parser-and-formatter.vue'),
  icon: Phone,
  createdAt: new Date('2023-05-01'),
});

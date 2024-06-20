import { TextWrap } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('Text 转 Unicode'),
  path: '/text-to-unicode',
  // description: translate('tools.text-to-unicode.description'),
  description: '将文本转换为 Unicode 编码',
  keywords: ['text', 'to', 'unicode'],
  component: () => import('./text-to-unicode.vue'),
  icon: TextWrap,
  createdAt: new Date('2024-01-31'),
});

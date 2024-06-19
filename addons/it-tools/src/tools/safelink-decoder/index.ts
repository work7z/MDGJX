import { Mailbox } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Outlook 安全链接 解码器',
  path: '/safelink-decoder',
  // description: 'Decode Outlook SafeLink links',
  description: '解码 Outlook 安全链接',
  keywords: ['outlook', 'safelink', 'decoder'],
  component: () => import('./safelink-decoder.vue'),
  icon: Mailbox,
  createdAt: new Date('2024-03-11'),
});

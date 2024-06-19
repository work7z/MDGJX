import { Server } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  // name: 'Random port generator',
  name: '随机端口生成器', // 'Random port generator
  path: '/random-port-generator',
  // description: 'Generate random port numbers outside of the range of "known" ports (0-1023).',
  description: '生成在“已知”端口范围之外的随机端口号（0-1023）。',
  keywords: ['system', 'port', 'lan', 'generator', 'random', 'development', 'computer'],
  component: () => import('./random-port-generator.vue'),
  icon: Server,
});

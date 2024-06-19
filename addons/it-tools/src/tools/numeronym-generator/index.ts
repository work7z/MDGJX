import { defineTool } from '../tool';
import n7mIcon from './n7m-icon.svg?component';

export const tool = defineTool({
  // name: 'Numeronym generator',
  name: '数字缩写 生成器', // 'Numeronym generator
  path: '/numeronym-generator',
  // description: 'A numeronym is a word where a number is used to form an abbreviation. For example, "i18n" is a numeronym of "internationalization" where 18 stands for the number of letters between the first i and the last n in the word.',
  description: '数字缩写是一种使用数字形成缩写的单词。例如，“i18n”是“国际化”（internationalization）的数字缩写，其中的 18 代表了单词中第一个 i 和最后一个 n 之间的字母数。',
  keywords: ['numeronym', 'generator', 'abbreviation', 'i18n', 'a11y', 'l10n'],
  component: () => import('./numeronym-generator.vue'),
  icon: n7mIcon,
  createdAt: new Date('2023-11-05'),
});

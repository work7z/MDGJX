import { toolsNavInfo } from '../toolsNavInfo.tsx';

export type SeoDetail = {
  path: string[];
  title: string;
  description: string;
  keywords: string;
};
 const SeoDetailItemForMDGJX: SeoDetail[] = [
  {
    path: ['', '/', '/tools/index'],
    title: '在线工具 | 文档笔记 | 编程资源',
    description: 'MDGJX秒达工具箱，在线便捷各类优质准确的工具，文档笔记，编程资源，让您的工作更加高效。',
    keywords: '在线工具,文档笔记,编程资源,MDGJX秒达工具箱,MDGJX,秒达工具箱,开源工具箱',
  },
  {
    path: ['/tools/json','/tools/json/convert'],
    title: 'JSON压缩编码 | JSON在线校验格式化 | JSON在线编辑 | JSON浏览器',
    description: 'MDGJX秒达工具箱快速提供JSON压缩编码、JSON在线校验格式化、JSON在线编辑、JSON浏览器等功能，让您的JSON数据处理更加便捷。',
    keywords: 'JSON压缩编码,JSON在线校验格式化,JSON在线编辑,JSON浏览器,JSON工具,JSON工具箱',
  },
  {
    path: ['/i18n/text'],
    title: '文本国际化 | 文本翻译 | 文本转换 | 文本处理',
    description: 'MDGJX秒达工具箱快速提供文本国际化、文本翻译、文本转换、文本处理等功能，让您的文本处理更加便捷。',
    keywords: '文本国际化,文本翻译,文本转换,文本处理,文本工具,文本工具箱',
  },
  {
    path: ['/i18n/json'],
    title: 'JSON国际化 | JSON翻译 | JSON转换 | JSON处理',
    description: 'MDGJX秒达工具箱快速提供JSON国际化、JSON翻译、JSON转换、JSON处理等功能，让您的JSON数据处理更加便捷。',
    keywords: 'JSON国际化,JSON翻译,JSON转换,JSON处理,JSON工具,JSON工具箱',
  },
  {
    path: ['/i18n/md'],
    title: 'Markdown国际化 | Markdown翻译 | Markdown转换 | Markdown处理',
    description: 'MDGJX秒达工具箱快速提供Markdown国际化、Markdown翻译、Markdown转换、Markdown处理等功能，让您的Markdown数据处理更加便捷。',
    keywords: 'Markdown国际化,Markdown翻译,Markdown转换,Markdown处理,Markdown工具,Markdown工具箱',
  },
  {
    path: ['/i18n/ftzt'],
    title: '繁体转简体 | 简体转繁体 | 繁简体转换 | 繁简体处理',
    description: 'MDGJX秒达工具箱快速提供繁体转简体、简体转繁体、繁简体转换、繁简体处理等功能，让您的繁简体处理更加便捷。',
    keywords: '繁体转简体,简体转繁体,繁简体转换,繁简体处理,繁简体工具,繁简体工具箱',
  },
  {
    path: ['/marketplace/index'],
    title: `云插件 - 插件市场`,
    description: 'MDGJX秒达工具箱快速提供云插件、插件市场等功能，让您的插件使用更加便捷。',
    keywords: '云插件,插件市场,插件工具,插件工具箱',
  }
];

toolsNavInfo.map((item) => {
  item.subTools?.map(xx=>{
    SeoDetailItemForMDGJX.push({
      path: [`/${item.id}/${xx.id}`],
      title:`${xx.name} | ${item.name}`,
      description: xx.description,
      keywords: xx.keywords.join(",")
    })
  })
})

export default SeoDetailItemForMDGJX
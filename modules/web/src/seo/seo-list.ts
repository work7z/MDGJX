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
     description:
       'MDGJX秒达工具箱，在线便捷各类优质准确的工具，文档笔记，编程资源，让您的工作更加高效。',
     keywords: '在线工具,文档笔记,编程资源,MDGJX秒达工具箱,MDGJX,秒达工具箱,开源工具箱',
   },
   {
     path: ['/tools/json', '/tools/json/convert'],
     title: 'JSON压缩编码 | JSON在线校验格式化 | JSON在线编辑 | JSON浏览器',
     description:
       'MDGJX秒达工具箱快速提供JSON压缩编码、JSON在线校验格式化、JSON在线编辑、JSON浏览器等功能，让您的JSON数据处理更加便捷。',
     keywords: 'JSON压缩编码,JSON在线校验格式化,JSON在线编辑,JSON浏览器,JSON工具,JSON工具箱',
   },
   {
     path: ['/i18n/text'],
     title: '文本国际化 | 文本翻译 | 文本转换 | 文本处理',
     description:
       'MDGJX秒达工具箱快速提供文本国际化、文本翻译、文本转换、文本处理等功能，让您的文本处理更加便捷。',
     keywords: '文本国际化,文本翻译,文本转换,文本处理,文本工具,文本工具箱',
   },
   {
     path: ['/i18n/json'],
     title: 'JSON国际化 | JSON翻译 | JSON转换 | JSON处理',
     description:
       'MDGJX秒达工具箱快速提供JSON国际化、JSON翻译、JSON转换、JSON处理等功能，让您的JSON数据处理更加便捷。',
     keywords: 'JSON国际化,JSON翻译,JSON转换,JSON处理,JSON工具,JSON工具箱',
   },
   {
     path: ['/i18n/md'],
     title: 'Markdown国际化 | Markdown翻译 | Markdown转换 | Markdown处理',
     description:
       'MDGJX秒达工具箱快速提供Markdown国际化、Markdown翻译、Markdown转换、Markdown处理等功能，让您的Markdown数据处理更加便捷。',
     keywords: 'Markdown国际化,Markdown翻译,Markdown转换,Markdown处理,Markdown工具,Markdown工具箱',
   },
   {
     path: ['/i18n/ftzt'],
     title: '繁体转简体 | 简体转繁体 | 繁简体转换 | 繁简体处理',
     description:
       'MDGJX秒达工具箱快速提供繁体转简体、简体转繁体、繁简体转换、繁简体处理等功能，让您的繁简体处理更加便捷。',
     keywords: '繁体转简体,简体转繁体,繁简体转换,繁简体处理,繁简体工具,繁简体工具箱',
   },
   {
     path: ['/marketplace/index'],
     title: `云插件 - 插件市场`,
     description: 'MDGJX秒达工具箱快速提供云插件、插件市场等功能，让您的插件使用更加便捷。',
     keywords: '云插件,插件市场,插件工具,插件工具箱',
   },
   {
     path: ['/settings/my-account'],
     title: `我的账户 - 设置`,
     description: 'MDGJX秒达工具箱快速提供我的账户、设置等功能，让您的账户管理更加便捷。',
     keywords: '我的账户,设置,账户管理,账户工具,账户工具箱',
   },
   {
     path: ['/settings/my-privilege'],
     title: `权益中心 - 设置`,
     description: 'MDGJX秒达工具箱快速提供权益中心、设置等功能。',
     keywords: '权益中心,设置,权益管理,权益工具,权益工具箱',
   },
   {
     // faq
     path: ['/settings/faq'],
     title: `常见问题 - 设置`,
     description: 'MDGJX秒达工具箱快速提供常见问题、设置等功能。',
     keywords: '常见问题,设置,常见问题解答,常见问题工具,常见问题工具箱',
   },
   {
     // settings/terms-of-conditions
     path: ['/settings/terms-of-conditions'],
     title: `服务条款 - 设置`,
     description: 'MDGJX秒达工具箱快速提供服务条款、设置等功能。',
     keywords: '服务条款,设置,服务条款管理,服务条款工具,服务条款工具箱',
   },
   {
     // settings/privacy-agreement
     path: ['/settings/privacy-agreement'],
     title: `隐私政策 - 设置`,
     description: 'MDGJX秒达工具箱快速提供隐私政策、设置等功能。',
     keywords: '隐私政策,设置,隐私政策管理,隐私政策工具,隐私政策工具箱',
   },
   {
    path: ['/settings/install'],
    title: `安装秒达工具箱 - 设置`,
    description: '快速安装秒达工具箱、设置等功能',
    keywords: '安装秒达工具箱,设置,安装,安装工具,安装工具箱',
   },
   {
    path: ['/settings/feedback'],
    title: `建议与反馈 - 设置`,
    description: 'MDGJX秒达工具箱快速提供反馈、设置等功能。',
    keywords: '反馈,设置,反馈管理,反馈工具,反馈工具箱',
   },
   {
    path: ['/settings/about'],
    title: `关于秒达工具箱`,
    description: 'MDGJX秒达工具箱快速提供关于、设置等功能。',
    keywords: '关于,设置,关于管理,关于工具,关于工具箱',
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
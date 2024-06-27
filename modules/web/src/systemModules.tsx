import { useMemo, useState } from 'react';
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import {
    IconHome2,
    IconUser,
    IconSettings,
    IconNotebook,
    IconMapSearch,
    IconBook,
    IconLanguage,
    IconApiApp,
    IconNetwork,
    IconSuperscript,
    IconBuildingStore,
    IconStar,
    IconBookmark,
    IconBookmarks,
    Icon,
    IconTools,
    IconNavigation,
    IconInbox,

} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleNavbar.module.css';
import _ from 'lodash';
import GetAppInfo from '@/AppInfo';
import AppConstants from './AppConstants.tsx';
import { isDevEnv } from './env.ts';
import {
    SystemModuleItem,
    SystemSubModuleItem,
} from './m-types-copy/base/m-types-main'
import localApiSlice from './store/reducers/localApiSlice.tsx';
import exportUtils from './utils/ExportUtils.tsx';
import ExtViewFrame from './loadable/ExtViewFrame/index.tsx';

export * from './m-types-copy/base/m-types-main'

export const Fn_MyAccount = () => import('./loadable/MyAccount/index.tsx')


export type SystemModuleReq = {
}
export type SystemModuleRes = {
    stillInitializing: boolean
    list: SystemModuleItem[]
    ROUTE_CPT_MAPPING: SystemSubModuleItem[]
}

export const useSystemModulesList = (req: SystemModuleReq): SystemModuleRes => {

    const devConfig_usingLocalExtViewConfig = exportUtils.useSelector(v => v.settings.devConfig_usingLocalExtViewConfig)
    const fullInfoQuery = localApiSlice.useGetFullInfoQuery({
        env: devConfig_usingLocalExtViewConfig ? 'local-config' : 'cloud-config'
    }, {
        refetchOnMountOrArgChange: true
    })
    const miaoConfigsArr = (fullInfoQuery?.data?.data?.miaodaConfigs || [])

    const systemMRes: SystemModuleRes = useMemo(() => {

        const ROUTE_CPT_MAPPING: SystemSubModuleItem[] = []

        const formatModuleItem = (obj: SystemModuleItem[]): SystemModuleItem[] => {
            return _.map(obj, mainModule => {
                mainModule.children = mainModule.children?.map((raw_subModule_1: SystemSubModuleItem) => {
                    let subModule_1: SystemSubModuleItem = { ...raw_subModule_1 }
                    const checkEachMainSubModule = (pid: string, rawSubItem: SystemSubModuleItem) => {
                        const subItem: SystemSubModuleItem = {
                            ...rawSubItem
                        }
                        subItem.href = `/${pid}/${subItem.id}`
                        subItem.firstRouteId = pid
                        subItem.rootMainModuleId = mainModule.id
                        ROUTE_CPT_MAPPING.push(subItem)
                        return subItem

                    }
                    if (subModule_1.bodyFn) {
                        subModule_1 = checkEachMainSubModule(mainModule.id, subModule_1)
                    } else {
                        subModule_1.children = _.map(subModule_1.children, (subModule_2) => {
                            return checkEachMainSubModule(subModule_1.id, subModule_2)
                        })
                    }
                    return subModule_1
                }) || []
                return mainModule
            })
        }

        const jsonSuperTool: SystemSubModuleItem = {
            name: 'JSON超级工具',
            iconInStr: 'Json',
            id: 'json',
            defaultSubToolId: 'convert',
            description: "JSON 转换、格式化、压缩、解析、校验、比较、合并、转义、加密、解密等一站式超级工具。",
            bodyFn: () => import('./loadable/JSONSuperTools/index.tsx'),
        }
        const myfavour: SystemSubModuleItem = {
            name: '云收藏夹',
            id: 'index',
            disableFooter: true,
            bodyFn: () => import('./loadable/CloudFavourite/index.tsx')
        }
        const dynamicMenus: SystemSubModuleItem[] = []
        _.forEach(miaoConfigsArr, (eachConfig) => {
            if (!_.isEmpty(eachConfig.menus)) {
                _.forEach(eachConfig.menus, (subMenu) => {
                    dynamicMenus.push({
                        ...subMenu,
                        children: _.map(subMenu.children, (subItem) => {
                            return {
                                ...subItem,
                                bodyFn: () => import('./loadable/ExtViewFrame/index.tsx'),
                                bodyFnProps: {
                                    fn_subItem: ()=>subItem,
                                    fn_eachConfig: () => eachConfig
                                }
                            } satisfies SystemSubModuleItem
                        })
                    })
                })
            }
        })
        const systemModulesList: SystemModuleItem[] = formatModuleItem([
            {
                id: 'main',
                defaultHref: '/tools/index',
                icon: IconHome2,
                label: '主页',
                children: [
                    {
                        id: 'tools',
                        icon: IconHome2,
                        ignoreInNav: true,
                        name: '秒达工具箱',
                        children: [
                            {
                                name: "功能总览",
                                id: 'index',
                                bodyFn: () => import('./loadable/XToolsView/index.tsx')
                            },
                            {
                                ...myfavour,
                                id: 'myfavour'
                            },
                        ]
                    },
                    {
                        id: 'formats',
                        icon: IconTools,
                        name: '超级格式',
                        children: [
                            {
                                ...jsonSuperTool,
                                id: 'jsonhelper'
                            }
                        ]
                    },
                    {
                        id: 'i18n',
                        icon: IconLanguage,
                        name: '翻译助手',
                        children: [
                            {
                                name: '文本翻译',
                                id: 'text',
                                description: '支持多种语言的文本翻译，包括中文、英文、日文、韩文、法文、德文、俄文等语言的互转。',
                                iconInStr: 'Script',
                                bodyFn: () => import('./loadable/TLNText/index.tsx')
                            },
                            {
                                name: 'JSON 格式翻译',
                                id: 'json',
                                description: `实现软件国际化的好助手，支持JSON格式的深层次翻译，让您的应用能快速支持多语言。`,
                                iconInStr: 'Json',
                                bodyFn: () => import('./loadable/TLNJSON/index.tsx')
                            },
                            {
                                name: 'JSON 中英文对照',
                                id: 'json-cn-en',
                                iconInStr: 'Json',
                                description: `对晦涩难懂的JSON字段名，再也不用一个个查字典了，可以使用此工具进行JSON格式的中英文对照翻译。`,
                                // iconInStr: 'Language',
                                bodyFn: () => import('./loadable/TLNJSONComparison/index.tsx')
                            },
                            {
                                name: 'Markdown 文档翻译',
                                id: 'md',
                                iconInStr: 'Markdown',
                                description: `基于AI分析，提供Markdown格式的文档翻译，包括中文、英文、日文、韩文、法文、德文、俄文等语言的互转。`,
                                bodyFn: () => import('./loadable/TLNMarkdown/index.tsx')
                            },
                            {
                                name: '简繁中文对照翻译',
                                id: 'ftzt',
                                iconInStr: 'Language',
                                description: "内地港澳台的中文简繁互转，内置最新的简繁字体术语表，让您的文档更加通用。",
                                bodyFn: () => import('./loadable/TLNZTFT/index.tsx')
                            },
                        ]
                    },
                    ...(dynamicMenus),
                ]
            },
            {
                id: 'collections',
                icon: IconBookmarks,
                defaultHref: '/collections/index',
                label: '收藏夹',
                children: [
                    myfavour,
                ]
            },
            {
                id: 'marketplace',
                defaultHref: '/marketplace/index',
                icon: IconBuildingStore,
                label: '插件市场',
                children: [
                    {
                        name: '云插件',
                        id: 'index',
                        // disableFooter: true,
                        bodyFn: () => import('./loadable/MarketPlace/index.tsx')
                    },
                    {
                        name: '开发者中心',
                        id: 'dev-centre',
                        children: [
                            {
                                name: '开发插件预览',
                                id: 'installed-plugins',
                                disableFooter: true,
                                bodyFn: () => import('./loadable/MpPreviewExt/index.tsx')
                            },
                            {
                                name: '开发配置',
                                id: 'installed-config',
                                disableFooter: true,
                                bodyFn: () => import('./loadable/MpConfig/index.tsx')
                            },
                        ]
                    },
                ]
            },
            {
                id: 'settings',
                defaultHref: '/settings/my-account',
                fixedAtBottom: true,
                icon: IconSettings, label: '系统设置',
                children: [
                    {
                        name: '我的账号',
                        id: 'my-account',
                        bodyFn: Fn_MyAccount
                    },
                    {
                        name: '权益中心',
                        id: 'my-privilege',
                        bodyFn: () => import('./loadable/MyPrivilege/index.tsx')
                    },
                    {
                        name: '常见问题',
                        id: 'faq',
                        bodyFn: () => import('./loadable/FAQ/index.tsx')
                    },
                    {
                        name: '使用条款',
                        id: 'terms-of-conditions',
                        bodyFn: () => import('./loadable/TermsOfConditions/index.tsx')
                    },
                    {
                        name: '隐私保护协议',
                        id: 'privacy-agreement',
                        bodyFn: () => import('./loadable/PrivacyAgreement/index.tsx')
                    },
                    {
                        name: '下载与更新',
                        id: 'install',
                        bodyFn: () => import('./loadable/DownloadAndInstall/index.tsx')
                    },
                    {
                        name: '建议与反馈',
                        bodyFn: () => import('./loadable/Feedback/index.tsx'),
                        id: 'feedback'
                    },
                    {
                        name: '关于软件',
                        id: 'about',
                        bodyFn: () => import('./loadable/AboutSoftware/index.tsx'),
                    },
                ]
            },
        ] satisfies SystemModuleItem[]);

        return {
            list: systemModulesList,
            ROUTE_CPT_MAPPING,
            stillInitializing: fullInfoQuery.isLoading // first time load
        }
    }, [devConfig_usingLocalExtViewConfig, miaoConfigsArr, _.size(miaoConfigsArr), fullInfoQuery?.status])

    return systemMRes
}



// {
//     id: 'network',
//     icon: IconNetwork,
//     name: '网络运维',
//     children: [
//         {
//             name: 'IP/域名质量监测',
//             id: 'ipstats',
//             disableFooter: true,
//             bodyFn: () => import('./loadable/IPDomainQualityStat/index.tsx')
//         },
//     ]
// },

// {
//     name: '已安装插件',
//     id: 'installed-plugins',
//     // disableFooter: true,
//     bodyFn: () => import('./loadable/NotOK/index.tsx')
// },
// {
//     name: '自启动管理',
//     id: 'self-startup',
//     // disableFooter: true,
//     bodyFn: () => import('./loadable/NotOK/index.tsx')
// },
// {
//     name: '卸载插件',
//     id: 'uninstall',
//     // disableFooter: true,
//     bodyFn: () => import('./loadable/NotOK/index.tsx')
// },
// {
//     name: '二级分类',
//     id: 'sub',
//     disableFooter: true,
//     children: [
//         {
//             name: '工具助手类',
//             id: 'index',
//             disableFooter: true,
//             bodyFn: () => import('./loadable/MarketPlace/index.tsx')
//         },
//         {
//             name: '文档笔记类',
//             id: 'index',
//             disableFooter: true,
//             bodyFn: () => import('./loadable/MarketPlace/index.tsx')
//         },
//         {
//             name: '资源软件类',
//             id: 'index',
//             disableFooter: true,
//             bodyFn: () => import('./loadable/MarketPlace/index.tsx')
//         }
//     ]
// },


// {
//     name: '在线插件预览',
//     id: 'cloud-installed-plugins',
//     disableFooter: true,
//     bodyFn: () => import('./loadable/MpCloudExt/index.tsx')
// },
// {
//     name: '开发设置',
//     id: 'install-settings',
//     disableFooter: true,
//     bodyFn: () => import('./loadable/MpSettings/index.tsx')
// },
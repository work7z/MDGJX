import { Anchor, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './Footer.module.css';
import GetAppInfo from '@/AppInfo';
import exportUtils from '@/utils/ExportUtils';

const appInfo = GetAppInfo()

const links = [
    { link: '/settings/about', label: '关于' + GetAppInfo().name + `(${appInfo.version})` },
    { link: 'https://beian.miit.gov.cn/', label: '粤ICP备2022042390号' },
    { link: '/settings/feedback', label: '建议与反馈' },
    { link: '/settings/terms-of-conditions', label: '使用协议' },
    { link: '/settings/privacy-agreement', label: '隐私保护协议' },
    { link: '/settings/faq', label: '常见问题' },
    { link: GetAppInfo().githubRepo, label: '源代码' },
];

export function FooterCentered() {
    const items = links.map((link) => (
        <Anchor
            c="dimmed"
            key={link.label}
            href={link.link}
            target='_blank'
            lh={1}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));
    const hideLeftMenu = exportUtils.useSelector(v => v.settings.hideLeftMenu)

    return (
        <div className={classes.footer + (
            hideLeftMenu ? ' pl-[10px] ' : ' pl-[10px] sm:pl-[300px]'
        )} >
            <div className={classes.inner + ' flex justify-center items-center flex-row '} >
                <Group></Group>
                <Group className={classes.links}>{items}</Group>
                <Group></Group>
            </div>
        </div>
    );
}
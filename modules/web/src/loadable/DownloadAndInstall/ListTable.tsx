import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import classes from './TableReviews.module.css';
import { IconBrandApple, IconBrandUbuntu, IconBrandWindows } from '@tabler/icons-react';
import { useEffect } from 'react';
import apiSlice from '@/store/reducers/apiSlice';
import GetAppInfo from '@/AppInfo';
import _ from 'lodash';
import { isOnlineTestMode } from '@/utils/PortalUtils';

const data:{
    icon?:any,
    name: string,
    arch: string,
    fileArch: string,
    ext: string[],
    overwriteFn?: (fileExt:string)=>string |null// for fileArchOverwrite
}[] = [
        {
            icon: <IconBrandWindows />,
            name: 'Windows系统 (Windows 7/8/8.1/10/11)',
            arch: 'x64',
            fileArch: 'win-x64',
            ext: ['exe', 'zip'],
        },
        {
            icon: <IconBrandWindows />,
            name: 'Windows系统 (Windows 7/8/8.1/10/11) (ARM64版本)',
            arch: 'arm64',
            fileArch: 'win-arm64',
            ext: ['exe', 'zip'],
        },
        {
            icon: <IconBrandApple />,
            name: 'MacOS 苹果系统 (Intel核芯版本)',
            arch: 'x64',
            fileArch: 'darwin-x64',
            ext: ['dmg', 'tar.gz'],
        },
        {
            icon: <IconBrandApple />,
            name: 'MacOS 苹果系统 (M1系列芯片/Apple Silicon)',
            arch: 'arm64',
            fileArch: 'darwin-arm64',
            ext: ['dmg', 'tar.gz'],
        },
        {
            icon: <IconBrandUbuntu />,
            name: 'Linux 系统 (X64版本)',
            arch: 'x64',
            fileArch: 'linux-x64', // AppImage is linux-x86_64
            ext: ['deb', 'tar.gz', 'AppImage'],
            overwriteFn(val){
                if(val === 'AppImage'){
                    return 'linux-x86_64'
                }if(val === 'deb'){
                    return 'linux-amd64'
                }
                return null
            }
        },
        {
            icon: <IconBrandUbuntu />,
            name: 'Linux 系统 (ARM64版本)',
            arch: 'arm64',
            fileArch: 'linux-arm64', // AppImage is also linux-arm64
            ext: ['dmg', 'tar.gz'],
        },
];

export default function TableReviews() {
    let latestVer = 'unknown'
    const changeLogRes = apiSlice.useGetSysConfChangeLogQuery({
        checkType: 'desktop2',
        currentVer:'desktop2-'+ GetAppInfo().version
    }, {
        pollingInterval: 60 * 1000 * 5, // 5 minutes
    })
    if (changeLogRes.isSuccess){
        latestVer = _.first(changeLogRes.data?.data?.updates)?.version || 'unknown'
    }
    // const whatTypeOfPkg = isOnlineTestMode() ? 'test':'release'
    const rows = data.map((row) => {

        return (
            <Table.Tr key={row.name+row.arch}>
                <Table.Td className='flex space-x-2'>
               {row.icon}   <span>
                        {row.name}
               </span>
                </Table.Td>
                <Table.Td className={row.arch == 'arm64' ? ' bg-cyan-200 ':' bg-orange-200 '}>{row.arch}</Table.Td>
                <Table.Td className='space-x-2'>
                    {
                        row.ext.map(x=>{
                            return <Anchor
                            key={x} component="button" fz="sm">
                                <a target="_blank" href={`https://dkstatic.mdgjx.com/${latestVer}-release/MDGJX-desktop-${latestVer.replace('desktop2-','')}-${
                                    row.overwriteFn ? row.overwriteFn(x) || row.fileArch : row.fileArch
                                }.${x}`}>
                                    {x}
                                </a>
                            </Anchor>
                        })
                    }
                </Table.Td>
                <Table.Td>{latestVer.replace("desktop2-","")}</Table.Td>
            </Table.Tr>
        );
    });
    if (latestVer == 'unknown'){
        return <Progress color="blue" size="xl" value={0} />
    }
    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>平台</Table.Th>
                        <Table.Th>架构</Table.Th>
                        <Table.Th>下载链接</Table.Th>
                        <Table.Th>备注</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
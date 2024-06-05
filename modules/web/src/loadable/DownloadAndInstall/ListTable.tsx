import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import classes from './TableReviews.module.css';
import { IconBrandApple, IconBrandUbuntu, IconBrandWindows } from '@tabler/icons-react';

const data:{
    icon?:any,
    name: string,
    arch: string,
    ext: string[]
}[] = [
        {
            icon: <IconBrandWindows />,
            name: 'Windows系统 (Windows 7/8/8.1/10/11)',
            arch: 'x64',
            ext: ['exe', 'zip'],
        },
        {
            icon: <IconBrandWindows />,
            name: 'Windows系统 (Windows 7/8/8.1/10/11) (Arm64版本)',
            arch: 'arm64',
            ext: ['exe', 'zip'],
        },
        {
            icon: <IconBrandApple />,
            name: 'MacOS 苹果系统 (Intel核心版本)',
            arch: 'x64',
            ext: ['dmg', 'tar.gz'],
        },
        {
            icon: <IconBrandApple />,
            name: 'MacOS 苹果系统 (M1系列芯片/Apple Silicon)',
            arch: 'arm64',
            ext: ['dmg', 'tar.gz'],
        },
        {
            icon: <IconBrandUbuntu />,
            name: 'Linux 系统 (X64版本)',
            arch: 'x64',
            ext: ['dmg', 'tar.gz'],
        },
        {
            icon: <IconBrandApple />,
            name: 'Linux 系统 (Arm64版本)',
            arch: 'arm64',
            ext: ['dmg', 'tar.gz'],
        },
];

export default function TableReviews() {
    const rows = data.map((row) => {

        return (
            <Table.Tr key={row.name+row.arch}>
                <Table.Td className='flex space-x-2'>
               {row.icon}   {row.name}
                </Table.Td>
                <Table.Td className={row.arch == 'arm64' ? ' bg-cyan-200 ':' bg-orange-200 '}>{row.arch}</Table.Td>
                <Table.Td>
                    <Anchor component="button" fz="sm">
                        {row.ext.join('-')}
                    </Anchor>
                </Table.Td>
                <Table.Td>无</Table.Td>
            </Table.Tr>
        );
    });

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
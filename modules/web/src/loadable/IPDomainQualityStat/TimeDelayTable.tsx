import { Button, Table } from '@mantine/core';
import _ from 'lodash';

export default () => {
    const elements: any[] = []
    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    ));
    return <div>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>IP/域名</Table.Th>
                    <Table.Th>来源位置</Table.Th>
                    <Table.Th>时延(ms)</Table.Th>
                    <Table.Th>操作</Table.Th>
                </Table.Tr>
            </Table.Thead>
            {...rows}
        </Table>
        <div className='mt-2 '>
            <div className='space-x-1 text-right'>
                <Button color="blue" variant='outline' size='compact-xs' onClick={() => {
                    console.log('clicked')
                }}>编辑</Button>
                <Button color="green" variant='outline' size='compact-xs' onClick={() => {
                    console.log('clicked')
                }}>刷新</Button>
            </div>
        </div>
    </div>
}
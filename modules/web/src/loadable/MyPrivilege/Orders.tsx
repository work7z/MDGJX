import { Table, Progress, Anchor, Text, Group, Badge, Button } from '@mantine/core';
import { S2GiftCard } from '@/store/reducers/apiSlice';
import AlertUtils from '@/utils/AlertUtils';
import apiSlice from '../../store/reducers/apiSlice';
import _ from 'lodash';

export  default function CardListTableView(props: {
}) {

const [t_verifyPayQuery]=    apiSlice.useLazyWxpayVerfiyPayQuery({})
 const wxQueryGetOrdersRes =   apiSlice.useWxpayGetOrdersQuery({},{
    pollingInterval: 5000
 })
    const data = wxQueryGetOrdersRes.data?.data || []
    // wxQueryGetOrdersRes.data?.data? [
    // ];
    const rows = data.map((row) => {
        
        return (
            <Table.Tr key={row.id}>
                <Table.Td>{row.id}</Table.Td>
                <Table.Td>
                    {row.outTradeNo}
                </Table.Td>
                <Table.Td>
                    {row.description}
                </Table.Td>
                <Table.Td>
                    {row.total}
                </Table.Td>
                <Table.Td>
                    {row.planCount}
                </Table.Td>
                <Table.Td>
                  <Badge color={row.hasPaid ? 'green':'yellow'} >
                        {row.hasPaid ? '已付款' : '未付款'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                    {_.toString(row.createdAt)}
                </Table.Td>
                <Table.Td>
                                        <div className='space-x-2'>
                       {
                          row.hasPaid != 1 ? <Button variant='light' size='compact-xs' 
                                onClick={async () => {
                                    //
                                    t_verifyPayQuery({
                                        outTradeNo: row.outTradeNo
                                    }).then(x=>{
                                        wxQueryGetOrdersRes.refetch().then(xx=>{
                                            AlertUtils.alertInfo(`订单${row.outTradeNo}付款状态已刷新：${x.data?.data?.trade_state_desc}`)
                                        })
                                    })
                                }}
                            >
                                刷新付款状态
                            </Button> : ''
                       }
                    </div>
                </Table.Td>
               
            </Table.Tr>
        );
    });

    return (
      <div>
        <div className='flex justify-between p-2'>
            <div>{_.size(data)}条数据</div>
            <Button loading={
                wxQueryGetOrdersRes.isLoading
            } size='compact-sm' onClick={()=>{
                wxQueryGetOrdersRes.refetch().then(x=>{
                    AlertUtils.alertSuccess('已刷新')
                })
            }}>刷新订单列表</Button>
        </div>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="xs">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>订单号</Table.Th>
                            <Table.Th>权益计划名</Table.Th>
                            <Table.Th>订单金额</Table.Th>
                            <Table.Th>订单数量</Table.Th>
                            <Table.Th>是否已付款</Table.Th>
                            <Table.Th>创建时间</Table.Th>
                            <Table.Th>操作</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
      </div>
    );
}
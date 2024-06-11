import { Table, Progress, Anchor, Text, Group, Button } from '@mantine/core';
import classes from './CardListTableView.module.css';
import apiSlice, { S2GiftCardAndGiftCardUserTable } from '@/store/reducers/apiSlice';
import AlertUtils from '@/utils/AlertUtils';
import { useHistory } from 'react-router';
import _ from 'lodash';
import dayjs from 'dayjs';

export function CardListTableView(props: {
    cardList: S2GiftCardAndGiftCardUserTable[],
    refreshNow: ()=>void
}) {
    const [t_enableGiftCard,stType] = apiSlice.useLazyEnableGiftCardQuery({})
    const data = props.cardList;
    const hist = useHistory()
    const rows = data.map((row) => {

        return (
            <Table.Tr key={row.id}>
                {/* <Table.Td>{row.id}</Table.Td> */}
                <Table.Td>{({
                    'THANKS_FOR_FUNDRAISING': '永久会员权益卡',
                    'WX_PAY':"付费会员权益卡"
                })[row.giftCardType] || "通用"}</Table.Td>
                <Table.Td>
                    {/* <Anchor component="button" fz="sm" onClick={() => {
                        AlertUtils.alertWarn("抱歉，系统暂未开放兑换礼品卡的接口，还在内测中，此功能将在测试通过后上线")
                    }}>
                        {row.giftCardCode}
                    </Anchor> */}
                    {row.giftCardCode}
                </Table.Td>
                <Table.Td>
                    {!row.enabled ? '未启用' : '已启用'}
                </Table.Td>
                <Table.Td>
                    {row.totalDays < 365 || row.totalDays % 365 != 0 ? `${row.totalDays}天` : `${row.totalDays / 365}年`}
                </Table.Td>
                <Table.Td>
                    {
                        !row.enabled ? 'N/A' : '2016-09-01'
                    }
                </Table.Td>
                <Table.Td>
                    {
                        !row.enabled ? 'N/A' : '2116-09-01'
                    }
                </Table.Td>
                
                <Table.Td>
                    {
                        dayjs(row.createdAt).format('YYYY-MM-DD')
                    }
                </Table.Td>
                <Table.Td>
                    {/* <Anchor component="button" fz="sm" onClick={() => {
                        AlertUtils.alertWarn("抱歉，系统暂未开放兑换礼品卡的接口，还在内测中，此功能将在测试通过后上线")
                    }}>
                        即可激活
                    </Anchor> */}
                    <div className='space-x-2'>
                       {
                          row.usedByWho < 1 ? <Button 
                                loading={stType.isLoading}
                          size='compact-sm' color='green'
                                onClick={async () => {
                                    t_enableGiftCard({
                                        giftCardCode: row.giftCardCode+''
                                    }).then(x=>{
                                        props.refreshNow()
                                    })
                                }}
                            >
                                立即激活
                            </Button> : <Button size='compact-sm' color='cyan'
                                onClick={async () => {
                                    AlertUtils.alertInfo("很抱歉，让您到售后服务寻求支持。为了更快处理您的工单，建议通过QQ群联系我们")
                                    hist.push(`/settings/feedback`)
                                }}
                            >
                                售后咨询
                            </Button>
                       }
                        {/* <Button 
                        onClick={()=>{
                            AlertUtils.alertWarn("抱歉，系统暂未开放转赠礼品卡的接口，还在内测中，此功能将在测试通过后上线")
                        }}
                        size='compact-sm' color='pink'>
                            转赠
                        </Button> */}
                    </div>
                </Table.Td>
               
            </Table.Tr>
        );
    });

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        {/* <Table.Th>ID</Table.Th> */}
                        <Table.Th>类型</Table.Th>
                        <Table.Th>礼品卡</Table.Th>
                        <Table.Th>状态</Table.Th>
                        <Table.Th>有效期</Table.Th>
                        <Table.Th>开始时间</Table.Th>
                        <Table.Th>结束时间</Table.Th>
                        <Table.Th>创建日期</Table.Th>
                        <Table.Th align='center'>操作</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
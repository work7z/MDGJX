import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import classes from './CardListTableView.module.css';
import { S2GiftCard } from '@/store/reducers/apiSlice';
import AlertUtils from '@/utils/AlertUtils';

export function CardListTableView(props: {
    cardList: S2GiftCard[]
}) {
    const data = props.cardList;
    const rows = data.map((row) => {

        return (
            <Table.Tr key={row.id}>
                <Table.Td>{({
                    'THANKS_FOR_FUNDRAISING': '永久会员权益卡',
                })[row.giftCardType] || "通用"}</Table.Td>
                <Table.Td>
                    <Anchor component="button" fz="sm" onClick={() => {
                        AlertUtils.alertWarn("抱歉，系统暂未开放兑换礼品卡的接口，还在内测中，此功能将在测试通过后上线")
                    }}>
                        {row.giftCardCode}
                    </Anchor>
                </Table.Td>
                <Table.Td>
                    100年
                </Table.Td>
                <Table.Td>
                    2016-09-01
                </Table.Td>
                <Table.Td>
                    2116-09-01
                </Table.Td>
                <Table.Td>
                    未使用
                </Table.Td>
                <Table.Td>
                </Table.Td>
                {/* <Table.Td>
                    <Group justify="space-between">
                        <Text fz="xs" c="teal" fw={700}>
                            {positiveReviews.toFixed(0)}%
                        </Text>
                        <Text fz="xs" c="red" fw={700}>
                            {negativeReviews.toFixed(0)}%
                        </Text>
                    </Group>
                    <Progress.Root>
                        <Progress.Section
                            className={classes.progressSection}
                            value={positiveReviews}
                            color="teal"
                        />

                        <Progress.Section
                            className={classes.progressSection}
                            value={negativeReviews}
                            color="red"
                        />
                    </Progress.Root>
                </Table.Td> */}
            </Table.Tr>
        );
    });

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>类型</Table.Th>
                        <Table.Th>礼品卡ID</Table.Th>
                        <Table.Th>生效时间</Table.Th>
                        <Table.Th>开始时间</Table.Th>
                        <Table.Th>结束时间</Table.Th>
                        <Table.Th>是否已使用</Table.Th>
                        <Table.Th>备注</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
import { IconMessageBolt } from "@tabler/icons-react"
import classes from './AuthenticationTitle.module.css';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Avatar,
    Badge,
    Flex,
    Alert,
    Progress,
} from '@mantine/core';
import apiSlice from "@/store/reducers/apiSlice";
import exportUtils from "@/utils/ExportUtils";

export default () => {
    const acctDetail = apiSlice.useGetFurtherAcctDetailQuery({
        initCount: exportUtils.useSelector(v => v.settings.initCount)
    }, {
    })
    if (!acctDetail.data?.data) {
        return ''
    }
    const totalTokenCount = acctDetail.data?.data?.totalTokenCount
    const usedTokenCount = acctDetail.data?.data?.usedTokenCount || 0
    return (
        <Group wrap="nowrap" gap={10} mt={5}>
            <IconMessageBolt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed" className='flex '>
                本月Token用量:
            </Text>
            <Progress title={`${usedTokenCount}/${totalTokenCount}`} value={(
                Math.max(0, usedTokenCount / totalTokenCount)
            )} style={{ width: '120px' }} />
        </Group>
    )
}
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
    Tabs,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import GetAppInfo from '@/AppInfo';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSearchParams } from '@/utils/HistUtils';
import apiSlice, { SignInCredentials, verifyResponse } from '@/store/reducers/apiSlice';
import AlertUtils from '@/utils/AlertUtils';
import { ACTION_doSignInByInfo } from '@/store/actions/auth-actions';
import exportUtils from '@/utils/ExportUtils';
import { IconAt, IconCalendarBolt, IconInfoCircle, IconMessageBolt, IconPhoneCall, IconShoppingCartDiscount, IconUserBolt } from '@tabler/icons-react';
import _ from 'lodash';
import AuthUtils, { fn_reload, useHasUserSignIn } from '@/utils/AuthUtils';
import { useEffect, useState } from 'react';
import { formatToYYYYMMDD } from '@/utils/DateUtils';
import OldUserRemark from '../FAQ/OldUserRemark';
import { form_onSubmit } from '@/utils/FormUtils';
import { useMDParams, useMDQuery } from '@/systemHooks';
import NewPrivilege from './NewPrivilege';
import MyPrivilege from './MyPrivilege';
import Redemption from './Redemption';
import Orders from './Orders';
import PleaseSignIn from './PleaseSignIn';


export default () => {
    const query = useMDQuery<{
        type: string,
        type2: string
    }>()
const hasSignIn=    useHasUserSignIn()
    const typeval = query.result.type || 'new'
    if(!hasSignIn){
        return <PleaseSignIn/>
    }
    return (
     <div>
            <Container my={10} size={'xl'} className='block sm:flex flex-row justify-start items-start sm:space-x-4 '>
                <div className='flex-1 mb-5 sm:w-[calc(100%-350px)]' style={{
                    // width: `calc(100% - 350px)`
                }} >
                    <Paper withBorder shadow="md" p={10} radius="md">
                        <Tabs value={typeval} onChange={e => {
                            query.pushNewQuery({
                                ...query.result,
                                type: e + ''
                            })
                        }}>
                            <Tabs.List>
                                <Tabs.Tab value="new">
                                    购买新权益
                                </Tabs.Tab>
                                {/* <Tabs.Tab value="my">
                                    我的权益
                                </Tabs.Tab> */}
                                <Tabs.Tab value="orders">
                                    订单列表
                                </Tabs.Tab>
                                <Tabs.Tab value="redemption">
                                    礼品卡列表
                                </Tabs.Tab>
                            </Tabs.List>

{
                                _.map({
                                    'new': () => <NewPrivilege />,
                                    'my': () => <MyPrivilege />,
                                    'orders': () => <Orders />,
                                    'redemption': () => <Redemption />
                                },(x,d,n)=>{
                                    return <Tabs.Panel value={d}>
                                        {typeval == d ?  (x() as any) : ''}
                                    </Tabs.Panel>
                                })
}
                            {/* <Tabs.Panel value="new">
                                <NewPrivilege/>
                            </Tabs.Panel>

                            <Tabs.Panel value="my">
                                <MyPrivilege />
                            </Tabs.Panel>

                            <Tabs.Panel value="redemption">
                                <Redemption />
                            </Tabs.Panel>
                            <Tabs.Panel value="orders">
                                <Orders/>
                            </Tabs.Panel> */}
                        </Tabs>
                    </Paper>
                </div>
            </Container>
     </div>
    )
}


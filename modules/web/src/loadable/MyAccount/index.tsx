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
import { CardListTableView } from './CardListTableView';
import { formatToYYYYMMDD } from '@/utils/DateUtils';
import OldUserRemark from '../FAQ/OldUserRemark';
import { form_onSubmit } from '@/utils/FormUtils';
import TokenUsage from './TokenUsage';

function AuthenticationTitle() {
    let sp = (useSearchParams())
    const history = useHistory()

    const rh = exportUtils.register('myaccount', {
        getPersistedStateFn: () => {
            return {
                temp: 1
            }
        },
        getNotPersistedStateFn: () => {
            return {
                vcode: '',
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                rememberMe: 'on',
                agreeOrNot: 'on',
            }
        }
    })


    // actions
    const [t_signIn] = apiSlice.useLazySignInQuery({})
    const [t_signUp] = apiSlice.useLazySignUpQuery({})
    const [t_tellmevcode_findpw] = apiSlice.useLazyTellMeVCode4FindPwQuery({})
    const [t_mailsend_findpw] = apiSlice.useLazyMailFindPwQuery({})
    const [enterVCodeMode, setEnterVCodeMode] = useState(false)
    const [loading_sendmail, setLoading_sendmail] = useState(false)
    const [preEMail, setPreEMail] = useState('')
    const uObj = exportUtils.useSelector(v => v.users)
    const hasSignIn = useHasUserSignIn()
    const [t_getCardList, st_cardList] = apiSlice.useLazyGetGiftCardListQuery({})
    useEffect(() => {
        if (hasSignIn) {
            t_getCardList({})
        }
    }, [hasSignIn])
    if (!rh) {
        return ''
    }
    if (hasSignIn && sp.type != 'find-pw') {
        const cardList = st_cardList.data?.data || []
        return (
            <Container my={10} size={'xl'} className='block sm:flex flex-row justify-start items-start sm:space-x-4 '>
                <div className='flex-1 mb-5 sm:w-[calc(100%-350px)]' style={{
                    // width: `calc(100% - 350px)`
                }} >
                    <Paper withBorder shadow="md" p={10} radius="md">
                        <Title
                            size='xl'
                            mb={3}
                        >
                            礼品卡列表
                        </Title>
                        <CardListTableView cardList={cardList} />
                        <Alert mb={10} variant="light" color="green" title="关于礼品卡兑换、赠与功能的说明" icon={
                            <IconInfoCircle />
                        }>
                            我们已经自动发放礼品卡到每个老用户的账号里，具体数据如上，您可以查看您的礼品卡信息，如您有任何问题，请随时联系我们。

                            但目前来说，系统还没有开放兑换礼品卡的接口，此功能还在内测中，此功能将在测试通过后上线。等到该功能上线成功后，您可以将此礼品卡自己兑换、赠与给他人等操作。
                        </Alert>
                        <Alert variant="light" color="blue" title="关于会员礼品卡权益的说明" icon={
                            <IconInfoCircle />
                        }>
                            <OldUserRemark />
                        </Alert>
                    </Paper>
                </div>
                <Flex dir='col' className='flex flex-col sm:w-[350px]'>
                    <Paper withBorder shadow="md" p={30} radius="md">
                        <Group wrap="nowrap">
                            <div>
                                <Text fz="lg" fw={500} className={classes.name}>
                                    {uObj.userInfo?.name || "N/A"}     {
                                        !(uObj.userInfo?.isProUser) ?
                                            <Badge size='sm' color={"green"} variant="light">
                                                开源版用户
                                            </Badge> : <Badge size='sm' color={"pink"} variant="light">
                                                专业版用户
                                            </Badge>
                                    }
                                </Text>

                                <Group wrap="nowrap" gap={10} mt={3}>
                                    <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                                    <Text fz="xs" c="dimmed">
                                        {uObj.userInfo?.email}
                                    </Text>
                                </Group>

                                <Group wrap="nowrap" gap={10} mt={5}>
                                    <IconCalendarBolt stroke={1.5} size="1rem" className={classes.icon} />
                                    <Text fz="xs" c="dimmed">
                                        加入于 {
                                            formatToYYYYMMDD(new Date(uObj.userInfo?.createdAt as any))
                                        }
                                    </Text>
                                </Group>

                                <TokenUsage />


                                {/* <Group wrap="nowrap" gap={10} mt={5}>
                                    <IconUserBolt stroke={1.5} size="1rem" className={classes.icon} />
                                    <Text fz="xs" c="dimmed">
                                        更多用户管理功能，敬请期待
                                    </Text>
                                </Group> */}
                            </div>
                        </Group>
                    </Paper>
                    <Paper withBorder shadow="md" p={10} mt={10} radius="md">
                        <Group flex='flex-col space-y-3'>
                            <Link className='w-full' to='/settings/my-account?type=find-pw'>
                                <Button fullWidth color='indigo' onClick={() => {
                                }}>
                                    修改密码
                                </Button>
                            </Link>
                            <Link className='w-full' to='/settings/feedback'>
                                <Button fullWidth color='blue' onClick={() => {
                                    AlertUtils.alertInfo("很抱歉让您来到账号申诉板块，如果您在账号使用过程中，发现用户权益与预期不一致，或者数据不一致，请随时联系我们，我们将为您排查并尽快处理。")

                                }}>
                                    账号申诉
                                </Button>
                            </Link>
                            <Button className='w-full' color='pink' onClick={() => {
                                AuthUtils.signOut()
                            }}>
                                用户登出
                            </Button>
                        </Group>
                    </Paper>
                </Flex>
            </Container>
        )
    }
    switch (sp.type) {
        case 'find-pw':
            if (enterVCodeMode) {
                return (
                    <Container size={420} my={40}>
                        <div   {...form_onSubmit(() => { })} >
                            <Title ta="center" className={classes.title}>
                                确认邮箱验证码
                            </Title>
                            <Text c="dimmed" size="sm" ta="center" mt={5}>
                                我们已发送邮箱 到 {preEMail}，请查收并输入验证码。  如若没有收到邮件，请先 检查垃圾箱 或者{' '}
                                <Anchor type='button' size="sm" component="button" onClick={() => {
                                    setEnterVCodeMode(false)
                                }}>
                                    重新发送
                                </Anchor>
                            </Text>

                            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                <TextInput


                                    type='number'
                                    {...rh?.bindOnChange({
                                        npStateKey: 'vcode'
                                    })}
                                    name='vcode' label="6位数字验证码" placeholder="输入以确认本次重置操作" mt="md" />
                                <Button onClick={async e => {
                                    try {
                                        e.preventDefault()
                                        let r = await t_tellmevcode_findpw({
                                            email: preEMail,
                                            vcode: rh?.npState?.vcode as string,
                                        })
                                        if (r.data?.data?.verified) {
                                            AlertUtils.alertSuccess('重置成功，将跳转到登录界面')
                                            history.push('/settings/my-account?type=signin')
                                            fn_reload()
                                        } else {
                                            throw new Error('验证码错误，请重新输入')
                                        }
                                    } catch (e) {
                                        AlertUtils.alertErr(e)
                                    }
                                }} fullWidth mt="xl" color='violet'>
                                    确认重置
                                </Button>
                            </Paper>
                        </div>
                    </Container>
                )
            }
            return (
                <Container size={420} my={40}>
                    <div   {...form_onSubmit(() => { })}>
                        <Title ta="center" className={classes.title}>
                            找回密码
                        </Title>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            人工协助请写信至邮箱 work7z@outlook.com
                        </Text>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            想起密码了？{' '}
                            <Link to="/settings/my-account?type=signin">
                                <Anchor type='button' size="sm" component="button">
                                    返回登录
                                </Anchor>
                            </Link>
                        </Text>

                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput

                                {...rh?.bindOnChange({
                                    npStateKey: 'email'
                                })}

                                name='email' label="注册Email地址" placeholder="请填写当时注册用的Email" />
                            <PasswordInput
                                {...rh?.bindOnChange({
                                    npStateKey: 'password'
                                })}

                                name='password' label="新密码" placeholder="请让新密码尽可能复杂" mt="md" />
                            <PasswordInput
                                {...rh?.bindOnChange({
                                    npStateKey: 'confirmPassword'
                                })}
                                name='confirmPassword' label="确认新密码" placeholder="再次确认您的新密码" mt="md" />
                            <Button onClick={async e => {
                                try {
                                    setLoading_sendmail(true)
                                    e.preventDefault()
                                    let p1 = rh?.npState?.password as string
                                    let p2 = rh?.npState?.confirmPassword as string
                                    if (p1 != p2) {
                                        throw new Error('两次密码不一致，请重新输入')
                                    }
                                    if (!p1 || !p2) {
                                        throw new Error('密码不能为空')
                                    }
                                    let emailval = rh?.npState?.email
                                    if (!emailval) {
                                        throw new Error('邮箱不能为空')
                                    }
                                    let r = await t_mailsend_findpw({
                                        email: emailval as string,
                                        password: p1,
                                        confirmPassword: p2,
                                    })
                                    AlertUtils.alertSuccess('重置密码邮件已发送，请查收，有效期30分钟')
                                    setPreEMail(rh?.npState?.email as string)
                                    setEnterVCodeMode(true)
                                } catch (e) {
                                    AlertUtils.alertErr(e)
                                } finally {
                                    setLoading_sendmail(false)
                                }
                            }} loading={loading_sendmail} fullWidth mt="xl" color='violet'>
                                发送重置密码邮件
                            </Button>
                        </Paper>
                    </div>
                </Container >
            )
        case 'signup':
            return (
                <Container size={420} my={40} >
                    <div  {
                        ...form_onSubmit(() => { })
                    }>
                        <Title ta="center" className={classes.title}>
                            注册新用户
                        </Title>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            已经有账户了？{' '}
                            <Link to='/settings/my-account?type=signin'>
                                <Anchor type='button' size="sm" component="button">
                                    立即登录
                                </Anchor>
                            </Link>
                        </Text>

                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput
                                {...rh?.bindOnChange({
                                    npStateKey: 'userName'
                                })}
                                label="用户名" placeholder="mina" />
                            <TextInput label="Email"
                                {...rh?.bindOnChange({
                                    npStateKey: 'email'
                                })}

                                name='email' placeholder="mina@gmail.com" mt="md" />
                            <PasswordInput
                                {...rh?.bindOnChange({
                                    npStateKey: 'password'
                                })}

                                label="密码" name='password' placeholder="请让密码尽可能复杂" mt="md" />
                            <PasswordInput
                                {...rh?.bindOnChange({
                                    npStateKey: 'confirmPassword'
                                })}
                                label="确认密码" name='confirmPassword' placeholder="再次确认您本次设定的密码" mt="md" />
                            <Group justify="space-between" mt="lg">
                                <Checkbox
                                    {...rh?.bindOnChange({
                                        npStateKey: 'agreeOrNot'
                                    })}
                                    defaultChecked
                                    onChange={e => {
                                        rh.updateNonPState({
                                            agreeOrNot: !e.target.checked ? 'off' : 'on'
                                        })
                                    }}
                                    name='agreeOrNot' label={
                                        <Text size="sm" className='text-xs'>
                                            我已经阅读并同意 <Link to='/settings/terms-of-conditions' target='_blank'>
                                                <Anchor type='button' size='xs'>
                                                    《服务条款》
                                                </Anchor>
                                            </Link> 和
                                            <Link to='/settings/privacy-agreement' target='_blank'>
                                                <Anchor type='button' size='xs'>
                                                    《隐私保护协议》
                                                </Anchor>
                                            </Link>
                                        </Text>
                                    } />
                            </Group>
                            <Button onClick={async e => {
                                try {
                                    e.preventDefault()
                                    if ('on' != rh.npState?.agreeOrNot) {
                                        AlertUtils.alertErr('请先同意服务条款和隐私保护协议')
                                        return;
                                    }
                                    let r = await t_signUp({
                                        preview: false,
                                        rememberMe: true,
                                        userName: rh?.npState?.userName as string,
                                        email: rh?.npState?.email as string,
                                        password: rh?.npState?.password as string,
                                        confirmPassword: rh?.npState?.confirmPassword as string,
                                    })
                                    // r.data.content.signed
                                    if (verifyResponse(r.data)) {
                                        AlertUtils.alertSuccess('恭喜，注册成功！')
                                        ACTION_doSignInByInfo(r.data?.data)
                                    }
                                } catch (e) {
                                    AlertUtils.alertErr(e)
                                }
                            }} fullWidth mt="xl" color='lime' >
                                免费注册
                            </Button>
                        </Paper>
                    </div>
                </Container>
            );
        default:
            return (
                <Container size={420} my={40}>
                    <div >
                        <Title ta="center" className={classes.title}>
                            登录系统
                        </Title>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            提示密码不正确？{' '}
                            <Link to={'/settings/my-account?type=find-pw'}>
                                <Anchor type='button' component="button" size="sm">
                                    找回密码
                                </Anchor>
                            </Link>
                        </Text>

                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput
                                {...rh?.bindOnChange({
                                    npStateKey: 'userName'
                                })}

                                name='userName' label="用户名/Email地址" placeholder="mina 或 mina@gmail.com" />
                            <PasswordInput
                                {...rh?.bindOnChange({
                                    npStateKey: 'password'
                                })}

                                name='password' label="密码" placeholder="用户密码" mt="md" />
                            <Group justify="space-between" mt="lg">
                                <Checkbox
                                    {...rh?.bindOnChange({
                                        npStateKey: 'rememberMe'
                                    })}
                                    onChange={e => {
                                        rh.updateNonPState({
                                            rememberMe: !e.target.checked ? 'off' : 'on'
                                        })
                                    }}

                                    name='rememberMe' defaultChecked label="记住这台设备" />
                                <Link to='/settings/my-account?type=signup' >
                                    <Anchor type='button' size="sm" component="button" >
                                        免费注册
                                    </Anchor>
                                </Link>
                            </Group>
                            <Button fullWidth mt="xl" onClick={async e => {
                                try {
                                    e.preventDefault()
                                    let rm = rh?.npState?.rememberMe == 'on'
                                    let r = await t_signIn({
                                        rememberMe: rm ? true : false,
                                        userName: rh?.npState?.userName as string,
                                        password: rh?.npState?.password as string,
                                    })
                                    // r.data.content.signed
                                    if (verifyResponse(r.data)) {
                                        AlertUtils.alertSuccess("登录成功，欢迎回来")
                                        ACTION_doSignInByInfo(r.data?.data)

                                    }
                                } catch (e) {
                                    AlertUtils.alertErr(e)
                                }
                            }}>
                                登录
                            </Button>
                        </Paper>
                    </div>

                </Container>
            );
    }
}

export default () => {
    return <div>
        <AuthenticationTitle />
    </div>
}
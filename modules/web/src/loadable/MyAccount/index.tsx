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
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import GetAppInfo from '@/AppInfo';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSearchParams } from '@/utils/HistUtils';
import apiSlice, { SignInCredentials, verifyResponse } from '@/store/reducers/apiSlice';
import AlertUtils from '@/utils/AlertUtils';
import { ACTION_doSignInByInfo } from '@/store/actions/auth-actions';
import exportUtils from '@/utils/ExportUtils';
import { IconAt, IconCalendarBolt, IconPhoneCall, IconUserBolt } from '@tabler/icons-react';
import _ from 'lodash';
import AuthUtils from '@/utils/AuthUtils';
import { useState } from 'react';

function AuthenticationTitle() {
    let sp = (useSearchParams())
    const history = useHistory()
    const [t_signIn] = apiSlice.useLazySignInQuery({})
    const [t_signUp] = apiSlice.useLazySignUpQuery({})
    const [t_tellmevcode_findpw] = apiSlice.useLazyTellMeVCode4FindPwQuery({})
    const [t_mailsend_findpw] = apiSlice.useLazyMailFindPwQuery({})
    const [enterVCodeMode, setEnterVCodeMode] = useState(false)
    const [loading_sendmail, setLoading_sendmail] = useState(false)
    const [preEMail, setPreEMail] = useState('')
    const uObj = exportUtils.useSelector(v => v.users)
    if (uObj.hasSignIn && sp.type != 'find-pw') {
        return (
            <Container size={420} my={40}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
                                    加入于 {_.toString(uObj.userInfo?.createdAt) || "N/A"}
                                </Text>
                            </Group>


                            <Group wrap="nowrap" gap={10} mt={5}>
                                <IconUserBolt stroke={1.5} size="1rem" className={classes.icon} />
                                <Text fz="xs" c="dimmed">
                                    更多用户管理功能，敬请期待
                                </Text>
                            </Group>
                        </div>
                    </Group>
                </Paper>
                <Paper withBorder shadow="md" p={10} mt={10} radius="md">
                    <Group wrap="nowrap">
                        <Button color='violet' onClick={() => {
                            AuthUtils.signOut()
                        }}>
                            用户登出
                        </Button>
                        <Link to='/settings/my-account?type=find-pw'>
                            <Button color='indigo' onClick={() => {
                            }}>
                                修改密码
                            </Button>
                        </Link>
                        <Link to='/settings/feedback'>
                            <Button color='blue' onClick={() => {
                            }}>
                                建议与反馈
                            </Button>
                        </Link>
                    </Group>
                </Paper>
            </Container>
        )
    }
    switch (sp.type) {

        case 'find-pw':
            if (enterVCodeMode) {
                return (
                    <Container size={420} my={40}>
                        <form onSubmit={async e => {
                            try {
                                e.preventDefault()
                                let form = e.target as HTMLFormElement
                                let data = new FormData(form)
                                let r = await t_tellmevcode_findpw({
                                    email: preEMail,
                                    vcode: data.get('vcode') as string,
                                })
                                if (r.data?.data?.verified) {
                                    AlertUtils.alertSuccess('重置成功，将跳转到登录界面')
                                    setTimeout(() => {
                                        history.push('/')
                                    }, 1000)
                                } else {
                                    throw new Error('验证码错误，请重新输入')
                                }
                            } catch (e) {
                                AlertUtils.alertErr(e)
                            }
                        }}>
                            <Title ta="center" className={classes.title}>
                                确认邮箱验证码
                            </Title>
                            <Text c="dimmed" size="sm" ta="center" mt={5}>
                                我们已发送邮箱 到 {preEMail}，请查收并输入验证码。  如若没有收到邮件，请先 检查垃圾箱 或者{' '}
                                <Anchor size="sm" component="button" onClick={() => {
                                    setEnterVCodeMode(false)
                                }}>
                                    重新发送
                                </Anchor>
                            </Text>

                            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                                <TextInput type='number' name='vcode' label="6位数字验证码" placeholder="输入以确认本次重置操作" mt="md" />
                                <Button type='submit' fullWidth mt="xl" color='violet'>
                                    确认重置
                                </Button>
                            </Paper>
                        </form>
                    </Container>
                )
            }
            return (
                <Container size={420} my={40}>
                    <form onSubmit={async e => {
                        try {
                            setLoading_sendmail(true)
                            e.preventDefault()
                            let form = e.target as HTMLFormElement
                            let data = new FormData(form)
                            let p1 = data.get('password') as string
                            let p2 = data.get('confirmPassword') as string
                            if (p1 != p2) {
                                throw new Error('两次密码不一致，请重新输入')
                            }
                            if (!p1 || !p2) {
                                throw new Error('密码不能为空')
                            }
                            let emailval = data.get('email')
                            if (!emailval) {
                                throw new Error('邮箱不能为空')
                            }
                            let r = await t_mailsend_findpw({
                                email: emailval as string,
                                password: p1,
                                confirmPassword: p2,
                            })
                            AlertUtils.alertSuccess('重置密码邮件已发送，请查收，有效期30分钟')
                            setPreEMail(data.get('email') as string)
                            setEnterVCodeMode(true)
                        } catch (e) {
                            AlertUtils.alertErr(e)
                        } finally {
                            setLoading_sendmail(false)
                        }
                    }}>
                        <Title ta="center" className={classes.title}>
                            找回密码
                        </Title>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            人工协助请写信至邮箱 work7z@outlook.com
                        </Text>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            想起密码了？{' '}
                            <Link to="/settings/my-account?type=signin">
                                <Anchor size="sm" component="button">
                                    返回登录
                                </Anchor>
                            </Link>
                        </Text>

                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput name='email' label="注册Email地址" placeholder="请填写当时注册用的Email" />
                            <PasswordInput name='password' label="新密码" placeholder="请让新密码尽可能复杂" mt="md" />
                            <PasswordInput name='confirmPassword' label="确认新密码" placeholder="再次确认您的新密码" mt="md" />
                            <Button type='submit' loading={loading_sendmail} fullWidth mt="xl" color='violet'>
                                发送重置密码邮件
                            </Button>
                        </Paper>
                    </form>
                </Container >
            )
        case 'signup':
            return (
                <Container size={420} my={40} >
                    <form onSubmit={async e => {
                        try {
                            e.preventDefault()
                            let form = e.target as HTMLFormElement
                            let data = new FormData(form)
                            let r = await t_signUp({
                                preview: false,
                                rememberMe: true,
                                userName: data.get('userName') as string,
                                email: data.get('email') as string,
                                password: data.get('password') as string,
                                confirmPassword: data.get('confirmPassword') as string,
                            })
                            // r.data.content.signed
                            if (verifyResponse(r.data)) {
                                AlertUtils.alertSuccess('恭喜，注册成功！1秒后刷新界面')
                                ACTION_doSignInByInfo(r.data?.data)
                            }
                        } catch (e) {
                            AlertUtils.alertErr(e)
                        }
                    }}>
                        <Title ta="center" className={classes.title}>
                            注册新用户
                        </Title>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            已经有账户了？{' '}
                            <Link to='/settings/my-account?type=signin'>
                                <Anchor size="sm" component="button">
                                    立即登录
                                </Anchor>
                            </Link>
                        </Text>


                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput label="用户名" name='userName' placeholder="mina" />
                            <TextInput label="Email" name='email' placeholder="mina@gmail.com" mt="md" />
                            <PasswordInput label="密码" name='password' placeholder="请让密码尽可能复杂" mt="md" />
                            <PasswordInput label="确认密码" name='confirmPassword' placeholder="再次确认您本次设定的密码" mt="md" />
                            <Group justify="space-between" mt="lg">
                                <Checkbox defaultChecked name='agreeOrNot' label={
                                    <Text size="sm" className='text-xs'>
                                        我已经阅读并同意 <Link to='/settings/terms-of-conditions' target='_blank'>
                                            <Anchor size='xs'>
                                                《服务条款》
                                            </Anchor>
                                        </Link> 和
                                        <Link to='/settings/privacy-agreement' target='_blank'>
                                            <Anchor size='xs'>
                                                《隐私保护协议》
                                            </Anchor>
                                        </Link>
                                    </Text>
                                } />
                            </Group>
                            <Button fullWidth mt="xl" color='lime' type='submit'>
                                免费注册
                            </Button>
                        </Paper>
                    </form>
                </Container>
            );
        default:
            return (
                <Container size={420} my={40}>
                    <form onSubmit={async e => {
                        try {
                            e.preventDefault()
                            let form = e.target as HTMLFormElement
                            let data = new FormData(form)
                            let rm = data.get("rememberMe") === 'on'
                            let r = await t_signIn({
                                rememberMe: rm ? true : false,
                                userName: data.get('userName') as string,
                                password: data.get('password') as string,
                            })
                            // r.data.content.signed
                            if (verifyResponse(r.data)) {
                                AlertUtils.alertSuccess("登录成功，欢迎回来，1秒后刷新界面")
                                ACTION_doSignInByInfo(r.data?.data)
                            }
                        } catch (e) {
                            AlertUtils.alertErr(e)
                        }
                    }}>

                        <Title ta="center" className={classes.title}>
                            登录系统
                        </Title>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            提示密码不正确？{' '}
                            <Link to={'/settings/my-account?type=find-pw'}>
                                <Anchor component="button" size="sm">
                                    找回密码
                                </Anchor>
                            </Link>
                        </Text>

                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput name='userName' label="用户名/Email地址" placeholder="mina 或 mina@gmail.com" />
                            <PasswordInput name='password' label="密码" placeholder="用户密码" mt="md" />
                            <Group justify="space-between" mt="lg">
                                <Checkbox name='rememberMe' defaultChecked label="记住这台设备" />
                                <Link to='/settings/my-account?type=signup'>
                                    <Anchor size="sm" component="button">
                                        免费注册
                                    </Anchor>
                                </Link>
                            </Group>
                            <Button type='submit' fullWidth mt="xl">
                                登录
                            </Button>
                        </Paper>
                    </form>

                </Container>
            );
    }
}

export default () => {
    return <div>
        <AuthenticationTitle />
    </div>
}
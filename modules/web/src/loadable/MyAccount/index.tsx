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
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import GetAppInfo from '@/AppInfo';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSearchParams } from '@/utils/HistUtils';
import apiSlice, { SignInCredentials, verifyResponse } from '@/store/reducers/apiSlice';
import AlertUtils from '@/utils/AlertUtils';
import { ACTION_doSignInByInfo } from '@/store/actions/auth-actions';

function AuthenticationTitle() {
    let sp = (useSearchParams())
    const [t_findPw] = apiSlice.useLazyFindPwQuery({})
    const [t_signIn] = apiSlice.useLazySignInQuery({})
    const [t_signUp] = apiSlice.useLazySignUpQuery({})
    switch (sp.type) {
        case 'find-pw':
            return (
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        找回密码
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        是否需要人工协助？{' '}
                        <Link to='mailto:work7z@outlook.com'>
                            <Anchor size="sm" component="button">
                                联系我们
                            </Anchor>
                        </Link>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput label="注册Email地址" placeholder="请填写当时注册用的Email" />
                        <PasswordInput label="新密码" placeholder="请让新密码尽可能复杂" mt="md" />
                        <PasswordInput label="确认新密码" placeholder="再次确认您的新密码" mt="md" />
                        <Button fullWidth mt="xl" color='violet'>
                            发送重置密码邮件
                        </Button>
                    </Paper>
                </Container>
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
                            debugger;
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
                            还没有建立新用户？{' '}
                            <Link to='/settings/my-account?type=signup'>
                                <Anchor size="sm" component="button">
                                    免费注册
                                </Anchor>
                            </Link>
                        </Text>

                        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                            <TextInput name='userName' label="用户名/Email地址" placeholder="mina 或 mina@gmail.com" />
                            <PasswordInput name='password' label="密码" placeholder="用户密码" mt="md" />
                            <Group justify="space-between" mt="lg">
                                <Checkbox name='rememberMe' defaultChecked label="记住这台设备" />
                                <Link to={'/settings/my-account?type=find-pw'}>
                                    <Anchor component="button" size="sm">
                                        忘记密码?
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
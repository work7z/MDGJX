import GetAppInfo from '@/AppInfo';
import apiSlice from '@/store/reducers/apiSlice';
import AlertUtils from '@/utils/AlertUtils';
import exportUtils from '@/utils/ExportUtils';
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function GetInTouchSimple() {
    const userObj = exportUtils.useSelector(v => v.users.userInfo)
    const form = useForm({
        initialValues: {
            name: '',
            email: userObj?.email || '',
            subject: '',
            content: '',
        },
        validate: {
            // name: (value) => value.trim().length < 2,
            // email: (value) => !/^\S+@\S+$/.test(value),
            content: (value) => value.trim().length == 0,
        },
    });
    const [t] = apiSlice.useLazySendFeedbackQuery({})
    const appInfo = GetAppInfo()
    return (
        <Container size="sm">
            <form onSubmit={form.onSubmit((e) => {
                console.log('err', e)
                t(e).then(() => {
                    AlertUtils.alertSuccess("感谢您的反馈！我们会尽快回复您！")
                })
            })}>
                <Title
                    order={2}
                    size="h1"
                    style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
                    fw={900}
                    ta="center"
                >
                    {appInfo.name}({appInfo.version})
                </Title>
                <Title
                    order={3}
                    size="xl"
                    style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
                    fw={900}
                    ta="center"
                    mt="sm"
                >
                    如果您喜欢我们的开源软件，请考虑参与开源建设或者升级到专业版以支持我们！
                </Title>


                <div className='mt-10' >
                    <Title order={5}>软件迭代历程</Title>
                    <ul className='list-disc'>
                        <li>Work7zCentre - 2019年11月</li>
                        <li>GUtils - 2020年1月</li>
                        <li>CodeGen工具箱 - 2022年3月</li>
                        <li>LafTools工具箱 - 2023年10月</li>
                        <li>秒达工具箱 - 2024年4月</li>
                        <li>...</li>
                    </ul>
                </div>

                <div className='mt-10' >
                    <Title order={5}>联系方式</Title>
                    <ul className='list-disc'>
                        <li>
                            官方QQ群：{appInfo.qqGroup}
                        </li>
                        <li>
                            联系邮箱：work7z@outlook.com
                        </li>

                        <li>
                            所有源代码: {appInfo.githubRepo}
                        </li>
                        <li>
                            开发者Ryan的微信：lafting755
                        </li>
                        <li>
                            哔哩哔哩账号：<a href='https://space.bilibili.com/1343908691?spm_id_from=333.1007.0.0'>CodeGen工具箱(未来可能更名)</a>
                        </li>
                    </ul>
                </div>

                <div className='mt-10' >
                    <Title order={5}>编译信息</Title>
                    <ul className='list-disc'>
                        <li>版本号: {appInfo.version}</li>
                        <li>编译日期: {appInfo.releaseDate}</li>
                        <li>编译时间: {new Date(parseInt(appInfo.timestamp) * 1000).toString()}(自动化部署)</li>
                    </ul>
                </div>

            </form>
        </Container>
    );
}
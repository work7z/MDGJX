import GetAppInfo from '@/AppInfo';
import apiSlice from '@/store/reducers/apiSlice';
import AlertUtils from '@/utils/AlertUtils';
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function GetInTouchSimple() {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
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
                    建议与反馈
                </Title>
                <Title
                    order={3}
                    size="xl"
                    style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
                    fw={900}
                    ta="center"
                    mt="sm"
                >
                    有任何问题或建议，请告诉我们，我们会尽快回复您并改进！
                </Title>


                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
                    <TextInput
                        label="电子邮箱(Email)"
                        placeholder="我们将通过此邮箱回复您的消息"
                        name="email"
                        {...form.getInputProps('email')}
                    />
                </SimpleGrid>

                <TextInput
                    label="主题(可选)"
                    placeholder="此处填写您的建议或反馈的主题，可留空"
                    mt="md"
                    name="subject"
                    {...form.getInputProps('subject')}
                />
                <Textarea
                    mt="md"
                    label="内容"
                    placeholder="此处填写您的建议或反馈"
                    maxRows={10}
                    minRows={5}
                    autosize
                    name="content"
                    {...form.getInputProps('content')}
                />

                <Group justify="center" mt="xl">
                    <Button type="submit" size="md">
                        发送反馈
                    </Button>
                </Group>
            </form>
            <div className='mt-4'>
                除了通过提交表单反馈，您还可以通过以下方式联系我们：
                <ul className={
                    `list-disc ml-4 mt-2`
                }>
                    <li>邮箱：work7z@outlook.com</li>
                    <li>
                        GitHub:
                        <a href={GetAppInfo().githubRepo + '/issues/new'} target='_blank'>
                            <Anchor>
                                提交工单
                            </Anchor>
                        </a>
                    </li>
                </ul>
            </div>
        </Container>
    );
}
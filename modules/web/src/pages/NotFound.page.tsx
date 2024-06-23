import { GeneralLayout as GeneralLayout } from '@/containers/Layout/Layout';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure, useDocumentTitle } from '@mantine/hooks';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './NotFoundTitle.module.css';
import { Link, useHistory } from 'react-router-dom';

export function NotFoundTitle() {
    const hist = useHistory()
    return (
        <Container className={classes.root}>
            <div className={classes.label}>404 Not Found</div>
            <Title className={classes.title}>Oops! 此页面不存在</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                很抱歉，此页面未找到，您可能输入了错误的地址，或者页面已经被移动到了另一个URL。
            </Text>
            <Group justify="center">
                <Button variant="gradient" size="md" onClick={x => {
                    hist.push('/')
                }}>
                    回到首页
                </Button>
            </Group>
        </Container>
    );
}
export function NotFoundPage() {
    useDocumentTitle('404 Not Found')
    return (
        <NotFoundTitle />
    );
}
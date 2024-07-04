import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import AlertUtils from '@/utils/AlertUtils';
import GetAppInfo from '@/AppInfo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { isDesktopMode } from '@/utils/DesktopUtils';
import { isPortalMode } from '@/utils/PortalUtils';

export function HeroText() {
    const history = useHistory()
    return (
        <Container className={classes.wrapper} size={1400} style={{
            paddingBottom: '59px',
            paddingTop: '54px'
        }}>
            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    一款能让你效率{' '}
                    <Text component="span" className={classes.highlight} inherit>
                        脱颖而出
                    </Text>{' '}
                    的开源工具箱
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                        本站致力于提供全方位的工具和文档资源，基于AI智能分析的加持，让你的生活工作更加便捷，再也不需要在收藏夹里面四处寻找，一站式搞定！
                    </Text>
                </Container>

               {
                  isPortalMode()? <>
                        <div className={classes.controls}>
                            <Button onClick={() => {
                                window.open(GetAppInfo().githubRepo)
                            }} className={classes.control} size="lg" variant="default" color="gray">
                                项目源代码(GitHub)
                            </Button>
                            <Button
                                onClick={() => {
                                    history.push(`/settings/install?type=desktop2`)
                                }}
                                className={classes.control} size="lg">
                                下载桌面版(Desktop)
                            </Button>
                        </div>
                  </> : <div className={classes.controls}>
                        <Button  onClick={() => {
                            window.open(GetAppInfo().githubRepo)
                        }} className={classes.control} size="lg" variant="default" color="gray">
                            项目源代码(GitHub)
                        </Button>
                        <Button
                            onClick={() => {
                                    history.push(`/marketplace/index`)
                            }}
                            className={classes.control} size="lg">
                            安装新插件(Plugins)
                        </Button>
                    </div>
               }
            </div>
        </Container>
    );
}
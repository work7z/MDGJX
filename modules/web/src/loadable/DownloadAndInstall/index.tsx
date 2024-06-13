import { Overlay, Container, Title, Button, Text, Tabs, Alert, Modal } from '@mantine/core';
import classes from './HeroContentLeft.module.css';
import { useWrapWithTitle } from '@/containers/Layout/Layout';
import AlertUtils from '@/utils/AlertUtils';
import ListTable from './ListTable';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { IconClock24 } from '@tabler/icons-react';

export default () => {
    // https://dkstatic.mdgjx.com/hello.html
    // https://dkstatic.mdgjx.com/test/desktop2/MDGJX-desktop-v5.3.96-win-x64.zip
    // useWrapWithTitle(`下载与更新`)
    const hist = useHistory()
    const [showDownloadPage, setShowDownloadPage] = useState(false)
    const [type, onType] = useState(queryString.parse(hist.location.search)?.type||'desktop2')
    const justJSX = <>
        <Tabs value={type + ''} onChange={e => {
            onType(e + '')
        }}>
            <Tabs.List>
                <Tabs.Tab value={'desktop2'} >下载桌面端(Desktop)</Tabs.Tab>
                <Tabs.Tab value={'docker'} >应用自部署(Docker)</Tabs.Tab>
            </Tabs.List>
        </Tabs>
        {
            type == 'docker' ? <p className='p-2 mt-2'>
                <div>🚀 Docker部署命令行:</div>
                <Alert>
                    docker run -e LAFREGION=CN -e APPLANG=zh_CN --name mylaftools -v ~/.laftools-docker:/root/.laftools -d -p 0.0.0.0:39899:39899 codegentoolbox/laftools-linux-x64:latest
                </Alert>
                <div className='mt-2'>
                    <a href={'https://hub.docker.com/r/codegentoolbox/laftools-linux-x64'} target='_blank' className='text-blue-500'>🔗 Docker Hub - laftools-linux-x64</a>
                    <a href={'https://hub.docker.com/r/codegentoolbox/laftools-arm64-x64'} target='_blank' className='text-blue-500'>🔗 Docker Hub - laftools-arm64-x64</a>
                </div>
                <div>注意：Docker版本目前为Beta版本，如果部署过程中存在问题，需要更多帮助请在GitHub上联系我们，谢谢！</div>
            </p> : <div>
                <div className='my-2'>
                    <Alert p={5} variant="light" color="green" title="本软件完全开源，无任何恶意代码，请信任并忽略报毒错误，我们也正在申请软件签名证书，敬请理解" icon={<IconClock24 />}>
                    </Alert>

                </div>
                <ListTable />
            </div>
        }
        </>
    return <div className='m-[-10px]'>
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container} size="md">
                <Title className={classes.title}>
                    秒达工具箱 - 下载页 
                </Title>
                <Text className={classes.description} size="xl" mt="xl">
                   一步之遥，您将在本页面下载到最新版本的秒达工具箱！目前，秒达工具箱已支持Windows系统、Mac系统、Linux系统(涵盖AMD64与ARM64架构)。请放心，工具箱将在未来迭代中不断得到完善。
                </Text>

              <a href='#detail'>
                    <Button variant="gradient" size="xl" radius="xl" className={classes.control} onClick={()=>{
                        // AlertUtils.alertSuccess(`加载资源成功，请在下方表格选择对应的平台，并单击下载链接以进行下载安装。`)
                        setShowDownloadPage(true)
                        // // scroll to detail
                        // const d = document.getElementById('detail')
                        // if(d){
                        //     window.scrollTo({
                        //         top: d.offsetTop-100,
                        //         behavior: 'smooth' })
                        // }
                    }}>
                        立即下载
                    </Button>
              </a>
            </Container>
        </div>
       <Container size='lg' className='mt-8 ' id='detail'>
           {justJSX}
       </Container>
        <Modal  fullScreen opened={showDownloadPage} onClose={() => {
            setShowDownloadPage(false)
        }} title={
            `下载详情`
        }>
            <div className='w-[80vw]'>

           {justJSX}
            </div>
        </Modal>
    </div>
}
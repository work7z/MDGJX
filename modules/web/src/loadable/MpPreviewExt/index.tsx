import GenCodeMirror from '@/components/GenCodeMirror';
import localApiSlice from '@/store/reducers/localApiSlice';
import { useMDParams, useMDQuery } from '@/systemHooks';
import AlertUtils from '@/utils/AlertUtils';
import { sleep } from '@/utils/CommonUtils';
import exportUtils from '@/utils/ExportUtils';
import {
  Alert,
  Box,
  Button,
  Card,
  LoadingOverlay,
  NativeSelect,
  Tabs,
  Title,
  rem,
} from '@mantine/core';
import {
  IconAppWindow,
  IconBrandBlogger,
  IconInfoCircle,
  IconMacro,
  IconMenu,
  IconMessage,
  IconMessageCircle,
  IconPhoto,
  IconRun,
  IconSettings,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default () => {
  const rh = exportUtils.register('mppreviewext', {
    getNotPersistedStateFn() {
      return {
        searchText: '',
        pluginId: '',
      };
    },
    getPersistedStateFn() {
      return {
        tabId: 'main',
      };
    },
  });

  const extListRes = localApiSlice.useGetExtListWithSearchQuery(
    {
      searchText: rh?.npState?.searchText || '',
      searchSource: 'local-dev-ext',
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000 * 60 * 10,
    }
  );
  const [lazyExtHarmfulDoJob] = localApiSlice.useLazyExtHarmfulDoJobQuery({});
  const extGetStatusQueryRes = localApiSlice.useExtHarmfulGetStatusQuery(
    {
      id: rh?.npState?.pluginId || '',
      type: 'get-all',
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 1000 * 20,
      skip: !rh?.npState?.pluginId,
    }
  );

  const iconStyle = { width: rem(12), height: rem(12) };

  const fData = extListRes?.data?.data;
  const configItem = fData?.allMetaInfo?.find((x) => x.id == rh?.npState?.pluginId);

  useEffect(() => {
    const pid = rh?.npState?.pluginId;
    if (!pid) {
      if (fData && rh) {
        rh.updateNonPState({
          pluginId: fData?.allMetaInfo[0]?.id,
        });
      }
    }
  }, [rh?.npState?.pluginId, fData]);

  const md = useMDParams();
  const [refreshCtn, setRefreshCtn] = useState(0);

  if (!rh) {
    return '';
  }
  const refreshFn = async () => {
    setRefreshCtn(Date.now());
    AlertUtils.alertInfo('刷新中');
    await extListRes.refetch();
    setRefreshCtn(Date.now());
    await extGetStatusQueryRes.refetch();
    setRefreshCtn(Date.now());
    await sleep(3000);
    setRefreshCtn(Date.now());
    AlertUtils.alertSuccess('刷新成功');
  };
  const controls: {
    label: string;
    color?: string;
    onclick?: () => void;
  }[] = [
    {
      label: '刷新',
      color: 'green',
      onclick: refreshFn,
    },
    // {
    //     label: '初始化',
    //     color: 'grape',
    //     onclick: async () => {
    //         AlertUtils.alertWarn('初始化操作不支持在页面操作，请直接到插件下执行初始化操作。')
    //         if(true){
    //             return;
    //         }
    //         // AlertUtils.alertInfo('操作中')
    //         // if (!rh?.npState?.pluginId) {
    //         //     AlertUtils.alertErr('请先选择插件')
    //         //     return
    //         // }
    //         // await lazyExtHarmfulDoJob({
    //         //     id: rh?.npState?.pluginId,
    //         //     type: 'setup'
    //         // })
    //         // await refreshFn()
    //         // AlertUtils.alertSuccess('初始化成功')
    //     }
    // },
    // {
    //   label: '启动服务',
    //   onclick: async () => {
    //     AlertUtils.alertInfo('执行中');
    //     if (!rh?.npState?.pluginId) {
    //       AlertUtils.alertErr('请先选择插件');
    //       return;
    //     }
    //     await lazyExtHarmfulDoJob({
    //       id: rh?.npState?.pluginId,
    //       type: 'start-service',
    //     });
    //     await refreshFn();
    //     AlertUtils.alertSuccess('执行启动服务成功');
    //   },
    // },
    // {
    //   label: '关闭服务',
    //   color: 'pink',
    //   onclick: async () => {
    //     AlertUtils.alertInfo('关闭中');
    //     if (!rh?.npState?.pluginId) {
    //       AlertUtils.alertErr('请先选择插件');
    //       return;
    //     }
    //     await lazyExtHarmfulDoJob({
    //       id: rh?.npState?.pluginId,
    //       type: 'stop-service',
    //     });
    //     await refreshFn();
    //     AlertUtils.alertSuccess('执行关闭服务成功');
    //   },
    // },
  ];
  return (
    <div className="flex flex-row space-x-2">
      <div className="flex-1 w-[calc(100%-350px)]">
        <Card withBorder className="w-full h-[calc(100vh-90px)]">
          <div className="w-full h-full ">
            <Tabs
              value={rh?.pState?.tabId}
              onChange={(e) => {
                rh.updatePState({
                  tabId: e + '',
                });
              }}
            >
              <Tabs.List>
                <Tabs.Tab value="main" leftSection={<IconAppWindow style={iconStyle} />}>
                  主界面
                </Tabs.Tab>
                <Tabs.Tab value="menu" leftSection={<IconMenu style={iconStyle} />}>
                  模拟菜单
                </Tabs.Tab>
                <Tabs.Tab value="config" leftSection={<IconInfoCircle style={iconStyle} />}>
                  插件配置
                </Tabs.Tab>
                {/* <Tabs.Tab value="setup" leftSection={<IconMessage style={iconStyle} />}>
                                初始化日志
                            </Tabs.Tab> */}
                {/* <Tabs.Tab value="settings" leftSection={<IconMessage style={iconStyle} />}>
                                服务日志
                            </Tabs.Tab> */}
              </Tabs.List>

              <Tabs.Panel value="menu">
                <p className='p-2'>
                  <Alert title="什么是模拟菜单？" color="teal">
一个插件可以生成多个菜单栏，本标签页旨在提供插件配置中的菜单选项的选择。也就是说，当您需要切换到指定页面时，可以先点击目标菜单，再返回到主页面进行查看。
                  </Alert>

                </p>
</Tabs.Panel>

              <Tabs.Panel value="main">
                <iframe
                  key={'m' + refreshCtn}
                  src={configItem?.development?.entryLink}
                  className="border-[1px] border-gray-300 mt-2 outline-none m-0 w-full h-[calc(100vh-200px)]"
                />
              </Tabs.Panel>

              <Tabs.Panel value="setup">
                目前，初始化操作不支持在页面显示，请直接到插件下执行初始化操作。
              </Tabs.Panel>

              <Tabs.Panel value="config">
                <div className='overflow-y h-[500px]'>
                  <GenCodeMirror
                    directValue={JSON.stringify(configItem, null, 2)}
                    language="json"
                    bigTextId={''}
                  />
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </Card>
      </div>
      <div className="w-[350px] relative">
        <Box pos="relative">
          <LoadingOverlay
            visible={extGetStatusQueryRes.isFetching}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          {/* ...other content */}
        </Box>
        <Card withBorder>
          <div className="space-y-2">
            <NativeSelect
              {...rh?.bindOnChange({
                npStateKey: 'pluginId',
              })}
              label="目标插件"
              description="选择需要预览的插件名"
              data={fData?.allMetaInfo?.map((x) => ({ label: x.name, value: x.id }))}
            />
            {/* <NativeSelect label="插件 - 预览模块" description="选择需要预览的目标模块" data={['React', 'Angular', 'Vue']} /> */}
          </div>
          <div className="mt-4  ">
            {controls.map((x) => {
              return (
                <Button
                  onClick={x.onclick}
                  color={x.color || 'blue'}
                  variant="outline"
                  className="mr-2 mb-2"
                  size="compact-sm"
                >
                  {x.label}
                </Button>
              );
            })}
          </div>
          <div className="mt-4">
            <b>插件元信息:</b>
            <div className="text-xs">
              <ul>
                <li>插件名：{rh?.npState?.pluginId}</li>
                <li>
                  刷新时间:{' '}
                  {dayjs(extGetStatusQueryRes?.fulfilledTimeStamp).format('YYYY-MM-DD HH:mm:ss')}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <Alert title={`关于开发者中心的使用说明`} color="lime">
              本页面仅对开发人员开放，且用户需要在完整的开发者环境下进行操作。
              <br />
              注意，这里指的不是安装成品的秒达工具箱软件，而是源代码开发，即您需要拉取源代码和初始化开发环境，基于此进行本地插件开发。
              <br />
              <p>若对本页面有任何疑问，请通过页面底部的【联系我们】来获取更多帮助。</p>
            </Alert>
          </div>
          <div className="mt-4">
            <Alert title={`如何进行插件开发？`} color="indigo">
              <ul className="list-decimal  pl-5">
                <li>每次修改插件配置后，需执行update-miaoda-config.sh</li>
                <li>插件根目录下运行npm run md-dev-setup以初始化</li>
                <li>插件根目录下运行npm run md-dev-run以运行服务</li>
              </ul>
            </Alert>
          </div>
        </Card>
      </div>
    </div>
  );
};

import { Tabs, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconAppWindow } from '@tabler/icons-react';

export default () => {
    const iconStyle = { width: rem(12), height: rem(12) };

    return (
        <Tabs defaultValue="Token生成器">
            <Tabs.List>
                {
                    ['Token生成器', 'Hash工具'].map(x => {
                        return (
                            <Tabs.Tab value={x} >
                                {x}
                            </Tabs.Tab>
                        )
                    })
                }
            </Tabs.List>
        </Tabs>
    );
}
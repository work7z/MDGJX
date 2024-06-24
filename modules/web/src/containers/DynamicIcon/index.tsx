
import React from 'react';
import LoadableWrapper from '@/components/LoadableWrapper';
import { IconLoader } from '@tabler/icons-react';
export const DynamicIcon = ({ icon }: { icon?: string }) => {
    const dftJSX= '' // <IconLoader/>
    if (!icon) return dftJSX;

    let picon = 'Icon'+icon

    const f = () => import(`@tabler/icons-react/dist/esm/icons/${picon}.mjs`)

    return <LoadableWrapper defaultJSX={dftJSX} disableLoadingText id={'dyicon' + icon} fn={f}  />
};

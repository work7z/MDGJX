
import React from 'react';
import LoadableWrapper from '@/components/LoadableWrapper';
export const DynamicIcon = ({ icon }: { icon?: string }) => {
    if (!icon) return null;

    let picon = 'Icon'+icon

    const f = () => import(`@tabler/icons-react/dist/esm/icons/${picon}.mjs`)

    return <LoadableWrapper disableLoadingText id={'dyicon' + icon} fn={f}  />
};

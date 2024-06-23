
import React from 'react';
import LoadableWrapper from '@/components/LoadableWrapper';
export const DynamicIcon = ({ icon }: { icon?: string }) => {
    if (!icon) return null;

    const f = () => import(`@tabler/icons-react/dist/esm/icons/${icon}.mjs`)

    return <LoadableWrapper id={'dyicon' + icon} fn={f}  />
};

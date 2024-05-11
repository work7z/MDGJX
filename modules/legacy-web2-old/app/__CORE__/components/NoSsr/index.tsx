// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import React, { useEffect, useState } from 'react';

const NoSsr = ({ children }): JSX.Element => {
    const [isMounted, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    return <>{isMounted ? children : null}</>;
};

export default NoSsr;
import React from "react";
import LoadingView from "../LoadingView";

export default (props: { fn: any }) => {
    const JohanComponent: any = React.lazy(props.fn);

    return <React.Suspense fallback={
        <LoadingView />
    } >
        <JohanComponent />
    </ React.Suspense >
}
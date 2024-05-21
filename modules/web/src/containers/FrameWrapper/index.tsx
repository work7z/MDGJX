import AppConstants from "@/AppConstants";
import { useEffect, useRef, useState } from "react";

export const FrameWrapper = ({ src }) => {
    const ref = useRef<any>();
    const [height, setHeight] = useState('100%');

    const onLoad = () => {
        if (ref.current) {
            const ctnWindow: any = (ref.current as any)?.contentWindow as any
            setHeight(ctnWindow.document.body.scrollHeight + 'px');
        }
    };
    useEffect(() => {
        onLoad();
    }, []);

    return (
        <iframe
            ref={e => {
                ref.current = e;
            }}
            onLoad={onLoad}
            className='w-full '
            style={{
            }}
            id='iframe'
            src={src}
            height={height}
            scrolling='no'
            frameBorder='0'
        ></iframe>
    );
};
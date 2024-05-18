import apiSlice from "@/store/reducers/apiSlice"
import { Container, Select, Textarea } from "@mantine/core"
import { useEffect, useState } from "react"
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import ControlBar from "@/components/ControlBar";
import PanelWithSideBar from "@/components/PanelWithSideBar";
import I18nSelect from "@/components/I18nSelect";
import exportUtils from "@/utils/ExportUtils";
import { stat } from "fs";
import _ from "lodash";
import { FN_GetDispatch } from "@/store/nocycle";
import StateSlice from "@/store/reducers/stateSlice";
import { useClipboard } from "@mantine/hooks";
import AlertUtils from "@/utils/AlertUtils";
import Blink from "@/components/Blink";
import { sleep } from "@/utils/CommonUtils";
import CommonTLNBody, { TLNPState, TLNState } from "@/containers/CommonTLNBody";


export type TranslateArg = {
    fn_translate: (text) => Promise<string>;
}
export type TypeJSONTranslateMethods = {
    label: string;
    value: string;
    func: (p: TranslateArg) => {
        //
    };
};

const JSONTranslateMethods: TypeJSONTranslateMethods[] = [
    {
        label: "仅转换[键值对]中的值",
        value: "ValueOnly",
        func: async (p) => {
            //
            return 'handle result'
        }
    },
    {
        label: "仅转换[键值对]中的键",
        value: "KeyOnly",
        func: async (p) => {
            //
            return 'handle result'
        }
    },
    {
        label: "同时转换键值对所有数据",
        value: "KeyAndValue",
        func: async (p) => {
            //
            return 'handle result'
        }
    },
].map(x => {
    x.label = x.label + `(${x.value})`
    return x;
})

export default () => {
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})

    return (
        <CommonTLNBody
            handleTranslate={async (state: TLNState) => {
                const waitArr: Promise<any>[] = []
                // modify source
                function beforeTranslate(value) {
                    return value;
                }

                // modify target
                function afterTranslate(value) {
                    return value;
                }

                // the entire translate logic created for the JSON that you passed
                function translateEntireLogic(passedJSON, fn_translate) {
                    // iterating the variable of which the type is array or object
                    let fn_tran = (value, key, obj) => {
                        if (_.isObject(value) || _.isArray(value)) {
                            _.forEach(value, fn_tran)
                            return;
                        }
                        waitArr.push((async () => {
                            // fn_translate, that function is used as sending requests to CodeGen server
                            let result = await fn_translate(
                                beforeTranslate(value)
                            )
                            obj[key] = afterTranslate(result);

                            if (_.isObjectLike(obj[key]) || _.isArray(obj[key])) {
                            }
                        })())

                    }
                    _.forEach(passedJSON, fn_tran)
                }
                let currentJSONVal = {}
                const tmpKeyJson = 'TMP_KEY_JSON'
                if (!window[tmpKeyJson]) {
                    window[tmpKeyJson] = {}
                }
                try {
                    eval(`window['${tmpKeyJson}']  = ${state?.inputJSON}`)
                    currentJSONVal = window[tmpKeyJson]
                } catch (e) {
                    AlertUtils.alertErr('JSON格式错误，请检查您的输入是否正确')
                    throw new Error('JSON格式错误')
                }
                translateEntireLogic(currentJSONVal, async (value) => {
                    const r = await t_sendReq({
                        text: value || '',
                        type: 'text',
                        sourceLang: state?.sourceLang + "",
                        targetLang: state?.targetLang + ""
                    })
                    const result = r.data?.data?.result
                    return result || '';
                })
                debugger;

                for (let i = 0; i < waitArr.length; i++) {
                    await waitArr[i]
                }
                return JSON.stringify(currentJSONVal, null, 4)
            }}
            id='json'
            label='JSON'
            example={

                `{
    "hello": "你好",
    "world": "世界",
    "internal" : {
        "key": "深层次的key值",
        "key2": "深层次的key值",
key3: {
"a":"更多ceshimina123"
}
    }
}`
            }
        />
    )
}
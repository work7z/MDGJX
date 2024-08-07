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
import json5 from 'json5'

export type TranslateArg = {
    fn_translate: (text) => Promise<string>;
}
export type TypeJSONTranslateMethods = {
    label: string;
    value: string;
    func: (text: string, fn_translate, fn_updateRes?: any, state?: TLNState) => Promise<string>
};

type WPromise = () => Promise<any>
const fn_translate_for_only_value = async (text: string, fn_translate, fn_updateRes, state?: TLNState): Promise<string> => {
    const waitArr: WPromise[] = []
    // modify source
    function beforeTranslate(value) {
        return value;
    }

    // modify target
    function afterTranslate(value) {
        return value;
    }

    let onlyKeys: string[] = []
    if (state && state.onlyTranslateFields) {
        onlyKeys = state.onlyTranslateFields.split(',').map(x => x.trim())
    }

    // the entire translate logic created for the JSON that you passed
    function translateEntireLogic(passedJSON, fn_translate) {
        // iterating the variable of which the type is array or object
        let fn_tran = (value, key, obj) => {
            if (_.isObject(value) || _.isArray(value)) {
                _.forEach(value, fn_tran)
                return;
            }
            waitArr.push(() => {
                return (async () => {
                    let result = value;
                    let needConver=true;
                    if (!_.isEmpty(onlyKeys)) {
                        if (!onlyKeys.includes(key)) {
                            needConver = false;
                        }
                    }
                    if(needConver){
                        // fn_translate, that function is used as sending requests to CodeGen server
                        result = await fn_translate(
                            beforeTranslate(value)
                        )
                    }
                    obj[key] = afterTranslate(result);

                    if (_.isObjectLike(obj[key]) || _.isArray(obj[key])) {
                    }
                })()
            })

        }
        _.forEach(passedJSON, fn_tran)
    }
    let currentJSONVal = {}
    const tmpKeyJson = 'TMP_KEY_JSON'
    if (!window[tmpKeyJson]) {
        window[tmpKeyJson] = {}
    }
    try {
        text = text.trim().replace(/\;$/, '').replace(/^export\s+default/, '')
        window[tmpKeyJson] = json5.parse(text)
        // eval(`window['${tmpKeyJson}']  = ${text}`)
        currentJSONVal = window[tmpKeyJson]
    } catch (e) {
        AlertUtils.alertErr('JSON格式错误，请检查您的输入是否正确')
        throw new Error('JSON格式错误')
    }
    translateEntireLogic(currentJSONVal, fn_translate)

    let str = () => {
        return JSON.stringify(currentJSONVal, null, 4)
    }
    for (let i = 0; i < waitArr.length; i++) {
        fn_updateRes && fn_updateRes(str())
        await waitArr[i]()
    }
    return str()
}

const fn_translate_for_only_key = async (text: string, fn_translate, fn_updateRes, state?: TLNState): Promise<string> => {
    let afterAllGoodsArr: any[] = []

    const waitArr: WPromise[] = []
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

            waitArr.push(() => {
                return (
                    (async () => {
                        let prevKey = key;
                        // fn_translate, that function is used as sending requests to CodeGen server
                        let formattedKey = _.kebabCase(key).replace(/_/g, ' ').trim()
                        let result = await fn_translate(
                            beforeTranslate(formattedKey)
                        )
                        obj[result + ` | ${prevKey}`] = value
                        afterAllGoodsArr.push(() => {
                            delete obj[prevKey]
                        })

                        if (_.isArray(value)) {
                        } else if (_.isObject(value)) {
                            _.forEach(value, fn_tran)
                            return;
                        }
                    })()
                )
            })


        }
        _.forEach(passedJSON, fn_tran)
    }
    let currentJSONVal = {}
    const tmpKeyJson = 'TMP_KEY_JSON2'
    if (!window[tmpKeyJson]) {
        window[tmpKeyJson] = {}
    }
    try {
        // eval(`window['${tmpKeyJson}']  = ${text}`)
        text = text.trim().replace(/\;$/, '').replace(/^export\s+default/, '')
        currentJSONVal = json5.parse(text)
        // json5.parse(text)
        // currentJSONVal = window[tmpKeyJson]
    } catch (e) {
        AlertUtils.alertErr('JSON格式错误，请检查您的输入是否正确')
        throw new Error('JSON格式错误')
    }
    translateEntireLogic(currentJSONVal, fn_translate)

    for (let i = 0; i < waitArr.length; i++) {
        fn_updateRes && fn_updateRes(JSON.stringify(currentJSONVal, null, 4))
        await waitArr[i]
    }
    for (let i = 0; i < afterAllGoodsArr.length; i++) {
        afterAllGoodsArr[i]()
    }
    return JSON.stringify(currentJSONVal, null, 4)
}


export const JSONTranslateMethods: TypeJSONTranslateMethods[] = [
    {
        label: "仅转换Value值",
        value: "ValueOnly",
        func: fn_translate_for_only_value
    },
    {
        label: "仅转换Key值",
        value: "KeyOnly",
        func: fn_translate_for_only_key,
    },
    {
        label: "同时转换Key和Value值",
        value: "KeyAndValue",
        func: async (text: string, fn_translate, fn_updateRes, state?: TLNState): Promise<string> => {
            let result = await fn_translate_for_only_value(text, fn_translate, fn_updateRes, state)
            result = await fn_translate_for_only_key(result, fn_translate, fn_updateRes, state)
            return result
        }
    },
].map(x => {
    x.label = x.label
    return x;
})
export const jsonExample =
    `{
    "timeLimitedAmount": "30010",
    "ruleId": "世界",
    "promotion-price": [12345,100,300],
    "discount_rate_limits": [12345,100,300],
    "apply_time_limits" : {
        "presentTitle": "仅转换Value值是在这里",
        "presentDetails": "仅转换Value值是在这里2",
salesRemarkMap: {
"subProductName":"minacz"
}
    }
}`
export default () => {
    const [t_sendReq] = apiSlice.useLazyTlnSendRequestQuery({})

    return (
        <CommonTLNBody
            saveDataId='json'
            handleTranslate={async (state, fn_translate, fn_updateRes) => {
                let fn_translate_impl = JSONTranslateMethods.find(x => x.value === state.translateMethod)?.func
                if (!fn_translate_impl) {
                    fn_translate_impl = JSONTranslateMethods[0].func
                }
                const result = await fn_translate_impl(state.inputJSON, fn_translate, fn_updateRes, state)
                return result;
            }}
            id='json'
            label='JSON'
            example={
                jsonExample
            }
        />
    )
}
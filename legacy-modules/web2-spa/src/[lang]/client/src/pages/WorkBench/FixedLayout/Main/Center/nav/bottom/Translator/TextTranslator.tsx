
// Date: Tue, 19 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { Button, Card, Popover } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import { Dot } from "../../../../../../../../utils/cTranslationUtils";
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../../../../../../types/workbench-types";
import { Allotment, AllotmentHandle } from "allotment";
import { FN_GetDispatch, FN_GetState, getAjaxResPayloadValue, getAjaxResPayloadValueAsString } from "../../../../../../../../nocycle";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { useCallback, useMemo, useState } from "react";
import _ from 'lodash'
import { useGetI18nLangList } from "../../../../../../../../containers/UserAskMultipleDialogs";
import { SessionViewProp } from "../../../../../../../../containers/MultipleSessionLeftView";
import { NoAvailableDataPanel, NoAvailablePanel } from "../../../../../../../../types/workbench-hook";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import SessionSlice, { SessionAttr } from "../../../../../../../../reducers/container/sessionSlice";
import { EachLang } from "../../../../../../../../types/purejs-types-READ_ONLY";
import Blink from "../../../../../../../../components/Blink";
import { ExportButtonByInputId } from "../../../../../../../../components/ExportButtonByInputId";
import { translateText } from "@/[lang]/client/src/server/translateAction";
import TranslationUtils from "@/__CORE__/utils/cTranslationUtils";

type SrcTarget = "source" | "target";

let EachTranslatorBlock = (props: { onTextChange?: (val: string) => any, bigTextId: string; type: SrcTarget }) => {
  let isSrc = props.type == "source"
  let placeholder =
    isSrc
      ? Dot("L42mxa", "Please input your source text in this field.")
      : Dot("HEAhr", "After translating, the result will appear here.");
  return (
    <div className="h-full w-full inline-block ">
      <GenCodeMirror
        language="text"
        onTextChange={(val: string) => {
          props.onTextChange && props.onTextChange(val)
        }}
        placeholder={placeholder}
        lineWrap={true}
        bigTextId={props.bigTextId}
        key={""}
      ></GenCodeMirror>
    </div>
  );
};

let LanguageChooser = (props: { onSelectLanguage: (newVal: EachLang) => any, lang: string; isSource: boolean; label: string }) => {
  let { isSource } = props;
  let langList = useGetI18nLangList()
  let showLangText = useMemo(() => {
    if (!langList) {
      return "N/A"
    }
    let obj = _.find(langList, (x: EachLang) => {
      if (!x) {
        return false;
      }
      return x.Value == props.lang
    })
    return obj?.Label || 'N/A'
    // return _.first(_.find(langList,x=>{
    //   return null;
    // }));
  }, [props.lang, langList, Date.now()])
  return <Popover placement="bottom" minimal content={<Card className="w-[300px]" style={{
    padding: '15px'
  }} >
    <h2 style={{ margin: 0, fontWeight: 'bold', marginBottom: '7px' }}>{!isSource ? Dot("hJUMN", "Target Language") : Dot("SQAw7", "Source Language")}</h2>
    {
      _.map(langList, x => {
        return <Button
          intent={x && x.Value == props.lang ? 'primary' : 'none'}
          onClick={() => {
            props.onSelectLanguage(x)
          }} small minimal text={x.Label} key={x.Value}></Button>
      })
    }
  </Card>}>
    <Button small minimal text={props.label + ": " + (showLangText)}></Button>
  </Popover>;
};

export default (props: SessionViewProp) => {
  let sessionType = props.sessionType
  let sessionId = props.sessionId;
  let textInputId = sessionId + "ipt";
  let textOutputId = sessionId + "opt";
  let [load, onLoad] = useState<boolean>(false);
  let sessionAttrOrNull: SessionAttr | null = exportUtils.useSelector(v => {
    if (!sessionId) { return null }
    let sessionObj = v.session.sessionTypeKVMap[sessionType]
    if (!sessionObj || !sessionObj?.sessionMap) return null;
    return {
      ...sessionObj.sessionMap[sessionId]
    }
  })
  let fn_textChg = useCallback(_.debounce(async (val) => {
    try {
      let sessionObj = FN_GetState().session.sessionTypeKVMap[sessionType]
      if (!sessionObj) return;
      let map = sessionObj.sessionMap
      if (!map || !sessionId) return;
      let sl = map[sessionId].T_SourceLang
      let tl = map[sessionId].T_TargetLang
      let r = await translateText(val, sl as string, tl);
      let ajaxResValue = r
      FN_GetDispatch()(
        FN_SetTextValueFromOutSideByBigTextId(textOutputId, ajaxResValue as string)
      )
      onLoad(false)
    } catch (e: any) {
      AlertUtils.popError(e)
    }
  }, 200), [textInputId, sessionAttrOrNull, sessionAttrOrNull?.T_SourceLang, sessionAttrOrNull?.T_TargetLang])
  let refreshNow = async () => {
    onLoad(true)
    await fn_textChg(FN_GetActualTextValueByBigTextId(textInputId))
    onLoad(false)
  }
  if (!sessionId) {
    return <NoAvailableDataPanel></NoAvailableDataPanel>
  }
  return (
    <div className="h-full w-full">
      <div
        className=" relative flex flex-row justify-between items-center  px-2"
        style={{
          height: VAL_CSS_TAB_TITLE_PANEL,
        }}
      >
        <div>
          <Button
            onClick={() => {
              refreshNow()
            }}
            loading={load}
            icon="search-text"
            small
            intent="primary"
            text={Dot("bjZyW", "Translate")}
          ></Button>
        </div>
        {/* {load ? <Blink min={3} max={5} ></Blink> : ''} */}
        <div
        // className="absolute left-[50%] "
        // style={{
        //   transform: "translateX(-50%)",
        // }}
        >
          <LanguageChooser
            onSelectLanguage={(val: EachLang) => {
              // update T_SourceLang
              if (sessionId) {
                FN_GetDispatch()(
                  SessionSlice.actions.updateSessionMapByAttrKey({
                    sessionMapValue: {
                      ...(sessionAttrOrNull || {}),
                      T_SourceLang: val.Value
                    },
                    sessionMapKey: sessionId,
                    sessionType
                  })
                )
                refreshNow()
              }
            }}
            lang={sessionAttrOrNull?.T_SourceLang || 'N/A'}
            isSource={true}
            label={Dot("jJuNz", "Source Language")}
          ></LanguageChooser>
          <Button onClick={() => {
            // update T_SourceLang
            if (sessionId) {
              FN_GetDispatch()(
                SessionSlice.actions.updateSessionMapByAttrKey({
                  sessionMapValue: {
                    ...(sessionAttrOrNull || {}),
                    T_SourceLang: sessionAttrOrNull?.T_TargetLang,
                    T_TargetLang: sessionAttrOrNull?.T_SourceLang,
                  },
                  sessionMapKey: sessionId,
                  sessionType
                })
              )
              refreshNow()
            }
          }} minimal small intent="none" icon="swap-horizontal"></Button>
          <LanguageChooser
            onSelectLanguage={(val: EachLang) => {
              // update T_SourceLang
              if (sessionId) {
                FN_GetDispatch()(
                  SessionSlice.actions.updateSessionMapByAttrKey({
                    sessionMapValue: {
                      ...(sessionAttrOrNull || {}),
                      T_TargetLang: val.Value
                    },
                    sessionMapKey: sessionId,
                    sessionType
                  })
                )
                refreshNow()
              }
            }}
            isSource={false}
            lang={sessionAttrOrNull?.T_TargetLang || 'N/A'}
            label={Dot("TwFcr", "Target Language")}
          ></LanguageChooser>
        </div>
        <div>
          <ExportButtonByInputId bigtextId={textOutputId} />
        </div>
      </div>
      {/* editor */}
      <div
        style={{
          height: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
          maxHeight: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
        }}
        className="w-full"
      >
        <Allotment className="flex flex-row">
          <Allotment.Pane>
            <EachTranslatorBlock
              bigTextId={textInputId}
              type="source"
              onTextChange={fn_textChg}
            ></EachTranslatorBlock>
          </Allotment.Pane>
          <Allotment.Pane>
            <EachTranslatorBlock
              bigTextId={textOutputId}
              type="target"
            ></EachTranslatorBlock>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div >
  );
};

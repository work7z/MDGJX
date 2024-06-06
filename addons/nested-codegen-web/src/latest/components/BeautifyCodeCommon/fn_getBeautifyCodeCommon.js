import React from "react";
import js_export_trigger from "./js_export_trigger";
let Base64 = {
  encode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(
      encodeURIComponent(str).replace(
        /%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode("0x" + p1);
        }
      )
    );
  },
  decode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  },
};
window.Base64 = Base64;
let fn_beautifyCodeCommon = ({}) => {
  let { observer } = window.CodeGenDefinition;
  const WrapperLoading = observer((props) => {
    let {
      _,
      Xterm,
      GFormSelect,
      Blink,
      HalfResizeForTwoHorizontal,
      GEditor,
      OperationPanel,
      BluePrintPopover,
      Mobx,
      MobxReact,
      HalfResizeForTwo,
      MobxReactLite,
      GFormSwitch,
      ProgressBar,
      Dialog,
      Popover,
      Radio,
      ButtonGroup,
      TextArea,
      Intent,

      GFormInput,
      Position,
      Toaster,
      Checkbox,
      ContextMenu,
      NumericInput,
      FormGroup,
      HTMLSelect,
      ControlGroup,
      InputGroup,
      Navbar,
      NavbarHeading,
      NonIdealState,
      NavbarDivider,
      NavbarGroup,
      Alignment,
      Classes,
      Tree,
      Icon,
      Card,
      Elevation,
      Button,
      PanelStack2,
      Spinner,
      Callout,
      PanelStack,
      gstore,
      AnchorButton,
      Tooltip,
      Drawer,
      Overlay,
      Alert,
      RadioGroup,
      Menu,
      MenuItem,
      MenuDivider,
      BluePrintTable,
      autorun,
      ColumnHeaderCell,
      Cell,
      Column,
      Table,
      Regions,
      BluePrintDocs,
      BluePrintCpt,
      observable,
      ReactDOM,
      gutils,
      useStores,
      useEffect,
      useCallback,
      useContext,
      useMemo,
      useState,
      useAsObservableSource,
      useLocalStore,
      useObserver,
      Provider,
      Router,
      inject,
      Html_select,
      BeautifyCodeCommon,
      prettier,
      xmlutils,
      createHistory,
      withRouter,
      Switch,
      Route,
      Link,
      useHistory,
    } = window.CodeGenDefinition;
    return (
      <div className="w100 h100 mywrapreal">
        {props.loading ? (
          <div style={{ padding: "5px" }} className="mycentrereal">
            <Spinner intent="none" />
          </div>
        ) : (
          props.children
        )}
      </div>
    );
  });

  const LeftCodeEditor = observer((props) => {
    let {
      _,
      Xterm,
      GFormSelect,
      Blink,
      HalfResizeForTwoHorizontal,
      GEditor,
      OperationPanel,
      BluePrintPopover,
      Mobx,
      MobxReact,
      HalfResizeForTwo,
      MobxReactLite,
      GFormSwitch,
      ProgressBar,
      Dialog,
      Popover,
      Radio,
      ButtonGroup,
      TextArea,
      Intent,

      GFormInput,
      Position,
      Toaster,
      Checkbox,
      ContextMenu,
      NumericInput,
      FormGroup,
      HTMLSelect,
      ControlGroup,
      InputGroup,
      Navbar,
      NavbarHeading,
      NonIdealState,
      NavbarDivider,
      NavbarGroup,
      Alignment,
      Classes,
      Tree,
      Icon,
      Card,
      Elevation,
      Button,
      PanelStack2,
      Spinner,
      Callout,
      PanelStack,
      gstore,
      AnchorButton,
      Tooltip,
      Drawer,
      Overlay,
      Alert,
      RadioGroup,
      Menu,
      MenuItem,
      MenuDivider,
      BluePrintTable,
      autorun,
      ColumnHeaderCell,
      Cell,
      Column,
      Table,
      Regions,
      BluePrintDocs,
      BluePrintCpt,
      observable,
      ReactDOM,
      gutils,
      useStores,
      useEffect,
      useCallback,
      useContext,
      useMemo,
      useState,
      useAsObservableSource,
      useLocalStore,
      useObserver,
      Provider,
      Router,
      inject,
      Html_select,
      BeautifyCodeCommon,
      prettier,
      xmlutils,
      createHistory,
      withRouter,
      Switch,
      Route,
      Link,
      useHistory,
    } = window.CodeGenDefinition;
    const { crtStoreName, language, initEditorByLeftOrRight } = props;
    let model = gstore.common_app[crtStoreName].model || {};
    let resizekey = crtStoreName + "hori";
    let topJsxForLeft = (
      <GEditor
        title={t(`Source(Pre-Procedure)`)}
        fontSize={props.fontSize}
        noAutoFocus={true}
        otherConfig={{
          callFuncName: "create",
          enableSplitViewResizing: true,
          originalEditable: true,
          readOnly: false,
          wordWrap: model.wordWrap || "on",
          followsCaret: true,
          ignoreCharChanges: true,
        }}
        wordWrap={model.wordWrap || "on"}
        id={crtStoreName + "id"}
        language={language}
        key={crtStoreName + "id"}
        onRef={(editor) => {
          initEditorByLeftOrRight({
            editor,
            direct: "left",
          });
        }}
        style={{ width: "100%", height: "100%" }}
      ></GEditor>
    );
    let btmJsxForLeft = _.get(props, "leftPanelProps.jsx", null);
    let val_leftjsx = (
      <HalfResizeForTwo
        disableResize={_.isNil(props.leftPanelProps)}
        resizekey={resizekey + "lefttopbtm"}
        defaultPercent={_.get(props, "leftPanelProps.percent", 1)}
        topJsx={topJsxForLeft}
        btmJsx={btmJsxForLeft}
      ></HalfResizeForTwo>
    );
    if (
      // gstore.localSettings.app_multiple_tab_mode &&
      !gstore.localSettings.app_left_to_right_mode
    ) {
      val_leftjsx = (
        <HalfResizeForTwoHorizontal
          leftJsx={topJsxForLeft}
          rightClz={_.isNil(props.leftPanelProps) ? "" : "needleftborder"}
          disableResize={_.isNil(props.leftPanelProps)}
          rightJsx={btmJsxForLeft}
          defaultPercent={_.get(props, "leftPanelProps.percent", 1)}
          value={gstore.localSettings[resizekey + "lefttopbtm_2"]}
          onChg={(val) => {
            gstore.localSettings[resizekey + "lefttopbtm_2"] = val;
          }}
        />
      );
    }
    return (
      <WrapperLoading loading={props.loading}>{val_leftjsx}</WrapperLoading>
    );
  });

  let RightCodeEditor = observer((props) => {
    let {
      _,
      Xterm,
      GFormSelect,
      Blink,
      HalfResizeForTwoHorizontal,
      GEditor,
      OperationPanel,
      BluePrintPopover,
      Mobx,
      MobxReact,
      HalfResizeForTwo,
      MobxReactLite,
      GFormSwitch,
      ProgressBar,
      Dialog,
      Popover,
      Radio,
      ButtonGroup,
      TextArea,
      Intent,

      GFormInput,
      Position,
      Toaster,
      Checkbox,
      ContextMenu,
      NumericInput,
      FormGroup,
      HTMLSelect,
      ControlGroup,
      InputGroup,
      Navbar,
      NavbarHeading,
      NonIdealState,
      NavbarDivider,
      NavbarGroup,
      Alignment,
      Classes,
      Tree,
      Icon,
      Card,
      Elevation,
      Button,
      PanelStack2,
      Spinner,
      Callout,
      PanelStack,
      gstore,
      AnchorButton,
      Tooltip,
      Drawer,
      Overlay,
      Alert,
      RadioGroup,
      Menu,
      MenuItem,
      MenuDivider,
      BluePrintTable,
      autorun,
      ColumnHeaderCell,
      Cell,
      Column,
      Table,
      Regions,
      BluePrintDocs,
      BluePrintCpt,
      observable,
      ReactDOM,
      gutils,
      useStores,
      useEffect,
      useCallback,
      useContext,
      useMemo,
      useState,
      useAsObservableSource,
      useLocalStore,
      useObserver,
      Provider,
      Router,
      inject,
      Html_select,
      BeautifyCodeCommon,
      prettier,
      xmlutils,
      createHistory,
      withRouter,
      Switch,
      Route,
      Link,
      useHistory,
    } = window.CodeGenDefinition;
    const { crtStoreName, language, initEditorByLeftOrRight } = props;
    let model = gstore.common_app[crtStoreName].model;
    let resizekey = crtStoreName + "hori";
    let topJsxForRight = (
      <GEditor
        wordWrap={props.wordWrap || model.wordWrap || "on"}
        title={t(`Destination(Post-Procedure)`)}
        fontSize={props.fontSize}
        noAutoFocus={true}
        viewmode={props.viewmode}
        language={_.get(props, "m_rightLang", language)}
        otherConfig={{
          callFuncName: "create",
          enableSplitViewResizing: true,
          originalEditable: true,
          readOnly: false,
          wordWrap: props.wordWrap || model.wordWrap || "on",
          followsCaret: true,
          ignoreCharChanges: true,
        }}
        id={crtStoreName + "id2"}
        key={crtStoreName + "id2"}
        onRef={(editor) => {
          initEditorByLeftOrRight({
            editor,
            direct: "right",
          });
        }}
        style={{ width: "100%", height: "100%" }}
      ></GEditor>
    );
    let btmJsxForRight = _.get(
      props,
      "rightPanelProps.jsx",
      null
      // <span style={{ display: "none" }}></span>
    );
    let val_m_rightJsx = (
      <HalfResizeForTwo
        disableResize={_.isNil(props.rightPanelProps)}
        resizekey={resizekey + "righttopbtm"}
        defaultPercent={_.get(props, "rightPanelProps.percent", 1)}
        topJsx={topJsxForRight}
        btmJsx={btmJsxForRight}
      />
    );
    if (
      // gstore.localSettings.app_multiple_tab_mode &&
      !gstore.localSettings.app_left_to_right_mode
    ) {
      val_m_rightJsx = (
        <HalfResizeForTwoHorizontal
          leftJsx={topJsxForRight}
          rightClz={_.isNil(props.rightPanelProps) ? "" : "needleftborder"}
          disableResize={_.isNil(props.rightPanelProps)}
          rightJsx={btmJsxForRight}
          defaultPercent={_.get(props, "rightPanelProps.percent", 1)}
          value={gstore.localSettings[resizekey + "righttopbtm_2"]}
          onChg={(val) => {
            gstore.localSettings[resizekey + "righttopbtm_2"] = val;
          }}
        />
      );
    }
    return (
      <WrapperLoading loading={props.loading}>{val_m_rightJsx}</WrapperLoading>
    );
  });

  const BeautifyCodeEditor = observer((props) => {
    let {
      _,
      Xterm,
      GFormSelect,
      Blink,
      HalfResizeForTwoHorizontal,
      GEditor,
      OperationPanel,
      BluePrintPopover,
      Mobx,
      MobxReact,
      HalfResizeForTwo,
      MobxReactLite,
      GFormSwitch,
      ProgressBar,
      Dialog,
      Popover,
      Radio,
      ButtonGroup,
      TextArea,
      Intent,

      GFormInput,
      Position,
      Toaster,
      Checkbox,
      ContextMenu,
      NumericInput,
      FormGroup,
      HTMLSelect,
      ControlGroup,
      InputGroup,
      Navbar,
      NavbarHeading,
      NonIdealState,
      NavbarDivider,
      NavbarGroup,
      Alignment,
      Classes,
      Tree,
      Icon,
      Card,
      Elevation,
      Button,
      PanelStack2,
      Spinner,
      Callout,
      PanelStack,
      gstore,
      AnchorButton,
      Tooltip,
      Drawer,
      Overlay,
      Alert,
      RadioGroup,
      Menu,
      MenuItem,
      MenuDivider,
      BluePrintTable,
      autorun,
      ColumnHeaderCell,
      Cell,
      Column,
      Table,
      Regions,
      BluePrintDocs,
      BluePrintCpt,
      observable,
      ReactDOM,
      gutils,
      useStores,
      useEffect,
      useCallback,
      useContext,
      useMemo,
      useState,
      useAsObservableSource,
      useLocalStore,
      useObserver,
      Provider,
      Router,
      inject,
      Html_select,
      BeautifyCodeCommon,
      prettier,
      xmlutils,
      createHistory,
      withRouter,
      Switch,
      Route,
      Link,
      useHistory,
    } = window.CodeGenDefinition;
    const { crtStoreName, language, initEditorByLeftOrRight } = props;
    let model = gstore.common_app[crtStoreName].model;
    let resizekey = crtStoreName + "hori";
    let val_leftjsx = props.leftJsx;
    let val_rightJsx = props.rightJsx;
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        className="beautify-code-wrapper"
      >
        <HalfResizeForTwoHorizontal
          defaultPercent={0.5}
          value={gstore.localSettings[resizekey]}
          onChg={(val) => {
            gstore.localSettings[resizekey] = val;
          }}
          rightClz="needleftborder"
          leftJsx={val_leftjsx}
          rightJsx={val_rightJsx}
        ></HalfResizeForTwoHorizontal>
      </div>
    );
  });

  const CrtWrapper = observer((x_props) => {
    let {
      _,
      Xterm,
      GFormSelect,
      Blink,
      HalfResizeForTwoHorizontal,
      GEditor,
      OperationPanel,
      BluePrintPopover,
      Mobx,
      MobxReact,
      HalfResizeForTwo,
      MobxReactLite,
      GFormSwitch,
      ProgressBar,
      Dialog,
      Popover,
      Radio,
      ButtonGroup,
      TextArea,
      Intent,

      GFormInput,
      Position,
      Toaster,
      Checkbox,
      ContextMenu,
      NumericInput,
      FormGroup,
      HTMLSelect,
      ControlGroup,
      InputGroup,
      Navbar,
      NavbarHeading,
      NonIdealState,
      NavbarDivider,
      NavbarGroup,
      Alignment,
      Classes,
      Tree,
      Icon,
      Card,
      Elevation,
      Button,
      PanelStack2,
      Spinner,
      Callout,
      PanelStack,
      gstore,
      AnchorButton,
      Tooltip,
      Drawer,
      Overlay,
      Alert,
      RadioGroup,
      Menu,
      MenuItem,
      MenuDivider,
      BluePrintTable,
      autorun,
      ColumnHeaderCell,
      Cell,
      Column,
      Table,
      Regions,
      BluePrintDocs,
      BluePrintCpt,
      observable,
      ReactDOM,
      gutils,
      useStores,
      useEffect,
      useCallback,
      useContext,
      useMemo,
      useState,
      useAsObservableSource,
      useLocalStore,
      useObserver,
      Provider,
      Router,
      inject,
      Html_select,
      BeautifyCodeCommon,
      prettier,
      xmlutils,
      createHistory,
      withRouter,
      Switch,
      Route,
      Link,
      useHistory,
    } = window.CodeGenDefinition;

    console.log("beacodecommon_props", x_props);
    const { crtStoreName, language, rightLang } = x_props;
    const storeValue = gstore.common_app[crtStoreName];
    let fn_crt_common_format_func = x_props.fn_format_func;
    let RightMainGlobalJsx = x_props.rightMainGlobalJsx;
    let fn_beautifyActionCode = async () => {
      if (window.no_auto_translate) {
        window.no_auto_translate = false;
        return;
      }
      console.log("trigger stillUpdateWhenIpt beacodecommon_props");
      if (!_.isNil(fn_crt_common_format_func)) {
        gstore.common_app[crtStoreName].loading_beautify = true;
        try {
          let myrightval = await fn_crt_common_format_func(
            {
              leftValue: gstore.common_app[crtStoreName].model.leftValue,
            },
            {
              crtStoreName,
            }
          );
          if (!myrightval.isOk) {
            // got error
          }
          gstore.common_app[crtStoreName].setRightValue(myrightval.result);
          gstore.common_app[crtStoreName].loading_beautify = false;
        } catch (error) {
          gstore.common_app[crtStoreName].loading_beautify = false;
          console.log("got error beacodecommon_props", error);
        }
      }
    };
    let myref_now = {
      current: {
        myfunc: fn_beautifyActionCode,
      },
    };

    let my_model = gstore.common_app[crtStoreName];
    useEffect(() => {
      if (x_props.lineWrapDft === false) {
        // my_model.wordWrap = "off";
      }
    }, []);
    window.temp12345 = x_props;
    let no_auto_chg_call = true; // x_props.noTriggerWhenCall && x_props.stillUpdateWhenIpt != true;
    let codeEditorObj = {
      leftPanelProps: x_props.leftPanelProps,
      rightPanelProps: x_props.rightPanelProps,
      crtStoreName: crtStoreName,
      language: (crtStoreName, language),
      //
      fn_when_chg:
        true || p_mode() || no_auto_chg_call
          ? () => {}
          : useCallback(_.debounce(myref_now.current.myfunc, 350), [
              crtStoreName,
            ]),
      m_rightLang: x_props.rightLang,
    };
    let model = gstore.common_app[crtStoreName].model;

    let initEditorByLeftOrRight = ({ editor, direct }) => {
      console.log("initEditorByLeftOrRight", editor, direct);
      let props = codeEditorObj;
      let mobj = gstore.common_app[crtStoreName];
      if (_.isNil(mobj)) {
        // debugger;
      }
      mobj[direct + "_ref"] = editor;
      mobj["set" + _.upperFirst(direct) + "Value"] = (val) => {
        if (editor == null || editor.getModel() == null) {
          // debugger;
          return;
        }
        // if (mobj && mobj.basic_value_left_value) {
        //   _.set(mobj.basic_value_left_value, direct, val);
        // }
        editor.getModel().setValue(val);
        if (direct == "left") {
          gstore.common_app[crtStoreName].model.leftValue = val;
        }
        if (direct == "right") {
          gstore.common_app[crtStoreName].model.rightValue = val;
        }
      };
      let commonSave = _.debounce(() => {
        gutils.api.common_app.common.saveModelById(crtStoreName, false);
        if (props.fn_when_chg && direct == "left") {
          // debugger;
          if (false && props.noTriggerWhenCall != true) {
            gutils.defer(() => {
              props.fn_when_chg();
            });
          }
        }
      }, 300);
      let modifiedModel = editor.getModel();
      if (modifiedModel != null) {
        modifiedModel.onDidChangeContent((event) => {
          console.log("loading right value", modifiedModel.getValue());
          model[direct + "Value"] = modifiedModel.getValue();
          commonSave();
        });
      }
      gstore.common_app[crtStoreName]["editor_" + direct] = editor;

      let tmodel = gstore.common_app[crtStoreName];
      if (tmodel.setLeftValue) {
        gutils.defer(() => {
          tmodel.setLeftValue(gstore.common_app[crtStoreName].model.leftValue);
        });
      }

      setTimeout(() => {
        gstore.common_app[crtStoreName].editor_left.updateOptions({
          wordWrap: my_model.wordWrap,
        });
        gstore.common_app[crtStoreName].editor_right.updateOptions({
          wordWrap: my_model.wordWrap,
        });
      });
      setTimeout(() => {
        if (x_props.syncView != true) {
          // return;
        }
        if (x_props.syncView == false) {
          // return;
        }
        let crt_editor_left = gstore.common_app[crtStoreName].editor_left;
        let crt_editor_right = gstore.common_app[crtStoreName].editor_right;
        // , crt_editor_right
        let thatarr = [crt_editor_left, crt_editor_right];
        let thatarr_2 = [crt_editor_right, crt_editor_right];
        let debounce_update = _.debounce(
          (fn) => {
            fn();
          },
          gutils.dev() ? 2000 : p_mode() ? 500 : 200
        );
        debounce_update = (fn) => fn();
        thatarr.forEach((x) => {
          x.onDidScrollChange((e) => {
            debounce_update(() => {
              if (window.ack_before_for_editor) {
                window.ack_before_for_editor = undefined;
                return;
              }
              window.ack_before_for_editor = "1";
              const s_top = x.getScrollTop();
              const s_left = x.getScrollLeft();
              console.log(`s_left_top`, { s_left, s_top });
              _.forEach(thatarr_2, (n) => {
                if (n != x) {
                  n.setScrollLeft(s_left);
                  n.setScrollTop(s_top);
                }
              });
            });
          });
        });
      }, 0);
    };
    codeEditorObj.initEditorByLeftOrRight = initEditorByLeftOrRight;

    let fn_url_encoder = async () => {
      gstore.common_app[crtStoreName].loading_beautify = true;
      try {
        // await gutils.sleep(1000);
        const leftValue = gstore.common_app[crtStoreName].model.leftValue;
        if (gutils.empty(leftValue)) {
          gstore.common_app[crtStoreName].setRightValue("");
        } else {
          let rightvalue = encodeURIComponent(leftValue);
          gstore.common_app[crtStoreName].setRightValue(rightvalue);
        }
        gstore.common_app[crtStoreName].loading_beautify = false;
      } catch (error) {
        gstore.common_app[crtStoreName].loading_beautify = false;
        gutils.alert(gutils.getErrMsg(error));
      }
      gstore.common_app[crtStoreName].loading_beautify = false;
    };

    let fn_url_decoder = async () => {
      gstore.common_app[crtStoreName].loading_beautify = true;
      try {
        // await gutils.sleep(1000);
        const leftValue = gstore.common_app[crtStoreName].model.leftValue;
        if (gutils.empty(leftValue)) {
          gstore.common_app[crtStoreName].setRightValue("");
        } else {
          let rightvalue = decodeURIComponent(leftValue);
          gstore.common_app[crtStoreName].setRightValue(rightvalue);
        }
        gstore.common_app[crtStoreName].loading_beautify = false;
      } catch (error) {
        gstore.common_app[crtStoreName].loading_beautify = false;
        gutils.alert(gutils.getErrMsg(error));
      }
    };

    let base64_encode = async () => {
      gstore.common_app[crtStoreName].loading_beautify = true;
      try {
        // await gutils.sleep(1000);
        const leftValue = gstore.common_app[crtStoreName].model.leftValue;
        if (gutils.empty(leftValue)) {
          gstore.common_app[crtStoreName].setRightValue("");
        } else {
          let rightvalue = Base64.encode(leftValue);
          gstore.common_app[crtStoreName].setRightValue(rightvalue);
        }
        gstore.common_app[crtStoreName].loading_beautify = false;
      } catch (error) {
        gstore.common_app[crtStoreName].loading_beautify = false;
        gutils.alert(gutils.getErrMsg(error));
      }
    };

    let base64_decode = async () => {
      gstore.common_app[crtStoreName].loading_beautify = true;
      try {
        // await gutils.sleep(1000);
        const leftValue = gstore.common_app[crtStoreName].model.leftValue;
        if (gutils.empty(leftValue)) {
          gstore.common_app[crtStoreName].setRightValue("");
        } else {
          let rightvalue = Base64.decode(leftValue);
          gstore.common_app[crtStoreName].setRightValue(rightvalue);
        }
        gstore.common_app[crtStoreName].loading_beautify = false;
      } catch (error) {
        gstore.common_app[crtStoreName].loading_beautify = false;
        gutils.alert(
          ("" + gutils.getErrMsg(error)).replace(
            `Failed to execute 'atob' on 'Window':`,
            ""
          )
        );
      }
    };

    let fn_copy_right = () => {
      gutils.copy(gstore.common_app[crtStoreName].model.rightValue);
      gutils.alertOk("Copied");
    };

    // loading: gstore.common_app[crtStoreName].loading_beautify,

    let fn_user_opt_arr = () => {
      try {
        let crt_user_opt_tmp = _.flattenDeep(
          gutils.filterEmpty([
            x_props.leadingActionJsx,
            x_props.noActions
              ? null
              : {
                  label: t(`Actions`),
                  g_type: "actions",
                  children: gutils.filterEmpty(
                    _.flattenDeep([
                      x_props.beforeActionBtn
                        ? _.map(x_props.beforeActionBtn, (x) => {
                            return {
                              ...x,
                              loadable: true,
                            };
                          })
                        : null,
                      x_props.noBeautifyBtn
                        ? ""
                        : {
                            loadable: true,
                            text: t(x_props.mainText || "Beautify Code"),
                            onClick: fn_beautifyActionCode,
                            intent: "primary",
                          },
                      x_props.needUrlBtn
                        ? {
                            loadable: true,
                            text: t("URL Encode"),
                            intent: "primary",
                            onClick: fn_url_encoder,
                          }
                        : "",
                      x_props.needUrlBtn
                        ? {
                            loadable: true,
                            text: t("URL Decode"),
                            intent: "primary",
                            onClick: fn_url_decoder,
                          }
                        : "",
                      x_props.needBase64Btn
                        ? [
                            {
                              loadable: true,
                              text: t("Base64 Encode"),
                              intent: "primary",
                              onClick: base64_encode,
                            },
                            {
                              loadable: true,
                              text: t("Base64 Decode"),
                              intent: "primary",
                              onClick: base64_decode,
                            },
                          ]
                        : "",
                      !x_props.noCopyBtn
                        ? {
                            text: t("Copy Result"),
                            intent: "success",
                            sys_internal: true,
                            onClick: async (e) => {
                              let saveValue =
                                gstore.common_app[crtStoreName].model
                                  .rightValue;
                              js_export_trigger({
                                saveValue: saveValue,
                                e,
                              });
                            },
                          }
                        : "",
                      x_props.helperText
                        ? {
                            onClick: async () => {
                              await gutils.win_alert(x_props.helperText);
                            },
                            sys_internal: true,
                            icon: "help",
                          }
                        : !x_props.noRightEditor && !x_props.rightMainGlobalJsx
                        ? {
                            icon: "help",
                            intent: "none",
                            tag: AnchorButton,
                            sys_internal: true,
                            target: "_blank",
                            href: `https://codegen.cc/documentation/view?id=${crtStoreName}`,
                          }
                        : null,
                      x_props.needNetwork
                        ? {
                            onClick: async () => {
                              await gutils.win_alert(
                                "To use this service, you need to connect CodeGen server. We can promise that we will NOT store the data you uploaded to CodeGen server, instead, we will eliminate it immediately after finishing your request."
                              );
                            },
                            sys_internal: true,
                            icon: "globe",
                          }
                        : "",
                      // TODO: sort these code out, and related common layouts
                    ])
                  ),
                },
            x_props.afterConfigItem ? x_props.afterConfigItem : "",
            x_props.noSources
              ? ""
              : {
                  label: t("Sources"),
                  g_type: "sources",
                  children: [
                    x_props.noSelectFile
                      ? null
                      : {
                          label: t("Upload File"),
                          n_type: "upload",
                          onClick: () => {
                            let setPropMethodName = "setLeftValue";
                            let store_name = crtStoreName;
                            let triggerFunc = myref_now.current.myfunc;
                            gutils.selectFile(async function (val) {
                              console.log("got file ", val);
                              if (!_.isNil(val)) {
                                console.log("got file ", val, store_name);
                                if (!_.isNil(x_props.upload_file_logic)) {
                                  gutils.alert(
                                    `Handling your request, please wait a moments.`
                                  );
                                  await x_props.upload_file_logic({
                                    file: val,
                                    val,
                                  });
                                  gutils.alert(`Done.`);
                                  return;
                                } else if (store_name == "encodeBase64") {
                                  let myres = await gutils.opt(
                                    "/common/format_for_base64_file_encode",
                                    {
                                      FILE: val,
                                    }
                                  );
                                  gstore.common_app[store_name][
                                    setPropMethodName
                                  ]("[IT'S FROM UPLOADED FILE]");
                                  gstore.common_app[store_name][
                                    "setRightValue"
                                  ](myres.content.result);
                                  return;
                                } else if (
                                  x_props &&
                                  x_props.handleRawInBackend
                                ) {
                                  gstore.common_app[store_name][
                                    setPropMethodName
                                  ]("[CG_FILE_003]" + val);
                                  if (x_props.handleRawFileTooltip) {
                                    gutils.alertOk(
                                      t(x_props.handleRawFileTooltip, val)
                                    );
                                  }
                                  await triggerFunc({});
                                  return;
                                } else {
                                }
                                let { content } = await gutils.opt(
                                  "/fs/read_uploads_and_clean",
                                  {
                                    name: val,
                                  }
                                );
                                let myfilectn = content;
                                console.log(myfilectn);
                                gstore.common_app[store_name][
                                  setPropMethodName
                                ](myfilectn);
                              }
                            });
                          },
                        },
                    {
                      label: t("Reset"),
                      nextType: "pop",
                      n_type: "clean",
                      nextBtns: [
                        {
                          label: t("Reset Source Source Value"),
                          desc_label: t(`Input`),
                          onClick: () => {
                            // debugger;
                            // gstore.common_app[crtStoreName].model.leftValue = "";
                            gstore.common_app[crtStoreName].setLeftValue("");
                          },
                        },
                        {
                          label: t("Reset Target Source Value"),
                          desc_label: t(`Output`),
                          onClick: () => {
                            // debugger;
                            // gstore.common_app[crtStoreName].model.rightValue = "";
                            gstore.common_app[crtStoreName].setRightValue("");
                          },
                        },
                      ],
                    },
                    {
                      label: t("Swap"),
                      n_type: "swap_source",
                      onClick: () => {
                        let tmp_leftValue = storeValue.model.leftValue;
                        let tmp_rightValue = storeValue.model.rightValue;
                        // textCompare.model.leftValue = tmp_rightValue;
                        // textCompare.model.rightValue = tmp_leftValue;
                        gstore.common_app[crtStoreName].setLeftValue(
                          tmp_rightValue
                        );
                        gstore.common_app[crtStoreName].setRightValue(
                          tmp_leftValue
                        );
                      },
                    },
                  ].filter((x) => !_.isNil(x)),
                },
            x_props.userPanelJsx ? x_props.userPanelJsx : "",
            crtStoreName == "beautifySql"
              ? {
                  label: t("SQL Type"),
                  children: [
                    {
                      tag: GFormSelect,
                      value: gstore.common_app[crtStoreName].model.DBTYPE,
                      onChange: (e) => {
                        gstore.common_app[crtStoreName].model.DBTYPE =
                          e.target.value;
                        fn_beautifyActionCode();
                      },
                      list: [
                        {
                          label: "MySQL",
                          value: "mysql",
                        },
                        {
                          label: "PostgreSQL",
                          value: "postgresql",
                        },
                        {
                          label: "Oracle",
                          value: "oracle",
                        },
                        {
                          label: "SQLServer",
                          value: "sqlserver",
                        },
                        {
                          label: "DB2",
                          value: "db2",
                        },
                        {
                          label: "H2",
                          value: "h2",
                        },
                        {
                          label: "Hive",
                          value: "hive",
                        },
                      ],
                    },
                  ],
                }
              : "",
            !x_props.noOptions
              ? {
                  label: t("Options"),
                  g_type: "options",

                  children: _.filter(
                    [
                      x_props.noLineWrap
                        ? null
                        : {
                            label: t(
                              my_model.wordWrap == "on"
                                ? "Disable Word Wrap"
                                : "Enable Word Wrap"
                              // "Toggle Line Wrap"
                            ),
                            n_type: "line_wrap",
                            onClick: () => {
                              // let crt_editor = gstore.common_app[crtStoreName].editor_left;
                              let nextval =
                                my_model.wordWrap == "on" ? "off" : "on";
                              my_model.wordWrap = nextval;
                              gstore.common_app[
                                crtStoreName
                              ].editor_left.updateOptions({
                                wordWrap: nextval,
                              });
                              gstore.common_app[
                                crtStoreName
                              ].editor_right.updateOptions({
                                wordWrap: nextval,
                              });
                            },
                          },
                      !_.isEmpty(x_props.exampleArr)
                        ? {
                            label: t("Show Example"),
                            n_type: "show_example",
                            nextType: "pop",
                            nextBtns: _.map(x_props.exampleArr, (x) => {
                              return {
                                label: x.label,
                                onClick: () => {
                                  if (!no_auto_chg_call) {
                                    window.no_auto_translate = true;
                                  }
                                  if (x.tips) {
                                    gutils.alert({
                                      message: t(`Example Tooltip: `) + x.tips,
                                    });
                                  }
                                  gstore.common_app[crtStoreName].setLeftValue(
                                    x.str
                                  );
                                  if (x.call) {
                                    let call = x.call;
                                    _.forEach(crt_user_opt_tmp, (x) => {
                                      _.forEach(x.children, (xx, dd) => {
                                        if (xx.cid == call) {
                                          xx.onClick();
                                        }
                                      });
                                    });
                                  }
                                },
                              };
                            }),
                          }
                        : !_.isEmpty(x_props.exampleStr)
                        ? {
                            label: t("Show Example"),
                            n_type: "show_example",
                            onClick: () => {
                              gstore.common_app[crtStoreName].setLeftValue(
                                x_props.exampleStr
                              );
                            },
                          }
                        : null,
                    ],
                    (x) => !_.isNil(x)
                  ),
                }
              : "",
            // props.viewerConfig,
            //
          ])
        );
        return crt_user_opt_tmp;
      } catch (e) {
        console.log("err", e);
        return [];
      }
    };
    let is_crt_loading =
      _.get(storeValue, "hist.isLoadingWhenChangeId") ||
      (_.get(storeValue, "hist.getOneAPITimes") === 0 &&
        !_.isNil(_.get(storeValue, "hist.getOneAPITimes")));
    let entireCodeEditorProps = {
      loading: is_crt_loading,
      fontSize: x_props.fontSize,
      viewmode: x_props.viewmode,
      ...codeEditorObj,
    };
    let entireCodeEditorProps_for_right = {
      ...entireCodeEditorProps,
    };
    if (x_props.right_wordWrap) {
      entireCodeEditorProps_for_right.wordWrap = x_props.right_wordWrap;
    }
    let leftJsx = <LeftCodeEditor {...entireCodeEditorProps} />;
    let rightJsx = <RightCodeEditor {...entireCodeEditorProps_for_right} />;
    // let finArr = ;
    let value_for_useropt = fn_user_opt_arr();
    // useMemo(() => {
    //   return fn_user_opt_arr();
    // }, [_.size(finArr) + "" + _.isNil(finArr)]);

    return (
      <div className="sys-card-wrapper">
        <Card style={{ padding: x_props.noPadView ? 0 : null }}>
          <OperationPanel
            right_menu_arr={x_props.right_menu_arr}
            left_hist_use_all={x_props.left_hist_use_all}
            innerJSX={
              !x_props.noRightEditor && !x_props.rightMainGlobalJsx
                ? {
                    leftJsx,
                    rightJsx,
                  }
                : null
            }
            noTitleBar={x_props.noTitleBar}
            fontSize={x_props.fontSize}
            noPadView={x_props.noPadView}
            onlyMainRightView={x_props.onlyMainRightView}
            updateEditorValueSync={_.throttle(() => {
              let tmodel = gstore.common_app[crtStoreName];
              if (tmodel.setLeftValue) {
                tmodel.setLeftValue(
                  gstore.common_app[crtStoreName].model.leftValue
                );
              }
              if (tmodel.setRightValue) {
                tmodel.setRightValue(
                  gstore.common_app[crtStoreName].model.rightValue
                );
              }
              let marr = _.keys(
                gstore.common_app[crtStoreName].editor_obj_listings
              );
              _.forEach(marr, (x, d, n) => {
                let keyname = x;
                let sfunc =
                  gstore.common_app[crtStoreName].editor_obj_listings[keyname];
                console.log("running", sfunc, keyname);
                sfunc(gstore.common_app[crtStoreName].model[keyname]);
              });
            }, 500)}
            saveCurrentTab={() => {
              return gutils.api.common_app.common.saveModelById(crtStoreName);
            }}
            defaultPercent={x_props.leftTopBtmPercent || 0.5}
            logicRoot={gstore.common_app[crtStoreName]}
            rightTitle={
              gstore.common_app[crtStoreName].loading_beautify ? (
                <span>
                  {`Handling`}
                  <Blink />
                </span>
              ) : x_props.mytotalTitle ? (
                x_props.mytotalTitle
              ) : (
                t("Code Beautify for {0}", x_props.mypagetitle)
              )
            }
            crtStoreName={crtStoreName}
            user_opt_arr={value_for_useropt}
            configJsx={(props) => {
              let userOptArr = fn_user_opt_arr(props);
              console.log("userOptArr", userOptArr);
              return (
                <div className="tc-config-box">
                  {props.renderFn(userOptArr, {
                    crtStoreName,
                  })}
                </div>
              );
            }}
            resizeKey={crtStoreName + "LeftMenuWidth"}
            defaultResizeVal={"250px"}
            codeEditorObj={codeEditorObj}
            x_props={x_props}
            rightJsx={
              x_props.noRightEditor ? (
                ""
              ) : (
                <div className="w100 h100 mywrapreal">
                  {is_crt_loading ? (
                    <div style={{ padding: "5px" }} className="mycentrereal">
                      <Spinner intent="none" />
                    </div>
                  ) : x_props.rightMainGlobalJsx ? (
                    <RightMainGlobalJsx
                      viewmode={x_props.viewmode}
                      {...codeEditorObj}
                    />
                  ) : (
                    <BeautifyCodeEditor
                      leftJsx={leftJsx}
                      rightJsx={rightJsx}
                      {...entireCodeEditorProps}
                    />
                  )}
                </div>
              )
            }
            noTriggerWhenCall={x_props.noTriggerWhenCall}
            m_rightLang={x_props.rightLang}
          ></OperationPanel>
        </Card>
      </div>
    );
  });
  return React.memo(CrtWrapper);
};

export default fn_beautifyCodeCommon;

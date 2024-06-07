const {
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
  MobxReactLite,
  ProgressBar,
  Dialog,
  HalfResizeForTwo,
  Popover,
  Radio,
  ButtonGroup,
  TextArea,
  Intent,
  observer,
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
  gutils,
  ReactDOM,
  
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
import otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import fn_PUtils from "../../TranslateForJSON/frontend/kit/pluginUtils";
import LogQuickViewer from "../../TranslateForJSON/frontend/cpt/LogQuickViewer";

export default ({ extLangObj }) => {
  let { btmSwitchKey, PreRequisiteJson } = extLangObj;
  return (gref) => ({
    initialState() {
      return {
        build_log_id: gutils.uuid(),
        output_log_id: gutils.uuid(),
      };
    },
    menus: otherPages.menu.getForPlayGround({
      ...extLangObj.menus,
    }),
    render: fn_otherPages.withPluginPage(
      PreRequisiteJson,
      {
        appId: extLangObj.rootExtensionAddons,
        fn_appName: () => {
          return extLangObj.menus.label;
        },
      },
      fn_otherPages.rightMainPageJsx({
        noOptions: true,
        noLineWrap: true,
        noTranslateForTitle: true,
        totalTitle: t("Programming Language - {0}", extLangObj.menus.label),
        fn_afterConfigItem({ PUtils }) {
          let { crtStoreName } = PUtils;
          let crtModel = gstore.common_app[crtStoreName].model;
          let val_prefix = "stzz" + crtModel.build_log_id;
          let cancelFn = async function () {
            return await gref.optAPI("fn_stop_all_by_ref", {
              script_stop_prefix: val_prefix,
            });
          };
          return [
            {
              label: t("Action"),
              children: [
                {
                  label: t(`Run Script`),
                  intent: "primary",
                  onClick: async function () {
                    try {
                      gstore.common_app[crtStoreName].loading_beautify = true;
                      const leftValue =
                        gstore.common_app[crtStoreName].model.leftValue;
                      await cancelFn();
                      let mobj_1 = {
                        script_type: extLangObj.scriptType,
                        script_stop_prefix: val_prefix,
                        ...crtModel,
                      };
                      await gref.optAPI("fn_call_script", {
                        ...mobj_1,
                      });
                      let updateThisTime = false;
                      let latestUUID = gutils.uuid();
                      window[val_prefix] = latestUUID;
                      while (true) {
                        let {
                          data: { isStop, hasOutput },
                        } = await gref.optAPI("fn_call_result", {
                          ...mobj_1,
                        });
                        if (hasOutput && !updateThisTime) {
                          updateThisTime = true;
                          gstore.localSettings[
                            "savetab_" + extLangObj.btmSwitchKey
                          ] = "output";
                        }
                        if (isStop) {
                          break;
                        }
                        if (window[val_prefix] != latestUUID) {
                          return;
                        }
                        await gutils.sleep(800);
                      }
                      gstore.common_app[crtStoreName].loading_beautify = false;
                    } catch (error) {
                      gstore.common_app[crtStoreName].loading_beautify = false;
                      console.log(error);
                    }
                    gstore.common_app[crtStoreName].loading_beautify = true;
                  },
                },
                gstore.common_app[crtStoreName].loading_beautify
                  ? {
                      label: t(`Stop Script`),
                      intent: "warning",
                      onClick: async function () {
                        try {
                          await cancelFn();
                          gutils.alertOk(`Stopped All Existing Process.`);
                        } catch (e) {
                          console.log("e", e);
                        }
                        gstore.common_app[
                          crtStoreName
                        ].loading_beautify = false;
                      },
                    }
                  : null,
              ].filter((x) => !_.isNil(x)),
            },
          ];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtStore, crtStoreName, crtModel } = PUtils;
          window.t1_crtModel = crtModel;
          let resizeKey = "resizeKey" + crtStoreName;
          return (
            <div
              className=""
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <HalfResizeForTwo
                needBorderBetween={true}
                containerClz="fixheight"
                heightValue={gstore.localSettings[resizeKey + "left"]}
                onHeightValue={(val) => {
                  gstore.localSettings[resizeKey + "left"] = val;
                }}
                noAutoAdjust={true}
                isTopHide={false}
                isBtmHide={false}
                defaultPercent={0.5}
                topJsx={PUtils.jsx.tabWithDefinition({
                  style: {},
                  default_select_tab: "file",
                  list: [
                    {
                      label: t("Script"),
                      id: "file",
                      closable: false,
                      mode_jsx_func: true,
                      jsx: observer((props) => {
                        return PUtils.jsx.createGEditor({
                          key: "play_script_content",
                          language: extLangObj.language,
                          initContent: extLangObj.initContent,
                        });
                      }),
                    },
                  ],
                  key: crtStoreName + "_top",
                })}
                btmJsx={PUtils.jsx.tabWithDefinition({
                  style: {},
                  default_select_tab: "build",
                  list: [
                    {
                      label: t("Build"),
                      id: "build",
                      closable: false,
                      mode_jsx_func: true,
                      jsx: observer((props) => {
                        return (
                          <LogQuickViewer
                            key={crtModel.build_log_id}
                            gref={gref}
                            log_file_id={crtModel.build_log_id}
                          />
                        );
                      }),
                    },
                    {
                      label: t("OUTPUT"),
                      id: "output",
                      closable: false,
                      mode_jsx_func: true,
                      jsx: observer((props) => {
                        return (
                          <LogQuickViewer
                            onlyCtn={true}
                            key={crtModel.output_log_id}
                            gref={gref}
                            log_file_id={crtModel.output_log_id}
                          />
                        );
                      }),
                    },
                  ],
                  key: btmSwitchKey,
                })}
              />
            </div>
          );
        }),
      })
    ),
  });
};

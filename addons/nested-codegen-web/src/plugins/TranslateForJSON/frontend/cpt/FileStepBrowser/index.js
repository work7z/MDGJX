const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  GSyncSelectWithFilter,
  GFormSwitch,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  MobxReactLite,
  ProgressBar,
  Dialog,
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
  CallOutAndView,
  CallOutWithKeep,
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
  TextAreaWithExample,
  DbLinkConnectionSelect,
  LocalProjectBtnWithPanel,
  BluePrintTable,
  autorun,
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  useRef,
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
import otherPages from "../../../frontend/pages/otherPages";
import LessFile from "./index.less";

const FileInternalBrowser = observer((props) => {
  let { resizekey } = props;
  let cRef = useRef({
    editor: null,
    monaco: null,
  });
  window.temp_cRef = cRef;
  let crtInternalViewData = useLocalStore(() => {
    return {
      targetId: null,
      obj_expKeys: {},
      obj_sltKeys: {},
      calcTreeData: [],
      treeData: [],
      crtFileInfo: null,
      crtFilePath: null,
      crtFileContent: "",
      loadingTree: false,
      loadingText: false,
    };
  });
  let updateThatFn = () => {
    let self_calcTreeData = gutils.iterateTree(
      crtInternalViewData.treeData,
      (x, d, n) => {
        x.key = x.id;
        x.icon = x.isDir ? "folder-open" : "document";
        x.isLeaf = !x.isDir;

        // x.secondaryLabel = (
        //   <Tooltip2 content="An eye!">
        //     <Icon icon="eye-open" />
        //   </Tooltip2>
        // );
        // x.secondaryLabel = <Icon icon="eye-open" />;
        x.isExpanded = crtInternalViewData.obj_expKeys[x.id] != true;
        x.isSelected = crtInternalViewData.obj_sltKeys[x.id] == true;
        if (x.isDir) {
          x.childNodes = _.filter(x.childNodes, (eachChild) => {
            if (eachChild && eachChild.label != ".DS_Store") {
              return true;
            } else {
              return false;
            }
          });
          x.childNodes = x.childNodes || [];
          function compactChildNodes(x) {
            console.log("compact child nodes", x);
            let myref = x;
            let pushArrItem = [];
            while (
              myref.childNodes &&
              myref.childNodes.length == 1 &&
              myref.childNodes[0].isDir == true
            ) {
              console.log(
                "compact child nodes - sub",
                myref,
                myref.childNodes[0]
              );
              pushArrItem.push(myref.childNodes[0]);
              myref = myref.childNodes[0];
            }
            if (_.size(pushArrItem) != 0) {
              x.childNodes = [
                {
                  ..._.last(pushArrItem),
                  label: _.chain(pushArrItem)
                    .map((x) => x.label)
                    .join("/")
                    .value(),
                },
              ];
            }
            // if (
            //   _.size(x.childNodes) == 1 &&
            //   _.get(x.childNodes, "0.isDir") == true
            // ) {
            //   // need bridge it
            //   try {
            //     let mynextDir = x.childNodes[0];
            //     x.label = x.label + "/" + mynextDir.label;
            //     x.id = mynextDir.id;
            //     x.childNodes = _.get(mynextDir, "childNodes", []);
            //     if (!_.isNil(mynextDir.childNodes)) {
            //       compactChildNodes(mynextDir);
            //     }
            //   } catch (e) {
            //     console.log("got err", e);
            //   }
            // }
          }
          compactChildNodes(x);
          if (x.childNodes) {
            x.childNodes = _.chain(x.childNodes)
              .sortBy((x) => x.label)
              .sortBy((x) => x["isDir"])
              .filter((x) => x["label"] != ".DS_Store")
              .reverse()
              .value();
          }
        }
        return x;
      },
      "childNodes"
    );
    if (props.fileStepModelFilter) {
      self_calcTreeData = props.fileStepModelFilter(self_calcTreeData);
    }
    crtInternalViewData.calcTreeData = self_calcTreeData;
    return self_calcTreeData;
  };
  async function setContentToThatId(targetId) {
    let { content } = await gutils.opt("/dg/readfile/", {
      PATH: targetId,
    });
    crtInternalViewData.targetId = targetId;
    console.log("readfile", content);
    let crt_editor = cRef.current.editor;
    crtInternalViewData.crtFilePath = _.chain(targetId)
      .split(isWin() ? "\\" : "/")
      .last()
      .value();
    let crt_monaco = cRef.current.monaco;
    let mm_model = crt_editor.getModel();
    let mmKey = "lastUpdateContent" + resizekey;
    if (window[mmKey] != content) {
      window[mmKey] = content;
    } else {
      return;
    }
    mm_model.setValue(content);
    let fin_lang = _.endsWith(targetId, ".ftl")
      ? "freemarker2"
      : _.endsWith(targetId, ".md")
      ? "markdown"
      : _.endsWith(targetId, ".groovy") || _.endsWith(targetId, ".java")
      ? "java"
      : _.endsWith(targetId, ".js")
      ? "javascript"
      : "javascript";
    console.log("fin_lang", fin_lang);
    crt_editor.updateOptions({
      wordWrap: "on",
      language: fin_lang,
      readOnly: true,
    });
    crt_monaco.editor.setModelLanguage(crt_editor.getModel(), fin_lang);
    crtInternalViewData.obj_sltKeys = {
      [targetId]: true,
    };
    updateThatFn();
  }
  window.crtInternalViewData = crtInternalViewData;
  let refreshForFile = async () => {
    if (gutils.empty(props.filepath)) {
      return;
    }
    let { content } = await gutils.opt("/dg/loopdir", {
      PATH: props.filepath,
    });
    console.log("tree-data", content);
    crtInternalViewData.treeData = content;
    await updateThatFn();
    // crtInternalViewData.targetId = null;
    gutils.iterateTree(
      crtInternalViewData.treeData,
      (x, d, n) => {
        if (!x.isDir) {
          if (
            _.isNil(crtInternalViewData.targetId) ||
            !_.startsWith(crtInternalViewData.targetId, props.filepath)
          ) {
            crtInternalViewData.targetId = x.id;
            crtInternalViewData.obj_sltKeys = {
              [x.id]: true,
            };
            updateThatFn();
            // gutils.defer(() => {
            //   setContentToThatId(crtInternalViewData.targetId);
            // });
          }
        }
      },
      "childNodes"
    );

    if (crtInternalViewData.targetId) {
      await setContentToThatId(crtInternalViewData.targetId);
    }
  };
  if (props.onRegisterUpdateFn) {
    props.onRegisterUpdateFn(() => {
      refreshForFile();
    });
  }
  if (props.onAddLocalStore) {
    props.onAddLocalStore(crtInternalViewData);
  }
  let fn_node_click = async (e) => {
    console.log("node click", e, x);
    let { obj_expKeys } = crtInternalViewData;
    let x = e;
    if (e.isLeaf) {
      crtInternalViewData.obj_sltKeys = {
        [x.id]: true,
      };
      updateThatFn();
      let targetId = x.id;
      setContentToThatId(targetId);
    } else {
      if (crtInternalViewData.obj_expKeys[x.id] == true) {
        delete crtInternalViewData.obj_expKeys[x.id];
      } else {
        crtInternalViewData.obj_expKeys[x.id] = true;
      }
      updateThatFn();
    }
  };

  useEffect(() => {
    refreshForFile();
  }, [props.filepath]);
  console.log("ackfilenow", crtInternalViewData.calcTreeData);
  return (
    <HalfResizeForTwoHorizontal
      defaultLeftWidthValue={250}
      value={gstore.localSettings[resizekey]}
      onChg={(val) => {
        gstore.localSettings[resizekey] = val;
      }}
      rightClz="needleftborder"
      leftJsx={otherPages.jsx.panelWithTitle({
        title: `File Explorer`,
        jsx: (
          <div className={LessFile["sys-compact-tree-wrapper"]}>
            <div
              style={{
                display: !crtInternalViewData.loadingTree ? "none" : null,
              }}
            >
              Loading...
            </div>
            <div
              style={{
                display: crtInternalViewData.loadingTree ? "none" : null,
                // width: gstore.localSettings[resizekey],
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              <Tree
                contents={crtInternalViewData.calcTreeData}
                onNodeContextMenu={() => {
                  //
                }}
                onNodeClick={fn_node_click}
                onNodeDoubleClick={() => {}}
                onNodeCollapse={(x) => {
                  console.log("node-collapse", x);
                  crtInternalViewData.obj_expKeys[x.key] = true;
                  updateThatFn();
                }}
                onNodeExpand={(x) => {
                  console.log("node-expand", x);
                  delete crtInternalViewData.obj_expKeys[x.key];
                  updateThatFn();
                }}
                className={LessFile["sys-compact-style"]}
                style={
                  {
                    // width: gstore.localSettings[resizekey],
                  }
                }
              />
            </div>
          </div>
        ),
      })}
      rightJsx={otherPages.jsx.panelWithTitle({
        title: `File: ${crtInternalViewData.crtFilePath}`,
        noTranslate: true,
        jsx: (
          <div className={"w100 h100 " + LessFile["file-editor-wrapper"]}>
            <div className={LessFile["file-editor-ctn"]}>
              <GEditor
                onRef={(editor, monaco) => {
                  cRef.current.editor = editor;
                  cRef.current.monaco = monaco;
                }}
                lang={"html"}
              />
            </div>
            {/* <div className={LessFile["file-editor-footer"]}>buttom text</div> */}
          </div>
        ),
      })}
    />
  );
});

//   [
//   {
//     label: "Default DSL Schema",
//     prop: "default",
//   },
// ]

export default observer((props) => {
  let { model } = props;
  let [num, onNum] = useState(1);
  let [cptKey] = useState(_.uniqueId("t"));
  let resizekey = cptKey + "resize";
  let crtPageStore = useLocalStore(() => {
    return {
      fileList: [],
    };
  });
  window.test_crtPageStore = crtPageStore;
  let updateTemplateFileList = async function () {
    if (props.fn_retireve_files_through_template_id) {
      if (!_.isNil(model.crtTemplateId)) {
        await props.fn_retireve_files_through_template_id({
          crtTemplateId: model.crtTemplateId,
        });
      }
    }
  };
  let wRef = useRef({
    updateFnObj: {},
    fileBrowserStore: {},
  });
  let refreshFn = async function () {
    if (props.fn_template_list) {
      crtPageStore.templateList = await props.fn_template_list();
      model.crtTemplateId = gutils.adjustIfMiss(
        model.crtTemplateId,
        crtPageStore.templateList
      );
    }
  };
  useEffect(() => {
    refreshFn();
  }, []);
  let crtItem = _.find(
    crtPageStore.templateList,
    (x) => x.value == model.crtTemplateId
  );
  let isCrtDefaultMode = _.get(crtItem, "is_default");
  console.log("rendering html select raw", crtItem, model.crtTemplateId);
  async function callMyFn() {
    await refreshFn();
    let mytmparr = [];
    _.forEach(wRef.current.updateFnObj, (x, d, n) => {
      mytmparr.push(x());
    });
    for (let item of mytmparr) {
      await item;
    }
    onNum(Math.random());
  }
  useEffect(() => {
    let aaa = gutils.run_async_loop(async () => {
      if (props.noAutoRefresh) {
        return;
      }
      await callMyFn();
    }, 2000);
    return () => {
      aaa();
    };
  }, []);
  return (
    <div n={num} className={LessFile["file-step-browser"]}>
      <div className={LessFile["subfile-idx"]}>
        <div className={LessFile["idx-left"]}>
          <div inline={true} label={t("Template")}>
            <Html_select
              value={model.crtTemplateId}
              onChange={(e) => {
                window.model_logic = model;
                let next_value = gutils.getValueFromE(e);
                console.log("next value", next_value);
                model.crtTemplateId = next_value;
                wRef.current.targetId = null;
                //               _.find(
                //   crtPageStore.templateList,
                //   (x) => x.value == model.crtTemplateId
                // );
                updateTemplateFileList();
                wRef.current.targetId = null;
              }}
              list={crtPageStore.templateList || []}
            ></Html_select>
          </div>
          <div
            style={{
              display: props.noAddBtn ? "none" : null,
            }}
            inline={true}
            label={t("Operation")}
          >
            <Button
              inline={true}
              outline={true}
              onClick={async () => {
                if (props.fn_new_item) {
                  let myres = await props.fn_new_item();
                  console.log("myres", myres);
                  await refreshFn();
                  model.crtTemplateId = myres;
                  onNum(Math.random());
                  await refreshFn();
                }
              }}
              text={t(`New`)}
            ></Button>
          </div>
          <div inline={true} label={t("Operation")}>
            <Button
              inline={true}
              outline={true}
              onClick={async () => {
                if (!_.isNil(crtItem)) {
                  if (isCrtDefaultMode) {
                    await gutils.win_alert(
                      `Please be noted that default revision shouldn't be modified at any time, if you would like to create own template, please modify these files based on another template folder by clicking the new button.`
                    );
                  }
                  gutils.openDir(crtItem.filepath || crtItem.prop);
                } else {
                  await gutils.win_alert(`No available schema can be opened.`);
                }
              }}
              text={t(`Open`)}
            ></Button>
          </div>
          <div inline={true} label={t("Operation")}>
            <Button
              inline={true}
              outline={true}
              text={t(`Refresh`)}
              onClick={async () => {
                await callMyFn();
                gutils.alertOk("Refreshed.");
              }}
            ></Button>
          </div>
          {isCrtDefaultMode ? (
            ""
          ) : (
            <div>
              <Button
                inline={true}
                outline={true}
                href="javascript:void(0);"
                onClick={() => {
                  let mylink = gutils.w_alertMsgGlobal({
                    cancelText: "Close",
                    icon: "helper-management",
                    width: "300px",
                    s_clzname: "white-app-view",
                    noConfirm: true,
                    title: "Manage DSL Schema",
                    jsx: () => {
                      return (
                        <Button
                          intent={"danger"}
                          onClick={async () => {
                            if (await gutils.ask_danger_opt()) {
                              //delete
                              if (props.fn_deleteCurrentItem) {
                                await props.fn_deleteCurrentItem({
                                  id: model.crtTemplateId,
                                });
                                await refreshFn();
                                mylink.open = false;
                              }
                            }
                          }}
                        >
                          {t("Delete Current DSL")}
                        </Button>
                      );
                    },
                  });
                }}
              >
                {t("Manage")}
              </Button>
            </div>
          )}
          <div
            style={{ marginLeft: "0px" }}
            inline={true}
            label={t("Operation")}
          >
            <Button
              inline={true}
              outline={true}
              icon="help"
              onClick={async () => {
                //
                await gutils.win_alert(
                  `To modify these template files, please click open button and edit them in another editor.`
                );
              }}
            ></Button>
          </div>
        </div>
        <div className={LessFile["idx-right"]}>
          {isCrtDefaultMode ? t("Default Revision") : _.get(crtItem, "label")}(
          {t(isCrtDefaultMode ? "Read-Only" : "Read-Write")})
        </div>
      </div>
      <div className={LessFile["subconsole-idx"]}>
        <FileInternalBrowser
          fileStepModelFilter={props.fileStepModelFilter}
          filepath={_.get(crtItem, "filepath")}
          resizekey={resizekey}
          onRegisterUpdateFn={(fn) => {
            wRef.current.updateFnObj["file-internal-browser"] = fn;
          }}
          onAddLocalStore={(fn) => {
            wRef.current.fileBrowserStore = fn;
          }}
        />
      </div>
    </div>
  );
});

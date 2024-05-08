
// Date: Thu, 16 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import localforage from "localforage";
import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
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
  Icon,
  Card,
  Elevation,
  Button,
  Popover,
  Menu,
  MenuDivider,
  TreeNodeInfo,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../../../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../../../../utils/LogUtils";

import statusSlice from "../../../../../../../../../reducers/statusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import PageUtils from "../../../../../../../../../utils/PageUtils";
import TranslationUtils, {
  Dot,
} from "../../../../../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import _ from "lodash";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../../../../../reducers/forgeSlice";
import { ACTION_callRefreshAll } from "../../../../../../../../../reducers/systemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
} from "../../../../../../../../../types/constants";
import { type } from "jquery";
import apiSlice from "../../../../../../../../../reducers/apiSlice";
import {
  ExtensionInfoFormatted as ExtensionInfo
} from "../../../../../../../../../types/purejs-types-READ_ONLY";
import QueryUtils, {
  getAjaxValueRes as getAjaxValueRes,
} from "../../../../../../../../../utils/QueryUtils";
import {
  useMergeParamWithWorkSpace,
  useSearchQuery,
} from "../../../../../../../../../types/workbench-hook";
import ToolSlice from "../../../../../../../../../reducers/toolSlice";
import GenTree, { TREE_ROOT_ID_PREFIX } from "../../../../../../../../../components/SystemNavTree";
import { FnPureToolDefinition } from "../../../../../../../../../types/workbench-types";
import WorkspaceSlice from "../../../../../../../../../reducers/workspaceSlice";
import { useExtsList, useGetAppCategory, useGetCategoryList } from "../../../../sub/center-view/Transformer/hooks";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { ClientPortalContext } from "../../../../sub/center-view/Transformer/types";
import { fmtURL_ToolSubPageClient } from "@/__CORE__/meta/client";
import { URL_SUBCATEGORY_GO_PATH } from "@/__CORE__/meta/url";
import { PopoverItemProps } from "@/[lang]/client/src/components/ActionButton";
import ParamStateSlice from "@/[lang]/client/src/reducers/state/paramStateSlice";
import LocalStateSlice from "@/[lang]/client/src/reducers/state/localStateSlice";

export default (props: PopoverItemProps & {
  activeOne: FnPureToolDefinition | undefined;
}): any => {
  let sq = useSearchQuery();
  const [updateMemStatus, onUpdateMemStatus] = useState(0);
  let fc = sq.ls || "all";

  let dis = exportUtils.dispatch();

  let treeNodeData = exportUtils.useSelector((x) => x.tool.subCategoryTreeInfo);
  let extsList = useExtsList(fc)

  let selectExpandFavouriteObj = exportUtils.useSelector((v) => {
    return {
      initialized: v.workspace.tools.initialized,
      expanded: v.workspace.tools.expanded,
      selected: v.workspace.tools.selected,
      favourites: v.localState.tools_favourites.split(','),
    };
  });
  let extsList2 = extsList;

  let favoritesList: ExtensionInfo[] = useMemo(() => {
    let existSet = new Set();
    // select items in each of list.ChildrenAsInfo by matching if their id is in Tool_RemarkExtIds
    let tmp: ExtensionInfo[] = [];
    if (!_.isNil(extsList2)) {
      _.forEach(extsList2, (x) => {
        _.forEach(x.ChildrenAsInfo, (xx) => {
          let isThatFoundable = _.findIndex(
            selectExpandFavouriteObj.favourites,
            (xxx) => {
              return xxx === xx.Id;
            }
          );
          if (isThatFoundable != -1) {
            if (existSet.has(xx.Id)) return;
            tmp.push(xx);
            existSet.add(xx.Id);
          }
        });
      });
    }

    return tmp;
  }, [
    updateMemStatus,
    fc,
    selectExpandFavouriteObj.favourites,
    treeNodeData.updateId,
    _.size(treeNodeData.nodes),
    ...exportUtils.refresh_lang()
  ]);

  let fn_get_favourite = (): TreeNodeInfo => {
    return {
      id: "Remarks",
      label: Dot("IfsdGO", "Favourites"),
      icon: "star",
      hasCaret: true,
      childNodes: _.map(favoritesList, (x) => {
        return {
          id: x.Id,
          label: x.Label,
          icon: "application",
        } as TreeNodeInfo;
      }),
    };
  };

  useEffect(() => {
    dis(ToolSlice.actions.updateSubCategoryTreeRemarks(fn_get_favourite()));
  }, [(favoritesList || []).join("-"), ...exportUtils.refresh_lang()]);

  // update tree main data
  useEffect(() => {
    dis(
      ToolSlice.actions.updateSubCategoryTreeInfo({
        nodes: [
          fn_get_favourite(),
          ..._.map(extsList || [], (x, d, n) => {
            return {
              id: x.Id,
              hasCaret: true,
              icon: x.Icon || "application",
              label: x.Label,
              childNodes: _.map(x.ChildrenAsInfo, (child) => {
                return {
                  id: child.Id,
                  label: _.toString(child.Label),
                  icon: "application",
                  // isSelected: true,
                  // TODO: hover to show detail
                } as TreeNodeInfo;
              }),
            } as TreeNodeInfo;
          }),
        ],
      })
    );
  }, [fc, ...exportUtils.refresh_lang()]);

  // update default data for tree select, expanded
  let categoryList = useGetCategoryList()
  useEffect(() => {
    if (_.isEmpty(extsList)) {
      return;
    }
    if (!treeNodeData || !treeNodeData.nodes || treeNodeData.nodes.length == 0) {
      return;
    }
    if (selectExpandFavouriteObj.initialized) {
      return;
    }
    if (_.isEmpty(categoryList)) {
      return;
    }
    let defaultExpanded: string[] = []

    _.forEach(categoryList, x => {
      defaultExpanded.push(TREE_ROOT_ID_PREFIX + x.Id)
    })

    dis(
      WorkspaceSlice.actions.mergeTabPart({
        name: "tools",
        value: {
          expanded: defaultExpanded,
        }
      })
    );
    FN_GetDispatch()(
      WorkspaceSlice.actions.markInitialized("tools")
    )
  }, [treeNodeData.nodes, selectExpandFavouriteObj.initialized, ...exportUtils.refresh_lang()]);

  let activeOne = props.activeOne;

  let clientCtx = useContext(ClientPortalContext)
  if (_.isNil(activeOne)) {
    return (
      <NonIdealState
        className="whitespace-break-spaces"
        icon="array-string"
        title={Dot("cuRCqb", "Category doesn't exist")}
      ></NonIdealState>
    );
  }
  let fn_trigger_node_click = (
    (node) => {
      if (node?.hasCaret) return;
      let childId = node?.id;
      if (clientCtx.portalMode) {
        return;
      }
      // goWithChildId(childId);
      let parentIcon: string | null = null;
      let parentLabel: string | null = null;
      _.every(treeNodeData.nodes, (x: TreeNodeInfo) => {
        if (!x.childNodes || x.icon == "star") {
          return true;
        }
        for (let item of x.childNodes) {
          if (item.id == childId) {
            parentIcon = x.icon + "";
            parentLabel = x.label + "";
            return false;
          }
        }
        return true;
      });
      dis(
        WorkspaceSlice.actions.addTab({
          keyName: "tools",
          newTab: {
            id: _.toString(childId) || "Unknown Id",
            label:
              parentLabel + " - " + _.toString(node?.label) ||
              "Unknown Label",
            pageTitle: `${_.toString(node?.label)}`,
            icon: (parentIcon || "application") as any,
          },
        })
      );
    }
  )

  return (
    <div className=" select-none w100 h100 flex-parent whitespace-break-spaces overflow-auto">
      <div className="flex-main-body h-full">
        {_.isEmpty(extsList) ? (
          <NonIdealState
            icon="array"
            title={Dot("q12beqwR", "No Available Tools")}
          ></NonIdealState>
        ) : (
          <GenTree
            cacheId="toolet"
            onDoubleClick={node => {
              if (clientCtx.portalMode) {
                let toolId = node?.id;
                props.onPopRedirectPage(node as any, false)
              }
            }}
            onClick={fn_trigger_node_click}
            formatEachNode={(x) => {
              if (!x.hasCaret) {
                let hasRemarkThisOne =
                  _.find(favoritesList, (xx) => {
                    return _.toString(xx.Id + "") === x.id;
                  }) != null;
                let fn_openItInNewTab = (
                  async (xxxx, newTab: boolean) => {
                    if (clientCtx.portalMode) {
                      props.onPopRedirectPage(x, newTab)
                      return;
                    }
                    fn_trigger_node_click(x)
                  }
                )
                return {
                  ...x,
                  secondaryLabel: (
                    <ButtonGroup>
                      <Tooltip
                        content={
                          !hasRemarkThisOne
                            ? Dot("lp0qmd0", "Mark it as favourite")
                            : Dot("_5OqeG", "Unmark it")
                        }
                      >
                        <Button
                          small
                          minimal
                          className="icon-remark"
                          icon={
                            hasRemarkThisOne ? (
                              <Icon icon="star" className=" "></Icon>
                            ) : (
                              "star-empty"
                            )
                          }
                          intent={hasRemarkThisOne ? "primary" : "none"}
                          onClick={(e) => {
                            gutils.stopE(e);
                            let newFavouriteVal: string = ''
                            if (hasRemarkThisOne) {
                              newFavouriteVal = _.filter(
                                selectExpandFavouriteObj.favourites,
                                (xx) => {
                                  return xx != x.id;
                                }
                              ).join(",")
                            } else {
                              newFavouriteVal = (_.uniq([
                                ...(selectExpandFavouriteObj.favourites || []),
                                x.id,
                              ]) || [].join(",")) + ""
                            }
                            FN_GetDispatch()(
                              LocalStateSlice.actions.updateOneOfLocalState({
                                tools_favourites: newFavouriteVal,
                              })
                            )
                          }}
                        />
                      </Tooltip>

                      <Tooltip content={
                        Dot("DhW0AdwRDi", "Open in new tab")
                      }>
                        <Button
                          small
                          minimal
                          // className="icon-remark"
                          icon={"add"}
                          intent="none"
                          // intent={hasRemarkThisOne ? "primary" : "none"}
                          onClick={(e) => {
                            gutils.stopE(e)

                            fn_openItInNewTab(x, true)
                          }}
                        />
                      </Tooltip>
                    </ButtonGroup>
                  ),
                };
              } else {
                return x;
              }
            }}
            needShowCountChildren={true}
            info={treeNodeData || []}
            onChange={(new_nodes) => {
              dis(ToolSlice.actions.updateSubCategoryTreeInfo(new_nodes));
            }}
            expanded={selectExpandFavouriteObj.expanded || []}
            selected={selectExpandFavouriteObj.selected || []}
            onExpandedChange={(value, newValId) => {
              logutils.log("expanded log", value)
              let newValue: string[] = []
              let isCurrentNewValInExtList = newValId == null || _.findIndex(extsList, eachExt => eachExt.Id == newValId) != -1
              if (isCurrentNewValInExtList) {
                _.forEach(value, x => {
                  if (newValId == x) {
                    newValue.push(x)
                    return
                  }
                  if (_.findIndex(extsList, eachExt => eachExt.Id == x) != -1) {
                    // ignore it
                  } else {
                    newValue.push(x)
                  }
                })
              } else {
                newValue = value
              }
              dis(
                WorkspaceSlice.actions.mergeTabPart({
                  name: 'tools',
                  value: {
                    expanded: newValue,
                  }
                })
              );
            }}
            onSelectedChange={(value) => {
              dis(
                WorkspaceSlice.actions.mergeTabPart({
                  name: "tools",
                  value: {
                    selected: value,
                  }
                })
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

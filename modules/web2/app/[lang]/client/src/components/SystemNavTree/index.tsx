
// Date: Fri, 13 Oct 2023
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
  TreeNode,
} from "@blueprintjs/core";
import React, { useContext, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { Dot } from "../../utils/cTranslationUtils";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import {
  MutationState,
  MutationSubState,
  QuerySubState,
} from "@reduxjs/toolkit/dist/query/core/apiState";
import gutils from "../../utils/GlobalUtils";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ContextMenu, Tree, TreeNodeInfo } from "@blueprintjs/core";
import { Example, ExampleProps } from "@blueprintjs/docs-theme";
import { TreeWrapInfo } from "../../types/constants";
import MottoLineClient from "../MottoLine";
import apiSlice from "../../reducers/apiSlice";
import { useSearchQuery } from "../../types/workbench-hook";
import { logutils } from "../../utils/LogUtils";
import { useGetCategoryList } from "../../pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/hooks";
import { ClientPortalContext } from "../../pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/types";
import { FnPureToolDefinition } from "../../types/workbench-types";
export let TREE_ROOT_ID_PREFIX = "root_"
let { cloneDeep } = _;

type PassProp = {
  expanded: string[];
  selected: string[];
  onExpandedChange: (newVal: string[], valId: string | null) => any;
  onSelectedChange: (newVal: string[]) => any;
  cacheId: string;
  needShowCountChildren?: boolean;
  formatEachNode?: (node: TreeNodeInfo) => TreeNodeInfo;
  info: TreeWrapInfo;
  onChange: (new_info: TreeWrapInfo) => any;
  onDoubleClick?: (node: TreeNodeInfo | undefined) => any;
  onClick?: (node: TreeNodeInfo | undefined) => any;
};

type GroupTreeNodeInfo = TreeNodeInfo & { groupItem?: boolean };

export default (props: PassProp) => {
  // let { cacheId } = props;
  // const contentSizing = {
  //   popoverProps: { popoverClassName: Classes.POPOVER_CONTENT_SIZING },
  // };
  let info = props.info;
  if (_.isEmpty(info)) {
    return <div>{Dot("yznU9", "Empty Tree Data")}</div>;
  }
  // define a state for search text
  const [searchText, setSearchText] = useState("");

  let hasSearchText = !gutils.empty(searchText);

  let categoryList: FnPureToolDefinition[] = useGetCategoryList()

  let sq = useSearchQuery();

  let fc = sq.ls || _.get(categoryList, "[0].id", "all");

  let isAllFC = fc == "all";

  let nodes: TreeNodeInfo[] = useMemo(() => {
    // recursively format tmp_nodes to nodes, so that we can use it in Tree, note that isExpanded is true when it's in props.expanded and isSeleced is true when it's in props.selected
    let formatEachNodeItem = (nodeList: TreeNodeInfo[]): TreeNodeInfo[] => {
      return _.map(nodeList, (x) => {
        let rootLevel = (x.id + "").indexOf(TREE_ROOT_ID_PREFIX) == 0;
        let hasCaret = !_.isNil(x.hasCaret)
          ? x.hasCaret
          : !_.isEmpty(x.childNodes);
        let isExpanded = hasSearchText
          ? true
          : _.includes(props.expanded, x.id.toString());
        let i = {
          icon: "application",
          ...x,
          label:
            props.needShowCountChildren && hasCaret && !rootLevel
              ? x.label + `(${_.size(x.childNodes)})`
              : x.label,
          isExpanded: isExpanded,
          isSelected: _.includes(props.selected, x.id.toString()),
          childNodes: !isExpanded
            ? []
            : rootLevel
              ? x.childNodes
              : formatEachNodeItem(x.childNodes || []),
          // secondaryLabel: <Button minimal={true} icon="star-empty" />,
          hasCaret,
        } as TreeNodeInfo;
        if (props.formatEachNode) {
          i = props.formatEachNode(i);
        }
        return i;
      });
    };

    let groupNodeItemIfAll = (item: TreeNodeInfo[]): TreeNodeInfo[] => {
      if (!isAllFC) {
        return item;
      } else {
        let remarkItem = item[0];
        let prevItem = item.slice(1);
        let newItem: GroupTreeNodeInfo[] = [
          remarkItem,
          ...(_.map(categoryList.slice(1), (x) => {
            let crtNodes: GroupTreeNodeInfo[] = [];
            _.forEach(prevItem, (eachPrev) => {
              if (
                _.findIndex(x.SubCategories, (x) => x.Id == eachPrev.id) >= 0
              ) {
                crtNodes.push(eachPrev);
              }
            });
            return {
              id: TREE_ROOT_ID_PREFIX + x.Id,
              label: x.Label,
              childNodes: crtNodes,
              groupItem: true,
            };
          }) || []),
        ].map((x: GroupTreeNodeInfo) => {
          if (!_.get(x, ["groupItem"])) {
            return x;
          }
          let isExpanded = hasSearchText
            ? true
            : _.includes(props.expanded, x.id.toString());
          return formatEachNodeItem([
            {
              ...x,
              icon: isExpanded ? "folder-open" : "folder-close",
            },
          ])[0];
        });
        return newItem as TreeNodeInfo[];
      }
    };

    let tmp_nodes = hasSearchText
      ? _.map(info.nodes, (x) => {
        return {
          ...x,
          childNodes: _.filter(x.childNodes, (xx) => {
            return _.includes(
              (xx.label + "").toLowerCase(),
              searchText.toLowerCase()
            );
          }),
        };
      })
      : info.nodes;

    // let noUndefinedItems = (x: TreeNodeInfo[]) => _.filter(x, xx => !_.isNil(xx))

    let fin: TreeNodeInfo[] = (formatEachNodeItem(tmp_nodes));
    if (hasSearchText) {
      let n = _.filter(groupNodeItemIfAll(fin.filter((x) => !_.isEmpty(x.childNodes))), x => {
        return x && !_.isEmpty(x.childNodes)
      })
      return n;
    }
    return groupNodeItemIfAll(fin);
  }, [info.nodes, props.expanded, props.selected, info.updateId, searchText, hasSearchText]);


  logutils.debug("s-nodes", nodes);

  let clientCtx = useContext(ClientPortalContext)

  return (
    <div className="h-full ">
      <div className="pt-10">
        <InputGroup
          leftIcon="search"
          placeholder={Dot("IAC0A", "Search Tools")}
          type="search"
          small={true}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          autoFocus
        // rightElement={
        //   <ButtonGroup>
        //     <Button small icon="plus" minimal></Button>
        //   </ButtonGroup>
        // }
        ></InputGroup>
      </div>
      <div
        style={{
          height: `calc(100% - 46px)`,
          marginTop: "1px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        className="relative btm-top"
      >
        <div
          style={{
            // flexGrow: 1,
            height: clientCtx.portalMode ? '100%' : "calc(100% - 50px)",
            overflow: "auto",
          }}
        >
          <Tree
            contents={nodes}
            onNodeDoubleClick={(node) => {
              let e = node;
              if (false && node.hasCaret) {
              }
              if (!_.isNil(node)) {
                props.onDoubleClick &&
                  props.onDoubleClick(node as TreeNodeInfo);
              }
            }}
            onNodeClick={(e, e2, e3) => {
              // update props.selected according to e.isSelected
              let new_info = { ...info };
              let node = e;
              if (e.hasCaret) {
                // if e.hasCaret, then toggle if its value in props.expanded
                if (_.includes(props.expanded, node.id.toString())) {
                  props.onExpandedChange(
                    _.filter(props.expanded, (x) => {
                      return x != node.id;
                    }),
                    null
                  );
                } else {
                  props.onExpandedChange(
                    _.uniq([...(props.expanded || []), node.id]) as any,
                    node.id + ""
                  );
                }
                if (!_.isNil(e)) {
                  props.onClick && props.onClick(e as TreeNodeInfo);
                }
              } else {
                if (!e.isSelected) {
                  props.onSelectedChange([node.id.toString()]);
                }
              }
              props.onChange(new_info);
              if (!_.isNil(e)) {
                props.onClick && props.onClick(e as TreeNodeInfo);
              }
            }}
            onNodeCollapse={(obj) => {
              // props.onChange(new_info);
              props.onExpandedChange(
                _.filter(props.expanded, (x) => {
                  return x != obj.id;
                }),
                null
              );
            }}
            onNodeExpand={(obj) => {
              let fin = _.uniq([...(props.expanded || []), obj.id]) as string[];
              props.onExpandedChange(fin, obj.id + "");
            }}
            className={Classes.ELEVATION_0}
          />
        </div>
        {
          clientCtx.portalMode ? '' :
            <div className="btm-top ">
              <MottoLineClient />
            </div>
        }
      </div>
    </div>
  );
};

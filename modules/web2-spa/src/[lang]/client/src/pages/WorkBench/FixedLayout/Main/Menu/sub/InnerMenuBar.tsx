// LafTools
// 
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
// LafTools Team <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import {
  AnchorButton,
  Tooltip,
  MenuItem,
  Button,
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import { getIconPngFile } from "../../../../../../nocycle";

import { useEffect } from "react";
import gutils from "../../../../../../utils/GlobalUtils";
import _ from "lodash";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dot } from "../../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import {
  FixedMenuBarProp,
  FixedMenuItem,
  VAL_CSS_MENU_TITLE_PANEL,
} from "../../../../../../types/workbench-types";
import { CSS_TEXT_ANCHOR_CSS } from "../../../../../../types/constants";

export let FixedMenuBar = (props: FixedMenuBarProp) => {
  let [activeId, onActiveId] = useState(null);
  let [refId, onRefId] = useState<string>(_.uniqueId(""));
  let [hasClickAnyButton, onClickAnyButton] = useState<boolean>(false);
  let [currentButton, on_currentButton] = useState<string | null>(null);

  let goToMenuItem = (keyId) => {
    on_currentButton(keyId);
    onClickAnyButton(keyId == null ? false : true);
  };

  // if the user click a location which is not inside current component, then set clickAnyButton as false
  useEffect(() => {
    let fn = (e) => {
      let target = e.target;
      let isInside = false;
      while (target) {
        try {
          if (
            target.className &&
            (target.className.indexOf("fixed-wb-nav-menu") > -1 ||
              target.className.indexOf("bp5-menu") > -1)
          ) {
            isInside = true;
            break;
          }
          target = target.parentNode;
        } catch (e) {
          isInside = true;
          break;
        }
      }
      if (!isInside) {
        goToMenuItem(null);
      }
    };
    document.body.addEventListener("click", fn);
    return () => {
      document.body.removeEventListener("click", fn);
    };
  }, []);

  let RegularMenu = (props: {
    childrenNodes: FixedMenuItem[] | undefined;
    clzName: string;
  }) => {
    let fn_formatChildren = (
      childrenNodes: FixedMenuItem[] | undefined
    ): any => {
      return _.map(childrenNodes, (x) => {
        if (x.spliter) {
          return <MenuDivider />;
        }
        let body = (
          <MenuItem
            disabled={x.disabled}
            intent={(x.intent || "none") as any}
            icon={(x.icon || undefined) as any}
            onClick={() => {
              x.onClick && x.onClick();
            }}
            text={x.label}
            href={x.link}
            target="_blank"
          >
            {!_.isEmpty(x.children) ? fn_formatChildren(x.children) : null}
          </MenuItem>
        );
        if (x.routerLinkType) {
          return (
            <Link className={"" + CSS_TEXT_ANCHOR_CSS} to={x.link + ""}>
              {body}
            </Link>
          );
        }
        return body;
      });
    };
    return (
      <Menu className={props.clzName}>
        {fn_formatChildren(props.childrenNodes)}
        {/* <MenuItem
          icon="new-text-box"
          onClick={handleClick}
          text="New text box"
        />
        <MenuItem icon="new-object" onClick={handleClick} text="New object" />
        <MenuItem icon="new-link" onClick={handleClick} text="New link" />
        <MenuItem text="Settings..." icon="cog" intent="primary">
          <MenuItem icon="tick" text="Save on edit" />
          <MenuItem icon="blank" text="Compile on edit" />
        </MenuItem> */}
      </Menu>
    );
  };

  return (
    <div
      id={refId}
      className="fixed-wb-nav-menu"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: props.requiredPageIcon
          ? VAL_CSS_MENU_TITLE_PANEL + 1 + "px"
          : undefined,
      }}
    >
      <div className="focus:outline-none">
        {props.requiredPageIcon ? (
          <Tooltip
            content={Dot(
              "e_8pZ",
              "A versatile toolbox for developers to improve productivity."
            )}
          >
            <img
              className=" rotate-img LafTools-toolbox-img"
              title={Dot("xdqwe", "Welcome to use LafTools!")}
              style={{
                width: VAL_CSS_MENU_TITLE_PANEL + "px",
                position: "absolute",
                top: "0",
                left: "0",
              }}
              src={gutils.getStaticPath("/" + getIconPngFile())}
            />
          </Tooltip>
        ) : (
          ""
        )}

        {props.leftPart
          ? props.leftPart
          : _.map(props.menus, (x) => {
            let isOpen = currentButton == x.id;
            let BTag = x.routerLinkType
              ? Button
              : x.link
                ? AnchorButton
                : Button;
            let innerBTag = (
              <BTag
                // target={x.link && !x.routerLinkType ? "_blank" : undefined}
                href={x.link}
                small
                onClick={() => {
                  if (x.routerLinkType) return;
                  if (currentButton && isOpen) {
                    goToMenuItem(null);
                  } else {
                    goToMenuItem(x.id);
                  }
                }}
                onMouseEnter={() => {
                  if (hasClickAnyButton) {
                    goToMenuItem(x.id);
                  }
                }}
                disabled={x.disabled}
                minimal
                text={Dot("CPW5r", x.label || Dot("6yOXx", "Unknown Name"))}
              ></BTag>
            );
            // if (x.routerLinkType) {
            //   debugger;
            // }
            return (
              <Popover
                key={x.id}
                hasBackdrop={false}
                transitionDuration={0}
                minimal
                interactionKind={
                  hasClickAnyButton ? "hover-target" : "click-target"
                }
                isOpen={isOpen}
                placement="bottom-start"
                content={
                  <RegularMenu
                    clzName="nav-same-menu"
                    childrenNodes={x.children || []}
                  ></RegularMenu>
                }
              >
                {x.routerLinkType ? (
                  <Link to={x.link + ""}>{innerBTag}</Link>
                ) : (
                  innerBTag
                )}
              </Popover>
            );
          })}
      </div>
      <div>{props.rightShownContent}</div>
    </div>
  );
};

'use client'

import { useState } from "react";
import { Dot } from "../../utils/cTranslationUtils";

// LafTools
// 
// Date: Sat, 9 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3


// define a component that provide isClose, onClose, and text
export type ClosableTextProps = {
  goText?: string,
  goLink?: string,
  closeKey: string,
  text: string | JSX.Element;
}
export const ClosableText = (props: ClosableTextProps) => {
  let [ctn, setCtn] = useState(0)
  let isClose = false // localStorage.getItem(props.closeKey) != null;
  let onClose = () => {
    localStorage.setItem(props.closeKey, "true");
    setCtn(ctn + 1)
  }

  // if (isClose) {
  //   return <></>;
  // }
  let closeItem = <span
    onClick={() => {
      onClose();
    }}
    className=" hover:underline cursor-pointer"
  >
    [{Dot("4vdfwf", "OK")}]
  </span>
  return (
    <div className="flex flex-column">
      <div className="small-text flex-grow">
        {props.text}
        {!props.goLink ? '' : !isClose ? true ? (
          <a href={props.goLink || 'javascript:void(0);'} target='_blank' className="mr-[1px]">
            [{props.goText || Dot("4vdfwf", "OK")}]
          </a>
        ) : props.goLink ? (
          <span>
            <a href={props.goLink} target='_blank' className="mr-[1px]">
              [{props.goText || Dot("4vdfwf", "OK")}]
            </a>
            {closeItem}
          </span>
        ) : (
          closeItem
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

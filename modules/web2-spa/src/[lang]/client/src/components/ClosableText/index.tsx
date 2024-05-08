// LafTools
// 
// Date: Sat, 9 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { Dot } from "../../utils/cTranslationUtils";

// define a component that provide isClose, onClose, and text
export const ClosableText = (props: {
  isClose: boolean | undefined;
  onClose: () => void;
  text: string | JSX.Element;
}) => {
  if (props.isClose) {
    return <></>;
  }
  return (
    <div className="flex flex-column">
      <div className="flex-grow">
        {props.text}
        {!props.isClose ? (
          <span
            onClick={() => {
              props.onClose();
            }}
            className=" hover:underline cursor-pointer"
          >
            [{Dot("4vdfwf", "OK")}]
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

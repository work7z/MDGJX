// LafTools
// 
// Date: Wed, 27 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
// License: AGPLv3

import { Button } from "@blueprintjs/core";
import { Dot } from "../../utils/cTranslationUtils";
import { copy } from "../../nocycle";
import { FN_GetActualTextValueByBigTextId } from "../../actions/bigtext_action";
import AlertUtils from "../../utils/AlertUtils";

export let ExportButtonByInputId = (props: { bigtextId: string }) => {
    return (
        <Button
            small
            icon="duplicate"
            intent="success"
            text={Dot("Fv-zz", "Copy Result")}
            onClick={() => {
                AlertUtils.copyWithAlertCopied(FN_GetActualTextValueByBigTextId(props.bigtextId))
            }}
        ></Button>
    );
};

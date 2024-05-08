
// Date: Fri, 17 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

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
  Section,
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
  SectionCard,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Dot } from "../../utils/cTranslationUtils";
import exportUtils from "../../utils/ExportUtils";
import forgeSlice from "../../reducers/forgeSlice";
import { LafTools_DOC_HOME } from "../../types/constants";
import systemSlice, { ACTION_initAllDataAtOnce } from "../../reducers/systemSlice";

interface PassProp { }

export default (props: PassProp): any => {
  let val_1 = exportUtils.useSelector((val) => ({
    dark: val.forge.DarkThemeMode,
  }));
  let dis = exportUtils.dispatch();
  return (
    <div>
      {/* <ButtonGroup fill={true} vertical={false}>
        <Button
          small={true}
          // text="Software Updates"
          intent={val_1.dark ? "primary" : "none"}
          title={Dot(`r_n6h`, `Light or Dark Mode`)}
          text=""
          icon={val_1.dark ? "flash" : "moon"}
          onClick={() => {
            dis(forgeSlice.actions.updateDarkMode({ isDark: !val_1.dark }));
          }}
        />
        <Button
          small={true}
          // text="Software Updates"
          intent={"none"}
          title={Dot(`lQFII`, `Re-trigger the initialization`)}
          text=""
          icon={`refresh`}
          onClick={() => {
            dis(ACTION_initAllDataAtOnce());
          }}
        />
        <AnchorButton
          small={true}
          icon="map"
          href={LafTools_DOC_HOME}
          target="_blank"
          title={Dot(`x009`, `To access our usage documentation`)}
        ></AnchorButton>
      </ButtonGroup> */}
      <Section
        title={Dot(`about_LafTools_toolbox`, "About LafTools")}
        collapsible
      >
        <SectionCard>
          <p>
            {Dot(
              "X_HGx",
              "LafTools is a versatile toolbox designed to meet various needs. It is fully open-source, ensuring transparency and security. Despite its lightweight runtime, it offers full platform support, including ARMv8, and native AI support similar to ChatGPT. LafTools is highly integrated with a productive UI and is continuously updated with new tools. It can be used over the web and with Docker, and provides additional resources such as notes and manuals. "
            )}
          </p>
          <p>
            {Dot(
              "of_ox",
              "All in all, LafTools is a one-stop solution for all your needs."
            )}
          </p>
        </SectionCard>
      </Section>
      {/* <Section title={t("fyr", "Other things ")} collapsible>
        <SectionCard>
          <p>
            {t(
              "x01293",
              `To access our official website, please follow below links.`
            )}
          </p>
          <ul>
            <li>{t(`x0123123`, "")}: https://laftools.dev</li>
          </ul>
        </SectionCard>
      </Section> */}
    </div>
  );
};

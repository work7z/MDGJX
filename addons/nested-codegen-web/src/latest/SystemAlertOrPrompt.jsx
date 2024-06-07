import { Example,  } from "@blueprintjs/docs-theme";
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
} from "@blueprintjs/core";
import React from "react";
import _ from "lodash";
import { Provider, observer, inject ,useLocalStore} from "mobx-react";

let SystemAlertOrPrompt = observer(() => {
  return (
    <div>
      <Example>
        <Alert
          style={{ zIndex: 99999 }}
          confirmButtonText={t("OK")}
          intent={Intent.NONE}
          isOpen={gstore.sysinfo.alertObj.open}
          loading={false}
          onCancel={() => {}}
          onConfirm={() => {
            gstore.sysinfo.alertObj.open = false;
            gstore.sysinfo.alertObj.fn();
          }}
          canEscapeKeyCancel={true}
        >
          <p>{gstore.sysinfo.alertObj.msg || "N/A"}</p>
        </Alert>
        <Alert
          style={{ zIndex: 99999 }}
          cancelButtonText={t(`Cancel`)}
          confirmButtonText={t("Confirm")}
          intent={Intent.PRIMARY}
          isOpen={gstore.sysinfo.confirmObj.open}
          loading={false}
          icon={"info-sign"}
          onConfirm={() => {
            gstore.sysinfo.confirmObj.open = false;
            gstore.sysinfo.confirmObj.fn(true);
          }}
          onCancel={() => {
            gstore.sysinfo.confirmObj.open = false;
            gstore.sysinfo.confirmObj.fn(false);
          }}
          onClose={() => {
            gstore.sysinfo.confirmObj.open = false;
          }}
          canEscapeKeyCancel={true}
        >
          <p>{gstore.sysinfo.confirmObj.msg || "N/A"}</p>
        </Alert>
        <Alert
          style={{ zIndex: 99999 }}
          cancelButtonText={t(`Cancel`)}
          confirmButtonText={t("Confirm")}
          intent={Intent.PRIMARY}
          icon="paragraph"
          isOpen={gstore.sysinfo.promptObj.open}
          loading={false}
          onConfirm={() => {
            gstore.sysinfo.promptObj.open = false;
            gstore.sysinfo.promptObj.fn(gstore.sysinfo.promptObj.ipt);
          }}
          onCancel={() => {
            gstore.sysinfo.promptObj.ipt = null;
            gstore.sysinfo.promptObj.open = false;
            gstore.sysinfo.promptObj.fn(null);
          }}
          onClose={() => {
            gstore.sysinfo.promptObj.open = false;
          }}
          canEscapeKeyCancel={true}
        >
          <h3 style={{ marginBottom: "10px" }}>
            {gstore.sysinfo.promptObj.msg}
          </h3>
          <p>
            <InputGroup
              style={{ width: "100%" }}
              value={gstore.sysinfo.promptObj.ipt}
              onChange={(e) => {
                gstore.sysinfo.promptObj.ipt = gutils.getValueFromE(e);
              }}
              fill={true}
              placeholder={t(`Input the value here`)}
            />
          </p>
        </Alert>
      </Example>
    </div>
  );
});

export default SystemAlertOrPrompt;

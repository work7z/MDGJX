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
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";

import {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
} from "react-color";

let mappingColorMap = {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
};

window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = {
  initialState() {
    return {
      myvalue: 12345,
      bgcolor: "#5DEFE0",
      fgcolor: "black",
      colorPickerType: "SketchPicker",
    };
  },
  menus: [
    {
      pid: "color",
      children: [
        {
          ...fn_otherPages.get_color_list(),
          children: [
            {
              label: "Color Chooser",
              icon: "application",
              pid: "ColorPicker",
            },
          ],
        },
      ],
    },
  ],
  render: fn_otherPages.rightMainPageJsx({
    totalTitle: "Color Chooser",
    noOptions: true,
    fn_afterConfigItem({ PUtils }) {
      let { crtStoreName } = PUtils;
      return [
        {
          label: t("Display Type"),
          children: [
            {
              tag: Html_select,
              value: gstore.common_app[crtStoreName].model.colorPickerType,
              list: _.chain(mappingColorMap)
                .map((x, d, n) => ({
                  label: (d || "").replace("Picker", ""),
                  value: d,
                }))
                .value(),
              onChange: (x) => {
                gstore.common_app[crtStoreName].model.colorPickerType =
                  x.target.value;
                PUtils.commonSave();
              },
            },
          ],
        },
      ];
    },
    jsx: observer((props) => {
      let { PUtils } = props;
      let { crtStore, crtStoreName, crtModel } = PUtils;
      let bgColorKey = "bgcolor";
      let fgColorKey = "fgcolor";
      let bgColorValue = crtModel[bgColorKey];
      let fgColorValue = crtModel[fgColorKey];
      console.log("updating value", bgColorValue, fgColorValue);
      let MyFinEle = _.get(mappingColorMap, crtModel["colorPickerType"]);
      return (
        <div
          className="colorPickerWrapper"
          style={{
            width: "100%",
            height: "100%",
            background: bgColorValue,
            color: fgColorValue,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <div style={{}}>
            <h2>{t(`Background Color`)}</h2>
            <MyFinEle
              color={bgColorValue}
              onChange={(_color, e) => {
                let color = _color.rgb;
                console.log("change", color, e);
                crtModel[
                  bgColorKey
                ] = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
                PUtils.commonSave();
              }}
            />
          </div>
          <div style={{}}>
            <h2>{t(`Foreground Color`)}</h2>
            <MyFinEle
              color={fgColorValue}
              onChange={(_color, e) => {
                let color = _color.rgb;
                console.log("change", color, e);
                crtModel[
                  fgColorKey
                ] = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
                PUtils.commonSave();
              }}
            />
          </div>
        </div>
      );
    }),
  }),
};

import common_context from "../../../TranslateForJSON/frontend/kit/common_context";
import cutils from "../../../TranslateForJSON/frontend/kit/common_utils";

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
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Tag,
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

function formatForm(crtSubModel) {
  crtSubModel.ipt_ip_bits = parseInt(crtSubModel.ipt_ip_bits, 10);
  crtSubModel.ipt_ip_1 = parseInt(crtSubModel.ipt_ip_1, 10);
  crtSubModel.ipt_ip_2 = parseInt(crtSubModel.ipt_ip_2, 10);
  crtSubModel.ipt_ip_3 = parseInt(crtSubModel.ipt_ip_3, 10);
  crtSubModel.ipt_ip_4 = parseInt(crtSubModel.ipt_ip_4, 10);
}
function hex2decimal(a) {
  let value2 = a.toUpperCase(),
    value4 = " ",
    value3 = 0;
  for (; value2.length < 4; ) {
    value2 = 0 + value2;
  }
  for (var m_011 = 0; m_011 < 4; m_011++) {
    let m_100 = value2.charAt(m_011);
    let idx = "0123456789ABCDEF".indexOf(m_100);
    value3 = 16 * value3 + idx;
  }
  return value3;
}
function fn_dec2hex(value) {
  if (isNaN(value)) {
    return "00";
  } else {
    return _.padStart(parseInt(value).toString(16).toUpperCase(), 2, "0");
  }
}
function decimal2binary(a) {
  var value1 = 0,
    value2 = 0,
    value3 = 0,
    value4 = 0,
    value5 = 0,
    value100 = 0,
    value6 = 0,
    value7 = 0;
  128 & a && (value1 = 1);
  64 & a && (value2 = 1);
  32 & a && (value3 = 1);
  16 & a && (value4 = 1);
  8 & a && (value5 = 1);
  4 & a && (value6 = 1);
  2 & a && (value7 = 1);
  1 & a && (value100 = 1);
  return (
    "" + value1 + value2 + value3 + value4 + value5 + value6 + value7 + value100
  );
}
function b2d(arg) {
  let idx = 0;
  for (; arg.length < 8; ) {
    arg = "0" + arg;
  }
  return (
    "1" == arg.substring(7, 8) && idx++,
    "1" == arg.substring(6, 7) && (idx += 2),
    "1" == arg.substring(5, 6) && (idx += 4),
    "1" == arg.substring(4, 5) && (idx += 8),
    "1" == arg.substring(3, 4) && (idx += 16),
    "1" == arg.substring(2, 3) && (idx += 32),
    "1" == arg.substring(1, 2) && (idx += 64),
    "1" == arg.substring(0, 1) && (idx += 128),
    idx
  );
}
function decimal2hex(args) {
  let ve1 = args,
    ve3 = "",
    ve2 = 0;
  for (; ve2 < 2; ve2++) {
    let mkvalue = 15 & ve1;
    let midx = "0123456789ABCDEF".charAt(mkvalue);
    ve3 = midx + ve3;
    ve1 >>= 4;
  }
  return ve3;
}
function leftPadBits(a) {
  let bitpat;
  if (8 <= a) {
    return 255;
  } else {
    for (bitpat = 65280; 0 < a; a--) {
      bitpat >>= 1;
    }
    return 255 & bitpat;
  }
}
function decimal2bits(real_args) {
  real_args = parseInt(real_args);
  let args = 0;
  return (
    128 & real_args && (args += 1),
    64 & real_args && (args += 1),
    32 & real_args && (args += 1),
    16 & real_args && (args += 1),
    8 & real_args && (args += 1),
    4 & real_args && (args += 1),
    2 & real_args && (args += 1),
    1 & real_args && (args += 1),
    args
  );
}
function bits2decimal(real_args) {
  real_args = parseInt(real_args);
  let args = 0;
  return (
    0 < real_args && (args += 128),
    1 < real_args && (args += 64),
    2 < real_args && (args += 32),
    3 < real_args && (args += 16),
    4 < real_args && (args += 8),
    5 < real_args && (args += 4),
    6 < real_args && (args += 2),
    7 < real_args && (args += 1),
    args
  );
}
function fn_calc_mask(sub_model) {
  let tmpvar = parseInt(sub_model.ipt_ip_bits, 10);
  let rawValue = tmpvar;
  sub_model.ipt_mask_bits_1 = 0;
  sub_model.ipt_mask_bits_2 = 0;
  sub_model.ipt_mask_bits_3 = 0;
  sub_model.ipt_mask_bits_4 = 0;
  if (8 <= tmpvar) {
    sub_model.ipt_mask_bits_1 = 255;
    tmpvar -= 8;
    if (8 <= tmpvar) {
      sub_model.ipt_mask_bits_2 = 255;
      tmpvar -= 8;
      if (8 <= tmpvar) {
        sub_model.ipt_mask_bits_3 = 255;
        tmpvar -= 8;
        sub_model.ipt_mask_bits_4 = leftPadBits(tmpvar);
      } else {
        sub_model.ipt_mask_bits_3 = leftPadBits(tmpvar);
      }
    } else {
      (sub_model.ipt_mask_bits_2 = leftPadBits(tmpvar)), 0;
    }
  } else {
    sub_model.ipt_mask_bits_1 = leftPadBits(tmpvar);
  }
  // return tmpvar;
  return rawValue;
}
function fn_convert_subnet_mask(crtSubModel) {
  let tmpvar = parseInt(crtSubModel.ipt_ip_bits, 10);
  if (isNaN(tmpvar) || 30 < tmpvar || tmpvar < 0) {
    cutils.alertErr_noT(
      t(
        `Invalid Netmask Bits Value, ToolBox expects it would be limited from 0 to 30, but got {0}`,
        tmpvar
      )
    );
    return;
  } else {
    crtSubModel.ipt_maximum_addresses = Math.pow(2, 32 - tmpvar);
    crtSubModel.ipt_available_addr = Math.pow(2, 32 - tmpvar) - 2;
    fn_calc_mask(crtSubModel);
    cutils.alertOk_noT(t(`Done.`));
  }
}
let FInput = observer((props) => {
  if (props.type == "button" && props.value == tx(`Calculate`)) {
    props = {
      ...props,
      intent: "primary",
    };
  }
  return (
    <common_context.IPv4FormContext.Consumer>
      {(ctx_props) => {
        window.tmp_____ctx_props = ctx_props;
        let PUtils = ctx_props.PUtils;
        let { funcID, funcModel } = ctx_props;
        let common_style = {
          marginLeft: "3px",
        };
        if (_.isNil(props.ap) && ["button"].indexOf(props.type) == -1) {
          return "not yet binded " + JSON.stringify(props.label);
        }
        if (props.type == "radio") {
          return (
            <Radio inlined={true} inline={true} {...props} style={common_style}>
              {props.children}
            </Radio>
          );
        }
        if (props.type == "button") {
          return (
            <Button {...props} style={{ ...common_style }} small={true}>
              {props.children || props.value}
            </Button>
          );
        }
        console.log("changing render", props.ap);
        return React.createElement(
          observer((x_props) => {
            return (
              <input
                {...props}
                style={{ ...common_style }}
                value={PUtils.crtModel[funcID][props.ap]}
                onChange={(e) => {
                  let finValue = e.target.value;
                  if (props.type == "number") {
                    let pv = parseInt(finValue);
                    if (isNaN(pv) && _.trim(finValue) != "") {
                      finValue = "0";
                    } else {
                      if (!_.isNil(props.max) && pv > props.max) {
                        finValue = props.max;
                      } else if (!_.isNil(props.min) && pv < props.min) {
                        finValue = props.min;
                      }
                    }
                  }
                  console.log("changing ", props.ap, finValue);
                  PUtils.crtModel[funcID][props.ap] = finValue;
                }}
                className={"bp3-input bp3-small"}
                // disabled={!_.isNil(props.readonly)}
              ></input>
            );
          })
        );
      }}
    </common_context.IPv4FormContext.Consumer>
  );
});
let tx = (...args) => t(...args);
// let tx = (...args) => args[0];
let common_IP_rules = {
  type: "number",
  min: 0,
  max: 255,
};
const jsx_ipv_ref = {
  jsx_ipv6_calculator({ PUtils }) {
    return observer(() => {
      return <div>ok</div>;
    });
  },
  // 网络和IP地址计算器
  jsx_ipv4_network({ PUtils }) {
    return observer(() => {
      let fn_calc_now = () => {
        // calNBFL
        _.merge(PUtils.crtModel["ipv4_detail"], {
          ipt_available_addr: "",
          ipt_mask_bits_1: "",
          ipt_mask_bits_2: "",
          ipt_mask_bits_3: "",
          ipt_mask_bits_4: "",
          ipt_netaddr_1: "",
          ipt_netaddr_2: "",
          ipt_netaddr_3: "",
          ipt_netaddr_4: "",
          ipt_first_avaliable_1: "",
          ipt_first_avaliable_2: "",
          ipt_first_avaliable_3: "",
          ipt_first_avaliable_4: "",
          ipt_last_addr_1: "",
          ipt_last_addr_2: "",
          ipt_last_addr_3: "",
          ipt_last_addr_4: "",
          ipt_broadcast_1: "",
          ipt_broadcast_2: "",
          ipt_broadcast_3: "",
          ipt_broadcast_4: "",
        });
        let crtSubModel = PUtils.crtModel["ipv4_detail"];

        formatForm(crtSubModel);
        let {
          ipt_ip_1,
          ipt_ip_2,
          ipt_ip_3,
          ipt_ip_4,
          ipt_ip_bits,
          ipt_available_addr,
          ipt_mask_bits_1,
          ipt_mask_bits_2,
          ipt_mask_bits_3,
          ipt_mask_bits_4,
          ipt_netaddr_1,
          ipt_netaddr_2,
          ipt_netaddr_3,
          ipt_netaddr_4,
          ipt_first_avaliable_1,
          ipt_first_avaliable_2,
          ipt_first_avaliable_3,
          ipt_first_avaliable_4,
          ipt_last_addr_1,
          ipt_last_addr_2,
          ipt_last_addr_3,
          ipt_last_addr_4,
        } = crtSubModel;
        if (isNaN(ipt_ip_bits) || ipt_ip_bits > 32 || ipt_ip_bits < 0) {
          cutils.alertErr_noT(
            t(
              `Netmask cannot be greater than 32 or smaller than 0, please check the current value {0}`,
              ipt_ip_bits
            )
          );
          return;
        }
        let tmpvar = fn_calc_mask(crtSubModel);
        if (ipt_ip_bits == 31) {
          crtSubModel.ipt_available_addr = 2;
          // set first available items
          crtSubModel.ipt_first_avaliable_1 =
            crtSubModel.ipt_ip_1 & crtSubModel.ipt_mask_bits_1;
          crtSubModel.ipt_first_avaliable_2 =
            crtSubModel.ipt_ip_2 & crtSubModel.ipt_mask_bits_2;
          crtSubModel.ipt_first_avaliable_3 =
            crtSubModel.ipt_ip_3 & crtSubModel.ipt_mask_bits_3;
          crtSubModel.ipt_first_avaliable_4 =
            crtSubModel.ipt_ip_4 & crtSubModel.ipt_mask_bits_4;
          // other formatting logic
          crtSubModel.ipt_last_addr_1 =
            crtSubModel.ipt_ip_1 | (255 & ~crtSubModel.ipt_mask_bits_1);
          crtSubModel.ipt_last_addr_2 =
            crtSubModel.ipt_ip_2 | (255 & ~crtSubModel.ipt_mask_bits_2);
          crtSubModel.ipt_last_addr_3 =
            crtSubModel.ipt_ip_3 | (255 & ~crtSubModel.ipt_mask_bits_3);
          crtSubModel.ipt_last_addr_4 =
            crtSubModel.ipt_ip_4 | (255 & ~crtSubModel.ipt_mask_bits_4);
        } else if (ipt_ip_bits == 32) {
          crtSubModel.ipt_available_addr = 1;
          crtSubModel.ipt_first_avaliable_1 = crtSubModel.ipt_ip_1;
          crtSubModel.ipt_first_avaliable_2 = crtSubModel.ipt_ip_2;
          crtSubModel.ipt_first_avaliable_3 = crtSubModel.ipt_ip_3;
          crtSubModel.ipt_first_avaliable_4 = crtSubModel.ipt_ip_4;
        } else {
          crtSubModel.ipt_available_addr = Math.pow(2, 32 - tmpvar) - 2;
          // broadcast
          crtSubModel.ipt_broadcast_1 =
            crtSubModel.ipt_ip_1 | (255 & ~crtSubModel.ipt_mask_bits_1);
          crtSubModel.ipt_broadcast_2 =
            crtSubModel.ipt_ip_2 | (255 & ~crtSubModel.ipt_mask_bits_2);
          crtSubModel.ipt_broadcast_3 =
            crtSubModel.ipt_ip_3 | (255 & ~crtSubModel.ipt_mask_bits_3);
          crtSubModel.ipt_broadcast_4 =
            crtSubModel.ipt_ip_4 | (255 & ~crtSubModel.ipt_mask_bits_4);
          // network
          "1234".split("").map((x, d, n) => {
            crtSubModel["ipt_netaddr_" + x] =
              crtSubModel["ipt_ip_" + x] & crtSubModel["ipt_mask_bits_" + x];
          });
          "123".split("").map((x, d, n) => {
            crtSubModel["ipt_first_avaliable_" + x] =
              crtSubModel["ipt_netaddr_" + x];
          });
          crtSubModel.ipt_first_avaliable_4 =
            parseInt(crtSubModel.ipt_netaddr_4) + 1;
          // last addr
          crtSubModel.ipt_last_addr_1 = crtSubModel.ipt_broadcast_1;
          crtSubModel.ipt_last_addr_2 = crtSubModel.ipt_broadcast_2;
          crtSubModel.ipt_last_addr_3 = crtSubModel.ipt_broadcast_3;
          crtSubModel.ipt_last_addr_4 =
            parseInt(crtSubModel.ipt_broadcast_4) - 1;
        }
      };
      return (
        <table>
          <tbody>
            <tr>
              <td colspan="3">
                {tx(
                  `Parse network, broadcast, first and last specified network address:`
                )}
              </td>
            </tr>
            <tr>
              <td width="200" align="right">
                IP/{tx("Netmask Bits")}:
              </td>
              <td width="330" align="right">
                <FInput
                  size="3"
                  maxlength="3"
                  ap="ipt_ip_1"
                  {...common_IP_rules}
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  size="3"
                  maxlength="3"
                  ap="ipt_ip_2"
                  {...common_IP_rules}
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  {...common_IP_rules}
                  size="3"
                  maxlength="3"
                  ap="ipt_ip_3"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  // type="text"
                  {...common_IP_rules}
                  size="3"
                  maxlength="3"
                  ap="ipt_ip_4"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <span style={{ display: "inline-flex", padding: "0 5px" }}>
                  /
                </span>
                <FInput
                  {...common_IP_rules}
                  max={32}
                  // type="text"
                  size="2"
                  ap="ipt_ip_bits"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </td>
              <td>
                <FInput
                  // onclick="calNBFL(this.form)"
                  type="button"
                  value={tx("Calculate")}
                  intent={"primary"}
                  onClick={fn_calc_now}
                />
                <FInput
                  // onclick="calNBFL(this.form)"
                  type="button"
                  value={tx("Copy")}
                  intent="success"
                  onClick={async (e) => {
                    let tmp_crt_model = PUtils.crtModel["ipv4_detail"];
                    cutils.copy(
                      `${[
                        tmp_crt_model.ipt_ip_1,
                        tmp_crt_model.ipt_ip_2,
                        tmp_crt_model.ipt_ip_3,
                        tmp_crt_model.ipt_ip_4,
                      ].join(".")}${
                        !_.isEmpty(tmp_crt_model.ipt_ip_bits)
                          ? "/" + tmp_crt_model.ipt_ip_bits
                          : ""
                      }`,
                      e
                    );
                  }}
                />
                <FInput
                  // onclick="calNBFL(this.form)"
                  type="button"
                  value={tx("Import")}
                  onClick={async (e) => {
                    let tmp_crt_model = PUtils.crtModel["ipv4_detail"];
                    let ip_part = [
                      "ipt_ip_1",
                      "ipt_ip_2",
                      "ipt_ip_3",
                      "ipt_ip_4",
                      "ipt_ip_bits",
                    ];
                    await cutils.importForIpPart({
                      tmp_crt_model,
                      ip_part,
                    });
                    fn_calc_now();
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <b>{tx("Calculate Result")}</b>
              </td>
              <td rowspan="6"></td>
            </tr>
            <tr>
              <td width="100" align="right">
                {tx("Available Address Size")}:
              </td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  size="15"
                  ap="ipt_available_addr"
                />
              </td>
            </tr>
            <tr>
              <td width="100" align="right">
                {tx("Netmask Bits")}
              </td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_1"
                  ap="ipt_mask_bits_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_2"
                  ap="ipt_mask_bits_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_3"
                  ap="ipt_mask_bits_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_4"
                  ap="ipt_mask_bits_4"
                />
              </td>
            </tr>
            <tr>
              <td align="right">{tx("Network")}</td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="nwadr_1"
                  ap="ipt_netaddr_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="nwadr_2"
                  ap="ipt_netaddr_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="nwadr_3"
                  ap="ipt_netaddr_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="nwadr_4"
                  ap="ipt_netaddr_4"
                />
              </td>
            </tr>
            <tr>
              <td align="right">{tx("First Available Address")}:</td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="firstadr_1"
                  ap="ipt_first_avaliable_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="firstadr_2"
                  ap="ipt_first_avaliable_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="firstadr_3"
                  ap="ipt_first_avaliable_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="firstadr_4"
                  ap="ipt_first_avaliable_4"
                />
              </td>
            </tr>
            <tr>
              <td align="right">{tx("Last Available Address")}:</td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="lastadr_1"
                  ap="ipt_last_addr_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="lastadr_2"
                  ap="ipt_last_addr_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="lastadr_3"
                  ap="ipt_last_addr_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="lastadr_4"
                  ap="ipt_last_addr_4"
                />
              </td>
            </tr>
            <tr>
              <td align="right">{tx("Broadcast")}:</td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="bcast_1"
                  ap="ipt_broadcast_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  ap="ipt_broadcast_2"
                  // name="bcast_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  ap="ipt_broadcast_3"
                  // name="bcast_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="bcast_4"
                  ap="ipt_broadcast_4"
                />
              </td>
            </tr>
            {/* <tr>
                <td colspan="3">
                  在网络掩码“位格式”也被称为CIDR格式（CIDR=无类别域间路由选择）。
                </td>
              </tr> */}
          </tbody>
        </table>
      );
    });
  },
  // IP 地址进制转换器
  jsx_ipv4_addr: ({ PUtils }) => {
    return observer(() => {
      let crtSubModel = PUtils.crtModel["ipv4_addr"];
      let fn_pre_init = (crtSubModel) => {
        crtSubModel.ip_1 = parseInt(crtSubModel.ip_1);
        crtSubModel.ip_2 = parseInt(crtSubModel.ip_2);
        crtSubModel.ip_3 = parseInt(crtSubModel.ip_3);
        crtSubModel.ip_4 = parseInt(crtSubModel.ip_4);
      };
      let fn_calc_ip = (crtSubModel) => {
        fn_pre_init(crtSubModel);
        crtSubModel.bin_1 = decimal2binary(crtSubModel.ip_1);
        crtSubModel.bin_2 = decimal2binary(crtSubModel.ip_2);
        crtSubModel.bin_3 = decimal2binary(crtSubModel.ip_3);
        crtSubModel.bin_4 = decimal2binary(crtSubModel.ip_4);
        crtSubModel.hex_1 = decimal2hex(crtSubModel.ip_1);
        crtSubModel.hex_2 = decimal2hex(crtSubModel.ip_2);
        crtSubModel.hex_3 = decimal2hex(crtSubModel.ip_3);
        crtSubModel.hex_4 = decimal2hex(crtSubModel.ip_4);
        crtSubModel.dec =
          eval(16777216 * crtSubModel.ip_1) +
          eval(65536 * crtSubModel.ip_2) +
          eval(256 * crtSubModel.ip_3) +
          eval(crtSubModel.ip_4);
        gutils.alertOk("Done.");
      };
      let fn_calc_hex = (crtSubModel) => {
        fn_pre_init(crtSubModel);
        crtSubModel.ip_1 = hex2decimal(crtSubModel.hex_1);
        crtSubModel.ip_2 = hex2decimal(crtSubModel.hex_2);
        crtSubModel.ip_3 = hex2decimal(crtSubModel.hex_3);
        crtSubModel.ip_4 = hex2decimal(crtSubModel.hex_4);
        crtSubModel.bin_1 = decimal2binary(crtSubModel.ip_1);
        crtSubModel.bin_2 = decimal2binary(crtSubModel.ip_2);
        crtSubModel.bin_3 = decimal2binary(crtSubModel.ip_3);
        crtSubModel.bin_4 = decimal2binary(crtSubModel.ip_4);
        crtSubModel.dec =
          eval(16777216 * crtSubModel.ip_1) +
          eval(65536 * crtSubModel.ip_2) +
          eval(256 * crtSubModel.ip_3) +
          eval(crtSubModel.ip_4);
        gutils.alertOk("Done.");
      };
      let fn_calc_bin = (crtSubModel) => {
        fn_pre_init(crtSubModel);
        crtSubModel.ip_1 = b2d(crtSubModel.bin_1);
        crtSubModel.ip_2 = b2d(crtSubModel.bin_2);
        crtSubModel.ip_3 = b2d(crtSubModel.bin_3);
        crtSubModel.ip_4 = b2d(crtSubModel.bin_4);
        crtSubModel.hex_1 = decimal2hex(crtSubModel.ip_1);
        crtSubModel.hex_2 = decimal2hex(crtSubModel.ip_2);
        crtSubModel.hex_3 = decimal2hex(crtSubModel.ip_3);
        crtSubModel.hex_4 = decimal2hex(crtSubModel.ip_4);
        crtSubModel.dec =
          eval(16777216 * crtSubModel.ip_1) +
          eval(65536 * crtSubModel.ip_2) +
          eval(256 * crtSubModel.ip_3) +
          eval(crtSubModel.ip_4);
        gutils.alertOk("Done.");
      };
      let fn_calc_dec = (crtSubModel) => {
        fn_pre_init(crtSubModel);
        crtSubModel.dec = parseInt(crtSubModel.dec, 10);
        crtSubModel.ip_1 = crtSubModel.dec >>> 24;
        crtSubModel.ip_2 = (crtSubModel.dec << 8) >>> 24;
        crtSubModel.ip_3 = (crtSubModel.dec << 16) >>> 24;
        crtSubModel.ip_4 = (crtSubModel.dec << 24) >>> 24;
        crtSubModel.bin_1 = decimal2binary(crtSubModel.ip_1);
        crtSubModel.bin_2 = decimal2binary(crtSubModel.ip_2);
        crtSubModel.bin_3 = decimal2binary(crtSubModel.ip_3);
        crtSubModel.bin_4 = decimal2binary(crtSubModel.ip_4);
        crtSubModel.hex_1 = decimal2hex(crtSubModel.ip_1);
        crtSubModel.hex_2 = decimal2hex(crtSubModel.ip_2);
        crtSubModel.hex_3 = decimal2hex(crtSubModel.ip_3);
        crtSubModel.hex_4 = decimal2hex(crtSubModel.ip_4);
        gutils.alertOk("Done.");
      };
      return (
        <table className="ip-table">
          <tbody>
            <tr>
              <td width="180" align="right">
                {tx("Decimal(10)")} TCP/IP {tx(`Address`)}:
              </td>
              <td width="400" align="right">
                <FInput
                  type="text"
                  // name="oct1b"
                  ap="ip_1"
                  size="3"
                  maxlength="3"
                  // value="192"
                  spellcheck="false"
                  data-ms-editor="true"
                  {...common_IP_rules}
                />
                <FInput
                  type="text"
                  // name="oct2b"
                  ap="ip_2"
                  size="3"
                  maxlength="3"
                  // value="168"
                  spellcheck="false"
                  data-ms-editor="true"
                  {...common_IP_rules}
                />
                <FInput
                  type="text"
                  // name="oct3b"
                  ap="ip_3"
                  size="3"
                  maxlength="3"
                  // value="0"
                  spellcheck="false"
                  data-ms-editor="true"
                  {...common_IP_rules}
                />
                <FInput
                  type="text"
                  // name="oct4b"
                  size="3"
                  maxlength="3"
                  // value="1"
                  ap="ip_4"
                  spellcheck="false"
                  data-ms-editor="true"
                  {...common_IP_rules}
                />
              </td>
              <td>
                <FInput
                  type="button"
                  value={tx(`Calculate`)}
                  intent={"primary"}
                  onClick={() => {
                    fn_calc_ip(crtSubModel);
                  }}
                />
                <FInput
                  type="button"
                  value={tx(`Copy`)}
                  intent={"success"}
                  onClick={(e) => {
                    cutils.copy(
                      [
                        crtSubModel.ip_1,
                        crtSubModel.ip_2,
                        crtSubModel.ip_3,
                        crtSubModel.ip_4,
                      ].join("."),
                      e
                    );
                  }}
                />
                <FInput
                  type="button"
                  value={tx(`Import`)}
                  intent={"none"}
                  onClick={(e) => {
                    cutils.importForIpPart({
                      ip_part: ["ip_1", "ip_2", "ip_3", "ip_4"],
                      tmp_crt_model: crtSubModel,
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td width="180" align="right">
                {tx(`Binary(2)`)} TCP/IP {tx(`Address`)}:
              </td>
              <td align="right">
                <FInput
                  type="text"
                  // name="bin1b"
                  size="8"
                  maxlength="8"
                  spellcheck="false"
                  data-ms-editor="true"
                  ap="bin_1"
                />
                <FInput
                  type="text"
                  // name="bin2b"
                  ap="bin_2"
                  size="8"
                  maxlength="8"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  type="text"
                  // name="bin3b"
                  ap="bin_3"
                  size="8"
                  maxlength="8"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  type="text"
                  // name="bin4b"
                  ap="bin_4"
                  size="8"
                  maxlength="8"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </td>
              <td>
                <FInput
                  type="button"
                  value={tx(`Calculate`)}
                  // onclick="compute4(this.form);"
                  onClick={() => {
                    fn_calc_bin(crtSubModel);
                  }}
                  intent={"primary"}
                />
                <FInput
                  type="button"
                  value={tx(`Copy`)}
                  intent={"success"}
                  onClick={(e) => {
                    cutils.copy(
                      [
                        crtSubModel.bin_1,
                        crtSubModel.bin_2,
                        crtSubModel.bin_3,
                        crtSubModel.bin_4,
                      ].join("."),
                      e
                    );
                  }}
                />
                <FInput
                  type="button"
                  value={tx(`Import`)}
                  intent={"none"}
                  onClick={(e) => {
                    cutils.importForIpPart({
                      ip_part: ["bin_1", "bin_2", "bin_3", "bin_4"],
                      tmp_crt_model: crtSubModel,
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td width="230" align="right">
                {tx(`Hexadecimal(16)`)} TCP/IP {tx(`Address`)}:
              </td>
              <td align="right">
                <FInput
                  type="text"
                  // name="hex1b"
                  ap="hex_1"
                  size="2"
                  maxlength="2"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  type="text"
                  // name="hex2b"
                  ap="hex_2"
                  size="2"
                  maxlength="2"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  type="text"
                  // name="hex3b"
                  ap="hex_3"
                  size="2"
                  maxlength="2"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  type="text"
                  ap="hex_4"
                  // name="hex4b"
                  size="2"
                  maxlength="2"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </td>
              <td>
                <FInput
                  type="button"
                  value={tx(`Calculate`)}
                  intent={"primary"}
                  // onclick="compute5(this.form);"
                  onClick={() => {
                    fn_calc_hex(crtSubModel);
                  }}
                />
                <FInput
                  type="button"
                  value={tx(`Copy`)}
                  intent={"success"}
                  onClick={(e) => {
                    cutils.copy(
                      [
                        crtSubModel.hex_1,
                        crtSubModel.hex_2,
                        crtSubModel.hex_3,
                        crtSubModel.hex_4,
                      ].join("."),
                      e
                    );
                  }}
                />
                <FInput
                  type="button"
                  value={tx(`Import`)}
                  intent={"none"}
                  onClick={(e) => {
                    cutils.importForIpPart({
                      ip_part: ["hex_1", "hex_2", "hex_3", "hex_4"],
                      tmp_crt_model: crtSubModel,
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                {tx(`Decimal(10)`)} TCP/IP {tx(`Address`)}:
              </td>
              <td align="right">
                <FInput
                  type="text"
                  // name="dec1b"
                  ap="dec"
                  size="15"
                  maxlength="10"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </td>
              <td align="left">
                <FInput
                  type="button"
                  value={tx(`Calculate`)}
                  intent={"primary"}
                  // onclick="compute6(this.form);"
                  onClick={() => {
                    fn_calc_dec(crtSubModel);
                  }}
                />
                <FInput
                  type="button"
                  value={tx(`Copy`)}
                  intent={"success"}
                  onClick={(e) => {
                    cutils.copy([crtSubModel.dec].join("."), e);
                  }}
                />
                <FInput
                  type="button"
                  value={tx(`Import`)}
                  intent={"none"}
                  onClick={async (e) => {
                    let a = await cutils.getClipboardData();
                    if (a) {
                      crtSubModel.dec = a;
                    }
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  },
  // 通过{tx("Number of Mask Bits")}计算子网掩码
  get_subnet_mask_by_bits({ PUtils, crtSubModel }) {
    return observer(() => {
      function fn_get_subNet_by_bits(crtSubModel) {
        crtSubModel.ipt_mask_bits_hex_1 = "";
        crtSubModel.ipt_mask_bits_hex_2 = "";
        crtSubModel.ipt_mask_bits_hex_3 = "";
        crtSubModel.ipt_mask_bits_hex_4 = "";
        fn_calc_mask(crtSubModel);
        crtSubModel.ipt_mask_bits_hex_1 = fn_dec2hex(
          crtSubModel.ipt_mask_bits_1
        );
        crtSubModel.ipt_mask_bits_hex_2 = fn_dec2hex(
          crtSubModel.ipt_mask_bits_2
        );
        crtSubModel.ipt_mask_bits_hex_3 = fn_dec2hex(
          crtSubModel.ipt_mask_bits_3
        );
        crtSubModel.ipt_mask_bits_hex_4 = fn_dec2hex(
          crtSubModel.ipt_mask_bits_4
        );
        gutils.alertOk(`Done.`);
      }
      return (
        <table>
          <tbody>
            <tr>
              <td width="160" align="right">
                {tx("Number of Netmask Bits")}:
              </td>
              <td width="260" align="right">
                <span
                  style={{
                    padding: "0 3px",
                  }}
                >
                  /
                </span>
                <FInput
                  type="text"
                  size="2"
                  // value="24"
                  // name="bits"
                  ap="ipt_ip_bits"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </td>
              <td>
                <FInput
                  // onclick="calcNWmaskForm2(this.form)"
                  onClick={() => {
                    fn_get_subNet_by_bits(crtSubModel);
                  }}
                  type="button"
                  value={tx("Calculate")}
                />

                {/* <FInput
                  onclick="resetform2(this.form)"
                  type="button"
                  value={tx("Reset")}
                /> */}
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <b>{tx("Calculate Result")}</b>
              </td>
              <td rowspan="1"></td>
            </tr>
            <tr>
              <td align="right">{tx("Subnet(Decimal) Mask Bits")}</td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  size="3"
                  ap="ipt_mask_bits_1"
                  // name="snm_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  size="3"
                  ap="ipt_mask_bits_2"
                  // name="snm_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  size="3"
                  ap="ipt_mask_bits_3"
                  // name="snm_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  size="3"
                  ap="ipt_mask_bits_4"
                  // name="snm_1"
                />
                {/* <FInput type="text" readonly="" size="3" name="snm_2" />
                <FInput type="text" readonly="" size="3" name="snm_3" />
                <FInput type="text" readonly="" size="3" name="snm_4" /> */}
              </td>
              <td>
                <FInput
                  // onclick="calcNWmaskForm2(this.form)"
                  onClick={(e) => {
                    cutils.copy(
                      [
                        crtSubModel.ipt_mask_bits_1,
                        crtSubModel.ipt_mask_bits_2,
                        crtSubModel.ipt_mask_bits_3,
                        crtSubModel.ipt_mask_bits_4,
                      ].join("."),
                      e
                    );
                  }}
                  intent="success"
                  type="button"
                  value={tx("Copy")}
                />
              </td>
            </tr>
            <tr>
              <td width="230" align="right">
                {tx("Subnet(Hexadecimal) Mask Bits")}
              </td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  size="2"
                  ap="ipt_mask_bits_hex_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  size="2"
                  ap="ipt_mask_bits_hex_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  size="2"
                  ap="ipt_mask_bits_hex_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  size="2"
                  ap="ipt_mask_bits_hex_4"
                />
                {/* <FInput type="text" readonly="" size="2" name="hex_2" />
                <FInput type="text" readonly="" size="2" name="hex_3" />
                <FInput type="text" readonly="" size="2" name="hex_4" /> */}
              </td>
              <td>
                <FInput
                  // onclick="calcNWmaskForm2(this.form)"
                  onClick={(e) => {
                    cutils.copy(
                      [
                        crtSubModel.ipt_mask_bits_hex_1,
                        crtSubModel.ipt_mask_bits_hex_2,
                        crtSubModel.ipt_mask_bits_hex_3,
                        crtSubModel.ipt_mask_bits_hex_4,
                      ].join("."),
                      e
                    );
                  }}
                  intent="success"
                  type="button"
                  value={tx("Copy")}
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  },
  // 通过{tx("Number of Mask Bits")}转换子网掩码
  convert_subnet_mask({ PUtils, crtSubModel }) {
    return observer(() => {
      return (
        <table>
          <tbody>
            <tr>
              <td align="right" width="150">
                {t(`Netmask Bits`)}:
              </td>
              <td>
                <FInput
                  size="3"
                  type="number"
                  min={0}
                  max={30}
                  // value="27"
                  // name="bits"
                  ap="ipt_ip_bits"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  // onclick="calcAmount(this.form)"
                  onClick={() => {
                    fn_convert_subnet_mask(crtSubModel);
                  }}
                  type="button"
                  value={t(`Calculate`)}
                ></FInput>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <b>{t(`Calculate Result`)}</b>
              </td>
              <td rowspan="4"></td>
            </tr>
            <tr>
              <td align="right">{t(`Available Address Size`)}:</td>
              <td>
                <FInput
                  type="text"
                  readonly=""
                  size="13"
                  // name="numofaddr"
                  ap="ipt_available_addr"
                ></FInput>
              </td>
            </tr>
            <tr>
              <td align="right">{t(`The Maximum of Addresses`)}:</td>
              <td>
                <FInput
                  type="text"
                  readonly=""
                  size="13"
                  // name="maxaddr"
                  ap="ipt_maximum_addresses"
                ></FInput>
              </td>
            </tr>
            <tr>
              <td align="right">{tx(`Subnet Mask`)}:</td>
              <td>
                {/* <FInput type="text" readonly="" size="3" name="snm_1" />
                <FInput type="text" readonly="" size="3" name="snm_2" />
                <FInput type="text" readonly="" size="3" name="snm_3" />
                <FInput type="text" readonly="" size="3" name="snm_4" /> */}
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_1"
                  ap="ipt_mask_bits_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_2"
                  ap="ipt_mask_bits_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_3"
                  ap="ipt_mask_bits_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_4"
                  ap="ipt_mask_bits_4"
                />
                <FInput
                  // onclick="calcNWmaskForm2(this.form)"
                  onClick={(e) => {
                    cutils.copy(
                      [
                        crtSubModel.ipt_mask_bits_1,
                        crtSubModel.ipt_mask_bits_2,
                        crtSubModel.ipt_mask_bits_3,
                        crtSubModel.ipt_mask_bits_4,
                      ].join("."),
                      e
                    );
                  }}
                  intent="success"
                  type="button"
                  value={tx("Copy")}
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  },
  // 通过主机数量计算子网掩码
  get_subnet_mask_by_host({ PUtils, crtSubModel }) {
    let fn_subnet_by_hosts = (crtSubModel) => {
      let tmpvar = parseInt(crtSubModel.ipt_required_address, 10);
      if (isNaN(tmpvar) || 4294967294 < tmpvar || tmpvar < 1) {
        cutils.alertErr_noT(
          t(
            `ToolBox expects the value will be ranged from 1 to 4294967294, but actually got {0}, please try to adjust your value and re-try it.`,
            tmpvar
          )
        );
        return;
      }
      let expval = parseInt(Math.log(tmpvar) / Math.log(2)) + 1;
      let maxaddrval = Math.pow(2, expval);
      if (maxaddrval - tmpvar < 2) {
        expval += 1;
      }
      crtSubModel.ipt_available_addr = Math.pow(2, expval) - 2;
      crtSubModel.ipt_ip_bits = 32 - expval;
      fn_calc_mask(crtSubModel);
      gutils.alertOk(`Done.`);
    };
    return observer(() => {
      return (
        <table>
          <tbody>
            <tr>
              <td width="230" align="right">
                {tx("Number of Required Addresses")}:
              </td>
              <td width="250" align="right">
                <FInput
                  // type="text"
                  size="13"
                  // value="5"
                  // name="numofaddr"
                  type="number"
                  ap="ipt_required_address"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </td>
              <td>
                <FInput
                  // onclick="calcNeeded(this.form)"
                  onClick={() => {
                    fn_subnet_by_hosts(crtSubModel);
                  }}
                  type="button"
                  value={tx("Calculate")}
                />
                {/* <FInput
                  onclick="resetform6(this.form)"
                  type="button"
                  value={tx("Reset")}
                /> */}
              </td>
            </tr>
            <tr>
              <td width="130" align="left" colspan="2">
                <b>{tx("Calculate Result")}</b>
              </td>
              {/* rowspan="3" */}
              <td></td>
            </tr>
            <tr>
              <td align="right">{tx("Number of Mask Bits")}:</td>
              <td align="right">
                /
                <FInput
                  type="text"
                  readonly=""
                  size="2"
                  // name="bits"
                  ap="ipt_ip_bits"
                />
              </td>
            </tr>
            <tr>
              <td align="right">{tx("Subnet Mask Bits")}</td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_1"
                  ap="ipt_mask_bits_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_2"
                  ap="ipt_mask_bits_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_3"
                  ap="ipt_mask_bits_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="snm_4"
                  ap="ipt_mask_bits_4"
                />
              </td>
              <td align="left">
                <FInput
                  // onclick="calcNWmaskForm2(this.form)"
                  onClick={(e) => {
                    cutils.copy(
                      [
                        crtSubModel.ipt_mask_bits_1,
                        crtSubModel.ipt_mask_bits_2,
                        crtSubModel.ipt_mask_bits_3,
                        crtSubModel.ipt_mask_bits_4,
                      ].join("."),
                      e
                    );
                  }}
                  intent="success"
                  type="button"
                  value={tx("Copy")}
                />
              </td>
            </tr>
            <tr>
              <td width="230" align="right">
                {tx("Number of Available Addresses")}:
              </td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  size="10"
                  ap="ipt_available_addr"
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  },
  // 网络/节点计算器
  host_nodes_calculator({ PUtils, crtSubModel }) {
    let fn_calculateHostNodes = (crtSubModel) => {
      // 255 < crtSubModel.oct1a.value && (crtSubModel.oct1a.value = 255),
      //   255 < crtSubModel.oct2a.value && (crtSubModel.oct2a.value = 255),
      //   255 < crtSubModel.oct3a.value && (crtSubModel.oct3a.value = 255),
      //   255 < crtSubModel.oct4a.value && (crtSubModel.oct4a.value = 255),
      //   255 < crtSubModel.snm1a.value && (crtSubModel.snm1a.value = 255),
      //   255 < crtSubModel.snm2a.value && (crtSubModel.snm2a.value = 255),
      //   255 < crtSubModel.snm3a.value && (crtSubModel.snm3a.value = 255),
      //   255 < crtSubModel.snm4a.value && (crtSubModel.snm4a.value = 255),
      "1234".split("").map((x) => {
        crtSubModel[`ipt_netaddr_${x}`] = eval(
          parseInt(crtSubModel[`ipt_mask_bits_${x}`]) &
            parseInt(crtSubModel[`ipt_ip_${x}`])
        );
      });
      "1234".split("").map((x) => {
        crtSubModel[`ipt_nethost_${x}`] = eval(
          ~parseInt(crtSubModel[`ipt_mask_bits_${x}`]) &
            parseInt(crtSubModel[`ipt_ip_${x}`])
        );
      });
      "1234".split("").map((x) => {
        crtSubModel[`ipt_broadcast_${x}`] =
          parseInt(crtSubModel[`ipt_netaddr_${x}`]) ^
          (255 & ~parseInt(crtSubModel[`ipt_mask_bits_${x}`]));
      });
      gutils.alertOk(`Done.`);
    };
    return observer(() => {
      return (
        <table>
          <tbody>
            <tr>
              <td colspan="2">
                <b>{tx("Conditional Value")}</b>
              </td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td width="135" align="right">
                {tx("Subnet Mask Bits")}
              </td>
              <td align="right" width="250">
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_1"
                  ap="ipt_mask_bits_1"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_2"
                  ap="ipt_mask_bits_2"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_3"
                  ap="ipt_mask_bits_3"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_4"
                  ap="ipt_mask_bits_4"
                />
              </td>
              <td align="left">
                {/* <FInput
                  // onclick="calcNWmaskForm2(this.form)"
                  onClick={(e) => {
                    cutils.copy(
                      [
                        crtSubModel.ipt_mask_bits_1,
                        crtSubModel.ipt_mask_bits_2,
                        crtSubModel.ipt_mask_bits_3,
                        crtSubModel.ipt_mask_bits_4,
                      ].join("."),
                      e
                    );
                  }}
                  intent="success"
                  type="button"
                  value={tx("Copy")}
                /> */}
                <FInput
                  type="button"
                  value={tx("Calculate")}
                  onClick={() => {
                    fn_calculateHostNodes(crtSubModel);
                  }}
                  // onclick="compute(this.form)"
                />
              </td>
            </tr>
            <tr>
              <td align="right">TCP/IP {tx(`Address`)}:</td>
              <td align="right">
                <FInput
                  size="3"
                  maxlength="3"
                  ap="ipt_ip_1"
                  {...common_IP_rules}
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  size="3"
                  maxlength="3"
                  ap="ipt_ip_2"
                  {...common_IP_rules}
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  {...common_IP_rules}
                  size="3"
                  maxlength="3"
                  ap="ipt_ip_3"
                  spellcheck="false"
                  data-ms-editor="true"
                />
                <FInput
                  // type="text"
                  {...common_IP_rules}
                  size="3"
                  maxlength="3"
                  ap="ipt_ip_4"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td colspan="2">
                <b>{tx("Calculate Result")}</b>
              </td>
              <td rowspan="3"></td>
            </tr>
            <tr>
              <td align="right">{tx("Network")}</td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="nwadr_1"
                  {...common_IP_rules}
                  ap="ipt_netaddr_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  // name="nwadr_2"
                  {...common_IP_rules}
                  ap="ipt_netaddr_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="nwadr_3"
                  ap="ipt_netaddr_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="nwadr_4"
                  ap="ipt_netaddr_4"
                />
              </td>
            </tr>
            <tr>
              <td align="right">
                {tx("Nodes")}/{tx("Hosts")}:
              </td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  {...common_IP_rules}
                  size="3"
                  // name="nwadr_1"
                  ap="ipt_nethost_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  {...common_IP_rules}
                  size="3"
                  // name="nwadr_2"
                  ap="ipt_nethost_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  {...common_IP_rules}
                  size="3"
                  // name="nwadr_3"
                  ap="ipt_nethost_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  {...common_IP_rules}
                  size="3"
                  // name="nwadr_4"
                  ap="ipt_nethost_4"
                />
              </td>
            </tr>
            <tr>
              <td align="right">{tx("Broadcast Address")}:</td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="bcast_1"
                  ap="ipt_broadcast_1"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  ap="ipt_broadcast_2"
                  // name="bcast_2"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  ap="ipt_broadcast_3"
                  // name="bcast_3"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="bcast_4"
                  ap="ipt_broadcast_4"
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  },
  // 子网掩码换算器
  subnet_format_convertor({ PUtils, crtSubModel }) {
    return observer(() => {
      return (
        <table>
          <tbody>
            <tr>
              <td width="250" align="right">
                {tx("Subnet(Decimal) Mask Bits")}:
              </td>
              <td align="right">
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_1"
                  ap="ipt_mask_bits_1"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_2"
                  ap="ipt_mask_bits_2"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_3"
                  ap="ipt_mask_bits_3"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_4"
                  ap="ipt_mask_bits_4"
                />
              </td>
              <td width="100" align="left">
                <FInput
                  type="button"
                  value={tx("Calculate")}
                  // onclick="computeSNMA(this.form);"
                  onClick={() => {
                    let fn_calcSubNetMaskFormat = (crtSubModel) => {
                      let bits = 0;
                      bits += decimal2bits(crtSubModel.ipt_mask_bits_1);
                      bits += decimal2bits(crtSubModel.ipt_mask_bits_2);
                      bits += decimal2bits(crtSubModel.ipt_mask_bits_3);
                      bits += decimal2bits(crtSubModel.ipt_mask_bits_4);
                      crtSubModel.ipt_ip_bits = bits;
                      gutils.alertOk(`Done.`);
                    };
                    fn_calcSubNetMaskFormat(crtSubModel);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td align="right">{tx("Number of Mask Bits")}:</td>
              <td align="right">
                /
                <FInput
                  // type="text"
                  // name="snmbitsc"
                  ap="ipt_ip_bits"
                  size="2"
                  maxlength="2"
                  type="number"
                  min={0}
                  max={32}
                  // value="24"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </td>
              <td align="left">
                <FInput
                  type="button"
                  value={tx("Calculate")}
                  onClick={() => {
                    function fn_calcBitsToMask(crtSubModel) {
                      let bitValue = parseInt(crtSubModel.ipt_ip_bits);
                      crtSubModel.ipt_mask_bits_1 = bits2decimal(bitValue);
                      crtSubModel.ipt_mask_bits_2 = bits2decimal(bitValue - 8);
                      crtSubModel.ipt_mask_bits_3 = bits2decimal(bitValue - 16);
                      crtSubModel.ipt_mask_bits_4 = bits2decimal(bitValue - 24);
                      gutils.alertOk("Done.");
                    }
                    fn_calcBitsToMask(crtSubModel);
                  }}
                  // onclick="computeSNMB(this.form);"
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  },
  // IP地址子网掩码计算器
  // subnet_mask_calculator({ PUtils }) {
  //   return observer(() => {
  //     return (
  //       <table>
  //         <tbody>
  //           <tr>
  //             <td width="170" align="right">
  //               TCP/IP {tx(`Address`)}:
  //             </td>
  //             <td width="310" align="right">
  //               <FInput
  //                 type="text"
  //                 name="oct1"
  //                 size="3"
  //                 maxlength="3"
  //                 value="192"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               <FInput
  //                 type="text"
  //                 name="oct2"
  //                 size="3"
  //                 maxlength="3"
  //                 value="168"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               <FInput
  //                 type="text"
  //                 name="oct3"
  //                 size="3"
  //                 maxlength="3"
  //                 value="0"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               <FInput
  //                 type="text"
  //                 name="oct4"
  //                 size="3"
  //                 maxlength="3"
  //                 value="1"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //             </td>
  //             <td>
  //               <FInput
  //                 type="button"
  //                 value={tx(`Clean`)}
  //                 onclick="ClearAll(this.form);"
  //               />
  //             </td>
  //           </tr>
  //           <tr>
  //             <td align="right">{tx("Choose Network Type")}:</td>
  //             <td align="right">
  //               <RadioGroup>
  //                 <FInput
  //                   label={tx("Default")}
  //                   id="cf-1"
  //                   type="radio"
  //                   value="1"
  //                   name="cf"
  //                   checked=""
  //                 />
  //                 <FInput
  //                   label={tx(`A Class`)}
  //                   id="cf-2"
  //                   type="radio"
  //                   value="2"
  //                   name="cf"
  //                 />
  //                 <FInput
  //                   label={tx(`B Class`)}
  //                   id="cf-3"
  //                   type="radio"
  //                   value="3"
  //                   name="cf"
  //                 />
  //                 <FInput
  //                   label={tx(`C Class`)}
  //                   id="cf-4"
  //                   type="radio"
  //                   value="4"
  //                   name="cf"
  //                 />
  //               </RadioGroup>
  //             </td>
  //             <td></td>
  //           </tr>
  //           <tr>
  //             <td align="right">
  //               {t("Select the number of IP in the subnet")}:
  //             </td>
  //             <td align="right">
  //               <select name="network" size="1" onchange="EmptyHosts();">
  //                 <option value="0"></option>
  //                 <option value="1">1</option>
  //                 <option value="2">2</option>
  //                 <option value="4">4</option>
  //                 <option value="8">8</option>
  //                 <option value="16">16</option>
  //                 <option value="32">32</option>
  //                 <option value="64">64</option>
  //                 <option value="128">128</option>
  //                 <option value="256">256</option>
  //                 <option value="512">512</option>
  //                 <option value="1024">1024</option>
  //                 <option value="2048">2048</option>
  //                 <option value="4096">4096</option>
  //                 <option value="8192">8192</option>
  //                 <option value="16384">16384</option>
  //                 <option value="32768">32768</option>
  //                 <option value="65536">65536</option>
  //                 <option value="131072">131072</option>
  //                 <option value="262144">262144</option>
  //                 <option value="524288">524288</option>
  //                 <option value="1048576">1048576</option>
  //                 <option value="2097152">2097152</option>
  //                 <option value="4194304">4194304</option>
  //                 <option value="8388608">8388608</option>
  //               </select>
  //             </td>
  //             <td></td>
  //           </tr>
  //           <tr>
  //             <td width="380" align="right">
  //               {tx(
  //                 "Or Specify the number of Nodes/Hosts required per network"
  //               )}
  //               {/* 或 选择每个网络所需的
  //               <br />
  //               节点/主机数(含广播地址): */}
  //             </td>
  //             <td align="right">
  //               <select name="node" size="1" onchange="EmptyNetwork()">
  //                 <option value="0"></option>
  //                 <option value="1">1</option>
  //                 <option value="2">2</option>
  //                 <option value="4">4</option>
  //                 <option value="8">8</option>
  //                 <option value="16">16</option>
  //                 <option value="32">32</option>
  //                 <option value="64">64</option>
  //                 <option value="128">128</option>
  //                 <option value="256">256</option>
  //                 <option value="512">512</option>
  //                 <option value="1024">1024</option>
  //                 <option value="2048">2048</option>
  //                 <option value="4096">4096</option>
  //                 <option value="8192">8192</option>
  //                 <option value="16384">16384</option>
  //                 <option value="32768">32768</option>
  //                 <option value="65536">65536</option>
  //                 <option value="131072">131072</option>
  //                 <option value="262144">262144</option>
  //                 <option value="524288">524288</option>
  //                 <option value="1048576">1048576</option>
  //                 <option value="2097152">2097152</option>
  //                 <option value="4194304">4194304</option>
  //                 <option value="8388608">8388608</option>
  //                 <option value="16777216">16777216</option>
  //                 <option value="33554432">33554432</option>
  //                 <option value="67108864">67108864</option>
  //                 <option value="134217728">134217728</option>
  //                 <option value="268435456">268435456</option>
  //                 <option value="536870912">536870912</option>
  //                 <option value="1073741824">1073741824</option>
  //                 <option value="2147483648">2147483648</option>
  //               </select>
  //             </td>
  //             <td>
  //               <FInput
  //                 type="button"
  //                 value={tx(`Calculate`)}
  //                 onclick="compute2(this.form);"
  //               />
  //             </td>
  //           </tr>
  //           <tr>
  //             <td align="right">{tx(`Network Type`)}:</td>
  //             <td align="right">
  //               <FInput
  //                 type="text"
  //                 name="nwclass"
  //                 size="7"
  //                 maxlength="7"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               <FInput
  //                 type="text"
  //                 name="subsuper"
  //                 size="14"
  //                 maxlength="14"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               <FInput
  //                 type="text"
  //                 name="nwclass1"
  //                 size="7"
  //                 maxlength="7"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //             </td>
  //             <td></td>
  //           </tr>
  //           <tr>
  //             <td align="right">{tx(`Subnet Mask Bits`)}:</td>
  //             <td align="right">
  //               <FInput
  //                 type="text"
  //                 name="snm1"
  //                 size="3"
  //                 maxlength="3"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               <FInput
  //                 type="text"
  //                 name="snm2"
  //                 size="3"
  //                 maxlength="3"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               <FInput
  //                 type="text"
  //                 name="snm3"
  //                 size="3"
  //                 maxlength="3"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               <FInput
  //                 type="text"
  //                 name="snm4"
  //                 size="3"
  //                 maxlength="3"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //               {tx("OR")}
  //               <FInput
  //                 type="text"
  //                 name="snmbits"
  //                 size="3"
  //                 maxlength="3"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //             </td>
  //             <td></td>
  //           </tr>
  //           <tr>
  //             <td align="right">{tx(`Subnet`)}:</td>
  //             <td align="right">
  //               <FInput
  //                 type="text"
  //                 name="nwquant"
  //                 size="10"
  //                 maxlength="8"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //             </td>
  //             <td>
  //               <FInput
  //                 type="button"
  //                 value={tx(`Network Listings`)}
  //                 onclick="listsubnets(this.form);"
  //               />
  //             </td>
  //           </tr>
  //           <tr>
  //             <td align="right">
  //               {/* 每个网络的节点/主机数 */}
  //               {tx(`Number of Nodes or Hosts per network`)}
  //               <br />({tx(`Includes Network and Broadcast Addresses`)})
  //               {/* (含网络和广播地址)***: */}:
  //             </td>
  //             <td align="right">
  //               <FInput
  //                 type="text"
  //                 name="nodequant"
  //                 size="10"
  //                 maxlength="8"
  //                 spellcheck="false"
  //                 data-ms-editor="true"
  //               />
  //             </td>
  //             <td></td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     );
  //   });
  // },
  // 子网掩码逆算器
  subnet_mask_inversion({ PUtils, crtSubModel }) {
    return observer(() => {
      return (
        <table>
          <tbody>
            <tr>
              <td colspan="2">
                <b>{tx("Conditional Value")}</b>
              </td>
              <td rowspan="1"></td>
            </tr>
            <tr>
              <td align="right" width="150">
                {tx("Mask Bits")}
              </td>
              <td width="250" align="right">
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_1"
                  ap="ipt_mask_bits_1"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_2"
                  ap="ipt_mask_bits_2"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_3"
                  ap="ipt_mask_bits_3"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_4"
                  ap="ipt_mask_bits_4"
                />
              </td>
              <td>
                <FInput
                  type="button"
                  value={tx("Calculate")}
                  // onclick="computeINV1(this.form);"
                  onClick={() => {
                    function fn_computeInversion(crtSubModel) {
                      `1234`.split("").map((x) => {
                        crtSubModel[`ipt_mask_bits_${x}_r`] =
                          255 & ~parseInt(crtSubModel[`ipt_mask_bits_${x}`]);
                      });
                    }
                    fn_computeInversion(crtSubModel);
                    //
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <b>{tx("Calculate Result")}</b>
              </td>
              <td rowspan="1"></td>
            </tr>
            <tr>
              <td></td>
              <td align="right">
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_1"
                  ap="ipt_mask_bits_1_r"
                />
                <FInput
                  readonly=""
                  type="text"
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_2"
                  ap="ipt_mask_bits_2_r"
                />
                <FInput
                  type="text"
                  readonly=""
                  maxlength="3"
                  size="3"
                  {...common_IP_rules}
                  // name="snm_3"
                  ap="ipt_mask_bits_3_r"
                />
                <FInput
                  type="text"
                  maxlength="3"
                  size="3"
                  readonly=""
                  {...common_IP_rules}
                  // name="snm_4"
                  ap="ipt_mask_bits_4_r"
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  },
};

export default jsx_ipv_ref;

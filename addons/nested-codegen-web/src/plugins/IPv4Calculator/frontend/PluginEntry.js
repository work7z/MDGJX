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
import PreRequisiteJson from "../pre-requisite.json";
import FormEasyTable from "../../TranslateForJSON/frontend/cpt/FormEasyTable";
import FormEditorWithAction from "../../TranslateForJSON/frontend/cpt/FormEditorWithAction";
import fn_otherPages from "../../TranslateForJSON/frontend/pages/otherPages";
import FormLabelTextInput from "../../TranslateForJSON/frontend/cpt/FormLabelTextInput";
import myfileLess from "./myfile.less";
import FormCrudTable from "../../TranslateForJSON/frontend/cpt/FormCrudTable";
import cutils from "../../TranslateForJSON/frontend/kit/common_utils";
import jsx_ipv_ref from "./cpts/jsx_ipv_ref";
import common_context from "../../TranslateForJSON/frontend/kit/common_context";

let metaObj = {
  appId: "ROOT_EXTENSION_ADDONS",
  appName: "ROOT_EXTENSION_ADDONS",
};
let appTitle = "IPv4 Utilities";
// IPv6 Calculator

let subMenuTitle = [
  // {
  //   noCopyActions: true,
  //   id: "ipv6_calculator",
  //   title: t(`IPv6 Calculator`),
  //   jsx: jsx_ipv_ref.jsx_ipv6_calculator,
  // },
  {
    id: "ipv4_detail",
    title: `IPv4 Network Calculator`,
    jsx: jsx_ipv_ref.jsx_ipv4_network,
  },
  {
    id: "ipv4_addr",
    title: `IPv4 Address Convertor`,
    jsx: jsx_ipv_ref.jsx_ipv4_addr,
  },
  {
    id: "get_subnet_mask_by_bits",
    title: `Get Subnet Mask by Netmask Bits`,
    jsx: jsx_ipv_ref.get_subnet_mask_by_bits,
  },
  {
    id: "convert_subnet_mask",
    title: `Convert Subnet Mask by Netmask Bits`,
    jsx: jsx_ipv_ref.convert_subnet_mask,
  },
  {
    id: "get_subnet_mask_by_host",
    title: `Get Subnet Mask via the Number of Host`,
    jsx: jsx_ipv_ref.get_subnet_mask_by_host,
  },
  {
    title: `Nodes/Hosts Calculator`,
    id: "host_nodes_calculator",
    jsx: jsx_ipv_ref.host_nodes_calculator,
  },
  {
    id: "subnet_format_convertor",
    title: `Subnet Mask Convertor`,
    jsx: jsx_ipv_ref.subnet_format_convertor,
  },
  // {
  //   id: "subnet_mask_calculator",
  //   title: t(`Subnet Mask Calculator`),
  //   jsx: jsx_ipv_ref.subnet_mask_calculator,
  // },
  {
    id: "subnet_mask_inversion",
    title: `Subnet Mask Inversion`,
    jsx: jsx_ipv_ref.subnet_mask_inversion,
  },
];

if (!gutils.dev()) {
  subMenuTitle = _.sortBy(subMenuTitle, (x) => t(x["title"]));
}
subMenuTitle = _.map(subMenuTitle, (x) => {
  return {
    ...x,
    href: "/exts/ROOT_EXTENSION_ADDONS?type=detail&id=" + x.id,
  };
});
let m_children = [
  {
    label: appTitle,
    icon: "application",
    id: "ROOT_EXTENSION_ADDONS_root",
    pid: "ROOT_EXTENSION_ADDONS",
  },
  ...subMenuTitle.map((x) => {
    return {
      label: x.title,
      icon: "application",
      id: x.id,
      pathname: x.href,
      pid: "ROOT_EXTENSION_ADDONS_" + x.id,
    };
  }),
];
window.tmp_m_children = m_children;
window.ExtensionDefinition["ROOT_EXTENSION_ADDONS"] = (gref) => {
  return {
    unlimited_view_mode: true,
    initialState: async () => {
      let fn_get_subnet_mask_by_host = () => {
        return {
          ipt_required_address: "1000",
          ipt_available_addr: "",
          ipt_mask_bits_1: "",
          ipt_mask_bits_2: "",
          ipt_mask_bits_3: "",
          ipt_mask_bits_4: "",
        };
      };
      let fn_convert_subnet_mask = () => {
        return {
          ipt_available_addr: "",
          ipt_ip_bits: "24",
          ipt_mask_bits_1: "",
          ipt_mask_bits_2: "",
          ipt_mask_bits_3: "",
          ipt_mask_bits_4: "",
          ipt_maximum_addresses: "",
        };
      };
      let fn_ipv4_detail = () => {
        return {
          ipt_ip_1: "192",
          ipt_ip_2: "168",
          ipt_ip_3: "2",
          ipt_ip_4: "1",
          ipt_ip_bits: "24",
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
        };
      };
      let fn_ipv4_addr = () => {
        return {
          ip_1: "192",
          ip_2: "168",
          ip_3: "2",
          ip_4: "1",
          bin_1: "",
          bin_2: "",
          bin_3: "",
          bin_4: "",
          hex_1: "",
          hex_2: "",
          hex_3: "",
          hex_4: "",
          dec: "",
        };
      };
      let fn_get_subnet_mask_by_bits = () => {
        return {
          ipt_ip_bits: "24",
          ipt_mask_bits_1: "",
          ipt_mask_bits_2: "",
          ipt_mask_bits_3: "",
          ipt_mask_bits_4: "",
          ipt_mask_bits_hex_1: "",
          ipt_mask_bits_hex_2: "",
          ipt_mask_bits_hex_3: "",
          ipt_mask_bits_hex_4: "",
        };
      };
      let fn_host_nodes_calculator = () => {
        return {
          ipt_ip_1: "192",
          ipt_ip_2: "168",
          ipt_ip_3: "2",
          ipt_ip_4: "1",
          ipt_broadcast_1: "",
          ipt_broadcast_2: "",
          ipt_broadcast_3: "",
          ipt_broadcast_4: "",
          ipt_netaddr_1: "",
          ipt_netaddr_2: "",
          ipt_netaddr_3: "",
          ipt_netaddr_4: "",
          ipt_nethost_1: "",
          ipt_nethost_2: "",
          ipt_nethost_3: "",
          ipt_nethost_4: "",
          ipt_mask_bits_1: "255",
          ipt_mask_bits_2: "255",
          ipt_mask_bits_3: "255",
          ipt_mask_bits_4: "0",
        };
      };
      let fn_subnet_format_convertor = () => {
        return {
          ipt_ip_bits: "",
          ipt_mask_bits_1: "255",
          ipt_mask_bits_2: "255",
          ipt_mask_bits_3: "255",
          ipt_mask_bits_4: "0",
        };
      };
      let fn_subnet_mask_inversion = () => {
        return {
          ipt_mask_bits_1: "255",
          ipt_mask_bits_2: "255",
          ipt_mask_bits_3: "255",
          ipt_mask_bits_4: "0",
          ipt_mask_bits_1_r: "",
          ipt_mask_bits_2_r: "",
          ipt_mask_bits_3_r: "",
          ipt_mask_bits_4_r: "",
        };
      };
      return {
        // subnet_mask_inversion: fn_subnet_mask_inversion(),
        // fn_subnet_mask_inversion:fn_subnet_mask_inversion,
        fn_subnet_format_convertor: fn_subnet_format_convertor,
        subnet_mask_inversion: fn_subnet_mask_inversion(),
        fn_subnet_mask_inversion: fn_subnet_mask_inversion,
        subnet_format_convertor: fn_subnet_format_convertor(),
        fn_host_nodes_calculator: fn_host_nodes_calculator,
        host_nodes_calculator: fn_host_nodes_calculator(),
        fn_get_subnet_mask_by_host: fn_get_subnet_mask_by_host,
        get_subnet_mask_by_host: fn_get_subnet_mask_by_host(),
        convert_subnet_mask: fn_convert_subnet_mask(),
        fn_convert_subnet_mask: fn_convert_subnet_mask,
        get_subnet_mask_by_bits: fn_get_subnet_mask_by_bits(),
        fn_get_subnet_mask_by_bits: fn_get_subnet_mask_by_bits,
        ipv4_addr: fn_ipv4_addr(),
        fn_ipv4_addr: fn_ipv4_addr,
        fn_ipv4_detail: fn_ipv4_detail,
        ipv4_detail: fn_ipv4_detail(),
      };
    },
    menus: [
      {
        ...fn_otherPages.menu.getNetwork(),
        children: [
          {
            ...fn_otherPages.menu.getInternetLayer(),
            children: m_children,
          },
        ],
      },
    ],
    render: fn_otherPages.withPluginPage(
      PreRequisiteJson,
      {
        appId: metaObj.appName,
        fn_appName: () => {
          return metaObj.appId;
        },
      },
      fn_otherPages.rightMainPageJsx({
        totalTitle: appTitle,
        left_hist_use_all: true,
        noOptions: true,
        fn_afterConfigItem({ PUtils }) {
          return [];
        },
        jsx: observer((props) => {
          let { PUtils } = props;
          let { crtModel } = PUtils;
          PUtils.makeLeftHide();
          let URLParams = PUtils.getURLParams();
          if (URLParams.type == "detail") {
            let findItem = _.find(subMenuTitle, (x) => x.id == URLParams.id);
            if (_.isNil(findItem)) {
              return cutils.jsx_404_not_found();
            } else {
              return (
                <common_context.IPv4FormContext.Provider
                  value={{
                    PUtils: PUtils,
                    funcModel: PUtils.crtModel[URLParams.id],
                    funcID: URLParams.id,
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      margin: "0 auto",
                    }}
                  >
                    <h1
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {t(findItem.title)}
                    </h1>
                    <p style={{ marginBottom: "8px" }}>
                      <div
                        style={{
                          marginBottom: "9px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h3 style={{ margin: "0" }}>
                          {t(`Main Functional Panel`)}
                        </h3>
                        <div className="sub-ml-5">
                          {findItem.noCopyActions
                            ? []
                            : [
                                <Button
                                  small={true}
                                  intent={"success"}
                                  onClick={(e) => {
                                    let finValue = "";
                                    let tmp_crt_model =
                                      PUtils.crtModel[URLParams.id];
                                    let crtSubModel = tmp_crt_model;
                                    switch (URLParams.id) {
                                      case "subnet_mask_inversion":
                                        finValue = [
                                          t(`Mask Bits`) +
                                            ": " +
                                            [
                                              crtSubModel.ipt_mask_bits_1,
                                              crtSubModel.ipt_mask_bits_2,
                                              crtSubModel.ipt_mask_bits_3,
                                              crtSubModel.ipt_mask_bits_4,
                                            ].join("."),
                                          t(`Calculate Result`) +
                                            ": " +
                                            [
                                              crtSubModel.ipt_mask_bits_1_r,
                                              crtSubModel.ipt_mask_bits_2_r,
                                              crtSubModel.ipt_mask_bits_3_r,
                                              crtSubModel.ipt_mask_bits_4_r,
                                            ].join("."),
                                        ].join("\n");
                                        break;
                                      case "subnet_format_convertor":
                                        finValue = [
                                          t(`Subnet(Decimal) Mask Bits`) +
                                            ": " +
                                            [
                                              crtSubModel.ipt_mask_bits_1,
                                              crtSubModel.ipt_mask_bits_2,
                                              crtSubModel.ipt_mask_bits_3,
                                              crtSubModel.ipt_mask_bits_4,
                                            ].join("."),
                                          t(`Number of Mask Bits`) +
                                            ": " +
                                            [crtSubModel.ipt_ip_bits].join("."),
                                        ].join("\n");
                                        break;
                                      case "host_nodes_calculator":
                                        finValue = [
                                          t(`Subnet Mask Bits`) +
                                            ": " +
                                            [
                                              crtSubModel.ipt_mask_bits_1,
                                              crtSubModel.ipt_mask_bits_2,
                                              crtSubModel.ipt_mask_bits_3,
                                              crtSubModel.ipt_mask_bits_4,
                                            ].join("."),
                                          `TCP/IP ${t(`Address`)}: ` +
                                            [
                                              crtSubModel.ipt_ip_1,
                                              crtSubModel.ipt_ip_2,
                                              crtSubModel.ipt_ip_3,
                                              crtSubModel.ipt_ip_4,
                                            ].join("."),
                                          `${t(`Network`)}: ` +
                                            [
                                              crtSubModel.ipt_netaddr_1,
                                              crtSubModel.ipt_netaddr_2,
                                              crtSubModel.ipt_netaddr_3,
                                              crtSubModel.ipt_netaddr_4,
                                            ].join("."),
                                          `${t(`Nodes`)}/${t(`Hosts`)}: ` +
                                            [
                                              crtSubModel.ipt_nethost_1,
                                              crtSubModel.ipt_nethost_2,
                                              crtSubModel.ipt_nethost_3,
                                              crtSubModel.ipt_nethost_4,
                                            ].join("."),
                                          `${t(`Broadcast Address`)}: ` +
                                            [
                                              crtSubModel.ipt_broadcast_1,
                                              crtSubModel.ipt_broadcast_2,
                                              crtSubModel.ipt_broadcast_3,
                                              crtSubModel.ipt_broadcast_4,
                                            ].join("."),
                                        ].join("\n");
                                        break;
                                      case "get_subnet_mask_by_host":
                                        finValue = [
                                          t("Number of Required Addresses") +
                                            ": " +
                                            crtSubModel.ipt_required_address,
                                          t("Number of Mask Bits") +
                                            ": " +
                                            crtSubModel.ipt_ip_bits,
                                          t("Subnet Mask Bits") +
                                            ": " +
                                            [
                                              crtSubModel.ipt_mask_bits_1,
                                              crtSubModel.ipt_mask_bits_2,
                                              crtSubModel.ipt_mask_bits_3,
                                              crtSubModel.ipt_mask_bits_4,
                                            ].join("."),
                                          t(`Number of Available Addresses`) +
                                            ": " +
                                            crtSubModel.ipt_available_addr,
                                        ].join("\n");
                                        break;
                                      case "get_subnet_mask_by_bits":
                                        finValue = [
                                          t("Number of Netmask Bits") +
                                            ": " +
                                            crtSubModel.ipt_ip_bits,
                                          t("Subnet(Decimal) Mask Bits") +
                                            ": " +
                                            [
                                              crtSubModel.ipt_mask_bits_1,
                                              crtSubModel.ipt_mask_bits_2,
                                              crtSubModel.ipt_mask_bits_3,
                                              crtSubModel.ipt_mask_bits_4,
                                            ].join("."),
                                          t("Subnet(Hexadecimal) Mask Bits") +
                                            ": " +
                                            [
                                              crtSubModel.ipt_mask_bits_hex_1,
                                              crtSubModel.ipt_mask_bits_hex_2,
                                              crtSubModel.ipt_mask_bits_hex_3,
                                              crtSubModel.ipt_mask_bits_hex_4,
                                            ].join("."),
                                        ].join("\n");
                                        break;
                                      case "ipv4_addr":
                                        finValue = [
                                          `${t("Decimal(10)")} TCP/IP ${t(
                                            `Address`
                                          )}` +
                                            ":" +
                                            [
                                              crtSubModel.ip_1,
                                              crtSubModel.ip_2,
                                              crtSubModel.ip_3,
                                              crtSubModel.ip_4,
                                            ].join("."),
                                          `${t(`Binary(2)`)} TCP/IP ${t(
                                            `Address`
                                          )}:` +
                                            [
                                              crtSubModel.bin_1,
                                              crtSubModel.bin_2,
                                              crtSubModel.bin_3,
                                              crtSubModel.bin_4,
                                            ].join("."),
                                          `${t(`Hexadecimal(16)`)} TCP/IP ${t(
                                            `Address`
                                          )}:` +
                                            [
                                              crtSubModel.hex_1,
                                              crtSubModel.hex_2,
                                              crtSubModel.hex_3,
                                              crtSubModel.hex_4,
                                            ].join("."),
                                          `${t(`Decimal(10)`)} TCP/IP ${t(
                                            `Address`
                                          )}:` + crtSubModel.dec,
                                        ].join("\n");
                                        break;
                                      case "ipv4_detail":
                                        finValue = [
                                          t(`IP Address`) +
                                            ": " +
                                            `${[
                                              tmp_crt_model.ipt_ip_1,
                                              tmp_crt_model.ipt_ip_2,
                                              tmp_crt_model.ipt_ip_3,
                                              tmp_crt_model.ipt_ip_4,
                                            ].join(".")}${
                                              !_.isEmpty(
                                                tmp_crt_model.ipt_ip_bits
                                              )
                                                ? "/" +
                                                  tmp_crt_model.ipt_ip_bits
                                                : ""
                                            }`,
                                          t(`Number of Available Addresses`) +
                                            ": " +
                                            [
                                              tmp_crt_model.ipt_available_addr,
                                            ].join("."),
                                          t(`Network Mask`) +
                                            ": " +
                                            [
                                              tmp_crt_model.ipt_mask_bits_1,
                                              tmp_crt_model.ipt_mask_bits_2,
                                              tmp_crt_model.ipt_mask_bits_3,
                                              tmp_crt_model.ipt_mask_bits_4,
                                            ].join("."),
                                          t(`Network`) +
                                            ": " +
                                            [
                                              tmp_crt_model.ipt_netaddr_1,
                                              tmp_crt_model.ipt_netaddr_2,
                                              tmp_crt_model.ipt_netaddr_3,
                                              tmp_crt_model.ipt_netaddr_4,
                                            ].join("."),
                                          t(`First Available Address`) +
                                            ": " +
                                            [
                                              tmp_crt_model.ipt_first_avaliable_1,
                                              tmp_crt_model.ipt_first_avaliable_2,
                                              tmp_crt_model.ipt_first_avaliable_3,
                                              tmp_crt_model.ipt_first_avaliable_4,
                                            ].join("."),
                                          t(`Last Available Address`) +
                                            ": " +
                                            [
                                              tmp_crt_model.ipt_last_addr_1,
                                              tmp_crt_model.ipt_last_addr_2,
                                              tmp_crt_model.ipt_last_addr_3,
                                              tmp_crt_model.ipt_last_addr_4,
                                            ].join("."),
                                          t(`Broadcast`) +
                                            ": " +
                                            [
                                              tmp_crt_model.ipt_broadcast_1,
                                              tmp_crt_model.ipt_broadcast_2,
                                              tmp_crt_model.ipt_broadcast_3,
                                              tmp_crt_model.ipt_broadcast_4,
                                            ].join("."),
                                        ].join("\n");
                                        break;
                                    }
                                    cutils.copy(finValue, e);
                                  }}
                                  text={t(`Copy as Text`)}
                                ></Button>,
                                <Button
                                  small={true}
                                  intent={"success"}
                                  onClick={(e) => {
                                    let obj = PUtils.crtModel[URLParams.id];
                                    cutils.copy(JSON.stringify(obj, 0, 4), e);
                                  }}
                                  text={t(`Copy as JSON`)}
                                ></Button>,
                              ]}
                          <Button
                            small={true}
                            intent={"none"}
                            onClick={() => {
                              _.merge(PUtils.crtModel[URLParams.id], {
                                ...PUtils.crtModel["fn_" + URLParams.id](),
                              });
                              gutils.alertOk("Done.");
                            }}
                            text={t(`Reset Form`)}
                          ></Button>
                        </div>
                      </div>
                      <Card
                        style={{
                          padding: "20px",
                          margin: 0,
                          minHeight: "350px",
                        }}
                        className="each-ipv-container"
                      >
                        {React.createElement(
                          findItem.jsx
                            ? findItem.jsx({
                                PUtils,
                                crtSubModel: PUtils.crtModel[URLParams.id],
                              })
                            : (props) => t(`Not yet implemented.`)
                        )}
                      </Card>
                    </p>
                    <p>
                      <h3 style={{ marginBottom: "6px" }}>
                        {t("Other Tools")}
                      </h3>
                      <p className="sub-mr-5 sub-mb-5">
                        {subMenuTitle.map((x, d, n) => {
                          return (
                            <Link
                              to={x.href}
                              className={
                                cutils.clz.bp3button_small +
                                ` ${
                                  URLParams.id == x.id
                                    ? "bp3-intent-primary"
                                    : ""
                                } `
                              }
                              small={true}
                              minimal={true}
                              text={t(x.title)}
                              outlined={true}
                              outline={true}
                              onClick={() => {
                                //
                              }}
                            >
                              {t(x.title)}
                            </Link>
                          );
                        })}{" "}
                      </p>
                    </p>
                  </div>
                </common_context.IPv4FormContext.Provider>
              );
            }
          }

          return (
            <div
              style={{
                margin: "0 auto",
                width: "80%",
              }}
              className={myfileLess["ipv4-calc-wrapper"]}
            >
              <h1 style={{ textAlign: "center" }}>
                {t(`Navigator for IPv4 Utilities`)}
              </h1>
              {subMenuTitle.map((x, d, n) => {
                return (
                  <div
                    key={x.title}
                    style={{ textAlign: "center", marginBottom: "8px" }}
                    className={myfileLess["each-function"]}
                  >
                    <Link
                      to={x.href}
                      className={cutils.clz.bp3button}
                      large={true}
                      minimal={true}
                      text={t(x.title)}
                      outlined={true}
                      outline={true}
                      onClick={() => {
                        //
                      }}
                    >
                      {t(x.title)}
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        }),
      })
    ),
  };
};

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
  Radio,
  ButtonGroup,
  TextArea,
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
import { Example,  } from "@blueprintjs/docs-theme";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React from "react";
import ReactDOM from "react-dom";
import gutils from "../utils";
import { useState } from "react";
import { Resizable } from "re-resizable";

import { Provider, observer, inject ,useLocalStore} from "mobx-react";
// var createHistory = require("history").createBrowserHistory;
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { autorun, observable }  from 'mobx';
import gstore from "../store.jsx";
import LoadingPage from "../routes/loading/index";
import MainPage from "../routes/main/index";
import "../index.less";
import _ from "lodash";
window.allPluginsObj = {};
let updateAndCall = () => {
  gstore.ext.sub_menu = window.allPluginsObj;
  gstore.sysinfo.updateMenuCount++;
};
window.updateAndCall = updateAndCall;

window.allExtMenuAndState = {};

const myapi = {
  initAllPlugins() {
    let init_refresh_function = async () => {
      // if (_.isNil(window.before_roadmap)) {
      //   window.before_roadmap = _.cloneDeep(gstore.roadmap.get());
      // } else {
      //   gstore.overwrite_roadmap = _.cloneDeep(window.before_roadmap);
      // }
      try {
        let {
          content: { menu },
        } = {
    "content": {
        "menu": {
            "BizJSONToCode": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "BizJSONToCode",
                                        "label": "JSON to Model"
                                    }
                                ],
                                "icon": "series-configuration",
                                "pid": "dto",
                                "label": "Data Transfer Layer"
                            }
                        ],
                        "icon": "oil-field",
                        "pid": "gen",
                        "label": "Code Generator"
                    }
                ]
            },
            "TextRandomMock": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "social-media",
                                        "pid": "TextRandomMock",
                                        "label": "Mock"
                                    }
                                ],
                                "pid": "random",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "LoremC": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "LoremC",
                                        "label": "Lorem Ipsum"
                                    }
                                ],
                                "icon": "diagram-tree",
                                "pid": "mock_data_tools",
                                "label": "Mock Data Tools"
                            }
                        ],
                        "icon": "cycle",
                        "pid": "train_ground",
                        "label": "Training Ground"
                    }
                ]
            },
            "TextASCIITools200": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "font",
                                        "pid": "TextASCIITools200",
                                        "label": "ASCII <-> Text"
                                    }
                                ],
                                "pid": "textcase",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "SymPBEWithSHA1AndRC240": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymPBEWithSHA1AndRC240",
                                        "label": "PBE Algorithm With SHA1 And RC2"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "TextHelperFilter": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "filter-list",
                                        "pid": "TextHelperFilter",
                                        "label": "Text Filter"
                                    }
                                ],
                                "icon": "paragraph",
                                "pid": "plaintext",
                                "label": "PlainText Helper"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "JWTDecoder": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "JWTDecoder",
                                        "label": "JWT Token Decoder"
                                    }
                                ],
                                "icon": "shield",
                                "pid": "web_token",
                                "label": "Web Auth"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "EncryptSM2": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "EncryptSM2",
                                        "label": "Asymmetric Encryption(SM2)"
                                    }
                                ],
                                "icon": "lock",
                                "pid": "national_commercial_algorithm",
                                "label": "National Commercial Algorithm"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "EncryptSM3": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "EncryptSM3",
                                        "label": "Message Digest(SM3)"
                                    }
                                ],
                                "icon": "lock",
                                "pid": "national_commercial_algorithm",
                                "label": "National Commercial Algorithm"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "EncryptSM4": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "EncryptSM4",
                                        "label": "Symmetric Encryption(SM4)"
                                    }
                                ],
                                "icon": "lock",
                                "pid": "national_commercial_algorithm",
                                "label": "National Commercial Algorithm"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "TextHanTools200": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "citation",
                                        "pid": "TextHanTools200",
                                        "label": "Chinese Han Tools"
                                    }
                                ],
                                "pid": "textcase",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "SymPBEWithMD5AndDES": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymPBEWithMD5AndDES",
                                        "label": "PBE Algorithm With MD5 And DES"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "JSONProbe": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "geosearch",
                                        "pid": "JSONProbe",
                                        "label": "JSON Prober"
                                    }
                                ],
                                "pid": "jsonhelper",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "Caniuse": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "Caniuse",
                                        "label": "Front-End Compatibility Checker"
                                    }
                                ],
                                "icon": "buggy",
                                "pid": "frontend_tools",
                                "label": "Front-End Tools"
                            }
                        ],
                        "icon": "hat",
                        "pid": "doc_centre",
                        "label": "Docs Center"
                    }
                ]
            },
            "WebWorld": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "WebWorld_html",
                                        "label": "HTML Previewer",
                                        "id": "html",
                                        "pathname": "/exts/WebWorld?type=detail&id=html"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "WebWorld_less_to_css",
                                        "label": "LESS to CSS",
                                        "id": "less_to_css",
                                        "pathname": "/exts/WebWorld?type=detail&id=less_to_css"
                                    }
                                ],
                                "icon": "crown",
                                "pid": "web_world_menu",
                                "label": "Web World"
                            }
                        ],
                        "icon": "cycle",
                        "pid": "train_ground",
                        "label": "Training Ground"
                    }
                ]
            },
            "TextHelperShuffle": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "stacked-chart",
                                        "pid": "TextHelperShuffle",
                                        "label": "Text Shuffler"
                                    }
                                ],
                                "icon": "paragraph",
                                "pid": "plaintext",
                                "label": "PlainText Helper"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "JSONFlattenDeep": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "flow-branch",
                                        "pid": "JSONFlattenDeep",
                                        "label": "JSON Flattener"
                                    }
                                ],
                                "pid": "jsonhelper",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "TextHelperSorter": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "sort-alphabetical",
                                        "pid": "TextHelperSorter",
                                        "label": "Text Sorter"
                                    }
                                ],
                                "icon": "paragraph",
                                "pid": "plaintext",
                                "label": "PlainText Helper"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "DateCalcTool100": {
                "arr": [
                    {
                        "children": [
                            {
                                "icon": "route",
                                "pid": "DateCalcTool100",
                                "label": "Date Interval Calculator"
                            }
                        ],
                        "pid": "time"
                    }
                ]
            },
            "Base32": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "skipT": true,
                                        "pid": "Base32",
                                        "label": "Base32"
                                    }
                                ],
                                "pid": "encode",
                                "label": null
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "Base64Previewer": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "Base64Previewer",
                                        "label": "Base64 Previewer"
                                    }
                                ],
                                "icon": "inherited-group",
                                "pid": "graphic_formats",
                                "label": "Graphic Formats"
                            }
                        ],
                        "pid": "color"
                    }
                ]
            },
            "TextHexConverter": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "TextHexConverter",
                                        "label": "Hex Digits"
                                    }
                                ],
                                "pid": "encode",
                                "label": null
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "Cool": {
                "arr": []
            },
            "UnicodeConversion": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "UnicodeConversion",
                                        "label": "Unicode Codec"
                                    }
                                ],
                                "pid": "encode",
                                "label": null
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "XMLXPath": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "oil-field",
                                        "pid": "XMLXPath",
                                        "label": "XML XPath"
                                    }
                                ],
                                "pid": "xmlhelper",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "JSONXPath": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "oil-field",
                                        "pid": "JSONXPath",
                                        "label": "JSON XPath"
                                    }
                                ],
                                "pid": "jsonhelper",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "XMLJSoup": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "geosearch",
                                        "pid": "XMLJSoup",
                                        "label": "XML Query(JSoup)"
                                    }
                                ],
                                "pid": "xmlhelper",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "SymRC6": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymRC6",
                                        "label": "RC6 Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "SymRC4": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymRC4",
                                        "label": "RC4 Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "SymRC5": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymRC5",
                                        "label": "RC5 Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "JSONQMapper": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "exchange",
                                        "pid": "JSONQMapper",
                                        "label": "JSON Mapper"
                                    }
                                ],
                                "pid": "jsonhelper",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "SymRC2": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymRC2",
                                        "label": "RC2 Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "RegexTester": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "RegexTester",
                                        "label": "Regex Tester"
                                    }
                                ],
                                "icon": "print",
                                "pid": "text_matcher",
                                "label": "Text Matcher"
                            }
                        ],
                        "pid": "text"
                    },
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "RegexTester",
                                        "label": "Regex Tester"
                                    }
                                ],
                                "icon": "derive-column",
                                "label": "Expression Tools"
                            }
                        ],
                        "icon": "cycle",
                        "pid": "train_ground",
                        "label": "Training Ground"
                    }
                ]
            },
            "SQLToJSON200": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "flow-end",
                                        "pid": "SQLToJSON200",
                                        "label": "SQL to JSON"
                                    }
                                ],
                                "icon": "flow-review-branch",
                                "pid": "dsl_tools",
                                "label": "SQL Helper"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "ASymRSA": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "ASymRSA",
                                        "label": "RSA Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Asymmetric_Crypto",
                                "label": "Asymmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "SystemFormat": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "SystemFormat",
                                        "label": "File Path Convertor",
                                        "id": "file_path_convertor"
                                    }
                                ],
                                "icon": "area-of-interest",
                                "pid": "system_formats",
                                "label": "System Formats"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "TranslateForProperties": {
                "arr": [
                    {
                        "children": [
                            {
                                "icon": "data-lineage",
                                "pid": "TranslateForProperties",
                                "label": "Properties Translate"
                            }
                        ],
                        "pid": "translate"
                    }
                ]
            },
            "LinuxManPage": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "LinuxManPage",
                                        "label": "ManPage for Linux"
                                    }
                                ],
                                "icon": "inbox-search",
                                "pid": "unix_like_os",
                                "label": "General Docs"
                            }
                        ],
                        "icon": "hat",
                        "pid": "doc_centre",
                        "label": "Docs Center"
                    }
                ]
            },
            "KeyboardListen": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "KeyboardListen",
                                        "label": "Keyboard Event"
                                    }
                                ],
                                "icon": "third-party",
                                "pid": "w3ctools",
                                "label": "W3C Standard"
                            }
                        ],
                        "icon": "globe",
                        "pid": "frontend_tools",
                        "label": "FrontEnd Tools"
                    }
                ]
            },
            "SymDESede": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymDESede",
                                        "label": "TripleDES Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "CurlParser": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "CurlParser",
                                        "label": "Curl Command Parser"
                                    }
                                ],
                                "icon": "series-search",
                                "pid": "app_layer_helper",
                                "label": "App Layer Helper"
                            }
                        ],
                        "icon": "cell-tower",
                        "pid": "sys_network",
                        "label": "Network Analysis"
                    }
                ]
            },
            "TextHelperUniquer": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "bring-data",
                                        "pid": "TextHelperUniquer",
                                        "label": "Text Deduplicator"
                                    }
                                ],
                                "icon": "paragraph",
                                "pid": "plaintext",
                                "label": "PlainText Helper"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "QRCodeDecoder": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "QRCodeDecoder",
                                        "label": "QRCode Decoder"
                                    }
                                ],
                                "icon": "barcode",
                                "pid": "plaintext",
                                "label": "QRCode"
                            }
                        ],
                        "pid": "color"
                    }
                ]
            },
            "SymBlowfish": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymBlowfish",
                                        "label": "Blowfish Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "ColorPicker": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "ColorPicker",
                                        "label": "Color Chooser"
                                    }
                                ],
                                "icon": "draw",
                                "pid": "colordraw",
                                "label": "Drawing"
                            }
                        ],
                        "pid": "color"
                    }
                ]
            },
            "TranslateForJSON": {
                "arr": [
                    {
                        "children": [
                            {
                                "icon": "signal-search",
                                "rank": 0,
                                "pid": "TranslateForJSON",
                                "label": "JSON Translate"
                            }
                        ],
                        "pid": "translate"
                    }
                ]
            },
            "ReactReplaceStyle": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "ReactReplaceStyle",
                                        "label": "React Style Conversion"
                                    }
                                ],
                                "icon": "prescription",
                                "pid": "react_frame_work",
                                "label": "React Framework"
                            }
                        ],
                        "icon": "globe",
                        "pid": "frontend_tools",
                        "label": "FrontEnd Tools"
                    }
                ]
            },
            "ReactReplaceClz": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "ReactReplaceClz",
                                        "label": "React ClassName Conversion"
                                    }
                                ],
                                "icon": "prescription",
                                "pid": "react_frame_work",
                                "label": "React Framework"
                            }
                        ],
                        "icon": "globe",
                        "pid": "frontend_tools",
                        "label": "FrontEnd Tools"
                    }
                ]
            },
            "RenderDoT": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "skipT": true,
                                        "icon": "application",
                                        "pid": "RenderDoT",
                                        "label": "doT.js"
                                    }
                                ],
                                "icon": "geofence",
                                "pid": "tempalte_renderer",
                                "label": "Template Renderer"
                            }
                        ],
                        "icon": "cycle",
                        "pid": "train_ground",
                        "label": "Training Ground"
                    }
                ]
            },
            "TextMultipleToOne": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "new-link",
                                        "pid": "TextMultipleToOne",
                                        "label": "Multi-Line <-> One-Line"
                                    }
                                ],
                                "pid": "textcase",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "JDKJRE100": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "JDKJRE100",
                                        "label": "Install JDK/JRE"
                                    }
                                ],
                                "icon": "inbox-geo",
                                "pid": "sdk_downloader",
                                "label": "SDK Resources"
                            }
                        ],
                        "icon": "hat",
                        "pid": "doc_centre",
                        "label": "Docs Center"
                    }
                ]
            },
            "SymDES": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymDES",
                                        "label": "DES Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "SiteBrowser": {
                "arr": []
            },
            "SoftwareCenter": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "home",
                                        "pid": "SoftwareCenter_index",
                                        "label": "Resources Navigator",
                                        "id": "root",
                                        "pathname": "/exts/SoftwareCenter?type=all&id=root"
                                    }
                                ],
                                "icon": "inbox-geo",
                                "pid": "sdk_downloader",
                                "label": "SDK Resources"
                            }
                        ],
                        "icon": "hat",
                        "pid": "doc_centre",
                        "label": "Docs Center"
                    }
                ]
            },
            "TranslateForCustomizer": {
                "arr": [
                    {
                        "children": [
                            {
                                "icon": "new-text-box",
                                "pid": "TranslateForCustomizer",
                                "label": "PlainText Translate"
                            }
                        ],
                        "pid": "translate"
                    }
                ]
            },
            "IPAddrMasker": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "IPAddrMasker",
                                        "label": "IPv4 Masker"
                                    }
                                ],
                                "icon": "ip-address",
                                "pid": "sys_ip_tools",
                                "label": "IP Tools"
                            }
                        ],
                        "icon": "cell-tower",
                        "pid": "sys_network",
                        "label": "Network Analysis"
                    }
                ]
            },
            "BasicCalc": {
                "arr": [
                    {
                        "children": [
                            {
                                "icon": "calculator",
                                "pid": "BasicCalc",
                                "label": "Basic Calculator"
                            }
                        ],
                        "icon": "numerical",
                        "pid": "mathTools",
                        "label": "Math Tools"
                    }
                ]
            },
            "ZipText": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "ZipText",
                                        "label": "ZipText"
                                    }
                                ],
                                "icon": "archive",
                                "pid": "compress_and_decompress",
                                "label": "Compress and Decompress"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "MathBCD": {
                "arr": [
                    {
                        "children": [
                            {
                                "icon": "numerical",
                                "pid": "MathBCD",
                                "label": "Binary-Coded Decimal"
                            }
                        ],
                        "icon": "numerical",
                        "pid": "mathTools",
                        "label": "Math Tools"
                    }
                ]
            },
            "HexBaseBiConverter": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "HexBaseBiConverter",
                                        "label": "Hex <-> Base64"
                                    }
                                ],
                                "pid": "encode",
                                "label": null
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "TimeCrontab": {
                "arr": [
                    {
                        "children": [
                            {
                                "icon": "timeline-events",
                                "pid": "TimeCrontab",
                                "label": "Cron Expression"
                            }
                        ],
                        "pid": "time"
                    }
                ]
            },
            "TextRandomText": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "social-media",
                                        "pid": "TextRandomText",
                                        "label": "PlainText"
                                    }
                                ],
                                "pid": "random",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "BizXMLToCodeM": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "BizXMLToCodeM",
                                        "label": "XML to Model"
                                    }
                                ],
                                "icon": "series-configuration",
                                "pid": "dto",
                                "label": "Data Transfer Layer"
                            }
                        ],
                        "icon": "oil-field",
                        "pid": "gen",
                        "label": "Code Generator"
                    }
                ]
            },
            "IPLongConverter": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "IPLongConverter",
                                        "label": "IPv4 <-> Long"
                                    }
                                ],
                                "icon": "ip-address",
                                "pid": "sys_ip_tools",
                                "label": "IP Tools"
                            }
                        ],
                        "icon": "cell-tower",
                        "pid": "sys_network",
                        "label": "Network Analysis"
                    }
                ]
            },
            "JSONQFilter": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "filter-list",
                                        "pid": "JSONQFilter",
                                        "label": "JSON Filter"
                                    }
                                ],
                                "pid": "jsonhelper",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "RenderHandleBars": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "skipT": true,
                                        "icon": "application",
                                        "pid": "RenderHandleBars",
                                        "label": "HandleBars.js"
                                    }
                                ],
                                "icon": "geofence",
                                "pid": "tempalte_renderer",
                                "label": "Template Renderer"
                            }
                        ],
                        "icon": "cycle",
                        "pid": "train_ground",
                        "label": "Training Ground"
                    }
                ]
            },
            "QRCodeCreator": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "QRCodeCreator",
                                        "label": "QRCode Encoder"
                                    }
                                ],
                                "icon": "barcode",
                                "pid": "plaintext",
                                "label": "QRCode"
                            }
                        ],
                        "pid": "color"
                    }
                ]
            },
            "IPv4Calculator": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator",
                                        "label": "IPv4 Utilities",
                                        "id": "IPv4Calculator_root"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator_ipv4_detail",
                                        "label": "IPv4 Network Calculator",
                                        "id": "ipv4_detail",
                                        "pathname": "/exts/IPv4Calculator?type=detail&id=ipv4_detail"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator_ipv4_addr",
                                        "label": "IPv4 Address Convertor",
                                        "id": "ipv4_addr",
                                        "pathname": "/exts/IPv4Calculator?type=detail&id=ipv4_addr"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator_get_subnet_mask_by_bits",
                                        "label": "Get Subnet Mask by Netmask Bits",
                                        "id": "get_subnet_mask_by_bits",
                                        "pathname": "/exts/IPv4Calculator?type=detail&id=get_subnet_mask_by_bits"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator_convert_subnet_mask",
                                        "label": "Convert Subnet Mask by Netmask Bits",
                                        "id": "convert_subnet_mask",
                                        "pathname": "/exts/IPv4Calculator?type=detail&id=convert_subnet_mask"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator_get_subnet_mask_by_host",
                                        "label": "Get Subnet Mask via the Number of Host",
                                        "id": "get_subnet_mask_by_host",
                                        "pathname": "/exts/IPv4Calculator?type=detail&id=get_subnet_mask_by_host"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator_host_nodes_calculator",
                                        "label": "Nodes/Hosts Calculator",
                                        "id": "host_nodes_calculator",
                                        "pathname": "/exts/IPv4Calculator?type=detail&id=host_nodes_calculator"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator_subnet_format_convertor",
                                        "label": "Subnet Mask Convertor",
                                        "id": "subnet_format_convertor",
                                        "pathname": "/exts/IPv4Calculator?type=detail&id=subnet_format_convertor"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "IPv4Calculator_subnet_mask_inversion",
                                        "label": "Subnet Mask Inversion",
                                        "id": "subnet_mask_inversion",
                                        "pathname": "/exts/IPv4Calculator?type=detail&id=subnet_mask_inversion"
                                    }
                                ],
                                "icon": "antenna",
                                "pid": "internet_layer_helper",
                                "label": "Internet Layer Helper"
                            }
                        ],
                        "icon": "cell-tower",
                        "pid": "sys_network",
                        "label": "Network Analysis"
                    }
                ]
            },
            "JWTEncoder": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "JWTEncoder",
                                        "label": "JWT Token Encoder"
                                    }
                                ],
                                "icon": "shield",
                                "pid": "web_token",
                                "label": "Web Auth"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "NamePubC": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "NamePubC",
                                        "label": "Sundry Text"
                                    }
                                ],
                                "icon": "diagram-tree",
                                "pid": "mock_data_tools",
                                "label": "Mock Data Tools"
                            }
                        ],
                        "icon": "cycle",
                        "pid": "train_ground",
                        "label": "Training Ground"
                    }
                ]
            },
            "CurlToAPI": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "CurlToAPI",
                                        "label": "Curl to API Request"
                                    }
                                ],
                                "icon": "series-search",
                                "pid": "app_layer_helper",
                                "label": "App Layer Helper"
                            }
                        ],
                        "icon": "cell-tower",
                        "pid": "sys_network",
                        "label": "Network Analysis"
                    }
                ]
            },
            "SymPBEWithSHA1AndDESede": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymPBEWithSHA1AndDESede",
                                        "label": "PBE Algorithm With SHA1 And DES"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "DMLToJSON200": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "flow-review",
                                        "pid": "DMLToJSON200",
                                        "label": "DML to JSON"
                                    }
                                ],
                                "icon": "flow-review-branch",
                                "pid": "dsl_tools",
                                "label": "SQL Helper"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "CDNTool100": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "CDNTool100",
                                        "label": "CDN Static Resource"
                                    }
                                ],
                                "icon": "inbox-search",
                                "pid": "unix_like_os",
                                "label": "General Docs"
                            }
                        ],
                        "icon": "hat",
                        "pid": "doc_centre",
                        "label": "Docs Center"
                    }
                ]
            },
            "QueryStringConversion": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "QueryStringConversion",
                                        "label": "QueryString Codec"
                                    }
                                ],
                                "pid": "encode",
                                "label": null
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "NumberDigits": {
                "arr": [
                    {
                        "children": [
                            {
                                "icon": "clean",
                                "pid": "NumberDigits",
                                "label": "HexBinDecOct"
                            }
                        ],
                        "icon": "numerical",
                        "pid": "mathTools",
                        "label": "Math Tools"
                    }
                ]
            },
            "SymAES": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymAES",
                                        "label": "AES Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "PowerDiff200": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "PowerDiff200",
                                        "label": "Power Diff"
                                    }
                                ],
                                "icon": "inbox-search",
                                "pid": "quick_difference",
                                "label": "Quick Differentiate"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "SQLToBean200": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SQLToBean200",
                                        "label": "SQL to Model"
                                    }
                                ],
                                "icon": "series-configuration",
                                "pid": "dto",
                                "label": "Data Transfer Layer"
                            }
                        ],
                        "icon": "oil-field",
                        "pid": "gen",
                        "label": "Code Generator"
                    }
                ]
            },
            "MorseCode": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "new-grid-item",
                                        "pid": "MorseCode",
                                        "label": "Morse Code Translator"
                                    }
                                ],
                                "pid": "textcase",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "MavenRepo": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "application",
                                        "pid": "MavenRepo_main",
                                        "label": "Maven Repository",
                                        "id": "MavenRepo_main",
                                        "pathname": "/exts/MavenRepo"
                                    },
                                    {
                                        "icon": "application",
                                        "pid": "MavenRepo_analyze_my_pom",
                                        "label": "Analyze My POM.xml",
                                        "id": "MavenRepo_analyze_my_pom",
                                        "pathname": "/exts/MavenRepo?type=tools&id=analyze_my_pom"
                                    }
                                ],
                                "icon": "series-configuration",
                                "pid": "java_docs",
                                "label": "Java Tools"
                            }
                        ],
                        "icon": "hat",
                        "pid": "doc_centre",
                        "label": "Docs Center"
                    }
                ]
            },
            "SymARCFOUR": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "pid": "SymARCFOUR",
                                        "label": "ARC4 Algorithm"
                                    }
                                ],
                                "icon": "exchange",
                                "pid": "Symmetric_Crypto",
                                "label": "Symmetric Crypto"
                            }
                        ],
                        "pid": "codec"
                    }
                ]
            },
            "YamlJSONTool": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "flow-review-branch",
                                        "pid": "YamlJSONTool",
                                        "label": "YAML <-> JSON"
                                    }
                                ],
                                "icon": "git-merge",
                                "pid": "yaml_helper",
                                "label": "YAML Helper"
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "Monolithic": {
                "arr": []
            },
            "TextJoinTools": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "fork",
                                        "pid": "TextJoinTools",
                                        "label": "Join Chars Replacer"
                                    }
                                ],
                                "pid": "textcase",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            },
            "JSONZipper": {
                "arr": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "icon": "unresolve",
                                        "pid": "JSONZipper",
                                        "label": "JSON ZipTool"
                                    }
                                ],
                                "pid": "jsonhelper",
                                "label": null
                            }
                        ],
                        "pid": "text"
                    }
                ]
            }
        }
    },
    "customerReturned": false,
    "directStrValue": null,
    "extraMap": {},
    "message": null,
    "status": 1,
    "timestamp": 1717783806062
}
// await gutils.opt(`/env_init/read_menu_json`);
        if (!_.isEmpty(menu)) {
          _.merge(allPluginsObj, menu);
          updateAndCall();
        } else {
          window.mustMenuReload = true;
        }
      } catch (e) {
        console.log("error", e);
      }
      let myextlist = await n_ext.plugins.readList();
      if (
        !_.isNil(gstore.localSettings.lastExtSize) &&
        gstore.localSettings.lastExtSize != _.size(myextlist)
      ) {
        if (-1 != gstore.localSettings.lastExtSize) {
          window.mustMenuReload = true;
        }
        gstore.localSettings.lastExtSize = _.size(myextlist);
      }
      gstore.ext.dev.extList = _.map(
        _.filter(myextlist, (x) => x != "example"),
        (x) => ({
          label: x,
          value: x,
        })
      );
      if (_.isNil(gstore.localSettings.extIndex)) {
        gstore.localSettings.extIndex = _.get(
          gstore.ext.dev.extList,
          "0.value"
        );
      }
      let myarr_all = [];
      let must_do_it = _.isEmpty(window.allPluginsObj);
      for (let x of gstore.ext.dev.extList) {
        // !p_mode() ||
        // gutils.dev() ||
        // DO NOT REMOVE THIS DUE TO LEFT_MENU.json
        if (true || !gutils.dev()) {
          if (
            // gutils.dev() ||
            localStorage.getItem(`need_refresh_now`) ||
            window.mustMenuReload ||
            must_do_it
          ) {
            try {
              await myapi.initSinglePlugins(x.value);
              window["info_" + x.value] = "inited";
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
      localStorage.removeItem(`need_refresh_now`);
      for (let eachval of myarr_all) {
        try {
          await eachval;
        } catch (e) {
          console.log(e);
        }
      }
      if (
        gutils.dev() ||
        (gutils.dev() && (must_do_it || window.mustMenuReload))
      ) {
        if (!p_mode()) {
          await gutils.opt("/env_init/save_menu_json", {
            menu: _.mapValues(
              _.pickBy(window.allPluginsObj, (x, d, n) => {
                return x.hideThisPage != true;
              }),
              (x, d, n) => {
                // let finok = {
                //   ...x,
                //   arr: x.rawArr || x.arr,
                // };
                // delete finok["rawArr"];
                function iterateTreeForRoadMap(
                  arr,
                  loopFunc,
                  nextKey = "children"
                ) {
                  return _.map(arr, (x, d, n) => {
                    if (_.isNil(x)) {
                      return null;
                    }
                    loopFunc(x, d, n);

                    if (x[nextKey]) {
                      x[nextKey] = iterateTreeForRoadMap(
                        x[nextKey],
                        loopFunc,
                        nextKey
                      );
                    }
                    return x;
                  });
                }
                let finok = _.cloneDeep(x);
                finok.arr = iterateTreeForRoadMap(finok.arr, (x, d, n) => {
                  if (x.label) {
                    let crtlabel = x.label;
                    let myfinkey = _.findKey(
                      window.pkgInfo.i18n.zh_CN,
                      (x) => x == crtlabel
                    );
                    if (!_.isNil(myfinkey)) {
                      x.label = myfinkey;
                      crtlabel = x.label;
                    }
                    myfinkey = _.findKey(
                      window.pkgInfo.i18n.zh_CN_overwrite,
                      (x) => x == crtlabel
                    );
                    if (!_.isNil(myfinkey)) {
                      x.label = myfinkey;
                      crtlabel = x.label;
                    }
                  }
                  return x;
                });
                return finok;
              }
            ),
          });
        }
      }
      updateAndCall();
      if (window.refresh_now_plugin) {
        window.refresh_now_plugin();
      }
    };
    init_refresh_function();
    window.init_refresh_function = init_refresh_function;
    window.refreshCrtFunction = async () => {
      localStorage.setItem(`need_refresh_now`, "1");
      await window.updateLangFunc();
      myapi.initSinglePlugins(gstore.localSettings.extIndex, {
        force_refresh_dev: "1",
      });
    };

    // window.refresh_now_plugin = () => {
    //   init_refresh_function();
    // };
  },
  initSinglePlugins(id, x_args = {}) {
    if (!gutils.dev()) {
      if (window["init-before2" + id]) {
        return;
      } else {
        window["init-before2" + id] = "1";
      }
    }
    if (true) {
      // return;
    }
    let props = {
      id: id,
    };
    let { crtStoreName_underline, crtStoreName } =
      window.getCrtStoreInfoByPluginId(id);
    let crt_store = gstore.ext.init[id];
    if (_.isNil(crt_store)) {
      crt_store = {
        hideThisPage: false,
        message: [],
        loading: true,
      };
      gstore.ext.init[id] = crt_store;
    }
    let fn_refresh_plugin = async () => {
      if (!gutils.dev()) {
        if (window["init-before" + props.id]) {
          return;
        } else {
          window["init-before" + props.id] = "1";
        }
      }
      crt_store.loading = true;
      try {
        crt_store.message = ["Initializing the extension"];
        crt_store.message.push("Extension ID: " + props.id);
        let pluginDetail = await n_ext.plugins.getDetailById(props.id);
        var { entryJs, entryCss, dir, timestamp } = pluginDetail;
        // console.log("pluginDetail", pluginDetail);
        gutils.once("refresh-" + props.id, () => {
          if (gutils.dev()) {
            // let lastTimestamp = null;
            // gutils.run_async_loop(async () => {
            //   if (gstore.localSettings.extIndex != props.id) {
            //     return;
            //   }
            //   let crt_timestmap = await n_ext.plugins.getUpdateValue(dir.root);
            //   if (crt_timestmap != -1 && crt_timestmap != lastTimestamp) {
            //     console.log("update timestamp", crt_timestmap);
            //     lastTimestamp = crt_timestmap;
            //     if (window.refresh_now_plugin) {
            //       window.refresh_now_plugin();
            //     }
            //   }
            // }, 2000);
          }
        });
        crt_store.message.push("Extension Going Logic: " + _.size(entryJs));
        crt_store.message.push(
          "Extension Root Directory: " + (dir.root || "base")
        );
        crt_store.message.push(
          "Extension FrontEnd Directory: " + (dir.frontend || "base")
        );
        crt_store.message.push(
          "Extension BackEnd Directory: " + (dir.backend || "base")
        );
        crt_store.finished = true;

        // entryJs = entryJs.replace(/ROOT_EXTENSION_ADDONS/g, props.id);

        window.eval(entryJs);

        let preEleFound = $(document.body).find(
          `[data-sid="${crtStoreName_underline}"]`
        );
        if (preEleFound.length != 0) {
          preEleFound.text(entryCss);
          // debugger;
        } else {
          let ele = $("<style></style>");
          // ele.attr("u", Math.random());
          ele.attr("data-sid", crtStoreName_underline);
          ele.text(entryCss);
          $(document.body).append(ele);
          // debugger;
        }

        if (gutils.dev() && props.id == gstore.localSettings.extIndex) {
          await gutils.opt("/ext/integrating", {
            ...(x_args || {}),
            is_first_in_page: window["is_first_in_page" + props.id],
            // frontend: dir.frontend,
            // backend: dir.backend,
            // root: dir.root,
            id: props.id,
          });
        }
        // let res = await gutils.opt("/ext/integrating", {
        //   ...(x_args || {}),
        //   is_first_in_page: window["is_first_in_page" + props.id],
        //   // frontend: dir.frontend,
        //   // backend: dir.backend,
        //   // root: dir.root,
        //   id: props.id,
        // });
        // if (res.content && res.content.message) {
        //   crt_store.message.push(res.content.message);
        // }
        window["is_first_in_page" + props.id] = "1";

        let extObject = gutils.readDefinition(
          window.ExtensionDefinition[props.id],
          props.id
        );

        if (extObject && extObject.hideThisPage) {
          // if(!gutils.dev()){
          // }
          return;
        }

        if (_.isNil(extObject) || _.isNil(extObject.render)) {
          crt_store.message.push(`The Component Definition is Empty`);
        }

        window.extObject = extObject;
        crt_store.hideThisPage = extObject.hideThisPage;

        if (_.isNil(extObject)) {
          return;
        }

        if (extObject.menus) {
          let targetMenuArr = extObject.menus;
          if (_.isFunction(targetMenuArr)) {
            targetMenuArr = await extObject.menus();
          }
          // window.allExtMenuAndState[props.id] = targetMenuArr
          window.allPluginsObj = allPluginsObj;
          allPluginsObj[id] = {
            arr: targetMenuArr,
            // rawArr: _.cloneDeep(targetMenuArr),
            hideThisPage: extObject.hideThisPage,
          };

          updateAndCall();
        }

        if (extObject.hideThisPage) {
          return;
        }

        window[id + "_hide"] = extObject.hideThisPage == true;

        let fn_sync_common_store = async () => {
          let initialState = await extObject.initialState();
          let config_for_commonstore =
            window.createStoreForCommonStore_direct_with_parse_str(
              crtStoreName_underline,
              initialState,
              extObject.initialState
            );
          // let is_quick_no_check = _.isNil(
          //   window["init_" + crtStoreName_underline]
          // );
          gstore.common_app[crtStoreName] =
            config_for_commonstore[crtStoreName];
          window["init_" + crtStoreName_underline] = "1";
        };

        if (
          !_.isNil(window["DLIB_" + id]) // !_.isEmpty(extObject.PreRequisiteJson) &&
          // !_.isEmpty(extObject.PreRequisiteJson.runtime_listings)
        ) {
          crt_store.fn_sync_common_store = fn_sync_common_store;
        } else {
          await fn_sync_common_store();
        }

        if (false) {
          // await gutils.opt("/dev/init?p=" + crtStoreName_underline, {
          //   is_quick_no_check,
          //   crtStoreName_underline: crtStoreName_underline,
          // });
        }
        crt_store.message.push(`Loaded.`);
        crt_store.loading = false;
        crt_store.message = [];
        gstore.ext.init[id] = crt_store;
      } catch (e) {
        console.log("haserr", e);
        crt_store.loading = false;
        crt_store.got_err = false;
        crt_store.err_obj = e;
        collectErrors(e, crt_store.message);
        window.errorGot = true;
        gstore.ext.init[id] = crt_store;
        gutils.alert({
          message: "Sorry, An Error Occurred while loading the plugin.",
          intent: "danger",
        });
      }
    };
    return fn_refresh_plugin();
  },
};

export default myapi;

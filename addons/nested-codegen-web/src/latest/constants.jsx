import Active4D from "./themes/Active4D.json";
import _ from 'lodash'
window['_'] = _
import All_Hallows_Eve from "./themes/All Hallows Eve.json";
import Amy from "./themes/Amy.json";
import Birds_of_Paradise from "./themes/Birds of Paradise.json";
import Blackboard from "./themes/Blackboard.json";
import Brilliance_Black from "./themes/Brilliance Black.json";
import Brilliance_Dull from "./themes/Brilliance Dull.json";
import Chrome_DevTools from "./themes/Chrome DevTools.json";
import Clouds_Midnight from "./themes/Clouds Midnight.json";
import Clouds from "./themes/Clouds.json";
import Cobalt from "./themes/Cobalt.json";
import Dawn from "./themes/Dawn.json";
import Dominion_Day from "./themes/Dominion Day.json";
import Dracula from "./themes/Dracula.json";
import Dreamweaver from "./themes/Dreamweaver.json";
import Eiffel from "./themes/Eiffel.json";
import Espresso_Libre from "./themes/Espresso Libre.json";
import GitHub from "./themes/GitHub.json";
import IDLE from "./themes/IDLE.json";
import Katzenmilch from "./themes/Katzenmilch.json";
import Kuroir_Theme from "./themes/Kuroir Theme.json";
import LAZY from "./themes/LAZY.json";
import MagicWB_Amiga from "./themes/MagicWB (Amiga).json";
import Merbivore_Soft from "./themes/Merbivore Soft.json";
import Merbivore from "./themes/Merbivore.json";
import Monokai_Bright from "./themes/Monokai Bright.json";
import Monokai from "./themes/Monokai.json";
import Night_Owl from "./themes/Night Owl.json";
import Oceanic_Next from "./themes/Oceanic Next.json";
import Pastels_on_Dark from "./themes/Pastels on Dark.json";
import Slush_and_Poppies from "./themes/Slush and Poppies.json";
import Solarized_dark from "./themes/Solarized-dark.json";
import Solarized_light from "./themes/Solarized-light.json";
import SpaceCadet from "./themes/SpaceCadet.json";
import Sunburst from "./themes/Sunburst.json";
import Textmate_Mac_Classic from "./themes/Textmate (Mac Classic).json";
import Tomorrow_Night_Blue from "./themes/Tomorrow-Night-Blue.json";
import Tomorrow_Night_Bright from "./themes/Tomorrow-Night-Bright.json";
import Tomorrow_Night_Eighties from "./themes/Tomorrow-Night-Eighties.json";
import Tomorrow_Night from "./themes/Tomorrow-Night.json";
import Tomorrow from "./themes/Tomorrow.json";
import Twilight from "./themes/Twilight.json";
import Upstream_Sunburst from "./themes/Upstream Sunburst.json";
import Vibrant_Ink from "./themes/Vibrant Ink.json";
import Xcode_default from "./themes/Xcode_default.json";
import Zenburnesque from "./themes/Zenburnesque.json";
import iPlastic from "./themes/iPlastic.json";
import idleFingers from "./themes/idleFingers.json";
import krTheme from "./themes/krTheme.json";
import monoindustrial from "./themes/monoindustrial.json";
import themelist from "./themes/themelist.json";
let COMMON_SIZE = 25;

let themeJsonObj = {
  active4d: Active4D,
  "all-hallows-eve": All_Hallows_Eve,
  amy: Amy,
  "birds-of-paradise": Birds_of_Paradise,
  blackboard: Blackboard,
  "brilliance-black": Brilliance_Black,
  "brilliance-dull": Brilliance_Dull,
  "chrome-devtools": Chrome_DevTools,
  "clouds-midnight": Clouds_Midnight,
  clouds: Clouds,
  cobalt: Cobalt,
  dawn: Dawn,
  dracula: Dracula,
  dreamweaver: Dreamweaver,
  eiffel: Eiffel,
  "espresso-libre": Espresso_Libre,
  github: GitHub,
  idle: IDLE,
  katzenmilch: Katzenmilch,
  "kuroir-theme": Kuroir_Theme,
  lazy: LAZY,
  "magicwb--amiga-": MagicWB_Amiga,
  "merbivore-soft": Merbivore_Soft,
  merbivore: Merbivore,
  "monokai-bright": Monokai_Bright,
  monokai: Monokai,
  "night-owl": Night_Owl,
  "oceanic-next": Oceanic_Next,
  "pastels-on-dark": Pastels_on_Dark,
  "slush-and-poppies": Slush_and_Poppies,
  "solarized-dark": Solarized_dark,
  "solarized-light": Solarized_light,
  spacecadet: SpaceCadet,
  sunburst: Sunburst,
  "textmate--mac-classic-": Textmate_Mac_Classic,
  "tomorrow-night-blue": Tomorrow_Night_Blue,
  "tomorrow-night-bright": Tomorrow_Night_Bright,
  "tomorrow-night-eighties": Tomorrow_Night_Eighties,
  "tomorrow-night": Tomorrow_Night,
  tomorrow: Tomorrow,
  twilight: Twilight,
  "upstream-sunburst": Upstream_Sunburst,
  "vibrant-ink": Vibrant_Ink,
  "xcode-default": Xcode_default,
  zenburnesque: Zenburnesque,
  iplastic: iPlastic,
  idlefingers: idleFingers,
  krtheme: krTheme,
  monoindustrial: monoindustrial,
};

let finalThemeObj = {
  vs: {
    json: null,
    name: "Default Light Theme",
  },
  "vs-dark": {
    json: null,
    name: "Dark Theme",
  },
};
_.forEach(themeJsonObj, (x, d, n) => {
  let myname = themelist[d];
  finalThemeObj[d] = {
    json: x,
    name:
      d == "vs"
        ? "Default Light Theme"
        : d == "twilight"
        ? "Default Dark Theme"
        : myname,
  };
});

const constants = {
  finalThemeObj,
  timezone_list: [
    {
      utc: "+0",
      area: `UTC, GMT, UK, Lisbon, Torshavn, London, Dublin, Edinburgh`,
    },
    {
      utc: "+1",
      area: `Central Europe, West Africa, West Central Africa, Germany, Ireland, France, Amsterdam, Italy, Berlin, Rome, Spain, Prague, Belgrade, Brussels, Paris, Madrid, Tunisia, Gabon, Morocco`,
    },
    {
      utc: "+2",
      area: `East Europe, Central Africa, Turkey, Israel, South Africa, Istanbul, Cairo, Athens, Damascus`,
    },
    {
      utc: "+3",
      area: `East Africa, Russia, Baghdad, Kuwait, Moscow, St. Petersburg`,
    },
    {
      utc: "+3.5",
      area: `Iran Standard Time, Tehran, Mashhad`,
    },
    {
      utc: "+4",
      area: `Abu Dhabi, Tbilisi, Dubai, Mauritius, Port Louis`,
    },
    {
      utc: "+5",
      area: `Pakistan, Turkmenistan, Maldives, Uzbekistan, Armenia, Tajikistan`,
    },
    {
      utc: "+5.5",
      area: `India, Mumbai, New Delhi, Bangalore, Kolkata`,
    },
    {
      utc: "+6",
      area: `Novosibirsk, Kyrgyzstan, Bangladesh, Bhutan`,
    },
    {
      utc: "+7",
      area: `Thailand, Bangkok, Hanoi, Jakarta`,
    },
    {
      utc: "+8",
      area: `Malaysia, Philippines, Singapore, China: Shanghai, Taiwan, Chengdu, Macau, Hong Kong`,
    },
    {
      utc: "+9",
      area: `Japan, Korea, Tokyo, Seoul, Sapporo, Osaka, East Timor`,
    },
    {
      utc: "+10",
      area: `Australia, Vladivostok, Guam, Canberra, Melbourne, Sydney, Papua New Guinea`,
    },
    {
      utc: "+11",
      area: `Solomon Islands, Sakhalin`,
    },
    {
      utc: "+12",
      area: `New Zealand, Auckland, Wellington, Fiji, New Zealand, Nauru`,
    },
    {
      utc: "-1",
      area: "Cape Verde, Azores",
    },
    {
      utc: "-2",
      area: "South Georgia, Fernando de Noronha",
    },
    {
      utc: "-3",
      area: "Brazil, Santiago, El Salvador, Brasilia, Uruguay, Argentina, Suriname",
    },
    {
      utc: "-4",
      area: "Venezuela, Bolivia, Paraguay, Chile",
    },
    {
      utc: "-5",
      area: `Eastern Time (US and Canada), Columbia, Toronto, Ecuador, Peru, Cuba, New York, Hamilton, San Diego`,
    },
    {
      utc: "-6",
      area: `US and Canada Central Time, Mexico City, Monterrey, Chicago, Houston, New Orleans, Memphis`,
    },
    {
      utc: "-7",
      area: `Mountain Time, Arizona, Mazatlan, Phoenix, Salt Lake City, Denver, Edmonton`,
    },
    {
      utc: "-8",
      area: `Pacific Time, Los Angeles, San Francisco, Vancouver, Seattle, Las Vegas`,
    },
    {
      utc: "-9",
      area: `Alaska`,
    },
    {
      utc: "-10",
      area: `hawaii`,
    },
    {
      utc: "-11",
      area: `Samoa, Niue Island`,
    },
    {
      utc: "-12",
      area: "West of the International Date Line",
    },
  ],
  getConfigForLocalProject() {
    return {
      updateRef: 0,
      // need toggle
      needFindingTextCase: false,
      needFindingExpand: false,
      needReplacingExpand: false,
      needExcludingExpand: false,
      needIncludingExpand: false,
      needFindingRegex: false,
      needReplacingRegex: false,
      needExcludingTextCase: false,
      needIncludingTextCase: false,
      // scope
      scope_UsingEntireProjects: false,
      scope_SpecifiedProjects: {},
      scope_factualFolderList: [],
      show_more_option: false,
    };
  },
  getResultSetDefinition() {
    const fn_initHighlightPoint = () => {
      return {
        startCol: -1,
        startRow: -1,
        endRow: -1,
        endCol: -1,
      };
    };
    function fn_extra() {
      return {
        // result-set logic
        viewMoreLoading: false,
        viewNoMore: false,
        loading: false,
        errmsgForQuery: null,
        errmsg: null,
        scrollLeftValue: 0,
        crtDragItemHeight: 0,
        calcTopValue: 0,
        userDragObj: {},
        updateCtn: 1,
        crtBoxSize: {},
        refLineHeightForAutorun: null,
        refForAutorun: null,
        lineHeight: 0,
        totalTableBodyHeight: 0,
        scrollOfTheTable: null,
        highlightPoints: fn_initHighlightPoint(),
        fn_initHighlightPoint,
        // calculate
        completeEachRowWidth: 0,
        extraLengthForBasicCell: 1 + 12,
        calcColumnIndexArr: [],
        preOrderColumnStr: "SYS_CG_PROVIDE_NOUSE_ORDER",
        mywidthvalue: "150px",
        // dynamic view
        crtDataIndex: 0,
      };
    }
    let fn_res = () => {
      return {
        spendMS: 0,
        columnIndexArr: [],
        dataList: [],
      };
    };
    let fn_req = () => {
      return {
        count: 0,
        order: [],
        pagination: {
          index: 1,
          size: 200,
        },
      };
    };
    return {
      fn_res,
      fn_req,
      extra: fn_extra(),
      res: fn_res(),
      req: fn_req(),
      fn_extra: fn_extra,
    };
  },
  getPageData(obj) {
    return {
      loading: false,
      formModel: {
        FOLDER_ID: null,
      },
      afterConfirmFunc: null,
      toggle_status_loading: false,
      alertType: "create",
      addModelFailures: {},
      isAddModelPass: false,
      initModel: constants.initModel(),
      addModel: constants.initModel(),
      formNeeds: {
        groups: [],
        netcards: [],
      },
      pageData: [],
      pageCount: 0,
      pageInfo: {
        pageIndex: 1,
        pageSize: constants.COMMON_SIZE,
      },
    };
  },
  COMMON_SIZE,
  commonPropsForDialog: () => {
    return {
      loading: false,
      open: false,
      confirmDisable: false,
      confirm: null,
      title: null,
      icon: null,
      cancelText: "Cancel",
      confirmIntent: null,
      confirmText: "Confirm",
    };
  },
  extraModelProps: () => {
    return {
      addModelFailures: {},
      isAddModelPass: false,
    };
  },
  initModel: () => {
    return {
      FOLDER_ID: 1,
      IS_LOCAL_SSL: 0,
      FILE_PATH: null,
      CONTEXT_PATH: null,
      LOCAL_LISTEN_PORT: null,
      LOCAL_LISTEN_SSL_PORT: null,
      LIST_DIRECTORY: 1,
      PLAIN_VIEW_MODE: 1,
      BRIEF: null,
      NAME: null,
      BOOT_FLAG: 1,
    };
  },
};

window.constants = constants;

export default constants;

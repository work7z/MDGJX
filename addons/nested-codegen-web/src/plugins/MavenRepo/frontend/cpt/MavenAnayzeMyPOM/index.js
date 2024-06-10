const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GSyncSelectWithFilter,
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
import FormCrudTable from "../../../../TranslateForJSON/frontend/cpt/FormCrudTable";
import FormEasyTable from "../../../../TranslateForJSON/frontend/cpt/FormEasyTable";
import SpinLoading from "../../../../TranslateForJSON/frontend/cpt/SpinLoading";
import SpinLoading2 from "../../../../TranslateForJSON/frontend/cpt/SpinLoading2";
import cutils from "../../../../TranslateForJSON/frontend/kit/common_utils";
import MavenDepsCopier from "../MavenDepsCopier";
import myfileLess from "./index.less";

const MavenAnayzeMyPOM = observer((props) => {
  let { PUtils, gref } = props;
  let [list, onList] = useState([]);
  let [err, onErr] = useState(null);
  let mref = React.useRef({
    prev: null,
  });
  useEffect(() => {
    let a = PUtils.loop(async () => {
      try {
        let a = PUtils.editor.getValue({
          id: "init_maven_analyze_content",
        });
        a = _.trim(a);
        if (mref.current.prev == a) {
          return;
        } else {
          mref.current.prev = a;
        }
        onList([]);
        a = `<div>${a}</div>`;
        let $a = $(a);
        let depList = $a.find("dependency");
        let arr = [];
        depList.map((idx, ele) => {
          ele = $(ele);
          let groupId = _.trim(ele.find("groupId").text());
          let artifactId = _.trim(ele.find("artifactId").text());
          let version = _.trim(ele.find("version").text());
          if (gutils.empty(version)) {
            version = null;
          }
          arr.push({
            groupId,
            artifactId,
            version,
            url:
              "/exts/MavenRepo?" +
              Qs.stringify({
                type: "detail",
                groupId,
                artifactId,
                version,
              }),
          });
        });
        onList(arr);
        if (!_.isNil(err)) {
          onErr(null);
        }
      } catch (e) {
        onErr(gutils.getErrMsg(e));
      }
    }, 1000);
    return () => {
      a();
    };
  }, []);
  return (
    <div className={myfileLess["g-analyze-wrapper"]}>
      <div className={myfileLess["anl-body-wrapper"]}>
        <h4>
          1.{" "}
          {t(
            `Please Input Your {0} into the editor below, either entire content or part content is acceptable.`,
            "POM.xml"
          )}
        </h4>
        <div style={{ height: "350px" }}>
          {PUtils.jsx.createGEditor({
            fontSize: 11,
            key: "init_maven_analyze_content",
            title: t(`Editor for Inputting the XML Content`),
            needBorder: true,
            keepNoInvolve: true,
            language: "html",
            wordWrap: "on",
          })}
        </div>
        <h4>
          2.{" "}
          {t(
            `Once you modify the content of the editor above, the corresponding results will be displayed below.`
          )}
        </h4>
        {err ? (
          <p>
            <p>Error: {err}</p>
            <p>{Date.now() + ""}</p>
          </p>
        ) : (
          ""
        )}
        <ul>
          {(list || []).map((x, d, n) => {
            return (
              <li>
                <Link
                  target="_blank"
                  to={x.url}
                  style={{ fontSize: "15px", marginBottom: "5px" }}
                >
                  {[x.groupId, x.artifactId, x.version]
                    .filter((x) => !_.isNil(x))
                    .join(" -> ")}
                </Link>
              </li>
            );
          })}
        </ul>
        <h4>
          3.{" "}
          {t(
            `CodeGen also purveys multiple useful functionalities, you can follow these buttons as below.`
          )}
        </h4>
        <p className="sub-mr-5">
          <Button
            onClick={() => {
              gutils.alertOk(
                `Done. If there's no window being opened, please check if your browser settings.`
              );
              _.forEach(list, (x, d, n) => {
                window.open(x.url);
              });
            }}
          >
            {t(`Batch View These Artifacts`)}
          </Button>
          {/* <Button
            onClick={() => {
              //
            }}
          >
            {t(`Batch Download These Jars`)}
          </Button> */}
        </p>
      </div>
    </div>
  );
});

export default MavenAnayzeMyPOM;

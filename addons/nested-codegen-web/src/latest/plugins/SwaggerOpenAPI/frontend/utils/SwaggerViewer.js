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
const { Tabs, Tab } = CodeGenDefinition.BluePrintCpt;
import MarkDownViewerTool from "../../../TranslateForJSON/frontend/cpt/MarkDownViewerTool";
import cutils from "../../../TranslateForJSON/frontend/kit/common_utils";
import myless from "./SwaggerViewer.less";

let PathViewer = observer((props) => {
  let { paths } = props;
  let allKeys = _.keys(paths);
  return (
    <div className={myless["tag-wrap"]}>
      <div className={myless["tag-title"]}>
        <b
          style={{
            textAlign: "center",
            paddingBottom: "5px",
          }}
          // className="pb-5"
        >
          {t(`API Definitions Table`)}
        </b>
        <div className={myless["path-viewer"]}>
          {_.map(allKeys, (eachKey, eachKeyIdx) => {
            let eachPathObj = _.get(paths, eachKey);
            let idx = 0;
            return (
              <div key={eachKey} className={myless["each-path-wrapper"]}>
                <div className={myless["each-api-path-header"]}>{eachKey}</div>
                <div className={myless["each-api-path-container"]}>
                  {_.map(eachPathObj, (methodDetail, methodName) => {
                    idx++;
                    let upperMethodName = _.toUpper(methodName);
                    return (
                      <div className={myless["each-method-wrapper"]}>
                        <div className={myless["each-method-label"]}>
                          [{upperMethodName}] {_.get(methodDetail, "summary")}
                        </div>
                        <div className="bp3-text-muted">
                          {_.get(methodDetail, "description")}
                        </div>
                        <div>
                          Tags:{" "}
                          {_.map(methodDetail.tags, (x) => {
                            return (
                              <Tag key={x} small={true}>
                                {x}
                              </Tag>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

let SwaggerViewer = observer((props) => {
  let { PUtils, crtModel, obj } = props;
  let licenseObj = _.get(obj, "info.license");
  let email_value = _.get(obj, "info.contact.email");
  let termsOfService_value = _.get(obj, "info.termsOfService");
  let version = _.get(obj, "info.version");
  let externalDocs = _.get(obj, "externalDocs");
  let tags = _.get(obj, "tags");
  let paths = _.get(obj, "paths");
  return (
    <div
      className={myless["swagger-view-wrapper"]}
      style={{
        padding: "0 15px",
      }}
    >
      <h1 className={myless["swagger-h1-wrapper"]}>
        {_.get(obj, "info.title")}
      </h1>
      <div
        className="bp3-text-muted"
        style={{
          marginBottom: "10px",
        }}
      >
        <MarkDownViewerTool text={_.get(obj, "info.description")} />
      </div>
      <div className={myless["tag-wrap"]}>
        <div className={myless["tag-title"]}>
          <b>{t(`General Information`)}</b>
        </div>
        <div className="sub-mr-5">
          {version ? <Tag>{version}</Tag> : ""}
          {licenseObj ? (
            <a
              target="_blank"
              className="bp3-tag bp3-intent-primary"
              href={_.get(licenseObj, "url")}
            >
              {_.get(licenseObj, "name")}
            </a>
          ) : (
            ""
          )}
          {email_value ? (
            <a
              target="_blank"
              className="bp3-tag bp3-intent-primary"
              href={`mailto:` + email_value}
            >
              {t(`Contact Us`)}
            </a>
          ) : (
            ""
          )}
          {termsOfService_value ? (
            <a
              target="_blank"
              className="bp3-tag bp3-intent-success"
              href={termsOfService_value}
            >
              {t(`Term Of Service`)}
            </a>
          ) : (
            ""
          )}
          {externalDocs
            ? [
                <a
                  target="_blank"
                  className="bp3-tag bp3-intent-none"
                  href={_.get(externalDocs, "url")}
                >
                  {_.get(externalDocs, "description")}
                </a>,
              ]
            : []}
        </div>
      </div>
      {!cutils.cond_emptyObj(tags) ? (
        <div className={myless["tag-wrap"]}>
          <div className={myless["tag-title"]}>
            <b>{t(`Tags Information`)}</b>
          </div>
          <div className="sub-mr-5">
            {_.map(tags, (x, d, n) => {
              let hrefVal = _.get(x, "externalDocs.url");
              return (
                <a
                  target="_blank"
                  className="bp3-tag bp3-intent-success bp3-minimal"
                  href={hrefVal}
                  title={_.get(x, "description")}
                  key={d + " " + _.get(x, "description")}
                >
                  {_.get(x, "name")}
                </a>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
      {cutils.cond_emptyObj(paths) ? (
        <p>{t(`No Available Paths`)}</p>
      ) : (
        <PathViewer paths={paths} />
      )}
    </div>
  );
});

export default SwaggerViewer;

const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GEditor,
  OperationPanel,
  GSyncSelectWithFilter,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  Dialog,
  Popover,
  Radio,
  GFormInput,
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
  EditableText,
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
import GFormInput2 from "../../../../SQLDrafts/frontend/Kit_GFormInput2";
import cutils from "../../kit/common_utils";
import files from "./index.less";

export default observer((props) => {
  let {
    PUtils,
    keywordValue,
    onKeywordChange,
    selectKeyValue,
    onSelectKeyChange,
    onSearchByKeyword,
  } = props;
  return (
    <div className={files["form-list-all-wrapper"]}>
      <div className={files["form-list-bar-wrapper"]}>
        {React.createElement(
          observer((props) => {
            return (
              <GFormInput2
                // directCall={true}
                rightElement={
                  <Button
                    size={12}
                    onClick={() => {
                      if (onSearchByKeyword) {
                        onSearchByKeyword(keywordValue);
                      }
                    }}
                    icon={"search"}
                    loading={props.loadingList}
                  />
                }
                small={true}
                value={keywordValue}
                onChange={(e) => {
                  let newval = cutils.getEventValue(e);
                  onKeywordChange(newval);
                }}
                placeholder={t(`Filter items by keyword`)}
                full={true}
                onClick={() => {
                  //
                }}
              />
            );
          })
        )}
      </div>
      <ScrollMemWrapper
        className={files["form-list-body-wrapper"]}
        mid={"form-list" + props.id}
      >
        {/* {props.loadingList ? (
          <p style={{ padding: "10px" }}>{t(`Loading...`)}</p>
        ) : (
          ""
        )} */}
        {_.isEmpty(props.list) ? (
          <p style={{ padding: "10px" }}>{props.whenEmptyListJsx}</p>
        ) : (
          ""
        )}
        {props.loadingList
          ? ""
          : _.map(props.list, (x, d, n) => {
              let isActive = x.key == selectKeyValue;
              return (
                <div
                  className={
                    (isActive ? "" : "bp3-text-muted ") +
                    files[`form-list-body-wrapper-item`] +
                    ` ` +
                    (isActive ? files["do-active"] : "")
                  }
                  style={{}}
                  onClick={() => {
                    onSelectKeyChange(isActive ? null : x.key);
                  }}
                  title={x.content}
                  key={x.key}
                >
                  {x.content}
                </div>
              );
            })}
      </ScrollMemWrapper>
    </div>
  );
});

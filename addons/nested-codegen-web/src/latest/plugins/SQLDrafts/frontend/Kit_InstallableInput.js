const {
  _,
  Xterm,
  GFormSelect,
  Blink,
  HalfResizeForTwoHorizontal,
  GFormInput,
  GEditor,
  OperationPanel,
  BluePrintPopover,
  Mobx,
  MobxReact,
  HalfResizeForTwo,
  MobxReactLite,
  ProgressBar,
  GSyncSelectWithFilter,
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

const Kit_InstallableInput = observer((props) => {
  let tmp_dbconfig = props.obj;
  let index = props.index;
  let { crtDriverInfo } = props;
  return (
    <GFormInput
      small={true}
      placeholder={props.placeholder}
      onChange={(val) => {
        tmp_dbconfig[index] = val;
      }}
      value={tmp_dbconfig[index]}
      disabled={true}
      rightElement={[
        <Button
          text={props.install_text}
          intent={"none"}
          small={true}
          onClick={() => {
            let m_ref = gutils.w_alertMsgGlobal(
              _.merge({
                icon: "info-sign",
                otherJSX: {},
                style: {
                  //   position: "absolute",
                  width: "430px",
                  top: "20px",
                  //   left: "50%",
                  //   top: "50%",
                  //   transform: "translate(-50%, -50%)",
                  //   // width: "61.8vw",
                  //   height: "85vh",
                  //   paddingBottom: "0px",
                },
                s_clzname: "white-app-view",
                confirmText: "Agree and Install",
                cancelText: `Quit`,
                confirmIntent: "primary",
                title: `Installation Page`,
                onCancel() {
                  //
                },
                onConfirm: async () => {
                  m_ref.loading = true;
                  await props.fn_confirm();
                  m_ref.loading = false;
                  //
                },
                jsx: () => {
                  return (
                    <div>
                      <div>
                        <h4 style={{ marginTop: "1em", marginBottom: "1em" }}>
                          {t(`Disclaimer of Driver File`)}
                        </h4>
                        <p className="bp3-text-small bp3-text-muted">
                          {t(
                            `In order to prevent unnecessary legal disputes about the copyrights of the driver file from happening, CodeGen and its developer are obliged to inform you something before using this driver file to connect the database.`
                          )}
                        </p>
                      </div>
                      <div>
                        <h4>{t(`Installation Process for the Driver`)}</h4>
                        <p className="bp3-text-small bp3-text-muted">
                          {t(
                            `The JDBC Driver is not an integrated part of CodeGen ToolBox, we totally understood and recognized its copyrights and usage purposes. To respect the driver manufacturer, you shall carefully find and read its usage licenses and agreements on their official website by yourself.`
                          )}
                        </p>
                        <ul className="bp3-text-small bp3-text-muted">
                          <li>
                            {t(
                              `Driver Official Website: {0}`,
                              `${_.get(crtDriverInfo, "officialWebsite")}`
                            )}
                          </li>
                          <li>
                            {t(
                              `Maven Definitions: {0}`,
                              `${_.get(crtDriverInfo, `mavenDefinition`)}`
                            )}
                          </li>
                          <li>
                            {t(
                              `Driver Download URL From Mirror: {0}`,
                              `${_.get(crtDriverInfo, "mavenURL")}`
                            )}
                          </li>
                        </ul>
                        <p className="bp3-text-small bp3-text-muted">
                          {t(
                            `If you agree to these licenses and agreements from the driver manufacturer, as well as privileging us to process the installation of the driver, then CodeGen will start installing the driver on your behalf of you(the user) immediately.`
                          )}
                        </p>
                        <p className="bp3-text-small bp3-text-muted">
                          {t(
                            `If you don't agree to these licenses and agreements, or refused to privilege CodeGen to install , please quit installation page and choose another way to provide the file path of driver jar. Thanks for your kindly understanding. `
                          )}
                        </p>
                      </div>
                    </div>
                  );
                },
              })
            );
          }}
        ></Button>,
        <Button
          text={t(`Upload`)}
          intent={"none"}
          small={true}
          onClick={props.fn_upload}
        />,
      ]}
    />
  );
});

export default Kit_InstallableInput;

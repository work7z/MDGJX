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
import ViewCopier from "../../../../TranslateForJSON/frontend/cpt/ViewCopier";
import cutils from "../../../../TranslateForJSON/frontend/kit/common_utils";
import myfileLess from "./index.less";

let MavenDepsCopier = observer((props) => {
  let { PUtils, artifactId, groupId, versionList = [] } = props;
  let lc_store = useLocalStore(() => {
    return {
      dep_ver_index: props.version,
    };
  });
  window.tmp_maven_deps_copier = lc_store;
  let sysgroupid = groupId;
  let sysartifactid = artifactId;
  let version = lc_store.dep_ver_index;
  let sysversion = version;
  if (!_.isEmpty(versionList) && gutils.empty(lc_store.dep_ver_index)) {
    gutils.defer(() => {
      let ok = _.get(versionList[0], "value");
      if (!_.isNil(ok)) {
        lc_store.dep_ver_index = ok;
      }
    }, 10);
  }
  let accessURL = `https://cloud.codegen.cc/MavenRepo?${Qs.stringify({
    groupId: groupId,
    artifactId: artifactId,
  })}`;
  let copyFn = () => {
    lc_store.test____FN___01 = lc_store.dep_ver_index;
  };
  let dep_type_list = [
    {
      id: "maven",
      label: "Maven",
      lang: "html",
      fn: () => {
        copyFn();
        version = lc_store.dep_ver_index;
        sysversion = lc_store.dep_ver_index;
        let comment = `<!-- ${accessURL} -->`;
        let value = `<dependency>
\t<groupId>${groupId}</groupId>
\t<artifactId>${artifactId}</artifactId>${
          version ? `\n\t<version>${version}</version>` : ``
        }
</dependency>`;
        return {
          comment: comment,
          definition: value,
        };
      },
    },
    {
      label: "Gradle",
      id: "gradle",
      lang: "groovy",
      fn: () => {
        copyFn();

        version = lc_store.dep_ver_index;
        sysversion = lc_store.dep_ver_index;
        let comment = `// ${accessURL} `;
        let value = `compile group: '${sysgroupid}', name: '${sysartifactid}', version: '${sysversion}'`;
        return {
          comment: comment,
          definition: value,
        };
      },
    },
    {
      id: "groovy",
      lang: "groovy",
      label: "SBT",
      fn: () => {
        copyFn();
        version = lc_store.dep_ver_index;

        sysversion = lc_store.dep_ver_index;
        let comment = `// ${accessURL} `;
        let value = `libraryDependencies += "${sysgroupid}" % "${sysartifactid}" % "${sysversion}"`;
        return {
          comment: comment,
          definition: value,
        };
      },
    },
    {
      id: "grape",
      label: "Grape",
      lang: "groovy",
      fn: () => {
        copyFn();
        version = lc_store.dep_ver_index;
        sysversion = lc_store.dep_ver_index;
        let comment = `// ${accessURL} `;
        let value = `@Grapes(
    @Grab(group='${sysgroupid}', module='${sysartifactid}', version='${sysversion}')
)`;
        return {
          comment: comment,
          definition: value,
        };
      },
    },
    {
      id: "ivy",
      lang: "html",
      label: "Ivy",
      fn: () => {
        copyFn();
        version = lc_store.dep_ver_index;
        sysversion = lc_store.dep_ver_index;
        let comment = `<!-- ${accessURL} -->`;
        let value = `<dependency org="${sysgroupid}" name="${sysartifactid}" rev="${sysversion}"/>`;
        return {
          comment: comment,
          definition: value,
        };
      },
    },
    {
      label: "Leiningen",
      id: "leiningen",
      lang: "markdown",
      fn: () => {
        copyFn();
        version = lc_store.dep_ver_index;
        sysversion = lc_store.dep_ver_index;
        let comment = `;; ${accessURL}`;
        let value = `[${sysgroupid}/${sysartifactid} "${sysversion}"]`;
        return {
          comment: comment,
          definition: value,
        };
      },
    },
    {
      label: "Buildr",
      id: "Buildr",
      lang: "shell",
      fn: () => {
        copyFn();
        version = lc_store.dep_ver_index;
        sysversion = lc_store.dep_ver_index;
        let comment = `# ${accessURL}`;
        let value = `'${sysgroupid}:${sysartifactid}:jar:${sysversion}'`;
        return {
          comment: comment,
          definition: value,
        };
      },
    },
  ];
  let fn_getValue_from_x = (x) => {
    let m = x.fn();
    let value =
      (PUtils.crtModel.dep_definition_type != "dep_only"
        ? m.comment + "\n"
        : "") + m.definition;
    return value;
  };

  return (
    <div className={myfileLess["container"]}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <h4 style={{ margin: 0 }}>{t(`Copy My Dependency`)}</h4>
        <div className="sub-ml-5">
          <GSyncSelectWithFilter
            small={true}
            obj={PUtils.crtModel}
            list={[
              {
                label: t(`Carry with Reference`),
                value: "with_reference",
              },
              {
                label: t(`Dependency Only`),
                value: "dep_only",
              },
            ]}
            index={"dep_definition_type"}
            whenChg={(x) => {
              PUtils.crtModel.dep_definition_type = x;
            }}
          />
          <GSyncSelectWithFilter
            small={true}
            obj={lc_store}
            list={versionList}
            index={"dep_ver_index"}
            whenChg={(x) => {
              lc_store.dep_ver_index = x;
            }}
          />
          <Button
            onClick={() => {
              let top_json_console = get_tab_index("top_json_console");
              let o = _.find(dep_type_list, (x) => x.id == top_json_console);
              if (_.isNil(o)) {
                o = dep_type_list[0];
              }
              if (o) {
                let ok = fn_getValue_from_x(o);
                gutils.copy(ok);
                gutils.alertOk("Copied");
              } else {
                gutils.alert("Resource Not Found");
              }
            }}
            small={true}
            intent={"success"}
          >
            {t(`Copy Definition`)}
          </Button>
        </div>
      </div>
      <div
        style={{ height: "240px" }}
        key={lc_store.dep_ver_index + PUtils.crtModel.dep_definition_type}
      >
        {PUtils.jsx.tabWithDefinition({
          default_select_tab: "ok",
          key: "top_json_console",
          list: dep_type_list
            .map((x) => {
              return {
                label: x.label,
                id: x.id,
                jsx: observer((x_) => {
                  let value = fn_getValue_from_x(x);
                  return PUtils.jsx.createGEditorWithNoStorageAndSimple({
                    readOnly: true,
                    tmp_carry_version:
                      lc_store.dep_ver_index +
                      PUtils.crtModel.dep_definition_type,
                    keepNoInvolve: true,
                    // selectAllWhenClick: true,
                    needBorder: true,
                    fontSize: 13,
                    // - Click to Copy it
                    title: t(`The Definition of Dependency`),
                    wordWrap: "off",
                    loading: false,
                    key: x.id,
                    language: x.lang || "html",
                    directValue: value,
                    onRef(ref) {
                      console.log("ref", ref);
                    },
                  });
                }),
              };
            })
            .map((x) => {
              x.mode_jsx_func = true;
              return x;
            }),
        })}
      </div>
    </div>
  );
});

export default MavenDepsCopier;

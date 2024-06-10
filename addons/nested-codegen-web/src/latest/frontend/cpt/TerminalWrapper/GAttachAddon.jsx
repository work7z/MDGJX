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
  useStores,
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

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

class GAttachAddon {
  _socket;
  _bidirectional;
  _disposables = [];

  constructor(socket, options) {
    this._socket = socket;
    // always set binary type to arraybuffer, we do not handle blobs
    this._socket.binaryType = "arraybuffer";
    this._bidirectional = !(options && options.bidirectional === false);
  }

  activate(terminal) {
    this._disposables.push(
      addSocketListener(this._socket, "message", (ev) => {
        const data = ev.data;
        if (evt.data instanceof ArrayBuffer) {
          terminal.write(ab2str(data));
        } else {
          terminal.write(
            typeof data === "string" ? data : new Uint8Array(data)
          );
        }
      })
    );

    if (this._bidirectional) {
      this._disposables.push(terminal.onData((data) => this._sendData(data)));
      this._disposables.push(
        terminal.onBinary((data) => this._sendBinary(data))
      );
    }

    this._disposables.push(
      addSocketListener(this._socket, "close", () => this.dispose())
    );
    this._disposables.push(
      addSocketListener(this._socket, "error", () => this.dispose())
    );
  }

  dispose() {
    for (const d of this._disposables) {
      d.dispose();
    }
  }

  _sendData(data) {
    if (!this._checkOpenSocket()) {
      return;
    }
    this._socket.send(
      new TextEncoder().encode("\x00" + data)
      // data
    );
  }

  _sendBinary(data) {
    if (!this._checkOpenSocket()) {
      return;
    }
    const buffer = new Uint8Array(data.length);
    for (let i = 0; i < data.length; ++i) {
      buffer[i] = data.charCodeAt(i) & 255;
    }
    this._socket.send(buffer);
  }

  _checkOpenSocket() {
    switch (this._socket.readyState) {
      case WebSocket.OPEN:
        return true;
      case WebSocket.CONNECTING:
        throw new Error("Attach addon was loaded before socket was open");
      case WebSocket.CLOSING:
        console.warn("Attach addon socket is closing");
        return false;
      case WebSocket.CLOSED:
        throw new Error("Attach addon socket is closed");
      default:
        throw new Error("Unexpected socket state");
    }
  }
}

function addSocketListener(socket, type, handler) {
  socket.addEventListener(type, handler);
  return {
    dispose: () => {
      if (!handler) {
        // Already disposed
        return;
      }
      socket.removeEventListener(type, handler);
    },
  };
}

export default GAttachAddon;

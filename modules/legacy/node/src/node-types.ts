export type NodeReq = {
  Lang: string;
  Id: string;
  Type: string;
  InputValue: any;
};
//
export type NodeRes<T extends any> = {
  Id: string;
  Lang: string;
  Type: string;
  OutputValue: T;
};

export type CategoryDefinition = {
  Id: string;
  Label: string;
  Tree?: ListExtForTheCategoryRes[];
};

export type ListExtForTheCategoryRes = {
  CategoryId: string;
  Id: string;
  Label: string;
  Icon: string;
  ChildrenAsInfo: ExtensionInfo[];
};

export type ExtensionInfo = {
  Id: string;
  Label: string;
  Description: string;
};

export type ValueReq = {
  InputText: string;
  InputFile: string; // if it's not empty, then it means user specified a file to process
  ExtraConfigMap: Record<string, string>;
  ReturnAsFile: boolean; // by default false
};

export type ValueRes = {
  Err?: Error;
  OutputText: string;
  OutputFile: string;
};

export type ValueHandler = {
  ConvertText: (req: ValueReq) => ValueRes;
  ConvertFile: (req: ValueReq) => ValueRes;
};

export type ExtensionFuncMap = Record<string, ValueHandler>;

export type FormModel = Record<string, any>;

export type ExtensionAction = {
  Tooltip?: string;
  Id: string;
  Label: string;
  CallFuncList: string[];
};

export type ExtensionVM = {
  Layout?: string;
  InitialFormModel?: FormModel;
  Info?: ExtensionInfo;
  Actions?: ExtensionAction[];
};
export type SubExtCategory = {
  CategoryId: string;
  Id: string;
  Label: string;
  Icon: string;
  Children: ExtensionVM[];
};

// define a export type that input NodeReq and output NodeRes
export type JobProcesser = (req: NodeReq) => Promise<NodeRes<any> | null>;

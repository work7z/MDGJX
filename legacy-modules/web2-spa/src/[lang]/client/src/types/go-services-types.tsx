
// Date: Fri, 13 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

export type GO_LOCAL_API_VISIT_CreateAdminInitStatusForm = {
  username: string;
  password: string;
};
export type GO_LOCAL_CategoryDefinition = {
  id: string;
  label: string;
};
export type GO_LOCAL_CreateNewAccounttForm = {
  username: string;
  password: string;
  token: string;
  invitationCode: string;
};
export type GO_LOCAL_VerifyUserServletForm = {
  username: string;
  password: string;
  token: string;
};
export type GO_LOCAL_CalcPasswordForm = {
  pw: string;
};
export type GO_LOCAL_Menu = {
  root: boolean;
  label: string;
  icon: string;
  id: string;
};
export type GO_LOCAL_DevFileStruct = {
  token: string;
};
export type GO_LOCAL_UserConfigMap = {
  userConfigFile: any;
  return: any;
};
export type GO_LOCAL_SystemInfo = {
  HasAdminInit: boolean;
  LastUpdatedTime: Date;
};
export type GO_LOCAL_ValueHandler = {
  ConvertText: any;
  ConvertFile: any;
};
export type GO_LOCAL_Select = {
  GetDynamicList: any;
};

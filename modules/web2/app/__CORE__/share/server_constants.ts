export const HEADER_X_LAF_LANG = "x-laf-lang";
export const HEADER_X_LAF_REGION = "x-laf-region"; // CN or US
export const HEADER_X_LAF_PLATFORM = "x-laf-platform";
export const HEADER_X_LAF_VERSION = "x-laf-version";

export type AsyncCreateResponse<T> = {
  message?: string; // normal message
  error?: string; // error
  data?: T;
};
export type SignInCredentials = {
  signed: boolean;
  signature: string | null;
};
export type TypeCaptchaResponse = {
  randomID: string;
  imgBase64: string;
};

export type ReleaseStatusResponse = {
  minimalSupportedVersion: string;
} | null;

export type PkgDownloadInfo = {
  version: string;
  pkgURL: string;
  fileName: string;
  sha256SumURL: string;
};
export type TypeRecentReleaseNotes = {
  version: string;
  content: string;
};
export type ReleaseLatestResponse = {
  anyUpdate: boolean;
  latestVersion: string;
  updateInfo: {
    autoUpdated: boolean;
    latest: PkgDownloadInfo;
    // recentReleaseNotes: TypeRecentReleaseNotes[];
  } | null;
};

export type SysResponse<T> = {
  content: T;
  errors?: string[];
  warnings?: string[];
};

export type PkgType =
  | "windows-x64"
  | "windows-arm64"
  | "linux-x64"
  | "darwin-x64"
  | "darwin-arm64";
export type PkgDownloadURLItem = {
  type: PkgType;
  url: string;
};
export type PkgDownloadURLBundle = {
  cn: PkgDownloadURLItem[];
  us: PkgDownloadURLItem[];
};
export type ReleaseInfo = {
  date: string;
  version: string;
  content: string; // markdown format
  disabled?: boolean;
};
export type ReleasePreFuncList = {
  [key: string]: () => ReleaseInfo;
};
export type ReleasePreFuncBundle = {
  list: ReleasePreFuncList;
  latestVersion: string;
};

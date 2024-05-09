import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { I18nItem } from "./app/__CORE__/config/i18n";
import { fn_Geti18n } from "./app/[lang]/client/src/i18n-pure";
import info from "./app/[lang]/[category]/info";
import { isDevEnv } from "./app/__CORE__/share/env";

let dftLocaleStr = process.env.APPLANG;
let LAFREGION = process.env.LAFREGION; // CN or US
if (!dftLocaleStr) {
  dftLocaleStr = "en_US";
}

// let bootLastModified = new Date(parseInt(info.timestamp) * 1000).toUTCString();
// if (isDevEnv()) {
//   bootLastModified = "";
// }

let _ = {
  every: (a: any, b: any) => {
    return a.every(b);
  },
  first: (a: any) => {
    return a[0];
  },
  toLower: (a: any) => {
    return a.toLowerCase();
  },
};

export type LocaleType = {
  langInHttp: string;
  langInHttpArr: string[];
  langInURL: string;
  langIni18n: string;
};
let i18nItems = fn_Geti18n((a, b) => b[1]);
let zhCNI18nItem = i18nItems.find((x) => x.Value === "zh_CN");
let enUSI18nItem = i18nItems.find((x) => x.Value === "en_US");
let dftI18nItem = i18nItems.find((x) => x.Value === dftLocaleStr + "");
if (!zhCNI18nItem || !enUSI18nItem) {
  throw new Error("regular item not found, please check " + "");
}
if (!dftI18nItem) {
  throw new Error("dft item not found, please check " + "");
}
let convertI18nItemToLocale = (i18nItem: I18nItem): LocaleType => {
  return {
    langInHttpArr: i18nItem.LangInHttpLocaleCode || [],
    langInHttp: _.first(i18nItem.LangInHttpLocaleCode) || "unknown",
    langInURL: i18nItem.LangInExplicitURL || "",
    langIni18n: i18nItem.Value,
  };
};
export let zhCNLocale: LocaleType = convertI18nItemToLocale(zhCNI18nItem);
export let enUSLocale: LocaleType = convertI18nItemToLocale(enUSI18nItem);
export let dftLocale: LocaleType = convertI18nItemToLocale(dftI18nItem);
export let all_locales: LocaleType[] = i18nItems.map((x) =>
  convertI18nItemToLocale(x),
);
let defaultLocale = dftLocale; // default locale is passed from env
const rever_locales_http = all_locales
  .map((x) => x.langInHttpArr)
  .reverse()
  .map((x) => {
    return x.map((y) => _.toLower(y));
  });

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  let acceptLanguage = _.toLower(request.headers.get("accept-language") + "");
  let val = defaultLocale.langInHttp;
  let ack = false;
  rever_locales_http.every((locale) => {
    _.every(locale, (x) => {
      if (acceptLanguage?.includes(x)) {
        val = _.first(locale) || defaultLocale.langInHttp;
        ack = true;
      }
      return !ack;
    });
    return !ack;
  });
  return val;
}

export function middleware(request: NextRequest) {
  let req = request;
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;

  // FIXME: just debugging
  // let h = "";
  // let hStr = JSON.stringify({
  //   h3: h,
  //   a: request.nextUrl.origin,
  //   b: request.nextUrl.pathname,
  //   c: request.nextUrl.search,
  //   d: request.nextUrl.href,
  //   e: request.nextUrl.host,
  //   f: request.nextUrl.hostname,
  //   g: request.nextUrl.port,
  //   h: request.nextUrl.protocol,
  //   h2: request.headers["X-Forwarded-Host"],
  // });
  // requestHeaders.set("x-hstr", hStr);

  requestHeaders.set("x-path", request.nextUrl.pathname);
  const thatHostname = req.headers["x-forwarded-host"] || req.nextUrl.hostname;
  requestHeaders.set("x-hostname", thatHostname);
  let finalLocaleObject: LocaleType = dftLocale;
  let a = request.nextUrl.search;
  requestHeaders.set("x-search", a);

  let handleLocaleSet = () => {
    requestHeaders.set("x-locale", finalLocaleObject.langInHttp);
  };
  if (
    pathname != "/" &&
    pathname != "" &&
    pathname.indexOf("/api") == -1 &&
    !pathname.startsWith("/v3")
  ) {
    const pathnameHasLocale = all_locales.some((locale) => {
      let mat =
        pathname.startsWith(`/${locale.langInURL}`) ||
        pathname === `/${locale.langInURL}`;
      if (mat) {
        finalLocaleObject = locale;
      }
      return mat;
    });
    if (!pathnameHasLocale) {
      // Redirect if there is no locale
      const locale = getLocale(request);
      let localeObj = all_locales.find((x) => x.langInHttp === locale);
      finalLocaleObject = localeObj || all_locales[0];
      request.nextUrl.pathname = `/${localeObj?.langInURL}${pathname}`;
      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      handleLocaleSet();
      return Response.redirect(request.nextUrl);
    }
  }
  handleLocaleSet();

  requestHeaders.set("x-url", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
    headers: {
      // "Last-Modified": bootLastModified,
      // "x-actual-lm": bootLastModified,
    },
  });
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
  runtime: "experimental-edge", // for Edge API Routes only
  unstable_allowDynamic: [
    "/node_modules/lodash/**",
    "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js",
  ],
};

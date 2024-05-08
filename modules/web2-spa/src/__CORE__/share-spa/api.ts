import { APITypeInfo, API_SERVER_URL } from "./api_constants";
import {
  HEADER_X_LAF_LANG,
  HEADER_X_LAF_PLATFORM,
  HEADER_X_LAF_REGION,
  HEADER_X_LAF_VERSION,
} from "./server_constants";

export let core_sendAPIRequestInBE = async (
  info: APITypeInfo,
  url: string,
  request: Partial<RequestInit>,
): Promise<Response> => {
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  const finURL = API_SERVER_URL + "/v3" + url;
  console.log("core_sendAPIRequestInBE: ", finURL);
  let res = await fetch(finURL, {
    headers: {
      "Content-Type": "application/json",
      [HEADER_X_LAF_REGION]: info.region,
      [HEADER_X_LAF_LANG]: info.lang,
      [HEADER_X_LAF_PLATFORM]: info.platform,
      [HEADER_X_LAF_VERSION]: info.version,
    },
    ...request,
  });
  return res;
};

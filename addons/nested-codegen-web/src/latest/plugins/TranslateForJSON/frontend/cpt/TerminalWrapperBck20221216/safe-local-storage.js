import mapi from "../../kit/common_api";
import cutils from "../../kit/common_utils";
import { termLSPrefix } from "./constants";

function clear() {
  const keys = Object.keys(window.localStorage);
  for (const key of keys) {
    if (key.startsWith(termLSPrefix)) {
      window.localStorage.removeItem(key);
    }
  }
}

export async function setItem(id, str) {
  try {
    await mapi.setItem_p(id, str);
  } catch (e) {
    gutils.alert({
      message: gutils.getErrMsg(e),
    });
  }
}

export async function getItem(id) {
  return await mapi.getItem_p(id);
  // return window.localStorage.getItem(id) || "";
}

export async function getItemJSON(id, defaultValue) {
  let str = await getItem(id);
  return str ? JSON.parse(str) : defaultValue;
}

export async function setItemJSON(id, obj) {
  await setItem(id, JSON.stringify(obj));
}

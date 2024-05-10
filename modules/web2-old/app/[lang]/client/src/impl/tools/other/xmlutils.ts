import _ from "lodash";

class XmlStructFormatClz {
  tagName;
  attr;
  content;
  children;
}
function notempty(obj) {
  if (_.isNil(obj)) {
    return false;
  }
  if (_.isString(obj)) {
    return obj.trim().length != 0;
  }
  for (let ok in obj) {
    return true;
  }
  return false;
}

const utils = {
  nil(obj) {
    return obj == null || obj == undefined;
  },
  isInfinity(obj) {
    if (utils.nil(obj)) {
      return false;
    }
    return obj.toString() == "Infinity";
  },
  isNaN(obj) {
    if (utils.nil(obj)) {
      return false;
    }
    return obj.toString() === "NaN";
  },
  isString(obj) {
    return utils.getProtoName(obj) === "String";
  },
  isFunction(obj) {
    return utils.getProtoName(obj) === "Function";
  },
  isNumber(obj) {
    return utils.getProtoName(obj) === "Number";
  },
  isArray(obj) {
    return utils.getProtoName(obj) === "Array";
  },
  getProtoName(obj) {
    if (obj === undefined) {
      return "Undefined";
    }
    if (obj === null) {
      return "Null";
    }
    return Object.getPrototypeOf(obj).constructor.name;
  },
  getProtoNameWithFormat(obj) {
    let isCrtNullMode = obj === null;
    if (isCrtNullMode) {
      return "Null";
    }
    let isCrtUndefined = obj === undefined;
    if (isCrtUndefined) {
      return "Undefined";
    }
    let isCrtNaNMode = utils.isNaN(obj);
    if (isCrtNaNMode) {
      return "NaN";
    }
    let isInfin = utils.isInfinity(obj);
    if (isInfin) {
      return "Infinity";
    }
    let crtValue = utils.getProtoName(obj);
    return crtValue;
  },
  createJsonMetaLayerData({ rawdata, key = "__SYSJSONVIEW_KW__", depth = 0 }) {
    let crtMetaLayerArr = [];
    let isArray = _.isArray(rawdata);
    let isObject = _.isObject(rawdata);
    // console.log('create json', rawdata, key);
    let protoNameWithFormat = utils.getProtoNameWithFormat(rawdata);
    let isLeafNode = !isArray && !isObject;
    let finMetaLayerData = null;
    let value: any = null;
    let size = 0;
    if (!isLeafNode) {
      value = [];
      for (let crtRawKey in rawdata) {
        let crtRawValue = rawdata[crtRawKey];
        let crtTempLayerData = utils.createJsonMetaLayerData({
          rawdata: crtRawValue,
          key: crtRawKey,
          depth: depth + 1,
        });
        value.push(crtTempLayerData);
        size++;
      }
    } else {
      value = rawdata;
    }
    return {
      depth,
      type: protoNameWithFormat,
      root: key === "__SYSJSONVIEW_KW__",
      leaf: isLeafNode,
      fold: false,
      key,
      value,
      size,
    };
  },
};

// xml
function getXmlFactory() {
  function _getAllAttr(node) {
    var attributes = node.attributes;
    if (node.hasAttributes() === false) {
      return {};
    }
    var result = {};
    for (let attr of attributes) {
      result[attr.name] = attr.value;
    }
    return result;
  }

  function _getContent(node) {
    let html = node.innerHTML;
    if (_.isNil(html)) {
      return "";
    }
    return html;
  }

  function _getTagName(node) {
    return node.tagName;
  }

  function _getChildren(parent) {
    var childNodes = parent.childNodes;
    var children: any = [];
    for (let child of childNodes) {
      if (child.nodeType !== 1) {
        continue;
      } else {
        children.push(child);
      }
    }
    return children;
  }

  function _getEachNodeInfo(child) {
    var eachChildInfo: any = {
      tagName: _getTagName(child),
      attr: _getAllAttr(child),
    };
    var subChildren = _getChildren(child);
    if (subChildren.length !== 0) {
      eachChildInfo.children = _getChildrenList(subChildren);
    }
    if (_.isNil(eachChildInfo.children)) {
      eachChildInfo.content = _getContent(child);
    }
    return eachChildInfo;
  }

  function _getChildrenList(children) {
    var resultArr: any[] = [];
    for (var child of children) {
      let eachChildInfo: any = _getEachNodeInfo(child);
      resultArr.push(eachChildInfo);
    }
    return resultArr;
  }

  function _renderXMLTree(parent) {
    var parentEle = document.createElement(parent.tagName);
    //append attributes
    if (parent.attr) {
      var attributes = parent.attr;
      for (var attrName in attributes) {
        var attrVal = attributes[attrName];
        parentEle.setAttribute(attrName, attrVal);
      }
    }
    if (!_.isNil(parent.children)) {
      var children = parent.children;
      for (var child of children) {
        parentEle.appendChild(_renderXMLTree(child));
      }
    } else {
      if (!_.isNil(parent.content)) {
        parentEle.appendChild(document.createTextNode(parent.content));
      }
    }
    return parentEle;
  }

  function getXmlObject(xmlString) {
    // return $(xmlString)[0];
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");
    return xmlDoc;
  }

  let crtref = {
    xml2json: {
      getStructJsonFromRawXml(xmlString) {
        var doc = getXmlObject(xmlString);
        if (_.isNil(doc)) {
          return {};
        }
        return _getEachNodeInfo(doc.childNodes[0]);
      },
      getRawXmlFromStructJson(json) {
        return _renderXMLTree(json);
      },
    },
    json2xml: {
      getStructXmlFromRawJson(rawJson) {
        let crtRootName = "root";
        let crtLayer = utils.createJsonMetaLayerData({ rawdata: rawJson });
        let xmlStyleFormatLayer = crtref.reFormatXmlStyleFromRawLayer(
          crtLayer.value,
        );
        xmlStyleFormatLayer = {
          tagName: crtRootName,
          children: xmlStyleFormatLayer,
        };
        let rawXml =
          crtref.xml2json.getRawXmlFromStructJson(xmlStyleFormatLayer);
        // let finxmlstr = new XML(rawXml).toXMLString(); //
        let finxmlstr = `<?xml version="1.0" encoding="utf-8" ?>\n${rawXml.outerHTML}`;
        // finxmlstr = utils.formatxml(finxmlstr);
        return finxmlstr;
      },
      getRawJsonFromStructXml(structXml) {
        let crtStructJson = crtref.xml2json.getStructJsonFromRawXml(structXml);
        let crtFinalJson = crtref.flatternStructJsonToKV(crtStructJson);
        return crtFinalJson;
      },
    },
    flatternStructJsonToKV(crtJson, obj = {}) {
      let { tagName, children, attr, content } = crtJson;
      if (notempty(children)) {
        let subObj = {};
        obj[tagName] = subObj;
        for (let idx in children) {
          let item = children[idx];
          crtref.flatternStructJsonToKV(item, subObj);
        }
        if (notempty(content)) {
          obj[tagName + "_text"] = content;
        }
      } else {
        obj[tagName] = content;
      }
      if (notempty(attr)) {
        obj[tagName + "_attr"] = attr;
      }
      return obj;
    },
    reFormatXmlStyleFromRawLayer(layerArr) {
      let finReturnArr: any = [];
      if (_.isNil(layerArr) || !utils.isArray(layerArr)) {
        return layerArr;
      }
      for (let i = 0; i < layerArr.length; i++) {
        let crtLayerObject = layerArr[i];
        let { type, key, value, leaf } = crtLayerObject;
        let crtXmlReturnObj: any = {
          tagName: key,
          attr: {},
        };
        let shouldSkipFinAdd = false;
        if (leaf) {
          crtXmlReturnObj.content = value;
        } else {
          let finChildrenForTmp = crtref.reFormatXmlStyleFromRawLayer(value);
          if (type == "Array") {
            shouldSkipFinAdd = true;
            console.log("finChildrenForTmp", finChildrenForTmp);
            for (let eachChild of finChildrenForTmp) {
              finReturnArr.push(
                _.merge({}, crtXmlReturnObj, {
                  children: eachChild.children,
                }),
              );
            }
          } else {
            crtXmlReturnObj.children = finChildrenForTmp;
          }
        }
        finReturnArr.push(crtXmlReturnObj);
      }
      return finReturnArr;
    },
  };
  return crtref;
}

let xmlInst = getXmlFactory();

export default xmlInst;

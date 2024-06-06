var Qs = require("querystring");
var basicURL = "http://127.0.0.1:12388";
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/gi, "");
}
var myutils = {
  uuid,
  fillarr(num, dftvalue) {
    var arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(dftvalue);
    }
    return arr;
  },
  myFixH: (val) => {
    return {
      minHeight: val,
      maxHeight: val,
      overflow: "auto",
    };
  },
  noline(str = "") {
    return str.replace(/[\/\\]/gi, (x) => "");
  },
  wcalc: (obj) => {
    var myobj = _.chain(obj)
      .split(";")
      .filter((x) => _.isEmpty(_.trim(x)) == "")
      .mapKeys((x, d, n) => {
        return _.camelCase(_.split(x, ":")[0]);
      })
      .mapValues((x, d, n) => {
        return _.split(x, ":")[1];
      })
      .value();
    // // // console.log('myobj', myobj);
    return myobj;
  },
  api: {},
  checkvalue(mstore, obj) {
    myutils.log(mstore);
    for (let index in obj) {
      let label = obj[index];
      var crtvalue = mstore[index];
      if (label == "undefined" || _.isNil(label)) {
        continue;
      }
      if (_.isNil(crtvalue) || (!_.isNumber(crtvalue) && crtvalue == "")) {
        // // console.log(label, crtvalue, index, mstore);
        var saystr = `请填写${label}`;
        myutils.alert.fail({ message: saystr });
        throw new Error(saystr);
      }
    }
  },
  openfile() {
    var inputObj = document.createElement("input");
    inputObj.className = "ghideallnow";
    inputObj.style.display = "none";
    inputObj.setAttribute("id", "_ef");
    inputObj.setAttribute("type", "file");
    inputObj.setAttribute("style", "visibility:hidden");
    document.body.appendChild(inputObj);
    // // console.log("nowget your content");
    inputObj.click();
    // // console.log("now get file");
    return inputObj.value;
  },
  splitarr(alertarr, d) {
    return _.concat(
      _.slice(alertarr, 0, d),
      _.slice(alertarr, d + 1, _.size(alertarr))
    );
  },
  copy(ctn) {
    var obj = document.getElementById("uniqueiptele");
    obj.value = ctn;
    obj.select();
    document.execCommand("Copy");
  },
  open(obj) {
    window.open(
      basicURL +
        obj.url +
        "?" +
        Qs.stringify(_.merge(obj.data, myutils.dataobj))
    );
  },
  ajax(conf = {}) {
    // //debugger;
    _.merge(conf, {
      data: myutils.dataobj,
      params: myutils.dataobj,
    });
    // _.merge(conf,{
    //   header: myutils.headerobj
    // })
    if (_.isNil(conf.method)) {
      conf.method = "POST";
      var formData = new FormData();
      _.forEach(conf.data, (x, d, n) => {
        if (!_.isNil(x)) {
          formData.append(d, x);
        }
      });
      conf.data = formData;
      _.merge(conf, {
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    }
    // // console.log("handleing conf", conf);
    return new Promise((okfunc, errfunc) => {
      axios({
        ...conf,
        url: basicURL + conf.url,
      })
        .then((e) => {
          // //debugger;
          okfunc(e.data);
        })
        .catch((re) => {
          errfunc(re);
        });
    });
  },
  log(...args) {
    // // console.log(...args);
  },
  isdev() {
    return true;
  },
  safeparse(obj, defaultvalue) {
    try {
      var ok = JSON.parse(obj);
      return ok;
    } catch (fail) {
      return defaultvalue;
    }
  },
  safestrnow(obj) {
    try {
      var mystr = JSON.stringify(obj);
      return mystr;
    } catch (error) {
      return "{}";
    }
  },
};

module.exports = myutils;

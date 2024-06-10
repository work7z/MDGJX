async function js_export_trigger({ e, saveValue, filename, fn_files_for_zip }) {
  function convertRes2BlobAndDownload(filename, data) {
    const blob = new Blob([data], {
      type: "application/octet-stream",
    });
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob);
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", decodeURI(filename));
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    // 挂载a标签
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL);
  }
  async function ZIPSaver() {
    // 初始化一个zip打包对象
    let JSZip = window.jszip;
    if (_.isNil(JSZip)) {
      gutils.win_alert(
        t(`Sorry, please upgrade to the latest version firstly.`)
      );
      return;
    }
    var zip = new JSZip();
    await fn_files_for_zip({ zip });
    // // 创建一个被用来打包的名为Hello.txt的文件
    // zip.file("Hello.txt", "Hello World\n");
    // // 创建一个名为images的新的文件目录
    // var img = zip.folder("images");
    // // 这个images文件目录中创建一个base64数据为imgData的图像，图像名是smile.gif
    // img.file("smile.gif", "OK");
    // 把打包内容异步转成blob二进制格式
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // content就是blob数据，这里以example.zip名称下载
      // 使用了FileSaver.js
      convertRes2BlobAndDownload(filename, content);
    });
  }

  function hideAlertFnIfHas(name) {
    try {
      if (window.ALL_ALERT_INST[name]) {
        window.ALL_ALERT_INST[name].clear();
        window.ALL_ALERT_INST[name].dismiss();
      }
    } catch (e) {
      console.log("e", e);
    }
  }

  console.log("event-clicking", e, e.detail);
  hideAlertFnIfHas("onlyone_copyingvalue");
  if (e.detail == 2) {
    if (!_.isNil(fn_files_for_zip)) {
      await ZIPSaver();
    } else {
      try {
        convertRes2BlobAndDownload(
          filename || `result-${Date.now()}.txt`,
          saveValue
        );
      } catch (e) {
        console.log("err", e);
      }
    }
    gutils.alertOk(
      "Exported. If it didn't, please check if you allow this page to open a new window.",
      {
        usingName: "onlyone_copyingvalue",
      }
    );
  } else {
    gutils.copy(saveValue);
    gutils.alertOk(
      "Copied! Click the button again, CodeGen will export it as a file for you.",
      {
        usingName: "onlyone_copyingvalue",
      }
    );
  }
}
export default js_export_trigger;

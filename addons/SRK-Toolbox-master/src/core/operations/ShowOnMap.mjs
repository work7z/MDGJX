/**
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

import Operation from "../Operation.mjs";
import {FORMATS, convertCoordinates} from "../lib/ConvertCoordinates.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Show on map operation
 */
class ShowOnMap extends Operation {

    /**
     * ShowOnMap constructor
     */
    constructor() {
        super();

        this.name = "在地图上显示";
        this.module = "Hashing";
        this.description = "在网页地图上展示坐标位置<br><br>坐标会被转换成度数格式后在地图上显示。<br><br>支持的格式：<ul><li>度分秒 (DMS)</li><li>度分 (DDM)</li><li>度数 (DD)</li><li>Geohash</li><li>军事格网参考系统 (MGRS)</li><li>地形测量局国家格网参考系统 (OSNG)</li><li>通用横轴墨卡托投影 (UTM)</li></ul><br>此操作无法离线使用。";
        this.infoURL = "https://foundation.wikimedia.org/wiki/Maps_Terms_of_Use";
        this.inputType = "string";
        this.outputType = "string";
        this.presentType = "html";
        this.args = [
            {
                name: "缩放级别",
                type: "number",
                value: 13
            },
            {
                name: "输入格式",
                type: "option",
                value: ["自动"].concat(FORMATS)
            },
            {
                name: "输入分隔符",
                type: "option",
                value: [
                    "自动",
                    "方向在前",
                    "方向在后",
                    "\\n",
                    "逗号",
                    "分号",
                    "冒号"
                ]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (input.replace(/\s+/g, "") !== "") {
            const inFormat = args[1],
                inDelim = args[2];
            let latLong;
            try {
                latLong = convertCoordinates(input, inFormat, inDelim, "度数", "逗号", "无", 5);
            } catch (error) {
                throw new OperationError(error);
            }
            latLong = latLong.replace(/[,]$/, "");
            latLong = latLong.replace(/°/g, "");
            return latLong;
        }
        return input;
    }

    /**
     * @param {string} data
     * @param {Object[]} args
     * @returns {string}
     */
    async present(data, args) {
        if (data.replace(/\s+/g, "") === "") {
            data = "0, 0";
        }
        const zoomLevel = args[0];
        const tileUrl = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
            tileAttribution = "<a href=\"https://wikimediafoundation.org/wiki/Maps_Terms_of_Use\">Wikimedia maps</a> | &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
            leafletUrl = "https://unpkg.com/leaflet@1.5.0/dist/leaflet.js",
            leafletCssUrl = "https://unpkg.com/leaflet@1.5.0/dist/leaflet.css";
        return `<link rel="stylesheet" href="${leafletCssUrl}" crossorigin=""/>
<style>
    #output-text .cm-content,
    #output-text .cm-line,
    #output-html {
        padding: 0;
        white-space: normal;
    }
</style>
<div id="presentedMap" style="width: 100%; height: 100%;"></div>
<script type="text/javascript">
var mapscript = document.createElement('script');
document.body.appendChild(mapscript);
mapscript.onload = function() {
    var presentMap = L.map('presentedMap').setView([${data}], ${zoomLevel});
    L.tileLayer('${tileUrl}', {
        attribution: '${tileAttribution}'
    }).addTo(presentMap);

    L.marker([${data}]).addTo(presentMap)
        .bindPopup('${data}')
        .openPopup();
};
mapscript.src = "${leafletUrl}";
</script>`;
    }
}

export default ShowOnMap;
